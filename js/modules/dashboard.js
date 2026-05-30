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
  const timeEmoji = hr < 5 ? '🌙' : hr < 12 ? '🌅' : hr < 17 ? '☀️' : hr < 21 ? '🌇' : '🌙';
  const greeting = hr < 5 ? 'Good Night' : hr < 12 ? 'Good Morning' : hr < 17 ? 'Good Afternoon' : 'Good Evening';
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long' }) + ', ' +
    now.getDate() + ' ' + now.toLocaleDateString('en-GB', { month: 'long' });

  const todayCal = meals.reduce(function (a, m) { return a + (m.calories || 0); }, 0);
  const calTarget = user.calorieTarget || 2500;
  const waterTarget = user.waterTarget || 8;
  const weeklyGoal = user.weeklyGoal || 4;
  const calPct = Math.min(100, Math.round((todayCal / calTarget) * 100));
  const weekPct = Math.min(100, Math.round((weekWkts.length / weeklyGoal) * 100));
  const daysToGoal = Math.max(0, weeklyGoal - weekWkts.length);

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
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" style="display:block">' +
      '<circle cx="' + (size/2) + '" cy="' + (size/2) + '" r="' + r + '" fill="none" stroke="var(--bg4)" stroke-width="' + stroke + '"/>' +
      '<circle cx="' + (size/2) + '" cy="' + (size/2) + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + stroke + '" stroke-linecap="round" stroke-dasharray="' + circ.toFixed(2) + '" stroke-dashoffset="' + offset.toFixed(2) + '" transform="rotate(-90 ' + (size/2) + ' ' + (size/2) + ')"/>' +
      '</svg>';
  }

  let h = '';

  /* ── Premium Greeting ── */
  h += '<div style="padding:20px 20px 14px;display:flex;align-items:flex-start;justify-content:space-between">';
  h += '<div>';
  h += '<div style="font-size:13px;color:var(--txt3);font-weight:600;margin-bottom:5px">' + timeEmoji + ' ' + dateStr + '</div>';
  h += '<div style="font-size:28px;font-weight:900;letter-spacing:-0.8px;line-height:1.15">';
  h += greeting + ',<br><span style="color:var(--accent)">' + App.esc(user.name || 'Athlete') + '</span>';
  h += '</div>';
  h += '</div>';
  h += '<button class="tb-ic" onclick="go(\'settings\')" aria-label="Settings" style="margin-top:2px;flex-shrink:0">⚙️</button>';
  h += '</div>';

  h += '<div style="padding:0 16px">';

  /* ── Streak + Week Progress ── */
  const ringColor = weekPct >= 80 ? 'var(--ok)' : 'var(--accent)';
  const barGlow = weekPct >= 80 ? ';box-shadow:0 0 10px rgba(52,199,89,0.4)' : '';
  h += '<div class="card card-accent" style="margin:0 0 12px">';
  h += '<div style="display:flex;gap:16px;align-items:center">';
  h += '<div style="position:relative;width:72px;height:72px;flex-shrink:0">';
  h += ringHTML(weekPct, 72, 7, ringColor);
  h += '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">';
  h += '<span style="font-size:24px;font-weight:900;line-height:1;color:var(--accent);font-variant-numeric:tabular-nums">' + streak + '</span>';
  h += '<span style="font-size:8px;color:var(--txt3);font-weight:700;letter-spacing:.06em;margin-top:1px">STREAK</span>';
  h += '</div></div>';
  h += '<div style="flex:1;min-width:0">';
  h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px">';
  h += '<span style="font-size:13px;font-weight:700">This Week</span>';
  h += '<span style="font-size:13px;color:' + ringColor + ';font-weight:800">' + weekWkts.length + '&thinsp;/&thinsp;' + weeklyGoal + '</span>';
  h += '</div>';
  h += '<div style="height:7px;background:var(--bg4);border-radius:4px;overflow:hidden' + barGlow + '">';
  h += '<div style="height:7px;width:' + weekPct + '%;background:' + ringColor + ';border-radius:4px;transition:width .6s var(--spring)"></div>';
  h += '</div>';
  h += '<div style="font-size:11px;color:var(--txt3);margin-top:6px">';
  h += daysToGoal > 0
    ? daysToGoal + ' more session' + (daysToGoal > 1 ? 's' : '') + ' to hit your goal'
    : '🎯 Weekly goal achieved!';
  h += '</div>';
  h += '</div></div></div>';

  /* ── Stats Row ── */
  h += '<div class="g4" style="margin-bottom:12px">';

  const wArrow = weightDelta !== 0
    ? ' <span style="font-size:13px;color:' + (weightDelta < 0 ? 'var(--ok)' : 'var(--warn)') + '">' + (weightDelta > 0 ? '↑' : '↓') + '</span>'
    : '';
  h += '<div class="stat stat-accent" style="background:rgba(16,185,129,0.06)">' +
    '<div class="sv">' + latestWeight.toFixed(1) + wArrow + '</div>' +
    '<div class="sl">' + unitLabel + '</div></div>';

  const calColor = todayCal > calTarget ? 'stat-err' : 'stat-ok';
  const calBg = todayCal > calTarget ? 'rgba(255,69,58,0.06)' : 'rgba(52,199,89,0.06)';
  h += '<div class="stat ' + calColor + '" style="background:' + calBg + '">' +
    '<div class="sv">' + calPct + '<span style="font-size:12px;font-weight:700">%</span></div>' +
    '<div class="sl">Calories</div></div>';

  const waterColor = waterAmt >= waterTarget ? 'stat-ok' : 'stat-info';
  const waterBg = waterAmt >= waterTarget ? 'rgba(52,199,89,0.06)' : 'rgba(10,132,255,0.06)';
  h += '<div class="stat ' + waterColor + '" style="background:' + waterBg + '">' +
    '<div class="sv">' + waterAmt + '<span style="font-size:12px;color:var(--txt3);font-weight:600">&thinsp;/' + waterTarget + '</span></div>' +
    '<div class="sl">Water</div></div>';

  h += '<div class="stat stat-info" style="background:rgba(10,132,255,0.06)">' +
    '<div class="sv">' + weekWkts.length + '</div>' +
    '<div class="sl">Workouts</div></div>';
  h += '</div>';

  /* ── Quick Log Pills ── */
  h += App.sh('Quick Log');
  h += '<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">';
  h += '<button class="btn btn-primary btn-sm" onclick="Wkt.startWorkout ? Wkt.startWorkout() : go(\'workouts\')" style="flex-shrink:0">💪 Workout</button>';
  h += '<button class="btn btn-secondary btn-sm" onclick="Dash.quickLogWeight()" style="flex-shrink:0">⚖️ Weight</button>';
  h += '<button class="btn btn-secondary btn-sm" onclick="Dash.quickLogWater()" style="flex-shrink:0">💧 Water</button>';
  h += '</div>';

  /* ── Hydration ── */
  h += App.sh('Hydration', 'Log →', 'Dash.quickLogWater()');
  h += '<div class="card" style="margin:0 0 12px">';
  h += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px">';
  for (let i = 0; i < waterTarget; i++) {
    const filled = i < waterAmt;
    const bg = filled ? 'var(--info)' : 'var(--bg4)';
    const border = filled ? 'var(--info)' : 'var(--border2)';
    h += '<div onclick="Dash.addWater(' + (i + 1) + ')" ' +
      'style="width:36px;height:36px;border-radius:50%;background:' + bg + ';border:2px solid ' + border + ';' +
      'display:flex;align-items:center;justify-content:center;cursor:pointer;touch-action:manipulation;' +
      'font-size:18px;transition:all .15s var(--spring);flex-shrink:0">' +
      (filled ? '💧' : '<span style="width:8px;height:8px;border-radius:50%;background:var(--border2);display:block"></span>') +
      '</div>';
  }
  h += '</div>';
  h += '<div style="font-size:13px;color:var(--txt3)">';
  const rem = Math.max(0, waterTarget - waterAmt);
  h += rem > 0
    ? rem + ' more glass' + (rem !== 1 ? 'es' : '') + ' to reach your goal'
    : '✅ Daily hydration goal reached!';
  h += '</div></div>';

  /* ── Today's Nutrition ── */
  h += App.sh('Nutrition', 'Log →', "go('nutrition')");
  h += '<div class="card" style="margin:0 0 12px">';
  h += '<div style="display:flex;align-items:center;gap:16px">';
  h += '<div style="position:relative;flex-shrink:0">' + ringHTML(calPct, 72, 8, 'var(--warn)') + '</div>';
  h += '<div style="flex:1">';
  h += '<div style="font-size:22px;font-weight:900;line-height:1;letter-spacing:-0.5px">' + todayCal +
    '<span style="font-size:13px;color:var(--txt3);font-weight:600"> / ' + calTarget + ' kcal</span></div>';
  if (meals.length) {
    const p = meals.reduce(function (a, m) { return a + (m.protein || 0); }, 0);
    const c2 = meals.reduce(function (a, m) { return a + (m.carbs || 0); }, 0);
    const f = meals.reduce(function (a, m) { return a + (m.fat || 0); }, 0);
    h += '<div style="display:flex;gap:14px;margin-top:8px">';
    h += '<span style="font-size:12px"><b style="color:var(--info)">' + Math.round(p) + 'g</b> <span style="color:var(--txt3)">P</span></span>';
    h += '<span style="font-size:12px"><b style="color:var(--warn)">' + Math.round(c2) + 'g</b> <span style="color:var(--txt3)">C</span></span>';
    h += '<span style="font-size:12px"><b style="color:var(--err)">' + Math.round(f) + 'g</b> <span style="color:var(--txt3)">F</span></span>';
    h += '</div>';
  } else {
    h += '<div style="font-size:13px;color:var(--txt3);margin-top:6px">No meals logged today</div>';
  }
  h += '</div></div></div>';

  /* ── Last Workout ── */
  if (lastWorkout) {
    h += App.sh('Last Workout', 'All →', "go('progress')");
    h += '<div class="card card-tap" style="margin:0 0 12px" onclick="go(\'workouts\')">';
    h += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">';
    h += '<div>';
    h += '<div style="font-size:17px;font-weight:800;letter-spacing:-0.3px">' + App.esc(lastWorkout.splitDay || 'Workout') + '</div>';
    h += '<div style="font-size:12px;color:var(--txt3);margin-top:2px">' +
      App.fmtDate(lastWorkout.date) + ' · ' + (lastWorkout.duration || 0) + ' min</div>';
    h += '</div>';
    h += '<div style="text-align:right;flex-shrink:0">';
    const vol = Math.round((lastWorkout.totalVol || 0) / 10) / 100;
    h += '<div style="background:var(--accent-dim);border:1px solid var(--accent-border);border-radius:10px;padding:4px 10px">';
    h += '<div style="font-size:15px;font-weight:900;color:var(--accent)">' + vol.toFixed(1) + 't</div>';
    h += '<div style="font-size:9px;color:var(--txt3);font-weight:700;letter-spacing:.05em">VOLUME</div>';
    h += '</div></div>';
    h += '</div>';
    const exList = (lastWorkout.exercises || []).slice(0, 4);
    h += '<div style="display:flex;gap:6px;flex-wrap:wrap">';
    exList.forEach(function (ex) {
      h += '<span style="padding:4px 9px;border-radius:20px;background:var(--bg4);font-size:12px;color:var(--txt3);font-weight:600">' +
        App.esc(ex.name) + '</span>';
    });
    if ((lastWorkout.exercises || []).length > 4) {
      h += '<span style="padding:4px 9px;border-radius:20px;background:var(--accent-dim);border:1px solid var(--accent-border);font-size:12px;color:var(--accent)">+' +
        ((lastWorkout.exercises || []).length - 4) + ' more</span>';
    }
    h += '</div>';
    if (lastWorkout.prCount > 0) {
      h += '<div style="margin-top:10px;padding:8px 12px;background:rgba(48,209,88,0.1);border-radius:10px;font-size:13px;font-weight:700;color:var(--ok)">🏆 ' +
        lastWorkout.prCount + ' PR' + (lastWorkout.prCount > 1 ? 's' : '') + ' set this session</div>';
    }
    h += '</div>';
  }

  /* ── Recent Workouts ── */
  if (recentWkts.length > 1) {
    h += App.sh('Recent Workouts', 'Progress →', "go('progress')");
    h += '<div class="card" style="margin:0 0 12px">';
    recentWkts.forEach(function (w, i) {
      if (i === 0) return;
      h += '<div class="exr">';
      h += '<div class="ex-ic" style="font-size:18px">🏋️</div>';
      h += '<div class="ex-inf"><div class="ex-nm">' + App.esc(w.splitDay || 'Workout') + '</div>';
      h += '<div class="ex-sub">' + App.fmtDate(w.date) + ' · ' + (w.duration || 0) + ' min</div></div>';
      h += '<div style="text-align:right"><div class="badge badge-accent">' + (w.exercises || []).length + ' ex</div>';
      if (w.prCount > 0) h += '<div style="font-size:10px;color:var(--ok);margin-top:2px">🏆 ' + w.prCount + ' PR</div>';
      h += '</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  /* ── Explore Shortcuts ── */
  h += App.sh('Explore');
  h += '<div class="g2" style="margin-bottom:20px">';
  const shortcuts = [
    { label: '📏 Body Stats', route: 'bodystats', tint: 'var(--purple)' },
    { label: '🏃 Cardio',     route: 'cardio',    tint: 'var(--info)'   },
    { label: '📈 Progress',   route: 'progress',  tint: 'var(--ok)'     },
    { label: '🥗 Nutrition',  route: 'nutrition', tint: 'var(--warn)'   },
  ];
  shortcuts.forEach(function (s) {
    h += '<button class="btn btn-secondary" onclick="go(\'' + s.route + '\')" style="font-size:13px;font-weight:700">' + s.label + '</button>';
  });
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
