'use strict';
/* ── FitnessOS v4 — Dashboard ── */

reg('dashboard', function() {
  try {
    const user = S.g('user') || {};
    const ws = S.g('workouts') || [];
    const meals = S.g('meals') || [];
    const water = S.g('water') || [];
    const prs = S.g('prs') || [];

    const score = ReadinessEngine.score();
    const rl = ReadinessEngine.label(score);
    const streak = StreakEngine.get();
    const weekWkts = StreakEngine.weekWorkouts();
    const insights = CoachEngine.insights();
    const splitDay = SplitEngine.getSplitDay();
    const muscles = MuscleEngine.status();
    const dueSupps = SupplementEngine.getDueNow();

    const name = (user.name || 'Athlete').split(' ')[0];
    const hr = new Date().getHours();
    const greeting = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';
    const todayStr = new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'});

    // Metrics
    const todayCals = meals.filter(m => m.date === today()).reduce((a,m) => a+(m.calories||0),0);
    const calTarget = user.calorieTarget || 2200;
    const calPct = Math.min(Math.round((todayCals/calTarget)*100),100);
    const todayWater = water.filter(w => w.date === today()).length;
    const waterPct = Math.min(Math.round((todayWater/(user.waterTarget||8))*100),100);
    const weekGoal = user.weeklyGoal || 4;
    const weekPct = Math.min(Math.round((weekWkts.length/weekGoal)*100),100);
    const totalVol = StreakEngine.totalVolume();
    const weekVol = StreakEngine.weekVolume();
    const recoveryToday = S.g('recovery') || {};
    const loggedToday = recoveryToday.date === today();

    // ── Topbar
    const topbarHTML = '<div class="topbar">' +
      '<div class="topbar-left">' +
      '<div class="topbar-greeting">'+esc(greeting)+', '+esc(name)+' 👋</div>' +
      '<div class="topbar-date">'+esc(todayStr)+'</div>' +
      '</div>' +
      '<div class="topbar-right">' +
      '<button class="topbar-icon" onclick="applyTheme(\''+_nextTheme(user.theme||\'carbon\')+'\')">🎨</button>' +
      '<button class="topbar-icon" onclick="go(\'settings\')">⚙️</button>' +
      '</div></div>';

    // ── Readiness hero
    const r = S.g('recovery') || {};
    const readinessHTML = '<div class="readiness-card">' +
      '<div style="display:flex;align-items:flex-start;gap:16px">' +
      '<div>' +
      '<div class="readiness-score">'+score+'</div>' +
      '<div class="readiness-label '+rl.cls+'">'+rl.l+'</div>' +
      '</div>' +
      '<div style="flex:1;padding-top:4px">' +
      '<div class="readiness-msg">'+esc(ReadinessEngine.coachQuote(score, user.coachPersonality))+'</div>' +
      '</div></div>' +
      '<div class="readiness-metrics">' +
      _metricPill('😴', r.sleep||7.5, 'Sleep') +
      _metricPill('💪', r.soreness||3, 'Soreness') +
      _metricPill('🧠', r.stress||4, 'Stress') +
      _metricPill('⚡', r.energy||7, 'Energy') +
      '</div>' +
      (!loggedToday ? '<button class="readiness-log-btn" onclick="go(\'recovery\')">📊 Log today\'s recovery</button>' : '') +
      '</div>' +
      '<div class="readiness-quote">'+esc(CoachEngine.motivationalQuote())+'</div>';

    // ── Today's plan card
    const exChips = (splitDay.exercises||[]).slice(0,4).map(e=>
      '<span class="pill">'+esc(e)+'</span>'
    ).join('');
    const planHTML = '<div style="padding:0 16px 14px">' +
      '<div class="card card-grad-border" style="margin:0">' +
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">' +
      '<div style="font-size:32px">🏋️</div>' +
      '<div><div style="font-size:16px;font-weight:800;color:var(--txt)">'+esc(splitDay.n||'Rest Day')+'</div>' +
      '<div style="font-size:12px;color:var(--txt3);margin-top:2px">'+esc((splitDay.muscles||[]).join(', '))+'</div></div>' +
      '</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">'+exChips+'</div>' +
      '<div style="display:flex;gap:10px">' +
      '<button class="btn btn-primary" style="flex:1" onclick="go(\'workout\')">Start Workout</button>' +
      '<button class="btn btn-secondary" style="width:auto;padding:16px 18px" onclick="showSubstitutes()">🔄</button>' +
      '</div></div></div>';

    // ── Activity rings
    const ringsHTML = '<div class="rings-section"><div class="sh-t" style="padding:20px 0 14px">This Week</div>' +
      '<div class="rings-row">' +
      buildRing(weekPct, '#10B981', 'Workouts', weekWkts.length+'/'+weekGoal) +
      buildRing(calPct, 'var(--c1)', 'Calories', todayCals+'/'+calTarget) +
      buildRing(waterPct, '#3B82F6', 'Water', todayWater+'/'+(user.waterTarget||8)) +
      '</div></div>';

    // ── Stats row
    const statsHTML = '<div class="stats-row">' +
      '<div class="stat stat-accent"><div class="stat-v">'+streak+'🔥</div><div class="stat-l">Streak</div></div>' +
      '<div class="stat"><div class="stat-v">'+prs.length+'</div><div class="stat-l">PRs Set</div></div>' +
      '<div class="stat"><div class="stat-v">'+(weekVol>1000?round2(weekVol/1000)+'t':weekVol+'kg')+'</div><div class="stat-l">Week Vol</div></div>' +
      '<div class="stat"><div class="stat-v">'+ws.length+'</div><div class="stat-l">Sessions</div></div>' +
      '</div>';

    // ── Due supplements
    let suppHTML = '';
    if (dueSupps.length) {
      suppHTML = sh('Due Soon', 'View all', 'go(\'nutrition\')') +
        dueSupps.slice(0,2).map(s => '<div class="supp-card due">' +
          '<div class="supp-icon">💊</div>' +
          '<div class="supp-info"><div class="supp-name">'+esc(s.name)+'</div><div class="supp-timing">'+esc(s.timing)+'</div></div>' +
          '<button class="supp-mark" onclick="SupplementEngine.markTaken(\''+s.id+'\');go(\'dashboard\')">Done</button></div>'
        ).join('');
    }

    // ── Muscle chips
    const muscleChips = muscles.slice(0,8).map(m =>
      '<span class="mchip mchip-'+m.status+'">'+esc(m.name)+'</span>'
    ).join('');
    const muscleHTML = sh('Muscle Recovery') + '<div class="mchips-wrap">'+muscleChips+'</div>';

    // ── Recent workouts
    let recentHTML = '';
    if (ws.length) {
      recentHTML = sh('Recent Sessions', 'All', 'go(\'progress\')') +
        ws.slice(-2).reverse().map(w =>
          '<div class="card card-solid card-tap" style="margin-bottom:10px" onclick="go(\'progress\')">' +
          '<div class="row-between">' +
          '<div><div style="font-size:15px;font-weight:700;color:var(--txt)">'+esc(w.name||'Workout')+'</div>' +
          '<div style="font-size:12px;color:var(--txt3);margin-top:2px">'+fmtDate(w.date)+'</div></div>' +
          '<div style="text-align:right">' +
          '<div style="font-size:15px;font-weight:700;color:var(--c1)">'+(w.totalVol||0)+'kg</div>' +
          '<div style="font-size:11px;color:var(--txt3)">'+fmtMins(w.duration||0)+'</div>' +
          '</div></div></div>'
        ).join('');
    }

    // ── Explore grid
    const exploreHTML = sh('Explore') +
      '<div class="explore-grid">' +
      _eCard('💪','Workout','Log a session','workout') +
      _eCard('🫀','Body Map','Muscle visualiser','bodymap') +
      _eCard('📈','Progress','Charts & PRs','progress') +
      _eCard('💊','Supplements','Stack & reminders','nutrition') +
      _eCard('🏃','Recovery','Sleep & readiness','recovery') +
      _eCard('📊','Analytics','Deep insights','progress') +
      '</div>';

    // ── AI Insights
    const insightHTML = sh('Daily Insights') +
      insights.map(ins =>
        '<div class="insight-card"><div class="insight-icon">'+ins.i+'</div>' +
        '<div class="insight-label" style="color:'+ins.c+'">'+esc(ins.t)+'</div>' +
        '<div class="insight-text">'+esc(ins.m)+'</div></div>'
      ).join('');

    return topbarHTML +
      readinessHTML +
      '<div style="padding:0 16px">' + ringsHTML + '</div>' +
      statsHTML +
      planHTML +
      muscleHTML +
      suppHTML +
      insightHTML +
      recentHTML +
      exploreHTML +
      '<div style="height:20px"></div>';
  } catch(e) {
    console.error('dashboard', e);
    return '<div style="padding:28px;color:var(--txt)">' +
      '<div style="font-size:48px;margin-bottom:16px">⚡</div>' +
      '<div style="font-size:22px;font-weight:800;margin-bottom:8px">FitnessOS</div>' +
      '<div style="color:var(--txt3);margin-bottom:24px">Ready to train.</div>' +
      '<button class="btn btn-primary" onclick="go(\'workout\')">Start Workout 💪</button>' +
      '</div>';
  }
});

function _metricPill(icon, val, label) {
  return '<div class="readiness-metric">' +
    '<div class="readiness-metric-v">'+icon+' '+val+'</div>' +
    '<div class="readiness-metric-l">'+esc(label)+'</div></div>';
}

function _eCard(icon, title, sub, screen) {
  return '<button class="explore-card press" onclick="go(\''+screen+'\')">' +
    '<div class="explore-icon">'+icon+'</div>' +
    '<div class="explore-title">'+esc(title)+'</div>' +
    '<div class="explore-sub">'+esc(sub)+'</div>' +
    '</button>';
}

const THEMES = ['carbon','stealth','forest','arctic','electric','sunset'];
function _nextTheme(current) {
  const idx = THEMES.indexOf(current);
  return THEMES[(idx+1) % THEMES.length];
}
window._nextTheme = _nextTheme;

window.showSubstitutes = function() {
  const day = SplitEngine.getSplitDay();
  const subs = (day.exercises||[]).slice(0,4).map(e => {
    const alts = SplitEngine.getSubstitutes(e, '');
    return '<div style="padding:12px 0;border-bottom:1px solid var(--border)">' +
      '<div style="font-size:13px;font-weight:700;color:var(--txt);margin-bottom:6px">'+esc(e)+'</div>' +
      (alts.length ? alts.map(a=>'<div style="font-size:13px;color:var(--txt2);padding:3px 0">→ '+esc(a)+'</div>').join('') :
        '<div style="font-size:12px;color:var(--txt3)">No substitutes available</div>') +
      '</div>';
  }).join('');
  modal('Exercise Alternatives', subs,
    '<button class="btn btn-secondary" onclick="closeModal()" style="margin-top:16px">Close</button>');
};
