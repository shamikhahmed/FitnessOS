# FitnessOS — Security Notes

## Local-only data

- Workouts, body stats, PRs, and Smart Coach history live in **localStorage** on your device.
- **No telemetry**, analytics SDKs, or server database ship with FitnessOS.
- Protect your device passcode and exported backup files — anyone with the file can read your training data.

## Smart Coach

- Smart Coach is **rule-based** (not an LLM). No training data is sent to external AI services.
- Injury and readiness guidance is informational — not a substitute for a licensed trainer or clinician.

## Data residency

- Data never leaves your device unless you export a backup or share screenshots.
- Clearing site data or uninstalling the PWA removes local copies.

## PWA / supply chain

- Static assets served from GitHub Pages; verify `sw.js` cache version (`fos-v20`) when updating.
- Do not commit `.env` or API keys to the repository.

## Reporting

Open a private security issue on the [FitnessOS GitHub repo](https://github.com/shamikhahmed/FitnessOS) for vulnerabilities.
