# Family Learning Hub

A small static learning app for Tse family practice, currently focused on Wilson's School 11+ style English, Maths, Verbal Reasoning, and Phonics questions.

## Current app

- Static Node server in `server.js` serving `index.html` and `questions.json`.
- Browser-local quiz progress history with attempts, best score, average score, and practice XP.
- JSON export/import for progress backup between browsers or devices.
- Deployed through the normal Sylphx product path for project `tart-duo-uvt9`.

## Validation

```bash
npm run build
node server.js
```

Then verify `/`, `/questions.json`, and `/FAMILY_LEARNING_HUB_ROADMAP.md`.
