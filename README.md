# Family Learning Hub

A responsive multi-subject learning platform foundation for Tse family practice. The first live activity is a Wilson's School 11+ style starter bank, and the product shell now models future French, Life in the UK, English, primary, and secondary learning domains.

## Current app

- Static Node server in `server.js` serving `index.html` and the 28-question `questions.json` starter bank.
- Responsive platform shell with learning-domain cards for 11+ School Prep, Primary Learning, Secondary Bridge, French, Life in the UK, and English Mastery.
- Browser-local per-learner quiz progress history with attempts, best score, average score, level, daily streak, practice XP, subject dashboard, personalised next-step recommendations, parent overview across learner profiles, family leaderboard, milestone badges, daily challenge prompt, and subject quick-practice filters.
- JSON export/import for progress backup between browsers or devices.
- Deployed through the normal Sylphx product path for project `tart-duo-uvt9`.

## Validation

```bash
npm run build
node server.js
```

Then verify `/`, `/questions.json`, and `/FAMILY_LEARNING_HUB_ROADMAP.md`, including the responsive platform shell text and learning-domain cards.
