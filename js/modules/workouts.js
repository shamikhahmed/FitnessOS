'use strict';

/* ════════════════════════════════════════
   EXERCISE DATABASE — 100+ exercises
════════════════════════════════════════ */
const EXERCISE_DB = {
  chest: [
    {n:'Barbell Bench Press',    em:'🏋️',eq:['barbell'],diff:2,pri:'Chest',sec:'Triceps, Front Delts',cues:'Retract scaps, slight arch, drive bar explosively',bw:false},
    {n:'Incline Bench Press',    em:'💪',eq:['barbell'],diff:2,pri:'Upper Chest',sec:'Triceps, Delts',cues:'30-45° incline, touch upper chest, full lockout',bw:false},
    {n:'Decline Bench Press',    em:'💪',eq:['barbell'],diff:2,pri:'Lower Chest',sec:'Triceps',cues:'Head lower, bar to lower chest, control descent',bw:false},
    {n:'Dumbbell Bench Press',   em:'💪',eq:['dumbbell'],diff:1,pri:'Chest',sec:'Triceps',cues:'Full ROM, elbows at 45°, slow on the way down',bw:false},
    {n:'Incline Dumbbell Press', em:'💪',eq:['dumbbell'],diff:1,pri:'Upper Chest',sec:'Delts',cues:'Slight incline 30°, neutral or pronated grip',bw:false},
    {n:'Dumbbell Fly',           em:'🦋',eq:['dumbbell'],diff:1,pri:'Chest',sec:'Front Delts',cues:'Slight elbow bend, wide arc, stretch at bottom',bw:false},
    {n:'Incline Dumbbell Fly',   em:'🦋',eq:['dumbbell'],diff:1,pri:'Upper Chest',sec:'',cues:'Keep soft bend in elbows, feel the stretch',bw:false},
    {n:'Cable Crossover',        em:'⚡',eq:['cables'],diff:1,pri:'Chest',sec:'Front Delts',cues:'Lean forward, squeeze at crossing point below chest',bw:false},
    {n:'Cable Fly (High)',       em:'⚡',eq:['cables'],diff:1,pri:'Lower Chest',sec:'',cues:'High pulley, arc down and across, squeeze chest',bw:false},
    {n:'Push-Ups',               em:'🤸',eq:[],diff:1,pri:'Chest',sec:'Triceps, Core',cues:'Straight body, full lockout at top, touch chest',bw:true},
    {n:'Chest Dips',             em:'🏅',eq:['bar'],diff:2,pri:'Lower Chest',sec:'Triceps',cues:'Lean forward 30°, wide grip, deep dip',bw:true},
    {n:'Pec Deck Machine',       em:'🦾',eq:['machine'],diff:1,pri:'Chest',sec:'',cues:'Elbows bent 90°, squeeze at peak contraction',bw:false},
    {n:'Landmine Press',         em:'💪',eq:['barbell'],diff:2,pri:'Upper Chest',sec:'Delts, Triceps',cues:'Single arm, explosive press, rotate torso slightly',bw:false},
    {n:'Svend Press',            em:'💪',eq:['dumbbell'],diff:1,pri:'Chest',sec:'',cues:'Press plates together throughout entire movement',bw:false},
  ],
  back: [
    {n:'Deadlift',                em:'🏋️',eq:['barbell'],diff:3,pri:'Entire Back',sec:'Hamstrings, Glutes, Traps',cues:'Bar over mid-foot, neutral spine, lats engaged, hips drive',bw:false},
    {n:'Barbell Row',             em:'💪',eq:['barbell'],diff:2,pri:'Mid Back',sec:'Biceps, Rear Delts',cues:'45° hinge, elbows past torso, full ROM at top',bw:false},
    {n:'Pendlay Row',             em:'💪',eq:['barbell'],diff:2,pri:'Mid Back',sec:'Lats',cues:'Dead stop each rep, explosive pull, torso parallel',bw:false},
    {n:'Pull-Ups',                em:'🏅',eq:['bar'],diff:2,pri:'Lats',sec:'Biceps, Rear Delts',cues:'Dead hang start, drive elbows down to pockets',bw:true},
    {n:'Chin-Ups',                em:'🏅',eq:['bar'],diff:2,pri:'Lats',sec:'Biceps',cues:'Supinated grip, tuck chin over bar, full hang',bw:true},
    {n:'Lat Pulldown',            em:'⬇️',eq:['cables'],diff:1,pri:'Lats',sec:'Biceps',cues:'Slight lean back, pull to upper chest, depress scaps',bw:false},
    {n:'Seated Cable Row',        em:'⚡',eq:['cables'],diff:1,pri:'Mid Back',sec:'Biceps',cues:'Tall posture, drive elbows back, squeeze blades',bw:false},
    {n:'T-Bar Row',               em:'💪',eq:['barbell'],diff:2,pri:'Mid Back',sec:'Lats',cues:'Chest supported or bent over, neutral grip, full ROM',bw:false},
    {n:'Dumbbell Row',            em:'🏋️',eq:['dumbbell'],diff:1,pri:'Lats',sec:'Biceps',cues:'Support on bench, pull to hip, full stretch at bottom',bw:false},
    {n:'Face Pull',               em:'⚡',eq:['cables'],diff:1,pri:'Rear Delts',sec:'Traps, Rotator Cuff',cues:'Rope to forehead, external rotation, elbows high',bw:false},
    {n:'Straight Arm Pulldown',   em:'⚡',eq:['cables'],diff:1,pri:'Lats',sec:'',cues:'Arms nearly straight, pull arc to hips, feel the stretch',bw:false},
    {n:'Rack Pull',               em:'🏋️',eq:['barbell'],diff:2,pri:'Upper Back',sec:'Traps, Erectors',cues:'Pins at knee height, heavy load, full lockout',bw:false},
    {n:'Chest Supported Row',     em:'💪',eq:['dumbbell'],diff:1,pri:'Mid Back',sec:'',cues:'Chest on incline bench, full stretch, squeeze at top',bw:false},
    {n:'Seal Row',                em:'💪',eq:['barbell'],diff:1,pri:'Mid Back',sec:'Rear Delts',cues:'Lay prone on elevated bench, pure row no hip drive',bw:false},
  ],
  legs: [
    {n:'Barbell Squat',           em:'🏋️',eq:['barbell'],diff:3,pri:'Quads',sec:'Glutes, Hamstrings, Core',cues:'Chest up, knees track toes, parallel or below',bw:false},
    {n:'Front Squat',             em:'🏋️',eq:['barbell'],diff:3,pri:'Quads',sec:'Core, Glutes',cues:'Elbows high, upright torso, deep squat',bw:false},
    {n:'Romanian Deadlift',       em:'💪',eq:['barbell'],diff:2,pri:'Hamstrings',sec:'Glutes',cues:'Hinge at hips, soft knees, feel hamstring stretch',bw:false},
    {n:'Leg Press',               em:'🦵',eq:['machine'],diff:1,pri:'Quads',sec:'Glutes',cues:'Feet shoulder width, full ROM, no locked knees',bw:false},
    {n:'Bulgarian Split Squat',   em:'🏅',eq:['dumbbell'],diff:2,pri:'Quads',sec:'Glutes, Hamstrings',cues:'Front foot forward, vertical shin, knee to floor',bw:false},
    {n:'Lying Leg Curl',          em:'⚡',eq:['machine'],diff:1,pri:'Hamstrings',sec:'Calves',cues:'Slow eccentric, full range, no hip rise',bw:false},
    {n:'Seated Leg Curl',         em:'⚡',eq:['machine'],diff:1,pri:'Hamstrings',sec:'',cues:'Full stretch at bottom, hard squeeze at top',bw:false},
    {n:'Leg Extension',           em:'⚡',eq:['machine'],diff:1,pri:'Quads',sec:'',cues:'Full extension, 1s pause at top, control down',bw:false},
    {n:'Hip Thrust',              em:'🍑',eq:['barbell'],diff:2,pri:'Glutes',sec:'Hamstrings',cues:'Full hip extension, posterior pelvic tilt, hard squeeze',bw:false},
    {n:'Walking Lunges',          em:'🚶',eq:['dumbbell'],diff:2,pri:'Quads',sec:'Glutes',cues:'Long stride, back knee near floor, upright torso',bw:false},
    {n:'Reverse Lunge',           em:'🚶',eq:['dumbbell'],diff:2,pri:'Quads',sec:'Glutes',cues:'Step back, control descent, push through front heel',bw:false},
    {n:'Calf Raise (Standing)',   em:'👟',eq:['machine'],diff:1,pri:'Calves',sec:'',cues:'Full ROM, 2s pause at bottom stretch, controlled',bw:false},
    {n:'Seated Calf Raise',       em:'👟',eq:['machine'],diff:1,pri:'Soleus',sec:'',cues:'Bent knee targets soleus, full stretch',bw:false},
    {n:'Goblet Squat',            em:'🏆',eq:['dumbbell'],diff:1,pri:'Quads',sec:'Glutes, Core',cues:'Hold at chest, elbows inside knees, sit tall',bw:false},
    {n:'Glute Bridge',            em:'🍑',eq:[],diff:1,pri:'Glutes',sec:'Hamstrings',cues:'Feet flat, heels drive, full hip extension, squeeze',bw:true},
    {n:'Sumo Squat',              em:'🏋️',eq:['dumbbell'],diff:1,pri:'Inner Thighs',sec:'Glutes, Quads',cues:'Wide stance toes out, stay upright, deep ROM',bw:false},
    {n:'Step-Ups',                em:'🪜',eq:['dumbbell'],diff:1,pri:'Quads',sec:'Glutes',cues:'Full foot on box, drive through heel, lock out',bw:false},
    {n:'Nordic Curl',             em:'🏅',eq:[],diff:3,pri:'Hamstrings',sec:'Glutes',cues:'Feet anchored, lower slowly, use hands to return',bw:true},
  ],
  shoulders: [
    {n:'Overhead Press',           em:'🏋️',eq:['barbell'],diff:3,pri:'Front Delts',sec:'Triceps, Traps',cues:'Bar path: forehead → back overhead, full lockout',bw:false},
    {n:'Dumbbell Shoulder Press',  em:'💪',eq:['dumbbell'],diff:1,pri:'Front Delts',sec:'Triceps',cues:'Elbows slightly forward, press to full lockout',bw:false},
    {n:'Lateral Raise',            em:'🦅',eq:['dumbbell'],diff:1,pri:'Side Delts',sec:'',cues:'Lead with elbows, slight lean, thumb down at top',bw:false},
    {n:'Cable Lateral Raise',      em:'⚡',eq:['cables'],diff:1,pri:'Side Delts',sec:'',cues:'Cross-body cable, constant tension, controlled',bw:false},
    {n:'Rear Delt Fly',            em:'🦋',eq:['dumbbell'],diff:1,pri:'Rear Delts',sec:'Traps',cues:'Hinge at hips, reverse fly arc, lead with elbows',bw:false},
    {n:'Arnold Press',             em:'🏅',eq:['dumbbell'],diff:2,pri:'All Delts',sec:'Triceps',cues:'Start neutral, rotate pronated as you press up',bw:false},
    {n:'Upright Row',              em:'💪',eq:['barbell'],diff:2,pri:'Side Delts',sec:'Traps',cues:'Hands shoulder-width, pull to chin, elbows above hands',bw:false},
    {n:'Machine Shoulder Press',   em:'🦾',eq:['machine'],diff:1,pri:'Front Delts',sec:'Triceps',cues:'Seat height: handles at shoulder level, full press',bw:false},
    {n:'Bradford Press',           em:'💪',eq:['barbell'],diff:2,pri:'All Delts',sec:'',cues:'Alternating front/behind-neck press, continuous motion',bw:false},
    {n:'Cable Rear Delt Fly',      em:'⚡',eq:['cables'],diff:1,pri:'Rear Delts',sec:'',cues:'Both cables crossed at chest height, pull apart',bw:false},
  ],
  biceps: [
    {n:'Barbell Curl',          em:'💪',eq:['barbell'],diff:1,pri:'Biceps',sec:'Brachialis',cues:'Elbows pinned at sides, full supination at top',bw:false},
    {n:'Incline Dumbbell Curl', em:'💪',eq:['dumbbell'],diff:1,pri:'Biceps Long Head',sec:'',cues:'Incline bench, full stretch at bottom, slow',bw:false},
    {n:'Hammer Curl',           em:'🔨',eq:['dumbbell'],diff:1,pri:'Brachialis',sec:'Forearms',cues:'Neutral grip, strict form, no swinging',bw:false},
    {n:'Cable Curl',            em:'⚡',eq:['cables'],diff:1,pri:'Biceps',sec:'',cues:'Constant tension, elbows pinned, squeeze at top',bw:false},
    {n:'Preacher Curl',         em:'💺',eq:['machine'],diff:1,pri:'Biceps Short Head',sec:'',cues:'Full stretch at bottom, slow eccentric',bw:false},
    {n:'Concentration Curl',    em:'💪',eq:['dumbbell'],diff:1,pri:'Biceps',sec:'',cues:'Elbow braced on inner knee, full ROM, squeeze',bw:false},
    {n:'Spider Curl',           em:'💪',eq:['dumbbell'],diff:1,pri:'Biceps',sec:'',cues:'Prone on incline bench, elbows forward, full ROM',bw:false},
    {n:'Reverse Curl',          em:'💪',eq:['barbell'],diff:1,pri:'Brachialis',sec:'Forearms',cues:'Overhand grip, elbows pinned, controlled',bw:false},
  ],
  triceps: [
    {n:'Close Grip Bench Press',     em:'🏋️',eq:['barbell'],diff:2,pri:'Triceps',sec:'Chest',cues:'Shoulder-width grip, tuck elbows, full lockout',bw:false},
    {n:'Rope Pushdown',              em:'⚡',eq:['cables'],diff:1,pri:'Triceps',sec:'',cues:'Elbows fixed, spread rope at bottom, full extension',bw:false},
    {n:'Overhead Tricep Extension',  em:'⚡',eq:['cables'],diff:1,pri:'Triceps Long Head',sec:'',cues:'Elbows close to head, full stretch overhead',bw:false},
    {n:'Skull Crusher',              em:'💀',eq:['barbell'],diff:2,pri:'Triceps',sec:'',cues:'Bar to forehead, elbows travel slightly back',bw:false},
    {n:'Tricep Dips',                em:'🏅',eq:['bar'],diff:2,pri:'Triceps',sec:'Chest',cues:'Upright torso, elbows back, full lockout at top',bw:true},
    {n:'Diamond Push-Up',            em:'🔷',eq:[],diff:2,pri:'Triceps',sec:'Chest',cues:'Hands form diamond shape, elbows flare back',bw:true},
    {n:'Overhead DB Extension',      em:'⚡',eq:['dumbbell'],diff:1,pri:'Triceps Long Head',sec:'',cues:'Hold one dumbbell with both hands, elbows in',bw:false},
    {n:'Cable Kickback',             em:'⚡',eq:['cables'],diff:1,pri:'Triceps',sec:'',cues:'Hinge forward, upper arm parallel to floor, extend',bw:false},
    {n:'JM Press',                   em:'🏋️',eq:['barbell'],diff:3,pri:'Triceps',sec:'',cues:'Hybrid skull crusher + close grip, bar to throat',bw:false},
  ],
  core: [
    {n:'Plank',              em:'🧱',eq:[],diff:1,pri:'Core',sec:'Shoulders, Glutes',cues:'Straight line head to heel, squeeze everything',bw:true},
    {n:'Cable Crunch',       em:'⚡',eq:['cables'],diff:1,pri:'Abs',sec:'',cues:'Crunch toward hips, hold contraction, resist on way up',bw:false},
    {n:'Leg Raise',          em:'🦵',eq:[],diff:1,pri:'Lower Abs',sec:'Hip Flexors',cues:'Control descent, posterior pelvic tilt throughout',bw:true},
    {n:'Ab Wheel',           em:'⚙️',eq:['wheel'],diff:3,pri:'Abs',sec:'Lower Back, Lats',cues:'Straight arms, full extension, controlled return',bw:false},
    {n:'Russian Twist',      em:'🔄',eq:['dumbbell'],diff:1,pri:'Obliques',sec:'Abs',cues:'45° lean back, rotate fully each side, slow',bw:false},
    {n:'Hanging Leg Raise',  em:'🏅',eq:['bar'],diff:2,pri:'Lower Abs',sec:'Hip Flexors',cues:'Full hang, controlled raise, posterior pelvic tilt',bw:true},
    {n:'Bicycle Crunch',     em:'🚲',eq:[],diff:1,pri:'Obliques',sec:'Abs',cues:'Opposite elbow to knee, full rotation, slow',bw:true},
    {n:'V-Ups',              em:'💪',eq:[],diff:2,pri:'Abs',sec:'Hip Flexors',cues:'Simultaneous leg and torso raise, touch feet',bw:true},
    {n:'Dead Bug',           em:'🐛',eq:[],diff:1,pri:'Core',sec:'',cues:'Lower back pressed down, opposite arm and leg extend',bw:true},
    {n:'Dragon Flag',        em:'🐉',eq:['bar'],diff:3,pri:'Abs',sec:'Lower Back',cues:'Grip bench, keep body rigid, lower slowly',bw:true},
    {n:'Hollow Body Hold',   em:'🌙',eq:[],diff:2,pri:'Core',sec:'',cues:'Lower back flat, arms overhead, slight dish shape',bw:true},
  ],
  glutes: [
    {n:'Cable Kickback',         em:'⚡',eq:['cables'],diff:1,pri:'Glutes',sec:'Hamstrings',cues:'Kick back and up, full hip extension, squeeze',bw:false},
    {n:'Donkey Kicks',           em:'🍑',eq:[],diff:1,pri:'Glutes',sec:'',cues:'On all fours, kick up and back, squeeze at top',bw:true},
    {n:'Fire Hydrant',           em:'🔥',eq:[],diff:1,pri:'Glute Med',sec:'',cues:'Lift leg out to side, keep hips level',bw:true},
    {n:'Hip Abduction Machine',  em:'🦾',eq:['machine'],diff:1,pri:'Glute Med',sec:'',cues:'Slow and controlled, full ROM, pause at peak',bw:false},
    {n:'Frog Pump',              em:'🐸',eq:[],diff:1,pri:'Glutes',sec:'',cues:'Feet together, drive through heels, squeeze hard',bw:true},
    {n:'Banded Clamshell',       em:'🦀',eq:['bands'],diff:1,pri:'Glute Med',sec:'',cues:'Band above knees, rotate top knee up, keep hips still',bw:true},
  ],
  fullbody: [
    {n:'Power Clean',       em:'⚡',eq:['barbell'],diff:3,pri:'Full Body',sec:'Traps, Glutes, Quads',cues:'Explosive triple extension, high elbows catch',bw:false},
    {n:'Clean and Jerk',    em:'⚡',eq:['barbell'],diff:3,pri:'Full Body',sec:'',cues:'Clean then split jerk, competition lift',bw:false},
    {n:'Thruster',          em:'🚀',eq:['barbell'],diff:2,pri:'Quads',sec:'Delts, Triceps',cues:'Front squat into press, continuous movement',bw:false},
    {n:'Hang Clean',        em:'⚡',eq:['barbell'],diff:2,pri:'Full Body',sec:'',cues:'Start from hips, explosive pull, high elbows',bw:false},
    {n:'Push Press',        em:'💪',eq:['barbell'],diff:2,pri:'Delts',sec:'Quads, Triceps',cues:'Leg drive, bar leaves at hip dip, press to lockout',bw:false},
    {n:'Kettlebell Swing',  em:'🏑',eq:['dumbbell'],diff:2,pri:'Glutes',sec:'Hamstrings, Core',cues:'Hip hinge, explosive hip extension, float at top',bw:false},
    {n:'Dumbbell Snatch',   em:'⚡',eq:['dumbbell'],diff:2,pri:'Full Body',sec:'',cues:'Hip hinge, explosive pull, punch up into lockout',bw:false},
    {n:'Barbell Complex',   em:'🔁',eq:['barbell'],diff:3,pri:'Full Body',sec:'',cues:'Deadlift → row → clean → press sequence',bw:false},
  ],
  forearms: [
    {n:'Wrist Curl',        em:'💪',eq:['barbell'],diff:1,pri:'Forearms',sec:'',cues:'Wrists off bench, full ROM up and down',bw:false},
    {n:'Reverse Wrist Curl',em:'💪',eq:['barbell'],diff:1,pri:'Forearms',sec:'',cues:'Overhand grip, raise wrists as high as possible',bw:false},
    {n:'Farmer\'s Walk',    em:'🧳',eq:['dumbbell'],diff:1,pri:'Grip',sec:'Traps, Core',cues:'Heavy dumbbells, tall posture, small quick steps',bw:false},
    {n:'Dead Hang',         em:'🏅',eq:['bar'],diff:1,pri:'Grip',sec:'Shoulders',cues:'Full hang, relax shoulders, breathe, hold as long as possible',bw:true},
    {n:'Plate Pinch',       em:'🫰',eq:['machine'],diff:1,pri:'Grip',sec:'',cues:'Pinch two plates together smooth side out',bw:false},
  ],
};

const EX_ALL = (function () {
  const arr = [];
  Object.keys(EXERCISE_DB).forEach(function (grp) {
    EXERCISE_DB[grp].forEach(function (e) { arr.push(Object.assign({ grp: grp }, e)); });
  });
  return arr;
})();

function exById(name) {
  return EX_ALL.find(function (e) { return e.n === name; }) ||
    { n: name, em: '💪', eq: [], diff: 1, pri: 'Muscles', sec: '', cues: 'Focus on form', bw: false, grp: 'other' };
}

function exSearch(q, grp) {
  let r = EX_ALL;
  if (grp && grp !== 'all') r = r.filter(function (e) { return e.grp === grp; });
  if (q) {
    const ql = q.toLowerCase();
    r = r.filter(function (e) {
      return e.n.toLowerCase().includes(ql) || e.pri.toLowerCase().includes(ql) || (e.sec || '').toLowerCase().includes(ql);
    });
  }
  return r;
}

/* ════════════════════════════════════════
   TRAINING SPLITS
════════════════════════════════════════ */
const SPLITS = {
  ppl: { n: 'Push Pull Legs', days: 6, label: 'PPL — 6 days/week', schedule: [
    { n: 'Push A', muscles: ['Chest','Shoulders','Triceps'], exercises: ['Barbell Bench Press','Overhead Press','Incline Bench Press','Lateral Raise','Rope Pushdown','Overhead Tricep Extension'] },
    { n: 'Pull A', muscles: ['Back','Biceps'], exercises: ['Deadlift','Barbell Row','Lat Pulldown','Face Pull','Barbell Curl','Hammer Curl'] },
    { n: 'Legs A', muscles: ['Quads','Hamstrings','Glutes','Calves'], exercises: ['Barbell Squat','Romanian Deadlift','Leg Press','Lying Leg Curl','Calf Raise (Standing)','Plank'] },
    { n: 'Push B', muscles: ['Chest','Shoulders','Triceps'], exercises: ['Dumbbell Bench Press','Arnold Press','Incline Dumbbell Press','Cable Lateral Raise','Skull Crusher','Tricep Dips'] },
    { n: 'Pull B', muscles: ['Back','Biceps'], exercises: ['T-Bar Row','Pull-Ups','Seated Cable Row','Rear Delt Fly','Incline Dumbbell Curl','Cable Curl'] },
    { n: 'Legs B', muscles: ['Quads','Hamstrings','Glutes','Calves'], exercises: ['Bulgarian Split Squat','Hip Thrust','Leg Extension','Walking Lunges','Seated Calf Raise','Cable Crunch'] },
  ]},
  ul: { n: 'Upper Lower', days: 4, label: 'Upper/Lower — 4 days/week', schedule: [
    { n: 'Upper A', muscles: ['Chest','Back','Shoulders','Arms'], exercises: ['Barbell Bench Press','Barbell Row','Overhead Press','Barbell Curl','Rope Pushdown','Lateral Raise'] },
    { n: 'Lower A', muscles: ['Quads','Hamstrings','Glutes','Calves'], exercises: ['Barbell Squat','Romanian Deadlift','Leg Press','Lying Leg Curl','Calf Raise (Standing)','Plank'] },
    { n: 'Upper B', muscles: ['Chest','Back','Shoulders','Arms'], exercises: ['Incline Bench Press','Pull-Ups','Dumbbell Shoulder Press','Incline Dumbbell Curl','Skull Crusher','Face Pull'] },
    { n: 'Lower B', muscles: ['Quads','Hamstrings','Glutes','Calves'], exercises: ['Bulgarian Split Squat','Hip Thrust','Leg Extension','Walking Lunges','Calf Raise (Standing)','Hanging Leg Raise'] },
  ]},
  fb: { n: 'Full Body', days: 3, label: 'Full Body — 3 days/week', schedule: [
    { n: 'Full Body A', muscles: ['Chest','Back','Legs','Shoulders','Arms'], exercises: ['Barbell Bench Press','Barbell Row','Barbell Squat','Overhead Press','Barbell Curl','Rope Pushdown'] },
    { n: 'Full Body B', muscles: ['Chest','Back','Legs','Shoulders','Arms'], exercises: ['Incline Bench Press','Deadlift','Leg Press','Lateral Raise','Hammer Curl','Tricep Dips'] },
    { n: 'Full Body C', muscles: ['Chest','Back','Legs','Shoulders','Arms'], exercises: ['Dumbbell Bench Press','Pull-Ups','Goblet Squat','Arnold Press','Cable Curl','Overhead Tricep Extension'] },
  ]},
  bro: { n: 'Bro Split', days: 5, label: 'Bro Split — 5 days/week', schedule: [
    { n: 'Chest Day',     muscles: ['Chest','Triceps'],   exercises: ['Barbell Bench Press','Incline Bench Press','Dumbbell Fly','Cable Crossover','Chest Dips','Rope Pushdown'] },
    { n: 'Back Day',      muscles: ['Back','Biceps'],     exercises: ['Deadlift','Barbell Row','Pull-Ups','Lat Pulldown','Seated Cable Row','Barbell Curl'] },
    { n: 'Shoulder Day',  muscles: ['Shoulders','Traps'], exercises: ['Overhead Press','Dumbbell Shoulder Press','Lateral Raise','Rear Delt Fly','Arnold Press','Face Pull'] },
    { n: 'Leg Day',       muscles: ['Quads','Hamstrings','Glutes','Calves'], exercises: ['Barbell Squat','Romanian Deadlift','Leg Press','Bulgarian Split Squat','Lying Leg Curl','Calf Raise (Standing)'] },
    { n: 'Arms Day',      muscles: ['Biceps','Triceps'], exercises: ['Barbell Curl','Incline Dumbbell Curl','Hammer Curl','Cable Curl','Skull Crusher','Close Grip Bench Press','Tricep Dips'] },
  ]},
  str: { n: 'Strength', days: 4, label: 'Strength — 4 days/week', schedule: [
    { n: 'Squat', muscles: ['Quads','Glutes','Core'], exercises: ['Barbell Squat','Romanian Deadlift','Barbell Row','Bulgarian Split Squat','Barbell Curl','Plank'] },
    { n: 'Press', muscles: ['Chest','Shoulders','Triceps'], exercises: ['Barbell Bench Press','Overhead Press','Incline Bench Press','Close Grip Bench Press','Lateral Raise','Rope Pushdown'] },
    { n: 'Deadlift', muscles: ['Back','Hamstrings'], exercises: ['Deadlift','Pull-Ups','T-Bar Row','Romanian Deadlift','Face Pull','Cable Curl'] },
    { n: 'Accessory', muscles: ['All'], exercises: ['Dumbbell Bench Press','Arnold Press','Dumbbell Row','Leg Press','Incline Dumbbell Curl','Skull Crusher'] },
  ]},
};

/* ════════════════════════════════════════
   WORKOUT ENGINE
════════════════════════════════════════ */
const WE = {
  getSplitDay: function (user, all) {
    const sp = SPLITS[user.split] || SPLITS.ppl;
    const dayIdx = ((user.splitDay || 1) - 1) % sp.schedule.length;
    return sp.schedule[dayIdx];
  },

  epley: function (w, r) { return r === 1 ? w : Math.round(w * (1 + r / 30)); },

  suggestWeight: function (ex, user) {
    const bw = user.weight || 75;
    const g = user.gender || 'male';
    const exp = user.exp || 'intermediate';
    let m = exp === 'beginner' ? 0.42 : exp === 'intermediate' ? 0.67 : 0.92;
    if (g === 'female') m *= 0.65;
    const map = {
      'Barbell Bench Press': bw * 0.75, 'Incline Bench Press': bw * 0.65, 'Decline Bench Press': bw * 0.80,
      'Barbell Squat': bw * 1.0, 'Front Squat': bw * 0.8, 'Deadlift': bw * 1.2,
      'Overhead Press': bw * 0.5, 'Barbell Row': bw * 0.7, 'Romanian Deadlift': bw * 0.85,
      'Hip Thrust': bw * 1.0, 'Leg Press': bw * 1.5, 'T-Bar Row': bw * 0.6,
    };
    const base = map[ex.n] || (ex.bw ? 0 : bw * 0.4);
    return Math.round(base * m / 2.5) * 2.5;
  },

  getPrev: function (name, workouts) {
    for (let i = workouts.length - 1; i >= 0; i--) {
      const exs = workouts[i].exercises || [];
      for (let j = 0; j < exs.length; j++) {
        if (exs[j].name === name && exs[j].sets && exs[j].sets.length) return exs[j];
      }
    }
    return null;
  },

  checkPR: function (name, w, r, workouts) {
    let best = 0;
    workouts.forEach(function (wo) {
      (wo.exercises || []).forEach(function (ex) {
        if (ex.name === name) (ex.sets || []).forEach(function (s) {
          if (s.done) { const e = WE.epley(s.weight || 0, s.reps || 1); if (e > best) best = e; }
        });
      });
    });
    return WE.epley(w, r) > best && best > 0;
  },

  buildWorkout: function (user, workouts) {
    const day = WE.getSplitDay(user, workouts);
    if (!day) return [];
    const goal = user.goal || 'hypertrophy';
    return day.exercises.map(function (name) {
      const ex = exById(name);
      const prev = WE.getPrev(name, workouts);
      const setCount = goal === 'strength' ? (ex.diff >= 2 ? 5 : 4) : (ex.diff >= 2 ? 4 : 3);
      const reps = goal === 'strength' ? '3-5' : goal === 'hypertrophy' ? '8-12' : goal === 'fat_loss' ? '12-15' : '6-8';
      let w = WE.suggestWeight(ex, user);
      if (prev && prev.sets && prev.sets[0]) w = prev.sets[0].weight || w;
      if (prev && prev.sets && prev.sets.every(function (s) { return s.done; })) w = Math.round(w * 1.025 / 2.5) * 2.5;
      return { n: ex.n, em: ex.em || '💪', pri: ex.pri, sec: ex.sec, cues: ex.cues, bw: ex.bw, diff: ex.diff, setCount: setCount, reps: reps, weight: w, prev: prev };
    });
  }
};

/* ════════════════════════════════════════
   REST TIMER
════════════════════════════════════════ */
let _restInterval = null;
let _restRemain = 0;
let _restTotal = 90;

function startRestTimer(seconds) {
  _restTotal = seconds;
  _restRemain = seconds;
  clearInterval(_restInterval);

  const overlay = document.getElementById('rest-overlay');
  if (!overlay) return;

  function update() {
    const m = Math.floor(_restRemain / 60);
    const s = _restRemain % 60;
    const pct = (_restRemain / _restTotal) * 100;
    overlay.innerHTML =
      '<div style="font-size:11px;color:var(--txt3);font-weight:700;letter-spacing:.1em;text-transform:uppercase">Rest Timer</div>' +
      '<div style="font-size:88px;font-weight:900;line-height:1;color:var(--accent);font-variant-numeric:tabular-nums">' +
        m + ':' + (s < 10 ? '0' : '') + s +
      '</div>' +
      '<div style="width:200px;height:6px;background:var(--bg4);border-radius:3px;overflow:hidden">' +
        '<div style="height:6px;width:' + pct + '%;background:var(--accent);border-radius:3px;transition:width 1s linear"></div>' +
      '</div>' +
      '<div style="display:flex;gap:12px">' +
        '<button class="btn btn-err btn-sm" onclick="skipRestTimer()">Skip</button>' +
        '<button class="btn btn-secondary btn-sm" onclick="addRestTime(30)">+30s</button>' +
      '</div>';
    overlay.style.display = 'flex';
  }

  update();
  _restInterval = setInterval(function () {
    _restRemain--;
    if (_restRemain <= 0) {
      clearInterval(_restInterval);
      const overlay = document.getElementById('rest-overlay');
      if (overlay) overlay.style.display = 'none';
      try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch (e) {}
      App.toast('Rest complete — time to lift!', 'ok');
      return;
    }
    if (_restRemain === 10) { try { if (navigator.vibrate) navigator.vibrate(50); } catch (e) {} }
    update();
  }, 1000);
}

function skipRestTimer() {
  clearInterval(_restInterval);
  const overlay = document.getElementById('rest-overlay');
  if (overlay) overlay.style.display = 'none';
}

function addRestTime(s) {
  _restRemain += s;
}

/* ════════════════════════════════════════
   WORKOUT STATE
════════════════════════════════════════ */
let _wkt = [];
let _wktActive = false;
let _wktStarted = false;
let _wktStart = null;
let _exGrp = 'all';
let _exQ = '';

/* ════════════════════════════════════════
   WORKOUTS SCREEN
════════════════════════════════════════ */
App.register('workouts', async function () {
  const [user, workouts, templates] = await Promise.all([
    Storage.getUser(),
    Storage.getAll('workouts'),
    Storage.getAll('templates')
  ]);

  const day = WE.getSplitDay(user, workouts);
  const sp = SPLITS[user.split] || SPLITS.ppl;

  /* Build plan if empty */
  if (!_wkt.length) {
    const plan = WE.buildWorkout(user, workouts);
    _wkt = plan.map(function (ex) {
      const rn = parseInt((ex.reps || '8').split('-')[0]) || 8;
      const sets = [];
      for (let i = 0; i < ex.setCount; i++) {
        sets.push({ n: i + 1, w: ex.bw ? 0 : ex.weight, r: rn, done: false });
      }
      return { n: ex.n, em: ex.em, pri: ex.pri, sec: ex.sec, cues: ex.cues, bw: ex.bw, sets: sets, reps: ex.reps, expanded: true, prev: ex.prev };
    });
  }

  /* ── Ready / Start Screen ── */
  if (!_wktStarted) {
    let h = App.topbar(sp.n, 'Day ' + (user.splitDay || 1) + ' · ' + (day ? day.muscles.join(', ') : ''));
    h += '<div style="padding:20px 16px">';

    if (templates.length) {
      h += App.sh('Templates');
      h += '<div class="scroll-row" style="margin-bottom:16px">';
      templates.forEach(function (t) {
        h += '<div class="template-chip" onclick="Wkt.loadTemplate(' + t.id + ')">📋 ' + App.esc(t.name) + '</div>';
      });
      h += '</div>';
    }

    /* Today's plan preview */
    if (day) {
      h += '<div class="card" style="margin:0 0 16px;text-align:center;padding:28px 20px">';
      h += '<div style="font-size:52px;margin-bottom:12px">🏋️</div>';
      h += '<div style="font-size:22px;font-weight:900;letter-spacing:-0.4px;margin-bottom:4px">' + day.n + '</div>';
      h += '<div style="font-size:13px;color:var(--txt3);margin-bottom:20px">' + day.muscles.join(' · ') + '</div>';
      h += '<button class="btn btn-primary" onclick="Wkt.startWorkout()" style="margin-bottom:12px;font-size:16px">Start Workout ⚡</button>';
      h += '<button class="btn btn-secondary btn-sm" onclick="Wkt.reset()" style="margin:0 auto">↺ Rebuild Plan</button>';
      h += '</div>';

      h += App.sh("Today's Exercises");
      h += '<div class="card" style="margin:0 0 16px">';
      _wkt.forEach(function (ex) {
        h += '<div class="exr">';
        h += '<div class="ex-ic">' + ex.em + '</div>';
        h += '<div class="ex-inf"><div class="ex-nm">' + App.esc(ex.n) + '</div>';
        h += '<div class="ex-sub">' + ex.pri + ' · ' + ex.sets.length + ' sets · ' + ex.reps + '</div></div>';
        if (ex.prev && ex.prev.sets && ex.prev.sets[0]) {
          const ps = ex.prev.sets[0];
          h += '<div style="font-size:11px;color:var(--txt3);text-align:right;flex-shrink:0">' +
            (ex.bw ? 'BW' : ps.weight + (user.units === 'imperial' ? 'lbs' : 'kg')) + ' × ' + ps.reps + '</div>';
        }
        h += '</div>';
      });
      h += '</div>';
    }

    h += '<button class="btn btn-secondary" onclick="Wkt.addExercise()" style="font-size:13px;margin-bottom:8px">+ Custom Workout</button>';
    h += '</div>';
    return h;
  }

  /* ── Active Workout Screen ── */
  _wktActive = true;
  const prog = wktProgress();
  const elapsedMin = _wktStart ? Math.round((Date.now() - _wktStart) / 60000) : 0;

  let h = App.topbar(day ? day.n : 'Workout', elapsedMin + ' min active');
  h += '<div style="padding:8px 16px 12px">';
  h += '<div style="display:flex;align-items:center;gap:10px">';
  h += '<div style="flex:1;height:6px;background:var(--bg4);border-radius:3px;overflow:hidden">' +
    '<div id="wkt-pb" style="height:6px;width:' + prog + '%;background:var(--accent);border-radius:3px;transition:width .4s var(--ease)"></div></div>';
  h += '<span style="font-size:12px;color:var(--txt3);font-weight:700">' + prog + '%</span>';
  h += '</div></div>';

  _wkt.forEach(function (ex, ei) {
    const dn = ex.sets.filter(function (s) { return s.done; }).length;
    const allDone = dn === ex.sets.length;
    h += '<div class="card' + (allDone ? ' ex-expanded' : '') + '" id="excard-' + ei + '" style="margin:0 16px 10px">';
    /* Exercise header */
    h += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:' + (ex.expanded ? 14 : 0) + 'px;cursor:pointer" onclick="Wkt.toggleEx(' + ei + ')">';
    h += '<div class="ex-ic" style="' + (allDone ? 'background:var(--ok-glow);border:1px solid rgba(52,199,89,.3)' : '') + '">' + ex.em + '</div>';
    h += '<div style="flex:1;min-width:0">';
    h += '<div style="font-size:17px;font-weight:800;letter-spacing:-0.3px">' + App.esc(ex.n) + '</div>';
    h += '<div style="font-size:11px;margin-top:2px">' +
      '<span style="color:var(--accent);font-weight:700">' + ex.pri + '</span>' +
      (ex.sec ? '<span style="color:var(--txt3)"> · ' + ex.sec + '</span>' : '') +
      '<span style="color:var(--txt3)"> · ' + ex.reps + ' reps</span></div>';
    h += '</div>';
    h += '<div style="text-align:right;flex-shrink:0">';
    h += '<div style="font-size:18px;font-weight:900;color:' + (allDone ? 'var(--ok)' : 'var(--txt3)') + '">' + dn + '/' + ex.sets.length + '</div>';
    h += '<div style="font-size:9px;color:var(--txt3);font-weight:700;letter-spacing:.05em">DONE</div>';
    h += '</div></div>';
    if (ex.expanded) {
      if (ex.prev && ex.prev.sets && ex.prev.sets[0]) {
        const ps = ex.prev.sets[0];
        h += '<div style="background:rgba(10,132,255,0.08);border:1px solid rgba(10,132,255,0.15);border-radius:10px;padding:7px 12px;margin-bottom:10px;font-size:12px;color:var(--txt3)">';
        h += '📊 Last: ' + (ex.bw ? 'Bodyweight' : ps.weight + (user.units === 'imperial' ? ' lbs' : ' kg')) + ' × ' + ps.reps + ' reps</div>';
      }
      /* Sets header */
      h += '<div style="display:grid;grid-template-columns:34px 1fr 1fr 48px;gap:6px;padding:0 4px 6px;margin-bottom:2px">';
      h += '<span style="font-size:9px;color:var(--txt3);font-weight:700;text-align:center">NO.</span>';
      h += '<span style="font-size:9px;color:var(--txt3);font-weight:700;text-align:center">' +
        (ex.bw ? 'BW+KG' : (user.units === 'imperial' ? 'LBS' : 'KG')) + '</span>';
      h += '<span style="font-size:9px;color:var(--txt3);font-weight:700;text-align:center">REPS</span>';
      h += '<span></span></div>';
      ex.sets.forEach(function (set, si) {
        h += '<div class="set-row" id="sr-' + ei + '-' + si + '">';
        h += '<div class="set-n' + (set.done ? ' done' : '') + '">' + set.n + '</div>';
        h += '<input class="set-inp" type="number" inputmode="decimal" value="' + set.w + '" step="2.5"' +
          (ex.bw ? ' placeholder="+0"' : '') + (set.done ? ' disabled' : '') +
          ' oninput="Wkt.sv(' + ei + ',' + si + ',\'w\',this.value)">';
        h += '<input class="set-inp" type="number" inputmode="numeric" value="' + set.r + '" step="1"' + (set.done ? ' disabled' : '') +
          ' oninput="Wkt.sv(' + ei + ',' + si + ',\'r\',this.value)">';
        h += '<button class="set-chk' + (set.done ? ' done' : '') + '" onclick="Wkt.doneSet(' + ei + ',' + si + ')">' +
          (set.done ? App.svgCheck() : '') + '</button>';
        h += '</div>';
      });
      h += '<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">';
      h += '<div style="font-size:12px;color:var(--txt3);font-style:italic;margin-bottom:8px;line-height:1.5">' + App.esc(ex.cues) + '</div>';
      h += '<div style="display:flex;gap:8px;flex-wrap:wrap">';
      h += '<button class="btn btn-secondary btn-xs" onclick="Wkt.addSet(' + ei + ')">+ Set</button>';
      h += '<button class="btn btn-secondary btn-xs" onclick="Wkt.showAlts(' + ei + ')">↔ Swap</button>';
      h += '</div></div>';
    }
    h += '</div>';
  });

  h += '<div style="padding:0 16px;display:flex;gap:8px;margin-bottom:12px">';
  h += '<button class="btn btn-secondary" onclick="Wkt.addExercise()" style="font-size:13px">+ Exercise</button>';
  h += '<button class="btn btn-secondary" onclick="Wkt.saveTemplate()" style="font-size:13px">💾 Template</button>';
  h += '</div>';

  /* Sticky finish button */
  h += '<div style="position:sticky;bottom:calc(var(--nav-h) + var(--safe) + 8px);padding:0 16px 4px;z-index:50;' +
    'background:linear-gradient(to top,var(--bg) 70%,transparent)">';
  h += '<button class="btn btn-primary" onclick="Wkt.finish()" ' +
    'style="box-shadow:0 8px 32px var(--accent-glow);font-size:15px">Finish Workout ✓</button>';
  h += '</div>';
  h += '<div style="height:12px"></div>';
  return h;
});

function wktProgress() {
  if (!_wkt.length) return 0;
  const tot = _wkt.reduce(function (a, e) { return a + e.sets.length; }, 0);
  const dn = _wkt.reduce(function (a, e) { return a + e.sets.filter(function (s) { return s.done; }).length; }, 0);
  return tot ? Math.round(dn / tot * 100) : 0;
}

const Wkt = {
  startWorkout: function () {
    _wktStarted = true;
    _wktStart = Date.now();
    go('workouts');
  },

  toggleEx: function (ei) {
    _wkt[ei].expanded = !_wkt[ei].expanded;
    go('workouts');
  },

  sv: function (ei, si, key, val) {
    _wkt[ei].sets[si][key] = parseFloat(val) || 0;
  },

  doneSet: async function (ei, si) {
    const set = _wkt[ei].sets[si];
    set.done = !set.done;
    App.haptic(30);

    if (set.done) {
      const workouts = await Storage.getAll('workouts');
      if (WE.checkPR(_wkt[ei].n, set.w || 0, set.r || 1, workouts)) {
        const card = document.getElementById('excard-' + ei);
        if (card) {
          const fl = document.createElement('div');
          fl.className = 'pr-flash';
          fl.innerHTML = '<span style="font-size:22px">🏆</span>' +
            '<span style="font-size:14px;font-weight:700;color:var(--ok)">New PR! ' +
            (set.w || 'BW') + ' × ' + set.r + ' reps — ' +
            WE.epley(set.w || 0, set.r || 1) + 'kg est. 1RM</span>';
          card.insertAdjacentElement('afterend', fl);
          setTimeout(function () { if (fl.parentNode) fl.parentNode.removeChild(fl); }, 5000);
        }
        App.toast('🏆 New Personal Record!', 'pr');
        App.haptic([50, 30, 50]);
        await Storage.set('prs', { exercise: _wkt[ei].n, weight: set.w || 0, reps: set.r || 1, estimated1RM: WE.epley(set.w || 0, set.r || 1), date: App.isoNow() });
      }

      const user = await Storage.getUser();
      if (user.restTimer !== false) {
        const secs = user.restSecs || 90;
        App.toast('Rest ' + Math.floor(secs / 60) + ':' + (secs % 60 < 10 ? '0' : '') + (secs % 60) + ' — tap to skip', 'info');
        startRestTimer(secs);
      }
    }

    const pb = document.getElementById('wkt-pb');
    if (pb) pb.style.width = wktProgress() + '%';
    const sr = document.getElementById('sr-' + ei + '-' + si);
    if (sr) {
      const sn = sr.querySelector('.set-n');
      if (sn) sn.className = 'set-n' + (set.done ? ' done' : '');
      const btn = sr.querySelector('.set-chk');
      if (btn) { btn.className = 'set-chk' + (set.done ? ' done' : ''); btn.innerHTML = set.done ? App.svgCheck() : ''; }
      sr.querySelectorAll('.set-inp').forEach(function (inp) { inp.disabled = set.done; });
    }
  },

  addSet: function (ei) {
    const ex = _wkt[ei];
    const last = ex.sets[ex.sets.length - 1];
    ex.sets.push({ n: ex.sets.length + 1, w: last ? last.w : 0, r: last ? last.r : 8, done: false });
    go('workouts');
  },

  showAlts: function (ei) {
    const ex = exById(_wkt[ei].n);
    const alts = (ex.alts || []).length ? ex.alts : exSearch('', ex.grp).filter(function (e) { return e.n !== ex.n; }).slice(0, 4).map(function (e) { return e.n; });
    let m = document.createElement('div'); m.className = 'overlay'; m.id = 'alts-modal';
    let h = '<div class="sheet"><div class="sheet-handle"></div>';
    h += '<div style="font-size:18px;font-weight:800;margin-bottom:16px">Swap: ' + App.esc(_wkt[ei].n) + '</div>';
    alts.slice(0, 5).forEach(function (alt) {
      const ae = exById(alt);
      h += '<div class="exr card-tap" onclick="Wkt.swapEx(' + ei + ',\'' + alt.replace(/'/g, '&#39;') + '\');document.getElementById(\'alts-modal\').remove()">';
      h += '<div class="ex-ic">' + ae.em + '</div>';
      h += '<div class="ex-inf"><div class="ex-nm">' + App.esc(ae.n) + '</div><div class="ex-sub">' + ae.pri + '</div></div></div>';
    });
    h += '<button class="btn btn-secondary mt12" onclick="document.getElementById(\'alts-modal\').remove()">Cancel</button>';
    h += '</div>';
    m.innerHTML = h;
    m.addEventListener('click', function (ev) { if (ev.target === m) m.remove(); });
    document.body.appendChild(m);
  },

  swapEx: function (ei, name) {
    const e = exById(name);
    const old = _wkt[ei];
    _wkt[ei] = Object.assign({}, old, { n: e.n, em: e.em || '💪', pri: e.pri, sec: e.sec, cues: e.cues, bw: e.bw });
    App.toast('Swapped to ' + e.n);
    go('workouts');
  },

  addExercise: function () {
    let m = document.createElement('div'); m.className = 'overlay'; m.id = 'addex-modal';
    let h = '<div class="sheet"><div class="sheet-handle"></div>';
    h += '<div style="font-size:18px;font-weight:800;margin-bottom:12px">Add Exercise</div>';
    h += '<input id="addex-q" class="field mb12" placeholder="Search exercises..." oninput="Wkt._filterAddEx(this.value)">';
    h += '<div id="addex-list">' + Wkt._addExList('') + '</div>';
    h += '</div>';
    m.innerHTML = h;
    m.addEventListener('click', function (ev) { if (ev.target === m) m.remove(); });
    document.body.appendChild(m);
  },

  _filterAddEx: function (q) {
    const list = document.getElementById('addex-list');
    if (list) list.innerHTML = Wkt._addExList(q);
  },

  _addExList: function (q) {
    const results = exSearch(q, 'all').slice(0, 20);
    let h = '';
    results.forEach(function (e) {
      h += '<div class="exr card-tap" onclick="Wkt._addEx(\'' + e.n.replace(/'/g,'&#39;') + '\');document.getElementById(\'addex-modal\').remove()">';
      h += '<div class="ex-ic">' + e.em + '</div>';
      h += '<div class="ex-inf"><div class="ex-nm">' + App.esc(e.n) + '</div><div class="ex-sub">' + e.pri + '</div></div></div>';
    });
    return h || '<p style="color:var(--txt3);padding:16px;text-align:center">No exercises found</p>';
  },

  _addEx: function (name) {
    const e = exById(name);
    _wkt.push({ n: e.n, em: e.em || '💪', pri: e.pri, sec: e.sec, cues: e.cues, bw: e.bw, sets: [{ n: 1, w: 0, r: 8, done: false }], reps: '8-12', expanded: true, prev: null });
    App.toast(e.n + ' added');
    go('workouts');
  },

  saveTemplate: async function () {
    const name = prompt('Template name:', 'My Workout');
    if (!name) return;
    const exercises = _wkt.map(function (ex) { return { name: ex.n, sets: ex.sets.length, reps: ex.reps, weight: ex.sets[0] ? ex.sets[0].w : 0 }; });
    await Storage.set('templates', { name: name.trim(), exercises: exercises, createdAt: App.isoNow() });
    App.toast('Template saved!');
  },

  loadTemplate: async function (id) {
    const template = await Storage.get('templates', id);
    if (!template) return;
    _wkt = template.exercises.map(function (ex) {
      const e = exById(ex.name);
      const sets = [];
      for (let i = 0; i < (ex.sets || 3); i++) {
        sets.push({ n: i + 1, w: ex.weight || 0, r: parseInt((ex.reps || '8').split('-')[0]) || 8, done: false });
      }
      return { n: e.n, em: e.em || '💪', pri: e.pri, sec: e.sec, cues: e.cues, bw: e.bw, sets: sets, reps: ex.reps || '8-12', expanded: true, prev: null };
    });
    _wktActive = true;
    _wktStarted = true;
    _wktStart = Date.now();
    App.toast('Template loaded: ' + template.name);
    go('workouts');
  },

  reset: function () {
    _wkt = [];
    _wktActive = false;
    _wktStarted = false;
    _wktStart = null;
    go('workouts');
  },

  finish: async function () {
    const user = await Storage.getUser();
    const workouts = await Storage.getAll('workouts');
    const exData = _wkt.map(function (ex) {
      const sets = ex.sets.map(function (s) { return { weight: s.w || 0, reps: s.r || 0, done: s.done }; });
      const doneSets = sets.filter(function (s) { return s.done; });
      const vol = doneSets.reduce(function (a, s) { return a + (s.weight * s.reps); }, 0);
      const prCount = doneSets.filter(function (s) { return WE.checkPR(ex.n, s.weight, s.reps, workouts); }).length;
      return { name: ex.n, sets: sets, vol: vol, prCount: prCount };
    });
    const totalVol = exData.reduce(function (a, e) { return a + e.vol; }, 0);
    const duration = _wktStart ? Math.round((Date.now() - _wktStart) / 60000) : 0;
    const day = WE.getSplitDay(user, workouts);
    await Storage.set('workouts', {
      date: App.isoNow(),
      splitDay: day ? day.n : 'Workout',
      exercises: exData,
      totalVol: totalVol,
      duration: duration,
      prCount: exData.reduce(function (a, e) { return a + e.prCount; }, 0)
    });
    user.splitDay = ((user.splitDay || 1) % (SPLITS[user.split] || SPLITS.ppl).days) + 1;
    await Storage.setUser(user);
    _wkt = []; _wktActive = false; _wktStarted = false; _wktStart = null;
    App.haptic([50, 30, 50]);
    App.toast('Workout saved! ' + Math.round(totalVol) + 'kg total volume 💪');
    go('dashboard');
  }
};

/* ════════════════════════════════════════
   EXERCISE LIBRARY SCREEN
════════════════════════════════════════ */
App.register('exercises', async function () {
  const results = exSearch(_exQ, _exGrp);
  let h = App.topbar('Exercise Library', EX_ALL.length + ' exercises');
  h += '<div style="padding:12px 16px 0">';
  h += '<input class="field mb8" placeholder="Search exercises, muscles…" value="' + App.esc(_exQ) + '" oninput="WktLib.search(this.value)">';
  h += '</div>';
  h += '<div class="scroll-row">';
  [{ v: 'all', l: 'All' }, { v: 'chest', l: 'Chest' }, { v: 'back', l: 'Back' }, { v: 'legs', l: 'Legs' },
   { v: 'shoulders', l: 'Shoulders' }, { v: 'biceps', l: 'Biceps' }, { v: 'triceps', l: 'Triceps' },
   { v: 'core', l: 'Core' }, { v: 'glutes', l: 'Glutes' }, { v: 'fullbody', l: 'Full Body' }].forEach(function (f) {
    h += '<button class="pill' + (_exGrp === f.v ? ' on' : '') + '" onclick="WktLib.filter(\'' + f.v + '\')">' + f.l + '</button>';
  });
  h += '</div>';
  h += '<div style="padding:2px 16px 6px;font-size:12px;color:var(--txt3)">' + results.length + ' exercises</div>';
  h += '<div class="card" style="margin:0 16px 16px">';
  if (!results.length) {
    h += '<p style="color:var(--txt3);text-align:center;padding:24px">No exercises found</p>';
  }
  results.slice(0, 60).forEach(function (e) {
    h += '<div class="exr card-tap" onclick="WktLib.detail(\'' + e.n.replace(/'/g, '&#39;') + '\')">';
    h += '<div class="ex-ic">' + e.em + '</div>';
    h += '<div class="ex-inf"><div class="ex-nm">' + App.esc(e.n) + '</div>';
    h += '<div class="ex-sub">' + e.pri + (e.sec ? ' · ' + e.sec : '') + '</div></div>';
    h += '<span class="badge badge-accent">' + ['Beg', 'Int', 'Adv'][e.diff - 1] + '</span>';
    h += '</div>';
  });
  h += '</div>';
  return h;
});

const WktLib = {
  search: function (q) { _exQ = q; go('exercises'); },
  filter: function (grp) { _exGrp = grp; go('exercises'); },
  detail: function (name) {
    const e = exById(name);
    let m = document.createElement('div'); m.className = 'overlay'; m.id = 'ex-detail';
    let h = '<div class="sheet"><div class="sheet-handle"></div>';
    h += '<div style="display:flex;gap:14px;align-items:center;margin-bottom:18px">';
    h += '<div style="width:56px;height:56px;border-radius:18px;background:var(--bg4);display:flex;align-items:center;justify-content:center;font-size:28px">' + e.em + '</div>';
    h += '<div><div style="font-size:20px;font-weight:800">' + App.esc(e.n) + '</div>';
    h += '<div style="font-size:13px;color:var(--txt3)">' + e.pri + (e.sec ? ' · ' + e.sec : '') + '</div></div></div>';
    h += '<div class="g2 mb12">';
    h += '<div class="stat"><div class="sv" style="font-size:14px">' + ['Beginner', 'Intermediate', 'Advanced'][e.diff - 1] + '</div><div class="sl">Difficulty</div></div>';
    h += '<div class="stat"><div class="sv" style="font-size:13px">' + (e.bw ? 'Bodyweight' : (e.eq || []).join(', ') || 'Any') + '</div><div class="sl">Equipment</div></div>';
    h += '</div>';
    h += '<div style="font-size:11px;font-weight:700;letter-spacing:.1em;color:var(--txt3);text-transform:uppercase;margin-bottom:8px">Coaching Cues</div>';
    h += '<div style="background:var(--bg3);border-radius:14px;padding:14px;border-left:3px solid var(--accent);margin-bottom:16px">';
    h += '<p style="font-size:14px;color:var(--txt2);line-height:1.6;margin:0">' + App.esc(e.cues) + '</p></div>';
    h += '<button class="btn btn-primary mb12" onclick="Wkt._addEx(\'' + name.replace(/'/g,'&#39;') + '\');document.getElementById(\'ex-detail\').remove();go(\'workouts\')">Add to Workout</button>';
    h += '<button class="btn btn-secondary" onclick="document.getElementById(\'ex-detail\').remove()">Close</button>';
    h += '</div>';
    m.innerHTML = h;
    m.addEventListener('click', function (ev) { if (ev.target === m) m.remove(); });
    document.body.appendChild(m);
  }
};
