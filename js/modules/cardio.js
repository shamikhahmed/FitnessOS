'use strict';

const CARDIO_TYPES = [
  { v:'run', l:'Running', em:'🏃', met:9.8 },
  { v:'cycle', l:'Cycling', em:'🚴', met:7.5 },
  { v:'swim', l:'Swimming', em:'🏊', met:8.0 },
  { v:'walk', l:'Walking', em:'🚶', met:4.0 },
  { v:'hiit', l:'HIIT', em:'⚡', met:12.0 },
  { v:'row', l:'Rowing', em:'🚣', met:7.0 },
  { v:'jump', l:'Jump Rope', em:'🪢', met:11.0 },
  { v:'other', l:'Other', em:'🏅', met:6.0 }
];

reg('cardio', function() {
  const user = S.g('user') || {};
  const sessions = (S.g('cardio') || []).sort((a,b) => new Date(b.date)-new Date(a.date));
  const now = new Date();
  const monthSessions = sessions.filter(s => {
    const d = new Date(s.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const totalDist = monthSessions.reduce((a,s) => a+(s.distance||0), 0).toFixed(1);
  const totalTime = monthSessions.reduce((a,s) => a+(s.duration||0), 0);
  const totalCal = Math.round(monthSessions.reduce((a,s) => a+(s.calories||0), 0));

  // Best pace (runs only)
  const runs = sessions.filter(s => s.type === 'run' && s.distance > 0 && s.duration > 0);
  const bestPace = runs.length ? Math.min(...runs.map(r => r.duration/r.distance)) : null;
  const bestPaceStr = bestPace ? Math.floor(bestPace) + ':' + String(Math.round((bestPace%1)*60)).padStart(2,'0') + '/km' : '—';

  // Week bars
  const weeks = [];
  for (let i=6; i>=0; i--) {
    const d = new Date(); d.setDate(d.getDate()-i*7);
    const wk = sessions.filter(s => {
      const sd = new Date(s.date);
      return sd >= new Date(d.getFullYear(), d.getMonth(), d.getDate()-d.getDay()) &&
             sd < new Date(d.getFullYear(), d.getMonth(), d.getDate()-d.getDay()+7);
    });
    weeks.push({ label: ['6w','5w','4w','3w','2w','1w','This'][6-i], count:wk.length, time:wk.reduce((a,s)=>a+(s.duration||0),0) });
  }
  const maxTime = Math.max(...weeks.map(w=>w.time), 1);
  const bars = weeks.map((w,i) =>
    '<div style="flex:1;text-align:center">' +
    '<div style="height:60px;display:flex;align-items:flex-end">' +
    '<div style="width:100%;background:' + (i===6?'var(--grad)':'var(--bg4)') + ';border-radius:4px 4px 0 0;height:' + Math.round((w.time/maxTime)*60) + 'px;min-height:' + (w.count?4:0) + 'px;transition:height 0.4s"></div>' +
    '</div>' +
    '<div style="font-size:10px;color:var(--txt3);margin-top:4px">' + w.label + '</div>' +
    '</div>'
  ).join('');

  const sessionRows = sessions.slice(0,10).map(s => {
    const type = CARDIO_TYPES.find(t=>t.v===s.type) || CARDIO_TYPES[7];
    const paceStr = s.type==='run' && s.distance>0 ? (s.duration/s.distance).toFixed(1) + ' min/km' : '';
    return '<div class="ex-row" style="padding:12px 0">' +
      '<div class="ex-icon">' + type.em + '</div>' +
      '<div class="ex-info"><div class="ex-name">' + esc(type.l) + '</div>' +
      '<div class="ex-sub">' + fmtDate(s.date) + ' · ' + (s.duration||0) + 'min' + (s.distance?' · '+(s.distance)+(user.distanceUnit||'km'):'') + (paceStr?' · '+paceStr:'') + '</div></div>' +
      '<div style="text-align:right"><div style="font-size:14px;font-weight:700;color:var(--c1)">' + (s.calories||0) + '</div><div style="font-size:11px;color:var(--txt3)">kcal</div></div>' +
      '</div>';
  }).join('') || emptyState('🏃', 'No cardio sessions', 'Log your first run or session', '+ Log Session', "openCardioLog()");

  return topbar('Cardio', null, '<button class="topbar-icon" onclick="openCardioLog()">＋</button>') +

  '<div class="stats-grid" style="margin:12px 16px 14px">' +
  '<div class="stat cyan"><div class="stat-v">' + totalDist + '</div><div class="stat-l">km This Month</div></div>' +
  '<div class="stat green"><div class="stat-v">' + fmtTime(totalTime) + '</div><div class="stat-l">Total Time</div></div>' +
  '<div class="stat purple"><div class="stat-v">' + totalCal + '</div><div class="stat-l">Calories</div></div>' +
  '<div class="stat amber"><div class="stat-v">' + bestPaceStr + '</div><div class="stat-l">Best Pace</div></div>' +
  '</div>' +

  sh('Weekly Activity') +
  '<div class="card card-dark" style="margin:0 16px 14px">' +
  '<div style="display:flex;align-items:flex-end;height:70px;gap:6px">' + bars + '</div>' +
  '</div>' +

  '<div style="padding:0 16px;margin-bottom:14px">' +
  '<button class="btn btn-p" onclick="openCardioLog()">+ Log Session</button>' +
  '</div>' +

  sh('Sessions') +
  '<div class="card card-dark" style="margin:0 16px 14px;padding:0 4px">' + sessionRows + '</div>' +
  '<div style="height:8px"></div>';
});

let _cardioType = 'run';

function openCardioLog() {
  _cardioType = 'run';
  const typeGrid = CARDIO_TYPES.map(t =>
    '<div class="cardio-type' + (t.v==='run'?' sel':'') + '" id="ctype-' + t.v + '" onclick="selectCardioType(\'' + t.v + '\')">' +
    '<div class="cardio-type-icon">' + t.em + '</div>' +
    '<div class="cardio-type-name">' + t.l + '</div>' +
    '</div>'
  ).join('');
  const user = S.g('user') || {};
  const distUnit = user.distanceUnit || 'km';
  const body = '<div class="cardio-type-grid" id="cardio-type-grid">' + typeGrid + '</div>' +
    '<div class="field-wrap"><label class="field-label">Duration (minutes)</label><input class="field" id="cardio-dur" type="number" min="1" max="600" placeholder="e.g. 30" inputmode="numeric"></div>' +
    '<div class="field-wrap"><label class="field-label">Distance (' + distUnit + ') — optional</label><input class="field" id="cardio-dist" type="number" step="0.1" min="0" placeholder="e.g. 5.0" inputmode="decimal"></div>' +
    '<div class="field-wrap"><label class="field-label">Notes (optional)</label><input class="field" id="cardio-note" type="text" placeholder="e.g. morning run"></div>';
  modal('Log Cardio', body, '<button class="btn btn-p" onclick="saveCardioLog()">Save</button>');
}
window.openCardioLog = openCardioLog;

function selectCardioType(v) {
  _cardioType = v;
  document.querySelectorAll('.cardio-type').forEach(el => el.classList.remove('sel'));
  const sel = document.getElementById('ctype-' + v);
  if (sel) sel.classList.add('sel');
}
window.selectCardioType = selectCardioType;

function saveCardioLog() {
  const dur = parseInt(document.getElementById('cardio-dur').value);
  if (!dur) { toast('Enter duration', 'warn'); return; }
  const dist = parseFloat(document.getElementById('cardio-dist').value) || null;
  const note = document.getElementById('cardio-note').value;
  const user = S.g('user') || {};
  const type = CARDIO_TYPES.find(t => t.v === _cardioType) || CARDIO_TYPES[0];
  const cals = Math.round(type.met * (user.weight||75) * (dur/60));
  const sessions = S.g('cardio') || [];
  sessions.push({ date: isoNow(), type: _cardioType, duration: dur, distance: dist, calories: cals, note });
  S.set('cardio', sessions);
  closeModal();
  toast('Session logged! ' + cals + ' kcal', 'ok');
  haptic(30);
  go('cardio');
}
window.saveCardioLog = saveCardioLog;
