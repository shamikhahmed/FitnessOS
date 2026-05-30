'use strict';

const CARDIO_TYPES = [
  { v: 'run', l: 'Running', em: '🏃', met: 9.8 },
  { v: 'cycle', l: 'Cycling', em: '🚴', met: 7.5 },
  { v: 'swim', l: 'Swimming', em: '🏊', met: 8.0 },
  { v: 'walk', l: 'Walking', em: '🚶', met: 3.5 },
  { v: 'hike', l: 'Hiking', em: '🥾', met: 6.0 },
  { v: 'row', l: 'Rowing', em: '🚣', met: 7.0 },
  { v: 'elliptical', l: 'Elliptical', em: '⚡', met: 5.0 },
  { v: 'jump_rope', l: 'Jump Rope', em: '⭕', met: 12.3 },
  { v: 'hiit', l: 'HIIT', em: '🔥', met: 10.0 },
  { v: 'yoga', l: 'Yoga', em: '🧘', met: 3.0 },
  { v: 'other', l: 'Other', em: '🏅', met: 5.0 },
];

function calBurn(met, weightKg, durationMin) {
  return Math.round(met * weightKg * (durationMin / 60));
}

function paceStr(distKm, durationMin) {
  if (!distKm || !durationMin) return '--';
  const secPerKm = (durationMin * 60) / distKm;
  const m = Math.floor(secPerKm / 60);
  const s = Math.round(secPerKm % 60);
  return m + ':' + (s < 10 ? '0' : '') + s + '/km';
}

function speedStr(distKm, durationMin) {
  if (!distKm || !durationMin) return '--';
  return (distKm / (durationMin / 60)).toFixed(1) + ' km/h';
}

App.register('cardio', async function () {
  const [user, allCardio] = await Promise.all([Storage.getUser(), Storage.getAll('cardio')]);
  const sorted = allCardio.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
  const recent = sorted.slice(0, 20);

  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 7);
  const weekCardio = allCardio.filter(function (c) { return new Date(c.date) > cutoff; });
  const weekDist = weekCardio.reduce(function (a, c) { return a + (c.distance || 0); }, 0);
  const weekCal = weekCardio.reduce(function (a, c) { return a + (c.calories || 0); }, 0);
  const weekDur = weekCardio.reduce(function (a, c) { return a + (c.duration || 0); }, 0);

  /* Personal bests */
  const runs = allCardio.filter(function (c) { return c.type === 'run'; });
  const fastestPace = runs.reduce(function (best, c) {
    if (!c.distance || !c.duration) return best;
    const pace = (c.duration * 60) / c.distance;
    return (!best || pace < best) ? pace : best;
  }, null);
  const longestRun = runs.reduce(function (best, c) { return Math.max(best, c.distance || 0); }, 0);

  let h = App.topbar('Cardio', 'Track your sessions');
  h += '<div style="padding:14px 16px 0">';

  h += '<div class="g4" style="margin-bottom:12px">';
  h += App.statBox(weekCardio.length, 'Sessions', 'stat-accent');
  h += App.statBox(weekDist.toFixed(1) + 'km', 'Distance', 'stat-info');
  h += App.statBox(weekDur + ' min', 'Time', '');
  h += App.statBox(weekCal, 'Calories', 'stat-warn');
  h += '</div>';

  if (fastestPace || longestRun) {
    h += App.sh('Personal Bests');
    h += '<div class="g2" style="margin-bottom:12px">';
    if (fastestPace) {
      const m = Math.floor(fastestPace / 60);
      const s = Math.round(fastestPace % 60);
      h += App.statBox(m + ':' + (s < 10 ? '0' : '') + s + '/km', 'Fastest Pace', 'stat-ok');
    }
    if (longestRun > 0) h += App.statBox(longestRun.toFixed(1) + ' km', 'Longest Run', 'stat-info');
    h += '</div>';
  }

  h += App.sh('Log Session');
  h += '<div class="card" style="margin:0 0 12px">';
  h += '<div class="fw"><label class="field-label">Activity Type</label>';
  h += '<div class="scroll-row" style="padding:0 0 8px">';
  CARDIO_TYPES.forEach(function (t) {
    h += '<button class="pill" id="ct-' + t.v + '" onclick="Cardio.selectType(\'' + t.v + '\')">' + t.em + ' ' + t.l + '</button>';
  });
  h += '</div></div>';
  h += '<div id="cardio-type-label" style="font-size:14px;font-weight:700;color:var(--accent);margin-bottom:12px">Select activity type above</div>';
  h += '<div class="g2">';
  h += '<div class="fw"><label class="field-label">Distance (km)</label><input id="c-dist" class="field" type="number" inputmode="decimal" step="0.01" placeholder="5.0"></div>';
  h += '<div class="fw"><label class="field-label">Duration (min)</label><input id="c-dur" class="field" type="number" inputmode="numeric" step="1" placeholder="30"></div>';
  h += '</div>';
  h += '<div id="cardio-calc" style="background:var(--bg4);border-radius:12px;padding:12px;margin-bottom:12px;font-size:13px;color:var(--txt3)">Enter distance and duration to see pace</div>';
  h += '<div class="fw"><label class="field-label">Notes (optional)</label><input id="c-notes" class="field" placeholder="e.g. Morning park run"></div>';
  h += '<button class="btn btn-primary" onclick="Cardio.log()">Save Session</button>';
  h += '</div>';

  if (recent.length) {
    h += App.sh('Recent Sessions', recent.length > 5 ? 'History' : '', '');
    h += '<div class="card" style="margin:0 0 20px">';
    recent.forEach(function (c) {
      const ct = CARDIO_TYPES.find(function (t) { return t.v === c.type; }) || CARDIO_TYPES[CARDIO_TYPES.length - 1];
      h += '<div class="cardio-row">';
      h += '<div style="width:44px;height:44px;border-radius:12px;background:var(--bg4);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">' + ct.em + '</div>';
      h += '<div style="flex:1;min-width:0">';
      h += '<div style="font-size:15px;font-weight:700">' + ct.l + '</div>';
      h += '<div style="font-size:12px;color:var(--txt3)">' + App.fmtDate(c.date) + (c.duration ? ' · ' + c.duration + ' min' : '') + '</div>';
      h += '</div>';
      h += '<div style="text-align:right;flex-shrink:0">';
      if (c.distance) h += '<div style="font-size:15px;font-weight:800">' + c.distance.toFixed(1) + ' km</div>';
      if (c.distance && c.duration) h += '<div style="font-size:11px;color:var(--txt3)">' + paceStr(c.distance, c.duration) + '</div>';
      h += '</div>';
      h += '<button class="btn btn-err btn-xs" onclick="Cardio.del(' + c.id + ')" style="flex-shrink:0">✕</button>';
      h += '</div>';
    });
    h += '</div>';
  }

  h += '</div>';
  return h;
});

App.afterRender('cardio', function () {
  const distEl = document.getElementById('c-dist');
  const durEl = document.getElementById('c-dur');
  function updateCalc() {
    const dist = parseFloat(distEl ? distEl.value : 0);
    const dur = parseFloat(durEl ? durEl.value : 0);
    const calc = document.getElementById('cardio-calc');
    if (!calc) return;
    if (dist && dur) {
      const pace = paceStr(dist, dur);
      const speed = speedStr(dist, dur);
      calc.innerHTML = '<span style="color:var(--txt2)">Pace: <b>' + pace + '</b> · Speed: <b>' + speed + '</b></span>';
    } else {
      calc.textContent = 'Enter distance and duration to see pace';
    }
  }
  if (distEl) distEl.addEventListener('input', updateCalc);
  if (durEl) durEl.addEventListener('input', updateCalc);
});

let _cardioType = null;

const Cardio = {
  selectType: function (v) {
    _cardioType = v;
    document.querySelectorAll('[id^="ct-"]').forEach(function (b) { b.classList.remove('on'); });
    const btn = document.getElementById('ct-' + v);
    if (btn) btn.classList.add('on');
    const label = document.getElementById('cardio-type-label');
    const ct = CARDIO_TYPES.find(function (t) { return t.v === v; });
    if (label && ct) label.textContent = ct.em + ' ' + ct.l + ' selected';
  },

  log: async function () {
    if (!_cardioType) { App.toast('Select an activity type', 'warn'); return; }
    const dist = parseFloat(document.getElementById('c-dist').value) || 0;
    const dur = parseFloat(document.getElementById('c-dur').value) || 0;
    if (!dur) { App.toast('Enter a duration', 'warn'); return; }
    const user = await Storage.getUser();
    const ct = CARDIO_TYPES.find(function (t) { return t.v === _cardioType; });
    const cal = ct ? calBurn(ct.met, user.weight || 75, dur) : 0;
    const notes = document.getElementById('c-notes').value || '';
    await Storage.set('cardio', {
      date: App.isoNow(), type: _cardioType, distance: dist || null,
      duration: dur, calories: cal,
      pace: (dist && dur) ? Math.round((dur * 60) / dist) : null,
      notes: notes
    });
    App.haptic(30);
    App.toast('Session saved! ' + (cal ? cal + ' kcal burned' : ''));
    _cardioType = null;
    go('cardio');
  },

  del: async function (id) {
    await Storage.delete('cardio', id);
    App.haptic([50, 30, 50]);
    App.toast('Removed');
    go('cardio');
  }
};
