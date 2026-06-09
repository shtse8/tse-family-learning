import { expect, test } from '@playwright/test';

test('mobile app shell opens without horizontal overflow and mission onboarding works', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('LearningQuest').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Set up today’s mission' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Primary' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Build confidence' })).toBeVisible();

  await page.getByRole('button', { name: 'Exam prep' }).tap();
  await page.getByRole('button', { name: 'Get exam-ready' }).tap();
  await expect(page.getByText('Exam mode: Exam prep')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start this mission' })).toBeVisible();
  await expect(page.locator('.curriculum-card.recommended .curriculum-title', { hasText: '11+ starter bank' })).toBeVisible();
  await expect(page.locator('.curriculum-card.recommended').getByText('Best match for exam prep from the live question bank.').first()).toBeVisible();
  await expect(page.locator('.curriculum-card.recommended').getByText('Start with a mixed diagnostic round → Focus quick practice on weak skills → Return to timed exam-prep missions').first()).toBeVisible();

  await page.getByRole('button', { name: 'Adult' }).tap();
  await page.getByRole('button', { name: 'Learn language' }).tap();
  await expect(page.getByText('Listen & recall: Adult')).toBeVisible();
  await expect(page.locator('.curriculum-card.recommended .curriculum-title', { hasText: 'Simplified Mandarin basics' })).toBeVisible();
  await expect(page.locator('.curriculum-card.recommended').getByText('Adult language goal match from the runtime content-pack registry.').first()).toBeVisible();
  await expect(page.locator('.curriculum-card.recommended').getByText('Start with greetings and core family words → Compare Simplified, Traditional, and Pinyin forms → Use matching practice and comparison drills, then try audio prompts').first()).toBeVisible();
  await expect(page.locator('#flashcard-grid .flashcard-term', { hasText: '早晨' })).toBeVisible();
  await expect(page.locator('#flashcard-grid .flashcard-term', { hasText: '紅色' })).toBeVisible();
  await expect(page.locator('#mandarin-flashcard-grid .flashcard-term', { hasText: '早上好' })).toBeVisible();
  await expect(page.locator('#mandarin-flashcard-grid .flashcard-term', { hasText: '红色' })).toBeVisible();
  await expect(page.locator('#flashcard-grid .flashcard').first().getByRole('button', { name: 'Hear Cantonese' })).toBeVisible();
  await expect(page.locator('#mandarin-flashcard-grid .flashcard').first().getByRole('button', { name: 'Hear Mandarin' })).toBeVisible();
  await page.locator('#flashcard-grid .flashcard').first().getByRole('button', { name: 'Hear Cantonese' }).tap();
  await expect(page.locator('#flashcard-grid .flashcard').first().locator('.audio-status')).toContainText(/Playing Cantonese audio prompt|Audio support unavailable/);
  await expect(page.getByRole('heading', { name: 'Traditional HK Chinese matching practice' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Simplified Mandarin matching practice' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Traditional/Simplified comparison drill' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Maths Foundation practice cards' })).toBeVisible();
  await expect(page.locator('#maths-foundation-grid .maths-card').first().getByText('Number bonds · Make 10')).toBeVisible();
  const makeTenCard = page.locator('#maths-foundation-grid .maths-card', { hasText: 'What number goes with 6 to make 10?' });
  await expect(makeTenCard.getByRole('textbox', { name: 'Answer for What number goes with 6 to make 10?' })).toBeVisible();
  await expect(makeTenCard.getByText('Strategy locked until this answer is correct.')).toBeVisible();
  await makeTenCard.getByRole('textbox', { name: 'Answer for What number goes with 6 to make 10?' }).fill('4');
  await makeTenCard.getByRole('button', { name: 'Check answer' }).tap();
  await expect(makeTenCard.getByText('✅ Correct — strategy unlocked.')).toBeVisible();
  await expect(makeTenCard.getByText('1/6 solved · 1 tried')).toBeVisible();
  await expect(makeTenCard.getByText('6 + 4 = 10')).toBeVisible();
  await expect(makeTenCard.locator('.maths-number-line')).toBeVisible();
  await expect(makeTenCard.getByText('Count up from 6: 7, 8, 9, 10. That is 4 steps.')).toBeVisible();
  await expect(page.locator('#history-panel').getByText('Maths Foundation answer practice')).toBeVisible();
  const twoTimesCard = page.locator('#maths-foundation-grid .maths-card', { hasText: 'What is 2 × 6?' });
  await twoTimesCard.getByRole('textbox', { name: 'Answer for What is 2 × 6?' }).fill('12');
  await twoTimesCard.getByRole('button', { name: 'Check answer' }).tap();
  await expect(twoTimesCard.getByText('✅ Correct — strategy unlocked.')).toBeVisible();
  await expect(twoTimesCard.getByText('Double 6 to make 12.')).toBeVisible();
  await expect(page.locator('#comparison-grid .comparison-card').first().getByText('Traditional HK')).toBeVisible();
  await expect(page.locator('#comparison-grid .comparison-card').first().getByText('Simplified Mandarin')).toBeVisible();
  await expect(page.locator('#comparison-grid .comparison-card', { hasText: '爸爸' }).getByText('Same written form — pronunciation changes.')).toBeVisible();
  await expect(page.locator('#comparison-grid .comparison-card', { hasText: '媽媽' }).getByText('妈妈')).toBeVisible();
  await expect(page.locator('#comparison-grid .comparison-card', { hasText: '紅色' }).getByText('红色')).toBeVisible();
  await expect(page.locator('#hk-matching-grid .matching-card').first().getByText('Dad / father')).toBeVisible();
  await expect(page.locator('#mandarin-matching-grid .matching-card').first().getByText('bàba')).toBeVisible();
  await expect(page.locator('#hk-matching-grid .matching-card').first().getByText('Tap the meaning that matches this term.')).toBeVisible();
  await page.locator('#hk-matching-grid .matching-card').first().getByRole('button', { name: 'Dad / father' }).tap();
  await expect(page.locator('#hk-matching-grid .matching-card').first().getByText('✅ Matched')).toBeVisible();
  await expect(page.locator('#hk-matching-grid .matching-card').first().getByText('1/4 matched · 1 tried')).toBeVisible();
  await expect(page.locator('#history-panel').getByText('Traditional HK Chinese matching')).toBeVisible();
  await page.locator('#mandarin-matching-grid .matching-card').first().getByRole('button', { name: 'Dad / father' }).tap();
  await expect(page.locator('#mandarin-matching-grid .matching-card').first().getByText('✅ Matched')).toBeVisible();

  const state = await page.evaluate(() => window.__learningQuestTestState);
  expect(state.contentPackRegistryCount).toBeGreaterThanOrEqual(3);
  expect(state.contentPackRegistryError).toBeNull();
  expect(state.hkChinesePackId).toBe('hk-chinese-basics-v1');
  expect(state.mandarinPackId).toBe('mandarin-basics-v1');
  expect(state.mathsFoundationPackId).toBe('maths-foundation-v1');
  expect(state.mathsFoundationCardCount).toBe(10);
  expect(state.mathsFoundationTopics).toEqual(expect.arrayContaining(['Number bonds', 'Place value', 'Times tables']));
  expect(state.recommendedCurriculumTitles).toContain('Simplified Mandarin basics');
  expect(state.recommendedProgressionPaths.join(' | ')).toContain('Use matching practice and comparison drills, then try audio prompts');

  await page.getByRole('button', { name: 'Primary' }).tap();
  await page.getByRole('button', { name: 'Build confidence' }).tap();
  await expect(page.locator('.curriculum-card.recommended .curriculum-title', { hasText: 'Maths Foundation practice' })).toBeVisible();
  await expect(page.locator('.curriculum-card.recommended').getByText('Maths Foundation is at 33% in saved learner history.').first()).toBeVisible();
  await expect(page.locator('.curriculum-card.recommended').getByText('Start with number bonds to 10 and 20 → Practise place value and skip counting → Move into times tables, fractions, and short word problems → Type answers and unlock strategy feedback').first()).toBeVisible();
  const primaryState = await page.evaluate(() => window.__learningQuestTestState);
  expect(primaryState.recommendedCurriculumTitles).toContain('Maths Foundation practice');
  expect(primaryState.historyAwareCurriculumInsights).toContain('Maths Foundation is at 33% in saved learner history.');
  expect(primaryState.historyRecommendationScores).toEqual(expect.arrayContaining([
    expect.objectContaining({ title: 'Maths Foundation practice', score: 6 })
  ]));
  expect(state.matchingPracticeCounts).toEqual({ hkChinese: 4, mandarin: 4 });
  expect(state.audioPromptCounts).toEqual({ hkChinese: 5, mandarin: 5 });
  expect(state.audioPromptLocales).toEqual(['zh-HK', 'zh-CN']);
  expect(state.latestAudioPrompt).toMatchObject({ text: '爸爸', lang: 'zh-HK', label: 'Cantonese audio prompt' });
  expect(state.comparisonDrillPairs).toHaveLength(6);
  expect(state.comparisonDrillPairs).toEqual(expect.arrayContaining([
    expect.objectContaining({ traditional: '媽媽', simplified: '妈妈', english: 'Mum / mother', changed: true })
  ]));
  expect(state.mathsFoundationPracticeScores).toEqual({ correct: 2, attempted: 2, total: 6 });
  expect(state.mathsFoundationNumberLineCount).toBeGreaterThanOrEqual(6);
  expect(state.mathsFoundationRotationMode).toBe('New skills first');
  expect(state.latestMathsFoundationProgress).toMatchObject({
    activityType: 'maths-foundation-practice',
    practiceMode: 'maths-foundation-answer-entry',
    correct: 2,
    total: 6,
    percent: 33,
    attempted: 2,
    rotationMode: 'maths-foundation-weak-skill-rotation'
  });
  expect(state.latestMathsFoundationProgress.skillResults).toMatchObject({
    'Make 10': { correct: 1, attempted: 1 },
    '2 times table': { correct: 1, attempted: 1 }
  });
  expect(state.matchingPracticeScores.hkChinese).toEqual({ correct: 1, attempted: 1, total: 4 });
  expect(state.matchingPracticeScores.mandarin).toEqual({ correct: 1, attempted: 1, total: 4 });
  expect(state.latestMatchingProgress).toMatchObject({
    activityType: 'matching-practice',
    matchingPackKey: 'mandarin',
    practiceMode: 'matching-practice',
    correct: 1,
    total: 4,
    percent: 25,
    attempted: 1
  });
  const savedHistory = await page.evaluate(() => JSON.parse(localStorage.getItem('learningquest-history-v1-learner-1')));
  expect(savedHistory[0]).toMatchObject({ activityType: 'matching-practice', matchingPackKey: 'mandarin', correct: 1, total: 4, percent: 25 });
  expect(savedHistory).toEqual(expect.arrayContaining([
    expect.objectContaining({ activityType: 'maths-foundation-practice', correct: 2, total: 6, percent: 33 }),
    expect.objectContaining({ activityType: 'matching-practice', matchingPackKey: 'hkChinese', correct: 1, total: 4, percent: 25 })
  ]));

  const makeTwentyCard = page.locator('#maths-foundation-grid .maths-card', { hasText: 'What number goes with 13 to make 20?' });
  await makeTwentyCard.getByRole('textbox', { name: 'Answer for What number goes with 13 to make 20?' }).fill('6');
  await makeTwentyCard.getByRole('button', { name: 'Check answer' }).tap();
  await expect(makeTwentyCard.getByText('Try again')).toBeVisible();
  await expect(page.locator('#maths-foundation-grid .maths-card').first().getByText('Weak-skill rotation: revisiting this skill from recent learner history.')).toBeVisible();
  const rotationState = await page.evaluate(() => window.__learningQuestTestState);
  expect(rotationState.mathsFoundationWeakSkills).toContain('Make 20');
  expect(rotationState.mathsFoundationRotationMode).toBe('Weak-skill rotation active');
  expect(rotationState.latestMathsFoundationProgress.weakSkills).toContain('Make 20');

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});


test('progress import restores adaptive activity metadata', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('LearningQuest').first()).toBeVisible();
  await expect(page.locator('#maths-foundation-grid .maths-card').first().getByText('Number bonds · Make 10')).toBeVisible();

  const adaptiveBackup = {
    app: 'tse-family-learning',
    version: 2,
    history: [
      {
        learner: 'learner-1',
        date: 'Imported',
        completedAt: '2026-06-09T12:00:00.000Z',
        correct: 0,
        total: 6,
        percent: 0,
        focus: 'Maths Foundation answer practice',
        subjects: { 'Maths Foundation': { correct: 0, total: 6 } },
        practiceMode: 'maths-foundation-answer-entry',
        difficultyMode: 'maths-foundation',
        activityType: 'maths-foundation-practice',
        attempted: 1,
        skillResults: { 'Make 20': { correct: 0, attempted: 1 } },
        weakSkills: ['Make 20'],
        rotationMode: 'maths-foundation-weak-skill-rotation'
      },
      {
        learner: 'learner-1',
        date: 'Imported',
        completedAt: '2026-06-09T12:01:00.000Z',
        correct: 1,
        total: 4,
        percent: 25,
        focus: 'Simplified Mandarin matching',
        subjects: { 'Chinese · Simplified Mandarin': { correct: 1, total: 4 } },
        practiceMode: 'matching-practice',
        difficultyMode: 'mandarin',
        activityType: 'matching-practice',
        matchingPackKey: 'mandarin',
        attempted: 1
      }
    ]
  };
  const dataTransfer = await page.evaluateHandle((payload) => {
    const file = new File([JSON.stringify(payload)], 'learningquest-backup.json', { type: 'application/json' });
    const dt = new DataTransfer();
    dt.items.add(file);
    return dt;
  }, adaptiveBackup);
  await page.evaluate((dt) => {
    const input = document.getElementById('import-progress');
    input.files = dt.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }, dataTransfer);
  await expect(page.locator('#history-panel').getByText('Maths Foundation answer practice')).toBeVisible();
  await expect(page.locator('#history-panel').getByText('Simplified Mandarin matching')).toBeVisible();
  await expect(page.locator('#mandarin-matching-grid .matching-card').first().getByText('1/4 matched · 1 tried')).toBeVisible();
  await expect(page.locator('#maths-foundation-grid .maths-card').first()).toContainText('What number goes with 13 to make 20?');
  await expect(page.locator('#maths-foundation-grid .maths-card').first().getByText('Weak-skill rotation: revisiting this skill from recent learner history.')).toBeVisible();

  const state = await page.evaluate(() => window.__learningQuestTestState);
  expect(state.mathsFoundationWeakSkills).toContain('Make 20');
  expect(state.mathsFoundationRotationMode).toBe('Weak-skill rotation active');
  expect(state.matchingPracticeScores.mandarin).toEqual({ correct: 1, attempted: 1, total: 4 });
  expect(state.recommendedCurriculumTitles).toContain('Maths Foundation practice');
  expect(state.historyAwareCurriculumInsights).toContain('Recent Maths Foundation practice flagged Make 20 for review.');
  expect(state.historyRecommendationScores).toEqual(expect.arrayContaining([
    expect.objectContaining({ title: 'Maths Foundation practice', score: 8 })
  ]));
  expect(state.latestMathsFoundationProgress).toMatchObject({
    activityType: 'maths-foundation-practice',
    weakSkills: ['Make 20'],
    rotationMode: 'maths-foundation-weak-skill-rotation'
  });

  const restoredHistory = await page.evaluate(() => JSON.parse(localStorage.getItem('learningquest-history-v1-learner-1')));
  expect(restoredHistory).toEqual(expect.arrayContaining([
    expect.objectContaining({ activityType: 'maths-foundation-practice', weakSkills: ['Make 20'], skillResults: { 'Make 20': { correct: 0, attempted: 1 } } }),
    expect.objectContaining({ activityType: 'matching-practice', matchingPackKey: 'mandarin', attempted: 1 })
  ]));
});

test('question practice remains available when optional HK Chinese pack is unavailable', async ({ page }) => {
  await page.route('**/content-packs/hk-chinese-basics.json*', route => route.fulfill({ status: 503, body: 'pack unavailable' }));
  await page.goto('/');

  await expect(page.getByText('LearningQuest').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Set up today’s mission' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start this mission' })).toBeVisible();
  await page.waitForFunction(
    () => window.__learningQuestTestState?.hkChinesePackError,
    null,
    { timeout: 10000 }
  );
  await expect(page.locator('#flashcard-grid .flashcard-placeholder').getByText('Question practice remains available')).toBeVisible();

  const state = await page.evaluate(() => window.__learningQuestTestState);
  expect(state.hkChinesePackId).toBeNull();
  expect(state.hkChinesePackError).toContain('content-packs/hk-chinese-basics.json');
});

test('question practice remains available when optional Mandarin pack is unavailable', async ({ page }) => {
  await page.route('**/content-packs/mandarin-basics.json*', route => route.fulfill({ status: 503, body: 'pack unavailable' }));
  await page.goto('/');

  await expect(page.getByText('LearningQuest').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Set up today’s mission' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start this mission' })).toBeVisible();
  await page.waitForFunction(
    () => window.__learningQuestTestState?.mandarinPackError,
    null,
    { timeout: 10000 }
  );
  await expect(page.locator('#mandarin-flashcard-grid .flashcard-placeholder').getByText('Question practice remains available')).toBeVisible();
  await expect(page.locator('#flashcard-grid .flashcard-term', { hasText: '早晨' })).toBeVisible();

  const state = await page.evaluate(() => window.__learningQuestTestState);
  expect(state.hkChinesePackId).toBe('hk-chinese-basics-v1');
  expect(state.mandarinPackId).toBeNull();
  expect(state.mandarinPackError).toContain('content-packs/mandarin-basics.json');
});

test('question practice remains available when optional Maths Foundation pack is unavailable', async ({ page }) => {
  await page.route('**/content-packs/maths-foundation.json*', route => route.fulfill({ status: 503, body: 'pack unavailable' }));
  await page.goto('/');

  await expect(page.getByText('LearningQuest').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Set up today’s mission' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start this mission' })).toBeVisible();
  await page.waitForFunction(
    () => window.__learningQuestTestState?.mathsFoundationPackError,
    null,
    { timeout: 10000 }
  );
  await expect(page.locator('#maths-foundation-grid .maths-card').getByText('Try quiz practice while this pack recovers.')).toBeVisible();
  await expect(page.locator('#flashcard-grid .flashcard-term', { hasText: '早晨' })).toBeVisible();

  const state = await page.evaluate(() => window.__learningQuestTestState);
  expect(state.mathsFoundationPackId).toBeNull();
  expect(state.mathsFoundationPackError).toContain('content-packs/maths-foundation.json');
  expect(state.hkChinesePackId).toBe('hk-chinese-basics-v1');
  expect(state.mandarinPackId).toBe('mandarin-basics-v1');
});

test('registered content packs fall back when registry is unavailable', async ({ page }) => {
  await page.route('**/content-packs/registry.json*', route => route.fulfill({ status: 503, body: 'registry unavailable' }));
  await page.goto('/');

  await expect(page.getByText('LearningQuest').first()).toBeVisible();
  await expect(page.locator('#flashcard-grid .flashcard-term', { hasText: '早晨' })).toBeVisible();
  await expect(page.locator('#mandarin-flashcard-grid .flashcard-term', { hasText: '早上好' })).toBeVisible();
  await expect(page.locator('#maths-foundation-grid .maths-card').first().getByText('Number bonds · Make 10')).toBeVisible();

  const state = await page.evaluate(() => window.__learningQuestTestState);
  expect(state.contentPackRegistryCount).toBeGreaterThanOrEqual(3);
  expect(state.contentPackRegistryError).toContain('content-packs/registry.json');
  expect(state.hkChinesePackId).toBe('hk-chinese-basics-v1');
  expect(state.mandarinPackId).toBe('mandarin-basics-v1');
  expect(state.mathsFoundationPackId).toBe('maths-foundation-v1');
});
