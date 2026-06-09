'use strict';
/* Offline exercise library — one-time fetch from wger.de, cached in localStorage */

const ExerciseLibrary = (() => {
  const CACHE_KEY = 'exerciseLibrary.wger';
  const CACHE_VER = 1;
  const WGER_BASE = 'https://wger.de/api/v2';

  const CAT_GRP = {
    10: 'chest', 11: 'back', 12: 'legs', 13: 'shoulders',
    8: 'arms', 9: 'arms', 14: 'core', 15: 'cardio', 16: 'fullbody'
  };

  const EQ_MAP = {
    'barbell': 'barbell', 'dumbbell': 'dumbbell', 'kettlebell': 'kettlebell',
    'cable': 'cables', 'machine': 'machine', 'bench': 'machine',
    'pull-up bar': 'bar', 'resistance band': 'bands', 'gym mat': [],
    'none (bodyweight exercise)': [], 'sz barbell': 'barbell'
  };

  function _grpFromInfo(info) {
    const catId = info.category && info.category.id;
    if (catId && CAT_GRP[catId]) return CAT_GRP[catId];
    const m = (info.muscles && info.muscles[0] && info.muscles[0].name || '').toLowerCase();
    if (/chest|pectoral/.test(m)) return 'chest';
    if (/lat|back|trap|rhomboid/.test(m)) return 'back';
    if (/quad|hamstring|glute|calf|leg/.test(m)) return 'legs';
    if (/delt|shoulder/.test(m)) return 'shoulders';
    if (/bicep/.test(m)) return 'biceps';
    if (/tricep/.test(m)) return 'triceps';
    if (/ab|core|oblique/.test(m)) return 'core';
    return 'fullbody';
  }

  function _eqFromInfo(info) {
    const names = (info.equipment || []).map(e => (e.name || '').toLowerCase());
    const out = [];
    names.forEach(n => {
      Object.keys(EQ_MAP).forEach(k => {
        if (n.includes(k)) {
          const v = EQ_MAP[k];
          if (Array.isArray(v)) return;
          if (v && !out.includes(v)) out.push(v);
        }
      });
    });
    if (!names.length || names.some(n => n.includes('bodyweight'))) return [];
    return out.length ? out : ['dumbbell'];
  }

  function _toExDB(info) {
    const en = (info.translations || []).find(t => t.language === 2) ||
      (info.translations || []).find(t => t.language === 4) ||
      (info.translations || [])[0];
    if (!en || !en.name) return null;
    const grp = _grpFromInfo(info);
    const pri = (info.muscles && info.muscles[0] && info.muscles[0].name) || grp;
    const sec = (info.muscles_secondary || []).map(m => m.name).join(', ');
    const desc = (en.description || '').replace(/<[^>]+>/g, '').trim().slice(0, 280);
    return {
      n: en.name.trim(),
      em: grp === 'cardio' ? '🏃' : '🏋️',
      grp: grp,
      diff: 1,
      bw: !(info.equipment && info.equipment.length),
      eq: _eqFromInfo(info),
      pri: pri,
      sec: sec,
      cues: desc || 'Focus on controlled form through full range of motion.',
      setup: '',
      breathing: '',
      mistakes: '',
      joint: { shoulder: 1, elbow: 1, knee: 1, spine: 1, hip: 1 },
      cns: 1,
      muscles: { primary: [grp], secondary: [] },
      regressions: [],
      progressions: [],
      met: 4.0,
      tempoRec: '2-0-1-0',
      source: 'wger',
      wgerId: info.id
    };
  }

  function getCached() {
    const c = S.g(CACHE_KEY);
    if (!c || c.version !== CACHE_VER) return null;
    return c.exercises || [];
  }

  function mergeIntoExDB() {
    if (typeof ExDB === 'undefined') return 0;
    const cached = getCached() || [];
    let added = 0;
    cached.forEach(ex => {
      if (!ex || !ex.n) return;
      if (ExDB.byName(ex.n)) return;
      ExDB.db.push(ex);
      added++;
    });
    return added;
  }

  async function fetchAll(onProgress) {
    const existing = getCached();
    if (existing && existing.length > 0) return existing.length;
    if (!navigator.onLine) {
      if (existing && existing.length) return existing.length;
      throw new Error('Offline — connect once to download the library');
    }
    const all = [];
    let offset = 0;
    const limit = 50;
    let total = 0;

    while (true) {
      const url = WGER_BASE + '/exerciseinfo/?language=2&limit=' + limit + '&offset=' + offset;
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('wger API error ' + res.status);
      const data = await res.json();
      total = data.count || total;
      const batch = (data.results || []).map(_toExDB).filter(Boolean);
      all.push.apply(all, batch);
      if (onProgress) onProgress(all.length, total);
      if (!data.next) break;
      offset += limit;
      await new Promise(r => setTimeout(r, 120));
    }

    S.set(CACHE_KEY, { version: CACHE_VER, fetchedAt: Date.now(), count: all.length, exercises: all });
    return all.length;
  }

  async function sync(onProgress, force) {
    const cached = getCached();
    if (cached && cached.length > 0 && !force) {
      const added = mergeIntoExDB();
      return { fetched: cached.length, added: added, fromCache: true };
    }
    if (!navigator.onLine && cached && cached.length > 0) {
      const added = mergeIntoExDB();
      return { fetched: cached.length, added: added, fromCache: true };
    }
    const n = await fetchAll(onProgress);
    const added = mergeIntoExDB();
    return { fetched: n, added: added, fromCache: false };
  }

  function status() {
    const c = S.g(CACHE_KEY);
    if (!c) return { cached: false, count: 0, fetchedAt: null };
    return { cached: true, count: c.count || 0, fetchedAt: c.fetchedAt };
  }

  return { sync, mergeIntoExDB, getCached, status };
})();

window.ExerciseLibrary = ExerciseLibrary;

window.syncExerciseLibrary = async function() {
  const btn = document.getElementById('ex-lib-sync-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Downloading…'; }
  try {
    const r = await ExerciseLibrary.sync(function(done, total) {
      if (btn) btn.textContent = 'Downloading… ' + done + '/' + total;
    });
    toast(r.fromCache ? 'Library loaded from phone (' + r.fetched + ' exercises)' : 'Downloaded ' + r.fetched + ' exercises (' + r.added + ' new)', 'ok', 4000);
    if (btn) btn.textContent = '✓ Library synced';
  } catch (e) {
    toast(e.message || 'Sync failed', 'err');
    if (btn) { btn.disabled = false; btn.textContent = '↻ Download Exercise Library'; }
  }
};
