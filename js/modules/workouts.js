'use strict';

/* ═══════════════════════════════════════════════════
   EXERCISE DATABASE — 150+ exercises
═══════════════════════════════════════════════════ */
const ExDB = (function() {
  const db = [
    // CHEST
    {n:'Barbell Bench Press',em:'🏋️',grp:'chest',diff:2,bw:false,eq:['barbell'],pri:'Chest',sec:'Triceps, Front Delts',cues:'Retract scaps, slight arch, drive explosively',joint:{shoulder:2,elbow:2,knee:0,spine:1,hip:0}},
    {n:'Incline Bench Press',em:'💪',grp:'chest',diff:2,bw:false,eq:['barbell'],pri:'Upper Chest',sec:'Triceps, Delts',cues:'30-45° incline, touch upper chest, full lockout',joint:{shoulder:2,elbow:2,knee:0,spine:1,hip:0}},
    {n:'Decline Bench Press',em:'💪',grp:'chest',diff:2,bw:false,eq:['barbell'],pri:'Lower Chest',sec:'Triceps',cues:'Head lower, bar to lower chest, control descent',joint:{shoulder:2,elbow:2,knee:0,spine:1,hip:0}},
    {n:'Dumbbell Bench Press',em:'🏋️',grp:'chest',diff:2,bw:false,eq:['dumbbell'],pri:'Chest',sec:'Triceps, Front Delts',cues:'Neutral grip, elbows 45°, touch chest lightly',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0}},
    {n:'Incline Dumbbell Press',em:'💪',grp:'chest',diff:2,bw:false,eq:['dumbbell'],pri:'Upper Chest',sec:'Front Delts',cues:'Incline 30°, squeeze at top, controlled descent',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0}},
    {n:'Dumbbell Fly',em:'🦅',grp:'chest',diff:2,bw:false,eq:['dumbbell'],pri:'Chest',sec:'Front Delts',cues:'Slight elbow bend, feel full chest stretch, squeeze at peak',joint:{shoulder:3,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Incline Dumbbell Fly',em:'🦅',grp:'chest',diff:2,bw:false,eq:['dumbbell'],pri:'Upper Chest',sec:'Front Delts',cues:'30° incline, arc motion, control the negative',joint:{shoulder:3,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Cable Crossover',em:'🔀',grp:'chest',diff:1,bw:false,eq:['cables'],pri:'Chest',sec:'Front Delts',cues:'Step forward, cross hands, squeeze hard at peak',joint:{shoulder:2,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Cable Fly High',em:'🔀',grp:'chest',diff:1,bw:false,eq:['cables'],pri:'Lower Chest',sec:'Chest',cues:'High cables, arc downward, chest stretch at start',joint:{shoulder:2,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Cable Fly Low',em:'🔀',grp:'chest',diff:1,bw:false,eq:['cables'],pri:'Upper Chest',sec:'Chest',cues:'Low cables, arc upward, squeeze at top',joint:{shoulder:2,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Push-Ups',em:'🤸',grp:'chest',diff:1,bw:true,eq:['none'],pri:'Chest',sec:'Triceps, Core',cues:'Rigid plank, elbows 45°, chest to floor',joint:{shoulder:1,elbow:1,knee:0,spine:1,hip:0}},
    {n:'Wide Push-Ups',em:'🤸',grp:'chest',diff:1,bw:true,eq:['none'],pri:'Chest',sec:'Front Delts',cues:'Hands wider than shoulder, emphasise chest squeeze',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0}},
    {n:'Chest Dips',em:'💎',grp:'chest',diff:2,bw:true,eq:['bar'],pri:'Lower Chest',sec:'Triceps',cues:'Lean forward, wide dip bars, feel chest stretch at bottom',joint:{shoulder:3,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Pec Deck Machine',em:'🦅',grp:'chest',diff:1,bw:false,eq:['machine'],pri:'Chest',sec:'Front Delts',cues:'Keep arms at chest height, full range, squeeze peak',joint:{shoulder:2,elbow:0,knee:0,spine:0,hip:0}},
    // BACK
    {n:'Deadlift',em:'🏋️',grp:'back',diff:3,bw:false,eq:['barbell'],pri:'Back',sec:'Glutes, Hamstrings, Traps',cues:'Bar over mid-foot, hinge to bar, drive hips through',joint:{shoulder:1,elbow:0,knee:1,spine:3,hip:2}},
    {n:'Barbell Row',em:'🚣',grp:'back',diff:3,bw:false,eq:['barbell'],pri:'Back',sec:'Biceps, Rear Delts',cues:'Hip hinge 45°, pull to lower chest, elbows back',joint:{shoulder:1,elbow:1,knee:0,spine:2,hip:1}},
    {n:'Pendlay Row',em:'🚣',grp:'back',diff:3,bw:false,eq:['barbell'],pri:'Back',sec:'Rear Delts, Biceps',cues:'Bar starts floor each rep, explosive pull, horizontal torso',joint:{shoulder:1,elbow:1,knee:0,spine:2,hip:1}},
    {n:'T-Bar Row',em:'🚣',grp:'back',diff:2,bw:false,eq:['barbell'],pri:'Back',sec:'Biceps, Rear Delts',cues:'Chest on pad, drive elbows back, full contraction',joint:{shoulder:1,elbow:1,knee:0,spine:2,hip:0}},
    {n:'Pull-Ups',em:'🐒',grp:'back',diff:2,bw:true,eq:['bar'],pri:'Lats',sec:'Biceps, Rear Delts',cues:'Dead hang start, drive elbows to hips, chin over bar',joint:{shoulder:2,elbow:2,knee:0,spine:1,hip:0}},
    {n:'Chin-Ups',em:'🐒',grp:'back',diff:2,bw:true,eq:['bar'],pri:'Lats',sec:'Biceps',cues:'Underhand grip, supinate at top, full dead hang',joint:{shoulder:2,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Lat Pulldown',em:'🔽',grp:'back',diff:1,bw:false,eq:['cables'],pri:'Lats',sec:'Biceps, Rear Delts',cues:'Slight lean back, pull to upper chest, elbows to sides',joint:{shoulder:1,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Seated Cable Row',em:'🚣',grp:'back',diff:1,bw:false,eq:['cables'],pri:'Back',sec:'Biceps, Rear Delts',cues:'Tall posture, retract scaps first, pull to navel',joint:{shoulder:1,elbow:1,knee:0,spine:1,hip:0}},
    {n:'Single Arm Dumbbell Row',em:'🚣',grp:'back',diff:1,bw:false,eq:['dumbbell'],pri:'Back',sec:'Biceps',cues:'Flat back, pull to hip, elbow grazes body',joint:{shoulder:1,elbow:1,knee:0,spine:1,hip:0}},
    {n:'Chest Supported Row',em:'🚣',grp:'back',diff:1,bw:false,eq:['dumbbell'],pri:'Back',sec:'Rear Delts',cues:'Chest on pad removes lower back, full range',joint:{shoulder:1,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Face Pull',em:'🎯',grp:'back',diff:1,bw:false,eq:['cables'],pri:'Rear Delts',sec:'Traps, Rotator Cuff',cues:'Rope at face height, external rotate, elbows high',joint:{shoulder:1,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Straight Arm Pulldown',em:'🔽',grp:'back',diff:1,bw:false,eq:['cables'],pri:'Lats',sec:'Rear Delts',cues:'Arms straight, hinge at shoulder only, lat stretch',joint:{shoulder:2,elbow:0,knee:0,spine:0,hip:0}},
    {n:'Rack Pull',em:'🏋️',grp:'back',diff:3,bw:false,eq:['barbell'],pri:'Traps',sec:'Back, Glutes',cues:'Bar at knee height, drive hips, massive trap contraction',joint:{shoulder:1,elbow:0,knee:0,spine:3,hip:1}},
    {n:'Seal Row',em:'🚣',grp:'back',diff:1,bw:false,eq:['barbell'],pri:'Back',sec:'Rear Delts',cues:'Chest on elevated bench, strict pull, no leg drive',joint:{shoulder:1,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Cable Row Wide',em:'🚣',grp:'back',diff:1,bw:false,eq:['cables'],pri:'Upper Back',sec:'Rear Delts',cues:'Wide handle, pull to chest, retract scaps hard',joint:{shoulder:1,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Meadows Row',em:'🚣',grp:'back',diff:2,bw:false,eq:['barbell'],pri:'Back',sec:'Biceps',cues:'Landmine setup, stand perpendicular, high elbow pull',joint:{shoulder:1,elbow:1,knee:0,spine:1,hip:0}},
    // LEGS
    {n:'Barbell Squat',em:'🏋️',grp:'legs',diff:3,bw:false,eq:['barbell'],pri:'Quads',sec:'Glutes, Hamstrings, Core',cues:'Brace core, break at hips and knees together, depth',joint:{shoulder:1,elbow:0,knee:3,spine:2,hip:2}},
    {n:'Front Squat',em:'🏋️',grp:'legs',diff:3,bw:false,eq:['barbell'],pri:'Quads',sec:'Core, Upper Back',cues:'Elbows high, torso vertical, deep squat, wrist flexibility',joint:{shoulder:2,elbow:2,knee:3,spine:2,hip:2}},
    {n:'Romanian Deadlift',em:'🏋️',grp:'legs',diff:2,bw:false,eq:['barbell'],pri:'Hamstrings',sec:'Glutes, Back',cues:'Hinge not squat, bar drags shins, feel hamstring stretch',joint:{shoulder:0,elbow:0,knee:1,spine:2,hip:2}},
    {n:'Leg Press',em:'⬛',grp:'legs',diff:1,bw:false,eq:['machine'],pri:'Quads',sec:'Glutes, Hamstrings',cues:'Feet shoulder width, full depth, never lock knees',joint:{shoulder:0,elbow:0,knee:3,spine:1,hip:2}},
    {n:'Bulgarian Split Squat',em:'🦵',grp:'legs',diff:3,bw:false,eq:['dumbbell'],pri:'Quads',sec:'Glutes, Hamstrings',cues:'Rear foot elevated, sink deep, knee tracks toe',joint:{shoulder:0,elbow:0,knee:3,spine:1,hip:2}},
    {n:'Hack Squat',em:'⬛',grp:'legs',diff:2,bw:false,eq:['machine'],pri:'Quads',sec:'Glutes',cues:'Full depth, drive through heels, quad focus',joint:{shoulder:0,elbow:0,knee:3,spine:1,hip:2}},
    {n:'Leg Curl Lying',em:'🦵',grp:'legs',diff:1,bw:false,eq:['machine'],pri:'Hamstrings',sec:'Calves',cues:'Hips down, full curl, squeeze at peak',joint:{shoulder:0,elbow:0,knee:2,spine:0,hip:0}},
    {n:'Leg Curl Seated',em:'🦵',grp:'legs',diff:1,bw:false,eq:['machine'],pri:'Hamstrings',sec:'Calves',cues:'Seated version, both feet, full range',joint:{shoulder:0,elbow:0,knee:2,spine:0,hip:0}},
    {n:'Leg Extension',em:'🦵',grp:'legs',diff:1,bw:false,eq:['machine'],pri:'Quads',sec:'',cues:'Lock out at top, slow negative, knee stays in line',joint:{shoulder:0,elbow:0,knee:3,spine:0,hip:0}},
    {n:'Hip Thrust',em:'🍑',grp:'legs',diff:2,bw:false,eq:['barbell'],pri:'Glutes',sec:'Hamstrings',cues:'Bar at hip crease, drive hips to ceiling, squeeze at top',joint:{shoulder:0,elbow:0,knee:1,spine:0,hip:2}},
    {n:'Barbell Hip Thrust',em:'🍑',grp:'legs',diff:2,bw:false,eq:['barbell'],pri:'Glutes',sec:'Hamstrings',cues:'Shoulders on bench, bar padded, posterior pelvic tilt at top',joint:{shoulder:0,elbow:0,knee:1,spine:0,hip:2}},
    {n:'Walking Lunges',em:'🚶',grp:'legs',diff:2,bw:false,eq:['dumbbell'],pri:'Quads',sec:'Glutes, Hamstrings',cues:'Long stride, knee to inch of floor, upright torso',joint:{shoulder:0,elbow:0,knee:3,spine:1,hip:2}},
    {n:'Reverse Lunge',em:'🚶',grp:'legs',diff:2,bw:false,eq:['dumbbell'],pri:'Quads',sec:'Glutes',cues:'Step back, front knee tracks toe, return to start',joint:{shoulder:0,elbow:0,knee:2,spine:1,hip:2}},
    {n:'Step-Ups',em:'🪜',grp:'legs',diff:2,bw:false,eq:['dumbbell'],pri:'Quads',sec:'Glutes',cues:'Drive through heel, full hip extension at top',joint:{shoulder:0,elbow:0,knee:2,spine:0,hip:2}},
    {n:'Calf Raise Standing',em:'🦶',grp:'legs',diff:1,bw:false,eq:['machine'],pri:'Calves',sec:'',cues:'Full stretch at bottom, explosive rise, hold at top',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:0}},
    {n:'Seated Calf Raise',em:'🦶',grp:'legs',diff:1,bw:false,eq:['machine'],pri:'Soleus',sec:'Calves',cues:'Pad on lower quad, full range, slow negative',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:0}},
    {n:'Goblet Squat',em:'🏋️',grp:'legs',diff:1,bw:false,eq:['kettlebell','dumbbell'],pri:'Quads',sec:'Glutes, Core',cues:'Elbows in, sit between knees, tall torso',joint:{shoulder:1,elbow:1,knee:3,spine:1,hip:2}},
    {n:'Nordic Curl',em:'🦵',grp:'legs',diff:3,bw:true,eq:['bar'],pri:'Hamstrings',sec:'Glutes',cues:'Feet anchored, lower slowly, push up with hands',joint:{shoulder:0,elbow:0,knee:3,spine:0,hip:0}},
    // SHOULDERS
    {n:'Overhead Press Barbell',em:'🏋️',grp:'shoulders',diff:3,bw:false,eq:['barbell'],pri:'Front Delts',sec:'Triceps, Upper Traps',cues:'Bar from rack, vertical forearms, press to lockout',joint:{shoulder:3,elbow:2,knee:0,spine:2,hip:0}},
    {n:'Dumbbell Shoulder Press',em:'💪',grp:'shoulders',diff:2,bw:false,eq:['dumbbell'],pri:'Delts',sec:'Triceps',cues:'90° start, press overhead, slight forward lean ok',joint:{shoulder:3,elbow:2,knee:0,spine:1,hip:0}},
    {n:'Arnold Press',em:'💪',grp:'shoulders',diff:2,bw:false,eq:['dumbbell'],pri:'Delts',sec:'Triceps',cues:'Rotate palms during press, hits all three delt heads',joint:{shoulder:3,elbow:2,knee:0,spine:1,hip:0}},
    {n:'Lateral Raise',em:'🦅',grp:'shoulders',diff:1,bw:false,eq:['dumbbell'],pri:'Side Delts',sec:'',cues:'Slight elbow bend, pinky high, stop at shoulder height',joint:{shoulder:2,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Cable Lateral Raise',em:'🔀',grp:'shoulders',diff:1,bw:false,eq:['cables'],pri:'Side Delts',sec:'',cues:'Cable at hip, arc up, constant tension advantage',joint:{shoulder:2,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Leaning Lateral Raise',em:'🦅',grp:'shoulders',diff:1,bw:false,eq:['dumbbell'],pri:'Side Delts',sec:'',cues:'Hold support, lean away, extended range of motion',joint:{shoulder:2,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Rear Delt Fly',em:'🦅',grp:'shoulders',diff:1,bw:false,eq:['dumbbell'],pri:'Rear Delts',sec:'Traps',cues:'Hip hinge, arms arc back, squeeze rear delts',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0}},
    {n:'Cable Rear Delt Fly',em:'🔀',grp:'shoulders',diff:1,bw:false,eq:['cables'],pri:'Rear Delts',sec:'',cues:'Cross cables, pull to sides, keep arms nearly straight',joint:{shoulder:2,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Upright Row',em:'🚣',grp:'shoulders',diff:2,bw:false,eq:['barbell'],pri:'Side Delts',sec:'Traps',cues:'Close grip, pull to chin, elbows above bar',joint:{shoulder:3,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Push Press',em:'🏋️',grp:'shoulders',diff:3,bw:false,eq:['barbell'],pri:'Delts',sec:'Triceps, Legs',cues:'Dip and drive with legs, press overhead at top',joint:{shoulder:3,elbow:2,knee:2,spine:2,hip:0}},
    {n:'Cable Y-Raise',em:'🔀',grp:'shoulders',diff:1,bw:false,eq:['cables'],pri:'Rear Delts',sec:'Lower Traps',cues:'Low cable, Y shape overhead, retract scaps',joint:{shoulder:2,elbow:1,knee:0,spine:0,hip:0}},
    {n:'Plate Front Raise',em:'🏋️',grp:'shoulders',diff:1,bw:false,eq:['barbell'],pri:'Front Delts',sec:'',cues:'Arms straight, raise to eye level, lower controlled',joint:{shoulder:2,elbow:0,knee:0,spine:0,hip:0}},
    // BICEPS
    {n:'Barbell Curl',em:'💪',grp:'biceps',diff:1,bw:false,eq:['barbell'],pri:'Biceps',sec:'Brachialis',cues:'Elbows pinned, curl to chin, squeeze, slow negative',joint:{shoulder:0,elbow:2,knee:0,spine:0,hip:0}},
    {n:'EZ-Bar Curl',em:'💪',grp:'biceps',diff:1,bw:false,eq:['barbell'],pri:'Biceps',sec:'Brachialis',cues:'EZ angle reduces wrist strain, full range',joint:{shoulder:0,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Dumbbell Curl',em:'💪',grp:'biceps',diff:1,bw:false,eq:['dumbbell'],pri:'Biceps',sec:'Brachialis',cues:'Supinate as you curl, peak contraction at top',joint:{shoulder:0,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Incline Dumbbell Curl',em:'💪',grp:'biceps',diff:2,bw:false,eq:['dumbbell'],pri:'Biceps Long Head',sec:'',cues:'Incline seat, arms hang back, deep stretch at bottom',joint:{shoulder:1,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Hammer Curl',em:'🔨',grp:'biceps',diff:1,bw:false,eq:['dumbbell'],pri:'Brachialis',sec:'Biceps',cues:'Neutral grip throughout, brachialis focus',joint:{shoulder:0,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Cable Curl',em:'🔀',grp:'biceps',diff:1,bw:false,eq:['cables'],pri:'Biceps',sec:'',cues:'Constant tension, elbows fixed, full squeeze',joint:{shoulder:0,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Preacher Curl',em:'💺',grp:'biceps',diff:1,bw:false,eq:['machine','barbell'],pri:'Biceps Short Head',sec:'',cues:'Arms on pad, full stretch at bottom, no cheat',joint:{shoulder:0,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Concentration Curl',em:'💪',grp:'biceps',diff:1,bw:false,eq:['dumbbell'],pri:'Biceps',sec:'',cues:'Elbow on inner knee, full range, max squeeze',joint:{shoulder:0,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Spider Curl',em:'🕷️',grp:'biceps',diff:2,bw:false,eq:['dumbbell'],pri:'Biceps Short Head',sec:'',cues:'Chest on incline bench, arms hang freely, strict curl',joint:{shoulder:0,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Zottman Curl',em:'🔄',grp:'biceps',diff:1,bw:false,eq:['dumbbell'],pri:'Biceps',sec:'Brachioradialis',cues:'Curl up supine, rotate to pronate at top, lower slowly',joint:{shoulder:0,elbow:2,knee:0,spine:0,hip:0}},
    // TRICEPS
    {n:'Close Grip Bench Press',em:'🏋️',grp:'triceps',diff:2,bw:false,eq:['barbell'],pri:'Triceps',sec:'Chest, Front Delts',cues:'Shoulder width grip, elbows tucked, lockout hard',joint:{shoulder:2,elbow:2,knee:0,spine:1,hip:0}},
    {n:'Rope Pushdown',em:'🔀',grp:'triceps',diff:1,bw:false,eq:['cables'],pri:'Triceps',sec:'',cues:'Spread rope at bottom, elbows pinned, full lockout',joint:{shoulder:0,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Bar Pushdown',em:'🔀',grp:'triceps',diff:1,bw:false,eq:['cables'],pri:'Triceps',sec:'',cues:'Bar at chest, push to lockout, elbows fixed',joint:{shoulder:0,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Overhead Tricep Extension',em:'💪',grp:'triceps',diff:2,bw:false,eq:['dumbbell','cables'],pri:'Triceps Long Head',sec:'',cues:'Arms behind head, full stretch, extend to lockout',joint:{shoulder:3,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Skull Crusher',em:'💀',grp:'triceps',diff:2,bw:false,eq:['barbell'],pri:'Triceps',sec:'',cues:'EZ bar to forehead, elbows fixed, control descent',joint:{shoulder:2,elbow:3,knee:0,spine:1,hip:0}},
    {n:'JM Press',em:'🏋️',grp:'triceps',diff:2,bw:false,eq:['barbell'],pri:'Triceps',sec:'',cues:'Hybrid of skull crusher and close grip, elbows forward',joint:{shoulder:2,elbow:2,knee:0,spine:1,hip:0}},
    {n:'Tricep Dips',em:'💎',grp:'triceps',diff:2,bw:true,eq:['bar'],pri:'Triceps',sec:'Chest',cues:'Upright torso, elbows close, full lockout at top',joint:{shoulder:3,elbow:2,knee:0,spine:0,hip:0}},
    {n:'Diamond Push-Ups',em:'💎',grp:'triceps',diff:2,bw:true,eq:['none'],pri:'Triceps',sec:'Chest',cues:'Diamond hand position, elbows track back, full lockout',joint:{shoulder:2,elbow:2,knee:0,spine:1,hip:0}},
    {n:'Cable Kickback',em:'🔀',grp:'triceps',diff:1,bw:false,eq:['cables'],pri:'Triceps',sec:'',cues:'Hinge forward, elbow pinned, extend to lockout',joint:{shoulder:0,elbow:2,knee:0,spine:1,hip:0}},
    {n:'Overhead DB Extension',em:'💪',grp:'triceps',diff:1,bw:false,eq:['dumbbell'],pri:'Triceps Long Head',sec:'',cues:'One dumbbell, arms by ears, deep stretch, lockout',joint:{shoulder:3,elbow:2,knee:0,spine:0,hip:0}},
    // CORE
    {n:'Plank',em:'🪵',grp:'core',diff:1,bw:true,eq:['none'],pri:'Core',sec:'Shoulders',cues:'Neutral spine, squeeze glutes, breathe deep',joint:{shoulder:1,elbow:1,knee:0,spine:1,hip:0}},
    {n:'Side Plank',em:'🪵',grp:'core',diff:2,bw:true,eq:['none'],pri:'Obliques',sec:'Core',cues:'Hip high, no rotation, elbow under shoulder',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0}},
    {n:'Ab Wheel',em:'⚙️',grp:'core',diff:3,bw:true,eq:['none'],pri:'Core',sec:'Shoulders, Lats',cues:'From knees, extend until flat, pull back hard',joint:{shoulder:2,elbow:1,knee:0,spine:2,hip:0}},
    {n:'Cable Crunch',em:'🔀',grp:'core',diff:1,bw:false,eq:['cables'],pri:'Abs',sec:'',cues:'Kneel at cable, crunch elbows to knees, no hip flex',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:0}},
    {n:'Hanging Leg Raise',em:'🐒',grp:'core',diff:3,bw:true,eq:['bar'],pri:'Abs',sec:'Hip Flexors',cues:'Dead hang, raise legs to parallel, control down',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:2}},
    {n:'Leg Raise Floor',em:'🏃',grp:'core',diff:2,bw:true,eq:['none'],pri:'Lower Abs',sec:'Hip Flexors',cues:'Lower back pressed down, legs nearly touch floor',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:2}},
    {n:'Bicycle Crunch',em:'🚴',grp:'core',diff:1,bw:true,eq:['none'],pri:'Obliques',sec:'Abs',cues:'Opposite elbow to knee, full rotation, controlled tempo',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:1}},
    {n:'Russian Twist',em:'🔄',grp:'core',diff:1,bw:true,eq:['none'],pri:'Obliques',sec:'Abs',cues:'Heels off floor, rotate fully, controlled rhythm',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:0}},
    {n:'Dead Bug',em:'🐛',grp:'core',diff:2,bw:true,eq:['none'],pri:'Core',sec:'',cues:'Lower back flat, extend opposite arm/leg, breathe out',joint:{shoulder:1,elbow:0,knee:0,spine:1,hip:1}},
    {n:'Dragon Flag',em:'🐉',grp:'core',diff:3,bw:true,eq:['bar'],pri:'Core',sec:'Lats',cues:'Hold bench overhead, body rigid, lower controlled',joint:{shoulder:2,elbow:1,knee:0,spine:2,hip:0}},
    {n:'V-Ups',em:'✌️',grp:'core',diff:2,bw:true,eq:['none'],pri:'Abs',sec:'Hip Flexors',cues:'Meet hands and feet at top, controlled descent',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:2}},
    {n:'Pallof Press',em:'🔀',grp:'core',diff:2,bw:false,eq:['cables'],pri:'Core',sec:'Obliques',cues:'Stand perpendicular to cable, press out, resist rotation',joint:{shoulder:1,elbow:0,knee:0,spine:1,hip:0}},
    // GLUTES
    {n:'Glute Bridge',em:'🍑',grp:'glutes',diff:1,bw:true,eq:['none'],pri:'Glutes',sec:'Hamstrings',cues:'Feet flat, drive hips, squeeze at top, tilt pelvis',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:2}},
    {n:'Cable Kickback Glutes',em:'🔀',grp:'glutes',diff:1,bw:false,eq:['cables'],pri:'Glutes',sec:'Hamstrings',cues:'Ankle cuff, hinge forward, kick back to full extension',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:2}},
    {n:'Clamshell',em:'🦪',grp:'glutes',diff:1,bw:true,eq:['bands'],pri:'Glute Med',sec:'Hip Rotators',cues:'Side lying, feet together, rotate top knee up',joint:{shoulder:0,elbow:0,knee:1,spine:0,hip:2}},
    {n:'Donkey Kick',em:'🦵',grp:'glutes',diff:1,bw:true,eq:['none'],pri:'Glutes',sec:'',cues:'On all fours, kick heel to ceiling, squeeze hard',joint:{shoulder:0,elbow:0,knee:1,spine:0,hip:2}},
    {n:'Sumo Squat',em:'🦵',grp:'glutes',diff:1,bw:false,eq:['dumbbell'],pri:'Glutes',sec:'Inner Thighs, Quads',cues:'Wide stance, toes out 45°, drop weight between legs',joint:{shoulder:0,elbow:0,knee:2,spine:1,hip:2}},
    {n:'Hip Abduction Machine',em:'⬛',grp:'glutes',diff:1,bw:false,eq:['machine'],pri:'Glute Med',sec:'Hip Abductors',cues:'Full abduction range, slow and controlled',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:2}},
    {n:'Lateral Band Walk',em:'🦀',grp:'glutes',diff:1,bw:false,eq:['bands'],pri:'Glute Med',sec:'',cues:'Band above knees, squat partial, step sideways',joint:{shoulder:0,elbow:0,knee:1,spine:0,hip:2}},
    {n:'Frog Pump',em:'🐸',grp:'glutes',diff:1,bw:true,eq:['none'],pri:'Glutes',sec:'',cues:'Soles of feet together, drive hips up, glute squeeze',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:2}},
    // FULLBODY
    {n:'Clean and Press',em:'🏋️',grp:'fullbody',diff:3,bw:false,eq:['barbell'],pri:'Full Body',sec:'Delts, Legs, Core',cues:'Hip hinge clean, rack, drive press overhead',joint:{shoulder:3,elbow:2,knee:2,spine:2,hip:2}},
    {n:'Turkish Get-Up',em:'🤸',grp:'fullbody',diff:3,bw:false,eq:['kettlebell'],pri:'Full Body',sec:'Core, Shoulders',cues:'Arm locked, follow the pattern, slow deliberate',joint:{shoulder:2,elbow:1,knee:2,spine:2,hip:2}},
    {n:'Kettlebell Swing',em:'⚡',grp:'fullbody',diff:2,bw:false,eq:['kettlebell'],pri:'Glutes',sec:'Hamstrings, Core',cues:'Hip hinge, explosive snap, bell at eye level',joint:{shoulder:1,elbow:0,knee:1,spine:2,hip:2}},
    {n:'Man Maker',em:'💪',grp:'fullbody',diff:3,bw:false,eq:['dumbbell'],pri:'Full Body',sec:'',cues:'Plank, row each side, push up, clean, press',joint:{shoulder:2,elbow:2,knee:1,spine:2,hip:1}},
    {n:'Thruster',em:'🚀',grp:'fullbody',diff:3,bw:false,eq:['barbell'],pri:'Quads',sec:'Delts, Glutes',cues:'Front squat into overhead press in one fluid motion',joint:{shoulder:3,elbow:2,knee:3,spine:2,hip:2}},
    {n:'Deadlift Conventional',em:'🏋️',grp:'fullbody',diff:3,bw:false,eq:['barbell'],pri:'Back',sec:'Glutes, Hamstrings',cues:'Conventional stance, bar over mid-foot, hip hinge',joint:{shoulder:1,elbow:0,knee:1,spine:3,hip:2}},
    // REHAB
    {n:'Band Pull Apart',em:'🎗️',grp:'rehab',diff:1,bw:false,eq:['bands'],pri:'Rear Delts',sec:'Rotator Cuff',cues:'Arms forward, pull band apart, squeeze scaps',joint:{shoulder:1,elbow:0,knee:0,spine:0,hip:0}},
    {n:'Wall Slide',em:'🧱',grp:'rehab',diff:1,bw:true,eq:['none'],pri:'Rotator Cuff',sec:'Serratus',cues:'Forearms on wall, slide up maintaining contact',joint:{shoulder:1,elbow:0,knee:0,spine:0,hip:0}},
    {n:'External Rotation',em:'🔄',grp:'rehab',diff:1,bw:false,eq:['bands'],pri:'Rotator Cuff',sec:'',cues:'Elbow at 90°, rotate out, control return',joint:{shoulder:1,elbow:0,knee:0,spine:0,hip:0}},
    {n:'Y-T-W Raise',em:'✋',grp:'rehab',diff:1,bw:true,eq:['none'],pri:'Lower Traps',sec:'Rear Delts',cues:'Prone or incline, form each letter with arms',joint:{shoulder:1,elbow:0,knee:0,spine:0,hip:0}},
    {n:'Hip 90-90 Stretch',em:'🧘',grp:'rehab',diff:1,bw:true,eq:['none'],pri:'Hip Rotators',sec:'Glutes',cues:'90° both legs, upright posture, breathe deeply',joint:{shoulder:0,elbow:0,knee:1,spine:0,hip:1}},
    {n:'Clamshell Rehab',em:'🦪',grp:'rehab',diff:1,bw:false,eq:['bands'],pri:'Glute Med',sec:'Hip Rotators',cues:'Light band, pain-free range, activate not strain',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:1}},
    {n:'Dead Bug Rehab',em:'🐛',grp:'rehab',diff:1,bw:true,eq:['none'],pri:'Core',sec:'',cues:'Slow breathing pattern, maintain lumbar contact',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:0}},
    {n:'Bird Dog',em:'🐦',grp:'rehab',diff:1,bw:true,eq:['none'],pri:'Core',sec:'Glutes',cues:'On all fours, extend opposite arm/leg, hold 2s',joint:{shoulder:1,elbow:0,knee:0,spine:1,hip:0}},
  ];

  return {
    all: db,
    byName(name) {
      return db.find(e => e.n.toLowerCase() === (name||'').toLowerCase()) || { n:name, em:'💪', grp:'chest', diff:1, bw:false, eq:[], pri:'Chest', sec:'', cues:'', joint:{} };
    },
    search(query, grp) {
      let res = db;
      if (grp && grp !== 'all') res = res.filter(e => e.grp === grp);
      if (query) {
        const q = query.toLowerCase();
        res = res.filter(e => e.n.toLowerCase().includes(q) || (e.pri||'').toLowerCase().includes(q) || (e.sec||'').toLowerCase().includes(q));
      }
      return res;
    },
    forEquipment(equipment) {
      if (!equipment || !equipment.length) return db;
      return db.filter(e => e.bw || (e.eq || []).some(eq => equipment.includes(eq)));
    },
    safeFor(injuries) {
      const active = (injuries||[]).filter(i => !i.recovered);
      if (!active.length) return db;
      return db.filter(e => {
        const j = e.joint || {};
        return !active.some(inj => {
          if (/shoulder/i.test(inj.bodyPart) && (j.shoulder||0) >= 2) return true;
          if (/knee/i.test(inj.bodyPart) && (j.knee||0) >= 2) return true;
          if (/back/i.test(inj.bodyPart) && (j.spine||0) >= 2) return true;
          if (/elbow/i.test(inj.bodyPart) && (j.elbow||0) >= 2) return true;
          if (/hip/i.test(inj.bodyPart) && (j.hip||0) >= 2) return true;
          return false;
        });
      });
    },
    groups() { return [...new Set(db.map(e => e.grp))]; }
  };
})();
window.ExDB = ExDB;

/* ═══════════════════════════════════════════════════
   SPLITS DATABASE
═══════════════════════════════════════════════════ */
const SPLITS = {
  ppl: {
    n:'Push Pull Legs', days:6,
    schedule:[
      {n:'Push Day A',muscles:['chest','shoulders','triceps'],exercises:['Barbell Bench Press','Overhead Press Barbell','Rope Pushdown','Lateral Raise','Incline Dumbbell Press','Cable Fly High']},
      {n:'Pull Day A',muscles:['back','biceps'],exercises:['Deadlift','Pull-Ups','Seated Cable Row','Barbell Curl','Face Pull','Hammer Curl']},
      {n:'Leg Day A',muscles:['legs','glutes'],exercises:['Barbell Squat','Romanian Deadlift','Leg Press','Leg Curl Lying','Calf Raise Standing','Hip Thrust']},
      {n:'Push Day B',muscles:['chest','shoulders','triceps'],exercises:['Incline Bench Press','Dumbbell Shoulder Press','Skull Crusher','Cable Crossover','Cable Lateral Raise','Tricep Dips']},
      {n:'Pull Day B',muscles:['back','biceps'],exercises:['Barbell Row','Lat Pulldown','Single Arm Dumbbell Row','EZ-Bar Curl','Straight Arm Pulldown','Spider Curl']},
      {n:'Leg Day B',muscles:['legs','glutes'],exercises:['Bulgarian Split Squat','Hack Squat','Leg Extension','Seated Calf Raise','Walking Lunges','Glute Bridge']},
    ]
  },
  ul: {
    n:'Upper Lower', days:4,
    schedule:[
      {n:'Upper A',muscles:['chest','back','shoulders'],exercises:['Barbell Bench Press','Barbell Row','Overhead Press Barbell','Pull-Ups','Lateral Raise','Cable Crossover']},
      {n:'Lower A',muscles:['legs','glutes'],exercises:['Barbell Squat','Romanian Deadlift','Leg Press','Leg Curl Lying','Hip Thrust','Calf Raise Standing']},
      {n:'Upper B',muscles:['chest','back','biceps','triceps'],exercises:['Incline Dumbbell Press','Seated Cable Row','Rope Pushdown','Barbell Curl','Rear Delt Fly','Lat Pulldown']},
      {n:'Lower B',muscles:['legs','glutes'],exercises:['Bulgarian Split Squat','Leg Extension','Leg Curl Seated','Walking Lunges','Barbell Hip Thrust','Nordic Curl']},
    ]
  },
  fb: {
    n:'Full Body', days:3,
    schedule:[
      {n:'Full Body A',muscles:['chest','back','legs'],exercises:['Barbell Bench Press','Barbell Row','Barbell Squat','Overhead Press Barbell','Deadlift','Plank']},
      {n:'Full Body B',muscles:['chest','back','legs'],exercises:['Incline Dumbbell Press','Pull-Ups','Romanian Deadlift','Dumbbell Shoulder Press','Leg Press','Ab Wheel']},
      {n:'Full Body C',muscles:['chest','back','legs'],exercises:['Dumbbell Bench Press','Lat Pulldown','Bulgarian Split Squat','Arnold Press','Hip Thrust','Cable Crunch']},
    ]
  },
  bro: {
    n:'Bro Split', days:5,
    schedule:[
      {n:'Chest Day',muscles:['chest'],exercises:['Barbell Bench Press','Incline Bench Press','Dumbbell Fly','Cable Crossover','Push-Ups','Pec Deck Machine']},
      {n:'Back Day',muscles:['back'],exercises:['Deadlift','Pull-Ups','Barbell Row','Lat Pulldown','Seated Cable Row','Face Pull']},
      {n:'Shoulder Day',muscles:['shoulders'],exercises:['Overhead Press Barbell','Lateral Raise','Rear Delt Fly','Arnold Press','Cable Lateral Raise','Upright Row']},
      {n:'Arm Day',muscles:['biceps','triceps'],exercises:['Barbell Curl','Rope Pushdown','Preacher Curl','Skull Crusher','Hammer Curl','Overhead Tricep Extension']},
      {n:'Leg Day',muscles:['legs'],exercises:['Barbell Squat','Leg Press','Romanian Deadlift','Leg Extension','Leg Curl Lying','Calf Raise Standing']},
    ]
  },
  str: {
    n:'Strength', days:4,
    schedule:[
      {n:'Squat Day',muscles:['legs','core'],exercises:['Barbell Squat','Romanian Deadlift','Leg Press','Plank','Ab Wheel','Pallof Press']},
      {n:'Press Day',muscles:['chest','shoulders','triceps'],exercises:['Barbell Bench Press','Overhead Press Barbell','Close Grip Bench Press','Skull Crusher','Lateral Raise','Face Pull']},
      {n:'Deadlift Day',muscles:['back','legs'],exercises:['Deadlift','Barbell Row','Pull-Ups','Rack Pull','Leg Curl Lying','Hanging Leg Raise']},
      {n:'Accessory Day',muscles:['shoulders','arms','core'],exercises:['Dumbbell Shoulder Press','Barbell Curl','Rope Pushdown','Arnold Press','Hammer Curl','Cable Crunch']},
    ]
  },
  athletic: {
    n:'Athletic', days:4,
    schedule:[
      {n:'Power Day',muscles:['legs','fullbody'],exercises:['Barbell Squat','Deadlift','Clean and Press','Kettlebell Swing','Plank','Dead Bug']},
      {n:'Strength Day',muscles:['chest','back'],exercises:['Barbell Bench Press','Barbell Row','Pull-Ups','Overhead Press Barbell','Romanian Deadlift','Face Pull']},
      {n:'Conditioning',muscles:['fullbody'],exercises:['Thruster','Man Maker','Kettlebell Swing','Turkish Get-Up','Goblet Squat','Push-Ups']},
      {n:'Skills Day',muscles:['core','rehab'],exercises:['Plank','Dead Bug','Bird Dog','Band Pull Apart','Hip 90-90 Stretch','Y-T-W Raise']},
    ]
  },
  home: {
    n:'Home Warrior', days:4,
    schedule:[
      {n:'Push BW',muscles:['chest','shoulders','triceps'],exercises:['Push-Ups','Wide Push-Ups','Diamond Push-Ups','Tricep Dips','Pike Push-Ups','Plank']},
      {n:'Pull BW',muscles:['back','biceps'],exercises:['Pull-Ups','Chin-Ups','Band Pull Apart','Inverted Row','Nordic Curl','Dead Bug']},
      {n:'Legs BW',muscles:['legs','glutes'],exercises:['Goblet Squat','Walking Lunges','Glute Bridge','Donkey Kick','Calf Raise Standing','Bulgarian Split Squat']},
      {n:'Full BW',muscles:['fullbody'],exercises:['Kettlebell Swing','Turkish Get-Up','Man Maker','Plank','V-Ups','Bicycle Crunch']},
    ]
  }
};

/* ═══════════════════════════════════════════════════
   WORKOUT ENGINE
═══════════════════════════════════════════════════ */
const WE = {
  getSplitDay() {
    const split = S.g('user.split') || 'ppl';
    const splitData = SPLITS[split];
    if (!splitData) return null;
    const dayIdx = ((S.g('user.splitDay') || 1) - 1) % splitData.schedule.length;
    return splitData.schedule[dayIdx];
  },
  getWorkout() {
    const day = this.getSplitDay();
    if (!day) return { n:'Custom Workout', exercises: [] };
    const goal = S.g('user.goal') || 'hypertrophy';
    const injuries = S.g('injuries') || [];
    return {
      name: day.n,
      exercises: (day.exercises || []).map(exName => {
        const ex = ExDB.byName(exName);
        const sets = this.getSets(ex, goal);
        const suggestedW = ProgEngine.suggest(exName, goal) || this.getDefaultWeight(ex, goal);
        const warn = MuscleEngine.injuryWarning(exName);
        return {
          name: exName,
          sets: Array.from({length: sets}, (_, i) => ({
            id: i+1, weight: suggestedW, reps: this.getDefaultReps(goal), done: false
          })),
          warn: warn,
          prCount: 0
        };
      })
    };
  },
  getSets(ex, goal) {
    if (goal === 'strength') return ex && ex.diff >= 3 ? 5 : 4;
    if (goal === 'hypertrophy') return ex && ex.diff >= 3 ? 4 : 4;
    return 3;
  },
  getDefaultReps(goal) {
    if (goal === 'strength') return 5;
    if (goal === 'hypertrophy') return 10;
    return 12;
  },
  getDefaultWeight(ex, goal) {
    if (ex && ex.bw) return 0;
    if (goal === 'strength') return 60;
    return 20;
  },
  calcVol(sets) {
    return (sets || []).filter(s => s.done).reduce((a, s) => a + (s.weight||0) * (s.reps||0), 0);
  },
  nextDay() {
    const split = S.g('user.split') || 'ppl';
    const splitData = SPLITS[split];
    if (!splitData) return;
    const cur = S.g('user.splitDay') || 1;
    const next = (cur % splitData.schedule.length) + 1;
    S.set('user.splitDay', next);
  }
};
window.WE = WE;

/* ═══════════════════════════════════════════════════
   ACTIVE WORKOUT STATE
═══════════════════════════════════════════════════ */
let _wkt = null;
let _wktTimer = null;
let _wktSecs = 0;
let _restTimer = null;
let _restSecs = 0;

function startWorkout(name, exercises) {
  _wkt = { name: name || 'Workout', exercises: exercises || [], startTime: Date.now(), date: isoNow() };
  _wktSecs = 0;
  clearInterval(_wktTimer);
  _wktTimer = setInterval(() => {
    _wktSecs++;
    const el = document.getElementById('wkt-timer');
    if (el) el.textContent = fmtSecs(_wktSecs);
    updateProgress();
  }, 1000);
  go('workout-active');
}

function fmtSecs(s) {
  const m = Math.floor(s/60), sec = s%60;
  return String(m).padStart(2,'0') + ':' + String(sec).padStart(2,'0');
}

function updateProgress() {
  if (!_wkt) return;
  const total = _wkt.exercises.reduce((a,e) => a + e.sets.length, 0);
  const done = _wkt.exercises.reduce((a,e) => a + e.sets.filter(s=>s.done).length, 0);
  const pct = total ? Math.round((done/total)*100) : 0;
  const bar = document.getElementById('wkt-prog-bar');
  if (bar) bar.style.width = pct + '%';
}

function wktCheckSet(exIdx, setIdx) {
  if (!_wkt) return;
  const ex = _wkt.exercises[exIdx];
  const set = ex.sets[setIdx];
  const weightEl = document.getElementById('w-' + exIdx + '-' + setIdx);
  const repsEl = document.getElementById('r-' + exIdx + '-' + setIdx);
  if (weightEl) set.weight = parseFloat(weightEl.value) || 0;
  if (repsEl) set.reps = parseInt(repsEl.value) || 0;
  set.done = !set.done;
  haptic(30);
  // PR check
  if (set.done && set.weight > 0 && set.reps > 0) {
    if (ProgEngine.checkPR(ex.name, set.weight, set.reps)) {
      ProgEngine.savePR(ex.name, set.weight, set.reps, isoNow());
      ex.prCount = (ex.prCount || 0) + 1;
      toast('🏆 New PR on ' + ex.name + '!', 'pr', 5000);
      haptic([50,30,50,30,50]);
      // Flash row gold
      const row = document.getElementById('set-row-' + exIdx + '-' + setIdx);
      if (row) { row.style.background = 'rgba(255,215,0,0.1)'; setTimeout(() => { if(row) row.style.background=''; }, 2000); }
    }
  }
  // Update check button
  const checkBtn = document.getElementById('check-' + exIdx + '-' + setIdx);
  if (checkBtn) {
    checkBtn.className = 'set-check' + (set.done ? ' done' : '');
    checkBtn.innerHTML = set.done ? svgCheck() : '';
  }
  const numEl = document.getElementById('setnum-' + exIdx + '-' + setIdx);
  if (numEl) numEl.className = 'set-num' + (set.done ? ' done' : '');
  // Disable inputs if done
  if (weightEl) weightEl.disabled = set.done;
  if (repsEl) repsEl.disabled = set.done;
  updateProgress();
  // Start rest timer
  if (set.done && S.g('prefs.restTimer') !== false) {
    startRestTimer(S.g('user.restSecs') || 90);
  }
}
window.wktCheckSet = wktCheckSet;

function startRestTimer(secs) {
  clearInterval(_restTimer);
  _restSecs = secs;
  const restOverlay = document.getElementById('rest-overlay');
  if (restOverlay) { restOverlay.style.display = 'flex'; updateRestTimer(); }
  else { showRestSheet(secs); }
  _restTimer = setInterval(() => {
    _restSecs--;
    updateRestTimer();
    if (_restSecs <= 0) {
      clearInterval(_restTimer);
      haptic([100,50,100,50,100]);
      dismissRest();
    }
  }, 1000);
}
window.startRestTimer = startRestTimer;

function updateRestTimer() {
  const el = document.getElementById('rest-count');
  const arc = document.getElementById('rest-arc');
  if (el) el.textContent = _restSecs;
  if (arc) {
    const full = S.g('user.restSecs') || 90;
    const circ = 2*Math.PI*50;
    const pct = _restSecs / full;
    arc.style.strokeDashoffset = (circ * (1-pct)).toFixed(1);
  }
}

function dismissRest() {
  const el = document.getElementById('rest-overlay');
  if (el) el.style.display = 'none';
  const mo = document.getElementById('modal-overlay');
  if (mo) mo.remove();
}
window.dismissRest = dismissRest;

function showRestSheet(totalSecs) {
  const circ = (2*Math.PI*50).toFixed(1);
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';
  overlay.innerHTML = '<div class="modal-sheet rest-sheet">' +
    '<div class="modal-handle"></div>' +
    '<div style="font-size:16px;font-weight:700;margin-bottom:20px;text-align:center">Rest Timer</div>' +
    '<div class="rest-ring">' +
    '<svg width="120" height="120" viewBox="0 0 120 120" style="transform:rotate(-90deg)">' +
    '<circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg4)" stroke-width="8"/>' +
    '<circle id="rest-arc" cx="60" cy="60" r="50" fill="none" stroke="var(--c1)" stroke-width="8" stroke-linecap="round" stroke-dasharray="' + circ + '" stroke-dashoffset="0"/>' +
    '</svg>' +
    '<div id="rest-count" class="rest-count">' + totalSecs + '</div>' +
    '</div>' +
    '<div class="rest-label">seconds remaining</div>' +
    '<button class="btn btn-s btn-sm" onclick="dismissRest()">Skip</button>' +
    '</div>';
  document.body.appendChild(overlay);
  setTimeout(updateRestTimer, 50);
}

function finishWorkout() {
  if (!_wkt) return;
  clearInterval(_wktTimer);
  const totalVol = _wkt.exercises.reduce((a, e) => a + WE.calcVol(e.sets), 0);
  const durationMins = Math.round(_wktSecs / 60);
  const prs = _wkt.exercises.reduce((a, e) => a + (e.prCount||0), 0);
  const prList = _wkt.exercises.filter(e => e.prCount > 0).map(e => {
    const lastSet = e.sets.filter(s=>s.done).pop();
    return '<div class="pr-item"><span style="font-size:18px">🏆</span><div style="flex:1"><div style="font-weight:700">' + esc(e.name) + '</div><div style="font-size:12px;color:var(--txt3)">' + (lastSet?lastSet.weight+'kg × '+lastSet.reps+' reps':'') + '</div></div></div>';
  }).join('');
  const body = '<div style="display:flex;gap:12px;margin-bottom:20px">' +
    '<div class="finish-stat"><div class="finish-stat-v">' + durationMins + '</div><div class="finish-stat-l">Minutes</div></div>' +
    '<div class="finish-stat"><div class="finish-stat-v">' + Math.round(totalVol) + '</div><div class="finish-stat-l">Volume kg</div></div>' +
    '<div class="finish-stat"><div class="finish-stat-v">' + _wkt.exercises.length + '</div><div class="finish-stat-l">Exercises</div></div>' +
    '<div class="finish-stat"><div class="finish-stat-v" style="color:gold">' + prs + '</div><div class="finish-stat-l">PRs Set</div></div>' +
    '</div>' +
    (prList ? '<div class="pr-list">' + prList + '</div>' : '') +
    '<button class="btn btn-p" onclick="saveWorkout()">Save Workout</button>' +
    '<button class="btn btn-s" style="margin-top:10px" onclick="closeModal()">Keep Training</button>';
  modal('Workout Complete 🎉', body);
}
window.finishWorkout = finishWorkout;

function saveWorkout() {
  if (!_wkt) return;
  const totalVol = _wkt.exercises.reduce((a,e) => a + WE.calcVol(e.sets), 0);
  const record = {
    id: Date.now(),
    name: _wkt.name,
    date: _wkt.date,
    duration: Math.round(_wktSecs/60),
    totalVol,
    exercises: _wkt.exercises.map(e => ({
      name: e.name,
      sets: e.sets.map(s => ({...s})),
      prCount: e.prCount||0
    }))
  };
  const ws = S.g('workouts') || [];
  ws.push(record);
  S.set('workouts', ws);
  WE.nextDay();
  AchEngine.check();
  closeModal();
  _wkt = null; _wktSecs = 0;
  clearInterval(_wktTimer);
  toast('Workout saved! Great session 💪', 'ok');
  haptic([50,30,50]);
  go('dashboard');
}
window.saveWorkout = saveWorkout;

function addExToWorkout(exName) {
  if (!_wkt) return;
  const ex = ExDB.byName(exName);
  const goal = S.g('user.goal') || 'hypertrophy';
  const sets = WE.getSets(ex, goal);
  const suggestedW = ProgEngine.suggest(exName, goal) || WE.getDefaultWeight(ex, goal);
  _wkt.exercises.push({
    name: exName,
    sets: Array.from({length:sets}, (_,i) => ({id:i+1, weight:suggestedW, reps:WE.getDefaultReps(goal), done:false})),
    warn: MuscleEngine.injuryWarning(exName),
    prCount: 0
  });
  closeModal();
  go('workout-active');
  toast(exName + ' added!', 'ok');
}
window.addExToWorkout = addExToWorkout;

function removeExFromWorkout(idx) {
  if (!_wkt) return;
  _wkt.exercises.splice(idx, 1);
  go('workout-active');
}
window.removeExFromWorkout = removeExFromWorkout;

function addSetToEx(exIdx) {
  if (!_wkt) return;
  const ex = _wkt.exercises[exIdx];
  const lastSet = ex.sets[ex.sets.length-1];
  ex.sets.push({id:ex.sets.length+1, weight:lastSet?lastSet.weight:20, reps:lastSet?lastSet.reps:10, done:false});
  go('workout-active');
}
window.addSetToEx = addSetToEx;

/* ═══════════════════════════════════════════════════
   EXERCISE SEARCH STATE
═══════════════════════════════════════════════════ */
let _exSearchQuery = '';
let _exSearchGrp = 'all';
let _exSearchMode = 'library'; // 'library' | 'add'

/* ═══════════════════════════════════════════════════
   SCREENS
═══════════════════════════════════════════════════ */
reg('workouts', function() {
  if (_wkt) return renderActiveWorkout();
  return renderWorkoutHome();
});

reg('workout-active', function() {
  return renderActiveWorkout();
});

reg('exercises', function() {
  _exSearchMode = 'library';
  return renderExSearch();
});

function renderWorkoutHome() {
  const ws = S.g('workouts') || [];
  const templates = S.g('templates') || [];
  const day = WE.getSplitDay();
  const split = SPLITS[S.g('user.split')||'ppl'];

  let splitCard = '';
  if (day) {
    const exList = (day.exercises||[]).slice(0,4).map(e => '<span class="pill" style="font-size:12px;padding:5px 10px">' + esc(e) + '</span>').join('');
    const muscPills = (day.muscles||[]).map(m => '<span class="mchip fresh" style="margin-right:4px">' + esc(m) + '</span>').join('');
    splitCard = '<div class="card card-dark card-tap" onclick="go(\'workout-active\')" style="margin:12px 16px 14px;border:1.5px solid var(--border2)">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">' +
      '<div><div style="font-size:20px;font-weight:800">' + esc(day.n) + '</div>' +
      '<div style="font-size:12px;color:var(--txt3);margin-top:2px">' + esc((split||{}).n||'') + ' · Day ' + (S.g('user.splitDay')||1) + '</div>' +
      '<div style="margin-top:8px">' + muscPills + '</div></div>' +
      '<span style="font-size:32px">💪</span></div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">' + exList + '</div>' +
      '<div style="display:flex;gap:8px">' +
      '<button class="btn btn-p" style="flex:2" onclick="event.stopPropagation();startTodaysWorkout()">▶ Start Workout</button>' +
      '<button class="btn btn-s" style="flex:1" onclick="event.stopPropagation();startEmptyWorkout()">+ Empty</button>' +
      '</div></div>';
  }

  const recentRows = ws.slice(-3).reverse().map(w =>
    '<div class="ex-row" style="padding:12px 0">' +
    '<div class="ex-icon">💪</div>' +
    '<div class="ex-info"><div class="ex-name">' + esc(w.name||'Workout') + '</div>' +
    '<div class="ex-sub">' + fmtDate(w.date) + ' · ' + (w.exercises||[]).length + ' exercises · ' + (w.duration||0) + 'min</div></div>' +
    '<div style="text-align:right"><div style="font-size:14px;font-weight:700;color:var(--c1)">' + Math.round((w.totalVol||0)/1000*10)/10 + 't</div></div>' +
    '</div>'
  ).join('') || '<div style="padding:16px;color:var(--txt3);font-size:14px">No workouts yet — start your first!</div>';

  return topbar('Workout', null, '<button class="topbar-icon" onclick="go(\'exercises\')">🔍</button>') +
    splitCard +
    sh('Recent Workouts', 'History', "go('progress')") +
    '<div class="card card-dark" style="margin:0 16px 14px;padding:0 4px">' + recentRows + '</div>' +
    (templates.length ? sh('Templates') + templates.map((t,i) =>
      '<div class="card card-tap card-dark" style="margin:0 16px 10px" onclick="loadTemplate(' + i + ')">' +
      '<div style="font-weight:700">' + esc(t.name) + '</div>' +
      '<div style="font-size:12px;color:var(--txt3);margin-top:4px">' + (t.exercises||[]).length + ' exercises</div>' +
      '</div>').join('') : '') +
    sh('Exercise Library', 'Browse All', "go('exercises')") +
    '<div style="height:8px"></div>';
}

function renderActiveWorkout() {
  if (!_wkt) {
    const wktData = WE.getWorkout();
    startWorkout(wktData.name, wktData.exercises);
    return '';
  }
  const total = _wkt.exercises.reduce((a,e) => a+e.sets.length, 0);
  const done = _wkt.exercises.reduce((a,e) => a+e.sets.filter(s=>s.done).length, 0);
  const pct = total ? Math.round((done/total)*100) : 0;
  const unit = S.g('user.units') === 'imperial' ? 'lb' : 'kg';

  const exCards = _wkt.exercises.map((ex, exIdx) => {
    const exData = ExDB.byName(ex.name);
    const doneCount = ex.sets.filter(s=>s.done).length;
    const prev = ProgEngine.prevString(ex.name);
    const setRows = ex.sets.map((set, si) =>
      '<div class="set-row" id="set-row-' + exIdx + '-' + si + '">' +
      '<div class="set-num' + (set.done?' done':'') + '" id="setnum-' + exIdx + '-' + si + '">' + (si+1) + '</div>' +
      '<input class="set-inp" id="w-' + exIdx + '-' + si + '" type="number" min="0" step="0.5" value="' + (set.weight||0) + '"' + (set.done?' disabled':'') + ' onchange="wktUpdateWeight(' + exIdx + ',' + si + ',this.value)" inputmode="decimal">' +
      '<div class="set-x">×</div>' +
      '<input class="set-inp" id="r-' + exIdx + '-' + si + '" type="number" min="1" step="1" value="' + (set.reps||10) + '"' + (set.done?' disabled':'') + ' onchange="wktUpdateReps(' + exIdx + ',' + si + ',this.value)" inputmode="numeric">' +
      '<button class="set-check' + (set.done?' done':'') + '" id="check-' + exIdx + '-' + si + '" onclick="wktCheckSet(' + exIdx + ',' + si + ')" touch-action="manipulation">' + (set.done?svgCheck():'') + '</button>' +
      '</div>'
    ).join('');
    return '<div class="ex-card">' +
      '<div class="ex-card-hdr">' +
      '<div class="ex-icon">' + (exData.em||'💪') + '</div>' +
      '<div class="ex-info">' +
      '<div class="ex-name">' + esc(ex.name) + (ex.warn ? ' <span class="ex-warn">⚠️</span>' : '') + '</div>' +
      '<div class="ex-sub">' + esc(exData.pri||'') + ' · ' + esc((exData.grp||'').toUpperCase()) + '</div>' +
      '</div>' +
      '<div class="ex-progress">' + doneCount + '/' + ex.sets.length + '</div>' +
      '<button class="topbar-icon" style="width:32px;height:32px;margin-left:8px;font-size:14px" onclick="removeExFromWorkout(' + exIdx + ')">✕</button>' +
      '</div>' +
      '<div class="ex-card-body">' +
      (prev ? '<div class="set-prev">' + esc(prev) + '</div>' : '') +
      (exData.cues ? '<div class="set-cue">' + esc(exData.cues) + '</div>' : '') +
      '<div style="display:grid;grid-template-columns:36px 1fr auto 1fr 44px;gap:8px;padding:6px 0;border-bottom:1px solid var(--border)">' +
      '<div style="font-size:11px;color:var(--txt4)">#</div>' +
      '<div style="font-size:11px;color:var(--txt4);text-align:center">' + unit.toUpperCase() + '</div>' +
      '<div></div>' +
      '<div style="font-size:11px;color:var(--txt4);text-align:center">REPS</div>' +
      '<div></div></div>' +
      setRows +
      '<button class="btn btn-s btn-sm" style="margin-top:12px;width:auto" onclick="addSetToEx(' + exIdx + ')">+ Add Set</button>' +
      '</div></div>';
  }).join('');

  return '<div class="wkt-header">' +
    '<div style="display:flex;justify-content:space-between;align-items:center">' +
    '<div><div class="wkt-name">' + esc(_wkt.name) + '</div>' +
    '<div id="wkt-timer" class="wkt-timer">' + fmtSecs(_wktSecs) + '</div></div>' +
    '<button class="btn btn-g btn-sm" onclick="finishWorkout()">✓ Finish</button>' +
    '</div>' +
    '<div class="wkt-progress"><div id="wkt-prog-bar" class="wkt-progress-bar" style="width:' + pct + '%"></div></div>' +
    '</div>' +
    exCards +
    '<div style="padding:16px">' +
    '<button class="btn btn-s" onclick="openAddExercise()">+ Add Exercise</button>' +
    '</div>' +
    '<div style="height:8px"></div>';
}

function wktUpdateWeight(exIdx, si, val) {
  if (_wkt && _wkt.exercises[exIdx]) _wkt.exercises[exIdx].sets[si].weight = parseFloat(val)||0;
}
function wktUpdateReps(exIdx, si, val) {
  if (_wkt && _wkt.exercises[exIdx]) _wkt.exercises[exIdx].sets[si].reps = parseInt(val)||0;
}
window.wktUpdateWeight = wktUpdateWeight; window.wktUpdateReps = wktUpdateReps;

function openAddExercise() {
  _exSearchMode = 'add';
  _exSearchQuery = '';
  _exSearchGrp = 'all';
  modal('Add Exercise', renderExSearchBody(), '');
  const inEl = document.getElementById('ex-search-in');
  if (inEl) setTimeout(() => inEl.focus(), 100);
}
window.openAddExercise = openAddExercise;

function startTodaysWorkout() {
  const wktData = WE.getWorkout();
  startWorkout(wktData.name, wktData.exercises);
}
window.startTodaysWorkout = startTodaysWorkout;

function startEmptyWorkout() {
  startWorkout('My Workout', []);
  openAddExercise();
}
window.startEmptyWorkout = startEmptyWorkout;

function renderExSearch() {
  return topbar('Exercise Library', null, '<button class="topbar-icon" onclick="go(\'workouts\')">✕</button>') +
    '<div style="padding:12px 16px">' +
    '<input class="field" id="ex-search-in" type="search" placeholder="Search exercises..." value="' + esc(_exSearchQuery) + '" oninput="_exSearchQuery=this.value;_renderExResults()">' +
    '</div>' +
    '<div class="pill-row" id="ex-grp-pills">' +
    ['all','chest','back','legs','shoulders','biceps','triceps','core','glutes','fullbody','rehab'].map(g =>
      '<button class="pill' + (_exSearchGrp===g?' on':'') + '" onclick="_setExGrp(\'' + g + '\')">' + esc(g==='all'?'All':g.charAt(0).toUpperCase()+g.slice(1)) + '</button>'
    ).join('') +
    '</div>' +
    '<div id="ex-results">' + renderExResults() + '</div>' +
    '<div style="height:8px"></div>';
}

function renderExSearchBody() {
  return '<input class="field" id="ex-search-in" type="search" placeholder="Search exercises..." value="" oninput="_exSearchQuery=this.value;_renderExResultsInModal()" style="margin-bottom:12px">' +
    '<div style="display:flex;gap:6px;overflow-x:auto;margin-bottom:12px;padding-bottom:4px">' +
    ['all','chest','back','legs','shoulders','biceps','triceps','core','glutes'].map(g =>
      '<button class="pill' + (_exSearchGrp===g?' on':'') + '" id="grp-pill-' + g + '" onclick="_setExGrpModal(\'' + g + '\')">' + esc(g==='all'?'All':g.charAt(0).toUpperCase()+g.slice(1)) + '</button>'
    ).join('') +
    '</div>' +
    '<div id="ex-results-modal" style="max-height:50vh;overflow-y:auto">' + renderExResultsModal() + '</div>';
}

function renderExResults() {
  const res = ExDB.search(_exSearchQuery, _exSearchGrp === 'all' ? null : _exSearchGrp);
  if (!res.length) return emptyState('🔍', 'No exercises found', 'Try a different search term');
  return res.map(ex =>
    '<div class="ex-row" style="padding:12px 16px;cursor:pointer" onclick="showExDetail(\'' + esc(ex.n).replace(/'/g,"\\'") + '\')">' +
    '<div class="ex-icon">' + (ex.em||'💪') + '</div>' +
    '<div class="ex-info"><div class="ex-name">' + esc(ex.n) + '</div>' +
    '<div class="ex-sub">' + esc(ex.pri||'') + (ex.sec ? ' · ' + esc(ex.sec) : '') + '</div></div>' +
    '<div class="diff-dots">' + [1,2,3].map(d => '<div class="diff-dot' + (d<=(ex.diff||1)?' on':'') + '"></div>').join('') + '</div>' +
    '</div>'
  ).join('');
}

function renderExResultsModal() {
  const res = ExDB.search(_exSearchQuery, _exSearchGrp === 'all' ? null : _exSearchGrp);
  if (!res.length) return '<div style="padding:20px;text-align:center;color:var(--txt3)">No exercises found</div>';
  return res.map(ex =>
    '<div class="ex-row" style="padding:12px 0;cursor:pointer" onclick="addExToWorkout(\'' + esc(ex.n).replace(/'/g,"\\'") + '\')">' +
    '<div class="ex-icon">' + (ex.em||'💪') + '</div>' +
    '<div class="ex-info"><div class="ex-name">' + esc(ex.n) + '</div>' +
    '<div class="ex-sub">' + esc(ex.pri||'') + '</div></div>' +
    '<button class="btn btn-p btn-sm" style="padding:6px 12px;font-size:12px">Add</button>' +
    '</div>'
  ).join('');
}

function _setExGrp(g) { _exSearchGrp = g; document.getElementById('ex-results').innerHTML = renderExResults(); document.querySelectorAll('#ex-grp-pills .pill').forEach(p => p.classList.remove('on')); document.querySelectorAll('#ex-grp-pills .pill').forEach((p,i) => { if (['all','chest','back','legs','shoulders','biceps','triceps','core','glutes','fullbody','rehab'][i]===g) p.classList.add('on'); }); }
function _setExGrpModal(g) { _exSearchGrp = g; document.getElementById('ex-results-modal').innerHTML = renderExResultsModal(); document.querySelectorAll('[id^="grp-pill-"]').forEach(p => p.classList.remove('on')); const sel = document.getElementById('grp-pill-'+g); if(sel) sel.classList.add('on'); }
function _renderExResults() { const el = document.getElementById('ex-results'); if(el) el.innerHTML = renderExResults(); }
function _renderExResultsInModal() { const el = document.getElementById('ex-results-modal'); if(el) el.innerHTML = renderExResultsModal(); }
window._setExGrp = _setExGrp; window._setExGrpModal = _setExGrpModal; window._renderExResults = _renderExResults; window._renderExResultsInModal = _renderExResultsInModal;

function showExDetail(name) {
  const ex = ExDB.byName(name);
  const prs = S.g('prs') || [];
  const pr = prs.find(p => p.exercise === name);
  const prev = ProgEngine.prevString(name);
  const body = '<div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">' +
    '<div class="ex-icon" style="width:60px;height:60px;font-size:28px">' + (ex.em||'💪') + '</div>' +
    '<div><div style="font-size:20px;font-weight:800">' + esc(ex.n) + '</div>' +
    '<div style="font-size:13px;color:var(--txt3);margin-top:2px">' + esc(ex.pri||'') + (ex.sec?' · '+esc(ex.sec):'') + '</div></div>' +
    '</div>' +
    '<div class="card card-dark" style="margin:0 0 12px"><div style="font-size:13px;font-style:italic;color:var(--txt2)">"' + esc(ex.cues||'Focus on mind-muscle connection') + '"</div></div>' +
    (pr ? '<div class="card card-dark" style="margin:0 0 12px;border-color:gold"><div style="font-size:12px;color:gold;font-weight:700;margin-bottom:4px">🏆 Personal Record</div><div style="font-size:16px;font-weight:700">' + pr.weight + 'kg × ' + pr.reps + ' reps · e1RM: ' + pr.e1rm + 'kg</div></div>' : '') +
    (prev ? '<div style="font-size:13px;color:var(--c1);margin-bottom:12px">' + esc(prev) + '</div>' : '') +
    '<div class="stats-row" style="padding:0;margin-bottom:16px">' +
    '<div class="stat' + (ex.bw?' green':'') + '" style="flex:1"><div class="stat-v">' + (ex.bw?'BW':esc((ex.eq||[]).join('/'))) + '</div><div class="stat-l">Equipment</div></div>' +
    '<div class="stat cyan" style="flex:1"><div class="stat-v">' + ['','Easy','Med','Hard'][ex.diff||1] + '</div><div class="stat-l">Difficulty</div></div>' +
    '</div>';
  const footer = _wkt ? '<button class="btn btn-p" onclick="addExToWorkout(\'' + esc(ex.n).replace(/'/g,"\\'") + '\');closeModal()">+ Add to Workout</button>' : '';
  modal(ex.n, body, footer);
}
window.showExDetail = showExDetail;
