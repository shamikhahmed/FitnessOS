'use strict';

reg('bodystats', function() {
  const user = S.g('user') || {};
  const stats = (S.g('bodyStats') || []).sort((a,b) => new Date(a.date)-new Date(b.date));
  const latest = stats[stats.length-1] || {};
  const prev = stats[stats.length-2] || {};
  const unit = user.units === 'imperial' ? 'lb' : 'kg';

  const w = parseFloat(latest.weight || user.weight || 0);
  const h = user.height || 175;
  const bmi = h > 0 ? (w / Math.pow(h/100, 2)).toFixed(1) : '—';
  const bmiCat = bmi > 30 ? 'Obese' : bmi > 25 ? 'Overweight' : bmi > 18.5 ? 'Normal' : 'Underweight';
  const bmiColor = bmi > 30 ? 'var(--c4)' : bmi > 25 ? 'var(--c5)' : bmi > 18.5 ? 'var(--c3)' : 'var(--c1)';

  const bf = latest.bodyfat;
  const bfCat = bf ? (bf > 30 ? 'High' : bf > 20 ? 'Average' : bf > 12 ? 'Fit' : 'Athletic') : null;

  const goalW = user.goalWeight || 70;
  const startW = stats[0] ? parseFloat(stats[0].weight) : parseFloat(user.weight||75);
  const goalPct = startW !== goalW ? Math.min(100, Math.max(0, Math.round(Math.abs((startW-w)/(startW-goalW)*100)))) : 100;

  // Weight chart SVG
  function weightChart() {
    const entries = stats.slice(-30);
    if (entries.length < 2) return '<div style="text-align:center;padding:24px;color:var(--txt3)">Log at least 2 entries to see chart</div>';
    const vals = entries.map(e => parseFloat(e.weight)||0);
    const min = Math.min(...vals) - 1;
    const max = Math.max(...vals) + 1;
    const W = 320, H = 100;
    const xScale = (W-40) / (vals.length-1);
    const yScale = H / (max-min);
    const points = vals.map((v,i) => [(i*xScale+20).toFixed(1), (H-(v-min)*yScale).toFixed(1)]);
    const pathD = 'M' + points.map(p=>p.join(',')).join('L');
    const areaD = pathD + 'L' + points[points.length-1][0] + ',' + H + 'L20,' + H + 'Z';
    const goalY = (H-(goalW-min)*yScale).toFixed(1);
    return '<svg viewBox="0 0 ' + W + ' ' + (H+20) + '" class="chart-svg">' +
      '<defs><linearGradient id="wgrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--c1)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--c1)" stop-opacity="0"/></linearGradient></defs>' +
      '<path d="' + areaD + '" fill="url(#wgrad)"/>' +
      '<path d="' + pathD + '" fill="none" stroke="var(--c1)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      (goalW ? '<line x1="20" y1="' + goalY + '" x2="' + (W-20) + '" y2="' + goalY + '" stroke="var(--c3)" stroke-width="1" stroke-dasharray="4,3"/>' : '') +
      '<circle cx="' + points[points.length-1][0] + '" cy="' + points[points.length-1][1] + '" r="5" fill="var(--c1)"/>' +
      '<text x="' + points[points.length-1][0] + '" y="' + (parseFloat(points[points.length-1][1])-8) + '" text-anchor="middle" fill="var(--c1)" font-size="11" font-weight="700">' + vals[vals.length-1] + unit + '</text>' +
      (goalW ? '<text x="' + (W-22) + '" y="' + (parseFloat(goalY)-4) + '" text-anchor="end" fill="var(--c3)" font-size="10">Goal</text>' : '') +
      '</svg>';
  }

  // Measurements
  const MEAS = ['Chest','Waist','Hips','Arms','Thighs','Calves','Neck','Shoulders'];
  const measCards = MEAS.map(m => {
    const key = m.toLowerCase();
    const cur = latest.measurements && latest.measurements[key];
    const old = prev.measurements && prev.measurements[key];
    const delta = cur && old ? (parseFloat(cur)-parseFloat(old)).toFixed(1) : null;
    const deltaClass = delta === null ? '' : parseFloat(delta) > 0 ? 'up' : 'down';
    const deltaStr = delta === null ? '' : (parseFloat(delta) > 0 ? '+' : '') + delta + 'cm';
    return '<div class="meas-card" onclick="logMeasurement(\'' + m + '\')">' +
      '<div class="meas-v">' + (cur || '—') + (cur ? '<span style="font-size:12px;color:var(--txt3)">cm</span>' : '') + '</div>' +
      '<div class="meas-l">' + esc(m) + '</div>' +
      (deltaStr ? '<div class="meas-delta ' + deltaClass + '">' + deltaStr + '</div>' : '') +
      '</div>';
  }).join('');

  const historyRows = stats.slice(-10).reverse().map(e =>
    '<div class="ex-row" style="padding:12px 0">' +
    '<div class="ex-icon">⚖️</div>' +
    '<div class="ex-info"><div class="ex-name">' + (e.weight||'—') + ' ' + unit + '</div>' +
    '<div class="ex-sub">' + fmtDate(e.date) + (e.bodyfat?' · '+e.bodyfat+'% BF':'') + '</div></div>' +
    '</div>'
  ).join('') || '<div style="padding:16px;color:var(--txt3)">No entries yet</div>';

  return topbar('Body Stats', null, '<button class="topbar-icon" onclick="logWeightModal()">＋</button>') +

  '<div class="stats-grid" style="margin:12px 16px 14px">' +
  '<div class="stat cyan"><div class="stat-v">' + (w||'—') + '</div><div class="stat-l">Weight (' + unit + ')</div></div>' +
  '<div class="stat amber"><div class="stat-v" style="color:' + bmiColor + '">' + bmi + '</div><div class="stat-l">BMI · ' + bmiCat + '</div></div>' +
  '<div class="stat purple"><div class="stat-v">' + (bf||'—') + (bf?'%':'') + '</div><div class="stat-l">Body Fat' + (bfCat?' · '+bfCat:'') + '</div></div>' +
  '<div class="stat green"><div class="stat-v">' + stats.length + '</div><div class="stat-l">Entries</div></div>' +
  '</div>' +

  (stats.length > 0 ?
    sh('Weight Trend') +
    '<div class="chart-wrap">' + weightChart() + '</div>' +
    '<div style="display:flex;justify-content:space-between;padding:0 16px;margin-bottom:16px">' +
    '<div style="font-size:12px;color:var(--txt3)">Goal: ' + goalW + unit + '</div>' +
    '<div style="font-size:12px;color:var(--c3)">' + goalPct + '% to goal</div>' +
    '</div>'
  : emptyState('⚖️', 'No weight data', 'Log your first weigh-in', '+ Log Weight', 'logWeightModal()')) +

  '<div style="padding:0 16px;margin-bottom:14px">' +
  '<button class="btn btn-p" onclick="logWeightModal()">+ Log Today\'s Weight</button>' +
  '</div>' +

  sh('Measurements') +
  '<div class="meas-grid">' + measCards + '</div>' +

  sh('Progress Photos') +
  '<div class="photo-row">' +
  ['Front','Side','Back'].map(v =>
    '<div class="photo-slot" onclick="capturePhoto(\'' + v + '\')">' +
    '<div class="photo-slot-icon">📷</div>' +
    '<div class="photo-slot-l">' + v + '</div>' +
    '</div>'
  ).join('') + '</div>' +

  sh('History') +
  '<div class="card card-dark" style="margin:0 16px 14px;padding:0 4px">' + historyRows + '</div>' +
  '<div style="height:8px"></div>';
});

function logWeightModal() {
  const user = S.g('user') || {};
  const unit = user.units === 'imperial' ? 'lb' : 'kg';
  const body = '<div class="field-wrap"><label class="field-label">Weight (' + unit + ')</label>' +
    '<input class="field" id="log-weight" type="number" step="0.1" min="20" max="500" placeholder="e.g. 75.5" inputmode="decimal" autofocus></div>' +
    '<div class="field-wrap"><label class="field-label">Body Fat % (optional)</label>' +
    '<input class="field" id="log-bf" type="number" step="0.1" min="3" max="60" placeholder="e.g. 15.2" inputmode="decimal"></div>' +
    '<div class="field-wrap"><label class="field-label">Notes (optional)</label>' +
    '<input class="field" id="log-weight-note" type="text" placeholder="e.g. morning weight"></div>';
  modal('Log Weight', body, '<button class="btn btn-p" onclick="saveWeightLog()">Save</button>');
}
window.logWeightModal = logWeightModal;

function saveWeightLog() {
  const w = parseFloat(document.getElementById('log-weight').value);
  if (!w) { toast('Enter a weight', 'warn'); return; }
  const bf = parseFloat(document.getElementById('log-bf').value) || null;
  const note = document.getElementById('log-weight-note').value;
  const stats = S.g('bodyStats') || [];
  stats.push({ date: isoNow(), weight: w, bodyfat: bf, note, measurements: {} });
  S.set('bodyStats', stats);
  S.set('user.weight', w);
  closeModal();
  toast('Weight logged!', 'ok');
  haptic(30);
  go('bodystats');
}
window.saveWeightLog = saveWeightLog;

function logMeasurement(part) {
  const stats = S.g('bodyStats') || [];
  const latest = stats[stats.length-1] || {};
  const key = part.toLowerCase();
  const cur = latest.measurements && latest.measurements[key];
  modal('Log ' + part, '<div class="field-wrap"><label class="field-label">' + part + ' (cm)</label>' +
    '<input class="field" id="meas-val" type="number" step="0.1" min="0" placeholder="' + (cur||'e.g. 95') + '" inputmode="decimal" autofocus></div>',
    '<button class="btn btn-p" onclick="saveMeasurement(\'' + part + '\')">Save</button>');
}
window.logMeasurement = logMeasurement;

function saveMeasurement(part) {
  const val = parseFloat(document.getElementById('meas-val').value);
  if (!val) { toast('Enter a value', 'warn'); return; }
  const stats = S.g('bodyStats') || [];
  if (!stats.length) stats.push({ date: isoNow(), measurements: {} });
  const last = stats[stats.length-1];
  if (!last.measurements) last.measurements = {};
  last.measurements[part.toLowerCase()] = val;
  S.set('bodyStats', stats);
  closeModal();
  toast(part + ' logged!', 'ok');
  haptic(30);
  go('bodystats');
}
window.saveMeasurement = saveMeasurement;

function capturePhoto(view) {
  toast('Photo capture requires camera access', 'info');
}
window.capturePhoto = capturePhoto;
