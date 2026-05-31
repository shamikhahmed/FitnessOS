'use strict';

reg('nutrition', function() {
  const user = S.g('user') || {};
  const meals = S.g('meals') || [];
  const water = S.g('water') || [];
  const todayMeals = meals.filter(m => m.date === today());
  const todayWater = water.filter(w => w.date === today()).length;

  const calTarget = user.calorieTarget || 2000;
  const protTarget = user.proteinTarget || 150;
  const carbTarget = user.carbTarget || 200;
  const fatTarget = user.fatTarget || 65;
  const waterTarget = user.waterTarget || 8;

  const todayCals = todayMeals.reduce((a,m) => a+(m.calories||0), 0);
  const todayProt = todayMeals.reduce((a,m) => a+(m.protein||0), 0);
  const todayCarb = todayMeals.reduce((a,m) => a+(m.carbs||0), 0);
  const todayFat = todayMeals.reduce((a,m) => a+(m.fat||0), 0);

  const calPct = Math.min(Math.round((todayCals/calTarget)*100), 100);
  const calRemain = Math.max(0, calTarget - todayCals);

  // Donut chart
  const total = todayProt*4 + todayCarb*4 + todayFat*9 || 1;
  const protPct = Math.round(todayProt*4/total*100);
  const carbPct = Math.round(todayCarb*4/total*100);
  const fatPct = 100 - protPct - carbPct;
  function arc(startPct, endPct, color) {
    const r=60, circ=2*Math.PI*r;
    const start = circ*(startPct/100), len = circ*((endPct-startPct)/100);
    return '<circle cx="80" cy="80" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="16" stroke-linecap="butt" stroke-dasharray="' + len.toFixed(1) + ' ' + (circ-len).toFixed(1) + '" stroke-dashoffset="' + (-start).toFixed(1) + '" transform="rotate(-90 80 80)"/>';
  }
  const donut = '<div style="position:relative;width:160px;height:160px;margin:0 auto">' +
    '<svg viewBox="0 0 160 160" width="160" height="160">' +
    '<circle cx="80" cy="80" r="60" fill="none" stroke="var(--bg4)" stroke-width="16"/>' +
    (todayCals>0 ? arc(0, protPct, 'var(--c1)') + arc(protPct, protPct+carbPct, 'var(--c5)') + arc(protPct+carbPct, 100, 'var(--c4)') : '') +
    '</svg>' +
    '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">' +
    '<div style="font-size:26px;font-weight:900;font-variant-numeric:tabular-nums">' + todayCals + '</div>' +
    '<div style="font-size:11px;color:var(--txt3)">kcal</div>' +
    '</div></div>' +
    '<div style="display:flex;gap:16px;justify-content:center;margin-top:12px">' +
    '<div style="display:flex;align-items:center;gap:6px"><div style="width:10px;height:10px;border-radius:50%;background:var(--c1)"></div><span style="font-size:13px">Protein</span></div>' +
    '<div style="display:flex;align-items:center;gap:6px"><div style="width:10px;height:10px;border-radius:50%;background:var(--c5)"></div><span style="font-size:13px">Carbs</span></div>' +
    '<div style="display:flex;align-items:center;gap:6px"><div style="width:10px;height:10px;border-radius:50%;background:var(--c4)"></div><span style="font-size:13px">Fat</span></div>' +
    '</div>';

  // Macro bars
  function macroBar(name, val, target, color) {
    const pct = Math.min(Math.round((val/target)*100), 100);
    return '<div class="macro-bar-wrap">' +
      '<div class="macro-bar-label"><span class="macro-bar-name">' + name + '</span><span class="macro-bar-val">' + Math.round(val) + ' / ' + target + 'g</span></div>' +
      '<div class="macro-bar"><div class="macro-bar-fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
      '</div>';
  }

  // Water drops
  const drops = Array.from({length:waterTarget}, (_,i) =>
    '<div class="water-drop' + (i<todayWater?' filled':'') + '" onclick="toggleWater(' + i + ')">💧</div>'
  ).join('');

  // Meal sections
  const MEAL_TYPES = ['Breakfast','Lunch','Dinner','Snacks'];
  const mealSections = MEAL_TYPES.map(type => {
    const typeMeals = todayMeals.filter(m => m.type === type);
    const typeCals = typeMeals.reduce((a,m)=>a+(m.calories||0),0);
    return '<div style="margin-bottom:12px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)">' +
      '<div style="font-size:14px;font-weight:700">' + type + '</div>' +
      '<div style="display:flex;align-items:center;gap:8px">' +
      (typeCals ? '<span style="font-size:13px;color:var(--c1)">' + typeCals + ' kcal</span>' : '') +
      '<button class="btn btn-s btn-sm" style="padding:4px 10px;font-size:12px" onclick="openAddMeal(\'' + type + '\')">+ Add</button>' +
      '</div></div>' +
      (typeMeals.map(m =>
        '<div class="meal-row" style="padding:10px 0">' +
        '<div class="meal-info"><div class="meal-name">' + esc(m.name) + '</div>' +
        '<div class="meal-macros">P: ' + (m.protein||0) + 'g · C: ' + (m.carbs||0) + 'g · F: ' + (m.fat||0) + 'g</div></div>' +
        '<div class="meal-cal">' + (m.calories||0) + '</div>' +
        '</div>'
      ).join('') || '<div style="font-size:13px;color:var(--txt4);padding:8px 0">Nothing logged yet</div>') +
      '</div>';
  }).join('');

  // Last 7 days cals
  const last7 = Array.from({length:7}, (_,i) => {
    const d = new Date(); d.setDate(d.getDate()-6+i);
    const iso = d.toISOString().slice(0,10);
    const cal = meals.filter(m=>m.date===iso).reduce((a,m)=>a+(m.calories||0),0);
    return { iso, cal, label:['Su','Mo','Tu','We','Th','Fr','Sa'][d.getDay()] };
  });
  const maxCal = Math.max(...last7.map(d=>d.cal), calTarget*0.5, 1);
  const calBars = last7.map((d,i) =>
    '<div style="flex:1;text-align:center">' +
    '<div style="height:50px;display:flex;align-items:flex-end"><div style="width:100%;background:' + (i===6?'var(--c1)':'var(--bg4)') + ';border-radius:4px 4px 0 0;height:' + Math.max(Math.round((d.cal/maxCal)*50),d.cal?4:0) + 'px"></div></div>' +
    '<div style="font-size:10px;color:var(--txt3);margin-top:4px">' + d.label + '</div>' +
    '</div>'
  ).join('');

  return topbar('Nutrition', null, '<button class="topbar-icon" onclick="openAddMeal(\'Snacks\')">＋</button>') +

  sh('Today') +
  '<div class="card card-dark" style="margin:0 16px 14px">' +
  donut +
  '<div style="margin-top:16px">' +
  macroBar('Protein', todayProt, protTarget, 'var(--c1)') +
  macroBar('Carbs', todayCarb, carbTarget, 'var(--c5)') +
  macroBar('Fat', todayFat, fatTarget, 'var(--c4)') +
  '</div></div>' +

  sh('Water (' + todayWater + '/' + waterTarget + ' glasses)') +
  '<div class="card card-dark" style="margin:0 16px 14px">' +
  '<div class="water-grid">' + drops + '</div>' +
  '</div>' +

  sh('Meals Today') +
  '<div class="card card-dark" style="margin:0 16px 14px">' + mealSections + '</div>' +

  sh('7-Day Calories') +
  '<div class="card card-dark" style="margin:0 16px 14px">' +
  '<div style="display:flex;align-items:flex-end;height:60px;gap:6px">' + calBars + '</div>' +
  '<div style="font-size:11px;color:var(--txt3);text-align:center;margin-top:8px">Target: ' + calTarget + ' kcal/day</div>' +
  '</div>' +
  '<div style="height:8px"></div>';
});

function toggleWater(idx) {
  const water = S.g('water') || [];
  const todayEntries = water.filter(w => w.date === today());
  if (idx < todayEntries.length) {
    const lastIdx = water.lastIndexOf(todayEntries[todayEntries.length-1]);
    water.splice(lastIdx, 1);
  } else {
    water.push({ date: today(), time: isoNow() });
  }
  S.set('water', water);
  haptic(6);
  go('nutrition');
}
window.toggleWater = toggleWater;

function openAddMeal(type) {
  modal('Add ' + (type||'Meal'),
    '<div class="field-wrap"><label class="field-label">Food Name</label><input class="field" id="meal-name" type="text" placeholder="e.g. Chicken breast" autofocus></div>' +
    '<div class="field-row">' +
    '<div class="field-wrap"><label class="field-label">Calories</label><input class="field" id="meal-cal" type="number" min="0" placeholder="300" inputmode="numeric"></div>' +
    '<div class="field-wrap"><label class="field-label">Protein (g)</label><input class="field" id="meal-prot" type="number" min="0" placeholder="30" inputmode="numeric"></div>' +
    '</div>' +
    '<div class="field-row">' +
    '<div class="field-wrap"><label class="field-label">Carbs (g)</label><input class="field" id="meal-carb" type="number" min="0" placeholder="20" inputmode="numeric"></div>' +
    '<div class="field-wrap"><label class="field-label">Fat (g)</label><input class="field" id="meal-fat" type="number" min="0" placeholder="10" inputmode="numeric"></div>' +
    '</div>',
    '<button class="btn btn-p" onclick="saveMeal(\'' + (type||'Snacks') + '\')">Add</button>'
  );
}
window.openAddMeal = openAddMeal;

function saveMeal(type) {
  const name = document.getElementById('meal-name').value.trim();
  const cal = parseInt(document.getElementById('meal-cal').value)||0;
  if (!name) { toast('Enter food name', 'warn'); return; }
  const meals = S.g('meals') || [];
  meals.push({
    date: today(), time: isoNow(), type,
    name, calories: cal,
    protein: parseFloat(document.getElementById('meal-prot').value)||0,
    carbs: parseFloat(document.getElementById('meal-carb').value)||0,
    fat: parseFloat(document.getElementById('meal-fat').value)||0
  });
  S.set('meals', meals);
  closeModal();
  toast(name + ' added!', 'ok');
  haptic(30);
  go('nutrition');
}
window.saveMeal = saveMeal;
