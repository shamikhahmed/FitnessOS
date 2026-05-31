'use strict';
const S = {
  _k: 'fos_v4',
  d: {
    onboarded: false,
    user: {
      name:'', age:25, gender:'male', height:175, weight:75,
      goalWeight:70, targetBodyFat:15,
      units:'metric', heightUnit:'cm', weightUnit:'kg',
      goal:'hypertrophy', exp:'intermediate',
      split:'ppl', splitDay:1, weeklyGoal:4,
      theme:'carbon', coachPersonality:'maya',
      calorieTarget:2200, proteinTarget:165, carbTarget:220, fatTarget:70,
      waterTarget:8, restSecs:120,
      activityLevel:'moderate',
      equipment:['barbell','dumbbell','cables','machine','bar'],
      gymBrands:[], preferredMachines:[],
      injuries:[], weakPoints:[],
      joinDate:null, gymDays:['mon','wed','fri'],
      autoProgression:true, deloadReminder:true,
      warmupEnabled:true, cardioEnabled:true,
      suppReminders:true, streakAlerts:true,
      caffeineWarning:true, restDayReminders:true
    },
    nav:{ tabs:['dashboard','workout','bodymap','coach','settings'] },
    workouts:[], bodyStats:[], supplements:[], supplementLogs:[],
    water:[], meals:[], cardio:[], prs:[], templates:[], injuries:[],
    recovery:{ sleep:7.5, soreness:3, stress:4, energy:7, hydration:2.5, date:'' },
    achievements:[], notes:[], measurements:[]
  },
  init() {
    try {
      const s = localStorage.getItem(this._k);
      if (s) { const p = JSON.parse(s); this.d = this._merge(this.d, p); }
    } catch(e) { console.warn('S.init', e); }
  },
  _merge(def, saved) {
    const out = Object.assign({}, def);
    for (const k in saved) {
      if (saved[k] !== null && typeof saved[k] === 'object' && !Array.isArray(saved[k])
        && typeof def[k] === 'object' && def[k] !== null && !Array.isArray(def[k])) {
        out[k] = this._merge(def[k], saved[k]);
      } else { out[k] = saved[k]; }
    }
    return out;
  },
  save() {
    try { localStorage.setItem(this._k, JSON.stringify(this.d)); } catch(e) { console.warn('S.save', e); }
  },
  g(key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), this.d);
  },
  set(key, val) {
    const ks = key.split('.');
    let o = this.d;
    ks.slice(0, -1).forEach(k => { if (!o[k] || typeof o[k] !== 'object') o[k] = {}; o = o[k]; });
    o[ks[ks.length - 1]] = val;
    this.save();
  },
  push(key, item) {
    const arr = this.g(key) || [];
    arr.push(item);
    this.set(key, arr);
    return arr;
  },
  reset() {
    try { localStorage.removeItem(this._k); } catch(e) {}
    location.reload();
  }
};
