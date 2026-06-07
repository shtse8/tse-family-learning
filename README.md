# LearningQuest

A responsive, mobile-native HTML5 learning platform foundation for personalised practice. The first live activity is a school-prep starter bank, and the product shell now models reusable curriculum packs for languages, exams, Maths, English, primary learning, and adult learning.

## Current app

- Static Node server in `server.js` serving `index.html` and the 28-question `questions.json` starter bank.
- Responsive platform shell with learning-domain cards for 11+ School Prep, Traditional HK Chinese, Simplified Mandarin Chinese, Maths Foundation, Primary Learning, French, Life in the UK, and English Mastery.
- Curriculum pack roadmap cards for language variant, learner fit, activity type, readiness, and next production step.
- First Traditional HK Chinese flashcard slice with family words, Jyutping, Cantonese prompts, and English meaning.
- Browser-local per-learner quiz progress history with attempts, best score, average score, level, daily streak, practice XP, subject dashboard, personalised next-step recommendations, parent overview across learner profiles, family leaderboard, milestone badges, daily challenge prompt, and subject/difficulty/skill quick-practice filters.
- JSON export/import for progress backup between browsers or devices.
- Run #7 cleanup keeps startup state declarations single-source and makes progress-backup copy apply to the selected learner.
- Run #8 adds skill/topic quick-practice chips from question metadata, so focused practice can target number fluency, sound patterns, grammar, and logic patterns without changing the question schema.
- Run #8 evening increment turns the Traditional HK Chinese roadmap placeholder into a visible starter flashcard slice.
- Deployed through the normal Sylphx product path for project `tart-duo-uvt9`.

## Validation

```bash
npm run build
node server.js
```

Then verify `/`, `/questions.json`, and `/FAMILY_LEARNING_HUB_ROADMAP.md`, including the responsive platform shell text and learning-domain cards.

- Run #9 starts the mobile-first UI/UX rebuild: app-like Today command centre, bottom mobile navigation, clearer Learn/Practice/Progress sections, and a desktop command-centre layout while retaining the existing quiz/progress engine.
- Run #10 fixes real-device mobile clipping/overflow after Kyle review: stricter no-horizontal-overflow rules, left-aligned mobile sections, wrapped curriculum text, lighter cards, safer bottom nav, and hidden sticky duplicate CTA on small screens.
- Run #8 keeps progress backup import discoverable on a fresh browser and removes a duplicate quick-practice filter return.


## Public / commercial-grade direction

This app is being generalized from a family prototype into a public-facing product foundation. The current baseline avoids hardcoded private learner names in the UI, includes a PWA manifest/service worker for app-like mobile launch, and adds GitHub Actions CI for static validation.
