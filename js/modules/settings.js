'use strict';

App.register('settings', async function () {
  const user = await Storage.getUser();

  /* TDEE calculation (Mifflin-St Jeor) */
  function calcTDEE(u) {
    const w = u.units === 'imperial' ? (u.weight || 75) * 0.453592 : (u.weight || 75);
    const h = u.units === 'imperial' ? (u.height || 70) * 2.54 : (u.height || 175);
    const a = u.age || 25;
    let bmr = u.gender === 'female'
      ? 10 * w + 6.25 * h - 5 * a - 161
      : 10 * w + 6.25 * h - 5 * a + 5;
    const actMult = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9 };
    return Math.round(bmr * (actMult[u.activityLevel] || 1.55));
  }

  const tdee = calcTDEE(user);
  const unit = user.units === 'imperial' ? 'lbs' : 'kg';
  const heightUnit = user.units === 'imperial' ? 'in' : 'cm';

  const MACROS_PRESETS = [
    { name: 'Build Muscle', p: 35, c: 45, f: 20 },
    { name: 'Fat Loss', p: 40, c: 35, f: 25 },
    { name: 'Strength', p: 30, c: 50, f: 20 },
    { name: 'Keto', p: 30, c: 10, f: 60 },
    { name: 'Balanced', p: 30, c: 40, f: 30 },
  ];

  const THEMES = [
    { id: 'dark',   name: 'Dark',   cls: 'swatch-dark' },
    { id: 'forest', name: 'Forest', cls: 'swatch-forest' },
    { id: 'ocean',  name: 'Ocean',  cls: 'swatch-ocean' },
    { id: 'rose',   name: 'Rose',   cls: 'swatch-rose' },
    { id: 'slate',  name: 'Slate',  cls: 'swatch-slate' },
    { id: 'amber',  name: 'Amber',  cls: 'swatch-amber' },
  ];

  const SPLITS_META = {
    ppl: 'Push Pull Legs — 6 days/week',
    ul:  'Upper Lower — 4 days/week',
    fb:  'Full Body — 3 days/week',
    bro: 'Bro Split — 5 days/week',
    str: 'Strength — 4 days/week',
  };

  let h = App.topbar('Settings');
  h += '<div style="padding:14px 16px 0">';

  /* ── Profile ── */
  h += App.sh('Profile');
  h += '<div class="card" style="margin:0 0 12px">';
  h += '<div class="fw"><label class="field-label">Name</label><input id="s-name" class="field" value="' + App.esc(user.name || '') + '" placeholder="Your name" onchange="Cfg.save()"></div>';
  h += '<div class="g2">';
  h += '<div class="fw"><label class="field-label">Age</label><input id="s-age" class="field" type="number" inputmode="numeric" value="' + (user.age || '') + '" onchange="Cfg.save()"></div>';
  h += '<div class="fw"><label class="field-label">Gender</label><select id="s-gender" class="field" onchange="Cfg.save()">';
  [['male','Male'],['female','Female'],['neutral','Other']].forEach(function (o) {
    h += '<option value="' + o[0] + '"' + (user.gender === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
  });
  h += '</select></div>';
  h += '<div class="fw"><label class="field-label">Weight (' + unit + ')</label><input id="s-weight" class="field" type="number" inputmode="decimal" step="0.1" value="' + (user.weight || '') + '" onchange="Cfg.save()"></div>';
  h += '<div class="fw"><label class="field-label">Height (' + heightUnit + ')</label><input id="s-height" class="field" type="number" inputmode="decimal" step="0.5" value="' + (user.height || '') + '" onchange="Cfg.save()"></div>';
  h += '<div class="fw"><label class="field-label">Goal Weight</label><input id="s-goalw" class="field" type="number" inputmode="decimal" step="0.1" value="' + (user.goalWeight || '') + '" onchange="Cfg.save()"></div>';
  h += '<div class="fw"><label class="field-label">Activity Level</label><select id="s-activity" class="field" onchange="Cfg.save()">';
  [['sedentary','Sedentary'],['light','Light (1-2 days)'],['moderate','Moderate (3-5 days)'],['active','Active (6-7 days)'],['veryActive','Very Active']].forEach(function (o) {
    h += '<option value="' + o[0] + '"' + (user.activityLevel === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
  });
  h += '</select></div>';
  h += '</div>';
  h += '<div class="fw"><label class="field-label">Fitness Goal</label><select id="s-goal" class="field" onchange="Cfg.save()">';
  [['hypertrophy','Build Muscle'],['strength','Get Stronger'],['fat_loss','Lose Fat'],['recomp','Body Recomposition']].forEach(function (o) {
    h += '<option value="' + o[0] + '"' + (user.goal === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
  });
  h += '</select></div>';
  h += '<div class="fw"><label class="field-label">Experience</label><select id="s-exp" class="field" onchange="Cfg.save()">';
  [['beginner','Beginner'],['intermediate','Intermediate'],['advanced','Advanced']].forEach(function (o) {
    h += '<option value="' + o[0] + '"' + (user.exp === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
  });
  h += '</select></div>';
  h += '</div>';

  /* ── Units ── */
  h += App.sh('Units');
  h += '<div class="card" style="margin:0 0 12px">';
  h += '<div class="tog-row"><div><div class="tog-t">Weight Unit</div><div class="tog-s">kg or lbs</div></div>';
  h += '<div style="display:flex;gap:8px">';
  h += '<button class="btn btn-sm' + (user.units === 'metric' ? ' btn-primary' : ' btn-secondary') + '" onclick="Cfg.setUnit(\'metric\')">kg</button>';
  h += '<button class="btn btn-sm' + (user.units === 'imperial' ? ' btn-primary' : ' btn-secondary') + '" onclick="Cfg.setUnit(\'imperial\')">lbs</button>';
  h += '</div></div>';
  h += '<div class="tog-row"><div><div class="tog-t">Distance Unit</div><div class="tog-s">km or miles</div></div>';
  h += '<div style="display:flex;gap:8px">';
  h += '<button class="btn btn-sm' + (user.distanceUnit !== 'miles' ? ' btn-primary' : ' btn-secondary') + '" onclick="Cfg.setDistUnit(\'km\')">km</button>';
  h += '<button class="btn btn-sm' + (user.distanceUnit === 'miles' ? ' btn-primary' : ' btn-secondary') + '" onclick="Cfg.setDistUnit(\'miles\')">mi</button>';
  h += '</div></div></div>';

  /* ── TDEE & Nutrition Targets ── */
  h += App.sh('Nutrition Targets');
  h += '<div class="card" style="margin:0 0 12px">';
  h += '<div style="background:var(--bg4);border-radius:12px;padding:12px 14px;margin-bottom:12px">';
  h += '<div style="font-size:13px;color:var(--txt3);margin-bottom:2px">Estimated TDEE (Mifflin-St Jeor)</div>';
  h += '<div style="font-size:24px;font-weight:900;color:var(--accent)">' + tdee + ' kcal</div>';
  h += '</div>';
  h += '<div class="g2">';
  h += '<div class="fw"><label class="field-label">Daily Calories</label><input id="s-cal" class="field" type="number" inputmode="numeric" value="' + (user.calorieTarget || tdee) + '" onchange="Cfg.save()"></div>';
  h += '<div class="fw"><label class="field-label">Weekly Workouts Goal</label><input id="s-wkgoal" class="field" type="number" inputmode="numeric" value="' + (user.weeklyGoal || 4) + '" onchange="Cfg.save()"></div>';
  h += '<div class="fw"><label class="field-label">Protein (g)</label><input id="s-prot" class="field" type="number" inputmode="numeric" value="' + (user.proteinTarget || 180) + '" onchange="Cfg.save()"></div>';
  h += '<div class="fw"><label class="field-label">Carbs (g)</label><input id="s-carb" class="field" type="number" inputmode="numeric" value="' + (user.carbTarget || 270) + '" onchange="Cfg.save()"></div>';
  h += '<div class="fw"><label class="field-label">Fat (g)</label><input id="s-fat" class="field" type="number" inputmode="numeric" value="' + (user.fatTarget || 80) + '" onchange="Cfg.save()"></div>';
  h += '<div class="fw"><label class="field-label">Water (glasses)</label><input id="s-water" class="field" type="number" inputmode="numeric" value="' + (user.waterTarget || 8) + '" onchange="Cfg.save()"></div>';
  h += '</div>';
  h += '<div style="font-size:12px;color:var(--txt3);margin-bottom:8px">Macro presets:</div>';
  h += '<div style="display:flex;gap:6px;flex-wrap:wrap">';
  MACROS_PRESETS.forEach(function (mp) {
    h += '<button class="btn btn-secondary btn-xs" onclick="Cfg.applyMacroPreset(' + mp.p + ',' + mp.c + ',' + mp.f + ')">' + mp.name + '</button>';
  });
  h += '</div></div>';

  /* ── Training ── */
  h += App.sh('Training');
  h += '<div class="card" style="margin:0 0 12px">';
  h += '<div class="fw"><label class="field-label">Training Split</label><select id="s-split" class="field" onchange="Cfg.save()">';
  Object.keys(SPLITS_META).forEach(function (k) {
    h += '<option value="' + k + '"' + (user.split === k ? ' selected' : '') + '>' + SPLITS_META[k] + '</option>';
  });
  h += '</select></div>';
  h += '<div class="tog-row"><div><div class="tog-t">Rest Timer</div><div class="tog-s">Auto-start after each set</div></div>';
  h += '<label class="tgl"><input id="s-rest" type="checkbox"' + (user.restTimer !== false ? ' checked' : '') + ' onchange="Cfg.save()"><div class="tgl-track"></div><div class="tgl-thumb"></div></label></div>';
  h += '<div class="tog-row"><div class="tog-t">Rest Duration</div>';
  h += '<select id="s-restsecs" class="field" style="width:90px;padding:9px" onchange="Cfg.save()">';
  [60, 90, 120, 180, 240].forEach(function (v) {
    h += '<option value="' + v + '"' + ((user.restSecs || 90) === v ? ' selected' : '') + '>' + (v >= 60 ? Math.floor(v/60) + (v % 60 ? ':' + (v%60<10?'0':'') + v%60 : ' min') : v + 's') + '</option>';
  });
  h += '</select></div></div>';

  /* ── Theme ── */
  h += App.sh('Theme');
  h += '<div class="card" style="margin:0 0 12px">';
  h += '<div style="display:flex;gap:14px;flex-wrap:wrap">';
  THEMES.forEach(function (t) {
    h += '<div style="display:flex;flex-direction:column;align-items:center;gap:6px">';
    h += '<div class="theme-swatch ' + t.cls + (user.theme === t.id ? ' on' : '') + '" onclick="Cfg.setTheme(\'' + t.id + '\')" title="' + t.name + '"></div>';
    h += '<span style="font-size:10px;color:var(--txt3)">' + t.name + '</span></div>';
  });
  h += '</div></div>';

  /* ── Data ── */
  h += App.sh('Data & Backup');
  h += '<div class="card" style="margin:0 0 12px">';
  h += '<button class="btn btn-secondary mb12" onclick="Cfg.exportData()">📥 Export JSON Backup</button>';
  h += '<button class="btn btn-secondary mb12" onclick="Cfg.importData()">📤 Import Backup</button>';
  h += '<button class="btn btn-secondary mb12" onclick="Cfg.loadDemo()">🎭 Load Demo Data</button>';
  h += '<button class="btn btn-err" onclick="Cfg.clearAll()">🗑️ Clear All Data</button>';
  h += '</div>';

  /* ── About ── */
  h += App.sh('About');
  h += '<div class="card" style="margin:0 0 20px;text-align:center">';
  h += '<div style="font-size:48px;margin-bottom:8px">⚡</div>';
  h += '<div style="font-size:20px;font-weight:900;letter-spacing:-.4px">FitnessOS v2</div>';
  h += '<div style="font-size:13px;color:var(--txt3);margin-top:6px;line-height:1.6">';
  h += 'Standalone PWA · Offline capable<br>';
  h += '5 tabs · 100+ exercises · 200+ foods · 6 themes</div>';
  h += '</div>';

  h += '</div>';
  return h;
});

const Cfg = {
  save: async function () {
    const user = await Storage.getUser();
    const f = function (id) { const el = document.getElementById(id); return el ? el.value : null; };
    if (f('s-name') !== null)     user.name          = f('s-name').trim();
    if (f('s-age') !== null)      user.age           = parseInt(f('s-age')) || user.age;
    if (f('s-gender') !== null)   user.gender        = f('s-gender');
    if (f('s-weight') !== null)   user.weight        = parseFloat(f('s-weight')) || user.weight;
    if (f('s-height') !== null)   user.height        = parseFloat(f('s-height')) || user.height;
    if (f('s-goalw') !== null)    user.goalWeight    = parseFloat(f('s-goalw')) || user.goalWeight;
    if (f('s-activity') !== null) user.activityLevel = f('s-activity');
    if (f('s-goal') !== null)     user.goal          = f('s-goal');
    if (f('s-exp') !== null)      user.exp           = f('s-exp');
    if (f('s-cal') !== null)      user.calorieTarget = parseInt(f('s-cal')) || user.calorieTarget;
    if (f('s-wkgoal') !== null)   user.weeklyGoal    = parseInt(f('s-wkgoal')) || user.weeklyGoal;
    if (f('s-prot') !== null)     user.proteinTarget = parseInt(f('s-prot')) || user.proteinTarget;
    if (f('s-carb') !== null)     user.carbTarget    = parseInt(f('s-carb')) || user.carbTarget;
    if (f('s-fat') !== null)      user.fatTarget     = parseInt(f('s-fat')) || user.fatTarget;
    if (f('s-water') !== null)    user.waterTarget   = parseInt(f('s-water')) || user.waterTarget;
    if (f('s-split') !== null)    user.split         = f('s-split');
    const restEl = document.getElementById('s-rest');
    if (restEl !== null)          user.restTimer     = restEl ? restEl.checked : user.restTimer;
    if (f('s-restsecs') !== null) user.restSecs      = parseInt(f('s-restsecs')) || user.restSecs;
    await Storage.setUser(user);
    App.toast('Saved', 'ok');
  },

  setUnit: async function (unit) {
    const user = await Storage.getUser();
    user.units = unit;
    await Storage.setUser(user);
    go('settings');
  },

  setDistUnit: async function (unit) {
    const user = await Storage.getUser();
    user.distanceUnit = unit;
    await Storage.setUser(user);
    go('settings');
  },

  setTheme: async function (theme) {
    const user = await Storage.getUser();
    user.theme = theme;
    await Storage.setUser(user);
    App.applyTheme(theme);
    go('settings');
  },

  applyMacroPreset: async function (p, c, f) {
    const user = await Storage.getUser();
    const total = user.calorieTarget || 2500;
    user.proteinTarget = Math.round(total * p / 100 / 4);
    user.carbTarget    = Math.round(total * c / 100 / 4);
    user.fatTarget     = Math.round(total * f / 100 / 9);
    await Storage.setUser(user);
    App.toast('Macro preset applied');
    go('settings');
  },

  exportData: async function () {
    const data = await Storage.exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fitnessos-backup-' + App.today() + '.json';
    a.click();
    URL.revokeObjectURL(url);
    App.toast('Exported!');
  },

  importData: function () {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = '.json';
    inp.onchange = async function (e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async function (ev) {
        try {
          const data = JSON.parse(ev.target.result);
          await Storage.importAll(data);
          App.toast('Import successful!');
          go('dashboard');
        } catch (err) {
          App.toast('Invalid backup file', 'err');
        }
      };
      reader.readAsText(file);
    };
    inp.click();
  },

  loadDemo: async function () {
    const user = await Storage.getUser();
    user.name = 'Alex';
    user.age = 27;
    user.gender = 'male';
    user.weight = 80;
    user.height = 178;
    user.goal = 'hypertrophy';
    user.exp = 'intermediate';
    user.calorieTarget = 2800;
    user.proteinTarget = 200;
    user.carbTarget = 290;
    user.fatTarget = 90;
    user.waterTarget = 8;
    user.weeklyGoal = 4;
    user.onboarded = true;
    await Storage.setUser(user);

    const now = new Date();
    const exercises = [
      { name: 'Barbell Bench Press', sets: [{weight:100,reps:8,done:true},{weight:100,reps:8,done:true},{weight:100,reps:7,done:true},{weight:97.5,reps:8,done:true}], vol: 2780, prCount: 0 },
      { name: 'Overhead Press', sets: [{weight:60,reps:8,done:true},{weight:60,reps:8,done:true},{weight:60,reps:7,done:true}], vol: 1380, prCount: 0 },
      { name: 'Lateral Raise', sets: [{weight:15,reps:12,done:true},{weight:15,reps:12,done:true},{weight:15,reps:10,done:true}], vol: 510, prCount: 0 },
    ];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now); d.setDate(d.getDate() - i);
      if (i % 2 === 0) continue;
      await Storage.set('workouts', { date: d.toISOString(), splitDay: i % 3 === 0 ? 'Push A' : i % 3 === 1 ? 'Pull A' : 'Legs A', exercises: exercises, totalVol: 4670, duration: 55, prCount: 0 });
    }

    for (let i = 7; i >= 0; i--) {
      const d = new Date(now); d.setDate(d.getDate() - i * 3);
      await Storage.set('bodyStats', { date: d.toISOString(), weight: 80 + (i * 0.2 - 0.8), bodyFat: 15 - i * 0.1, measurements: { chest: 106, waist: 82, hips: 98 }, photos: {} });
    }

    await Storage.set('meals', { date: now.toISOString(), meal: 'breakfast', foodName: 'Oats (dry)', servingSize: 80, servingUnit: 'g', calories: 311, protein: 14, carbs: 53, fat: 6 });
    await Storage.set('meals', { date: now.toISOString(), meal: 'lunch', foodName: 'Chicken Breast', servingSize: 200, servingUnit: 'g', calories: 330, protein: 62, carbs: 0, fat: 7 });
    await Storage.set('water', { date: now.toISOString(), amount: 1 });
    await Storage.set('water', { date: now.toISOString(), amount: 1 });
    await Storage.set('water', { date: now.toISOString(), amount: 1 });
    await Storage.set('prs', { exercise: 'Barbell Bench Press', weight: 105, reps: 5, estimated1RM: 117, date: now.toISOString() });
    await Storage.set('prs', { exercise: 'Deadlift', weight: 160, reps: 3, estimated1RM: 176, date: now.toISOString() });

    App.toast('Demo data loaded!');
    go('dashboard');
  },

  clearAll: async function () {
    if (!confirm('Delete ALL data? This cannot be undone.')) return;
    await Storage.clearAllData();
    App.toast('All data cleared');
    location.reload();
  }
};
