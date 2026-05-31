'use strict';
/* ── FitnessOS v4 — Progress Screen ── */

reg('progress', function() {
  const ws = S.g('workouts') || [];
  const prs = S.g('prs') || [];
  const bodyStats = S.g('bodyStats') || [];
  const earned = S.g('achievements') || [];
  const streak = StreakEngine.get();
  const totalVol = StreakEngine.totalVolume();

  return '<div class="topbar"><div class="topbar-title">Progress</div></div>' +
    _heroStats(ws, prs, streak, totalVol) +
    _workoutCalendar(ws) +
    _volumeChart(ws) +
    _prBoard(prs) +
    _strengthCharts(ws, prs) +
    _bodyStatsChart(bodyStats, S.g('user')) +
    _achievementWall(earned) +
    '<div style="height:20px"></div>';
});

function _heroStats(ws, prs, streak, totalVol) {
  const volDisplay = totalVol > 1000 ? (Math.round(totalVol/100)/10) + 't' : totalVol + 'kg';
  return '<div class="stats-row">' +
    '<div class="stat stat-accent"><div class="stat-v">'+ws.length+'</div><div class="stat-l">Workouts</div></div>' +
    '<div class="stat"><div class="stat-v">'+esc(volDisplay)+'</div><div class="stat-l">Total Vol</div></div>' +
    '<div class="stat stat-accent"><div class="stat-v">'+streak+'🔥</div><div class="stat-l">Streak</div></div>' +
    '<div class="stat"><div class="stat-v">'+prs.length+'</div><div class="stat-l">PRs</div></div>' +
    '</div>';
}

function _workoutCalendar(ws) {
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const wktDates = new Set(ws.map(w => w.date.slice(0,10)));
  const monthStr = now.toLocaleDateString('en-GB',{month:'long',year:'numeric'});
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  let cells = dayNames.map(d => '<div class="cal-day-name">'+d+'</div>').join('');
  for (let i=0; i<(firstDay||7)%7; i++) cells += '<div></div>';
  for (let d=1; d<=daysInMonth; d++) {
    const dateStr = year+'-'+(String(month+1).padStart(2,'0'))+'-'+(String(d).padStart(2,'0'));
    const isToday = d === now.getDate();
    const hasWkt = wktDates.has(dateStr);
    cells += '<div class="cal-day'+(isToday?' today':'')+(hasWkt?' wkt':'')+'" onclick="showDayWorkouts(\''+dateStr+'\')">'+d+'</div>';
  }

  return sh('Calendar') +
    '<div class="cal">' +
    '<div class="cal-header"><div class="cal-month">'+esc(monthStr)+'</div></div>' +
    '<div class="cal-grid">'+cells+'</div>' +
    '</div>';
}

function _volumeChart(ws) {
  if (!ws.length) return '';
  const weeks = [];
  for (let i=7; i>=0; i--) {
    const start = new Date(); start.setDate(start.getDate() - i*7);
    const end = new Date(); end.setDate(end.getDate() - (i-1)*7);
    const vol = ws.filter(w => { const d=new Date(w.date); return d>=start&&d<end; }).reduce((a,w)=>a+(w.totalVol||0),0);
    weeks.push({ label:i===0?'Now':'W-'+i, vol, isCur:i===0 });
  }
  const maxVol = Math.max(...weeks.map(w=>w.vol), 1);
  const bars = weeks.map(w =>
    '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">' +
    '<div style="flex:1;width:100%;display:flex;align-items:flex-end">' +
    '<div style="width:100%;background:'+(w.isCur?'var(--grad)':'var(--bg4)')+';border-radius:4px 4px 0 0;height:'+Math.max(4,Math.round((w.vol/maxVol)*80))+'px"></div>' +
    '</div><div style="font-size:10px;color:var(--txt3)">'+esc(w.label)+'</div></div>'
  ).join('');

  return sh('Volume Trend') +
    '<div style="padding:0 16px">' +
    '<div style="display:flex;align-items:flex-end;height:100px;gap:6px">'+bars+'</div>' +
    '</div>';
}

function _prBoard(prs) {
  if (!prs.length) return sh('Personal Records') +
    emptyState('🏆','No PRs yet','Complete workouts to set personal records!');
  const sorted = [...prs].sort((a,b) => new Date(b.date)-new Date(a.date));
  return sh('Personal Records') +
    '<div style="padding:0 16px">' +
    sorted.slice(0,8).map(p =>
      '<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)">' +
      '<div style="font-size:22px">🏆</div>' +
      '<div style="flex:1"><div style="font-size:14px;font-weight:700;color:var(--txt)">'+esc(p.exercise)+'</div>' +
      '<div style="font-size:12px;color:var(--txt3)">'+fmtDate(p.date)+'</div></div>' +
      '<div style="text-align:right"><div style="font-size:15px;font-weight:800;color:var(--c1)">'+p.weight+'kg × '+p.reps+'</div>' +
      '<div style="font-size:11px;color:var(--txt3)">e1RM: '+(p.e1rm||'—')+'kg</div></div></div>'
    ).join('') + '</div>';
}

function _strengthCharts(ws, prs) {
  if (!prs.length) return '';
  const charts = prs.slice(0,3).map(pr => {
    const history = [];
    ws.forEach(wo => (wo.exercises||[]).forEach(ex => {
      if (ex.name===pr.exercise) (ex.sets||[]).filter(s=>s.done&&s.weight&&s.reps).forEach(s => {
        history.push({ date:wo.date.slice(0,10), e1rm:ProgEngine.epley(s.weight,s.reps) });
      });
    }));
    if (history.length < 2) return '';
    const pts = history.slice(-8);
    const maxE = Math.max(...pts.map(p=>p.e1rm), 1);
    const W=280, H=60;
    const points = pts.map((p,i) => ((i/(pts.length-1||1))*W)+','+(H-((p.e1rm/maxE)*(H-8))-4)).join(' ');
    return '<div style="margin-bottom:16px">' +
      '<div style="font-size:13px;font-weight:700;color:var(--txt);margin-bottom:6px">'+esc(pr.exercise)+'</div>' +
      '<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" style="width:100%;overflow:visible">' +
      '<polyline points="'+points+'" fill="none" stroke="var(--c1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      pts.map((p,i) => { const x=(i/(pts.length-1||1))*W, y=H-((p.e1rm/maxE)*(H-8))-4; return '<circle cx="'+x+'" cy="'+y+'" r="3.5" fill="var(--c1)"/>'; }).join('') +
      '</svg>' +
      '<div style="font-size:12px;color:var(--txt3)">Peak e1RM: '+Math.round(maxE)+'kg</div>' +
      '</div>';
  }).filter(Boolean).join('');
  if (!charts) return '';
  return sh('Strength Trends') + '<div style="padding:0 16px">'+charts+'</div>';
}

function _bodyStatsChart(bodyStats, user) {
  if (!bodyStats||!bodyStats.length) return sh('Weight Trend') +
    emptyState('⚖️','No weight data','Log your weight in Settings → Profile');
  const goal = user?.goalWeight||70;
  const pts = bodyStats.slice(-12);
  if (pts.length < 2) return '';
  const weights = pts.map(s=>s.weight||75);
  const minW = Math.min(...weights, goal) - 2;
  const maxW = Math.max(...weights) + 2;
  const W=280, H=80;
  const toY = v => H - ((v-minW)/(maxW-minW||1))*(H-8) - 4;
  const points = pts.map((p,i)=>((i/(pts.length-1||1))*W)+','+toY(p.weight||75)).join(' ');
  const goalY = toY(goal);
  return sh('Weight Trend') +
    '<div style="padding:0 16px">' +
    '<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" style="width:100%;overflow:visible">' +
    '<line x1="0" y1="'+goalY+'" x2="'+W+'" y2="'+goalY+'" stroke="rgba(var(--c1-rgb),0.35)" stroke-width="1.5" stroke-dasharray="6,4"/>' +
    '<polyline points="'+points+'" fill="none" stroke="var(--c1)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>' +
    '<div style="display:flex;justify-content:space-between;margin-top:6px">' +
    '<div style="font-size:12px;color:var(--txt3)">'+fmtDate(pts[0].date)+'</div>' +
    '<div style="font-size:12px;color:var(--c1)">Goal: '+goal+'kg</div>' +
    '<div style="font-size:12px;color:var(--txt3)">'+fmtDate(pts[pts.length-1].date)+'</div>' +
    '</div></div>';
}

function _achievementWall(earned) {
  return sh('Achievements', earned.length+'/'+AchEngine.all.length) +
    '<div class="achieve-grid">' +
    AchEngine.all.map(a => {
      const unlocked = earned.includes(a.id);
      return '<div class="achieve-card'+(unlocked?' unlocked':'')+'">' +
        '<div class="achieve-icon">'+a.i+'</div>' +
        '<div class="achieve-name">'+esc(a.n)+'</div>' +
        '<div class="achieve-desc">'+esc(a.d)+'</div></div>';
    }).join('') + '</div>';
}

window.showDayWorkouts = function(dateStr) {
  const ws = (S.g('workouts')||[]).filter(w=>w.date.slice(0,10)===dateStr);
  if (!ws.length) { toast('No workout on '+fmtDate(dateStr),'info'); return; }
  const body = ws.map(w =>
    '<div style="padding:12px 0;border-bottom:1px solid var(--border)">' +
    '<div style="font-size:15px;font-weight:700;color:var(--txt)">'+esc(w.name||'Workout')+'</div>' +
    '<div style="font-size:13px;color:var(--txt3)">'+fmtMins(w.duration||0)+' · '+(w.totalVol||0)+'kg</div>' +
    '<div style="font-size:13px;color:var(--txt2);margin-top:4px">'+esc((w.exercises||[]).map(e=>e.name).join(', '))+'</div>' +
    '</div>'
  ).join('');
  modal(fmtDate(dateStr), body, '<button class="btn btn-ghost" onclick="closeModal()" style="margin-top:12px">Close</button>');
};
