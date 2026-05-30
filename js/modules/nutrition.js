'use strict';

/* ════════════════════════════════════════
   FOOD DATABASE — 200+ items
   Format: [name, cal, protein, carbs, fat, serving, unit]
════════════════════════════════════════ */
const FOOD_DB = [
  ['Chicken Breast', 165, 31, 0, 3.6, 100, 'g'],
  ['Chicken Thigh', 209, 26, 0, 11, 100, 'g'],
  ['Chicken Drumstick', 172, 28, 0, 6, 100, 'g'],
  ['Turkey Breast', 157, 29, 0, 3.5, 100, 'g'],
  ['Beef Mince (lean)', 215, 26, 0, 12, 100, 'g'],
  ['Sirloin Steak', 207, 30, 0, 9, 100, 'g'],
  ['T-Bone Steak', 280, 26, 0, 18, 100, 'g'],
  ['Lamb Chops', 282, 25, 0, 20, 100, 'g'],
  ['Mutton (cooked)', 295, 24, 0, 22, 100, 'g'],
  ['Salmon', 208, 20, 0, 13, 100, 'g'],
  ['Tuna (canned)', 116, 25, 0, 1, 100, 'g'],
  ['Tuna Steak', 130, 29, 0, 1, 100, 'g'],
  ['Cod', 105, 23, 0, 1, 100, 'g'],
  ['Tilapia', 96, 20, 0, 2, 100, 'g'],
  ['Shrimp / Prawns', 99, 24, 0, 0.3, 100, 'g'],
  ['Whole Egg', 72, 6, 0.4, 5, 1, 'egg'],
  ['Egg White', 17, 4, 0.2, 0, 1, 'egg'],
  ['Greek Yogurt (0%)', 59, 10, 4, 0.4, 100, 'g'],
  ['Greek Yogurt (full fat)', 100, 9, 4, 5, 100, 'g'],
  ['Cottage Cheese', 98, 11, 3.4, 4.3, 100, 'g'],
  ['Whey Protein Shake', 130, 25, 4, 2, 35, 'g scoop'],
  ['Casein Protein', 110, 22, 4, 1, 30, 'g scoop'],
  ['Tofu (firm)', 76, 8, 2, 4.5, 100, 'g'],
  ['Tempeh', 193, 19, 9, 11, 100, 'g'],
  ['Edamame', 121, 11, 9, 5, 100, 'g'],
  ['Roti / Chapati', 120, 3.5, 25, 1, 1, 'medium'],
  ['Tandoori Roti', 150, 5, 30, 2, 1, 'piece'],
  ['Naan', 262, 8, 45, 5, 1, 'piece'],
  ['Peshwari Naan', 360, 9, 58, 11, 1, 'piece'],
  ['Paratha (plain)', 200, 4, 30, 8, 1, 'medium'],
  ['Paratha (aloo)', 260, 5, 38, 10, 1, 'medium'],
  ['Puri', 180, 3, 24, 8, 1, 'piece'],
  ['Biryani (chicken)', 450, 26, 55, 15, 250, 'g'],
  ['Biryani (mutton)', 520, 24, 55, 22, 250, 'g'],
  ['Biryani (beef)', 500, 25, 55, 20, 250, 'g'],
  ['Biryani (vegetable)', 360, 8, 62, 10, 250, 'g'],
  ['Daal Mash', 210, 14, 34, 4, 200, 'ml'],
  ['Daal Chana', 240, 13, 40, 4, 200, 'ml'],
  ['Daal Moong', 190, 14, 33, 1, 200, 'ml'],
  ['Daal Masoor', 220, 18, 40, 1, 200, 'ml'],
  ['Chana Masala', 270, 12, 45, 5, 250, 'g'],
  ['Rajma (kidney beans)', 250, 14, 40, 1, 200, 'g'],
  ['Karahi Chicken', 380, 35, 8, 22, 250, 'g'],
  ['Karahi Mutton', 440, 32, 8, 30, 250, 'g'],
  ['Haleem', 340, 24, 30, 14, 200, 'g'],
  ['Nihari', 420, 30, 15, 26, 250, 'g'],
  ['Paye (Trotters)', 380, 28, 5, 28, 200, 'g'],
  ['Seekh Kebab', 180, 18, 5, 10, 2, 'pieces'],
  ['Shami Kebab', 165, 12, 12, 8, 2, 'pieces'],
  ['Chapli Kebab', 220, 18, 8, 14, 1, 'piece'],
  ['Tikka Boti', 210, 30, 2, 9, 100, 'g'],
  ['Tandoori Chicken', 220, 36, 3, 8, 200, 'g'],
  ['Chicken Shawarma', 450, 30, 45, 15, 1, 'wrap'],
  ['Beef Shawarma', 510, 28, 45, 19, 1, 'wrap'],
  ['Chicken Korma', 380, 28, 10, 25, 250, 'g'],
  ['Mutton Korma', 430, 25, 10, 30, 250, 'g'],
  ['Aloo Gosht', 320, 22, 25, 14, 250, 'g'],
  ['Aloo (boiled)', 80, 2, 18, 0.1, 100, 'g'],
  ['Aloo Palak', 180, 6, 22, 8, 200, 'g'],
  ['Palak Chicken', 280, 28, 10, 15, 200, 'g'],
  ['Saag (mustard greens)', 120, 6, 12, 6, 200, 'g'],
  ['Kofta Curry', 370, 22, 12, 26, 250, 'g'],
  ['Samosa (veg)', 140, 4, 18, 6, 1, 'piece'],
  ['Samosa (meat)', 175, 8, 18, 8, 1, 'piece'],
  ['Pakora (veg)', 200, 6, 22, 10, 100, 'g'],
  ['Kheer', 300, 7, 50, 8, 200, 'ml'],
  ['Gajar Halwa', 250, 5, 40, 9, 100, 'g'],
  ['Gulab Jamun', 175, 4, 30, 5, 2, 'pieces'],
  ['Jalebi', 200, 2, 44, 4, 100, 'g'],
  ['Barfi / Mithai', 350, 7, 50, 14, 100, 'g'],
  ['Raita', 60, 3, 6, 2, 100, 'ml'],
  ['Dahi (yogurt)', 70, 4, 8, 2.5, 100, 'ml'],
  ['Lassi (sweet)', 180, 8, 28, 4, 300, 'ml'],
  ['Lassi (salty)', 120, 8, 12, 4, 300, 'ml'],
  ['Chai (milk and sugar)', 75, 3, 10, 3, 250, 'ml'],
  ['Khichdi', 250, 10, 45, 4, 200, 'g'],
  ['Zarda (sweet rice)', 280, 4, 58, 6, 100, 'g'],
  ['Pulao / Pilaf', 280, 8, 50, 7, 200, 'g'],
  ['Pani Puri', 60, 2, 9, 2, 6, 'pieces'],
  ['White Rice (cooked)', 205, 4, 45, 0.5, 200, 'g'],
  ['Brown Rice (cooked)', 215, 5, 45, 2, 200, 'g'],
  ['Basmati Rice (cooked)', 200, 4, 44, 0.5, 200, 'g'],
  ['Oats (dry)', 389, 17, 66, 7, 100, 'g'],
  ['Porridge (with water)', 71, 2.5, 12, 1.6, 200, 'ml'],
  ['White Bread', 79, 3, 15, 1, 1, 'slice'],
  ['Wholemeal Bread', 81, 4, 15, 1.5, 1, 'slice'],
  ['Pasta (dry)', 371, 13, 74, 2, 100, 'g'],
  ['Pasta (cooked)', 158, 6, 31, 1, 200, 'g'],
  ['Quinoa (cooked)', 120, 4, 22, 2, 200, 'g'],
  ['Pita Bread', 165, 5, 33, 1, 1, 'piece'],
  ['Tortilla (flour)', 146, 4, 26, 3, 1, 'medium'],
  ['Corn Tortilla', 58, 1.5, 12, 0.7, 1, 'small'],
  ['Sweet Potato (baked)', 103, 2, 24, 0.1, 130, 'g'],
  ['White Potato (baked)', 161, 4, 37, 0.2, 180, 'g'],
  ['Broccoli', 34, 3, 7, 0.4, 100, 'g'],
  ['Spinach', 23, 3, 4, 0.4, 100, 'g'],
  ['Kale', 49, 4, 9, 0.9, 100, 'g'],
  ['Green Beans', 31, 2, 7, 0.1, 100, 'g'],
  ['Cauliflower', 25, 2, 5, 0.3, 100, 'g'],
  ['Asparagus', 20, 2, 4, 0.1, 100, 'g'],
  ['Cucumber', 15, 0.7, 3, 0.1, 100, 'g'],
  ['Tomato', 22, 1, 5, 0.2, 1, 'medium'],
  ['Onion', 40, 1, 9, 0.1, 100, 'g'],
  ['Bell Pepper', 31, 1, 6, 0.3, 100, 'g'],
  ['Mushrooms', 22, 3, 3, 0.3, 100, 'g'],
  ['Avocado', 160, 2, 9, 15, 100, 'g'],
  ['Lettuce (Romaine)', 17, 1.5, 3, 0.3, 100, 'g'],
  ['Carrot', 41, 1, 10, 0.2, 100, 'g'],
  ['Courgette / Zucchini', 17, 1, 3, 0.2, 100, 'g'],
  ['Aubergine / Eggplant', 25, 1, 6, 0.2, 100, 'g'],
  ['Peas', 81, 5, 14, 0.4, 100, 'g'],
  ['Corn / Sweetcorn', 86, 3, 19, 1.2, 100, 'g'],
  ['Banana', 105, 1.3, 27, 0.3, 1, 'medium'],
  ['Apple', 95, 0.5, 25, 0.3, 1, 'medium'],
  ['Orange', 62, 1.2, 15, 0.2, 1, 'medium'],
  ['Mango', 60, 0.8, 15, 0.4, 100, 'g'],
  ['Pineapple', 50, 0.5, 13, 0.1, 100, 'g'],
  ['Grapes', 69, 0.7, 18, 0.2, 100, 'g'],
  ['Watermelon', 30, 0.6, 8, 0.2, 100, 'g'],
  ['Strawberries', 32, 0.7, 8, 0.3, 100, 'g'],
  ['Blueberries', 57, 0.7, 14, 0.3, 100, 'g'],
  ['Dates (medjool)', 282, 2.5, 75, 0.4, 100, 'g'],
  ['Pomegranate', 83, 1.7, 19, 1.2, 100, 'g'],
  ['Kiwi', 61, 1, 15, 0.5, 1, 'medium'],
  ['Pear', 101, 0.6, 27, 0.2, 1, 'medium'],
  ['Whole Milk', 149, 8, 12, 8, 240, 'ml'],
  ['Semi-Skimmed Milk', 103, 8, 12, 4, 240, 'ml'],
  ['Skimmed Milk', 83, 8, 12, 0.2, 240, 'ml'],
  ['Cheddar Cheese', 402, 25, 1.3, 33, 100, 'g'],
  ['Mozzarella', 280, 22, 2, 20, 100, 'g'],
  ['Paneer', 265, 19, 3, 20, 100, 'g'],
  ['Butter', 717, 0.9, 0, 81, 10, 'g'],
  ['Ghee', 900, 0, 0, 100, 10, 'g'],
  ['Double Cream', 450, 2, 3, 48, 100, 'ml'],
  ['Almonds', 579, 21, 22, 50, 100, 'g'],
  ['Walnuts', 654, 15, 14, 65, 100, 'g'],
  ['Cashews', 553, 18, 30, 44, 100, 'g'],
  ['Peanuts', 567, 26, 16, 49, 100, 'g'],
  ['Peanut Butter', 588, 25, 20, 50, 100, 'g'],
  ['Almond Butter', 614, 21, 18, 55, 100, 'g'],
  ['Chia Seeds', 486, 17, 42, 31, 15, 'g'],
  ['Flaxseeds', 534, 18, 29, 42, 15, 'g'],
  ['Pumpkin Seeds', 559, 30, 11, 49, 100, 'g'],
  ['Sunflower Seeds', 584, 21, 20, 51, 100, 'g'],
  ['Olive Oil', 884, 0, 0, 100, 14, 'ml'],
  ['Coconut Oil', 862, 0, 0, 100, 14, 'ml'],
  ['Vegetable Oil', 884, 0, 0, 100, 14, 'ml'],
  ['Tomato Ketchup', 112, 1, 26, 0.2, 30, 'ml'],
  ['Mayonnaise', 680, 1, 1, 75, 30, 'g'],
  ['Soy Sauce', 53, 8, 5, 0, 30, 'ml'],
  ['Hummus', 166, 8, 14, 10, 60, 'g'],
  ['Falafel (3 balls)', 180, 7, 25, 8, 3, 'balls'],
  ['Kebab Doner (chicken)', 580, 35, 55, 22, 1, 'wrap'],
  ['Mixed Grill Plate', 640, 52, 18, 40, 1, 'plate'],
  ['Pizza (cheese, 1 slice)', 285, 12, 36, 10, 1, 'slice'],
  ['Fish and Chips (UK)', 840, 35, 90, 35, 1, 'serving'],
  ['Beans on Toast', 200, 10, 35, 3, 1, 'slice'],
  ['Full English Breakfast', 810, 42, 50, 46, 1, 'plate'],
  ['Protein Shake (prepared)', 220, 35, 12, 4, 1, 'shake'],
  ['Orange Juice', 112, 2, 26, 0.5, 240, 'ml'],
  ['Apple Juice', 113, 0.2, 28, 0.3, 240, 'ml'],
  ['Sports Drink', 80, 0, 21, 0, 355, 'ml'],
  ['Coca Cola', 140, 0, 39, 0, 355, 'ml'],
  ['Green Tea', 2, 0, 0, 0, 240, 'ml'],
  ['Black Coffee', 5, 0.3, 0, 0.1, 240, 'ml'],
  ['Coffee with milk', 55, 3, 5, 3, 240, 'ml'],
  ['Coconut Water', 46, 0.5, 9, 0.5, 240, 'ml'],
  ['Almond Milk (unsweetened)', 30, 1, 1, 3, 240, 'ml'],
  ['Creatine Monohydrate', 0, 0, 0, 0, 5, 'g'],
  ['BCAA Powder', 20, 5, 0, 0, 10, 'g'],
  ['Pre-Workout', 20, 0, 4, 0, 1, 'scoop'],
  ['Mass Gainer', 740, 50, 120, 6, 200, 'g'],
];

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snacks'];
const MEAL_ICONS = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snacks: '🍎' };

let _nutAddMeal = 'breakfast';
let _nutFoodSearch = '';

App.register('nutrition', async function () {
  const [user, todayMeals, waterAmt] = await Promise.all([
    Storage.getUser(),
    Storage.getTodayMeals(),
    Storage.getTodayWaterAmount()
  ]);

  const calTarget = user.calorieTarget || 2500;
  const pTarget = user.proteinTarget || 180;
  const cTarget = user.carbTarget || 270;
  const fTarget = user.fatTarget || 80;
  const waterTarget = user.waterTarget || 8;

  const totals = todayMeals.reduce(function (acc, m) {
    acc.cal += m.calories || 0;
    acc.p += m.protein || 0;
    acc.c += m.carbs || 0;
    acc.f += m.fat || 0;
    return acc;
  }, { cal: 0, p: 0, c: 0, f: 0 });

  function donutChart(p, c, f) {
    const total = p + c + f;
    if (!total) return '<svg viewBox="0 0 80 80" style="width:90px;height:90px"><circle cx="40" cy="40" r="30" fill="none" stroke="var(--bg4)" stroke-width="12"/></svg>';
    const r = 30, cx = 40, cy = 40, sw = 12, circ = 2 * Math.PI * r;
    let offset = 0;
    function seg(val, color) {
      const dash = (val / total) * circ;
      const s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + sw + '" stroke-dasharray="' + dash + ' ' + (circ - dash) + '" stroke-dashoffset="' + (-offset) + '" transform="rotate(-90 ' + cx + ' ' + cy + ')"/>';
      offset += dash;
      return s;
    }
    return '<svg viewBox="0 0 80 80" style="width:90px;height:90px">' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="var(--bg4)" stroke-width="' + sw + '"/>' +
      seg(p, 'var(--info)') + seg(c, 'var(--warn)') + seg(f, 'var(--err)') + '</svg>';
  }

  function macroBar(val, target, color) {
    const pct = target ? Math.min(100, Math.round(val / target * 100)) : 0;
    return '<div style="height:4px;background:var(--bg4);border-radius:2px;overflow:hidden;flex:1">' +
      '<div style="height:4px;width:' + pct + '%;background:' + color + ';border-radius:2px"></div></div>';
  }

  function dropSVG(filled) {
    return '<svg viewBox="0 0 24 30" fill="' + (filled ? 'var(--info)' : 'var(--bg4)') + '" stroke="' + (filled ? 'var(--info)' : 'var(--border)') + '" stroke-width="1.5"><path d="M12 2C12 2 3 12 3 18a9 9 0 0 0 18 0C21 12 12 2 12 2z"/></svg>';
  }

  let h = App.topbar('Nutrition', App.today());
  h += '<div style="padding:14px 16px 0">';

  h += '<div class="card card-accent" style="margin:0 0 12px">';
  h += '<div style="display:flex;align-items:center;gap:16px;margin-bottom:14px">';
  h += donutChart(totals.p, totals.c, totals.f);
  h += '<div style="flex:1">';
  h += '<div style="font-size:28px;font-weight:900;line-height:1">' + Math.round(totals.cal) + '</div>';
  h += '<div style="font-size:12px;color:var(--txt3);margin-bottom:10px">of ' + calTarget + ' kcal</div>';
  function macroLine(val, target, color, label) {
    return '<div style="display:flex;align-items:center;gap:6px;margin-bottom:5px">' +
      '<span style="font-size:11px;font-weight:700;color:' + color + ';width:12px">' + label + '</span>' +
      '<span style="font-size:12px;font-weight:700;min-width:36px">' + Math.round(val) + 'g</span>' +
      macroBar(val, target, color) +
      '<span style="font-size:10px;color:var(--txt3)">' + target + '</span>' +
      '</div>';
  }
  h += macroLine(totals.p, pTarget, 'var(--info)', 'P');
  h += macroLine(totals.c, cTarget, 'var(--warn)', 'C');
  h += macroLine(totals.f, fTarget, 'var(--err)', 'F');
  h += '</div></div>';
  const remaining = calTarget - Math.round(totals.cal);
  h += '<div style="display:flex;gap:10px">';
  h += '<div style="flex:1;text-align:center;padding:10px;background:var(--bg4);border-radius:12px"><div style="font-size:16px;font-weight:800;color:' + (remaining >= 0 ? 'var(--ok)' : 'var(--err)') + '">' + Math.abs(remaining) + '</div><div style="font-size:10px;color:var(--txt3)">' + (remaining >= 0 ? 'remaining' : 'over') + '</div></div>';
  h += '<div style="flex:1;text-align:center;padding:10px;background:var(--bg4);border-radius:12px"><div style="font-size:16px;font-weight:800;color:var(--info)">' + waterAmt + '/' + waterTarget + '</div><div style="font-size:10px;color:var(--txt3)">water</div></div>';
  h += '<div style="flex:1;text-align:center;padding:10px;background:var(--bg4);border-radius:12px"><div style="font-size:16px;font-weight:800;color:var(--accent)">' + todayMeals.length + '</div><div style="font-size:10px;color:var(--txt3)">items</div></div>';
  h += '</div></div>';

  h += App.sh('Water', '+ Glass', 'Nut.addWater()');
  h += '<div class="card" style="margin:0 0 12px"><div class="droplet-row">';
  for (let i = 0; i < waterTarget; i++) {
    h += '<div class="droplet" onclick="Nut.logWater(' + (i + 1) + ')">' + dropSVG(i < waterAmt) + '</div>';
  }
  h += '</div></div>';

  MEAL_TYPES.forEach(function (type) {
    const typeMeals = todayMeals.filter(function (m) { return m.meal === type; });
    const typeCal = typeMeals.reduce(function (a, m) { return a + (m.calories || 0); }, 0);
    h += '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px 4px">';
    h += '<div style="display:flex;align-items:center;gap:8px"><span style="font-size:18px">' + (MEAL_ICONS[type]) + '</span>';
    h += '<span style="font-size:17px;font-weight:800;text-transform:capitalize">' + type + '</span>';
    if (typeCal > 0) h += '<span style="font-size:12px;color:var(--txt3)">' + Math.round(typeCal) + ' kcal</span>';
    h += '</div>';
    h += '<button class="btn btn-secondary btn-xs" onclick="Nut.showAdd(\'' + type + '\')">+ Add</button></div>';
    if (typeMeals.length) {
      h += '<div class="card" style="margin:0 16px 8px">';
      typeMeals.forEach(function (m) {
        h += '<div class="nutrition-row">';
        h += '<div class="nutrition-row-info"><div class="nutrition-row-name">' + App.esc(m.foodName) + '</div>';
        h += '<div class="nutrition-row-meta">' + m.servingSize + ' ' + m.servingUnit + ' · P:' + Math.round(m.protein) + 'g C:' + Math.round(m.carbs) + 'g F:' + Math.round(m.fat) + 'g</div></div>';
        h += '<div style="display:flex;align-items:center;gap:10px"><div class="nutrition-row-cal">' + Math.round(m.calories) + '</div>';
        h += '<button class="btn btn-err btn-xs" onclick="Nut.del(' + m.id + ')">✕</button></div></div>';
      });
      h += '</div>';
    }
  });

  h += '<div style="height:20px"></div></div>';
  return h;
});

const Nut = {
  showAdd: function (meal) {
    _nutAddMeal = meal;
    _nutFoodSearch = '';
    const m = document.createElement('div');
    m.className = 'overlay';
    m.id = 'food-modal';
    let h = '<div class="sheet"><div class="sheet-handle"></div>';
    h += '<div style="font-size:18px;font-weight:800;margin-bottom:12px">Add to ' + meal.charAt(0).toUpperCase() + meal.slice(1) + '</div>';
    h += '<input id="food-q" class="field mb12" placeholder="Search ' + FOOD_DB.length + '+ foods…" oninput="Nut._srch(this.value)">';
    h += '<div id="food-res">' + Nut._list('') + '</div></div>';
    m.innerHTML = h;
    m.addEventListener('click', function (ev) { if (ev.target === m) m.remove(); });
    document.body.appendChild(m);
  },

  _srch: function (q) {
    _nutFoodSearch = q;
    const el = document.getElementById('food-res');
    if (el) el.innerHTML = Nut._list(q);
  },

  _list: function (q) {
    const ql = q.toLowerCase();
    const results = q ? FOOD_DB.filter(function (f) { return f[0].toLowerCase().includes(ql); }) : FOOD_DB;
    let h = '';
    results.slice(0, 30).forEach(function (f) {
      const i = FOOD_DB.indexOf(f);
      h += '<div class="nutrition-row card-tap" onclick="Nut._pick(' + i + ')">';
      h += '<div class="nutrition-row-info"><div class="nutrition-row-name">' + App.esc(f[0]) + '</div>';
      h += '<div class="nutrition-row-meta">' + f[5] + ' ' + f[6] + ' · P:' + f[2] + 'g C:' + f[3] + 'g F:' + f[4] + 'g</div></div>';
      h += '<div class="nutrition-row-cal">' + f[1] + '</div></div>';
    });
    return h || '<p style="color:var(--txt3);text-align:center;padding:24px">No foods found</p>';
  },

  _pick: function (i) {
    const f = FOOD_DB[i];
    if (!f) return;
    const el = document.getElementById('food-res');
    if (el) el.innerHTML =
      '<div style="background:var(--bg3);border-radius:16px;padding:16px;margin-bottom:12px">' +
      '<div style="font-size:17px;font-weight:800;margin-bottom:4px">' + App.esc(f[0]) + '</div>' +
      '<div style="font-size:13px;color:var(--txt3);margin-bottom:14px">' + f[1] + ' kcal per ' + f[5] + ' ' + f[6] + ' · P:' + f[2] + 'g C:' + f[3] + 'g F:' + f[4] + 'g</div>' +
      '<label class="field-label">Serving size</label>' +
      '<input id="food-qty" class="field mb12" type="number" inputmode="decimal" value="' + f[5] + '" step="1" min="0.1">' +
      '<button class="btn btn-primary" onclick="Nut._log(' + i + ')">Add to ' + _nutAddMeal.charAt(0).toUpperCase() + _nutAddMeal.slice(1) + '</button>' +
      '<button class="btn btn-secondary" style="margin-top:8px" onclick="Nut._back()">← Back</button>' +
      '</div>';
  },

  _back: function () {
    const el = document.getElementById('food-res');
    if (el) el.innerHTML = Nut._list(_nutFoodSearch);
  },

  _log: async function (i) {
    const f = FOOD_DB[i];
    if (!f) return;
    const qtyEl = document.getElementById('food-qty');
    const qty = parseFloat(qtyEl ? qtyEl.value : f[5]) || f[5];
    const ratio = qty / f[5];
    await Storage.set('meals', {
      date: App.isoNow(), meal: _nutAddMeal, foodName: f[0],
      servingSize: qty, servingUnit: f[6],
      calories: Math.round(f[1] * ratio),
      protein: Math.round(f[2] * ratio * 10) / 10,
      carbs: Math.round(f[3] * ratio * 10) / 10,
      fat: Math.round(f[4] * ratio * 10) / 10
    });
    App.haptic(30);
    App.toast(f[0] + ' logged!');
    const modal = document.getElementById('food-modal');
    if (modal) modal.remove();
    go('nutrition');
  },

  del: async function (id) {
    await Storage.delete('meals', id);
    App.haptic([50, 30, 50]);
    App.toast('Removed');
    go('nutrition');
  },

  addWater: async function () {
    await Storage.set('water', { date: App.isoNow(), amount: 1 });
    App.haptic(30);
    App.toast('Water logged 💧');
    go('nutrition');
  },

  logWater: async function (glass) {
    const amt = await Storage.getTodayWaterAmount();
    if (glass <= amt) { App.toast('Already at ' + amt + ' glasses'); return; }
    await Storage.set('water', { date: App.isoNow(), amount: 1 });
    App.haptic(30);
    App.toast('Water logged 💧');
    go('nutrition');
  }
};
