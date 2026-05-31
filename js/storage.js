'use strict';

const S = {
  _k: 'fos_v3',
  d: {
    onboarded: false,
    user: {
      name: '', age: 25, gender: 'male', height: 175, weight: 75,
      goalWeight: 70, units: 'metric', distanceUnit: 'km',
      goal: 'hypertrophy', exp: 'intermediate',
      equipment: ['barbell','dumbbell','cables','machine','bar'],
      split: 'ppl', splitDay: 1, weeklyGoal: 4, theme: 'electric',
      calorieTarget: 2000, proteinTarget: 150, carbTarget: 200, fatTarget: 65,
      waterTarget: 8, restSecs: 90, notifications: true,
      activityLevel: 'moderate', injuries: []
    },
    nav: { tabs: ['dashboard','workouts','progress','ai','settings'] },
    workouts: [],
    bodyStats: [],
    cardio: [],
    meals: [],
    water: [],
    prs: [],
    templates: [],
    recovery: { sleep: 7.5, soreness: 3, stress: 4, energy: 7, hydration: 2.5, date: '' },
    injuries: [],
    achievements: [],
    prefs: { restTimer: true, showRPE: true, autoProgress: true }
  },
  init() {
    try {
      const s = localStorage.getItem(this._k);
      if (s) this.d = Object.assign({}, this.d, JSON.parse(s));
    } catch(e) {}
  },
  save() {
    try { localStorage.setItem(this._k, JSON.stringify(this.d)); } catch(e) {}
  },
  g(key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), this.d);
  },
  set(key, val) {
    const ks = key.split('.');
    let o = this.d;
    ks.slice(0, -1).forEach(k => { if (!o[k]) o[k] = {}; o = o[k]; });
    o[ks[ks.length - 1]] = val;
    this.save();
  }
};
