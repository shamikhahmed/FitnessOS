'use strict';

const Storage = (function () {
  const DB_NAME = 'fitnessos_v2';
  const DB_VERSION = 1;
  const STORES = ['user', 'workouts', 'bodyStats', 'meals', 'water', 'cardio', 'prs', 'templates'];

  let _db = null;

  function openDB() {
    return new Promise(function (resolve, reject) {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function (e) {
        const db = e.target.result;
        STORES.forEach(function (name) {
          if (!db.objectStoreNames.contains(name)) {
            db.createObjectStore(name, { keyPath: 'id', autoIncrement: true });
          }
        });
      };
      req.onsuccess = function (e) { resolve(e.target.result); };
      req.onerror = function (e) { reject(e.target.error); };
    });
  }

  async function getDB() {
    if (!_db) _db = await openDB();
    return _db;
  }

  function txGet(store, id) {
    return new Promise(async function (resolve, reject) {
      const db = await getDB();
      const t = db.transaction(store, 'readonly');
      const req = t.objectStore(store).get(id);
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  function txPut(store, data) {
    return new Promise(async function (resolve, reject) {
      const db = await getDB();
      const t = db.transaction(store, 'readwrite');
      const req = t.objectStore(store).put(data);
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  function txGetAll(store) {
    return new Promise(async function (resolve, reject) {
      const db = await getDB();
      const t = db.transaction(store, 'readonly');
      const req = t.objectStore(store).getAll();
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  function txDelete(store, id) {
    return new Promise(async function (resolve, reject) {
      const db = await getDB();
      const t = db.transaction(store, 'readwrite');
      const req = t.objectStore(store).delete(id);
      req.onsuccess = function () { resolve(); };
      req.onerror = function () { reject(req.error); };
    });
  }

  function txClear(store) {
    return new Promise(async function (resolve, reject) {
      const db = await getDB();
      const t = db.transaction(store, 'readwrite');
      const req = t.objectStore(store).clear();
      req.onsuccess = function () { resolve(); };
      req.onerror = function () { reject(req.error); };
    });
  }

  const DEFAULT_USER = {
    id: 1,
    name: '',
    age: 25,
    gender: 'male',
    weight: 75,
    height: 175,
    goalWeight: 70,
    activityLevel: 'moderate',
    goal: 'hypertrophy',
    exp: 'intermediate',
    units: 'metric',
    distanceUnit: 'km',
    calorieTarget: 2500,
    proteinTarget: 180,
    carbTarget: 270,
    fatTarget: 80,
    waterTarget: 8,
    weeklyGoal: 4,
    theme: 'dark',
    restTimer: true,
    restSecs: 90,
    split: 'ppl',
    splitDay: 1,
    onboarded: false
  };

  const pub = {
    init: async function () { _db = await openDB(); },

    get: txGet,
    set: txPut,
    getAll: txGetAll,
    delete: txDelete,
    clear: txClear,

    getUser: async function () {
      const u = await txGet('user', 1);
      return Object.assign({}, DEFAULT_USER, u || {});
    },

    setUser: function (data) {
      return txPut('user', Object.assign({}, data, { id: 1 }));
    },

    getTodayMeals: async function () {
      const all = await txGetAll('meals');
      const today = new Date().toISOString().slice(0, 10);
      return all.filter(function (m) { return m.date && m.date.startsWith(today); });
    },

    getTodayWaterAmount: async function () {
      const all = await txGetAll('water');
      const today = new Date().toISOString().slice(0, 10);
      return all
        .filter(function (w) { return w.date && w.date.startsWith(today); })
        .reduce(function (a, w) { return a + (w.amount || 0); }, 0);
    },

    getWeekWorkouts: async function () {
      const all = await txGetAll('workouts');
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 7);
      return all.filter(function (w) { return w.date && new Date(w.date) > cutoff; });
    },

    getLatestBodyStat: async function () {
      const all = await txGetAll('bodyStats');
      if (!all.length) return null;
      return all.sort(function (a, b) { return new Date(b.date) - new Date(a.date); })[0];
    },

    getStreak: async function () {
      const all = await txGetAll('workouts');
      if (!all.length) return 0;
      const now = new Date();
      const dates = [...new Set(all.map(function (w) { return w.date.slice(0, 10); }))].sort().reverse();
      let streak = 0;
      for (let i = 0; i < dates.length; i++) {
        const diff = Math.round((now - new Date(dates[i])) / 864e5);
        if (diff === i || diff === i + 1) streak++;
        else break;
      }
      return streak;
    },

    clearAllData: async function () {
      for (const store of STORES) {
        await txClear(store);
      }
    },

    exportAll: async function () {
      const result = {};
      for (const store of STORES) {
        result[store] = await txGetAll(store);
      }
      return result;
    },

    importAll: async function (data) {
      for (const store of STORES) {
        if (data[store] && Array.isArray(data[store])) {
          await txClear(store);
          for (const item of data[store]) {
            await txPut(store, item);
          }
        }
      }
    }
  };

  return pub;
})();
