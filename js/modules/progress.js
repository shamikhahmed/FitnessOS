'use strict';

App.register('progress', async function () {
  const [workouts, bodyStats, prs, cardio] = await Promise.all([
    Storage.getAll('workouts'),
    Storage.getAll('bodyStats'),
    Storage.getAll('prs'),
    Storage.getAll('cardio')
  ]);

  const sortedWkts = workouts.slice().sort(function (a, b) { return new Date(a.date) - new Date(b.date); });

  /* ── Calendar Heatmap ── */
  function heatmap() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const dateSet = {};
    workouts.forEach(function (w) {
      if (!w.date) return;
      const d = new Date(w.date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const key = d.getDate();
        dateSet[key] = (dateSet[key] || 0) + 1;
      }
    });
    const monthName = now.toLocaleString('en', { month: 'long' });
    let h = '<div style="font-size:13px;font-weight:700;margin-bottom:8px">' + monthName + ' ' + year + '</div>';
    h += '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">';
    ['S','M','T','W','T','F','S'].forEach(function (d) {
      h += '<div style="font-size:10px;color:var(--txt3);text-align:center;font-weight:700">' + d + '</div>';
    });
    for (let i = 0; i < firstDay; i++) h += '<div></div>';
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === now.getDate();
      const cnt = dateSet[d] || 0;
      const bg = cnt === 0 ? 'var(--bg4)' : cnt === 1 ? 'rgba(16,185,129,0.4)' : 'var(--accent)';
      const border = isToday ? '2px solid var(--txt)' : '2px solid transparent';
      h += '<div style="aspect-ratio:1;border-radius:4px;background:' + bg + ';border:' + border + ';display:flex;align-items:center;justify-content:center;font-size:9px;color:' + (cnt > 0 ? '#fff' : 'var(--txt4)') + '">' + d + '</div>';
    }
    h += '</div>';
    return h;
  }

  /* ── Weekly Volume Bar Chart ── */
  function volumeChart() {
    const weeks = [];
    const now = new Date();
    for (let w = 6; w >= 0; w--) {
      const start = new Date(now);
      start.setDate(now.getDate() - (w + 1) * 7);
      const end = new Date(now);
      end.setDate(now.getDate() - w * 7);
      const vol = workouts.filter(function (wkt) {
        const d = new Date(wkt.date);
        return d >= start && d < end;
      }).reduce(function (a, wkt) { return a + (wkt.totalVol || 0); }, 0);
      const label = w === 0 ? 'Now' : w === 1 ? '1w' : w + 'w';
      weeks.push({ vol: vol, label: label });
    }
    const maxVol = Math.max.apply(null, weeks.map(function (w) { return w.vol; })) || 1;
    let h = '<div style="display:flex;gap:4px;align-items:flex-end;height:80px">';
    weeks.forEach(function (w, i) {
      const pct = Math.max(5, Math.round((w.vol / maxVol) * 100));
      h += '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px">';
      h += '<div style="width:100%;height:' + pct + '%;background:' + (i === weeks.length - 1 ? 'var(--accent)' : 'var(--bg4)') + ';border-radius:4px 4px 0 0;min-height:3px;transition:height .5s var(--spring)"></div>';
      h += '</div>';
    });
    h += '</div>';
    h += '<div style="display:flex;gap:4px;margin-top:4px">';
    weeks.forEach(function (w) {
      h += '<div style="flex:1;text-align:center;font-size:9px;color:var(--txt3)">' + w.label + '</div>';
    });
    h += '</div>';
    return h;
  }

  /* ── Exercise Strength Chart ── */
  function strengthChart(exerciseName) {
    const pts = [];
    sortedWkts.forEach(function (w) {
      (w.exercises || []).forEach(function (ex) {
        if (ex.name !== exerciseName) return;
        const doneSets = (ex.sets || []).filter(function (s) { return s.done; });
        if (!doneSets.length) return;
        const best1RM = doneSets.reduce(function (b, s) {
          const e = s.weight > 0 ? Math.round(s.weight * (1 + s.reps / 30)) : 0;
          return Math.max(b, e);
        }, 0);
        if (best1RM > 0) pts.push({ date: w.date, est1RM: best1RM });
      });
    });
    if (pts.length < 2) return '<div style="text-align:center;color:var(--txt3);padding:24px;font-size:13px">Need 2+ sessions to show trend</div>';
    const W = 300, H = 80, pad = 10;
    const vals = pts.map(function (p) { return p.est1RM; });
    const minV = Math.min.apply(null, vals) - 2;
    const maxV = Math.max.apply(null, vals) + 2;
    const xS = (W - pad * 2) / (pts.length - 1);
    const yS = (H - pad * 2) / (maxV - minV);
    const points = pts.map(function (p, i) {
      return (pad + i * xS) + ',' + (H - pad - (p.est1RM - minV) * yS);
    });
    const pathD = 'M ' + points.join(' L ');
    const areaD = 'M ' + pad + ',' + (H - pad) + ' L ' + points.join(' L ') + ' L ' + (pad + (pts.length - 1) * xS) + ',' + (H - pad) + ' Z';
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:auto">' +
      '<defs><linearGradient id="sg' + exerciseName.slice(0, 4).replace(/\s/g,'') + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--accent)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>' +
      '<path d="' + areaD + '" fill="url(#sg' + exerciseName.slice(0, 4).replace(/\s/g,'') + ')"/>' +
      '<path d="' + pathD + '" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      points.map(function (pt, i) {
        const xy = pt.split(',');
        return '<circle cx="' + xy[0] + '" cy="' + xy[1] + '" r="3" fill="var(--accent)"/>';
      }).join('') +
      '</svg>';
  }

  /* Big lifts to track */
  const bigLifts = ['Barbell Bench Press', 'Barbell Squat', 'Deadlift', 'Overhead Press', 'Barbell Row'];

  /* PR Board */
  const prByExercise = {};
  prs.forEach(function (p) {
    if (!prByExercise[p.exercise] || p.estimated1RM > prByExercise[p.exercise].estimated1RM) {
      prByExercise[p.exercise] = p;
    }
  });
  const prList = Object.values(prByExercise).sort(function (a, b) { return new Date(b.date) - new Date(a.date); }).slice(0, 10);

  /* Workout stats */
  const totalVol = workouts.reduce(function (a, w) { return a + (w.totalVol || 0); }, 0);
  const totalPRs = prs.length;
  const cutoff7 = new Date(); cutoff7.setDate(cutoff7.getDate() - 7);
  const week7 = workouts.filter(function (w) { return new Date(w.date) > cutoff7; }).length;

  let h = App.topbar('Progress', workouts.length + ' workouts logged');
  h += '<div style="padding:14px 16px 0">';

  h += '<div class="g4" style="margin-bottom:12px">';
  h += App.statBox(workouts.length, 'Workouts', 'stat-accent');
  h += App.statBox(Math.round(totalVol / 1000) + 't', 'Total Vol', 'stat-info');
  h += App.statBox(totalPRs, 'PRs Set', 'stat-warn');
  h += App.statBox(week7, 'This Week', 'stat-ok');
  h += '</div>';

  h += App.sh('Monthly Heatmap');
  h += '<div class="card" style="margin:0 0 12px">' + heatmap() + '</div>';

  h += App.sh('Weekly Volume');
  h += '<div class="card" style="margin:0 0 12px">' + volumeChart() + '</div>';

  if (workouts.length > 1) {
    h += App.sh('Strength Progress');
    bigLifts.forEach(function (lift) {
      const hasSessions = workouts.some(function (w) {
        return (w.exercises || []).some(function (e) { return e.name === lift; });
      });
      if (!hasSessions) return;
      h += '<div class="card" style="margin:0 0 10px">';
      h += '<div style="font-size:14px;font-weight:800;margin-bottom:8px">' + lift + '</div>';
      h += strengthChart(lift);
      h += '</div>';
    });
  }

  h += App.sh('PR Board', prList.length ? '' : '', '');
  if (prList.length) {
    h += '<div class="card" style="margin:0 0 12px">';
    prList.forEach(function (p) {
      h += '<div class="info-row">';
      h += '<div><div style="font-size:14px;font-weight:700">' + App.esc(p.exercise) + '</div>';
      h += '<div style="font-size:12px;color:var(--txt3)">' + App.fmtDate(p.date) + '</div></div>';
      h += '<div style="text-align:right"><div style="font-size:15px;font-weight:800;color:var(--ok)">' + p.weight + 'kg × ' + p.reps + '</div>';
      h += '<div style="font-size:11px;color:var(--txt3)">' + p.estimated1RM + 'kg est. 1RM</div></div>';
      h += '</div>';
    });
    h += '</div>';
  } else {
    h += '<div class="card" style="margin:0 0 12px"><p style="color:var(--txt3);text-align:center;padding:20px">No PRs yet — start lifting! 💪</p></div>';
  }

  h += App.sh('Recent Workouts', workouts.length > 10 ? 'All' : '', '');
  h += '<div class="card" style="margin:0 0 20px">';
  if (!workouts.length) {
    h += '<p style="color:var(--txt3);text-align:center;padding:24px">No workouts yet. Start training!</p>';
  } else {
    sortedWkts.slice(-10).reverse().forEach(function (w) {
      h += '<div class="exr">';
      h += '<div class="ex-ic" style="font-size:18px">🏋️</div>';
      h += '<div class="ex-inf"><div class="ex-nm">' + App.esc(w.splitDay || 'Workout') + '</div>';
      h += '<div class="ex-sub">' + App.fmtDate(w.date) + (w.duration ? ' · ' + w.duration + ' min' : '') + '</div></div>';
      h += '<div style="text-align:right">';
      h += '<div style="font-size:14px;font-weight:700">' + Math.round((w.totalVol || 0) / 1000 * 10) / 10 + 't</div>';
      if (w.prCount > 0) h += '<div style="font-size:11px;color:var(--ok)">🏆 ' + w.prCount + ' PR</div>';
      h += '</div></div>';
    });
  }
  h += '</div>';

  h += '</div>';
  return h;
});
