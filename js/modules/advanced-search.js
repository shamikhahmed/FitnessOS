'use strict';
/* ── FitnessOS — Advanced Offline Search Engine ── */

const FitnessSearch = {

  fuzzyMatch(str, query) {
    if (!str || !query) return false;
    const s = str.toLowerCase();
    const q = query.toLowerCase();
    if (s.includes(q)) return true;
    if (q.length >= 4) {
      for (let i = 0; i < q.length; i++) {
        const variant = q.slice(0, i) + q.slice(i + 1);
        if (s.includes(variant)) return true;
      }
    }
    return false;
  },

  search(query) {
    if (!query || query.trim().length < 2) return [];
    const q = query.trim();
    const results = [];

    // 1. Exercise Knowledge Graph
    if (typeof EKG !== 'undefined') {
      EKG.all().forEach(name => {
        if (this.fuzzyMatch(name, q)) {
          const node = EKG.get(name);
          results.push({
            type: 'exercise', icon: '💪', title: name,
            sub: node ? 'Pattern: ' + node.pattern + ' · Fatigue: ' + node.fatigueScore + '/10' : 'Exercise',
            action: "go('workout')",
            tags: node ? [...(node.muscles.primary || []), node.pattern] : [],
            relevance: name.toLowerCase().startsWith(q.toLowerCase()) ? 3 : 2
          });
        }
      });
    }

    // 2. Muscle Anatomy
    if (typeof MUSCLE_DB !== 'undefined') {
      Object.values(MUSCLE_DB).forEach(m => {
        if (this.fuzzyMatch(m.name, q) || this.fuzzyMatch(m.region, q) || this.fuzzyMatch(m.group, q)) {
          results.push({
            type: 'muscle', icon: '🔬', title: m.name,
            sub: m.region + ' · ' + m.group,
            action: "go('anatomy')",
            tags: [m.region, m.group],
            relevance: 2
          });
        }
        if ((m.exercises || []).some(e => this.fuzzyMatch(e, q))) {
          results.push({
            type: 'muscle', icon: '🔬', title: m.name + ' (worked by ' + q + ')',
            sub: 'Anatomy · ' + m.region,
            action: "go('anatomy')",
            tags: [m.region],
            relevance: 1
          });
        }
      });
    }

    // 3. Injury Rehab
    if (typeof INJURY_DB !== 'undefined') {
      Object.values(INJURY_DB).forEach(inj => {
        if (this.fuzzyMatch(inj.name, q) || this.fuzzyMatch(inj.anatomy || '', q) || this.fuzzyMatch(inj.mechanism || '', q)) {
          results.push({
            type: 'rehab', icon: '🩹', title: inj.name,
            sub: 'Severity: ' + inj.severity + ' · Return: ' + inj.return_to_gym_weeks.typical + ' weeks',
            action: "go('rehab')",
            tags: ['injury', 'rehab', inj.severity],
            relevance: 2
          });
        }
      });
    }

    // 4. Mobility DB
    if (typeof MobilityDB !== 'undefined') {
      Object.values(MobilityDB).forEach(joint => {
        if (this.fuzzyMatch(joint.name, q) || joint.drills.some(d => this.fuzzyMatch(d.name, q))) {
          results.push({
            type: 'mobility', icon: '🦶', title: joint.name + ' Mobility',
            sub: joint.drills.length + ' drills · ' + joint.frequency,
            action: "go('encyclopedia',{section:'mobility'})",
            tags: ['mobility', 'flexibility'],
            relevance: 2
          });
        }
      });
    }

    // 5. Stretching DB
    if (typeof StretchDB !== 'undefined') {
      Object.values(StretchDB).forEach(group => {
        if (this.fuzzyMatch(group.name, q) || group.stretches.some(s => this.fuzzyMatch(s.name, q))) {
          results.push({
            type: 'stretch', icon: '🧘', title: group.name + ' Stretches',
            sub: group.stretches.length + ' stretches',
            action: "go('encyclopedia',{section:'stretching'})",
            tags: ['stretch', 'flexibility', 'cooldown'],
            relevance: 2
          });
        }
      });
    }

    // 6. Sports DB
    if (typeof SportsDB !== 'undefined') {
      Object.values(SportsDB).forEach(sport => {
        if (this.fuzzyMatch(sport.name, q) ||
            sport.key_demands.some(d => this.fuzzyMatch(d, q)) ||
            sport.strength_training.primary_lifts.some(l => this.fuzzyMatch(l, q))) {
          results.push({
            type: 'sport', icon: sport.icon, title: sport.name + ' Training',
            sub: sport.key_demands[0],
            action: "go('encyclopedia',{section:'sports'})",
            tags: ['sport', 'performance'],
            relevance: 2
          });
        }
      });
    }

    // 7. User workout history
    const ws = S.g('workouts') || [];
    const seenEx = new Set();
    ws.slice(-30).forEach(w => {
      (w.exercises || []).forEach(ex => {
        if (!seenEx.has(ex.name) && this.fuzzyMatch(ex.name || '', q)) {
          seenEx.add(ex.name);
          const best = (ex.sets || []).filter(s => s.done && s.weight > 0).reduce((m, s) => Math.max(m, s.weight || 0), 0);
          results.push({
            type: 'history', icon: '📋', title: ex.name,
            sub: 'In your history' + (best ? ' · Best: ' + best + 'kg' : ''),
            action: "go('progress')",
            tags: ['history', 'logged'],
            relevance: best ? 3 : 2
          });
        }
      });
    });

    // 8. Calisthenics skills
    if (typeof CALISTHENICS_SKILLS !== 'undefined') {
      (CALISTHENICS_SKILLS || []).forEach(skill => {
        if (this.fuzzyMatch(skill.name || '', q) || this.fuzzyMatch(skill.category || '', q)) {
          results.push({
            type: 'skill', icon: '🤸', title: skill.name,
            sub: 'Calisthenics · ' + (skill.category || ''),
            action: "go('calisthenics')",
            tags: ['calisthenics', 'skill'],
            relevance: 2
          });
        }
      });
    }

    // Deduplicate by title + type
    const seen = new Set();
    const unique = results.filter(r => {
      const key = r.type + ':' + r.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return unique.sort((a, b) => b.relevance - a.relevance).slice(0, 25);
  },

  searchExercises(query) { return this.search(query).filter(r => r.type === 'exercise'); },
  searchInjuries(query) { return this.search(query).filter(r => r.type === 'rehab'); },
  searchMobility(query) { return this.search(query).filter(r => r.type === 'mobility' || r.type === 'stretch'); }
};
window.FitnessSearch = FitnessSearch;

/* ══════════════════════════════════════════════════════
   ADVANCED SEARCH SCREEN
══════════════════════════════════════════════════════ */
reg('search', function(data) {
  const query = (data && data.q) || '';
  const results = query.length >= 2 ? FitnessSearch.search(query) : [];

  const TYPE_COLORS = {
    exercise: 'var(--c1)', muscle: '#af52de', rehab: '#ff453a',
    mobility: '#30d158', stretch: '#30d158', sport: '#f5c842',
    history: '#00c7ff', skill: '#ff9f0a'
  };

  const TYPE_LABELS = {
    exercise: '💪 Exercises', muscle: '🔬 Muscles', rehab: '🩹 Injury Rehab',
    mobility: '🦶 Mobility', stretch: '🧘 Stretching', sport: '⚽ Sports',
    history: '📋 Your History', skill: '🤸 Skills'
  };

  const grouped = {};
  results.forEach(r => {
    if (!grouped[r.type]) grouped[r.type] = [];
    grouped[r.type].push(r);
  });

  return '<div class="topbar"><div class="topbar-title">Search</div></div>' +

    '<div style="padding:14px 16px 8px;position:sticky;top:0;background:var(--bg);z-index:10">' +
    '<input id="fit-search" class="field" placeholder="🔍 Exercises, muscles, injuries, sports..." ' +
    'value="' + esc(query) + '" ' +
    'oninput="clearTimeout(window._st);window._st=setTimeout(()=>go(\'search\',{q:this.value}),300)" ' +
    'autofocus style="width:100%;box-sizing:border-box;font-size:15px">' +
    '</div>' +

    '<div style="display:flex;gap:8px;padding:0 16px 10px;overflow-x:auto;scrollbar-width:none">' +
    ['Chest','Shoulder','Legs','Back','Arms','Rehab','Mobility','Cricket','MMA'].map(tag =>
      '<button onclick="go(\'search\',{q:\'' + tag + '\'})" style="flex-shrink:0;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;touch-action:manipulation;border:1px solid var(--border);background:' + (query === tag ? 'var(--c1)' : 'var(--bg3)') + ';color:' + (query === tag ? '#fff' : 'var(--txt3)') + '">' + tag + '</button>'
    ).join('') +
    '</div>' +

    (query.length < 2
      ? '<div style="padding:40px 20px;text-align:center;color:var(--txt3)"><div style="font-size:48px;margin-bottom:12px">🔍</div><div style="font-size:15px;font-weight:700;color:var(--txt);margin-bottom:8px">Search Everything</div><div style="font-size:13px;line-height:1.7">Exercises · Muscles · Injuries<br>Mobility · Stretching · Sports</div></div>'

      : results.length === 0
        ? '<div style="padding:40px 20px;text-align:center;color:var(--txt3)"><div style="font-size:40px;margin-bottom:12px">😕</div><div style="font-size:15px">No results for "' + esc(query) + '"</div><div style="font-size:12px;margin-top:8px">Try: "shoulder pain", "chest", "cricket", "hamstring"</div></div>'

        : '<div style="font-size:12px;color:var(--txt3);padding:0 16px 10px">' + results.length + ' results for "' + esc(query) + '"</div>' +
          Object.entries(grouped).map(([type, items]) =>
            '<div style="margin-bottom:6px">' +
            '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:' + (TYPE_COLORS[type] || 'var(--txt3)') + ';padding:8px 16px 6px">' + (TYPE_LABELS[type] || type) + '</div>' +
            items.map(r =>
              '<div onclick="' + r.action + '" style="margin:0 16px 8px;background:var(--bg3);border:1px solid var(--border);border-radius:14px;padding:14px;cursor:pointer;touch-action:manipulation;display:flex;align-items:center;gap:12px">' +
              '<div style="font-size:26px;flex-shrink:0">' + r.icon + '</div>' +
              '<div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:700;color:var(--txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(r.title) + '</div>' +
              '<div style="font-size:11px;color:var(--txt3);margin-top:2px">' + esc(r.sub) + '</div></div>' +
              '<div style="font-size:16px;color:var(--txt3);flex-shrink:0">›</div>' +
              '</div>'
            ).join('') +
            '</div>'
          ).join('')
    ) +

    '<div style="height:20px"></div>';
});
