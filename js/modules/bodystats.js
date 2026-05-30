'use strict';

App.register('bodystats', async function () {
  const [user, bodyStats] = await Promise.all([Storage.getUser(), Storage.getAll('bodyStats')]);
  const sorted = bodyStats.slice().sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
  const latest = sorted.length ? sorted[sorted.length - 1] : null;
  const unit = user.units === 'imperial' ? 'lbs' : 'kg';
  const hmCm = user.units === 'imperial' ? 'in' : 'cm';

  function bmi(w, h) {
    if (!w || !h) return 0;
    const hm = user.units === 'imperial' ? h * 0.0254 : h / 100;
    const wk = user.units === 'imperial' ? w * 0.453592 : w;
    return Math.round(wk / (hm * hm) * 10) / 10;
  }

  function bmiCategory(b) {
    if (b < 18.5) return ['Underweight', 'var(--info)'];
    if (b < 25) return ['Healthy', 'var(--ok)'];
    if (b < 30) return ['Overweight', 'var(--warn)'];
    return ['Obese', 'var(--err)'];
  }

  /* SVG Weight Trend Chart */
  function weightChart() {
    const pts = sorted.filter(function (s) { return s.weight; }).slice(-30);
    if (pts.length < 2) return '<div style="text-align:center;color:var(--txt3);padding:32px;font-size:13px">Log at least 2 weigh-ins to see your trend</div>';
    const W = 320, H = 100, pad = 16;
    const weights = pts.map(function (p) { return p.weight; });
    const minW = Math.min.apply(null, weights) - 1;
    const maxW = Math.max.apply(null, weights) + 1;
    const xScale = (W - pad * 2) / (pts.length - 1);
    const yScale = (H - pad * 2) / (maxW - minW);
    const points = pts.map(function (p, i) {
      const x = pad + i * xScale;
      const y = H - pad - (p.weight - minW) * yScale;
      return x + ',' + y;
    });
    const pathD = 'M ' + points.join(' L ');
    const areaD = 'M ' + pad + ',' + (H - pad) + ' L ' + points.join(' L ') + ' L ' + (pad + (pts.length - 1) * xScale) + ',' + (H - pad) + ' Z';
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:auto;overflow:visible">' +
      '<defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--accent)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>' +
      '<path d="' + areaD + '" fill="url(#wg)"/>' +
      '<path d="' + pathD + '" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      pts.map(function (p, i) {
        const x = pad + i * xScale;
        const y = H - pad - (p.weight - minW) * yScale;
        return '<circle cx="' + x + '" cy="' + y + '" r="3" fill="var(--accent)"/>';
      }).join('') +
      '</svg>';
  }

  const bmiVal = bmi(latest ? latest.weight : user.weight, user.height);
  const [bmiCat, bmiColor] = bmiCategory(bmiVal);
  const meas = (latest && latest.measurements) ? latest.measurements : {};
  const bodyFat = latest ? (latest.bodyFat || null) : null;
  const photos = (latest && latest.photos) ? latest.photos : {};

  let h = App.topbar('Body Stats', 'Track your physique');

  h += '<div style="padding:14px 16px 0">';

  /* ── BMI & Stats ── */
  h += '<div class="g4" style="margin-bottom:12px">';
  h += App.statBox(latest ? latest.weight.toFixed(1) : '--', unit, 'stat-accent');
  h += App.statBox(bmiVal || '--', 'BMI', '');
  h += App.statBox(bodyFat ? bodyFat + '%' : '--', 'Body Fat', bodyFat ? (bodyFat > 25 ? 'stat-warn' : 'stat-ok') : '');
  h += App.statBox(sorted.length, 'Entries', 'stat-info');
  h += '</div>';

  if (bmiVal > 0) {
    h += '<div style="background:rgba(16,185,129,0.06);border:1px solid var(--border2);border-radius:var(--r16);padding:12px 16px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between">';
    h += '<span style="font-size:14px;font-weight:700">BMI ' + bmiVal + '</span>';
    h += '<span style="font-size:13px;font-weight:700;color:' + bmiColor + '">' + bmiCat + '</span>';
    h += '</div>';
  }

  /* ── Weight Chart ── */
  h += App.sh('Weight Trend');
  h += '<div class="card" style="margin:0 0 12px">' + weightChart() + '</div>';

  /* ── Log Weight ── */
  h += App.sh('Log Today');
  h += '<div class="card" style="margin:0 0 12px">';
  h += '<div class="g2 mb12">';
  h += '<div class="fw"><label class="field-label">Weight (' + unit + ')</label><input id="bs-weight" class="field" type="number" inputmode="decimal" step="0.1" placeholder="' + (latest ? latest.weight : user.weight) + '" value=""></div>';
  h += '<div class="fw"><label class="field-label">Body Fat %</label><input id="bs-bf" class="field" type="number" inputmode="decimal" step="0.1" placeholder="e.g. 15" value="' + (bodyFat || '') + '"></div>';
  h += '</div>';
  h += '<button class="btn btn-primary btn-sm" onclick="BS.logWeight()">Save Weight</button>';
  h += '</div>';

  /* ── Measurements ── */
  h += App.sh('Measurements (' + hmCm + ')');
  h += '<div class="card" style="margin:0 0 12px">';
  const measFields = [
    ['chest', 'Chest'], ['waist', 'Waist'], ['hips', 'Hips'],
    ['leftArm', 'L. Arm'], ['rightArm', 'R. Arm'], ['leftThigh', 'L. Thigh'], ['rightThigh', 'R. Thigh'],
    ['leftCalf', 'L. Calf'], ['rightCalf', 'R. Calf']
  ];
  h += '<div class="g3">';
  measFields.forEach(function (f) {
    h += '<div class="fw"><label class="field-label">' + f[1] + '</label>';
    h += '<input id="m-' + f[0] + '" class="field field-sm" type="number" inputmode="decimal" step="0.1" placeholder="--" value="' + (meas[f[0]] || '') + '"></div>';
  });
  h += '</div>';
  h += '<button class="btn btn-secondary btn-sm" onclick="BS.logMeasurements()">Save Measurements</button>';
  h += '</div>';

  /* ── Progress Photos ── */
  h += App.sh('Progress Photos');
  h += '<div class="g3" style="margin:0 16px 12px">';
  ['front', 'back', 'side'].forEach(function (view) {
    h += '<div class="photo-slot" onclick="BS.addPhoto(\'' + view + '\')" id="photo-' + view + '">';
    if (photos[view]) {
      h += '<img src="' + photos[view] + '" alt="' + view + '">';
    } else {
      h += '<span style="font-size:24px">📷</span><span>' + view.charAt(0).toUpperCase() + view.slice(1) + '</span>';
    }
    h += '</div>';
  });
  h += '</div>';

  /* ── History ── */
  if (sorted.length) {
    h += App.sh('History', sorted.length > 5 ? 'See all' : '', '');
    h += '<div class="card" style="margin:0 0 20px">';
    sorted.slice(-6).reverse().forEach(function (entry) {
      h += '<div class="info-row">';
      h += '<span class="info-label">' + App.fmtDate(entry.date) + '</span>';
      h += '<span class="info-value">' + entry.weight + ' ' + unit;
      if (entry.bodyFat) h += ' · ' + entry.bodyFat + '% BF';
      h += '</span>';
      h += '</div>';
    });
    h += '</div>';
  }

  h += '</div>';
  return h;
});

const BS = {
  logWeight: async function () {
    const w = parseFloat(document.getElementById('bs-weight').value);
    const bf = parseFloat(document.getElementById('bs-bf').value) || null;
    if (isNaN(w) || w <= 0) { App.toast('Enter a valid weight', 'warn'); return; }
    const user = await Storage.getUser();
    const meas = {};
    ['chest','waist','hips','leftArm','rightArm','leftThigh','rightThigh','leftCalf','rightCalf'].forEach(function (k) {
      const el = document.getElementById('m-' + k);
      if (el && el.value) meas[k] = parseFloat(el.value);
    });
    await Storage.set('bodyStats', { date: App.isoNow(), weight: w, bodyFat: bf, measurements: meas, photos: {} });
    if (w !== user.weight) { user.weight = w; await Storage.setUser(user); }
    App.haptic(30);
    App.toast('Body stats saved!');
    go('bodystats');
  },

  logMeasurements: async function () {
    const user = await Storage.getUser();
    const allStats = await Storage.getAll('bodyStats');
    const sorted = allStats.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    const latest = sorted[0];
    const meas = latest ? Object.assign({}, latest.measurements || {}) : {};
    ['chest','waist','hips','leftArm','rightArm','leftThigh','rightThigh','leftCalf','rightCalf'].forEach(function (k) {
      const el = document.getElementById('m-' + k);
      if (el && el.value) meas[k] = parseFloat(el.value);
    });
    if (latest && latest.date.startsWith(App.today())) {
      latest.measurements = meas;
      await Storage.set('bodyStats', latest);
    } else {
      await Storage.set('bodyStats', { date: App.isoNow(), weight: user.weight, bodyFat: null, measurements: meas, photos: {} });
    }
    App.haptic(30);
    App.toast('Measurements saved!');
    go('bodystats');
  },

  addPhoto: function (view) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async function (e) {
      const file = e.target.files[0];
      if (!file) return;
      const canvas = document.createElement('canvas');
      const img = new Image();
      img.onload = async function () {
        const maxDim = 600;
        let w = img.width, h2 = img.height;
        if (w > maxDim || h2 > maxDim) {
          if (w > h2) { h2 = Math.round(h2 * maxDim / w); w = maxDim; }
          else { w = Math.round(w * maxDim / h2); h2 = maxDim; }
        }
        canvas.width = w; canvas.height = h2;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h2);
        let quality = 0.8;
        let dataURL = canvas.toDataURL('image/jpeg', quality);
        while (dataURL.length > 200 * 1024 && quality > 0.3) {
          quality -= 0.1;
          dataURL = canvas.toDataURL('image/jpeg', quality);
        }
        const allStats = await Storage.getAll('bodyStats');
        const sorted = allStats.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
        const latest = sorted[0];
        if (latest && latest.date.startsWith(App.today())) {
          if (!latest.photos) latest.photos = {};
          latest.photos[view] = dataURL;
          await Storage.set('bodyStats', latest);
        } else {
          const user = await Storage.getUser();
          await Storage.set('bodyStats', { date: App.isoNow(), weight: user.weight, bodyFat: null, measurements: {}, photos: { [view]: dataURL } });
        }
        App.toast('Photo saved!');
        go('bodystats');
      };
      img.src = URL.createObjectURL(file);
    };
    input.click();
  }
};
