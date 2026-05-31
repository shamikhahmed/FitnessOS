'use strict';
/* ── FitnessOS v4 — Coach Screen ── */

const COACH_META = {
  alex: { name:'Alex', emoji:'🔥', title:'Drill Sergeant', color:'#ff4444' },
  maya: { name:'Maya', emoji:'🧪', title:'Sports Scientist', color:'var(--c1)' },
  sam:  { name:'Sam',  emoji:'⚡', title:'The Motivator',   color:'#f5c842' },
  zen:  { name:'Zen',  emoji:'🧘', title:'Mindful Coach',   color:'#10B981' },
  rex:  { name:'Rex',  emoji:'💪', title:'The Powerlifter', color:'var(--c2)' }
};

reg('coach', function() {
  const user = S.g('user') || {};
  const personality = user.coachPersonality || 'maya';
  const cm = COACH_META[personality] || COACH_META.maya;
  const score = ReadinessEngine.score();
  const rl = ReadinessEngine.label(score);
  const insights = CoachEngine.insights();
  const weekReport = CoachEngine.weeklyReport();
  const splitDay = SplitEngine.getSplitDay();
  const cardioRec = CoachEngine.cardioRec(splitDay, score);
  const userSupps = S.g('supplements') || [];
  const rec = ReadinessEngine.recommendation(score);

  const coachQuote = ReadinessEngine.coachQuote(score, personality);

  return '<div class="coach-hero">' +
    '<div class="coach-avatar">'+cm.emoji+'</div>' +
    '<div class="coach-name-text">'+esc(cm.name)+' — '+esc(cm.title)+'</div>' +
    '<div class="coach-quote">"'+esc(coachQuote)+'"</div>' +
    '</div>' +

    _readinessBlock(score, rl, rec) +
    _todayPlanBlock(splitDay, cardioRec, score, user) +
    _weeklyInsightsBlock(weekReport, insights) +
    _suppTimingBlock(userSupps, user) +
    _deloadBlock(user) +
    '<div style="height:20px"></div>';
});

function _readinessBlock(score, rl, rec) {
  return sh('Readiness Assessment') +
    '<div style="padding:0 16px 14px">' +
    '<div class="readiness-card" style="margin:0">' +
    '<div style="display:flex;align-items:center;gap:20px">' +
    '<div>' +
    '<div class="readiness-score">'+score+'</div>' +
    '<div class="readiness-label '+rl.cls+'">'+rl.l+'</div>' +
    '</div>' +
    '<div style="flex:1">' +
    '<div style="font-size:16px;font-weight:700;color:var(--txt);margin-bottom:4px">Today\'s recommendation:</div>' +
    '<div style="font-size:14px;color:var(--c1);font-weight:600;text-transform:capitalize">'+esc(rec)+'</div>' +
    '<div style="font-size:13px;color:var(--txt2);margin-top:6px">'+esc(ReadinessEngine.message(score))+'</div>' +
    '</div></div></div></div>';
}

function _todayPlanBlock(splitDay, cardioRec, score, user) {
  const warmupItems = (splitDay.warmup||[]).map(w =>
    '<div style="padding:6px 0;font-size:13px;color:var(--txt2);border-bottom:1px solid var(--border)">🔥 '+esc(w)+'</div>'
  ).join('');

  const mainExercises = (splitDay.exercises||[]).map((name, i) => {
    const ex = ExDB.byName(name);
    const suggest = WeightEngine.suggest(name, user);
    const progNote = WeightEngine.progressionNote(name);
    const sets = user.goal === 'strength' ? '5 × 3-5' : user.goal === 'fat_loss' ? '3 × 12-15' : '4 × 8-12';
    return '<div style="padding:12px 0;border-bottom:1px solid var(--border)">' +
      '<div style="display:flex;align-items:center;gap:10px">' +
      '<div style="font-size:22px;width:32px">'+(ex?ex.em:'💪')+'</div>' +
      '<div style="flex:1">' +
      '<div style="font-size:14px;font-weight:700;color:var(--txt)">'+esc(name)+'</div>' +
      '<div style="font-size:12px;color:var(--txt3)">'+sets+(suggest?' · Try '+(suggest||'—')+'kg':'')+'</div>' +
      (progNote?'<div style="font-size:11px;color:#10B981;margin-top:2px">'+esc(progNote)+'</div>':'') +
      '</div></div></div>';
  }).join('');

  const cooldownItems = ['Quad stretch 30s each','Hip flexor stretch 30s each','Chest doorway stretch 30s','Child\'s pose 60s','Spinal twist 30s each side'].map(s=>
    '<div style="padding:6px 0;font-size:13px;color:var(--txt2);border-bottom:1px solid var(--border)">🧘 '+esc(s)+'</div>'
  ).join('');

  return sh('Today\'s Program') +
    '<div class="warmup-card"><div class="warmup-title">Warm-Up Protocol</div>'+warmupItems+'</div>' +
    '<div class="card card-solid" style="margin-bottom:14px">' +
    '<div style="font-size:16px;font-weight:800;color:var(--txt);margin-bottom:4px">'+esc(splitDay.n||'Rest Day')+'</div>' +
    '<div style="font-size:12px;color:var(--txt3);margin-bottom:12px">'+esc((splitDay.muscles||[]).join(', '))+'</div>' +
    mainExercises + '</div>' +
    '<div class="warmup-card">' +
    '<div class="warmup-title">Cardio Recommendation</div>' +
    '<div style="font-size:16px;font-weight:700;color:var(--c1);margin-bottom:4px">'+esc(cardioRec.machine)+'</div>' +
    '<div style="font-size:13px;color:var(--txt2);margin-bottom:4px">'+esc(cardioRec.duration)+'</div>' +
    '<div style="font-size:13px;color:var(--txt3)">'+esc(cardioRec.details)+'</div>' +
    '</div>' +
    '<div class="warmup-card"><div class="warmup-title">Cooldown Stretches</div>'+cooldownItems+'</div>' +
    '<div style="padding:0 16px 14px"><button class="btn btn-primary" onclick="go(\'workout\')">Start Workout 💪</button></div>';
}

function _weeklyInsightsBlock(report, insights) {
  const insightCards = insights.map(ins =>
    '<div class="insight-card"><div class="insight-icon">'+ins.i+'</div>' +
    '<div class="insight-label" style="color:'+ins.c+'">'+esc(ins.t)+'</div>' +
    '<div class="insight-text">'+esc(ins.m)+'</div></div>'
  ).join('');

  const volBlock = report ?
    '<div class="card card-solid" style="margin:0 16px 14px">' +
    '<div style="font-size:14px;font-weight:700;color:var(--txt);margin-bottom:8px">Weekly Volume</div>' +
    '<div style="font-size:28px;font-weight:900;color:var(--c1)">'+(report.thisVol>1000?Math.round(report.thisVol/100)/10+'t':report.thisVol+'kg')+'</div>' +
    '<div style="font-size:13px;color:var(--txt3)">'+report.weekWorkouts+' sessions this week</div>' +
    (report.change !== 0 ? '<div style="font-size:13px;margin-top:4px;color:'+(report.change>0?'#10B981':'#ff6b35')+'">' +
      (report.change>0?'↑':'↓')+Math.abs(report.change)+'% vs last week</div>' : '') +
    '</div>' : '';

  return sh('Weekly Insights') + volBlock + insightCards;
}

function _suppTimingBlock(userSupps, user) {
  if (!userSupps.length) return '';
  const timingOrder = ['morning','pre','intra','post','with_meal','night','anytime'];
  const timingLabels = { morning:'Morning',pre:'Pre-Workout',intra:'During',post:'Post-Workout',with_meal:'With Meal',night:'Before Bed',anytime:'Any Time' };
  const grouped = {};
  userSupps.forEach(s => {
    const t = s.timing || 'anytime';
    if (!grouped[t]) grouped[t] = [];
    grouped[t].push(s);
  });

  const timeline = timingOrder.filter(t => grouped[t]&&grouped[t].length).map(t => {
    const items = grouped[t].map(s => {
      const dbEntry = SupplementDB.find(d => d.id === s.id) || {};
      const cafWarn = user.caffeineWarning && dbEntry.caffeine ?
        SupplementEngine.checkCaffeineWarning(dbEntry, 22) : null;
      return '<div class="supp-time-item">' +
        '<div style="font-size:22px;width:32px">💊</div>' +
        '<div style="flex:1">' +
        '<div style="font-size:14px;font-weight:600;color:var(--txt)">'+esc(s.name)+'</div>' +
        '<div style="font-size:12px;color:var(--txt3)">'+esc(s.dose||dbEntry.dose||'')+'</div>' +
        (dbEntry.notes?'<div style="font-size:12px;color:var(--txt3);margin-top:2px">'+esc(dbEntry.notes)+'</div>':'') +
        (cafWarn?'<div style="font-size:12px;color:#f5c842;margin-top:4px">⚠️ '+esc(cafWarn)+'</div>':'') +
        '</div></div>';
    }).join('');
    return '<div class="supp-time-group">' +
      '<div class="supp-time-label">'+esc(timingLabels[t]||t)+'</div>' +
      items + '</div>';
  }).join('');

  return sh('Supplement Schedule') + '<div class="supp-timeline">'+timeline+'</div>';
}

function _deloadBlock(user) {
  const ws = S.g('workouts') || [];
  const needsDeload = WeightEngine.deloadCheck(user, ws);
  if (!needsDeload) return '';
  return sh('Recovery Alert') +
    '<div class="ai-msg" style="border-left-color:#f5c842">' +
    '<div class="ai-msg-header"><span>⚠️</span><span class="ai-msg-label" style="color:#f5c842">Deload Recommended</span></div>' +
    '<div class="ai-msg-text">5+ weeks of progressive training detected. A deload week (50% volume, same frequency) will prevent overtraining and drive adaptation.</div></div>';
}
