# Family Learning Hub

A small static learning app for Tse family practice, currently focused on Wilson's School 11+ style English, Maths, Verbal Reasoning, and Phonics questions, with a growing 28-question starter bank.

## Current app

- Static Node server in `server.js` serving `index.html` and the 28-question `questions.json` starter bank.
- Browser-local per-learner quiz progress history with attempts, best score, average score, level, daily streak, practice XP, and subject dashboard.
- JSON export/import for progress backup between browsers or devices.
- Deployed through the normal Sylphx product path for project `tart-duo-uvt9`.

## Validation

```bash
npm run build
node server.js
```

Then verify `/`, `/questions.json`, and `/FAMILY_LEARNING_HUB_ROADMAP.md`.
