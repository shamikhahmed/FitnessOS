# FitnessOS — Your Intelligent Training Partner

![PWA](https://img.shields.io/badge/PWA-Offline--first-00d5ff?style=flat-square)
![iOS](https://img.shields.io/badge/iOS-Compatible-6b5fff?style=flat-square)
![Version](https://img.shields.io/badge/Version-4.0-10B981?style=flat-square)
![Exercises](https://img.shields.io/badge/Exercises-160%2B-f5c842?style=flat-square)

> AI-powered · Offline-first · No account · Your data stays on your device

---

## Features

- 🧠 **AI Coach** — 5 personalities: Alex (Drill Sergeant), Maya (Sports Scientist), Sam (Motivator), Zen (Mindful), Rex (Powerlifter)
- 💪 **Smart Workouts** — PPL, Upper-Lower, Full Body, Bro Split, Strength, Home — all auto-generated with progressive overload
- 🫀 **Body Map** — Animated SVG anatomy with real-time muscle recovery coloring (sore/recovering/fresh)
- 📊 **Readiness Engine** — 0–100 score calculated from sleep, soreness, stress, energy, hydration, and consecutive training days
- 💊 **Supplement Stack** — 20 pre-loaded supplements with timing schedules, caffeine warnings, and daily logging
- 📈 **Progress Analytics** — PR tracking, estimated 1RM charts, volume trends, workout calendar, weight tracking
- 🏆 **20+ Achievements** — From First Rep to Iron Will (30-day streak) to Volume King (100,000kg)
- 📴 **Offline-First PWA** — Works without internet, installs to home screen, all data in localStorage
- 🎨 **6 Themes** — Carbon, Stealth, Forest, Arctic, Electric, Sunset

---

## Getting Started

1. Open `index.html` in a browser or deploy to any static host
2. Complete the 12-step onboarding
3. Start training

To install as a PWA: tap **Share → Add to Home Screen** on iOS Safari.

---

## Onboarding (12 Steps)

| Step | Content |
|------|---------|
| 1 | Name |
| 2 | Primary goal (6 options) |
| 3 | Training experience |
| 4 | Gender, age, units |
| 5 | Body stats: height, weight, goal weight, body fat % |
| 6 | Training split (auto-sets weekly days) |
| 7 | Training location & equipment + gym brands |
| 8 | Gym schedule (day picker) |
| 9 | Injuries & pain areas (multi-select) |
| 10 | Coach personality (5 options) |
| 11 | Supplement stack (20 options with timing) |
| 12 | Summary & welcome |

---

## Engines & Systems

| Engine | Purpose |
|--------|---------|
| `ReadinessEngine` | 0–100 readiness score from recovery metrics |
| `StreakEngine` | Workout streak, week volume, total volume |
| `ProgEngine` | Epley 1RM, PR detection, double progression |
| `SplitEngine` | 6 training splits, day rotation, substitutes |
| `WeightEngine` | Smart weight suggestions, warmup sets, deload detection |
| `BodyEngine` | BMI, BMR, TDEE, fat loss projections |
| `MuscleEngine` | Per-muscle recovery status with color mapping |
| `SupplementEngine` | Due-now alerts, caffeine warnings, stack suggestions |
| `CoachEngine` | Daily insights, weekly reports, cardio protocols |
| `AchEngine` | 20+ achievements with automatic unlock detection |
| `TDEEEngine` | TDEE calculation, macro splits, deficit/surplus planning |

---

## Themes

| Theme | Primary | Secondary | Background |
|-------|---------|-----------|------------|
| Carbon (default) | #00d5ff | #6b5fff | #000000 |
| Stealth | #f5c842 | #e8a020 | #0a0800 |
| Forest | #10B981 | #059669 | #020a06 |
| Arctic (light) | #007AFF | #5856D6 | #f5f5f7 |
| Electric | #00f0ff | #0080ff | #000814 |
| Sunset | #ff6b35 | #f7931e | #0a0400 |

---

## Coach Personalities

| Coach | Style | Tagline |
|-------|-------|---------|
| 🔥 Alex | Drill Sergeant | "No excuses. Maximum effort." |
| 🧪 Maya | Sports Scientist | "Data-driven precision training." |
| ⚡ Sam | Motivator | "You've got this, every rep counts!" |
| 🧘 Zen | Mindful | "Listen to your body, train smart." |
| 💪 Rex | Powerlifter | "Strength above all." |

---

## Exercise Database

**160+ exercises** across 14 muscle groups:

`chest` · `back` · `legs` · `shoulders` · `biceps` · `triceps` · `core` · `glutes` · `fullbody` · `warmup_drills`

Each exercise includes: muscle groups, coaching cues, setup instructions, common mistakes, joint stress ratings, CNS load, regressions, progressions, and machine alternatives.

---

## Supplement Database

20 pre-loaded supplements with timing, dose, caffeine flag, and half-life:

Creatine · Whey · ISO 100 · C4 Ripped · Ghost · Casein · Mass Gainer · BCAAs · Glutamine · Omega-3 · Vitamin D3+K2 · Zinc · Magnesium Glycinate · Multivitamin · Collagen · Ashwagandha · Beta-Alanine · Citrulline Malate · Caffeine Pills · Melatonin

---

## File Structure

```
fitnessos/
├── landing.html          # Marketing landing page
├── index.html            # App shell (PWA entry)
├── css/
│   ├── base.css          # Design tokens, 6 themes, reset, typography
│   ├── layout.css        # Shell, nav, topbar, safe areas, modals
│   └── components.css    # All UI components
├── js/
│   ├── storage.js        # localStorage state engine
│   ├── app.js            # Router, engines, helpers, nav
│   └── modules/
│       ├── onboarding.js
│       ├── dashboard.js
│       ├── workout.js    # Exercise DB + active logger
│       ├── bodymap.js    # SVG anatomy + measurements
│       ├── coach.js      # AI coach screen
│       ├── progress.js   # Charts, PRs, achievements
│       ├── nutrition.js  # Supplements, water, calories
│       ├── recovery.js   # Sleep, readiness, check-in
│       └── settings.js   # 7-tab settings panel
├── manifest.json
├── sw.js                 # Service worker (cache-first)
└── icon.svg
```

---

## Data & Privacy

All data lives in `localStorage` under key `fos_v4`. No server. No account. No tracking. Export a full JSON backup anytime from **Settings → Data**.

---

## by Shamikh Ahmed

Built with ❤️ as a fully self-contained, zero-dependency PWA.
