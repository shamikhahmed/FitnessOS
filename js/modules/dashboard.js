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
    const weekReport = CoachEngine.weeklyReport();
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
      '<button class="topbar-icon" onclick="applyTheme(\''+_nextTheme(user.theme||'carbon')+'\')">🎨</button>' +
      '<button class="topbar-icon" onclick="go(\'settings\')">⚙️</button>' +
      '</div></div>';

    // ── Readiness hero
    const r = S.g('recovery') || {};
    const rdBorder = score >= 80 ? '#10B981' : score >= 60 ? '#00d5ff' : score >= 40 ? '#f59e0b' : '#ef4444';
    const rdBg = score >= 80 ? 'rgba(16,185,129,0.08)' : score >= 60 ? 'rgba(0,213,255,0.08)' : score >= 40 ? 'rgba(245,158,11,0.08)' : 'rgba(239,68,68,0.08)';

    const sleepV = r.sleep != null ? r.sleep : 7.5;
    const sorenessV = r.soreness != null ? r.soreness : 3;
    const stressV = r.stress != null ? r.stress : 4;
    const energyV = r.energy != null ? r.energy : 7;

    const sleepC = sleepV >= 7 ? '#10B981' : sleepV >= 6 ? '#f59e0b' : '#ef4444';
    const sorenessC = sorenessV <= 3 ? '#10B981' : sorenessV <= 6 ? '#f59e0b' : '#ef4444';
    const stressC = stressV <= 3 ? '#10B981' : stressV <= 6 ? '#f59e0b' : '#ef4444';
    const energyC = energyV >= 7 ? '#10B981' : energyV >= 5 ? '#f59e0b' : '#ef4444';

    const readinessHTML = '<style>' +
      '@keyframes rdBreathe{0%,100%{transform:scale(1);opacity:0.13}50%{transform:scale(1.08);opacity:0.18}}' +
      '</style>' +
      '<div class="readiness-card" style="border-color:'+rdBorder+';background:'+rdBg+';position:relative;overflow:hidden">' +
      '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:120px;height:120px;border-radius:50%;background:'+rdBorder+';animation:rdBreathe 3s ease-in-out infinite;pointer-events:none"></div>' +
      '<div style="position:relative;z-index:1">' +
      '<div style="text-align:center;margin-bottom:14px">' +
      '<div style="font-size:64px;font-weight:900;background:linear-gradient(135deg,#00d5ff,#6b5fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1">'+score+'</div>' +
      '<div class="readiness-label '+rl.cls+'" style="margin-top:2px">'+rl.l+'</div>' +
      '<div class="readiness-msg" style="margin-top:8px;font-size:12px">'+esc(ReadinessEngine.coachQuote(score, user.coachPersonality))+'</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px">' +
      _miniMetric('😴', sleepV, 'Sleep', sleepC) +
      _miniMetric('💪', sorenessV, 'Soreness', sorenessC) +
      _miniMetric('🧠', stressV, 'Stress', stressC) +
      _miniMetric('⚡', energyV, 'Energy', energyC) +
      '</div>' +
      (!loggedToday ? '<button class="readiness-log-btn" style="margin-top:12px;width:100%" onclick="go(\'recovery\')">📊 Tap to log recovery →</button>' : '') +
      '</div></div>' +
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

    // ── Activity rings (animated SVG)
    const calTarget2 = S.g('goals.dailyCalories') || calTarget;
    const waterTarget2 = S.g('goals.dailyWater') || 2500;
    const weekGoal2 = S.g('goals.weeklyWorkouts') || weekGoal;
    const todayCalories2 = S.g('nutrition.todayCalories') || todayCals;
    const todayWaterMl = S.g('nutrition.todayWater') || 0;

    const ringsHTML = '<div class="rings-section">' + sh('Activity') +
      '<div class="rings-row" id="rings-row-dash">' +
      _animRing('ring-wkt', weekWkts.length, weekGoal2, '#00ff88', 'Workouts', weekWkts.length+'/'+weekGoal2) +
      _animRing('ring-cal', todayCalories2, calTarget2, '#00d5ff', 'Calories', todayCalories2+'/'+calTarget2) +
      _animRing('ring-h2o', todayWaterMl, waterTarget2, '#6b5fff', 'Water', todayWaterMl+'ml/'+(waterTarget2/1000).toFixed(1)+'L') +
      '</div></div>' +
      '<script>(function(){' +
      'var rings=[' +
      '{id:"ring-wkt",val:'+Math.min(weekWkts.length,weekGoal2)+',max:'+weekGoal2+',color:"#00ff88"},' +
      '{id:"ring-cal",val:'+Math.min(todayCalories2,calTarget2)+',max:'+calTarget2+',color:"#00d5ff"},' +
      '{id:"ring-h2o",val:'+Math.min(todayWaterMl,waterTarget2)+',max:'+waterTarget2+',color:"#6b5fff"}' +
      '];' +
      'var circ=188.5;' +
      'rings.forEach(function(ring){' +
      'var el=document.getElementById(ring.id+"-arc");' +
      'if(!el)return;' +
      'var start=Date.now(),dur=600,pct=ring.max>0?ring.val/ring.max:0,target=circ-(circ*Math.min(pct,1));' +
      'el.style.strokeDashoffset=circ;' +
      '(function tick(){' +
      'var t=Math.min((Date.now()-start)/dur,1),ease=1-Math.pow(1-t,3);' +
      'el.style.strokeDashoffset=circ+(target-circ)*ease;' +
      'if(t<1)requestAnimationFrame(tick);' +
      '})();' +
      '});' +
      '})();<\/script>';

    // ── Stats row
    const statsHTML = '<div class="stats-row">' +
      '<div class="stat stat-accent"><div class="stat-v">'+streak+'🔥</div><div class="stat-l">Streak</div></div>' +
      '<div class="stat"><div class="stat-v">'+prs.length+'</div><div class="stat-l">PRs Set</div></div>' +
      '<div class="stat"><div class="stat-v">'+(weekVol>1000?round2(weekVol/1000)+'t':weekVol+'kg')+'</div><div class="stat-l">Week Vol</div></div>' +
      '<div class="stat"><div class="stat-v">'+ws.length+'</div><div class="stat-l">Sessions</div></div>' +
      '</div>';

    // ── Monday weekly summary auto-show
    const isMonday = new Date().getDay() === 1;
    let weekSummaryHTML = '';
    if (isMonday && weekReport) {
      const vLabel = weekReport.thisVol > 1000 ? Math.round(weekReport.thisVol/100)/10+'t' : weekReport.thisVol+'kg';
      const chColor = weekReport.change > 0 ? '#10B981' : weekReport.change < 0 ? '#ff6b35' : 'var(--txt3)';
      const chLabel = weekReport.change !== 0 ? (weekReport.change>0?'↑':'↓')+Math.abs(weekReport.change)+'% volume vs last week' : 'Same volume as last week';
      weekSummaryHTML = sh('Weekly Review 📊', 'Full report', 'go(\'coach\')') +
        '<div class="card card-solid" style="margin:0 16px 14px">' +
        '<div style="font-size:13px;color:var(--txt3);margin-bottom:10px">Monday recap — last 7 days</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:12px">' +
        '<div style="flex:1;min-width:72px"><div style="font-size:20px;font-weight:900;color:var(--c1)">'+esc(vLabel)+'</div><div style="font-size:11px;color:var(--txt3)">Volume</div><div style="font-size:12px;color:'+chColor+'">'+esc(chLabel)+'</div></div>' +
        '<div style="flex:1;min-width:72px"><div style="font-size:20px;font-weight:900;color:var(--txt)">'+weekReport.weekWorkouts+'/'+weekReport.weeklyGoal+'</div><div style="font-size:11px;color:var(--txt3)">Sessions</div></div>' +
        (weekReport.mostImproved ? '<div style="flex:1;min-width:72px"><div style="font-size:16px;font-weight:800;color:#10B981">+'+weekReport.mostImproved.gain+'%</div><div style="font-size:11px;color:var(--txt3)">'+esc(weekReport.mostImproved.name)+' 1RM</div></div>' : '') +
        (weekReport.bestMuscle ? '<div style="flex:1;min-width:72px"><div style="font-size:15px;font-weight:800;color:var(--c2)">'+esc(weekReport.bestMuscle)+'</div><div style="font-size:11px;color:var(--txt3)">Best recovered</div></div>' : '') +
        '</div></div>';
    }

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
    const _insightMeta = {
      recovery:   { color:'#6b5fff', emoji:'💤' },
      strength:   { color:'#00ff88', emoji:'💪' },
      nutrition:  { color:'#ff6b35', emoji:'🥗' },
      cardio:     { color:'#00d5ff', emoji:'🏃' },
      warning:    { color:'#ffaa00', emoji:'⚠️' },
      def:        { color:'#00d5ff', emoji:'✨' }
    };
    const insightHTML = sh('Daily Insights') +
      '<div style="padding:0 16px">' +
      insights.map(ins => {
        const meta = _insightMeta[ins.type] || _insightMeta[ins.t] || _insightMeta.def;
        const col = ins.c || meta.color;
        const emoji = meta.emoji;
        const hexToRgba = function(hex, a) {
          const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
          return 'rgba('+r+','+g+','+b+','+a+')';
        };
        const bg = col.startsWith('#') ? hexToRgba(col, 0.05) : 'rgba(0,213,255,0.05)';
        return '<div style="border-left:3px solid '+col+';background:'+bg+';padding:12px;border-radius:10px;margin-bottom:8px">' +
          '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">' +
          '<span style="font-size:16px">'+emoji+'</span>' +
          '<div style="font-size:13px;font-weight:500;color:'+col+'">'+esc(ins.t)+'</div>' +
          '</div>' +
          '<div style="font-size:12px;color:var(--txt3)">'+esc(ins.m)+'</div>' +
          '</div>';
      }).join('') +
      '</div>';

    return topbarHTML +
      readinessHTML +
      '<div style="padding:0 16px">' + ringsHTML + '</div>' +
      statsHTML +
      weekSummaryHTML +
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

function _miniMetric(icon, val, label, color) {
  return '<div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:10px 6px;text-align:center">' +
    '<div style="font-size:18px;margin-bottom:4px">'+icon+'</div>' +
    '<div style="font-size:14px;font-weight:700;color:'+color+'">'+val+'</div>' +
    '<div style="font-size:10px;color:var(--txt3);margin-top:2px">'+esc(label)+'</div>' +
    '</div>';
}

function _animRing(id, val, max, color, label, sublabel) {
  const pct = max > 0 ? Math.min(Math.round((val / max) * 100), 100) : 0;
  return '<div class="ring-wrap">' +
    '<div class="ring-outer">' +
    '<svg width="72" height="72" viewBox="0 0 72 72" style="display:block">' +
    '<circle cx="36" cy="36" r="30" fill="none" stroke="'+color+'" stroke-width="6" stroke-opacity="0.15"/>' +
    '<circle id="'+id+'-arc" cx="36" cy="36" r="30" fill="none" stroke="'+color+'" stroke-width="6"' +
    ' stroke-dasharray="188.5" stroke-dashoffset="188.5" stroke-linecap="round"' +
    ' transform="rotate(-90 36 36)"/>' +
    '</svg>' +
    '<div class="ring-center">' +
    '<div style="font-size:11px;font-weight:700;color:var(--txt)">'+pct+'%</div>' +
    '</div></div>' +
    '<div style="font-size:10px;color:var(--txt3);text-align:center;margin-top:4px">'+esc(sublabel)+'</div>' +
    '<div style="font-size:9px;color:'+color+';text-align:center;margin-top:2px">'+esc(label)+'</div>' +
    '</div>';
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
