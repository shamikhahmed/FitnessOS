'use strict';
/* ── FitnessOS v4 — Body Map ── */

let _bodyView = 'front';

reg('bodymap', function() {
  const user = S.g('user') || {};
  const muscleColors = MuscleEngine.bodyMapColors();
  const muscleStatus = MuscleEngine.status();
  const measurements = S.g('measurements') || [];
  const latestMeas = measurements.length ? measurements[measurements.length-1] : null;
  const prevMeas = measurements.length > 1 ? measurements[measurements.length-2] : null;
  const bmiData = BodyEngine.bmi(user.weight||75, user.height||175);
  const bmr = BodyEngine.bmr(user);
  const tdee = BodyEngine.tdee(user);
  const fatProj = BodyEngine.fatLossProjection(user);
  const healthyRange = BodyEngine.healthyWeightRange(user.height||175, user.gender||'male');

  return '<div class="topbar"><div><div class="topbar-title">Body Map</div>' +
    '<div class="topbar-date">Recovery tracker</div></div>' +
    '<div class="topbar-right"><button class="topbar-icon" onclick="go(\'progress\')">📈</button></div></div>' +

    _bodyMapSection(muscleColors) +
    _muscleStatusBars(muscleStatus) +
    _measurementsSection(latestMeas, prevMeas, user) +
    _healthPanel(bmiData, bmr, tdee, healthyRange, fatProj, user) +
    '<div style="height:20px"></div>';
});

function _bodyMapSection(colors) {
  const view = _bodyView;
  const c = key => colors[key.toLowerCase()] || 'var(--bg4)';

  const frontSVG = `<svg viewBox="0 0 200 420" width="180" height="380" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 4px 24px rgba(0,0,0,0.4))">
    <!-- Head -->
    <ellipse cx="100" cy="32" rx="22" ry="26" fill="${c('head')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Head',event)" style="cursor:pointer"/>
    <!-- Neck -->
    <rect x="89" y="56" width="22" height="18" rx="6" fill="${c('neck')}" stroke="var(--border)" stroke-width="1.5"/>
    <!-- Traps -->
    <path d="M69 72 Q100 68 131 72 L135 90 Q100 88 65 90 Z" fill="${c('traps')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Traps',event)" style="cursor:pointer"/>
    <!-- Upper Chest -->
    <path d="M70 90 L100 92 L130 90 L128 112 L100 114 L72 112 Z" fill="${c('upper_chest')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Chest',event)" style="cursor:pointer"/>
    <!-- Lower Chest -->
    <path d="M72 112 L100 114 L128 112 L126 130 L100 132 L74 130 Z" fill="${c('lower_chest')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Chest',event)" style="cursor:pointer"/>
    <!-- Front Delts L -->
    <ellipse cx="60" cy="100" rx="13" ry="16" fill="${c('front_delts')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Shoulders',event)" style="cursor:pointer"/>
    <!-- Front Delts R -->
    <ellipse cx="140" cy="100" rx="13" ry="16" fill="${c('front_delts')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Shoulders',event)" style="cursor:pointer"/>
    <!-- Biceps L -->
    <path d="M48 116 Q40 130 42 148 L56 148 Q58 130 64 116 Z" fill="${c('biceps')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Biceps',event)" style="cursor:pointer"/>
    <!-- Biceps R -->
    <path d="M152 116 Q160 130 158 148 L144 148 Q142 130 136 116 Z" fill="${c('biceps')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Biceps',event)" style="cursor:pointer"/>
    <!-- Forearms L -->
    <path d="M42 148 Q38 168 42 186 L54 186 Q58 168 56 148 Z" fill="${c('forearms')}" stroke="var(--border)" stroke-width="1.5"/>
    <!-- Forearms R -->
    <path d="M158 148 Q162 168 158 186 L146 186 Q142 168 144 148 Z" fill="${c('forearms')}" stroke="var(--border)" stroke-width="1.5"/>
    <!-- Abs -->
    <path d="M78 132 L100 134 L122 132 L120 186 L100 188 L80 186 Z" fill="${c('abs')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Core',event)" style="cursor:pointer"/>
    <!-- Obliques L -->
    <path d="M78 132 L80 186 L68 184 L66 134 Z" fill="${c('obliques')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Core',event)" style="cursor:pointer"/>
    <!-- Obliques R -->
    <path d="M122 132 L120 186 L132 184 L134 134 Z" fill="${c('obliques')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Core',event)" style="cursor:pointer"/>
    <!-- Quads L -->
    <path d="M80 190 L100 190 L98 260 L78 258 Z" fill="${c('quads')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Quads',event)" style="cursor:pointer"/>
    <!-- Quads R -->
    <path d="M100 190 L120 190 L122 258 L102 260 Z" fill="${c('quads')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Quads',event)" style="cursor:pointer"/>
    <!-- Adductors L -->
    <path d="M78 190 L80 190 L78 258 L68 252 Z" fill="${c('adductors')}" stroke="var(--border)" stroke-width="1.5"/>
    <!-- Adductors R -->
    <path d="M120 190 L122 190 L132 252 L122 258 Z" fill="${c('adductors')}" stroke="var(--border)" stroke-width="1.5"/>
    <!-- Knees -->
    <ellipse cx="89" cy="268" rx="11" ry="9" fill="var(--bg3)" stroke="var(--border)" stroke-width="1.5"/>
    <ellipse cx="111" cy="268" rx="11" ry="9" fill="var(--bg3)" stroke="var(--border)" stroke-width="1.5"/>
    <!-- Calves L -->
    <path d="M78 278 Q76 300 80 326 L92 326 Q96 300 98 278 Z" fill="${c('calves')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Calves',event)" style="cursor:pointer"/>
    <!-- Calves R -->
    <path d="M102 278 Q104 300 108 326 L120 326 Q124 300 122 278 Z" fill="${c('calves')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Calves',event)" style="cursor:pointer"/>
  </svg>`;

  const backSVG = `<svg viewBox="0 0 200 420" width="180" height="380" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 4px 24px rgba(0,0,0,0.4))">
    <!-- Head -->
    <ellipse cx="100" cy="32" rx="22" ry="26" fill="${c('head')}" stroke="var(--border)" stroke-width="1.5"/>
    <!-- Neck -->
    <rect x="89" y="56" width="22" height="18" rx="6" fill="${c('neck')}" stroke="var(--border)" stroke-width="1.5"/>
    <!-- Traps upper -->
    <path d="M69 72 Q100 66 131 72 L135 92 Q100 88 65 92 Z" fill="${c('traps')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Traps',event)" style="cursor:pointer"/>
    <!-- Rear Delts L -->
    <ellipse cx="59" cy="100" rx="13" ry="16" fill="${c('rear_delts')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Rear Delts',event)" style="cursor:pointer"/>
    <!-- Rear Delts R -->
    <ellipse cx="141" cy="100" rx="13" ry="16" fill="${c('rear_delts')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Rear Delts',event)" style="cursor:pointer"/>
    <!-- Rhomboids / Upper Back -->
    <path d="M70 90 L100 92 L130 90 L128 118 L100 120 L72 118 Z" fill="${c('rhomboids')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Back',event)" style="cursor:pointer"/>
    <!-- Lats L -->
    <path d="M66 110 L78 110 L76 160 L62 158 Z" fill="${c('lats')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Lats',event)" style="cursor:pointer"/>
    <!-- Lats R -->
    <path d="M122 110 L134 110 L138 158 L124 160 Z" fill="${c('lats')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Lats',event)" style="cursor:pointer"/>
    <!-- Triceps L -->
    <path d="M48 116 Q40 132 42 150 L56 150 Q58 132 64 116 Z" fill="${c('triceps')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Triceps',event)" style="cursor:pointer"/>
    <!-- Triceps R -->
    <path d="M152 116 Q160 132 158 150 L144 150 Q142 132 136 116 Z" fill="${c('triceps')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Triceps',event)" style="cursor:pointer"/>
    <!-- Lower Back -->
    <path d="M78 120 L122 120 L120 170 L80 170 Z" fill="${c('lower_back')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Lower Back',event)" style="cursor:pointer"/>
    <!-- Glutes L -->
    <path d="M80 172 L100 172 L98 220 L76 218 Z" fill="${c('glutes')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Glutes',event)" style="cursor:pointer"/>
    <!-- Glutes R -->
    <path d="M100 172 L120 172 L124 218 L102 220 Z" fill="${c('glutes')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Glutes',event)" style="cursor:pointer"/>
    <!-- Hamstrings L -->
    <path d="M78 222 L98 222 L96 270 L76 268 Z" fill="${c('hamstrings')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Hamstrings',event)" style="cursor:pointer"/>
    <!-- Hamstrings R -->
    <path d="M102 222 L122 222 L124 268 L104 270 Z" fill="${c('hamstrings')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Hamstrings',event)" style="cursor:pointer"/>
    <!-- Calves L -->
    <path d="M78 276 Q76 298 80 324 L92 324 Q96 298 96 276 Z" fill="${c('calves')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Calves',event)" style="cursor:pointer"/>
    <!-- Calves R -->
    <path d="M104 276 Q104 298 108 324 L120 324 Q124 298 122 276 Z" fill="${c('calves')}" stroke="var(--border)" stroke-width="1.5" onclick="showMuscleTip('Calves',event)" style="cursor:pointer"/>
  </svg>`;

  return '<div style="padding:0 16px">' +
    '<div class="bodymap-toggle">' +
    '<button class="bodymap-toggle-btn'+(view==='front'?' on':'')+'" onclick="setBMView(\'front\')">Front</button>' +
    '<button class="bodymap-toggle-btn'+(view==='back'?' on':'')+'" onclick="setBMView(\'back\')">Back</button>' +
    '</div></div>' +
    '<div class="bodymap-wrap" id="bm-wrap">' +
    (view === 'front' ? frontSVG : backSVG) +
    '</div>';
}

function _muscleStatusBars(status) {
  const bars = status.slice(0,8).map(m => {
    const color = m.status === 'fresh' ? '#10B981' : m.status === 'recovering' ? '#f5c842' : '#ff6b35';
    return '<div style="margin-bottom:12px">' +
      '<div style="display:flex;justify-content:space-between;margin-bottom:4px">' +
      '<span style="font-size:13px;font-weight:600;color:var(--txt)">'+esc(m.name)+'</span>' +
      '<span style="font-size:12px;color:'+color+';font-weight:600">'+esc(m.label)+'</span>' +
      '</div>' +
      '<div style="height:6px;background:var(--bg4);border-radius:3px;overflow:hidden">' +
      '<div style="height:100%;width:'+m.pct+'%;background:'+color+';border-radius:3px;transition:width 0.4s var(--ease)"></div>' +
      '</div>' +
      (m.hrs ? '<div style="font-size:11px;color:var(--txt3);margin-top:2px">'+Math.round(m.hrs)+'h since training</div>' : '') +
      '</div>';
  }).join('');
  return sh('Muscle Recovery') +
    '<div style="padding:0 16px">'+bars+'</div>' +
    '<div style="padding:0 16px 16px">' +
    '<div class="ai-msg"><div class="ai-msg-header"><span>💡</span><span class="ai-msg-label">Recovery insight</span></div>' +
    '<div class="ai-msg-text">'+esc(_getRecoveryInsight(status))+'</div></div></div>';
}

function _getRecoveryInsight(status) {
  const fresh = status.filter(m => m.status === 'fresh');
  const sore = status.filter(m => m.status === 'sore');
  if (sore.length > 3) return 'High systemic fatigue detected. Consider a full rest day or light mobility work today.';
  if (fresh.length >= 6) return 'Most muscles are recovered. Perfect timing for a full body session or heavy compound lifts.';
  const freshNames = fresh.map(m=>m.name).slice(0,3).join(', ');
  return freshNames ? freshNames + ' are fully recovered — consider targeting these today.' : 'Mixed recovery — choose exercises targeting fresh muscle groups.';
}

function _measurementsSection(latest, prev, user) {
  const fields = [
    {k:'chest',l:'Chest'},{k:'waist',l:'Waist'},{k:'hips',l:'Hips'},
    {k:'armL',l:'Arm L'},{k:'armR',l:'Arm R'},
    {k:'thighL',l:'Thigh L'},{k:'thighR',l:'Thigh R'},
    {k:'calfL',l:'Calf L'},{k:'calfR',l:'Calf R'},
    {k:'neck',l:'Neck'},{k:'shoulders',l:'Shoulders'}
  ];
  const u = user.units === 'imperial' ? 'in' : 'cm';

  const grid = fields.map(f => {
    const val = latest ? (latest[f.k] || '—') : '—';
    const prev_val = prev ? (prev[f.k] || null) : null;
    let delta = '';
    if (val !== '—' && prev_val) {
      const diff = round2(parseFloat(val) - parseFloat(prev_val));
      if (diff > 0) delta = '<div class="meas-delta down">▼ '+Math.abs(diff)+u+' (goal)</div>';
      else if (diff < 0) delta = '<div class="meas-delta up">▲ '+Math.abs(diff)+u+'</div>';
    }
    return '<div class="meas-card"><div class="meas-v">'+esc(val)+(val!=='—'?u:'')+'</div>' +
      '<div class="meas-l">'+esc(f.l)+'</div>'+delta+'</div>';
  }).join('');

  return sh('Measurements', '+ Log', 'showLogMeasurements()') +
    '<div class="meas-grid">'+grid+'</div>';
}

function _healthPanel(bmi, bmr, tdee, healthyRange, fatProj, user) {
  const bmiColor = bmi.cat === 'Normal' ? '#10B981' : bmi.cat === 'Underweight' ? '#3B82F6' : bmi.cat === 'Overweight' ? '#f5c842' : '#ff4444';
  const projRows = fatProj.slice(0,4).map(w =>
    '<tr><td style="padding:6px 0;font-size:13px;color:var(--txt3)">Week '+w.week+'</td>' +
    '<td style="font-size:13px;font-weight:600;color:var(--txt)">'+w.weight+'kg</td>' +
    '<td style="font-size:13px;color:#10B981">−'+w.totalLost+'kg</td></tr>'
  ).join('');
  const timeToGoal = BodyEngine.timeToGoal(user);

  return sh('Health Metrics') +
    '<div style="padding:0 16px">' +
    '<div class="card card-solid">' +
    '<div style="display:flex;gap:16px;flex-wrap:wrap">' +
    _healthStat('BMI', bmi.bmi.toString(), bmi.cat, bmiColor) +
    _healthStat('BMR', bmr+'kcal', 'At rest') +
    _healthStat('TDEE', tdee+'kcal', 'With activity') +
    '</div>' +
    '<div class="divider"></div>' +
    '<div style="font-size:13px;color:var(--txt3);margin-bottom:6px">Healthy weight for your height:</div>' +
    '<div style="font-size:15px;font-weight:700;color:var(--txt)">'+healthyRange.min+'–'+healthyRange.max+'kg</div>' +
    '<div style="font-size:13px;color:var(--c1);margin-top:8px">🎯 At this rate, reach '+esc(user.goalWeight||70)+'kg in '+esc(timeToGoal)+'</div>' +
    '</div>' +
    '<div class="card card-solid" style="margin-top:14px">' +
    '<div style="font-size:15px;font-weight:700;color:var(--txt);margin-bottom:12px">Fat Loss Projection (0.5kg/week)</div>' +
    '<table style="width:100%;border-collapse:collapse">'+projRows+'</table>' +
    '</div></div>';
}

function _healthStat(label, val, sub, color) {
  return '<div style="flex:1;min-width:80px">' +
    '<div style="font-size:22px;font-weight:800;color:'+(color||'var(--c1)')+'">'+esc(val)+'</div>' +
    '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--txt3)">'+esc(label)+'</div>' +
    '<div style="font-size:12px;color:var(--txt3)">'+esc(sub)+'</div>' +
    '</div>';
}

window.setBMView = function(v) { _bodyView = v; go('bodymap'); };

window.showMuscleTip = function(name, event) {
  const st = MuscleEngine.status();
  const m = st.find(s => s.name.toLowerCase() === name.toLowerCase()) || { name, status:'fresh', label:'Ready', hrs:null };
  const color = m.status === 'fresh' ? '#10B981' : m.status === 'recovering' ? '#f5c842' : '#ff6b35';
  let existing = document.getElementById('muscle-tip');
  if (existing) existing.remove();
  const tip = document.createElement('div');
  tip.id = 'muscle-tip';
  tip.className = 'muscle-tooltip';
  tip.style.cssText = 'position:fixed;z-index:200;pointer-events:none';
  tip.innerHTML = '<div style="font-size:14px;font-weight:700;color:var(--txt);margin-bottom:4px">'+esc(m.name)+'</div>' +
    '<div style="font-size:12px;color:'+color+';font-weight:600">'+esc(m.label)+'</div>' +
    (m.hrs ? '<div style="font-size:12px;color:var(--txt3);margin-top:2px">'+Math.round(m.hrs)+'h ago</div>' : '<div style="font-size:12px;color:var(--txt3)">Not recently trained</div>');
  document.body.appendChild(tip);
  const x = Math.min(event.clientX + 8, window.innerWidth - 180);
  const y = Math.min(event.clientY - 60, window.innerHeight - 100);
  tip.style.left = x + 'px'; tip.style.top = y + 'px';
  setTimeout(() => { if (tip.parentNode) tip.parentNode.removeChild(tip); }, 2500);
};

window.showLogMeasurements = function() {
  const u = S.g('user.units') === 'imperial' ? 'in' : 'cm';
  const fields = ['chest','waist','hips','armL','armR','thighL','thighR','calfL','calfR','neck','shoulders'];
  const labels = { chest:'Chest',waist:'Waist',hips:'Hips',armL:'Arm L',armR:'Arm R',thighL:'Thigh L',thighR:'Thigh R',calfL:'Calf L',calfR:'Calf R',neck:'Neck',shoulders:'Shoulders' };
  const inputs = fields.map(f =>
    '<div class="field-wrap">' +
    '<label class="field-label">'+esc(labels[f])+' ('+u+')</label>' +
    '<input class="field" type="number" id="meas-'+f+'" placeholder="0" step="0.1" style="font-size:16px">' +
    '</div>'
  ).join('');
  modal('Log Measurements', inputs,
    '<button class="btn btn-primary" onclick="saveMeasurements()" style="margin-top:12px">Save</button>');
};

window.saveMeasurements = function() {
  const fields = ['chest','waist','hips','armL','armR','thighL','thighR','calfL','calfR','neck','shoulders'];
  const entry = { date: today() };
  fields.forEach(f => {
    const v = document.getElementById('meas-'+f)?.value;
    if (v) entry[f] = parseFloat(v);
  });
  S.push('measurements', entry);
  closeModal();
  toast('Measurements saved!', 'ok');
  go('bodymap');
};

window.round2 = function(n) { return Math.round(n*100)/100; };
