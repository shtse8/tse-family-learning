# Family Learning Hub Roadmap

## Current baseline

- Static Node app served by `server.js`.
- Current public content is Wilson's School 11+ practice in `questions.json`, now expanded to 28 starter questions.
- The live Sylphx app should remain simple, safe, and easy to recover.
- The app is being reshaped from a single quiz into a fully responsive multi-subject learning platform with explicit curriculum-pack roadmap slices.

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
- Current implementation starts with a responsive platform shell, learning-domain cards, curriculum-pack roadmap cards, browser-local learner profiles, attempts, best score, average score, level, daily streak, practice XP, per-learner subject dashboard, personalised next-step recommendations, parent overview across learner profiles, family leaderboard, and subject, difficulty, and skill quick-practice filters.

Export/import JSON is now available for browser-local progress so family progress is not easily lost. Silas, Sylvie, Kyle, and Cheryl can now keep separate local history buckets.

## Platform foundation sequence

1. Responsive app shell that no longer presents as only Silas's quiz. *(Shipped with the Family Learning Hub platform hero.)*
2. Learning-domain cards for 11+ School Prep, Traditional HK Chinese, Simplified Mandarin Chinese, Maths Foundation, Primary Learning, French, Life in the UK, and English Mastery. *(Shipped as explicit curriculum placeholders; only 11+ currently has live questions.)*
3. Curriculum-pack data model for topics, levels, skills, languages, activities, and readiness state. *(Started with visible curriculum-pack roadmap cards for Wilson 11+, Traditional HK Chinese, Simplified Mandarin, Maths Foundation, Life in the UK, and French; Traditional HK Chinese now has the first visible flashcard slice.)*
4. Domain-specific learner journeys and parent planning view.
5. Content authoring workflow for adding validated packs without editing the whole app shell.

## Gamification sequence

1. Progress export/import JSON. *(Shipped for browser-local history.)*
2. Learner profile picker. *(Shipped for browser-local profiles.)*
3. Per-learner score history in local storage. *(Shipped for browser-local profiles.)*
4. XP and level calculation from completed quizzes. *(Started with local practice XP.)*
5. Daily practice streaks. *(Shipped for browser-local history.)*
6. Per-learner subject dashboard. *(Shipped for browser-local history.)*
7. Parent overview across learners. *(Shipped for browser-local histories.)*
8. Badges for milestones. *(Started with local milestone badges for first quiz, high score, streak, attempts, subject breadth, and XP level.)*
9. Family challenge of the day. *(Started with a deterministic daily prompt from the current question bank.)*
10. Family leaderboard. *(Shipped for browser-local learner histories.)*
11. Subject quick-practice filters before starting a quiz. *(Shipped for focused rounds from the existing question bank.)*
12. Personalised next-step practice recommendations from learner history. *(Shipped for browser-local learner history.)*
13. Topic/difficulty filters before starting a quiz. *(Expanded with difficulty-band and skill/topic quick-practice filters powered by question metadata: Foundation/Core/Stretch plus number fluency, sound patterns, grammar, and logic patterns.)*


## Quality sequence

1. Keep startup JavaScript deterministic: no duplicate state declarations or duplicated learner-note writes. *(Verified in run #7.)*
2. Keep learner-facing copy generic where progress belongs to the selected learner, not only Silas. *(Shipped in run #7 for progress backup copy.)*
3. Keep progress backup recovery visible even before a learner has local history. *(Shipped in run #8 so import is discoverable on a fresh browser.)*

## Content sequence

1. Keep existing Wilson's School 11+ quiz stable. *(Stable and expanded to 28 starter questions.)*
2. Add metadata to quiz files without breaking current rendering. *(Skill metadata now powers focused quick-practice filters.)*
3. Split content by subject and age band.
4. Add Chinese and English language toggles where useful. *(Roadmap now distinguishes Traditional HK/Cantonese from Simplified Mandarin/Pinyin, and the first Traditional HK family-word flashcards are visible in the app.)*
5. Add adult practice sets later.


## Content-pack activation

The first non-11+ content slice is now visible in the curriculum area: Traditional HK Chinese family-word flashcards for 爸爸, 媽媽, 哥哥, 妹妹, and 多謝, with Jyutping, simple Cantonese-style romanisation prompts, English meaning, and family-use prompts. Next content-pack work should move this inline seed into a reusable JSON pack shape before it grows too large.

## Security and deployment notes

- Do not put webhook secrets, private API tokens, or family-sensitive backend keys in public JavaScript.
- Keep deployment reproducible through the normal Sylphx generated build path and `npm` scripts.
- Prefer small, reviewable increments and verify `/` plus `/questions.json` after deploy.

## Mobile-first modern UX rebuild

Kyle flagged the current experience as not modern/responsive enough. The platform direction is now mobile-first: Today command centre, touch-friendly action flow, app-like mobile navigation, clearer Learn/Practice/Progress IA, and desktop parent command-centre layouts.

### Real-device mobile correction

After iPhone/Safari review, the next UX baseline requires zero horizontal clipping, left-aligned mobile section headers, wrapped curriculum card copy, lighter cards, and no duplicated sticky CTA fighting the browser toolbar.


## Public product foundation — 2026-06-07

Kyle requested a shift from a family-specific prototype to a public-facing, production-ready, commercial-grade HTML5 mobile app. The next architecture direction is user-centric: reusable learner profiles, coach/parent insights, curriculum packs, PWA/mobile-native behaviour, CI governance, and no hardcoded private family names in the visible product shell.

Shipped first foundation slice:
- Renamed visible app shell to LearningQuest.
- Generalized learner profiles and copy away from private family members.
- Added PWA manifest and service worker for mobile app-like launch/offline caching.
- Added GitHub Actions CI validation for HTML/script syntax, question schema, PWA files, and private-name regression checks.

Next slices:
1. Add onboarding: create learner profile, age band, goal, and preferred curriculum.
2. Split inline JS/CSS/data into typed app modules and JSON content packs.
3. Add mobile-native mission mode as the default first screen.
4. Add accessibility, Playwright mobile no-overflow tests, and branch protection required checks.
5. Add SaaS-ready auth/storage/backend later; do not embed secrets in public static JS.
