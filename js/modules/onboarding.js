'use strict';
/* ── FitnessOS v4 — Onboarding (12 steps) ── */

let _obData = {};
let _obStep = 1;
const OB_TOTAL = 12;

const SPLIT_WEEKLY = { ppl:6, ul:4, fb:3, bro:5, str:4, home:4, custom:4 };

window.obSelect = function(field, val) {
  _obData[field] = val;
  if (field === 'split') _obData.weeklyGoal = SPLIT_WEEKLY[val] || 4;
  document.querySelectorAll('[data-field="' + field + '"]').forEach(el => el.classList.remove('sel'));
  const t = document.querySelector('[data-field="' + field + '"][data-val="' + val + '"]');
  if (t) t.classList.add('sel');
};

window.obToggle = function(field, val) {
  if (!_obData[field]) _obData[field] = [];
  const idx = _obData[field].indexOf(val);
  if (idx >= 0) _obData[field].splice(idx, 1);
  else _obData[field].push(val);
  const el = document.querySelector('[data-field="' + field + '"][data-val="' + val + '"]');
  if (el) el.classList.toggle('sel', _obData[field].includes(val));
};

window.obBack = function() {
  if (_obStep > 1) { _obStep--; go('onboarding'); }
};

window.obContinue = function() {
  if (!_validateStep(_obStep)) return;
  if (_obStep < OB_TOTAL) { _obStep++; go('onboarding'); }
  else _finishOnboarding();
};

function _validateStep(step) {
  if (step === 1 && !(_obData.name && _obData.name.trim())) {
    const inp = document.getElementById('ob-name-inp');
    if (inp) { inp.style.borderColor='#ff4444'; inp.focus(); }
    toast('Enter your name to continue', 'warn');
    return false;
  }
  return true;
}

function _finishOnboarding() {
  const u = S.g('user') || {};
  Object.assign(u, {
    name: (_obData.name||'Athlete').trim(),
    goal: _obData.goal || 'hypertrophy',
    exp: _obData.exp || 'intermediate',
    gender: _obData.gender || 'male',
    age: parseInt(_obData.age) || 25,
    units: _obData.units || 'metric',
    height: parseFloat(_obData.height) || 175,
    weight: parseFloat(_obData.weight) || 75,
    goalWeight: parseFloat(_obData.goalWeight) || 70,
    targetBodyFat: parseFloat(_obData.targetBodyFat) || 15,
    split: _obData.split || 'ppl',
    weeklyGoal: _obData.weeklyGoal || 4,
    equipment: _obData.equipment || ['barbell','dumbbell','cables','machine','bar'],
    gymBrands: _obData.gymBrands || [],
    gymDays: _obData.gymDays || [],
    injuries: _obData.injuries || [],
    coachPersonality: _obData.personality || 'maya',
    joinDate: today()
  });
  const selSupps = (_obData.supplements || []).map(id => {
    const db = SupplementDB.find(s=>s.id===id);
    return db ? { id:db.id, name:db.name, timing:_obData['suppTiming_'+id]||db.timing, dose:db.dose, active:true } : null;
  }).filter(Boolean);
  S.set('user', u);
  S.set('supplements', selSupps);
  S.set('onboarded', true);
  toast('Welcome, ' + u.name + '! Let\'s build.', 'ok', 4000);
  go('dashboard');
}

function _dots(step) {
  let h = '<div class="ob-progress-wrap">';
  for (let i=1; i<=OB_TOTAL; i++) h += '<div class="ob-dot'+(i===step?' on':'')+'"></div>';
  return h + '</div>';
}

function _footer(step) {
  return '<div class="ob-footer">' +
    '<button class="btn btn-primary" onclick="obContinue()">' +
    (step < OB_TOTAL ? 'Continue →' : 'Start Training 💪') +
    '</button>' +
    (step > 1 ? '<button class="btn btn-ghost" onclick="obBack()">← Back</button>' : '') +
    '</div>';
}

function _opt(field, val, icon, title, sub, multi) {
  const fn = multi ? 'obToggle' : 'obSelect';
  const isOn = multi
    ? (_obData[field]||[]).includes(val)
    : _obData[field]===val;
  return '<button class="ob-opt'+(isOn?' sel':'')+'" data-field="'+field+'" data-val="'+val+'" onclick="'+fn+'(\''+field+'\',\''+val+'\')">' +
    (icon?'<div class="ob-opt-icon">'+icon+'</div>':'') +
    '<div class="ob-opt-info">' +
    '<div class="ob-opt-title">'+esc(title)+'</div>' +
    (sub?'<div class="ob-opt-sub">'+esc(sub)+'</div>':'') +
    '</div>' +
    '<div class="ob-opt-check">'+(isOn?'✓':'')+'</div>' +
    '</button>';
}

const OB_STEPS = {
  1() {
    return '<div class="ob-screen">' + _dots(1) +
      '<div class="ob-title">Hey there! 👋<br>What should we call you?</div>' +
      '<div class="ob-sub">This is your personal training OS. Let\'s make it yours.</div>' +
      '<div class="ob-body">' +
      '<div class="field-wrap">' +
      '<label class="field-label">Your Name</label>' +
      '<input id="ob-name-inp" class="field" type="text" placeholder="Enter your name" value="'+esc(_obData.name||'')+'" oninput="_obData.name=this.value" style="font-size:22px;font-weight:700;padding:18px 16px" autocomplete="name" autofocus>' +
      '</div></div>' + _footer(1) + '</div>';
  },
  2() {
    return '<div class="ob-screen">' + _dots(2) +
      '<div class="ob-title">What\'s your primary goal?</div>' +
      '<div class="ob-sub">Your AI coach will build everything around this.</div>' +
      '<div class="ob-body">' +
      _opt('goal','hypertrophy','💪','Build Muscle','Gain lean muscle mass and improve body composition') +
      _opt('goal','fat_loss','🔥','Lose Fat','Reduce body fat while preserving muscle') +
      _opt('goal','recomp','⚡','Recomposition','Simultaneously build muscle and lose fat') +
      _opt('goal','athletic','🏃','Athletic Performance','Speed, power, and functional fitness') +
      _opt('goal','strength','🏋️','Get Stronger','Maximise strength in the big lifts') +
      _opt('goal','maintenance','✅','Maintain','Stay fit and healthy, no dramatic changes') +
      '</div>' + _footer(2) + '</div>';
  },
  3() {
    return '<div class="ob-screen">' + _dots(3) +
      '<div class="ob-title">Training experience?</div>' +
      '<div class="ob-sub">Honest answers get better programs. No judgement here.</div>' +
      '<div class="ob-body">' +
      _opt('exp','beginner','🌱','Beginner','Less than 1 year of consistent training') +
      _opt('exp','intermediate','💪','Intermediate','1-3 years of consistent training') +
      _opt('exp','advanced','🔥','Advanced','3+ years with structured programming') +
      _opt('exp','athlete','🏆','Athlete','Competitive sport background or elite training') +
      '</div>' + _footer(3) + '</div>';
  },
  4() {
    const units = _obData.units || 'metric';
    return '<div class="ob-screen">' + _dots(4) +
      '<div class="ob-title">About you</div>' +
      '<div class="ob-sub">Used for accurate calorie and strength calculations.</div>' +
      '<div class="ob-body">' +
      '<div class="field-row">' +
      '<div class="field-wrap">' +
      '<label class="field-label">Gender</label>' +
      '<div style="display:flex;gap:8px">' +
      '<button class="ob-opt'+((_obData.gender||'male')==='male'?' sel':'')+'" data-field="gender" data-val="male" onclick="obSelect(\'gender\',\'male\')" style="flex:1;padding:12px 8px;justify-content:center"><div class="ob-opt-title">♂ Male</div></button>' +
      '<button class="ob-opt'+((_obData.gender||'')==='female'?' sel':'')+'" data-field="gender" data-val="female" onclick="obSelect(\'gender\',\'female\')" style="flex:1;padding:12px 8px;justify-content:center"><div class="ob-opt-title">♀ Female</div></button>' +
      '</div></div>' +
      '<div class="field-wrap">' +
      '<label class="field-label">Age</label>' +
      '<input class="field" type="number" min="14" max="80" placeholder="25" value="'+(_obData.age||'')+'" oninput="_obData.age=this.value" style="font-size:18px">' +
      '</div></div>' +
      '<div style="margin-bottom:14px">' +
      '<label class="field-label">Units</label>' +
      '<div style="display:flex;gap:8px">' +
      '<button class="ob-opt'+(units==='metric'?' sel':'')+'" data-field="units" data-val="metric" onclick="obSelect(\'units\',\'metric\');obSelect(\'heightUnit\',\'cm\');obSelect(\'weightUnit\',\'kg\');go(\'onboarding\')" style="flex:1;padding:12px;justify-content:center"><div class="ob-opt-title">Metric (kg/cm)</div></button>' +
      '<button class="ob-opt'+(units==='imperial'?' sel':'')+'" data-field="units" data-val="imperial" onclick="obSelect(\'units\',\'imperial\');obSelect(\'heightUnit\',\'in\');obSelect(\'weightUnit\',\'lb\');go(\'onboarding\')" style="flex:1;padding:12px;justify-content:center"><div class="ob-opt-title">Imperial (lb/in)</div></button>' +
      '</div></div>' +
      '</div>' + _footer(4) + '</div>';
  },
  5() {
    const u = _obData.units === 'imperial';
    const hLabel = u ? 'Height (in)' : 'Height (cm)';
    const wLabel = u ? 'Weight (lb)' : 'Weight (kg)';
    const gwLabel = u ? 'Goal Weight (lb)' : 'Goal Weight (kg)';
    return '<div class="ob-screen">' + _dots(5) +
      '<div class="ob-title">Body stats</div>' +
      '<div class="ob-sub">Used to calculate your TDEE, macros, and progress projections.</div>' +
      '<div class="ob-body">' +
      '<div class="field-row">' +
      '<div class="field-wrap"><label class="field-label">'+hLabel+'</label>' +
      '<input class="field" type="number" placeholder="'+(u?'70':'175')+'" value="'+(_obData.height||'')+'" oninput="_obData.height=this.value" style="font-size:18px"></div>' +
      '<div class="field-wrap"><label class="field-label">'+wLabel+'</label>' +
      '<input class="field" type="number" placeholder="'+(u?'165':'75')+'" value="'+(_obData.weight||'')+'" oninput="_obData.weight=this.value" style="font-size:18px"></div>' +
      '</div>' +
      '<div class="field-row">' +
      '<div class="field-wrap"><label class="field-label">'+gwLabel+'</label>' +
      '<input class="field" type="number" placeholder="'+(u?'155':'70')+'" value="'+(_obData.goalWeight||'')+'" oninput="_obData.goalWeight=this.value" style="font-size:18px"></div>' +
      '<div class="field-wrap"><label class="field-label">Body Fat % <span style="color:rgba(255,255,255,0.4);font-weight:400">(optional)</span></label>' +
      '<input class="field" type="number" placeholder="15" min="3" max="50" value="'+(_obData.targetBodyFat||'')+'" oninput="_obData.targetBodyFat=this.value" style="font-size:18px"></div>' +
      '</div>' +
      '</div>' + _footer(5) + '</div>';
  },
  6() {
    return '<div class="ob-screen">' + _dots(6) +
      '<div class="ob-title">Training split</div>' +
      '<div class="ob-sub">Your weekly workout structure. Weekly days auto-set.</div>' +
      '<div class="ob-body">' +
      _opt('split','ppl','🔄','Push Pull Legs','6 days/week — the gold standard for hypertrophy') +
      _opt('split','ul','↕️','Upper Lower','4 days/week — balanced frequency and volume') +
      _opt('split','fb','⭕','Full Body','3 days/week — maximum frequency for beginners') +
      _opt('split','bro','💪','Bro Split','5 days/week — one muscle group per day') +
      _opt('split','str','🏋️','Strength Focus','4 days/week — powerlifting-style programming') +
      _opt('split','home','🏠','Home Warrior','4 days/week — minimal equipment at home') +
      '</div>' + _footer(6) + '</div>';
  },
  7() {
    const equip = _obData.equipment || [];
    const brands = _obData.gymBrands || [];
    const equipList = [
      {v:'barbell',l:'Barbell & Rack'},{v:'dumbbell',l:'Dumbbells'},{v:'cables',l:'Cable Machine'},
      {v:'machine',l:'Weight Machines'},{v:'bar',l:'Pull-up Bar'},{v:'kettlebell',l:'Kettlebell'},
      {v:'bands',l:'Resistance Bands'},{v:'legpress',l:'Leg Press'},{v:'smith',l:'Smith Machine'},
      {v:'crossover',l:'Cable Crossover'}
    ];
    const brandList = ['Life Fitness','Technogym','Hammer Strength','Precor','Matrix','No preference'];
    return '<div class="ob-screen">' + _dots(7) +
      '<div class="ob-title">Where do you train?</div>' +
      '<div class="ob-sub">Select all equipment you have regular access to.</div>' +
      '<div class="ob-body">' +
      '<div class="ob-sub" style="color:rgba(255,255,255,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">EQUIPMENT</div>' +
      equipList.map(e => {
        const on = equip.includes(e.v);
        return '<button class="ob-opt'+(on?' sel':'')+'" data-field="equipment" data-val="'+e.v+'" onclick="obToggle(\'equipment\',\''+e.v+'\')" style="margin-bottom:8px;width:100%">' +
          '<div class="ob-opt-title">'+e.l+'</div>' +
          '<div class="ob-opt-check" style="margin-left:auto">'+(on?'✓':'')+'</div></button>';
      }).join('') +
      '<div class="ob-sub" style="color:rgba(255,255,255,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:16px 0 8px">GYM BRAND (optional)</div>' +
      brandList.map(b => {
        const on = brands.includes(b);
        return '<button class="ob-opt'+(on?' sel':'')+'" data-field="gymBrands" data-val="'+b+'" onclick="obToggle(\'gymBrands\',\''+esc(b)+'\')" style="margin-bottom:8px;width:100%">' +
          '<div class="ob-opt-title">'+esc(b)+'</div>' +
          '<div class="ob-opt-check" style="margin-left:auto">'+(on?'✓':'')+'</div></button>';
      }).join('') +
      '</div>' + _footer(7) + '</div>';
  },
  8() {
    const days = _obData.gymDays || [];
    const dList = [{v:'mon',l:'Mon'},{v:'tue',l:'Tue'},{v:'wed',l:'Wed'},{v:'thu',l:'Thu'},{v:'fri',l:'Fri'},{v:'sat',l:'Sat'},{v:'sun',l:'Sun'}];
    return '<div class="ob-screen">' + _dots(8) +
      '<div class="ob-title">Gym schedule</div>' +
      '<div class="ob-sub">Which days do you train? Select all that apply.</div>' +
      '<div class="ob-body">' +
      '<div style="display:flex;flex-wrap:wrap;gap:10px">' +
      dList.map(d => {
        const on = days.includes(d.v);
        return '<button class="ob-opt'+(on?' sel':'')+'" data-field="gymDays" data-val="'+d.v+'" onclick="obToggle(\'gymDays\',\''+d.v+'\')" style="flex:1;min-width:80px;justify-content:center;padding:16px 8px">' +
          '<div class="ob-opt-title" style="text-align:center">'+d.l+'</div></button>';
      }).join('') +
      '</div></div>' + _footer(8) + '</div>';
  },
  9() {
    const parts = [
      {v:'none',l:'None / No injuries 🙌'},
      {v:'left_shoulder',l:'Left Shoulder'},{v:'right_shoulder',l:'Right Shoulder'},
      {v:'lower_back',l:'Lower Back'},{v:'upper_back',l:'Upper Back'},
      {v:'left_knee',l:'Left Knee'},{v:'right_knee',l:'Right Knee'},
      {v:'left_elbow',l:'Left Elbow'},{v:'right_elbow',l:'Right Elbow'},
      {v:'wrist',l:'Wrist'},{v:'neck',l:'Neck'},{v:'hip',l:'Hip'}
    ];
    const inj = _obData.injuries || [];
    return '<div class="ob-screen">' + _dots(9) +
      '<div class="ob-title">Any injuries or pain areas?</div>' +
      '<div class="ob-sub">Your coach will modify exercises to protect these areas.</div>' +
      '<div class="ob-body">' +
      parts.map(p => {
        const on = inj.includes(p.v) || (p.v==='none' && inj.length===0 && _obData._injTouched);
        return '<button class="ob-opt'+(on?' sel':'')+'" data-field="injuries" data-val="'+p.v+'" onclick="' +
          (p.v==='none' ? '_obData.injuries=[];_obData._injTouched=true;document.querySelectorAll(\'[data-field=injuries]\').forEach(e=>e.classList.remove(\'sel\'));this.classList.add(\'sel\')' :
          '_obData._injTouched=true;obToggle(\'injuries\',\''+p.v+'\')') +
          '" style="margin-bottom:8px;width:100%">' +
          '<div class="ob-opt-title">'+p.l+'</div></button>';
      }).join('') +
      '</div>' + _footer(9) + '</div>';
  },
  10() {
    const coaches = [
      {v:'alex',e:'🔥',n:'Alex — Drill Sergeant',d:'"No excuses. Maximum effort. Every rep or nothing."'},
      {v:'maya',e:'🧪',n:'Maya — Sports Scientist',d:'"Data-driven precision training. Optimise every variable."'},
      {v:'sam',e:'⚡',n:'Sam — The Motivator',d:'"You\'ve got this! Every single rep counts. Let\'s go!"'},
      {v:'zen',e:'🧘',n:'Zen — Mindful Coach',d:'"Listen to your body. Train smart, recover harder."'},
      {v:'rex',e:'💪',n:'Rex — The Powerlifter',d:'"Strength above all. Add weight, repeat forever."'}
    ];
    return '<div class="ob-screen">' + _dots(10) +
      '<div class="ob-title">Pick your coach</div>' +
      '<div class="ob-sub">Their personality shapes all coaching messages and motivation.</div>' +
      '<div class="ob-body">' +
      coaches.map(c => _opt('personality', c.v, c.e, c.n, c.d)) .join('') +
      '</div>' + _footer(10) + '</div>';
  },
  11() {
    const sel = _obData.supplements || [];
    const timingOptions = ['pre','post','morning','night','anytime','with_meal'];
    const timingLabels = { pre:'Pre-Workout', post:'Post-Workout', morning:'Morning', night:'Before Bed', anytime:'Any Time', with_meal:'With Meal' };
    return '<div class="ob-screen">' + _dots(11) +
      '<div class="ob-title">Supplement stack</div>' +
      '<div class="ob-sub">Select what you take. We\'ll build a timing schedule.</div>' +
      '<div class="ob-body">' +
      SupplementDB.map(s => {
        const isOn = sel.includes(s.id);
        const timing = _obData['suppTiming_'+s.id] || s.timing;
        return '<div style="margin-bottom:8px">' +
          '<button class="ob-opt'+(isOn?' sel':'')+'" data-field="supplements" data-val="'+s.id+'" onclick="obToggle(\'supplements\',\''+s.id+'\')" style="margin-bottom:0;width:100%;border-radius:'+(isOn?'16px 16px 0 0':'16px')+'">' +
          '<div class="ob-opt-title">'+esc(s.name)+'</div>' +
          '<div class="ob-opt-sub">'+esc(s.dose)+'</div>' +
          '<div class="ob-opt-check" style="margin-left:auto">'+(isOn?'✓':'')+'</div>' +
          '</button>' +
          (isOn ? '<div style="background:var(--bg4);border:1.5px solid var(--c1);border-top:none;border-radius:0 0 16px 16px;padding:10px 14px">' +
            '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--txt3);margin-bottom:6px">TIMING</div>' +
            '<div style="display:flex;flex-wrap:wrap;gap:6px">' +
            timingOptions.map(t => '<button onclick="_obData[\'suppTiming_'+s.id+'\']=\''+t+'\';document.getElementById(\'st_'+s.id+'_'+t+'\').classList.add(\'sel\');document.querySelectorAll(\'.st_'+s.id+'\').forEach(e=>e.classList.remove(\'sel\'));this.classList.add(\'sel\')" class="pill st_'+s.id+(timing===t?' on':'')+'" id="st_'+s.id+'_'+t+'">'+timingLabels[t]+'</button>'
            ).join('') +
            '</div></div>' : '') +
          '</div>';
      }).join('') +
      '</div>' + _footer(11) + '</div>';
  },
  12() {
    const u = _obData;
    const name = (u.name || 'Athlete').trim();
    const coaches = { alex:'Alex', maya:'Maya', sam:'Sam', zen:'Zen', rex:'Rex' };
    const splits = { ppl:'Push Pull Legs', ul:'Upper Lower', fb:'Full Body', bro:'Bro Split', str:'Strength', home:'Home Warrior' };
    const goals = { hypertrophy:'Build Muscle', fat_loss:'Lose Fat', recomp:'Recomposition', athletic:'Athletic', strength:'Strength', maintenance:'Maintain' };
    const cName = coaches[u.personality||'maya'] || 'Maya';
    const cEmoji = { alex:'🔥', maya:'🧪', sam:'⚡', zen:'🧘', rex:'💪' }[u.personality||'maya'] || '🧪';
    return '<div class="ob-screen">' + _dots(12) +
      '<div style="text-align:center;padding:24px 0 20px">' +
      '<div style="font-size:64px;margin-bottom:16px">'+cEmoji+'</div>' +
      '<div style="font-size:28px;font-weight:900;color:#fff;letter-spacing:-1px">Ready, '+esc(name)+'!</div>' +
      '<div style="font-size:15px;color:rgba(255,255,255,0.65);margin-top:8px">Your OS has been calibrated.</div>' +
      '</div>' +
      '<div class="card card-solid" style="margin:0 0 14px">' +
      _summaryRow('🎯','Goal', goals[u.goal||'hypertrophy'] || u.goal || '—') +
      _summaryRow('📅','Split', splits[u.split||'ppl'] || u.split || '—') +
      _summaryRow('🏋️','Experience', u.exp ? u.exp.charAt(0).toUpperCase()+u.exp.slice(1) : '—') +
      _summaryRow('⚡','Coach', cName) +
      _summaryRow('💊','Supplements', (u.supplements||[]).length + ' selected') +
      (u.injuries && u.injuries.length && !u.injuries.includes('none') ? _summaryRow('⚠️','Injuries', u.injuries.length + ' flagged') : '') +
      '</div>' +
      '<div class="ob-body">' +
      '<div class="ai-msg"><div class="ai-msg-header"><span>'+cEmoji+'</span><span class="ai-msg-label">'+cName+' says</span></div>' +
      '<div class="ai-msg-text">Your program is personalised and ready. Log every workout, track your recovery, and trust the process. FitnessOS will adapt as you grow.</div></div>' +
      '</div>' +
      _footer(12) + '</div>';
  }
};

function _summaryRow(icon, label, val) {
  return '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)">' +
    '<div style="display:flex;align-items:center;gap:10px;color:var(--txt3);font-size:13px">'+icon+' <span>'+esc(label)+'</span></div>' +
    '<div style="font-size:14px;font-weight:600;color:var(--txt)">'+esc(val)+'</div>' +
    '</div>';
}

reg('onboarding', function() {
  return OB_STEPS[_obStep] ? OB_STEPS[_obStep]() : OB_STEPS[1]();
});
