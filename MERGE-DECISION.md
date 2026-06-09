# FitnessOS — v1 / v2 merge decision

**Date:** 2026-06-10  
**Decision:** **Single canonical app — this repo (`FitnessOS` v4.x)**

## Context

- **FitnessOS Pro (v1 lineage)** evolved into the current `FitnessOS` repo at v4.5.x.
- **FitnessOS v2** was a parallel modular-engine experiment; the separate `FitnessOS2` folder no longer exists.
- All active development, GitHub Pages deploy, and Meridian sandboxes point to **`shamikhahmed/FitnessOS`**.

## Resolution

| Item | Status |
|------|--------|
| Canonical repo | `https://github.com/shamikhahmed/FitnessOS` |
| Live URL | `https://shamikhahmed.github.io/FitnessOS/` |
| v2 fork | **Archived** — engines pattern absorbed where useful (`BodyEngine`, `PlanEngine`, `SplitEngine`, etc.) |
| User data | No migration required — v2 never shipped to production |

## Do not

- Create a second live FitnessOS repo
- Split engines into a separate deploy without explicit product decision

## Next

- Ship v4.x features on `main` only
- Close approval `apr-002` (unify v1/v2) as **approved — merged into canonical v4**
