'use strict';
/* ── FitnessOS v4 — Workout Logger + Exercise Database ── */

/* ── Exercise Database ── */
const ExDB = {
  db: [
    // CHEST (15)
    {n:'Barbell Bench Press',em:'🏋️',grp:'chest',diff:2,bw:false,eq:['barbell'],pri:'Chest',sec:'Triceps, Front Delts',cues:'Drive feet into floor, arch naturally, tuck elbows 45°',setup:'Lie flat, grip slightly wider than shoulder width',breathing:'Inhale on descent, exhale on press',mistakes:'Flaring elbows, bouncing off chest',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0},cns:2,muscles:{primary:['chest'],secondary:['triceps','front_delts']},regressions:['Push-Ups','Dumbbell Bench Press'],progressions:['Weighted Dips','Close-Grip Bench Press'],met:5.0,tempoRec:'2-0-1-0'},
    {n:'Incline Barbell Bench Press',em:'📐',grp:'chest',diff:2,bw:false,eq:['barbell'],pri:'Upper Chest',sec:'Front Delts, Triceps',cues:'Set bench 30-45°, retract scapulae, control the eccentric',setup:'Bench at 30-45° incline, bar above upper chest',breathing:'Inhale down, exhale press',mistakes:'Too steep angle shifts load to delts',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0},cns:2,muscles:{primary:['upper_chest'],secondary:['front_delts','triceps']},regressions:['Incline Push-Ups','Incline DB Press'],progressions:['Weighted Dips'],met:5.0,tempoRec:'2-0-1-0'},
    {n:'Dumbbell Bench Press',em:'💪',grp:'chest',diff:1,bw:false,eq:['dumbbell'],pri:'Chest',sec:'Triceps, Front Delts',cues:'Full stretch at bottom, squeeze at top, neutral or slightly pronated grip',setup:'Sit on bench, kick DBs up, lie back controlled',breathing:'Inhale down, exhale press',mistakes:'Losing shoulder retraction at bottom',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['chest'],secondary:['triceps','front_delts']},regressions:['Push-Ups'],progressions:['Barbell Bench Press'],met:4.5,tempoRec:'2-1-1-0'},
    {n:'Incline Dumbbell Press',em:'📐',grp:'chest',diff:1,bw:false,eq:['dumbbell'],pri:'Upper Chest',sec:'Front Delts, Triceps',cues:'Elbows slightly in, pause at bottom for stretch',setup:'30-45° bench, DBs at shoulder height',breathing:'Inhale down, exhale press',mistakes:'Going too heavy, losing form at bottom',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['upper_chest'],secondary:['front_delts','triceps']},regressions:['Incline Push-Ups'],progressions:['Incline Barbell Bench Press'],met:4.5,tempoRec:'2-1-1-0'},
    {n:'Dumbbell Fly',em:'🦋',grp:'chest',diff:1,bw:false,eq:['dumbbell'],pri:'Chest',sec:'Front Delts',cues:'Slight bend in elbows, feel the stretch, squeeze at top',setup:'Flat bench, wide arc motion',breathing:'Inhale wide, exhale squeeze',mistakes:'Turning into a press, excessive weight',joint:{shoulder:3,elbow:1,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['chest'],secondary:['front_delts']},regressions:['Cable Fly'],progressions:['Weighted Dips'],met:4.0,tempoRec:'3-1-1-0'},
    {n:'Cable Fly',em:'⚡',grp:'chest',diff:1,bw:false,eq:['cables'],pri:'Chest',sec:'Front Delts',cues:'Constant tension, slight elbow bend, squeeze hard at peak',setup:'Cables at chest height, step forward, slight forward lean',breathing:'Exhale on fly',mistakes:'Bending elbows too much, turning into a row',joint:{shoulder:2,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['chest'],secondary:['front_delts']},regressions:['DB Fly'],progressions:['Weighted Dips'],met:4.0,tempoRec:'2-1-2-0'},
    {n:'Push-Ups',em:'🤸',grp:'chest',diff:1,bw:true,eq:[],pri:'Chest',sec:'Triceps, Front Delts',cues:'Rigid plank, elbows 45°, full range of motion',setup:'Hands shoulder-width, body plank position',breathing:'Inhale down, exhale up',mistakes:'Sagging hips, partial reps',joint:{shoulder:1,elbow:1,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['chest'],secondary:['triceps','front_delts']},regressions:['Knee Push-Ups'],progressions:['Weighted Push-Ups','Archer Push-Ups'],met:4.0,tempoRec:'2-0-1-0'},
    {n:'Chest Dip',em:'💎',grp:'chest',diff:2,bw:true,eq:['bar'],pri:'Lower Chest',sec:'Triceps, Front Delts',cues:'Lean forward 15-30° to hit chest, control descent',setup:'Parallel bars, slight forward lean throughout',breathing:'Inhale down, exhale up',mistakes:'Too upright (shifts to triceps)',joint:{shoulder:3,elbow:2,knee:0,spine:1,hip:0},cns:2,muscles:{primary:['lower_chest'],secondary:['triceps','front_delts']},regressions:['Bench Dip','Push-Ups'],progressions:['Weighted Dip'],met:5.0,tempoRec:'2-1-1-0'},
    {n:'Machine Chest Press',em:'🖥️',grp:'chest',diff:1,bw:false,eq:['machine'],pri:'Chest',sec:'Triceps, Front Delts',cues:'Adjust seat so handles align with mid-chest, full range',setup:'Seat height: handles at mid-chest level',breathing:'Exhale press, inhale return',mistakes:'Partial range of motion',joint:{shoulder:1,elbow:1,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['chest'],secondary:['triceps','front_delts']},regressions:['DB Press'],progressions:['Barbell Bench Press'],met:4.0,tempoRec:'2-0-1-0'},
    {n:'Cable Crossover',em:'✖️',grp:'chest',diff:1,bw:false,eq:['cables'],pri:'Chest',sec:'Front Delts',cues:'High-to-low for lower chest, low-to-high for upper chest',setup:'Cables high, stand in centre, bring hands together',breathing:'Exhale on crossover',mistakes:'Using momentum, no pause at peak',joint:{shoulder:2,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['chest'],secondary:['front_delts']},regressions:['DB Fly'],progressions:['Weighted Dips'],met:4.0,tempoRec:'2-2-1-0'},
    {n:'Decline Barbell Bench Press',em:'📉',grp:'chest',diff:2,bw:false,eq:['barbell'],pri:'Lower Chest',sec:'Triceps',cues:'Decline 15-30°, wider grip, control eccentric',setup:'Decline bench, feet secured',breathing:'Inhale down, exhale press',mistakes:'Excessive decline angle',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0},cns:2,muscles:{primary:['lower_chest'],secondary:['triceps']},regressions:['Dumbbell Bench Press'],progressions:['Weighted Dip'],met:5.0,tempoRec:'2-0-1-0'},
    {n:'Close-Grip Bench Press',em:'🤏',grp:'chest',diff:2,bw:false,eq:['barbell'],pri:'Triceps',sec:'Chest, Front Delts',cues:'Grip shoulder-width, keep elbows tucked',setup:'Flat bench, narrow grip on barbell',breathing:'Inhale down, exhale press',mistakes:'Too narrow grip strains wrists',joint:{shoulder:2,elbow:2,knee:0,spine:1,hip:0},cns:2,muscles:{primary:['triceps'],secondary:['chest','front_delts']},regressions:['DB Tricep Press'],progressions:['Weighted Dip'],met:4.5,tempoRec:'2-0-1-0'},
    {n:'Landmine Press',em:'🔱',grp:'chest',diff:1,bw:false,eq:['barbell'],pri:'Upper Chest',sec:'Front Delts, Triceps',cues:'Single arm, squeeze upper chest at top',setup:'Bar in landmine attachment, kneel or stand',breathing:'Exhale press',mistakes:'Rotating torso excessively',joint:{shoulder:1,elbow:1,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['upper_chest'],secondary:['front_delts','triceps']},regressions:['DB Press'],progressions:['Incline Barbell Press'],met:4.0,tempoRec:'2-0-1-0'},
    {n:'Pec Deck',em:'🦅',grp:'chest',diff:1,bw:false,eq:['machine'],pri:'Chest',sec:'Front Delts',cues:'Keep elbows slightly bent, squeeze fully at peak',setup:'Adjust seat, forearms on pads at chest height',breathing:'Exhale on squeeze',mistakes:'Going too heavy with jerky movement',joint:{shoulder:2,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['chest'],secondary:['front_delts']},regressions:['DB Fly'],progressions:['Weighted Dip'],met:3.5,tempoRec:'2-2-1-0'},
    {n:'Front Delt Raise',em:'🙌',grp:'shoulders',diff:1,bw:false,eq:['dumbbell'],pri:'Front Delts',sec:'Upper Chest',cues:'Slight elbow bend, raise to eye level, controlled',setup:'Stand, dumbbells at sides',breathing:'Exhale raise',mistakes:'Using momentum, going above eye level',joint:{shoulder:2,elbow:0,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['front_delts'],secondary:['upper_chest']},regressions:['Cable Front Raise'],progressions:['Plate Front Raise'],met:3.5,tempoRec:'2-1-2-0'},

    // BACK (18)
    {n:'Deadlift',em:'💀',grp:'back',diff:3,bw:false,eq:['barbell'],pri:'Lower Back',sec:'Glutes, Hamstrings, Traps, Lats',cues:'Neutral spine, bar close to body, push floor away',setup:'Hip-width stance, bar over mid-foot, hinge from hips',breathing:'Big breath in, brace core, exhale at top',mistakes:'Rounding lower back, bar drifting forward',joint:{shoulder:1,elbow:1,knee:2,spine:3,hip:3},cns:3,muscles:{primary:['lower_back'],secondary:['glutes','hamstrings','traps','lats']},regressions:['Romanian Deadlift','Trap Bar Deadlift'],progressions:['Deficit Deadlift'],met:7.0,tempoRec:'1-0-2-0'},
    {n:'Barbell Row',em:'🚣',grp:'back',diff:2,bw:false,eq:['barbell'],pri:'Lats',sec:'Rhomboids, Biceps, Rear Delts',cues:'Hinge to 45°, pull to lower chest, squeeze shoulder blades',setup:'Hip-width stance, overhand grip, hinge forward',breathing:'Exhale on pull',mistakes:'Too upright, using lower back momentum',joint:{shoulder:2,elbow:1,knee:1,spine:2,hip:2},cns:2,muscles:{primary:['lats'],secondary:['rhomboids','biceps','rear_delts']},regressions:['DB Row','Cable Row'],progressions:['Pendlay Row'],met:5.5,tempoRec:'1-1-2-0'},
    {n:'Lat Pulldown',em:'⬇️',grp:'back',diff:1,bw:false,eq:['cables'],pri:'Lats',sec:'Biceps, Rear Delts',cues:'Lean back slightly, pull to upper chest, squeeze lats',setup:'Overhand grip wider than shoulder-width, slight back lean',breathing:'Exhale on pull',mistakes:'Pulling to back of neck, excessive swing',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['lats'],secondary:['biceps','rear_delts']},regressions:['Band Pulldown'],progressions:['Pull-Ups','Weighted Pull-Ups'],met:4.5,tempoRec:'2-1-2-0'},
    {n:'Seated Cable Row',em:'🏹',grp:'back',diff:1,bw:false,eq:['cables'],pri:'Lats',sec:'Rhomboids, Biceps',cues:'Pull to lower chest, stretch forward on eccentric',setup:'V-bar attachment, sit upright, slight lean back at peak',breathing:'Exhale on pull',mistakes:'Rounding forward excessively',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['lats'],secondary:['rhomboids','biceps']},regressions:['Band Row'],progressions:['Barbell Row'],met:4.5,tempoRec:'2-1-2-0'},
    {n:'Pull-Ups',em:'🔝',grp:'back',diff:2,bw:true,eq:['bar'],pri:'Lats',sec:'Biceps, Rear Delts',cues:'Dead hang start, drive elbows to floor, chin over bar',setup:'Overhand grip shoulder-width or slightly wider',breathing:'Exhale on pull',mistakes:'Partial reps, kipping without skill',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0},cns:2,muscles:{primary:['lats'],secondary:['biceps','rear_delts']},regressions:['Band-Assisted Pull-Ups','Lat Pulldown'],progressions:['Weighted Pull-Ups'],met:5.5,tempoRec:'2-1-1-1'},
    {n:'Chin-Ups',em:'🔝',grp:'back',diff:2,bw:true,eq:['bar'],pri:'Lats',sec:'Biceps',cues:'Supinated grip, elbows drive down and back',setup:'Underhand grip shoulder-width',breathing:'Exhale on pull',mistakes:'Not using full range of motion',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0},cns:2,muscles:{primary:['lats'],secondary:['biceps']},regressions:['Band-Assisted Chin-Ups','Lat Pulldown'],progressions:['Weighted Chin-Ups'],met:5.5,tempoRec:'2-1-1-1'},
    {n:'T-Bar Row',em:'🎯',grp:'back',diff:2,bw:false,eq:['barbell'],pri:'Lats',sec:'Rhomboids, Biceps',cues:'Chest supported or free, pull to sternum',setup:'Barbell in corner or T-bar machine',breathing:'Exhale pull',mistakes:'Using lower back',joint:{shoulder:2,elbow:1,knee:1,spine:2,hip:2},cns:2,muscles:{primary:['lats'],secondary:['rhomboids','biceps']},regressions:['DB Row'],progressions:['Barbell Row'],met:5.0,tempoRec:'1-1-2-0'},
    {n:'Dumbbell Row',em:'💪',grp:'back',diff:1,bw:false,eq:['dumbbell'],pri:'Lats',sec:'Rhomboids, Biceps',cues:'Support on bench, row to hip, elbow close to body',setup:'One hand and knee on bench, neutral spine',breathing:'Exhale on pull',mistakes:'Rotating torso, pulling with arm only',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['lats'],secondary:['rhomboids','biceps']},regressions:['Band Row'],progressions:['Barbell Row'],met:4.5,tempoRec:'2-1-2-0'},
    {n:'Face Pulls',em:'🎭',grp:'back',diff:1,bw:false,eq:['cables'],pri:'Rear Delts',sec:'Rhomboids, Traps',cues:'Rope to face level, pull apart at peak, external rotation',setup:'Cable at face height, rope attachment',breathing:'Exhale on pull',mistakes:'Using too much weight, no external rotation',joint:{shoulder:1,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['rear_delts'],secondary:['rhomboids','traps']},regressions:['Band Face Pulls'],progressions:['DB Rear Delt Fly'],met:3.5,tempoRec:'1-2-2-0'},
    {n:'Romanian Deadlift',em:'🦵',grp:'back',diff:2,bw:false,eq:['barbell'],pri:'Hamstrings',sec:'Glutes, Lower Back',cues:'Slight knee bend, hinge hips back, bar close to legs, feel stretch in hamstrings',setup:'Hip-width stance, overhand or mixed grip',breathing:'Inhale at top, exhale on return',mistakes:'Rounding back, squatting down instead of hinging',joint:{shoulder:1,elbow:1,knee:1,spine:2,hip:3},cns:2,muscles:{primary:['hamstrings'],secondary:['glutes','lower_back']},regressions:['KB Deadlift','Good Morning'],progressions:['Deficit RDL'],met:5.5,tempoRec:'1-1-3-0'},
    {n:'Pendlay Row',em:'🏊',grp:'back',diff:2,bw:false,eq:['barbell'],pri:'Lats',sec:'Rhomboids, Rear Delts',cues:'Parallel to floor, explosive pull from dead stop',setup:'Bar on floor, horizontal torso',breathing:'Exhale explosive pull',mistakes:'Not resetting bar each rep',joint:{shoulder:2,elbow:1,knee:1,spine:2,hip:2},cns:2,muscles:{primary:['lats'],secondary:['rhomboids','rear_delts']},regressions:['Barbell Row'],progressions:['Heavy Barbell Row'],met:5.5,tempoRec:'0-0-X-0'},
    {n:'Rear Delt Fly',em:'🦋',grp:'back',diff:1,bw:false,eq:['dumbbell'],pri:'Rear Delts',sec:'Rhomboids',cues:'Hinge 45°, lead with elbows, slight elbow bend',setup:'Seated or standing hinge, DBs hanging',breathing:'Exhale on fly',mistakes:'Using momentum, too heavy',joint:{shoulder:1,elbow:0,knee:0,spine:1,hip:1},cns:1,muscles:{primary:['rear_delts'],secondary:['rhomboids']},regressions:['Cable Rear Delt Fly'],progressions:['Heavy DB Rear Delt Fly'],met:3.5,tempoRec:'2-1-2-0'},
    {n:'Good Morning',em:'🌅',grp:'back',diff:2,bw:false,eq:['barbell'],pri:'Lower Back',sec:'Hamstrings, Glutes',cues:'Bar on traps, hip hinge, neutral spine throughout',setup:'Bar on upper traps, shoulder-width stance',breathing:'Inhale at top, exhale returning',mistakes:'Rounding spine, insufficient hip hinge',joint:{shoulder:1,elbow:0,knee:0,spine:3,hip:3},cns:2,muscles:{primary:['lower_back'],secondary:['hamstrings','glutes']},regressions:['Romanian Deadlift'],progressions:['Heavy RDL'],met:5.0,tempoRec:'2-1-1-0'},
    {n:'Hyperextensions',em:'🌈',grp:'back',diff:1,bw:true,eq:[],pri:'Lower Back',sec:'Glutes, Hamstrings',cues:'Hinge at hip pad, neutral spine, squeeze glutes at top',setup:'GHD or 45° back extension bench',breathing:'Exhale at top',mistakes:'Hyperextending lumbar at top',joint:{shoulder:0,elbow:0,knee:0,spine:2,hip:2},cns:1,muscles:{primary:['lower_back'],secondary:['glutes','hamstrings']},regressions:['Prone Superman'],progressions:['Weighted Hyperextension'],met:3.5,tempoRec:'2-1-1-0'},
    {n:'Trap Bar Deadlift',em:'🔷',grp:'back',diff:2,bw:false,eq:['machine'],pri:'Lower Back',sec:'Quads, Glutes, Traps',cues:'Sit into bar, neutral spine, push floor away',setup:'Trap/hex bar, handles at sides',breathing:'Big brace, exhale at top',mistakes:'Letting bar tip forward',joint:{shoulder:1,elbow:1,knee:2,spine:2,hip:3},cns:2,muscles:{primary:['lower_back'],secondary:['quads','glutes','traps']},regressions:['KB Deadlift'],progressions:['Barbell Deadlift'],met:6.0,tempoRec:'1-0-2-0'},
    {n:'Lat Pullover',em:'🌊',grp:'back',diff:1,bw:false,eq:['dumbbell'],pri:'Lats',sec:'Chest, Triceps',cues:'Slight elbow bend, feel lat stretch at top, squeeze at bottom',setup:'Bench perpendicular, shoulders on bench, hips low',breathing:'Inhale at stretch, exhale pull',mistakes:'Bending elbows too much',joint:{shoulder:2,elbow:1,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['lats'],secondary:['chest','triceps']},regressions:['Cable Pullover'],progressions:['Straight-Arm Pulldown'],met:4.0,tempoRec:'3-1-1-0'},
    {n:'Straight-Arm Pulldown',em:'⬇️',grp:'back',diff:1,bw:false,eq:['cables'],pri:'Lats',sec:'Rear Delts',cues:'Straight arms, lat-initiated pull, squeeze at bottom',setup:'Cable high, rope or bar, slight forward lean',breathing:'Exhale on pull',mistakes:'Bending elbows',joint:{shoulder:2,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['lats'],secondary:['rear_delts']},regressions:['Band Pulldown'],progressions:['Weighted Pull-Ups'],met:4.0,tempoRec:'2-1-2-0'},
    {n:'Shrugs',em:'🤷',grp:'back',diff:1,bw:false,eq:['barbell'],pri:'Traps',sec:'Rear Delts',cues:'Roll shoulders back not forward, squeeze at top',setup:'Barbell in front, shoulder-width grip',breathing:'Exhale on shrug',mistakes:'Rolling forward, using too heavy',joint:{shoulder:1,elbow:0,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['traps'],secondary:['rear_delts']},regressions:['DB Shrugs'],progressions:['Heavy Barbell Shrugs'],met:3.5,tempoRec:'1-2-1-0'},

    // LEGS (20)
    {n:'Back Squat',em:'🏋️',grp:'legs',diff:3,bw:false,eq:['barbell'],pri:'Quads',sec:'Glutes, Hamstrings, Core',cues:'Chest up, knees track toes, depth below parallel, drive through heels',setup:'Bar on upper traps, shoulder-width stance',breathing:'Brace before descent, exhale on ascent',mistakes:'Knee cave, forward lean, partial depth',joint:{shoulder:1,elbow:1,knee:3,spine:2,hip:3},cns:3,muscles:{primary:['quads'],secondary:['glutes','hamstrings','core']},regressions:['Goblet Squat','Box Squat'],progressions:['Pause Squat','Front Squat'],met:6.0,tempoRec:'2-1-1-0'},
    {n:'Front Squat',em:'🔄',grp:'legs',diff:3,bw:false,eq:['barbell'],pri:'Quads',sec:'Core, Glutes',cues:'Elbows high, upright torso, knees out',setup:'Clean grip or cross-arm, bar on front delts',breathing:'Brace, exhale up',mistakes:'Dropping elbows, excessive forward lean',joint:{shoulder:2,elbow:2,knee:3,spine:1,hip:3},cns:3,muscles:{primary:['quads'],secondary:['core','glutes']},regressions:['Goblet Squat'],progressions:['Pause Front Squat'],met:6.0,tempoRec:'2-1-1-0'},
    {n:'Leg Press',em:'🦵',grp:'legs',diff:1,bw:false,eq:['machine'],pri:'Quads',sec:'Glutes, Hamstrings',cues:'Full range, don\'t lock out completely, feet shoulder-width',setup:'Seat back reclined, feet at shoulder width on platform',breathing:'Exhale press, inhale lower',mistakes:'Letting lower back peel off pad',joint:{shoulder:0,elbow:0,knee:2,spine:1,hip:2},cns:1,muscles:{primary:['quads'],secondary:['glutes','hamstrings']},regressions:['Goblet Squat'],progressions:['Back Squat'],met:4.5,tempoRec:'2-0-1-0'},
    {n:'Leg Extension',em:'📺',grp:'legs',diff:1,bw:false,eq:['machine'],pri:'Quads',sec:'',cues:'Full extension, squeeze VMO at top, slow eccentric',setup:'Back against pad, ankle pad at lower shins',breathing:'Exhale extend',mistakes:'Swinging, partial ROM',joint:{shoulder:0,elbow:0,knee:2,spine:0,hip:0},cns:1,muscles:{primary:['quads'],secondary:[]},regressions:['Goblet Squat'],progressions:['Leg Press'],met:3.5,tempoRec:'2-2-1-0'},
    {n:'Leg Curl',em:'🦵',grp:'legs',diff:1,bw:false,eq:['machine'],pri:'Hamstrings',sec:'',cues:'Full contraction, don\'t allow hips to rise',setup:'Lying face down, ankle pad above heels',breathing:'Exhale curl',mistakes:'Raising hips, partial range',joint:{shoulder:0,elbow:0,knee:2,spine:0,hip:0},cns:1,muscles:{primary:['hamstrings'],secondary:[]},regressions:['Nordic Curl'],progressions:['Romanian Deadlift'],met:3.5,tempoRec:'2-2-1-0'},
    {n:'Hip Thrust',em:'🍑',grp:'legs',diff:1,bw:false,eq:['barbell'],pri:'Glutes',sec:'Hamstrings',cues:'Drive hips up, squeeze glutes hard at top, chin tucked',setup:'Upper back on bench, bar across hips, feet flat',breathing:'Exhale thrust up',mistakes:'Overextending lumbar, not squeezing at top',joint:{shoulder:0,elbow:0,knee:1,spine:2,hip:2},cns:1,muscles:{primary:['glutes'],secondary:['hamstrings']},regressions:['Glute Bridge BW'],progressions:['Banded Hip Thrust'],met:4.5,tempoRec:'1-2-1-0'},
    {n:'Bulgarian Split Squat',em:'🇧🇬',grp:'legs',diff:2,bw:false,eq:['dumbbell'],pri:'Quads',sec:'Glutes, Hamstrings',cues:'Front foot far enough to stay vertical shin, knee over toe',setup:'Rear foot on bench, front foot stepped out',breathing:'Exhale on ascent',mistakes:'Front knee caving, leaning too far forward',joint:{shoulder:0,elbow:0,knee:3,spine:1,hip:3},cns:2,muscles:{primary:['quads'],secondary:['glutes','hamstrings']},regressions:['Reverse Lunge'],progressions:['Back Squat'],met:5.0,tempoRec:'2-1-1-0'},
    {n:'Goblet Squat',em:'🏆',grp:'legs',diff:1,bw:false,eq:['kettlebell'],pri:'Quads',sec:'Glutes, Core',cues:'Hold KB at chest, heels down, chest up, knees out',setup:'Feet shoulder-width, toes slightly out',breathing:'Brace, exhale up',mistakes:'Heels rising, forward lean',joint:{shoulder:1,elbow:1,knee:2,spine:1,hip:2},cns:1,muscles:{primary:['quads'],secondary:['glutes','core']},regressions:['Box Squat'],progressions:['Front Squat'],met:4.5,tempoRec:'2-1-1-0'},
    {n:'Standing Calf Raise',em:'🦶',grp:'legs',diff:1,bw:false,eq:['machine'],pri:'Calves',sec:'',cues:'Full range, pause at bottom stretch, squeeze at top',setup:'Balls of feet on edge, straight legs',breathing:'Exhale raise',mistakes:'Partial range, bouncing',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['calves'],secondary:[]},regressions:['BW Calf Raise'],progressions:['Donkey Calf Raise'],met:3.5,tempoRec:'1-2-1-2'},
    {n:'Seated Calf Raise',em:'💺',grp:'legs',diff:1,bw:false,eq:['machine'],pri:'Calves',sec:'',cues:'Full range, soleus focus',setup:'Knees at 90°, pad above knees',breathing:'Exhale raise',mistakes:'Bouncing at bottom',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['calves'],secondary:[]},regressions:['BW Calf Raise'],progressions:['Standing Calf Raise'],met:3.0,tempoRec:'2-2-1-2'},
    {n:'Hack Squat',em:'🔧',grp:'legs',diff:2,bw:false,eq:['machine'],pri:'Quads',sec:'Glutes',cues:'Full depth, heels elevated on plate for more quad',setup:'Machine hack squat, shoulder pads secure',breathing:'Exhale press',mistakes:'Knees caving, shallow depth',joint:{shoulder:0,elbow:0,knee:3,spine:1,hip:2},cns:2,muscles:{primary:['quads'],secondary:['glutes']},regressions:['Leg Press'],progressions:['Back Squat'],met:5.0,tempoRec:'2-0-1-0'},
    {n:'Reverse Lunge',em:'🔙',grp:'legs',diff:1,bw:false,eq:['dumbbell'],pri:'Quads',sec:'Glutes',cues:'Step back, vertical shin on front leg, control descent',setup:'Standing, DBs in hands',breathing:'Exhale return to start',mistakes:'Forward knee drift, leaning',joint:{shoulder:0,elbow:0,knee:2,spine:1,hip:2},cns:1,muscles:{primary:['quads'],secondary:['glutes']},regressions:['Bodyweight Squat'],progressions:['Bulgarian Split Squat'],met:4.5,tempoRec:'2-0-1-0'},
    {n:'Walking Lunge',em:'🚶',grp:'legs',diff:2,bw:false,eq:['dumbbell'],pri:'Quads',sec:'Glutes, Hamstrings',cues:'Long stride, torso upright, control each step',setup:'Open space, DBs in hands',breathing:'Exhale step forward',mistakes:'Short stride, knee cave',joint:{shoulder:0,elbow:0,knee:2,spine:1,hip:2},cns:1,muscles:{primary:['quads'],secondary:['glutes','hamstrings']},regressions:['Reverse Lunge'],progressions:['Barbell Lunge'],met:5.0,tempoRec:'1-0-1-0'},
    {n:'Box Jump',em:'📦',grp:'legs',diff:2,bw:true,eq:[],pri:'Quads',sec:'Glutes, Calves',cues:'Hinge and explode, land softly, step down',setup:'Stable box 18-24 inches',breathing:'Exhale jump',mistakes:'Landing with locked knees',joint:{shoulder:0,elbow:0,knee:2,spine:1,hip:2},cns:2,muscles:{primary:['quads'],secondary:['glutes','calves']},regressions:['Squat Jump'],progressions:['Depth Drop'],met:8.0,tempoRec:'0-0-X-0'},
    {n:'Nordic Curl',em:'🎿',grp:'legs',diff:3,bw:true,eq:[],pri:'Hamstrings',sec:'Glutes',cues:'Eccentric focus, lower as slowly as possible',setup:'Feet anchored, kneel',breathing:'Inhale lower, exhale pull back',mistakes:'Going too fast on eccentric',joint:{shoulder:0,elbow:0,knee:3,spine:0,hip:1},cns:2,muscles:{primary:['hamstrings'],secondary:['glutes']},regressions:['Leg Curl'],progressions:['Weighted Nordic Curl'],met:5.0,tempoRec:'4-0-1-0'},
    {n:'Step-Ups',em:'👆',grp:'legs',diff:1,bw:false,eq:['dumbbell'],pri:'Quads',sec:'Glutes',cues:'Drive through heel of lead leg, don\'t push off back foot',setup:'Stable box or bench 16-20 inches',breathing:'Exhale step up',mistakes:'Pushing off back foot',joint:{shoulder:0,elbow:0,knee:2,spine:1,hip:2},cns:1,muscles:{primary:['quads'],secondary:['glutes']},regressions:['Bodyweight Step-Ups'],progressions:['Bulgarian Split Squat'],met:4.5,tempoRec:'1-1-2-0'},
    {n:'Cable Pull-Through',em:'🔌',grp:'legs',diff:1,bw:false,eq:['cables'],pri:'Glutes',sec:'Hamstrings',cues:'Hip hinge, keep arms between legs, squeeze glutes at top',setup:'Cable at floor level, rope attachment, face away',breathing:'Exhale thrust forward',mistakes:'Squatting instead of hinging',joint:{shoulder:1,elbow:0,knee:1,spine:1,hip:2},cns:1,muscles:{primary:['glutes'],secondary:['hamstrings']},regressions:['Glute Bridge'],progressions:['Hip Thrust'],met:4.0,tempoRec:'1-1-2-0'},
    {n:'Sumo Deadlift',em:'🤼',grp:'legs',diff:2,bw:false,eq:['barbell'],pri:'Glutes',sec:'Quads, Hamstrings, Lower Back',cues:'Wide stance, toes out, knees out, short range of motion',setup:'Wide stance, toes pointed out, grip inside legs',breathing:'Brace, exhale at top',mistakes:'Knee cave, rounding back',joint:{shoulder:1,elbow:1,knee:2,spine:2,hip:3},cns:2,muscles:{primary:['glutes'],secondary:['quads','hamstrings','lower_back']},regressions:['KB Deadlift'],progressions:['Conventional Deadlift'],met:5.5,tempoRec:'1-0-2-0'},
    {n:'Leg Press Calf Raise',em:'🦵',grp:'legs',diff:1,bw:false,eq:['machine'],pri:'Calves',sec:'',cues:'Full range, slow and controlled',setup:'Leg press machine, toes on platform edge',breathing:'Exhale raise',mistakes:'Partial range',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['calves'],secondary:[]},regressions:['BW Calf Raise'],progressions:['Standing Calf Raise'],met:3.0,tempoRec:'1-2-1-2'},
    {n:'Glute Bridge',em:'🌉',grp:'legs',diff:1,bw:true,eq:[],pri:'Glutes',sec:'Hamstrings',cues:'Drive hips up, squeeze glutes at top, neutral spine',setup:'Lie on back, knees bent, feet flat',breathing:'Exhale thrust',mistakes:'Overextending lumbar',joint:{shoulder:0,elbow:0,knee:1,spine:1,hip:2},cns:1,muscles:{primary:['glutes'],secondary:['hamstrings']},regressions:['Prone Hip Extension'],progressions:['Hip Thrust'],met:3.5,tempoRec:'1-2-1-0'},

    // SHOULDERS (14)
    {n:'Overhead Press',em:'🏗️',grp:'shoulders',diff:2,bw:false,eq:['barbell'],pri:'Front Delts',sec:'Side Delts, Triceps, Traps',cues:'Bar path vertical, slight back lean, flare elbows at top',setup:'Shoulder-width grip, bar at upper chest',breathing:'Brace, exhale press',mistakes:'Excessive back arch, forward bar path',joint:{shoulder:2,elbow:1,knee:0,spine:2,hip:0},cns:2,muscles:{primary:['front_delts'],secondary:['side_delts','triceps','traps']},regressions:['DB Shoulder Press'],progressions:['Push Press'],met:5.0,tempoRec:'2-0-1-0'},
    {n:'Dumbbell Shoulder Press',em:'💪',grp:'shoulders',diff:1,bw:false,eq:['dumbbell'],pri:'Front Delts',sec:'Side Delts, Triceps',cues:'Neutral grip or pronated, full range, controlled',setup:'Seated or standing, DBs at shoulder height',breathing:'Exhale press',mistakes:'Partial range, elbows flaring too wide',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['front_delts'],secondary:['side_delts','triceps']},regressions:['Landmine Press'],progressions:['Barbell OHP'],met:4.5,tempoRec:'2-0-1-0'},
    {n:'Arnold Press',em:'💪',grp:'shoulders',diff:1,bw:false,eq:['dumbbell'],pri:'Front Delts',sec:'Side Delts, Rear Delts',cues:'Rotate palms as you press, full range of motion',setup:'Seated, start with DBs in front at chin height',breathing:'Exhale press',mistakes:'Partial rotation, too heavy',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['front_delts'],secondary:['side_delts','rear_delts']},regressions:['DB Shoulder Press'],progressions:['Barbell OHP'],met:4.5,tempoRec:'2-0-1-0'},
    {n:'Dumbbell Lateral Raise',em:'↔️',grp:'shoulders',diff:1,bw:false,eq:['dumbbell'],pri:'Side Delts',sec:'Traps',cues:'Lead with elbows not hands, raise to ear height, slight forward lean',setup:'Standing, DBs at sides, slight elbow bend',breathing:'Exhale raise',mistakes:'Using momentum, going too heavy, past parallel',joint:{shoulder:2,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['side_delts'],secondary:['traps']},regressions:['Cable Lateral Raise'],progressions:['Machine Lateral Raise'],met:3.5,tempoRec:'2-1-2-0'},
    {n:'Cable Lateral Raise',em:'⚡',grp:'shoulders',diff:1,bw:false,eq:['cables'],pri:'Side Delts',sec:'Traps',cues:'Constant tension, controlled throughout full range',setup:'Cable at floor, D-ring, stand beside machine',breathing:'Exhale raise',mistakes:'Using momentum',joint:{shoulder:2,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['side_delts'],secondary:['traps']},regressions:['DB Lateral Raise'],progressions:['Machine Lateral Raise'],met:3.5,tempoRec:'2-1-2-0'},
    {n:'Upright Row',em:'⬆️',grp:'shoulders',diff:2,bw:false,eq:['barbell'],pri:'Side Delts',sec:'Traps, Biceps',cues:'Elbows lead, pull to lower chin, wide grip',setup:'Shoulder-width or wider grip, bar against body',breathing:'Exhale pull',mistakes:'Narrow grip causes impingement',joint:{shoulder:3,elbow:1,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['side_delts'],secondary:['traps','biceps']},regressions:['DB Lateral Raise'],progressions:['Heavy DB Lateral Raise'],met:4.0,tempoRec:'2-1-2-0'},
    {n:'Machine Shoulder Press',em:'🖥️',grp:'shoulders',diff:1,bw:false,eq:['machine'],pri:'Front Delts',sec:'Side Delts, Triceps',cues:'Adjust seat height, full range, controlled',setup:'Seat so handles align with upper chest',breathing:'Exhale press',mistakes:'Partial range',joint:{shoulder:1,elbow:1,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['front_delts'],secondary:['side_delts','triceps']},regressions:['DB Shoulder Press'],progressions:['Barbell OHP'],met:4.0,tempoRec:'2-0-1-0'},
    {n:'Rear Delt Machine',em:'🔄',grp:'shoulders',diff:1,bw:false,eq:['machine'],pri:'Rear Delts',sec:'Rhomboids',cues:'Squeeze rear delts at peak contraction',setup:'Pec deck in reverse, chest against pad',breathing:'Exhale on fly',mistakes:'Going too heavy',joint:{shoulder:1,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['rear_delts'],secondary:['rhomboids']},regressions:['DB Rear Delt Fly'],progressions:['Heavy Rear Delt Fly'],met:3.5,tempoRec:'2-2-1-0'},
    {n:'Push Press',em:'⬆️',grp:'shoulders',diff:2,bw:false,eq:['barbell'],pri:'Front Delts',sec:'Triceps, Legs',cues:'Dip and drive legs, lock out overhead',setup:'Barbell at shoulder height in rack',breathing:'Exhale drive',mistakes:'Excessive knee bend, bar path not vertical',joint:{shoulder:2,elbow:1,knee:1,spine:2,hip:1},cns:2,muscles:{primary:['front_delts'],secondary:['triceps','quads']},regressions:['Overhead Press'],progressions:['Push Jerk'],met:5.5,tempoRec:'0-0-X-0'},
    {n:'Lateral Raise Machine',em:'🖥️',grp:'shoulders',diff:1,bw:false,eq:['machine'],pri:'Side Delts',sec:'',cues:'Constant tension, no momentum',setup:'Arm pad at elbow level, seated',breathing:'Exhale raise',mistakes:'Leaning to one side',joint:{shoulder:1,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['side_delts'],secondary:[]},regressions:['DB Lateral Raise'],progressions:['Cable Lateral Raise'],met:3.5,tempoRec:'2-1-2-0'},
    {n:'Dumbbell Y-Raise',em:'🔱',grp:'shoulders',diff:1,bw:false,eq:['dumbbell'],pri:'Rear Delts',sec:'Traps',cues:'Prone on incline bench, raise DBs to Y position',setup:'Incline bench 30-45°, lie prone',breathing:'Exhale raise',mistakes:'Using momentum',joint:{shoulder:1,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['rear_delts'],secondary:['traps']},regressions:['Face Pulls'],progressions:['DB Rear Delt Fly'],met:3.5,tempoRec:'2-1-2-0'},
    {n:'Band Pull-Aparts',em:'↔️',grp:'shoulders',diff:1,bw:false,eq:['bands'],pri:'Rear Delts',sec:'Rhomboids',cues:'Straight arms, controlled pull apart at chest height',setup:'Band in front at chest height',breathing:'Exhale pull apart',mistakes:'Too much elbow bend',joint:{shoulder:1,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['rear_delts'],secondary:['rhomboids']},regressions:['Cable Face Pulls'],progressions:['Face Pulls'],met:3.0,tempoRec:'1-2-2-0'},
    {n:'Seated DB Press',em:'💺',grp:'shoulders',diff:1,bw:false,eq:['dumbbell'],pri:'Front Delts',sec:'Side Delts, Triceps',cues:'Neutral back, full range press',setup:'Bench with back support, DBs at shoulder height',breathing:'Exhale press',mistakes:'Arching back',joint:{shoulder:2,elbow:1,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['front_delts'],secondary:['side_delts','triceps']},regressions:['Landmine Press'],progressions:['Barbell OHP'],met:4.5,tempoRec:'2-0-1-0'},
    {n:'Cable Face Pull',em:'🎭',grp:'shoulders',diff:1,bw:false,eq:['cables'],pri:'Rear Delts',sec:'Traps, Rhomboids',cues:'Pull to face level, external rotation at peak',setup:'Rope at eye level',breathing:'Exhale pull',mistakes:'No external rotation',joint:{shoulder:1,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['rear_delts'],secondary:['traps','rhomboids']},regressions:['Band Pull-Aparts'],progressions:['DB Rear Delt Fly'],met:3.5,tempoRec:'1-2-2-0'},

    // BICEPS (10)
    {n:'Barbell Curl',em:'💪',grp:'biceps',diff:1,bw:false,eq:['barbell'],pri:'Biceps',sec:'Brachialis',cues:'Elbows pinned at sides, full range, no swinging',setup:'Shoulder-width underhand grip, stand tall',breathing:'Exhale curl',mistakes:'Swinging body, partial range',joint:{shoulder:0,elbow:2,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['biceps'],secondary:['brachialis']},regressions:['DB Curl'],progressions:['Incline DB Curl'],met:4.0,tempoRec:'2-1-1-0'},
    {n:'EZ Bar Curl',em:'〰️',grp:'biceps',diff:1,bw:false,eq:['barbell'],pri:'Biceps',sec:'Brachialis',cues:'Neutral shoulder, full range',setup:'EZ bar angled grip, elbows at sides',breathing:'Exhale curl',mistakes:'Swinging',joint:{shoulder:0,elbow:1,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['biceps'],secondary:['brachialis']},regressions:['DB Curl'],progressions:['Barbell Curl'],met:4.0,tempoRec:'2-1-1-0'},
    {n:'Dumbbell Curl',em:'💪',grp:'biceps',diff:1,bw:false,eq:['dumbbell'],pri:'Biceps',sec:'',cues:'Supinate at top, full range',setup:'Alternate or simultaneously',breathing:'Exhale curl',mistakes:'Swinging, no supination',joint:{shoulder:0,elbow:1,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['biceps'],secondary:[]},regressions:['Band Curl'],progressions:['Barbell Curl'],met:3.5,tempoRec:'2-1-1-0'},
    {n:'Hammer Curl',em:'🔨',grp:'biceps',diff:1,bw:false,eq:['dumbbell'],pri:'Brachialis',sec:'Biceps',cues:'Neutral grip, hammer position, controlled',setup:'Neutral grip, DBs at sides',breathing:'Exhale curl',mistakes:'Swinging',joint:{shoulder:0,elbow:1,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['brachialis'],secondary:['biceps']},regressions:['Band Curl'],progressions:['Cross-Body Hammer Curl'],met:3.5,tempoRec:'2-1-1-0'},
    {n:'Incline Dumbbell Curl',em:'📐',grp:'biceps',diff:1,bw:false,eq:['dumbbell'],pri:'Biceps',sec:'',cues:'Full stretch at bottom, peak contraction at top',setup:'Incline bench 45-60°, arms hang straight',breathing:'Exhale curl',mistakes:'Not using full range',joint:{shoulder:1,elbow:1,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['biceps'],secondary:[]},regressions:['DB Curl'],progressions:['Concentration Curl'],met:4.0,tempoRec:'3-1-1-0'},
    {n:'Cable Curl',em:'⚡',grp:'biceps',diff:1,bw:false,eq:['cables'],pri:'Biceps',sec:'',cues:'Constant tension, squeeze at top',setup:'Low pulley, straight bar or EZ attachment',breathing:'Exhale curl',mistakes:'Elbow drift',joint:{shoulder:0,elbow:1,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['biceps'],secondary:[]},regressions:['Band Curl'],progressions:['Barbell Curl'],met:3.5,tempoRec:'2-1-2-0'},
    {n:'Preacher Curl',em:'🙏',grp:'biceps',diff:1,bw:false,eq:['machine'],pri:'Biceps',sec:'',cues:'Full extension, squeeze at top',setup:'Preacher bench, upper arms on pad',breathing:'Exhale curl',mistakes:'Not reaching full extension',joint:{shoulder:0,elbow:2,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['biceps'],secondary:[]},regressions:['DB Curl'],progressions:['Barbell Curl'],met:3.5,tempoRec:'2-2-1-0'},
    {n:'Concentration Curl',em:'🎯',grp:'biceps',diff:1,bw:false,eq:['dumbbell'],pri:'Biceps',sec:'',cues:'Elbow against inner thigh, full range',setup:'Seated, elbow braced against inner thigh',breathing:'Exhale curl',mistakes:'Swinging arm off thigh',joint:{shoulder:0,elbow:1,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['biceps'],secondary:[]},regressions:['DB Curl'],progressions:['Cable Curl'],met:3.5,tempoRec:'2-2-1-0'},
    {n:'Spider Curl',em:'🕷️',grp:'biceps',diff:1,bw:false,eq:['barbell'],pri:'Biceps',sec:'',cues:'Prone on incline bench, elbows hang straight down',setup:'Incline bench, chest against it facing down',breathing:'Exhale curl',mistakes:'Elbow drift backward',joint:{shoulder:0,elbow:1,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['biceps'],secondary:[]},regressions:['DB Curl'],progressions:['Barbell Curl'],met:4.0,tempoRec:'2-2-1-0'},
    {n:'Cross-Body Hammer Curl',em:'↙️',grp:'biceps',diff:1,bw:false,eq:['dumbbell'],pri:'Brachialis',sec:'Biceps',cues:'Curl across body, neutral grip throughout',setup:'Standing, DB at side, curl across to opposite shoulder',breathing:'Exhale curl',mistakes:'Shoulder elevation',joint:{shoulder:0,elbow:1,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['brachialis'],secondary:['biceps']},regressions:['Hammer Curl'],progressions:['Cross-Body Cable Curl'],met:3.5,tempoRec:'2-1-1-0'},

    // TRICEPS (10)
    {n:'Tricep Pushdown',em:'⬇️',grp:'triceps',diff:1,bw:false,eq:['cables'],pri:'Triceps',sec:'',cues:'Elbows pinned at sides, full extension, squeeze',setup:'High cable, rope or V-bar, elbows at sides',breathing:'Exhale push',mistakes:'Elbows drifting forward, partial range',joint:{shoulder:0,elbow:2,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['triceps'],secondary:[]},regressions:['Band Pushdown'],progressions:['Close-Grip Bench Press'],met:3.5,tempoRec:'2-1-1-0'},
    {n:'Overhead Tricep Extension',em:'🔝',grp:'triceps',diff:1,bw:false,eq:['dumbbell'],pri:'Triceps',sec:'',cues:'Elbows point up, full stretch overhead, squeeze',setup:'Single DB, seated or standing, both hands',breathing:'Exhale extend',mistakes:'Elbows flaring, limited range',joint:{shoulder:1,elbow:2,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['triceps'],secondary:[]},regressions:['Cable Overhead Extension'],progressions:['EZ Bar Skull Crusher'],met:4.0,tempoRec:'3-1-1-0'},
    {n:'Skull Crushers',em:'💀',grp:'triceps',diff:2,bw:false,eq:['barbell'],pri:'Triceps',sec:'',cues:'Lower to forehead or behind head, elbows point up',setup:'Flat bench, EZ bar or straight bar',breathing:'Exhale extend',mistakes:'Elbows flaring, bar hitting face',joint:{shoulder:1,elbow:2,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['triceps'],secondary:[]},regressions:['DB Overhead Extension'],progressions:['Close-Grip Bench Press'],met:4.0,tempoRec:'2-1-1-0'},
    {n:'Tricep Dip',em:'💎',grp:'triceps',diff:2,bw:true,eq:['bar'],pri:'Triceps',sec:'Front Delts, Chest',cues:'Stay upright to target triceps, full range',setup:'Parallel bars, body straight',breathing:'Exhale dip',mistakes:'Leaning forward (shifts to chest)',joint:{shoulder:2,elbow:2,knee:0,spine:1,hip:0},cns:2,muscles:{primary:['triceps'],secondary:['front_delts','chest']},regressions:['Bench Dip'],progressions:['Weighted Tricep Dip'],met:5.0,tempoRec:'2-1-1-0'},
    {n:'Cable Overhead Extension',em:'⚡',grp:'triceps',diff:1,bw:false,eq:['cables'],pri:'Triceps',sec:'',cues:'Face away from cable, rope overhead, full stretch',setup:'Cable at low position, rope overhead',breathing:'Exhale extend',mistakes:'Elbows too wide',joint:{shoulder:1,elbow:2,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['triceps'],secondary:[]},regressions:['DB Overhead Extension'],progressions:['Skull Crusher'],met:3.5,tempoRec:'3-1-1-0'},
    {n:'Bench Dip',em:'🪑',grp:'triceps',diff:1,bw:true,eq:[],pri:'Triceps',sec:'Front Delts',cues:'Hips close to bench, full range',setup:'Hands on bench edge, feet on floor',breathing:'Exhale dip',mistakes:'Hips drifting far from bench',joint:{shoulder:2,elbow:1,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['triceps'],secondary:['front_delts']},regressions:['Seated Tricep Press'],progressions:['Tricep Dip'],met:4.0,tempoRec:'2-1-1-0'},
    {n:'Tricep Kickback',em:'↩️',grp:'triceps',diff:1,bw:false,eq:['dumbbell'],pri:'Triceps',sec:'',cues:'Upper arm parallel to floor, full extension',setup:'Bent over, elbow at side, upper arm parallel to floor',breathing:'Exhale kick back',mistakes:'Not locking upper arm',joint:{shoulder:0,elbow:1,knee:0,spine:1,hip:1},cns:1,muscles:{primary:['triceps'],secondary:[]},regressions:['Band Kickback'],progressions:['Cable Kickback'],met:3.5,tempoRec:'1-2-1-0'},
    {n:'Diamond Push-Ups',em:'💎',grp:'triceps',diff:2,bw:true,eq:[],pri:'Triceps',sec:'Chest',cues:'Hands form diamond shape, elbows track back',setup:'Push-up position with diamond hand formation',breathing:'Exhale push',mistakes:'Elbows flaring',joint:{shoulder:1,elbow:2,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['triceps'],secondary:['chest']},regressions:['Close-Grip Push-Ups'],progressions:['Weighted Diamond Push-Ups'],met:4.5,tempoRec:'2-0-1-0'},
    {n:'JM Press',em:'🏗️',grp:'triceps',diff:2,bw:false,eq:['barbell'],pri:'Triceps',sec:'Chest',cues:'Cross between close-grip bench and skull crusher',setup:'Barbell, medium grip, lower to throat',breathing:'Exhale press',mistakes:'Bar path too vertical',joint:{shoulder:1,elbow:2,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['triceps'],secondary:['chest']},regressions:['Close-Grip Bench Press'],progressions:['Skull Crusher'],met:4.5,tempoRec:'2-1-1-0'},
    {n:'Single-Arm Cable Pushdown',em:'🎯',grp:'triceps',diff:1,bw:false,eq:['cables'],pri:'Triceps',sec:'',cues:'Single arm, full extension, twist at bottom',setup:'High cable, D-ring attachment, single arm',breathing:'Exhale push',mistakes:'Elbow drift',joint:{shoulder:0,elbow:1,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['triceps'],secondary:[]},regressions:['Band Pushdown'],progressions:['Tricep Pushdown'],met:3.5,tempoRec:'2-1-1-0'},

    // CORE (12)
    {n:'Plank',em:'🔲',grp:'core',diff:1,bw:true,eq:[],pri:'Core',sec:'Shoulders, Glutes',cues:'Rigid body, squeeze everything, neutral spine',setup:'Forearms on floor, body plank position',breathing:'Steady controlled breathing',mistakes:'Hips sagging or rising',joint:{shoulder:1,elbow:0,knee:0,spine:1,hip:1},cns:1,muscles:{primary:['core'],secondary:['shoulders','glutes']},regressions:['Knee Plank'],progressions:['Weighted Plank','RKC Plank'],met:3.5,tempoRec:'hold'},
    {n:'Cable Crunch',em:'⚡',grp:'core',diff:1,bw:false,eq:['cables'],pri:'Abs',sec:'',cues:'Round spine, crunch elbows to knees',setup:'High cable, rope, kneel facing cable',breathing:'Exhale crunch',mistakes:'Using hip flexors, not rounding spine',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['abs'],secondary:[]},regressions:['Crunch'],progressions:['Weighted Crunch'],met:3.5,tempoRec:'2-1-1-0'},
    {n:'Hanging Leg Raise',em:'🏋️',grp:'core',diff:2,bw:true,eq:['bar'],pri:'Abs',sec:'Hip Flexors',cues:'No swing, posterior pelvic tilt at top',setup:'Dead hang, raise legs to parallel or above',breathing:'Exhale raise',mistakes:'Swinging, not rounding at top',joint:{shoulder:1,elbow:0,knee:0,spine:1,hip:2},cns:1,muscles:{primary:['abs'],secondary:['hip_flexors']},regressions:['Knee Raise'],progressions:['Toes to Bar'],met:4.5,tempoRec:'2-1-2-0'},
    {n:'Russian Twist',em:'🌀',grp:'core',diff:1,bw:true,eq:[],pri:'Obliques',sec:'Abs',cues:'Rotate from torso, not just arms',setup:'Seated, feet off floor, slight lean back',breathing:'Exhale twist',mistakes:'Rotating from arms only',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['obliques'],secondary:['abs']},regressions:['Seated Twist'],progressions:['Weighted Russian Twist'],met:3.5,tempoRec:'1-0-1-0'},
    {n:'Ab Wheel Rollout',em:'🎡',grp:'core',diff:3,bw:true,eq:[],pri:'Abs',sec:'Shoulders, Lats',cues:'Neutral spine, don\'t let hips drop, roll from knees',setup:'Kneel, ab wheel in hands',breathing:'Inhale roll out, exhale return',mistakes:'Hips sagging, lower back arching',joint:{shoulder:2,elbow:0,knee:0,spine:2,hip:1},cns:2,muscles:{primary:['abs'],secondary:['shoulders','lats']},regressions:['Plank'],progressions:['Standing Ab Wheel'],met:5.0,tempoRec:'2-1-2-0'},
    {n:'Dead Bug',em:'🐛',grp:'core',diff:1,bw:true,eq:[],pri:'Core',sec:'Hip Flexors',cues:'Lower back pressed to floor throughout, opposite arm-leg extension',setup:'Lie on back, arms up, knees at 90°',breathing:'Exhale extend',mistakes:'Lower back arching off floor',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['core'],secondary:['hip_flexors']},regressions:['Bird Dog'],progressions:['Weighted Dead Bug'],met:3.5,tempoRec:'2-0-2-0'},
    {n:'Pallof Press',em:'🎯',grp:'core',diff:1,bw:false,eq:['cables'],pri:'Core',sec:'Obliques',cues:'Resist rotation, press out and return, square to cable',setup:'Cable at chest height, side on to machine',breathing:'Exhale press out',mistakes:'Rotating torso',joint:{shoulder:1,elbow:0,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['core'],secondary:['obliques']},regressions:['Band Pallof Press'],progressions:['Overhead Pallof Press'],met:3.5,tempoRec:'2-2-2-0'},
    {n:'Mountain Climbers',em:'🧗',grp:'core',diff:2,bw:true,eq:[],pri:'Core',sec:'Hip Flexors, Shoulders',cues:'High plank, alternate knees to chest, hips level',setup:'Push-up position, alternate drive knees to chest',breathing:'Steady',mistakes:'Piking hips up',joint:{shoulder:2,elbow:0,knee:0,spine:1,hip:1},cns:1,muscles:{primary:['core'],secondary:['hip_flexors','shoulders']},regressions:['Plank'],progressions:['Explosive Mountain Climbers'],met:8.0,tempoRec:'explosive'},
    {n:'Bicycle Crunch',em:'🚴',grp:'core',diff:1,bw:true,eq:[],pri:'Obliques',sec:'Abs',cues:'Opposite elbow to opposite knee, fully extend',setup:'Lie on back, hands behind head',breathing:'Exhale crunch',mistakes:'Pulling neck, not extending leg',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:1},cns:1,muscles:{primary:['obliques'],secondary:['abs']},regressions:['Crunch'],progressions:['Weighted Bicycle Crunch'],met:5.0,tempoRec:'1-1-1-0'},
    {n:'Hollow Hold',em:'🥊',grp:'core',diff:2,bw:true,eq:[],pri:'Core',sec:'Hip Flexors',cues:'Lower back pressed down, slight hollow curve in back',setup:'Lie on back, arms overhead, legs extended',breathing:'Steady deep breathing',mistakes:'Lower back arching',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:1},cns:1,muscles:{primary:['core'],secondary:['hip_flexors']},regressions:['Dead Bug'],progressions:['Hollow Rock'],met:4.0,tempoRec:'hold'},
    {n:'Leg Raises',em:'🦵',grp:'core',diff:1,bw:true,eq:[],pri:'Abs',sec:'Hip Flexors',cues:'Posterior pelvic tilt at top, control descent',setup:'Lie on back, legs together',breathing:'Exhale raise',mistakes:'Lower back arching off floor',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:2},cns:1,muscles:{primary:['abs'],secondary:['hip_flexors']},regressions:['Knee Raise'],progressions:['Hanging Leg Raise'],met:3.5,tempoRec:'2-1-2-0'},
    {n:'Side Plank',em:'📐',grp:'core',diff:1,bw:true,eq:[],pri:'Obliques',sec:'Core, Shoulders',cues:'Straight line from head to heels, squeeze obliques',setup:'Side on floor, forearm down, stack feet',breathing:'Steady',mistakes:'Hips sagging',joint:{shoulder:1,elbow:0,knee:0,spine:1,hip:1},cns:1,muscles:{primary:['obliques'],secondary:['core','shoulders']},regressions:['Knee Side Plank'],progressions:['Weighted Side Plank'],met:3.5,tempoRec:'hold'},

    // GLUTES (10)
    {n:'Hip Thrust BW',em:'🍑',grp:'glutes',diff:1,bw:true,eq:[],pri:'Glutes',sec:'Hamstrings',cues:'Chin tucked, squeeze glutes hard at top',setup:'Upper back on bench, knees bent',breathing:'Exhale thrust',mistakes:'Hyperextending lower back',joint:{shoulder:0,elbow:0,knee:1,spine:1,hip:2},cns:1,muscles:{primary:['glutes'],secondary:['hamstrings']},regressions:['Glute Bridge'],progressions:['Hip Thrust'],met:3.5,tempoRec:'1-2-1-0'},
    {n:'Cable Glute Kickback',em:'🔌',grp:'glutes',diff:1,bw:false,eq:['cables'],pri:'Glutes',sec:'Hamstrings',cues:'Kick back and up, squeeze at peak',setup:'Cable at ankle, face cable, hold support',breathing:'Exhale kick',mistakes:'Hyperextending back',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:2},cns:1,muscles:{primary:['glutes'],secondary:['hamstrings']},regressions:['Donkey Kickback'],progressions:['Hip Thrust'],met:3.5,tempoRec:'2-2-1-0'},
    {n:'Banded Clamshell',em:'🐚',grp:'glutes',diff:1,bw:false,eq:['bands'],pri:'Glutes',sec:'',cues:'Open hip like a clamshell, keep pelvis stable',setup:'Lie on side, band above knees',breathing:'Exhale open',mistakes:'Rolling pelvis back',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:2},cns:1,muscles:{primary:['glutes'],secondary:[]},regressions:['Clamshell no band'],progressions:['Fire Hydrant'],met:3.0,tempoRec:'2-2-1-0'},
    {n:'Sumo Squat',em:'🤼',grp:'glutes',diff:1,bw:false,eq:['dumbbell'],pri:'Glutes',sec:'Quads, Inner Thighs',cues:'Wide stance, toes out, knees track toes',setup:'Wide stance, hold KB or DB between legs',breathing:'Brace, exhale up',mistakes:'Knee cave',joint:{shoulder:0,elbow:0,knee:2,spine:1,hip:2},cns:1,muscles:{primary:['glutes'],secondary:['quads','adductors']},regressions:['Bodyweight Squat'],progressions:['Barbell Sumo Squat'],met:4.5,tempoRec:'2-1-1-0'},
    {n:'Donkey Kickback',em:'🐴',grp:'glutes',diff:1,bw:true,eq:[],pri:'Glutes',sec:'Hamstrings',cues:'Kick back and up, squeeze at top, core tight',setup:'All fours on floor or bench',breathing:'Exhale kick',mistakes:'Rotating hip or arching back',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:2},cns:1,muscles:{primary:['glutes'],secondary:['hamstrings']},regressions:['Glute Bridge'],progressions:['Cable Glute Kickback'],met:3.5,tempoRec:'2-2-1-0'},
    {n:'Fire Hydrant',em:'🔥',grp:'glutes',diff:1,bw:true,eq:[],pri:'Glutes',sec:'',cues:'Open hip out, keep pelvis level',setup:'All fours, neutral spine',breathing:'Exhale raise',mistakes:'Twisting torso',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:2},cns:1,muscles:{primary:['glutes'],secondary:[]},regressions:['Clamshell'],progressions:['Banded Fire Hydrant'],met:3.0,tempoRec:'2-2-1-0'},
    {n:'Single Leg RDL',em:'🦩',grp:'glutes',diff:2,bw:false,eq:['dumbbell'],pri:'Glutes',sec:'Hamstrings, Core',cues:'Hip hinge, balance, feel hamstring stretch',setup:'Standing, DB in opposite hand to raised leg',breathing:'Inhale hinge, exhale stand',mistakes:'Rotating hip, rounding back',joint:{shoulder:0,elbow:0,knee:1,spine:2,hip:3},cns:1,muscles:{primary:['glutes'],secondary:['hamstrings','core']},regressions:['Romanian Deadlift'],progressions:['Barbell Single Leg RDL'],met:4.5,tempoRec:'2-1-1-0'},
    {n:'Lateral Band Walk',em:'↔️',grp:'glutes',diff:1,bw:false,eq:['bands'],pri:'Glutes',sec:'',cues:'Small steps, keep tension in band throughout',setup:'Band above knees, quarter squat position',breathing:'Steady',mistakes:'Steps too big losing tension',joint:{shoulder:0,elbow:0,knee:1,spine:0,hip:1},cns:1,muscles:{primary:['glutes'],secondary:[]},regressions:['Banded Clamshell'],progressions:['Weighted Lateral Walk'],met:4.0,tempoRec:'controlled'},
    {n:'Seated Hip Abduction',em:'🦋',grp:'glutes',diff:1,bw:false,eq:['machine'],pri:'Glutes',sec:'',cues:'Full range, slow eccentric',setup:'Machine, sit upright, pads on outer thighs',breathing:'Exhale open',mistakes:'Using momentum',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:2},cns:1,muscles:{primary:['glutes'],secondary:[]},regressions:['Banded Clamshell'],progressions:['Standing Cable Abduction'],met:3.5,tempoRec:'2-2-1-0'},
    {n:'Reverse Hyperextension',em:'🔄',grp:'glutes',diff:1,bw:true,eq:[],pri:'Glutes',sec:'Hamstrings, Lower Back',cues:'Swing legs back and up from hips',setup:'Lie prone on bench, hips at edge',breathing:'Exhale raise',mistakes:'Hyperextending lumbar',joint:{shoulder:0,elbow:0,knee:0,spine:2,hip:2},cns:1,muscles:{primary:['glutes'],secondary:['hamstrings','lower_back']},regressions:['Glute Bridge'],progressions:['Weighted Reverse Hyper'],met:4.0,tempoRec:'2-1-1-0'},

    // FULL BODY / OLYMPIC (8)
    {n:'Barbell Clean',em:'🏋️',grp:'fullbody',diff:3,bw:false,eq:['barbell'],pri:'Full Body',sec:'Traps, Legs, Core',cues:'Triple extension: ankles, knees, hips. Fast pull under.',setup:'Hip-width stance, bar over mid-foot',breathing:'Brace, explosive pull',mistakes:'Early arm pull, slow under the bar',joint:{shoulder:2,elbow:1,knee:3,spine:2,hip:3},cns:3,muscles:{primary:['full_body'],secondary:['traps','quads','core']},regressions:['DB Power Clean'],progressions:['Clean and Jerk'],met:9.0,tempoRec:'explosive'},
    {n:'Power Clean',em:'⚡',grp:'fullbody',diff:3,bw:false,eq:['barbell'],pri:'Full Body',sec:'Traps, Quads, Hamstrings',cues:'Aggressive hip extension, shrug, pull elbows high',setup:'Athletic position, bar off floor',breathing:'Exhale explosive',mistakes:'Arms pulling too early',joint:{shoulder:2,elbow:1,knee:3,spine:2,hip:3},cns:3,muscles:{primary:['full_body'],secondary:['traps','quads','hamstrings']},regressions:['Hang Clean'],progressions:['Full Clean'],met:9.0,tempoRec:'explosive'},
    {n:'KB Swing',em:'🔔',grp:'fullbody',diff:2,bw:false,eq:['kettlebell'],pri:'Glutes',sec:'Hamstrings, Core, Shoulders',cues:'Hip hinge not squat, explosive hip drive, soft knees',setup:'Shoulder-width stance, hinge and swing KB between legs',breathing:'Exhale swing up',mistakes:'Squatting the swing, rounding back',joint:{shoulder:1,elbow:0,knee:1,spine:2,hip:3},cns:2,muscles:{primary:['glutes'],secondary:['hamstrings','core','shoulders']},regressions:['Romanian Deadlift'],progressions:['KB Snatch'],met:9.5,tempoRec:'explosive'},
    {n:'Burpees',em:'🏃',grp:'fullbody',diff:2,bw:true,eq:[],pri:'Full Body',sec:'Chest, Core, Legs',cues:'Explosive throughout, modify as needed',setup:'Standing, drop to push-up, back up, jump',breathing:'Steady controlled',mistakes:'No jump at top, weak push-up',joint:{shoulder:2,elbow:1,knee:2,spine:1,hip:2},cns:2,muscles:{primary:['full_body'],secondary:['chest','core','quads']},regressions:['Step-Back Burpee'],progressions:['Weighted Burpee'],met:10.0,tempoRec:'explosive'},
    {n:'Turkish Get-Up',em:'🌅',grp:'fullbody',diff:3,bw:false,eq:['kettlebell'],pri:'Core',sec:'Shoulders, Glutes',cues:'Keep KB vertical above wrist throughout',setup:'Lie on back, KB in one hand directly overhead',breathing:'Controlled throughout',mistakes:'Losing vertical arm, rushing',joint:{shoulder:3,elbow:1,knee:2,spine:2,hip:2},cns:2,muscles:{primary:['core'],secondary:['shoulders','glutes']},regressions:['Get-Up no KB'],progressions:['Heavy KB TGU'],met:5.0,tempoRec:'slow_controlled'},
    {n:'Thruster',em:'🚀',grp:'fullbody',diff:3,bw:false,eq:['barbell'],pri:'Full Body',sec:'Legs, Shoulders, Core',cues:'Squat to parallel then drive bar overhead in one motion',setup:'Bar at front rack position',breathing:'Exhale drive',mistakes:'Two separate movements instead of one fluid',joint:{shoulder:2,elbow:1,knee:3,spine:2,hip:3},cns:3,muscles:{primary:['full_body'],secondary:['quads','front_delts','core']},regressions:['Goblet Squat + Press'],progressions:['Heavy Thruster'],met:9.0,tempoRec:'explosive'},
    {n:'Clean and Press',em:'🏗️',grp:'fullbody',diff:3,bw:false,eq:['barbell'],pri:'Full Body',sec:'Traps, Shoulders, Legs',cues:'Clean to rack position, then strict press',setup:'Floor position for clean',breathing:'Exhale clean, exhale press',mistakes:'Dipping with legs on press',joint:{shoulder:2,elbow:1,knee:3,spine:2,hip:3},cns:3,muscles:{primary:['full_body'],secondary:['traps','front_delts','quads']},regressions:['DB Clean and Press'],progressions:['Clean and Jerk'],met:8.0,tempoRec:'1-0-X-0'},
    {n:'Farmer\'s Walk',em:'🌾',grp:'fullbody',diff:1,bw:false,eq:['dumbbell'],pri:'Core',sec:'Traps, Forearms, Legs',cues:'Upright posture, small quick steps',setup:'Heavy DBs or KBs at sides',breathing:'Steady',mistakes:'Leaning to one side',joint:{shoulder:1,elbow:0,knee:1,spine:2,hip:1},cns:1,muscles:{primary:['core'],secondary:['traps','forearms','quads']},regressions:['Suitcase Carry'],progressions:['Trap Bar Carry'],met:6.0,tempoRec:'slow_controlled'},

    // WARMUP & REHAB DRILLS (14)
    {n:'Hip Circles',em:'🔄',grp:'warmup_drills',diff:1,bw:true,eq:[],pri:'Hips',sec:'',cues:'Full range of motion, slow and controlled',setup:'Hands on hips, make large circles',breathing:'Natural',mistakes:'None',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:1},cns:1,muscles:{primary:['hips'],secondary:[]},regressions:[],progressions:[],met:2.0,tempoRec:'controlled',warmup:true},
    {n:'Leg Swings',em:'🦵',grp:'warmup_drills',diff:1,bw:true,eq:[],pri:'Hip Flexors',sec:'Hamstrings',cues:'Forward-back and side-to-side, increasing range',setup:'Hold wall for balance',breathing:'Natural',mistakes:'Excessive speed',joint:{shoulder:0,elbow:0,knee:1,spine:0,hip:2},cns:1,muscles:{primary:['hip_flexors'],secondary:['hamstrings']},regressions:[],progressions:[],met:2.5,tempoRec:'controlled',warmup:true},
    {n:'Arm Circles',em:'🔵',grp:'warmup_drills',diff:1,bw:true,eq:[],pri:'Shoulders',sec:'',cues:'Both directions, gradually increase range',setup:'Arms extended, make circles',breathing:'Natural',mistakes:'None',joint:{shoulder:1,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['shoulders'],secondary:[]},regressions:[],progressions:[],met:2.0,tempoRec:'controlled',warmup:true},
    {n:'Cat-Cow',em:'🐱',grp:'warmup_drills',diff:1,bw:true,eq:[],pri:'Spine',sec:'Core',cues:'Slow controlled transitions, full range',setup:'All fours, neutral spine',breathing:'Inhale arch, exhale round',mistakes:'Rushing through',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['spine'],secondary:['core']},regressions:[],progressions:[],met:2.0,tempoRec:'controlled',warmup:true},
    {n:'Ankle Rolls',em:'🦶',grp:'warmup_drills',diff:1,bw:true,eq:[],pri:'Ankles',sec:'',cues:'Full circles both directions',setup:'Seated or standing on one leg',breathing:'Natural',mistakes:'None',joint:{shoulder:0,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['calves'],secondary:[]},regressions:[],progressions:[],met:1.5,tempoRec:'controlled',warmup:true},
    {n:'Jumping Jacks',em:'⭐',grp:'warmup_drills',diff:1,bw:true,eq:[],pri:'Full Body',sec:'',cues:'Land softly, controlled rhythm',setup:'Standing',breathing:'Steady',mistakes:'None',joint:{shoulder:1,elbow:0,knee:1,spine:0,hip:1},cns:1,muscles:{primary:['full_body'],secondary:[]},regressions:[],progressions:[],met:7.0,tempoRec:'controlled',warmup:true},
    {n:'Inchworm',em:'🐛',grp:'warmup_drills',diff:1,bw:true,eq:[],pri:'Hamstrings',sec:'Core, Shoulders',cues:'Walk hands out to plank, walk feet to hands',setup:'Standing, hinge forward',breathing:'Natural',mistakes:'Bending knees too much',joint:{shoulder:1,elbow:0,knee:0,spine:1,hip:1},cns:1,muscles:{primary:['hamstrings'],secondary:['core','shoulders']},regressions:[],progressions:[],met:3.5,tempoRec:'controlled',warmup:true},
    {n:'World\'s Greatest Stretch',em:'🌍',grp:'warmup_drills',diff:1,bw:true,eq:[],pri:'Full Body',sec:'',cues:'Lunge, rotate, reach overhead',setup:'Start in lunge position',breathing:'Natural',mistakes:'Rushing',joint:{shoulder:1,elbow:0,knee:2,spine:1,hip:2},cns:1,muscles:{primary:['hip_flexors'],secondary:['thoracic_spine','shoulders']},regressions:[],progressions:[],met:3.0,tempoRec:'controlled',warmup:true},
    {n:'Shoulder Rolls',em:'🔄',grp:'warmup_drills',diff:1,bw:true,eq:[],pri:'Shoulders',sec:'Traps',cues:'Both directions, full range',setup:'Standing or seated',breathing:'Natural',mistakes:'None',joint:{shoulder:1,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['shoulders'],secondary:['traps']},regressions:[],progressions:[],met:1.5,tempoRec:'controlled',warmup:true},
    {n:'Hip Flexor Stretch',em:'🧎',grp:'warmup_drills',diff:1,bw:true,eq:[],pri:'Hip Flexors',sec:'',cues:'Posterior pelvic tilt, push hips forward',setup:'Low lunge position',breathing:'Deep',mistakes:'Not tilting pelvis',joint:{shoulder:0,elbow:0,knee:1,spine:0,hip:2},cns:1,muscles:{primary:['hip_flexors'],secondary:[]},regressions:[],progressions:[],met:2.0,tempoRec:'hold',warmup:true},
    {n:'Thoracic Rotation',em:'🔀',grp:'warmup_drills',diff:1,bw:true,eq:[],pri:'Thoracic Spine',sec:'',cues:'Rotation comes from mid-back, not lumbar',setup:'Seated or in lunge, hands behind head',breathing:'Exhale rotate',mistakes:'Rotating lumbar instead',joint:{shoulder:0,elbow:0,knee:0,spine:1,hip:0},cns:1,muscles:{primary:['thoracic_spine'],secondary:[]},regressions:[],progressions:[],met:2.0,tempoRec:'controlled',warmup:true},
    {n:'Dead Hang',em:'🙌',grp:'warmup_drills',diff:1,bw:true,eq:['bar'],pri:'Lats',sec:'Shoulders',cues:'Relaxed hang, decompress spine',setup:'Hang from pull-up bar',breathing:'Deep and relaxed',mistakes:'Tense shoulders',joint:{shoulder:1,elbow:0,knee:0,spine:0,hip:0},cns:1,muscles:{primary:['lats'],secondary:['shoulders']},regressions:[],progressions:[],met:2.5,tempoRec:'hold',warmup:true},
    {n:'Glute Bridge BW',em:'🌉',grp:'warmup_drills',diff:1,bw:true,eq:[],pri:'Glutes',sec:'',cues:'Activate glutes, not just lifting hips',setup:'Lie on back, knees bent',breathing:'Exhale thrust',mistakes:'Hyperextending lumbar',joint:{shoulder:0,elbow:0,knee:1,spine:1,hip:2},cns:1,muscles:{primary:['glutes'],secondary:[]},regressions:[],progressions:[],met:3.0,tempoRec:'1-2-1-0',warmup:true},
    {n:'Bodyweight Squat',em:'⬇️',grp:'warmup_drills',diff:1,bw:true,eq:[],pri:'Quads',sec:'Glutes',cues:'Full depth, arms out for balance',setup:'Shoulder-width stance',breathing:'Exhale up',mistakes:'Knee cave, heels rising',joint:{shoulder:0,elbow:0,knee:2,spine:1,hip:2},cns:1,muscles:{primary:['quads'],secondary:['glutes']},regressions:[],progressions:[],met:4.0,tempoRec:'2-1-1-0',warmup:true}
  ],
  byName(name) { return this.db.find(e => e.n === name) || null; },
  byGroup(grp) { return this.db.filter(e => e.grp === grp); },
  search(q) { const s = q.toLowerCase(); return this.db.filter(e => e.n.toLowerCase().includes(s) || (e.pri||'').toLowerCase().includes(s)); }
};
window.ExDB = ExDB;

/* ── Active Workout State ── */
let _wkt = null;
let _wktTimer = null;
let _wktElapsed = 0;
let _restTimer = null;
let _restRemaining = 0;
let _restInterval = null;

/* ── WORKOUT HOME SCREEN ── */
reg('workout', function() {
  const user = S.g('user') || {};
  const splitDay = SplitEngine.getSplitDay();
  const score = ReadinessEngine.score();
  const cardioRec = CoachEngine.cardioRec(splitDay, score);
  const readiness = ReadinessEngine.label(score);
  const suggestion = CoachEngine.insights()[0];

  const warmupItems = (splitDay.warmup || []).map(w =>
    '<div class="warmup-item"><span class="warmup-item-icon">🔥</span>'+esc(w)+'</div>'
  ).join('');

  const exPreviews = (splitDay.exercises || []).slice(0,5).map(name => {
    const ex = ExDB.byName(name);
    const prev = ProgEngine.prevString(name);
    return '<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">' +
      '<div style="font-size:22px;width:36px;text-align:center">'+(ex?ex.em:'💪')+'</div>' +
      '<div style="flex:1"><div style="font-size:14px;font-weight:600;color:var(--txt)">'+esc(name)+'</div>' +
      (ex?'<div style="font-size:12px;color:var(--txt3)">'+esc(ex.pri)+(ex.sec?', '+ex.sec:'')+'</div>':'') +
      (prev?'<div style="font-size:12px;color:var(--c1);margin-top:2px">'+esc(prev)+'</div>':'') +
      '</div></div>';
  }).join('');

  return '<div class="topbar">' +
    '<div><div class="topbar-title">Workout</div><div class="topbar-date">'+esc(new Date().toLocaleDateString('en-GB',{weekday:'long',month:'short',day:'numeric'}))+'</div></div>' +
    '<div class="topbar-right"><button class="topbar-icon" onclick="go(\'workout\',{search:true})">🔍</button></div></div>' +

    '<div style="padding:0 16px 14px">' +
    '<div class="readiness-label '+readiness.cls+'" style="margin-bottom:12px">Readiness: '+score+' — '+readiness.l+'</div>' +
    '</div>' +

    sh('Today\'s Plan') +
    '<div class="card card-solid">' +
    '<div style="font-size:18px;font-weight:800;color:var(--txt);margin-bottom:4px">'+esc(splitDay.n||'Rest Day')+'</div>' +
    '<div style="font-size:13px;color:var(--txt3);margin-bottom:16px">'+esc((splitDay.muscles||[]).join(', '))+'</div>' +
    exPreviews + '</div>' +

    (splitDay.warmup&&splitDay.warmup.length?
      '<div class="warmup-card"><div class="warmup-title">Warm-Up</div>'+warmupItems+'</div>' : '') +

    '<div class="warmup-card">' +
    '<div class="warmup-title">Cardio Recommendation</div>' +
    '<div style="font-size:15px;font-weight:700;color:var(--c1);margin-bottom:4px">'+esc(cardioRec.machine)+'</div>' +
    '<div style="font-size:13px;color:var(--txt2)">'+esc(cardioRec.duration)+' — '+esc(cardioRec.details)+'</div>' +
    '<div style="font-size:12px;color:var(--txt3);margin-top:6px">🕐 Best performed after your lifting session</div>' +
    '</div>' +

    (suggestion?'<div class="ai-msg"><div class="ai-msg-header"><span>⚡</span><span class="ai-msg-label">Coach Insight</span></div><div class="ai-msg-text">'+esc(suggestion.m)+'</div></div>':'') +

    '<div style="padding:16px 16px 0">' +
    '<button class="btn btn-primary" onclick="startWorkout()">Start Workout 💪</button>' +
    '<button class="btn btn-secondary" style="margin-top:10px" onclick="showExercisePicker()">Browse Exercises</button>' +
    '</div>' +
    '<div style="height:20px"></div>';
});

/* ── ACTIVE WORKOUT SCREEN ── */
reg('active_workout', function() {
  if (!_wkt) { go('workout'); return ''; }
  const user = S.g('user') || {};
  const totalSets = _wkt.exercises.reduce((a,e)=>a+e.sets.length,0);
  const doneSets = _wkt.exercises.reduce((a,e)=>a+e.sets.filter(s=>s.done).length,0);
  const pct = totalSets > 0 ? Math.round((doneSets/totalSets)*100) : 0;

  let exHTML = _wkt.exercises.map((ex, exIdx) => {
    const dbEx = ExDB.byName(ex.name);
    const injWarn = MuscleEngine.injuryWarning(ex.name);
    const prev = ProgEngine.prevString(ex.name);
    const goal = user.goal || 'hypertrophy';
    const dpNote = ProgEngine.doubleProgression(ex.name, goal);
    const doneCount = ex.sets.filter(s=>s.done).length;

    let setsHTML = ex.sets.map((set, si) => {
      const isDone = !!set.done;
      return '<div class="set-row" id="set-'+exIdx+'-'+si+'">' +
        '<div class="set-num'+(isDone?' done':'')+'">'+esc(isDone?'✓':(si+1))+'</div>' +
        '<input type="number" class="set-inp" value="'+esc(set.weight||'')+'" placeholder="kg" inputmode="decimal" ' +
          'onchange="updateSet('+exIdx+','+si+',\'weight\',this.value)" '+(isDone?'disabled':'')+' style="color:var(--txt)">' +
        '<div class="set-x">×</div>' +
        '<input type="number" class="set-inp" value="'+esc(set.reps||'')+'" placeholder="reps" inputmode="numeric" ' +
          'onchange="updateSet('+exIdx+','+si+',\'reps\',this.value)" '+(isDone?'disabled':'')+' style="color:var(--txt)">' +
        '<button class="set-check'+(isDone?' done':'')+'" onclick="doneSet('+exIdx+','+si+')">' +
          (isDone ? svgCheck() : '') + '</button>' +
        '</div>';
    }).join('');

    return '<div class="ex-card" id="ex-card-'+exIdx+'">' +
      '<div class="ex-card-hdr" onclick="toggleExInfo('+exIdx+')">' +
      '<div class="ex-icon">'+(dbEx?dbEx.em:'💪')+'</div>' +
      '<div style="flex:1">' +
      '<div class="ex-name">'+esc(ex.name)+'</div>' +
      '<div class="ex-muscles">'+(dbEx?esc(dbEx.pri)+(dbEx.sec?', '+dbEx.sec:''):'')+'</div>' +
      (injWarn?'<div class="ex-warn">⚠️ '+esc(injWarn)+' — use caution</div>':'') +
      '</div>' +
      '<div class="ex-progress">'+doneCount+'/'+ex.sets.length+'</div>' +
      '</div>' +
      '<div class="ex-card-body">' +
      (prev?'<div class="ex-prev">'+esc(prev)+'</div>':'') +
      (dpNote?'<div class="ex-suggest">'+esc(dpNote.note)+'</div>':'') +
      '<div id="ex-info-'+exIdx+'" style="display:none">' +
      (dbEx&&dbEx.cues?'<div class="ex-cue">💡 '+esc(dbEx.cues)+'</div>':'') +
      (dbEx&&dbEx.mistakes?'<div class="ex-cue">⚠️ '+esc(dbEx.mistakes)+'</div>':'') +
      '</div>' +
      setsHTML +
      '<div style="display:flex;gap:10px;margin-top:8px">' +
      '<button class="ex-add-set" onclick="addSet('+exIdx+')">+ Add Set</button>' +
      '<button class="ex-swap" onclick="swapExercise('+exIdx+')">🔄 Swap</button>' +
      '</div></div></div>';
  }).join('');

  return '<div class="wkt-header">' +
    '<div class="wkt-meta">' +
    '<div class="wkt-name">'+esc(_wkt.name)+'</div>' +
    '<div class="wkt-timer" id="wkt-timer">00:00</div>' +
    '</div>' +
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
    '<div style="flex:1">' +
    '<div class="wkt-progress-bar-wrap"><div class="wkt-progress-bar" id="wkt-prog" style="width:'+pct+'%"></div></div>' +
    '<div style="font-size:11px;color:var(--txt3);margin-top:4px">'+doneSets+'/'+totalSets+' sets · '+pct+'%</div>' +
    '</div>' +
    '<button class="btn btn-danger btn-sm" onclick="finishWorkout()">Finish</button>' +
    '</div></div>' +
    exHTML +
    '<div style="padding:16px;padding-bottom:calc(16px + var(--safe))">' +
    '<button class="btn btn-danger" onclick="finishWorkout()">Finish Workout</button>' +
    '</div>' +
    _restSheetHTML();
});

function _restSheetHTML() {
  const restSecs = S.g('user.restSecs') || 120;
  const c = 2*Math.PI*48;
  return '<div id="rest-sheet"><div class="rest-handle"></div>' +
    '<div class="rest-inner">' +
    '<div class="rest-ring-wrap">' +
    '<svg width="120" height="120" viewBox="0 0 120 120">' +
    '<circle cx="60" cy="60" r="48" fill="none" stroke="var(--bg4)" stroke-width="8"/>' +
    '<circle id="rest-arc" cx="60" cy="60" r="48" fill="none" stroke="var(--c1)" stroke-width="8" stroke-linecap="round" stroke-dasharray="'+c+'" stroke-dashoffset="0"/>' +
    '</svg>' +
    '<div class="rest-count"><div class="rest-count-num" id="rest-num">'+restSecs+'</div><div class="rest-count-label">REST</div></div>' +
    '</div>' +
    '<div class="rest-label">Next set incoming...</div>' +
    '<div class="rest-btns">' +
    '<button class="rest-btn" onclick="adjustRest(-30)">−30s</button>' +
    '<button class="rest-btn skip" onclick="skipRest()">Skip ›</button>' +
    '<button class="rest-btn" onclick="adjustRest(30)">+30s</button>' +
    '</div></div></div>';
}

/* ── Workout control functions ── */
window.startWorkout = function() {
  const user = S.g('user') || {};
  const splitDay = SplitEngine.getSplitDay();
  _wkt = {
    id: Date.now().toString(),
    name: splitDay.n || 'Workout',
    date: isoNow(),
    splitDay: user.splitDay || 1,
    exercises: (splitDay.exercises || []).map(name => {
      const ex = ExDB.byName(name);
      const suggested = WeightEngine.suggest(name, user);
      const defaultSets = user.goal === 'strength' ? 5 : (user.goal === 'fat_loss' ? 3 : 4);
      return {
        name,
        muscles: ex ? ex.muscles : {},
        sets: Array.from({length: defaultSets}, (_, i) => ({
          setNum: i+1, weight: suggested || '', reps: '', done: false
        }))
      };
    }),
    notes: '', started: isoNow(), totalVol: 0, duration: 0
  };
  _wktElapsed = 0;
  clearInterval(_wktTimer);
  _wktTimer = setInterval(() => {
    _wktElapsed++;
    const el = document.getElementById('wkt-timer');
    if (el) el.textContent = fmtTime(_wktElapsed);
  }, 1000);
  go('active_workout');
};

window.updateSet = function(exIdx, si, field, val) {
  if (!_wkt || !_wkt.exercises[exIdx]) return;
  _wkt.exercises[exIdx].sets[si][field] = parseFloat(val) || val;
};

window.doneSet = function(exIdx, si) {
  if (!_wkt || !_wkt.exercises[exIdx]) return;
  const set = _wkt.exercises[exIdx].sets[si];
  const w = parseFloat(set.weight) || 0;
  const r = parseFloat(set.reps) || 0;
  set.done = true;
  set.weight = w; set.reps = r;
  haptic();

  // PR check
  const name = _wkt.exercises[exIdx].name;
  if (ProgEngine.checkPR(name, w, r)) {
    ProgEngine.savePR(name, w, r, today());
    toast('🏆 New PR: ' + name + '!', 'pr', 4000);
  }

  // Update vol
  _wkt.totalVol = _wkt.exercises.reduce((a, ex) =>
    a + ex.sets.filter(s => s.done).reduce((b, s) => b + ((parseFloat(s.weight)||0) * (parseFloat(s.reps)||0)), 0), 0);

  // Update progress bar
  const totalSets = _wkt.exercises.reduce((a,e)=>a+e.sets.length,0);
  const doneSets = _wkt.exercises.reduce((a,e)=>a+e.sets.filter(s=>s.done).length,0);
  const pct = Math.round((doneSets/totalSets)*100);
  const prog = document.getElementById('wkt-prog');
  if (prog) prog.style.width = pct + '%';

  // Update set row
  const row = document.getElementById('set-'+exIdx+'-'+si);
  if (row) {
    row.querySelector('.set-num').className = 'set-num done';
    row.querySelector('.set-num').textContent = '✓';
    row.querySelector('.set-check').className = 'set-check done';
    row.querySelector('.set-check').innerHTML = svgCheck();
    row.querySelectorAll('.set-inp').forEach(inp => inp.disabled = true);
  }

  // Update progress counter
  const exCard = document.getElementById('ex-card-'+exIdx);
  if (exCard) {
    const prog2 = exCard.querySelector('.ex-progress');
    if (prog2) prog2.textContent = doneSets + '/' + _wkt.exercises[exIdx].sets.length;
  }

  // Start rest timer
  const restSecs = S.g('user.restSecs') || 120;
  startRestTimer(restSecs);
};

window.addSet = function(exIdx) {
  if (!_wkt || !_wkt.exercises[exIdx]) return;
  const sets = _wkt.exercises[exIdx].sets;
  const last = sets[sets.length-1] || {};
  sets.push({ setNum: sets.length+1, weight: last.weight||'', reps: last.reps||'', done: false });
  go('active_workout');
};

window.toggleExInfo = function(exIdx) {
  const el = document.getElementById('ex-info-'+exIdx);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
};

window.swapExercise = function(exIdx) {
  if (!_wkt || !_wkt.exercises[exIdx]) return;
  const name = _wkt.exercises[exIdx].name;
  const subs = SplitEngine.getSubstitutes(name, '');
  if (!subs.length) { toast('No substitutes available', 'warn'); return; }
  const body = subs.map((s, i) =>
    '<button class="btn btn-secondary" style="margin-bottom:10px;text-align:left" onclick="_wkt.exercises['+exIdx+'].name=\''+esc(s)+'\';closeModal();go(\'active_workout\')">'+esc(s)+'</button>'
  ).join('');
  modal('Swap: ' + name, body, '<button class="btn btn-ghost" onclick="closeModal()" style="margin-top:8px">Keep original</button>');
};

window.finishWorkout = function() {
  if (!_wkt) return;
  clearInterval(_wktTimer);
  _wkt.duration = Math.round(_wktElapsed / 60);
  _wkt.totalVol = Math.round(_wkt.exercises.reduce((a, ex) =>
    a + ex.sets.filter(s => s.done).reduce((b, s) => b + ((parseFloat(s.weight)||0)*(parseFloat(s.reps)||0)), 0), 0));
  const prCount = _wkt.exercises.reduce((a, ex) => a + (ex.prCount||0), 0);
  const doneSets = _wkt.exercises.reduce((a,e)=>a+e.sets.filter(s=>s.done).length,0);
  if (doneSets === 0) { toast('No sets completed!', 'warn'); return; }

  S.push('workouts', _wkt);
  MuscleEngine.status();
  SplitEngine.nextDay();
  AchEngine.check();

  const body = '<div class="finish-stats">' +
    '<div class="finish-stat"><div class="finish-stat-v">'+fmtMins(_wkt.duration)+'</div><div class="finish-stat-l">Duration</div></div>' +
    '<div class="finish-stat"><div class="finish-stat-v">'+_wkt.totalVol+'kg</div><div class="finish-stat-l">Volume</div></div>' +
    '<div class="finish-stat"><div class="finish-stat-v">'+doneSets+'</div><div class="finish-stat-l">Sets</div></div>' +
    '</div>' +
    '<div style="font-size:14px;color:var(--txt2);margin:12px 0;line-height:1.6">Great work! ' + esc(SplitEngine.getNextDay()?.n||'Rest up') + ' is next.</div>';

  modal('Workout Complete 🎉', body,
    '<button class="btn btn-primary" onclick="closeModal();_wkt=null;go(\'dashboard\')" style="margin-top:12px">Back to Home</button>');

  stopRestTimer();
  toast('Workout saved! 💪', 'ok', 3000);
};

/* ── Rest Timer ── */
window.startRestTimer = function(secs) {
  stopRestTimer();
  _restRemaining = secs;
  const sheet = document.getElementById('rest-sheet');
  if (!sheet) return;
  sheet.classList.add('open');
  _updateRestUI(_restRemaining, secs);
  _restInterval = setInterval(() => {
    _restRemaining--;
    _updateRestUI(_restRemaining, secs);
    if (_restRemaining <= 0) {
      stopRestTimer();
      haptic([50,50,50]);
      document.getElementById('rest-sheet')?.classList.remove('open');
    }
  }, 1000);
};

function _updateRestUI(remaining, total) {
  const numEl = document.getElementById('rest-num');
  if (numEl) numEl.textContent = remaining;
  const arc = document.getElementById('rest-arc');
  if (arc) {
    const c = 2*Math.PI*48;
    const pct = remaining / total;
    arc.setAttribute('stroke-dashoffset', c * (1-pct));
  }
}

window.stopRestTimer = function() {
  clearInterval(_restInterval);
  _restInterval = null;
};

window.skipRest = function() {
  stopRestTimer();
  document.getElementById('rest-sheet')?.classList.remove('open');
};

window.adjustRest = function(delta) {
  _restRemaining = Math.max(5, (_restRemaining||0) + delta);
  const secs = S.g('user.restSecs') || 120;
  _updateRestUI(_restRemaining, secs);
};

/* ── Exercise Picker ── */
window.showExercisePicker = function(grp) {
  const groups = ['chest','back','legs','shoulders','biceps','triceps','core','glutes','fullbody'];
  const curGrp = grp || 'chest';
  const exercises = ExDB.byGroup(curGrp);
  const tabs = groups.map(g =>
    '<button class="pill'+(g===curGrp?' on':'')+'" onclick="showExercisePicker(\''+g+'\')" style="flex-shrink:0">'+g.charAt(0).toUpperCase()+g.slice(1)+'</button>'
  ).join('');
  const list = exercises.map(ex =>
    '<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)">' +
    '<div style="font-size:24px">'+esc(ex.em||'💪')+'</div>' +
    '<div style="flex:1"><div style="font-size:14px;font-weight:700;color:var(--txt)">'+esc(ex.n)+'</div>' +
    '<div style="font-size:12px;color:var(--txt3)">'+esc(ex.pri)+(ex.sec?', '+ex.sec:'')+'</div></div>' +
    '<button style="font-size:12px;color:var(--c1);background:none;border:none;cursor:pointer;padding:8px;font-weight:700" onclick="addExerciseToWorkout(\''+esc(ex.n)+'\')">+ Add</button>' +
    '</div>'
  ).join('');
  modal('Exercise Library',
    '<div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin-bottom:4px">'+tabs+'</div>' + list);
};

window.addExerciseToWorkout = function(name) {
  if (!_wkt) {
    closeModal();
    toast('Start a workout first', 'warn');
    return;
  }
  const user = S.g('user') || {};
  const suggested = WeightEngine.suggest(name, user);
  const sets = Array.from({length:4}, (_, i) => ({ setNum:i+1, weight:suggested||'', reps:'', done:false }));
  _wkt.exercises.push({ name, sets, muscles: ExDB.byName(name)?.muscles || {} });
  closeModal();
  go('active_workout');
};

window.svgCheck = function() {
  return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
};
