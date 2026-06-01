# FitnessOS — Claude Instructions

## Owner
- Shamikh Ahmed, Karachi Pakistan
- Director, NEWS Logistics | Founder, TheSolution360
- All apps: shamikhahmed.github.io/[AppName]

## App
- **Name**: FitnessOS Pro
- **Live**: https://shamikhahmed.github.io/FitnessOS
- **Repo**: github.com/shamikhahmed/FitnessOS
- **Local**: ~/Desktop/Projects/fitnessos

## Tech Stack — NON-NEGOTIABLE
- Vanilla JS ONLY — no React, no Vue, no build tools
- Pure localStorage via S object — NO IndexedDB
- DOMContentLoaded boot — NEVER window.load or async
- All screens: reg('name', function() { return htmlString; })
- Router: go('screenName') — always synchronous
- No CSP meta tags — ever
- No external CDN dependencies
- node --check ALL JS before every commit

## S Object (core state)
- S.init() — load from localStorage (call before DOMContentLoaded)
- S.g('user.name') — dot-path getter
- S.set('user.name', val) — dot-path setter + auto-save
- S.d — raw state object
- S._k — storage key: 'fos_v4'

## File Load Order (index.html)
js/storage.js → js/app.js → js/modules/onboarding.js → dashboard.js → workout.js → bodymap.js → coach.js → progress.js → nutrition.js → recovery.js → settings.js → inline boot script

## Boot Sequence (never change)
S.init() → applyTheme → buildNav → initCanvas → if !onboarded → go('onboarding') else go('dashboard')

## Actual Module Files (v4 names)
- onboarding.js (12-step onboarding)
- dashboard.js
- workout.js (NOT workouts.js)
- bodymap.js (NOT bodystats.js)
- coach.js
- progress.js
- nutrition.js
- recovery.js
- settings.js (7 sub-tabs)
NOTE: workouts.js, bodystats.js, cardio.js, injuries.js do NOT exist — they were renamed in v4 rebuild.

## 5 AI Engines (in js/app.js)
- ReadinessEngine.score() — 0-100 from sleep/soreness/stress
- MuscleEngine.status() — recovery % per muscle group
- StreakEngine.get() — consecutive training days
- ProgEngine.epley(w,r) — 1RM + PR detection
- CoachEngine.insights() — up to 4 coaching messages

## Critical CSS Rules
- touch-action:manipulation on ALL buttons
- -webkit-appearance:none on ALL inputs + buttons
- Min 44px on all tap targets
- ob-opt buttons must NEVER have btn-sm class (breaks touch on iOS)
- ob-title color comes from CSS var(--txt) — no inline color overrides
- ob-sub color comes from CSS var(--txt2) — no inline color overrides

## Design System
- Dark AMOLED default, Electric theme (cyan #00d5ff + purple #6b5fff)
- Animated glowing canvas orb background (initCanvas())
- Glassmorphism cards, spring animations
- Everything works offline, no servers, no accounts

## What Shamikh Hates
- Blank screens on load
- Async boot failures
- CSP meta tags
- External CDN dependencies
- Laggy animations
- Generic boring UI
- Questions before building

## Commit Protocol
After every working build:
git add -A && git commit -m "fix/feat: description" && git push
