'use strict';

const BODY_PARTS = [
  'Shoulder (L)','Shoulder (R)','Elbow (L)','Elbow (R)',
  'Wrist (L)','Wrist (R)','Lower Back','Upper Back',
  'Hip (L)','Hip (R)','Knee (L)','Knee (R)',
  'Ankle (L)','Ankle (R)','Neck'
];

reg('injuries', function() {
  const injuries = S.g('injuries') || [];
  const active = injuries.filter(i => !i.recovered);
  const recovered = injuries.filter(i => i.recovered);

  // Count exercises flagged
  let flaggedCount = 0;
  if (typeof ExDB !== 'undefined') {
    flaggedCount = ExDB.all.filter(ex => MuscleEngine.injuryWarning(ex.n)).length;
  }

  function severityBadge(s) {
    const colors = { Mild:'badge-green', Moderate:'badge-amber', Severe:'badge-red' };
    return '<span class="badge ' + (colors[s]||'badge-amber') + '">' + esc(s||'Mild') + '</span>';
  }

  const activeRows = active.length ? active.map((inj,i) =>
    '<div class="card card-dark" style="margin:0 16px 12px">' +
    '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px">' +
    '<div><div style="font-size:16px;font-weight:700">' + esc(inj.bodyPart) + '</div>' +
    '<div style="font-size:12px;color:var(--txt3);margin-top:2px">' + fmtDate(inj.date) + ' · ' + daysAgo(inj.date) + ' days ago</div>' +
    '</div>' + severityBadge(inj.severity) + '</div>' +
    (inj.note ? '<div style="font-size:13px;color:var(--txt2);margin-bottom:10px">' + esc(inj.note) + '</div>' : '') +
    '<div style="display:flex;gap:8px">' +
    '<button class="btn btn-g btn-sm" style="flex:1" onclick="markRecovered(' + i + ')">✓ Recovered</button>' +
    '<button class="btn btn-r btn-sm" style="width:auto;padding:9px 14px" onclick="deleteInjury(' + i + ')">🗑️</button>' +
    '</div></div>'
  ).join('') : emptyState('🩹', 'No active injuries', 'Log an injury to activate the smart exercise filter');

  const recoveredRows = recovered.length ? recovered.slice(-5).reverse().map(inj =>
    '<div class="ex-row" style="padding:12px 0">' +
    '<div class="ex-icon" style="font-size:20px">✅</div>' +
    '<div class="ex-info"><div class="ex-name">' + esc(inj.bodyPart) + '</div>' +
    '<div class="ex-sub">' + fmtDate(inj.date) + ' · ' + esc(inj.severity||'') + '</div></div>' +
    '</div>'
  ).join('') : '<div style="padding:16px;color:var(--txt3);font-size:13px">No recovery history</div>';

  return topbar('Injuries', null, '<button class="topbar-icon" onclick="openAddInjury()">＋</button>') +

  (active.length ? '<div class="ai-msg" style="margin:12px 16px;border-left-color:var(--c4)">' +
    '<div class="ai-msg-t" style="color:var(--c4)">⚠️ Injury Guard Active</div>' +
    '<div class="ai-msg-m">' + active.length + ' active injury · ' + flaggedCount + ' exercises flagged in workout logger</div>' +
    '</div>' : '') +

  sh('Active Injuries', '+ Log', "openAddInjury()") +
  activeRows +

  sh('Safe Exercises') +
  '<div class="card card-dark" style="margin:0 16px 14px">' +
  '<div style="font-size:14px;color:var(--txt2);margin-bottom:12px">Exercises recommended based on your injuries:</div>' +
  (active.length ?
    ExDB.safeFor(injuries).slice(0,6).map(ex =>
      '<div class="ex-row" style="padding:10px 0" onclick="showExDetail(\'' + esc(ex.n).replace(/'/g,"\\'") + '\')">' +
      '<div class="ex-icon">' + (ex.em||'💪') + '</div>' +
      '<div class="ex-info"><div class="ex-name">' + esc(ex.n) + '</div><div class="ex-sub">' + esc(ex.pri||'') + '</div></div>' +
      '</div>'
    ).join('') :
    '<div style="color:var(--c3);font-size:14px">All exercises available — no active injuries</div>'
  ) +
  '</div>' +

  sh('Recovery History') +
  '<div class="card card-dark" style="margin:0 16px 14px;padding:0 4px">' + recoveredRows + '</div>' +
  '<div style="height:8px"></div>';
});

let _selParts = [];
let _selSeverity = 'Moderate';

function openAddInjury() {
  _selParts = [];
  _selSeverity = 'Moderate';
  const partBtns = BODY_PARTS.map(p =>
    '<button class="body-part" id="bp-' + p.replace(/[\s()]/g,'') + '" onclick="toggleBodyPart(\'' + esc(p) + '\')">' + esc(p) + '</button>'
  ).join('');
  modal('Log Injury',
    '<div style="font-size:13px;color:var(--txt3);margin-bottom:10px">Select affected area(s):</div>' +
    '<div class="body-parts-grid" id="body-parts-grid">' + partBtns + '</div>' +
    '<div style="margin:14px 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--txt3)">Severity</div>' +
    '<div class="severity-row">' +
    '<button class="severity-btn mild" id="sev-Mild" onclick="selectSeverity(\'Mild\')">Mild</button>' +
    '<button class="severity-btn moderate sel" id="sev-Moderate" onclick="selectSeverity(\'Moderate\')">Moderate</button>' +
    '<button class="severity-btn severe" id="sev-Severe" onclick="selectSeverity(\'Severe\')">Severe</button>' +
    '</div>' +
    '<div class="field-wrap"><label class="field-label">Notes (optional)</label><input class="field" id="inj-note" type="text" placeholder="e.g. pain when pressing overhead"></div>',
    '<button class="btn btn-p" onclick="saveInjury()">Log Injury</button>'
  );
}
window.openAddInjury = openAddInjury;

function toggleBodyPart(part) {
  const idx = _selParts.indexOf(part);
  if (idx >= 0) _selParts.splice(idx, 1);
  else _selParts.push(part);
  const btn = document.getElementById('bp-' + part.replace(/[\s()]/g,''));
  if (btn) btn.classList.toggle('sel', _selParts.includes(part));
}
window.toggleBodyPart = toggleBodyPart;

function selectSeverity(sev) {
  _selSeverity = sev;
  ['Mild','Moderate','Severe'].forEach(s => {
    const btn = document.getElementById('sev-'+s);
    if (btn) btn.classList.toggle('sel', s===sev);
  });
}
window.selectSeverity = selectSeverity;

function saveInjury() {
  if (!_selParts.length) { toast('Select at least one body part', 'warn'); return; }
  const note = document.getElementById('inj-note') ? document.getElementById('inj-note').value : '';
  const injuries = S.g('injuries') || [];
  _selParts.forEach(part => {
    injuries.push({ bodyPart:part, severity:_selSeverity, date:isoNow(), note, recovered:false });
  });
  S.set('injuries', injuries);
  closeModal();
  toast('Injury logged. Workout filter activated.', 'warn');
  haptic(30);
  go('injuries');
}
window.saveInjury = saveInjury;

function markRecovered(idx) {
  const injuries = S.g('injuries') || [];
  const active = injuries.filter(i => !i.recovered);
  const inj = active[idx];
  if (!inj) return;
  const allIdx = injuries.indexOf(inj);
  injuries[allIdx].recovered = true;
  injuries[allIdx].recoveredDate = isoNow();
  S.set('injuries', injuries);
  toast('Recovery logged! 🎉', 'ok');
  haptic(30);
  go('injuries');
}
window.markRecovered = markRecovered;

function deleteInjury(idx) {
  const injuries = S.g('injuries') || [];
  const active = injuries.filter(i => !i.recovered);
  const inj = active[idx];
  if (!inj) return;
  const allIdx = injuries.indexOf(inj);
  injuries.splice(allIdx, 1);
  S.set('injuries', injuries);
  toast('Injury removed', 'ok');
  haptic([50,30,50]);
  go('injuries');
}
window.deleteInjury = deleteInjury;
