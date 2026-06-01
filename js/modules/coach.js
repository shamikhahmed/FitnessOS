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
    _splitSuggestionBlock(splitDay, cardioRec, score, user) +
    _progressionAnalysisBlock() +
    _weeklySummaryBlock(weekReport) +
    _weeklyInsightsBlock(insights) +
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

/* ── IMPROVEMENT 1: Smart Split Day Suggestion ── */
function _splitSuggestionBlock(splitDay, cardioRec, score, user) {
  const streak = StreakEngine.get();
  const muscleStatus = MuscleEngine.status();
  const statusMap = {};
  muscleStatus.forEach(m => { statusMap[m.name.toLowerCase()] = m.pct; });

  /* maps ExDB muscle names → MuscleEngine lowercase group keys */
  const MMAP = {
    chest:'chest', upper_chest:'chest', lower_chest:'chest',
    lats:'back', upper_back:'back', lower_back:'back', rhomboids:'back', traps:'back',
    front_delts:'shoulders', side_delts:'shoulders', rear_delts:'shoulders', shoulders:'shoulders',
    quads:'quads', hamstrings:'hamstrings', glutes:'glutes',
    biceps:'biceps', triceps:'triceps', core:'core', calves:'calves'
  };

  const deloadBanner = streak >= 5 ?
    '<div class="ai-msg" style="border-left-color:#f5c842;margin:0 16px 12px">' +
    '<div class="ai-msg-header"><span>⚠️</span><span class="ai-msg-label" style="color:#f5c842">Deload Week Advised</span></div>' +
    '<div class="ai-msg-text">'+streak+' consecutive training days detected. Keep the schedule but cut volume 50% — your CNS and connective tissue need systemic recovery.</div></div>' : '';

  if (score < 50) {
    const lightOpts = [
      '15-20 min light walk or mobility flow',
      '10 min foam rolling — focus on sore areas',
      'Yoga or full-body stretch (30 min)',
      'Rest completely and prioritise 8+ hours sleep tonight'
    ];
    return sh('Today\'s Program') + deloadBanner +
      '<div class="card card-solid" style="margin:0 16px 14px;border-left:3px solid #ff6b35">' +
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">' +
      '<div style="font-size:32px">🛌</div>' +
      '<div><div style="font-size:16px;font-weight:800;color:var(--txt)">Rest or Light Session</div>' +
      '<div style="font-size:13px;color:var(--txt2)">Readiness '+score+'/100 — body needs recovery</div></div></div>' +
      lightOpts.map(r=>'<div style="padding:6px 0;font-size:13px;color:var(--txt2);border-bottom:1px solid var(--border)">🧘 '+esc(r)+'</div>').join('') +
      '</div>' +
      '<div style="padding:0 16px 14px"><button class="btn btn-secondary" onclick="go(\'workout\')">Log Light Session 🚶</button></div>';
  }

  const warmupItems = (splitDay.warmup||[]).map(w =>
    '<div style="padding:6px 0;font-size:13px;color:var(--txt2);border-bottom:1px solid var(--border)">🔥 '+esc(w)+'</div>'
  ).join('');

  const mainExercises = (splitDay.exercises||[]).map(name => {
    const ex = ExDB.byName(name);
    const suggest = WeightEngine.suggest(name, user);
    const progNote = WeightEngine.progressionNote(name);
    const sets = user.goal === 'strength' ? '5 × 3-5' : user.goal === 'fat_loss' ? '3 × 12-15' : '4 × 8-12';
    const injWarn = MuscleEngine.injuryWarning(name);

    const exMuscles = ex ? (ex.muscles && ex.muscles.primary ? ex.muscles.primary : []) : [];
    const fatiguedMuscle = exMuscles.find(m => {
      const key = MMAP[m] || m;
      const pct = statusMap[key];
      return pct !== undefined && pct < 80;
    });
    const fatiguePct = fatiguedMuscle ? Math.round(statusMap[MMAP[fatiguedMuscle]||fatiguedMuscle]||0) : null;

    return '<div style="padding:12px 0;border-bottom:1px solid var(--border)">' +
      '<div style="display:flex;align-items:flex-start;gap:10px">' +
      '<div style="font-size:22px;width:32px">'+(ex?ex.em:'💪')+'</div>' +
      '<div style="flex:1">' +
      '<div style="font-size:14px;font-weight:700;color:var(--txt)">' +
        (fatiguedMuscle?'<span style="color:#f5c842">⚡ </span>':'') +
        (injWarn?'<span style="color:#ff4444">⚠️ </span>':'') +
        esc(name)+'</div>' +
      '<div style="font-size:12px;color:var(--txt3)">'+sets+(suggest?' · Try '+(suggest||'—')+'kg':'')+'</div>' +
      (fatiguedMuscle?'<div style="font-size:11px;color:#f5c842;margin-top:2px">'+fatiguePct+'% recovery — consider reduced volume</div>':'') +
      (injWarn?'<div style="font-size:11px;color:#ff4444;margin-top:2px">⚠️ Injury caution: '+esc(injWarn)+'</div>':'') +
      (!fatiguedMuscle&&!injWarn&&progNote?'<div style="font-size:11px;color:#10B981;margin-top:2px">'+esc(progNote)+'</div>':'') +
      '</div></div></div>';
  }).join('');

  const cooldownItems = ['Quad stretch 30s each','Hip flexor stretch 30s each','Chest doorway stretch 30s','Child\'s pose 60s','Spinal twist 30s each side'].map(s=>
    '<div style="padding:6px 0;font-size:13px;color:var(--txt2);border-bottom:1px solid var(--border)">🧘 '+esc(s)+'</div>'
  ).join('');

  return sh('Today\'s Program') + deloadBanner +
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

/* ── IMPROVEMENT 2: Progression Analysis per Exercise ── */
function _progressionAnalysisBlock() {
  const ws = S.g('workouts') || [];
  if (!ws.length) return '';

  const recentExNames = [];
  const seen = {};
  ws.slice(-5).reverse().forEach(wo => {
    (wo.exercises||[]).forEach(ex => {
      if (!seen[ex.name] && (ex.sets||[]).some(s=>s.done&&(s.weight||0)>0)) {
        seen[ex.name] = true;
        recentExNames.push(ex.name);
      }
    });
  });

  if (!recentExNames.length) return '';

  const u = S.g('user.units') === 'imperial' ? 'lb' : 'kg';
  const cards = [];
  recentExNames.slice(0,6).forEach(name => {
    const prog = CoachEngine.exerciseProgression(name);
    if (prog) cards.push(prog);
  });

  if (!cards.length) return '';

  const cardHtml = cards.map(prog => {
    const changeColor = !prog.pctChange ? 'var(--txt3)' : prog.pctChange > 0 ? '#10B981' : '#ff6b35';
    const changeLabel = !prog.pctChange ? 'No 4-wk data' : (prog.pctChange > 0 ? '↑' : '↓') + Math.abs(prog.pctChange) + '% vs 4wks';
    return '<div style="padding:14px 0;border-bottom:1px solid var(--border)">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">' +
      '<div style="font-size:14px;font-weight:700;color:var(--txt)">'+esc(prog.name)+'</div>' +
      '<div style="font-size:12px;color:'+changeColor+';font-weight:600">'+esc(changeLabel)+'</div>' +
      '</div>' +
      '<div style="display:flex;gap:10px;margin-bottom:6px">' +
      '<div style="flex:1">' +
      '<div style="font-size:10px;color:var(--txt3);text-transform:uppercase;letter-spacing:0.05em">Best set</div>' +
      '<div style="font-size:14px;font-weight:700;color:var(--c1)">'+prog.currentWeight+u+' × '+prog.currentReps+'</div>' +
      '</div>' +
      '<div style="flex:1">' +
      '<div style="font-size:10px;color:var(--txt3);text-transform:uppercase;letter-spacing:0.05em">Est. 1RM</div>' +
      '<div style="font-size:14px;font-weight:700;color:var(--txt)">'+prog.currentE1RM+u+'</div>' +
      '</div>' +
      '<div style="flex:1">' +
      '<div style="font-size:10px;color:var(--txt3);text-transform:uppercase;letter-spacing:0.05em">Next target</div>' +
      '<div style="font-size:14px;font-weight:700;color:'+(prog.plateau?'#f5c842':'#10B981')+'">'+prog.suggestedWeight+u+'</div>' +
      '</div>' +
      '</div>' +
      (prog.plateau ? '<div style="font-size:12px;color:#f5c842;background:rgba(245,200,66,0.1);padding:6px 8px;border-radius:8px">⚠️ Plateau — '+prog.sessions+' sessions, 1RM unchanged. Try technique variation or a planned deload.</div>' : '') +
      '</div>';
  }).join('');

  return sh('Progression Analysis', 'All PRs', 'go(\'progress\')') +
    '<div class="card card-solid" style="margin:0 16px 14px">'+cardHtml+'</div>';
}

/* ── IMPROVEMENT 3: Weekly Summary Card ── */
function _weeklySummaryBlock(report) {
  if (!report) return '';
  const volLabel = report.thisVol > 1000 ? Math.round(report.thisVol/100)/10+'t' : report.thisVol+'kg';
  const changeColor = report.change > 0 ? '#10B981' : report.change < 0 ? '#ff6b35' : 'var(--txt3)';
  const changeLabel = report.change !== 0 ? (report.change>0?'↑':'↓')+Math.abs(report.change)+'% vs last week' : 'Same as last week';
  const completionPct = Math.round((report.weekWorkouts / Math.max(report.weeklyGoal,1)) * 100);

  return sh('Weekly Summary', 'Full history', 'go(\'progress\')') +
    '<div class="card card-solid" style="margin:0 16px 14px">' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">' +
    '<div style="background:var(--bg3);border-radius:12px;padding:12px">' +
    '<div style="font-size:10px;color:var(--txt3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">Volume</div>' +
    '<div style="font-size:22px;font-weight:900;color:var(--c1)">'+esc(volLabel)+'</div>' +
    '<div style="font-size:12px;color:'+changeColor+';margin-top:2px">'+esc(changeLabel)+'</div>' +
    '</div>' +
    '<div style="background:var(--bg3);border-radius:12px;padding:12px">' +
    '<div style="font-size:10px;color:var(--txt3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">Workouts</div>' +
    '<div style="font-size:22px;font-weight:900;color:var(--txt)">'+report.weekWorkouts+'/'+report.weeklyGoal+'</div>' +
    '<div style="font-size:12px;color:'+(completionPct>=100?'#10B981':'var(--txt3)')+';margin-top:2px">'+(completionPct>=100?'✅ Goal hit!':completionPct+'% of goal')+'</div>' +
    '</div>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">' +
    (report.bestMuscle ?
      '<div style="background:var(--bg3);border-radius:12px;padding:12px">' +
      '<div style="font-size:10px;color:var(--txt3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">Best Recovered</div>' +
      '<div style="font-size:15px;font-weight:800;color:#10B981">'+esc(report.bestMuscle)+'</div>' +
      '<div style="font-size:12px;color:var(--txt3);margin-top:2px">'+Math.round(report.bestMuscleScore)+'% ready</div>' +
      '</div>' : '<div></div>') +
    (report.mostImproved ?
      '<div style="background:var(--bg3);border-radius:12px;padding:12px">' +
      '<div style="font-size:10px;color:var(--txt3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">Most Improved</div>' +
      '<div style="font-size:14px;font-weight:800;color:var(--c1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(report.mostImproved.name)+'</div>' +
      '<div style="font-size:12px;color:#10B981;margin-top:2px">+'+report.mostImproved.gain+'% 1RM</div>' +
      '</div>' : '<div></div>') +
    '</div>' +
    '<div style="background:var(--bg3);border-radius:12px;padding:12px">' +
    '<div style="font-size:10px;color:var(--txt3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">Current Readiness</div>' +
    '<div style="display:flex;align-items:center;gap:8px">' +
    '<div style="font-size:22px;font-weight:900;color:'+(report.currentReadiness>=70?'#10B981':report.currentReadiness>=50?'#f5c842':'#ff6b35')+'">'+report.currentReadiness+'</div>' +
    '<div style="font-size:13px;color:var(--txt3)">/ 100 — '+ReadinessEngine.label(report.currentReadiness).l+'</div>' +
    '</div></div>' +
    '</div>';
}

function _weeklyInsightsBlock(insights) {
  const insightCards = insights.map(ins =>
    '<div class="insight-card"><div class="insight-icon">'+ins.i+'</div>' +
    '<div class="insight-label" style="color:'+ins.c+'">'+esc(ins.t)+'</div>' +
    '<div class="insight-text">'+esc(ins.m)+'</div></div>'
  ).join('');
  return sh('AI Insights') + insightCards;
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
