'use strict';

reg('progress', function() {
  const ws = S.g('workouts') || [];
  const prs = S.g('prs') || [];
  const cardio = S.g('cardio') || [];
  const streak = StreakEngine.get();
  const weekInsights = CoachEngine.weeklyInsights();

  // 8-week volume bars
  const weeks = [];
  for (let i=7; i>=0; i--) {
    const start = new Date(); start.setDate(start.getDate() - i*7 - start.getDay());
    const end = new Date(start); end.setDate(start.getDate()+7);
    const wVol = ws.filter(w => { const d=new Date(w.date); return d>=start && d<end; }).reduce((a,w)=>a+(w.totalVol||0),0);
    weeks.push({ vol:wVol, label:i===0?'This':i+'w' });
  }
  const maxVol = Math.max(...weeks.map(w=>w.vol), 1);
  const volBars = weeks.map((w,i) =>
    '<div style="flex:1;text-align:center">' +
    '<div style="height:80px;display:flex;align-items:flex-end">' +
    '<div style="width:100%;background:' + (i===7?'var(--grad)':'var(--bg4)') + ';border-radius:4px 4px 0 0;height:' + Math.max(Math.round((w.vol/maxVol)*80),w.vol?4:0) + 'px;transition:height 0.4s"></div>' +
    '</div><div style="font-size:10px;color:var(--txt3);margin-top:4px">' + w.label + '</div>' +
    '</div>'
  ).join('');

  // Strength chart (most recent exercise with data)
  let strengthSection = '';
  const exercisedNames = [...new Set(ws.flatMap(w=>(w.exercises||[]).map(e=>e.name)))];
  if (exercisedNames.length) {
    const exName = exercisedNames[0];
    const exData = ws.flatMap(w=>(w.exercises||[]).filter(e=>e.name===exName).map(e=>({
      date:w.date, e1rm:Math.max(...(e.sets||[]).filter(s=>s.done&&s.weight>0).map(s=>ProgEngine.epley(s.weight,s.reps)||0))
    }))).filter(e=>e.e1rm>0).slice(-12);
    if (exData.length >= 2) {
      const vals = exData.map(e=>e.e1rm);
      const min = Math.min(...vals)-5, max = Math.max(...vals)+5;
      const W=320, H=80;
      const xScale = (W-40)/(vals.length-1);
      const yScale = H/(max-min);
      const pts = vals.map((v,i) => [(i*xScale+20).toFixed(1),(H-(v-min)*yScale).toFixed(1)]);
      const pathD = 'M'+pts.map(p=>p.join(',')).join('L');
      const areaD = pathD + 'L'+pts[pts.length-1][0]+','+H+'L20,'+H+'Z';
      strengthSection = sh('Strength Progress — ' + exName) +
        '<div class="chart-wrap"><svg viewBox="0 0 ' + W + ' ' + (H+16) + '" class="chart-svg">' +
        '<defs><linearGradient id="sgrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--c2)" stop-opacity="0.4"/><stop offset="100%" stop-color="var(--c2)" stop-opacity="0"/></linearGradient></defs>' +
        '<path d="' + areaD + '" fill="url(#sgrad)"/>' +
        '<path d="' + pathD + '" fill="none" stroke="var(--c2)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<circle cx="' + pts[pts.length-1][0] + '" cy="' + pts[pts.length-1][1] + '" r="5" fill="var(--c2)"/>' +
        '<text x="' + pts[pts.length-1][0] + '" y="' + (parseFloat(pts[pts.length-1][1])-8) + '" text-anchor="middle" fill="var(--c2)" font-size="11" font-weight="700">' + vals[vals.length-1] + 'kg</text>' +
        '</svg></div>';
    }
  }

  // Calendar
  const calNow = new Date();
  const calYear = calNow.getFullYear(), calMonth = calNow.getMonth();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const wktDates = new Set(ws.map(w=>w.date.slice(0,10)));
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  let calHTML = '<div class="cal-header"><div class="cal-month">' + monthNames[calMonth] + ' ' + calYear + '</div></div>';
  calHTML += '<div class="cal-grid">' + dayNames.map(d=>'<div class="cal-day-name">'+d+'</div>').join('');
  for (let i=0; i<firstDay; i++) calHTML += '<div class="cal-day"></div>';
  for (let d=1; d<=daysInMonth; d++) {
    const iso = calYear+'-'+String(calMonth+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    const isToday = iso === today();
    const hasWkt = wktDates.has(iso);
    calHTML += '<div class="cal-day' + (isToday?' today':'') + (hasWkt?' wkt':'') + '">' + d + '</div>';
  }
  calHTML += '</div>';

  // PR board
  const grpFilter = ['All','Chest','Back','Legs','Shoulders','Arms'];
  const prRows = prs.slice().reverse().slice(0,20).map(pr => {
    const ex = ExDB.byName(pr.exercise);
    return '<div class="ex-row" style="padding:12px 0">' +
      '<div class="ex-icon">' + (ex.em||'💪') + '</div>' +
      '<div class="ex-info"><div class="ex-name">' + esc(pr.exercise) + '</div>' +
      '<div class="ex-sub">' + pr.weight + 'kg × ' + pr.reps + ' reps · e1RM: ' + pr.e1rm + 'kg</div></div>' +
      '<span class="badge badge-amber">' + fmtDate(pr.date) + '</span>' +
      '</div>';
  }).join('') || emptyState('🏆', 'No PRs yet', 'Complete a workout to set your first record');

  // Cardio stats this month
  const now = new Date();
  const monthCardio = cardio.filter(s => { const d=new Date(s.date); return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear(); });
  const cardioSection = monthCardio.length ? (
    sh('Cardio This Month') +
    '<div class="stats-row" style="padding:0 16px;margin-bottom:14px">' +
    '<div class="stat cyan" style="flex:1"><div class="stat-v">' + monthCardio.reduce((a,s)=>a+(s.distance||0),0).toFixed(1) + '</div><div class="stat-l">km Distance</div></div>' +
    '<div class="stat green" style="flex:1"><div class="stat-v">' + monthCardio.length + '</div><div class="stat-l">Sessions</div></div>' +
    '<div class="stat purple" style="flex:1"><div class="stat-v">' + Math.round(monthCardio.reduce((a,s)=>a+(s.calories||0),0)) + '</div><div class="stat-l">Calories</div></div>' +
    '</div>'
  ) : '';

  return topbar('Progress') +

  '<div class="stats-grid" style="margin:12px 16px 14px">' +
  '<div class="stat cyan"><div class="stat-v">' + ws.length + '</div><div class="stat-l">Workouts</div></div>' +
  '<div class="stat green"><div class="stat-v">' + streak + '🔥</div><div class="stat-l">Day Streak</div></div>' +
  '<div class="stat amber"><div class="stat-v">' + prs.length + '</div><div class="stat-l">PRs Set</div></div>' +
  '<div class="stat purple"><div class="stat-v">' + (StreakEngine.totalVolume()/1000).toFixed(0) + 't</div><div class="stat-l">Total Volume</div></div>' +
  '</div>' +

  (ws.length ? strengthSection : '') +

  sh('Weekly Volume') +
  '<div class="card card-dark" style="margin:0 16px 14px">' +
  '<div style="display:flex;align-items:flex-end;height:90px;gap:6px">' + volBars + '</div>' +
  '</div>' +

  sh('Workout Calendar') +
  '<div class="card card-dark" style="margin:0 16px 14px"><div class="cal">' + calHTML + '</div></div>' +

  sh('Personal Records') +
  '<div class="card card-dark" style="margin:0 16px 14px;padding:0 4px">' + prRows + '</div>' +

  cardioSection +

  (weekInsights.length ? sh('Weekly Insights') + weekInsights.map(i =>
    '<div class="ai-msg" style="margin:0 16px 10px"><div class="ai-msg-m">' + esc(i) + '</div></div>'
  ).join('') : '') +

  '<div style="height:8px"></div>';
});
