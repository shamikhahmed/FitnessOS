'use strict';

App.register('dashboard', async function () {
  const [user, workouts, bodyStats, meals, streak, weekWkts] = await Promise.all([
    Storage.getUser(),
    Storage.getAll('workouts'),
    Storage.getAll('bodyStats'),
    Storage.getTodayMeals(),
    Storage.getStreak(),
    Storage.getWeekWorkouts()
  ]);
  const waterAmt = await Storage.getTodayWaterAmount();

  const hr = new Date().getHours();
  const greeting = hr < 5 ? 'Good Night' : hr < 12 ? 'Good Morning' : hr < 17 ? 'Good Afternoon' : 'Good Evening';

  const todayCal = meals.reduce(function (a, m) { return a + (m.calories || 0); }, 0);
  const calTarget = user.calorieTarget || 2500;
  const waterTarget = user.waterTarget || 8;
  const weeklyGoal = user.weeklyGoal || 4;

  const sortedStats = bodyStats.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
  const latestWeight = sortedStats[0] ? sortedStats[0].weight : user.weight;
  const prevWeight = sortedStats[1] ? sortedStats[1].weight : null;
  const weightDelta = prevWeight ? (latestWeight - prevWeight) : 0;
  const unitLabel = user.units === 'imperial' ? 'lbs' : 'kg';

  const lastWorkout = workouts.length ? workouts[workouts.length - 1] : null;
  const recentWkts = workouts.slice(-4).reverse();

  function ringHTML(pct, size, stroke, color) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (Math.min(pct, 100) / 100) * circ;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">' +
      '<circle cx="' + (size/2) + '" cy="' + (size/2) + '" r="' + r + '" fill="none" stroke="var(--bg4)" stroke-width="' + stroke + '"/>' +
      '<circle cx="' + (size/2) + '" cy="' + (size/2) + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + stroke + '" stroke-linecap="round" stroke-dasharray="' + circ + '" stroke-dashoffset="' + offset + '" transform="rotate(-90 ' + (size/2) + ' ' + (size/2) + ')"/>' +
      '</svg>';
  }

  function dropletSVG(filled) {
    const fill = filled ? 'var(--info)' : 'var(--bg4)';
    const stroke = filled ? 'var(--info)' : 'var(--border)';
    return '<svg viewBox="0 0 24 30" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.5"><path d="M12 2C12 2 3 12 3 18a9 9 0 0 0 18 0C21 12 12 2 12 2z"/></svg>';
  }

  let h = '';
  h += App.topbar(user.name || 'Athlete', greeting,
    '<div class="tb-actions">' +
    '<div class="tb-ic" onclick="go(\'settings\')" aria-label="Settings">⚙️</div>' +
    '</div>');

  h += '<div style="padding:14px 16px 0">';

  /* ── Streak + week progress ── */
  h += '<div class="card card-accent" style="margin:0 0 12px">';
  h += '<div style="display:flex;gap:16px;align-items:center">';
  h += '<div style="text-align:center;flex-shrink:0">';
  h += '<div style="font-size:44px;font-weight:900;line-height:1;color:var(--accent)">' + streak + '</div>';
  h += '<div style="font-size:9px;color:var(--txt3);font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-top:3px">Day Streak</div>';
  h += '</div>';
  h += '<div style="flex:1">';
  const weekPct = Math.min(100, Math.round((weekWkts.length / weeklyGoal) * 100));
  h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
  h += '<span style="font-size:13px;font-weight:700">This Week</span>';
  h += '<span style="font-size:13px;color:var(--accent);font-weight:700">' + weekWkts.length + '/' + weeklyGoal + '</span>';
  h += '</div>';
  h += '<div style="height:8px;background:var(--bg4);border-radius:4px;overflow:hidden">';
  h += '<div style="height:8px;width:' + weekPct + '%;background:var(--accent);border-radius:4px;transition:width .5s var(--spring)"></div>';
  h += '</div>';
  if (lastWorkout) {
    h += '<div style="font-size:12px;color:var(--txt3);margin-top:6px">Last: ' + App.fmtDate(lastWorkout.date) + '</div>';
  }
  h += '</div></div></div>';

  /* ── Stats row ── */
  h += '<div class="g4" style="margin-bottom:12px">';
  const wDelta = weightDelta !== 0
    ? '<span style="font-size:11px;color:' + (weightDelta < 0 ? 'var(--ok)' : 'var(--warn)') + '">' + (weightDelta > 0 ? '+' : '') + weightDelta.toFixed(1) + '</span>'
    : '';
  h += App.statBox(latestWeight.toFixed(1) + wDelta, unitLabel, 'stat-accent');
  h += App.statBox(todayCal + '<span style="font-size:11px;color:var(--txt3)">/' + calTarget + '</span>', 'Calories', todayCal > calTarget ? 'stat-err' : 'stat-ok');
  h += App.statBox(waterAmt + '<span style="font-size:11px;color:var(--txt3)">/' + waterTarget + '</span>', 'Water', waterAmt >= waterTarget ? 'stat-ok' : 'stat-info');
  h += App.statBox(weekWkts.length, 'Workouts', 'stat-info');
  h += '</div>';

  /* ── Quick Log ── */
  h += App.sh('Quick Log');
  h += '<div class="g3" style="margin-bottom:12px">';
  h += '<button class="btn btn-primary btn-sm" onclick="go(\'workouts\')">+ Workout</button>';
  h += '<button class="btn btn-secondary btn-sm" onclick="Dash.quickLogWeight()">+ Weight</button>';
  h += '<button class="btn btn-secondary btn-sm" onclick="Dash.quickLogWater()">+ Water</button>';
  h += '</div>';

  /* ── Water tracker ── */
  h += App.sh('Hydration', 'Log →', "Dash.quickLogWater()");
  h += '<div class="card" style="margin:0 0 12px">';
  h += '<div class="droplet-row" style="margin-bottom:10px">';
  for (let i = 0; i < waterTarget; i++) {
    h += '<div class="droplet" onclick="Dash.addWater(' + (i + 1) + ')" title="' + (i + 1) + ' glass' + (i > 0 ? 'es' : '') + '">' + dropletSVG(i < waterAmt) + '</div>';
  }
  h += '</div>';
  h += '<div style="font-size:13px;color:var(--txt3)">';
  h += Math.max(0, waterTarget - waterAmt) + ' more glass' + (Math.max(0, waterTarget - waterAmt) !== 1 ? 'es' : '') + ' to reach your goal</div>';
  h += '</div>';

  /* ── Today calories ── */
  const calPct = Math.min(100, Math.round((todayCal / calTarget) * 100));
  h += App.sh('Today\'s Nutrition', 'Log →', "go('nutrition')");
  h += '<div class="card" style="margin:0 0 12px">';
  h += '<div style="display:flex;align-items:center;gap:16px">';
  h += '<div>' + ringHTML(calPct, 72, 8, 'var(--warn)') + '</div>';
  h += '<div style="flex:1">';
  h += '<div style="font-size:22px;font-weight:900;line-height:1">' + todayCal + '<span style="font-size:13px;color:var(--txt3);font-weight:600"> / ' + calTarget + ' kcal</span></div>';
  if (meals.length) {
    const p = meals.reduce(function (a, m) { return a + (m.protein || 0); }, 0);
    const c2 = meals.reduce(function (a, m) { return a + (m.carbs || 0); }, 0);
    const f = meals.reduce(function (a, m) { return a + (m.fat || 0); }, 0);
    h += '<div style="display:flex;gap:12px;margin-top:8px">';
    h += '<span style="font-size:12px"><b style="color:var(--info)">' + Math.round(p) + 'g</b> <span style="color:var(--txt3)">P</span></span>';
    h += '<span style="font-size:12px"><b style="color:var(--warn)">' + Math.round(c2) + 'g</b> <span style="color:var(--txt3)">C</span></span>';
    h += '<span style="font-size:12px"><b style="color:var(--err)">' + Math.round(f) + 'g</b> <span style="color:var(--txt3)">F</span></span>';
    h += '</div>';
  } else {
    h += '<div style="font-size:13px;color:var(--txt3);margin-top:6px">No meals logged today</div>';
  }
  h += '</div></div></div>';

  /* ── Last Workout Summary ── */
  if (lastWorkout) {
    h += App.sh('Last Workout', 'All →', "go('progress')");
    h += '<div class="card card-tap" style="margin:0 0 12px" onclick="go(\'workouts\')">';
    h += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">';
    h += '<div><div style="font-size:17px;font-weight:800">' + (lastWorkout.splitDay || 'Workout') + '</div>';
    h += '<div style="font-size:12px;color:var(--txt3)">' + App.fmtDate(lastWorkout.date) + ' · ' + (lastWorkout.duration || 0) + ' min</div></div>';
    h += '<div style="background:var(--accent);border-radius:12px;padding:4px 10px;font-size:13px;font-weight:700;color:#fff">' + Math.round((lastWorkout.totalVol || 0) / 1000 * 10) / 10 + 't</div>';
    h += '</div>';
    const exList = (lastWorkout.exercises || []).slice(0, 4);
    h += '<div style="display:flex;gap:6px;flex-wrap:wrap">';
    exList.forEach(function (ex) {
      h += '<span style="padding:4px 9px;border-radius:20px;background:var(--bg4);font-size:12px;color:var(--txt3)">' + App.esc(ex.name) + '</span>';
    });
    if ((lastWorkout.exercises || []).length > 4) {
      h += '<span style="padding:4px 9px;border-radius:20px;background:rgba(16,185,129,0.1);font-size:12px;color:var(--accent)">+' + ((lastWorkout.exercises || []).length - 4) + ' more</span>';
    }
    h += '</div>';
    if (lastWorkout.prCount > 0) {
      h += '<div style="margin-top:10px;padding:8px 12px;background:rgba(48,209,88,0.1);border-radius:10px;font-size:13px;font-weight:700;color:var(--ok)">🏆 ' + lastWorkout.prCount + ' PR' + (lastWorkout.prCount > 1 ? 's' : '') + ' set this session</div>';
    }
    h += '</div>';
  }

  /* ── Recent workouts mini-list ── */
  if (recentWkts.length > 1) {
    h += App.sh('Recent Workouts', 'Progress →', "go('progress')");
    h += '<div class="card" style="margin:0 0 12px">';
    recentWkts.forEach(function (w, i) {
      if (i === 0) return;
      h += '<div class="exr">';
      h += '<div class="ex-ic" style="font-size:16px;background:var(--bg4)">🏋️</div>';
      h += '<div class="ex-inf"><div class="ex-nm">' + App.esc(w.splitDay || 'Workout') + '</div>';
      h += '<div class="ex-sub">' + App.fmtDate(w.date) + '</div></div>';
      h += '<div class="ex-badge badge-accent">' + (w.exercises || []).length + ' ex</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  /* ── Shortcuts ── */
  h += App.sh('Explore');
  h += '<div class="g2" style="margin-bottom:20px">';
  h += '<button class="btn btn-secondary" onclick="go(\'bodystats\')" style="font-size:13px">📏 Body Stats</button>';
  h += '<button class="btn btn-secondary" onclick="go(\'cardio\')" style="font-size:13px">🏃 Cardio</button>';
  h += '<button class="btn btn-secondary" onclick="go(\'progress\')" style="font-size:13px">📈 Progress</button>';
  h += '<button class="btn btn-secondary" onclick="go(\'nutrition\')" style="font-size:13px">🥗 Nutrition</button>';
  h += '</div>';

  h += '</div>';
  return h;
});

const Dash = {
  quickLogWeight: async function () {
    const user = await Storage.getUser();
    const unit = user.units === 'imperial' ? 'lbs' : 'kg';
    const val = prompt('Log weight (' + unit + '):', (user.weight || 75).toString());
    if (!val) return;
    const w = parseFloat(val);
    if (isNaN(w) || w <= 0) { App.toast('Invalid weight', 'warn'); return; }
    await Storage.set('bodyStats', { date: App.isoNow(), weight: w, measurements: {}, photos: {} });
    App.haptic(30);
    App.toast('Weight logged: ' + w + ' ' + unit);
    go('dashboard');
  },

  quickLogWater: async function () {
    const user = await Storage.getUser();
    await Storage.set('water', { date: App.isoNow(), amount: 1 });
    App.haptic(30);
    App.toast('Water logged 💧');
    go('dashboard');
  },

  addWater: async function (glassNum) {
    App.haptic(30);
    const amt = await Storage.getTodayWaterAmount();
    if (glassNum <= amt) {
      App.toast('Already logged ' + glassNum + ' glass' + (glassNum > 1 ? 'es' : ''));
      return;
    }
    await Storage.set('water', { date: App.isoNow(), amount: 1 });
    App.toast('Water logged 💧');
    go('dashboard');
  }
};
