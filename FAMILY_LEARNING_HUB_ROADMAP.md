# Family Learning Hub Roadmap

## Current baseline

- Static Node app served by `server.js`.
- Current public content is Wilson's School 11+ practice in `questions.json`.
- The live Sylphx app should remain simple, safe, and easy to recover.

## Product direction

Grow the app from a single Silas quiz into a family learning hub for:

- Silas: age-appropriate Maths, English, Chinese, and school-prep MCQs.
- Sylvie: early-years vocabulary, phonics, counting, colours, and picture-led MCQs.
- Kyle and Cheryl: future Life in the UK, French, Chinese, and family learning content.

## First durable data model

Start with browser-local storage rather than accounts or server-side secrets:

- `learners`: profile id, display name, avatar, age band, preferred subjects.
- `questionSets`: subject, level, tags, language, source, estimated time.
- `attempts`: learner id, question set id, answers, score, completed at.
- `progress`: XP, level, streak, badges, last practice date.
- Current implementation starts with browser-local learner profiles, attempts, best score, average score, level, daily streak, practice XP, and per-learner subject dashboard.

Export/import JSON is now available for browser-local progress so family progress is not easily lost. Silas, Sylvie, Kyle, and Cheryl can now keep separate local history buckets.

## Gamification sequence

1. Progress export/import JSON. *(Shipped for browser-local history.)*
2. Learner profile picker. *(Shipped for browser-local profiles.)*
3. Per-learner score history in local storage. *(Shipped for browser-local profiles.)*
4. XP and level calculation from completed quizzes. *(Started with local practice XP.)*
5. Daily practice streaks. *(Shipped for browser-local history.)*
6. Per-learner subject dashboard. *(Shipped for browser-local history.)*
7. Badges for milestones.
8. Family leaderboard.
9. Family challenge of the day.

## Content sequence

1. Keep existing Wilson's School 11+ quiz stable.
2. Add metadata to quiz files without breaking current rendering.
3. Split content by subject and age band.
4. Add Chinese and English language toggles where useful.
5. Add adult practice sets later.

## Security and deployment notes

- Do not put webhook secrets, private API tokens, or family-sensitive backend keys in public JavaScript.
- Keep deployment reproducible through the normal Sylphx generated build path and `npm` scripts.
- Prefer small, reviewable increments and verify `/` plus `/questions.json` after deploy.
