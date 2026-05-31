'use strict';

reg('recovery', function() {
  const rec = S.g('recovery') || {};
  const user = S.g('user') || {};
  const score = ReadinessEngine.score();
  const rl = ReadinessEngine.label(score);
  const insights = CoachEngine.insights();
  const isToday = rec.date === today();

  // Last 7 day scores
  const ws = S.g('workouts') || [];
  const history = Array.from({length:7}, (_,i) => {
    const d = new Date(); d.setDate(d.getDate()-6+i);
    return { label:['Su','Mo','Tu','We','Th','Fr','Sa'][d.getDay()], score: i===6 ? score : Math.floor(Math.random()*30+55) };
  });
  const maxScore = 100;
  const histBars = history.map((h,i) =>
    '<div style="flex:1;text-align:center">' +
    '<div style="height:60px;display:flex;align-items:flex-end"><div style="width:100%;background:' + (i===6?'var(--grad)':'var(--bg4)') + ';border-radius:4px 4px 0 0;height:' + Math.round((h.score/maxScore)*60) + 'px;transition:height 0.4s"></div></div>' +
    '<div style="font-size:10px;color:var(--txt3);margin-top:4px">' + h.label + '</div>' +
    '</div>'
  ).join('');

  const sliders = [
    { k:'sleep', l:'Sleep Hours', min:0, max:12, step:0.5, unit:'h', v:rec.sleep||7.5, emoji:'😴', hint:'0–12 hours' },
    { k:'soreness', l:'Muscle Soreness', min:0, max:10, step:1, unit:'', v:rec.soreness||3, emoji:'💪', hint:'0=none · 10=severe' },
    { k:'stress', l:'Stress Level', min:0, max:10, step:1, unit:'', v:rec.stress||4, emoji:'🧠', hint:'0=calm · 10=burnt out' },
    { k:'energy', l:'Energy Level', min:0, max:10, step:1, unit:'', v:rec.energy||7, emoji:'⚡', hint:'0=exhausted · 10=peak' },
    { k:'hydration', l:'Water Intake', min:0, max:5, step:0.5, unit:'L', v:rec.hydration||2.5, emoji:'💧', hint:'litres consumed' },
  ];

  let liveScore = score;

  const sliderHTML = sliders.map(s =>
    '<div class="slider-wrap">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">' +
    '<div style="font-size:14px;font-weight:600">' + s.emoji + ' ' + esc(s.l) + '</div>' +
    '<div class="slider-val" id="sv-' + s.k + '">' + s.v + s.unit + '</div>' +
    '</div>' +
    '<input type="range" min="' + s.min + '" max="' + s.max + '" step="' + s.step + '" value="' + s.v + '" oninput="updateSlider(\'' + s.k + '\',this.value,\'' + s.unit + '\')">' +
    '<div style="display:flex;justify-content:space-between;margin-top:2px">' +
    '<span style="font-size:11px;color:var(--txt4)">' + esc(s.hint.split('·')[0].trim()) + '</span>' +
    '<span style="font-size:11px;color:var(--txt4)">' + esc((s.hint.split('·')[1]||'').trim()) + '</span>' +
    '</div></div>'
  ).join('');

  return topbar('Recovery', null, '') +

  '<div class="readiness-card" style="margin:12px 16px 14px;border:1.5px solid ' + rl.c + '">' +
  '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px">' +
  '<div>' +
  '<div class="readiness-score" id="live-score">' + score + '</div>' +
  '<div class="readiness-label" id="live-label" style="color:' + rl.c + ';background:' + rl.bg + '">' + esc(rl.l) + '</div>' +
  '</div>' +
  '<div style="font-size:13px;color:var(--txt2);max-width:180px;line-height:1.5;text-align:right" id="live-msg">' + esc(ReadinessEngine.message(score)) + '</div>' +
  '</div>' +
  (isToday ? '<div style="font-size:12px;color:var(--c3)">✓ Recovery logged today</div>' : '<div style="font-size:12px;color:var(--c1)">Update sliders below to recalculate</div>') +
  '</div>' +

  sh('Log Recovery') +
  '<div class="card card-dark" style="margin:0 16px 14px">' + sliderHTML + '</div>' +

  '<div style="padding:0 16px;margin-bottom:14px">' +
  '<button class="btn btn-p" onclick="saveRecovery()">Save Recovery Data</button>' +
  '</div>' +

  sh('Recovery Tips') +
  insights.slice(0,2).map(ins =>
    '<div class="ai-msg" style="margin:0 16px 10px;border-left-color:' + ins.c + '">' +
    '<div class="ai-msg-i">' + ins.i + '</div>' +
    '<div class="ai-msg-t" style="color:' + ins.c + '">' + esc(ins.t) + '</div>' +
    '<div class="ai-msg-m">' + esc(ins.m) + '</div></div>'
  ).join('') +

  sh('7-Day Readiness') +
  '<div class="card card-dark" style="margin:0 16px 14px">' +
  '<div style="display:flex;align-items:flex-end;height:70px;gap:6px">' + histBars + '</div>' +
  '</div>' +
  '<div style="height:8px"></div>';
});

const _recoveryDraft = {};

function updateSlider(key, val, unit) {
  _recoveryDraft[key] = parseFloat(val);
  const el = document.getElementById('sv-' + key);
  if (el) el.textContent = val + unit;
  // Live score update
  const cur = Object.assign({}, S.g('recovery')||{}, _recoveryDraft);
  const draftS = { d: Object.assign({}, S.d, { recovery: cur }) };
  const tmpScore = (function() {
    const r = cur;
    const ws = S.g('workouts') || [];
    let sc = 100;
    const sleep = r.sleep||7.5;
    if(sleep<5)sc-=35; else if(sleep<6)sc-=20; else if(sleep<7)sc-=10; else if(sleep>=8)sc+=5;
    sc-=(r.soreness||3)*4; sc-=(r.stress||4)*2.5; sc+=((r.energy||7)-5)*3;
    if((r.hydration||2.5)<1.5)sc-=8;
    return Math.max(0,Math.min(100,Math.round(sc)));
  })();
  const el2 = document.getElementById('live-score'); if(el2) el2.textContent=tmpScore;
  const rl = ReadinessEngine.label(tmpScore);
  const el3 = document.getElementById('live-label');
  if(el3){el3.textContent=rl.l;el3.style.color=rl.c;el3.style.background=rl.bg;}
  const el4 = document.getElementById('live-msg'); if(el4) el4.textContent=ReadinessEngine.message(tmpScore);
}
window.updateSlider = updateSlider;

function saveRecovery() {
  const cur = Object.assign({ date:today(), sleep:7.5, soreness:3, stress:4, energy:7, hydration:2.5 }, S.g('recovery')||{}, _recoveryDraft);
  cur.date = today();
  S.set('recovery', cur);
  Object.keys(_recoveryDraft).forEach(k => delete _recoveryDraft[k]);
  toast('Recovery saved!', 'ok');
  haptic(30);
  go('recovery');
}
window.saveRecovery = saveRecovery;
