'use strict';

/* ═══════════════════════════════════════════════════
   ROUTER
═══════════════════════════════════════════════════ */
const _screens = {};
let _currentScreen = null;

function reg(id, fn) { _screens[id] = fn; }

function go(id, data) {
  if (!_screens[id]) { console.warn('No screen:', id); return; }
  _currentScreen = id;
  const nav = document.getElementById('nav');
  if (nav) nav.style.display = ['welcome','onboard'].includes(id) ? 'none' : '';
  document.querySelectorAll('.nb').forEach(b => b.classList.remove('on'));
  const nb = document.getElementById('nb-' + id);
  if (nb) nb.classList.add('on');
  const v = document.getElementById('view');
  if (!v) return;
  v.scrollTop = 0;
  const div = document.createElement('div');
  div.className = 'screen';
  const html = _screens[id](data);
  div.innerHTML = html || '';
  v.innerHTML = '';
  v.appendChild(div);
}
window.go = go;

/* ═══════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════ */
let _toastTimer = null;
function toast(msg, type, dur) {
  type = type || 'ok';
  dur = dur || 3000;
  const t = document.getElementById('toast');
  if (!t) return;
  const icons = { ok:'✅', warn:'⚠️', err:'❌', info:'ℹ️', pr:'🏆', achieve:'🎖️' };
  t.innerHTML = '<span class="toast-icon">' + (icons[type]||'✅') + '</span><span class="toast-msg">' + esc(msg) + '</span>';
  t.className = 'toast show type-' + type;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { t.className = 'toast'; }, dur);
}
window.toast = toast;

/* ═══════════════════════════════════════════════════
   HAPTICS
═══════════════════════════════════════════════════ */
function haptic(p) { if (navigator.vibrate) navigator.vibrate(p || 30); }
window.haptic = haptic;

/* ═══════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════ */
function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
window.esc = esc;

function isoNow() { return new Date().toISOString(); }
function today() { return new Date().toISOString().slice(0,10); }
function fmtDate(d) { return new Date(d).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'}); }
function fmtTime(mins) { return mins < 60 ? mins + 'm' : Math.floor(mins/60) + 'h ' + (mins%60) + 'm'; }
function daysAgo(d) { return Math.floor((Date.now() - new Date(d)) / 864e5); }
window.isoNow = isoNow; window.today = today; window.fmtDate = fmtDate; window.fmtTime = fmtTime; window.daysAgo = daysAgo;

/* ═══════════════════════════════════════════════════
   SVG HELPERS
═══════════════════════════════════════════════════ */
function svgCheck() {
  return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>';
}

function ringHTML(pct, size, stroke, color, label) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * Math.min(Math.max(pct, 0), 100) / 100;
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" style="transform:rotate(-90deg)">' +
    '<circle cx="' + size/2 + '" cy="' + size/2 + '" r="' + r + '" fill="none" stroke="var(--bg4)" stroke-width="' + stroke + '"/>' +
    '<circle cx="' + size/2 + '" cy="' + size/2 + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + stroke + '" stroke-linecap="round" stroke-dasharray="' + circ + '" stroke-dashoffset="' + (circ - dash) + '"/>' +
    '</svg>' +
    (label ? '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;transform:rotate(90deg)">' + label + '</div>' : '');
}
window.ringHTML = ringHTML; window.svgCheck = svgCheck;

/* ═══════════════════════════════════════════════════
   UI BUILDERS
═══════════════════════════════════════════════════ */
function topbar(title, sub, rightHTML) {
  return '<div class="topbar"><div><div class="topbar-title">' + esc(title) + '</div>' +
    (sub ? '<div class="topbar-sub">' + esc(sub) + '</div>' : '') +
    '</div>' + (rightHTML ? '<div class="topbar-right">' + rightHTML + '</div>' : '') + '</div>';
}

function sh(title, action, onclick) {
  return '<div class="sh"><div class="sh-t">' + esc(title) + '</div>' +
    (action ? '<div class="sh-s" onclick="' + onclick + '">' + esc(action) + '</div>' : '') + '</div>';
}

function emptyState(icon, title, sub, btnLabel, btnOnclick) {
  return '<div class="empty"><div class="empty-icon">' + icon + '</div>' +
    '<div class="empty-t">' + esc(title) + '</div>' +
    '<div class="empty-s">' + esc(sub) + '</div>' +
    (btnLabel ? '<button class="btn btn-s btn-sm" onclick="' + btnOnclick + '">' + esc(btnLabel) + '</button>' : '') +
    '</div>';
}

function modal(title, body, footer) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';
  overlay.onclick = function(e) { if (e.target === overlay) closeModal(); };
  overlay.innerHTML = '<div class="modal-sheet"><div class="modal-handle"></div>' +
    '<div class="modal-title">' + esc(title) + '</div>' +
    body + (footer || '') + '</div>';
  document.body.appendChild(overlay);
}

function closeModal() {
  const m = document.getElementById('modal-overlay');
  if (m) m.remove();
}
window.topbar = topbar; window.sh = sh; window.emptyState = emptyState;
window.modal = modal; window.closeModal = closeModal;

/* ═══════════════════════════════════════════════════
   ENGINE 1 — READINESS SCORER
═══════════════════════════════════════════════════ */
const ReadinessEngine = {
  score() {
    const r = S.g('recovery') || {};
    const ws = S.g('workouts') || [];
    let score = 100;
    const sleep = r.sleep || 7.5;
    if (sleep < 5) score -= 35;
    else if (sleep < 6) score -= 20;
    else if (sleep < 7) score -= 10;
    else if (sleep >= 8) score += 5;
    score -= (r.soreness || 3) * 4;
    score -= (r.stress || 4) * 2.5;
    score += ((r.energy || 7) - 5) * 3;
    if ((r.hydration || 2.5) < 1.5) score -= 8;
    const recentDays = ws.filter(w => daysAgo(w.date) < 3).length;
    if (recentDays >= 3) score -= 15;
    const streak = StreakEngine.get();
    if (streak >= 5) score -= 10;
    return Math.max(0, Math.min(100, Math.round(score)));
  },
  label(s) {
    if (s >= 85) return { l:'Peak', c:'var(--c3)', bg:'rgba(0,255,136,.1)' };
    if (s >= 70) return { l:'Ready', c:'var(--c1)', bg:'rgba(0,213,255,.1)' };
    if (s >= 50) return { l:'Moderate', c:'var(--c5)', bg:'rgba(255,179,71,.1)' };
    return { l:'Rest Day', c:'var(--c4)', bg:'rgba(255,107,107,.1)' };
  },
  message(s) {
    if (s >= 85) return 'All systems optimal. Today is your day to chase PRs and push hard. Your recovery is exceptional.';
    if (s >= 70) return 'You are ready to train. Stick to your planned weights and listen to your body during working sets.';
    if (s >= 50) return 'Moderate readiness. Consider reducing intensity 10-15% and focusing on quality over quantity.';
    return 'Recovery is low. A rest day or light mobility session would serve you better than hard training today.';
  }
};
window.ReadinessEngine = ReadinessEngine;

/* ═══════════════════════════════════════════════════
   ENGINE 2 — MUSCLE RECOVERY ENGINE
═══════════════════════════════════════════════════ */
const MuscleEngine = {
  status() {
    const ws = S.g('workouts') || [];
    const groups = { Chest:null, Back:null, Shoulders:null, Legs:null, Arms:null, Core:null, Glutes:null };
    const now = Date.now();
    ws.slice(-20).forEach(wo => {
      const hrs = (now - new Date(wo.date)) / 36e5;
      (wo.exercises || []).forEach(ex => {
        const e = (typeof ExDB !== 'undefined') ? ExDB.byName(ex.name) : {};
        const pri = (e && e.pri) ? e.pri.toLowerCase() : '';
        const sec = (e && e.sec) ? e.sec.toLowerCase() : '';
        const all = pri + ' ' + sec;
        const upd = (key, test) => { if (test.test(all)) groups[key] = Math.min(groups[key] || 999, hrs); };
        upd('Chest', /chest/); upd('Back', /back|lat|trap|rhom/); upd('Shoulders', /delt|shoulder/);
        upd('Legs', /quad|hamstring|calf|leg/); upd('Arms', /bicep|tricep|arm|forearm/);
        upd('Core', /core|ab|oblique/); upd('Glutes', /glute|hip|butt/);
      });
    });
    return Object.entries(groups).map(([name, hrs]) => {
      if (!hrs || hrs === 999) return { name, status:'fresh', label:'Ready', pct:100, hrs:null };
      if (hrs < 24) return { name, status:'tired', label:'Recovering', pct:Math.round(hrs/48*100), hrs };
      if (hrs < 48) return { name, status:'moderate', label:'Moderate', pct:Math.round(hrs/48*100), hrs };
      return { name, status:'fresh', label:'Ready', pct:100, hrs };
    });
  },
  injuryWarning(exerciseName) {
    const injuries = S.g('injuries') || [];
    const active = injuries.filter(i => !i.recovered);
    if (!active.length) return null;
    const ex = (typeof ExDB !== 'undefined') ? ExDB.byName(exerciseName) : null;
    if (!ex || !ex.joint) return null;
    const warnings = [];
    active.forEach(inj => {
      const j = ex.joint;
      if (/shoulder/i.test(inj.bodyPart) && (j.shoulder || 0) >= 2) warnings.push(inj.bodyPart);
      if (/knee/i.test(inj.bodyPart) && (j.knee || 0) >= 2) warnings.push(inj.bodyPart);
      if (/back/i.test(inj.bodyPart) && (j.spine || 0) >= 2) warnings.push(inj.bodyPart);
      if (/elbow/i.test(inj.bodyPart) && (j.elbow || 0) >= 2) warnings.push(inj.bodyPart);
      if (/hip/i.test(inj.bodyPart) && (j.hip || 0) >= 2) warnings.push(inj.bodyPart);
    });
    return warnings.length ? warnings[0] : null;
  }
};
window.MuscleEngine = MuscleEngine;

/* ═══════════════════════════════════════════════════
   ENGINE 3 — STREAK ENGINE
═══════════════════════════════════════════════════ */
const StreakEngine = {
  get() {
    const ws = S.g('workouts') || [];
    if (!ws.length) return 0;
    const dates = [...new Set(ws.map(w => w.date.slice(0,10)))].sort().reverse();
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < dates.length; i++) {
      const diff = Math.round((now - new Date(dates[i])) / 864e5);
      if (diff === i || diff === i + 1) streak++;
      else break;
    }
    return streak;
  },
  weekWorkouts() {
    const ws = S.g('workouts') || [];
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 7);
    return ws.filter(w => new Date(w.date) > cutoff);
  },
  totalVolume() {
    return (S.g('workouts') || []).reduce((a, w) => a + (w.totalVol || 0), 0);
  },
  weekVolume() {
    return this.weekWorkouts().reduce((a, w) => a + (w.totalVol || 0), 0);
  }
};
window.StreakEngine = StreakEngine;

/* ═══════════════════════════════════════════════════
   ENGINE 4 — PROGRESSION ENGINE
═══════════════════════════════════════════════════ */
const ProgEngine = {
  epley(w, r) { return r === 1 ? w : Math.round(w * (1 + r / 30)); },
  checkPR(exName, weight, reps) {
    const ws = S.g('workouts') || [];
    let best = 0;
    ws.forEach(wo => (wo.exercises || []).forEach(ex => {
      if (ex.name === exName) (ex.sets || []).forEach(s => {
        if (s.done) best = Math.max(best, this.epley(s.weight || 0, s.reps || 0));
      });
    }));
    return this.epley(weight, reps) > best && best > 0;
  },
  savePR(exName, weight, reps, date) {
    const prs = S.g('prs') || [];
    const existing = prs.findIndex(p => p.exercise === exName);
    const entry = { exercise: exName, weight, reps, e1rm: this.epley(weight, reps), date };
    if (existing >= 0) prs[existing] = entry;
    else prs.push(entry);
    S.set('prs', prs);
  },
  suggest(exName, goal) {
    const ws = S.g('workouts') || [];
    for (let i = ws.length - 1; i >= 0; i--) {
      const ex = (ws[i].exercises || []).find(e => e.name === exName);
      if (ex) {
        const allDone = (ex.sets || []).every(s => s.done);
        const lastWeight = (ex.sets && ex.sets[0]) ? (ex.sets[0].weight || 0) : 0;
        if (allDone) {
          const inc = goal === 'strength' ? 2.5 : 1.25;
          return parseFloat((lastWeight + inc).toFixed(2));
        }
        return lastWeight;
      }
    }
    return null;
  },
  prevString(exName) {
    const ws = S.g('workouts') || [];
    for (let i = ws.length - 1; i >= 0; i--) {
      const ex = (ws[i].exercises || []).find(e => e.name === exName);
      if (ex && ex.sets && ex.sets.length) {
        const s = ex.sets[0];
        const u = (S.g('user.units') === 'imperial') ? 'lb' : 'kg';
        return 'Last: ' + (s.weight || 0) + u + ' × ' + (s.reps || 0) + ' reps';
      }
    }
    return null;
  }
};
window.ProgEngine = ProgEngine;

/* ═══════════════════════════════════════════════════
   ENGINE 5 — AI COACH ENGINE
═══════════════════════════════════════════════════ */
const CoachEngine = {
  insights() {
    const r = S.g('recovery') || {};
    const score = ReadinessEngine.score();
    const streak = StreakEngine.get();
    const ws = S.g('workouts') || [];
    const weekWkts = StreakEngine.weekWorkouts();
    const weeklyGoal = S.g('user.weeklyGoal') || 4;
    const msgs = [];
    if ((r.sleep || 7.5) < 6) msgs.push({t:'Critical Sleep Debt',m:'Under 6 hours seriously impairs muscle protein synthesis and performance. Prioritise 8+ hours tonight.',i:'😴',c:'var(--c4)'});
    else if ((r.sleep || 7.5) >= 8) msgs.push({t:'Optimal Recovery',m:'8+ hours logged. Sleep is your most powerful performance enhancer and you are maximising it.',i:'⚡',c:'var(--c3)'});
    if ((r.soreness || 3) >= 7) msgs.push({t:'High Soreness Alert',m:'Significant soreness detected. Target fresh muscle groups today or reduce volume by 25%.',i:'💊',c:'var(--c5)'});
    if (score >= 85) msgs.push({t:'Peak Performance Window',m:'Every metric is optimal. This is the day to attempt PRs and push your working weights.',i:'🔥',c:'var(--c3)'});
    if (streak >= 5) msgs.push({t:'Deload Signal',m: streak + ' consecutive training days detected. Schedule a deload week — reduced volume, same frequency.',i:'⚠️',c:'var(--c5)'});
    const remaining = weeklyGoal - weekWkts.length;
    if (remaining > 0 && remaining <= 2) msgs.push({t:'Weekly Goal In Reach',m: weekWkts.length + '/' + weeklyGoal + ' workouts done. ' + remaining + ' more to hit your weekly target.',i:'🎯',c:'var(--c1)'});
    if ((r.hydration || 2.5) < 1.5) msgs.push({t:'Hydration Critical',m:'Low water intake detected. Dehydration reduces strength by up to 20%. Drink 500ml now.',i:'💧',c:'var(--c1)'});
    if (ws.length > 0) {
      const daysSince = Math.floor((Date.now() - new Date(ws[ws.length-1].date)) / 864e5);
      if (daysSince >= 3) msgs.push({t:'Return to Training',m: daysSince + ' days since your last session. Momentum is everything — even a 30-minute workout counts.',i:'💪',c:'var(--c2)'});
    }
    if (!msgs.length) msgs.push({t:'Looking Strong',m:'Recovery metrics are solid. Execute your plan, track your sets, and keep the streak alive.',i:'✅',c:'var(--c1)'});
    return msgs.slice(0, 4);
  },
  weeklyInsights() {
    const ws = S.g('workouts') || [];
    if (ws.length < 3) return [];
    const msgs = [];
    const thisWeek = StreakEngine.weekVolume();
    const lastWeek = ws.filter(w => { const d = daysAgo(w.date); return d >= 7 && d < 14; }).reduce((a, w) => a + (w.totalVol || 0), 0);
    if (lastWeek > 0) {
      const change = Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
      if (change > 10) msgs.push('Volume up ' + change + '% vs last week 📈');
      else if (change < -10) msgs.push('Volume down ' + Math.abs(change) + '% vs last week — check recovery');
    }
    const prExercises = {};
    ws.forEach(w => (w.exercises || []).forEach(ex => {
      if (ex.prCount > 0) prExercises[ex.name] = (prExercises[ex.name] || 0) + ex.prCount;
    }));
    const topEx = Object.entries(prExercises).sort((a,b) => b[1] - a[1])[0];
    if (topEx) msgs.push(topEx[0] + ' is your strongest lift — ' + topEx[1] + ' PRs set');
    return msgs;
  }
};
window.CoachEngine = CoachEngine;

/* ═══════════════════════════════════════════════════
   ACHIEVEMENTS ENGINE
═══════════════════════════════════════════════════ */
const AchEngine = {
  all: [
    {id:'first_workout',n:'First Rep',d:'Complete your first workout',i:'🎯'},
    {id:'streak_3',n:'Hat Trick',d:'3-day workout streak',i:'🔥'},
    {id:'streak_7',n:'Week Warrior',d:'7-day streak',i:'⚡'},
    {id:'streak_14',n:'Fortnight Fighter',d:'14-day streak',i:'💥'},
    {id:'streak_30',n:'Iron Will',d:'30-day streak',i:'🏆'},
    {id:'workouts_10',n:'Getting Consistent',d:'10 workouts completed',i:'💪'},
    {id:'workouts_50',n:'Dedicated',d:'50 workouts completed',i:'🥇'},
    {id:'workouts_100',n:'Century Club',d:'100 workouts completed',i:'👑'},
    {id:'pr_first',n:'Record Breaker',d:'Set your first PR',i:'🏅'},
    {id:'pr_10',n:'PR Machine',d:'10 PRs set',i:'🎖️'},
    {id:'vol_100k',n:'Volume King',d:'100,000kg total lifted',i:'🦁'},
    {id:'early_bird',n:'Early Bird',d:'Workout before 7am',i:'🌅'},
    {id:'night_owl',n:'Night Owl',d:'Workout after 9pm',i:'🦉'},
  ],
  check() {
    const earned = S.g('achievements') || [];
    const ws = S.g('workouts') || [];
    const prs = S.g('prs') || [];
    const streak = StreakEngine.get();
    const checks = {
      first_workout: ws.length >= 1,
      streak_3: streak >= 3, streak_7: streak >= 7, streak_14: streak >= 14, streak_30: streak >= 30,
      workouts_10: ws.length >= 10, workouts_50: ws.length >= 50, workouts_100: ws.length >= 100,
      pr_first: prs.length >= 1, pr_10: prs.length >= 10,
      vol_100k: StreakEngine.totalVolume() >= 100000,
      early_bird: ws.some(w => new Date(w.date).getHours() < 7),
      night_owl: ws.some(w => new Date(w.date).getHours() >= 21),
    };
    let newEarned = false;
    this.all.forEach(a => {
      if (!earned.includes(a.id) && checks[a.id]) {
        earned.push(a.id);
        newEarned = true;
        setTimeout(() => toast('Achievement: ' + a.n + '!', 'achieve', 5000), 800);
      }
    });
    if (newEarned) S.set('achievements', earned);
  }
};
window.AchEngine = AchEngine;

/* ═══════════════════════════════════════════════════
   TDEE CALCULATOR
═══════════════════════════════════════════════════ */
function calcTDEE(user) {
  const w = user.weight || 75, h = user.height || 175, a = user.age || 25, g = user.gender || 'male';
  const bmr = g === 'male' ? (10*w) + (6.25*h) - (5*a) + 5 : (10*w) + (6.25*h) - (5*a) - 161;
  const mult = { sedentary:1.2, light:1.375, moderate:1.55, active:1.725, veryActive:1.9 };
  return Math.round(bmr * (mult[user.activityLevel || 'moderate'] || 1.55));
}
window.calcTDEE = calcTDEE;

/* ═══════════════════════════════════════════════════
   NAV BUILDER
═══════════════════════════════════════════════════ */
const NAV_META = {
  dashboard: { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>', label: 'Home' },
  workouts: { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="5.5" cy="12" r="2.5"/><circle cx="18.5" cy="12" r="2.5"/><line x1="8" y1="12" x2="16" y2="12"/><circle cx="5.5" cy="7" r="1.5"/><circle cx="5.5" cy="17" r="1.5"/><circle cx="18.5" cy="7" r="1.5"/><circle cx="18.5" cy="17" r="1.5"/></svg>', label: 'Workout' },
  progress: { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>', label: 'Progress' },
  ai: { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a6 6 0 016 6v4a6 6 0 01-12 0V8a6 6 0 016-6z"/><path d="M8 21h8M12 17v4"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/></svg>', label: 'AI Coach' },
  settings: { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>', label: 'Settings' },
  bodystats: { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v4m-4 2l4-2 4 2m-8 0l-2 6m10-6l2 6M8 13l-1 6m10-6l1 6"/></svg>', label: 'Body' },
  cardio: { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>', label: 'Cardio' },
  nutrition: { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M12 6v6l4 2"/></svg>', label: 'Nutrition' },
  injuries: { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>', label: 'Injuries' },
  recovery: { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>', label: 'Recovery' }
};

function buildNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const tabs = S.g('nav.tabs') || ['dashboard','workouts','progress','ai','settings'];
  nav.innerHTML = tabs.map(id => {
    const m = NAV_META[id] || NAV_META.dashboard;
    return '<button class="nb" id="nb-' + id + '" onclick="go(\'' + id + '\')">' +
      m.icon + '<span>' + m.label + '</span></button>';
  }).join('');
}
window.buildNav = buildNav;
window.NAV_META = NAV_META;
