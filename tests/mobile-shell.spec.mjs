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

  await page.getByRole('button', { name: 'Adult' }).tap();
  await page.getByRole('button', { name: 'Learn language' }).tap();
  await expect(page.getByText('Listen & recall: Adult')).toBeVisible();
  await expect(page.locator('.curriculum-card.recommended .curriculum-title', { hasText: 'Simplified Mandarin basics' })).toBeVisible();
  await expect(page.locator('.curriculum-card.recommended').getByText('Adult language goal match from the runtime content-pack registry.').first()).toBeVisible();
  await expect(page.locator('#flashcard-grid .flashcard-term', { hasText: '早晨' })).toBeVisible();
  await expect(page.locator('#flashcard-grid .flashcard-term', { hasText: '紅色' })).toBeVisible();
  await expect(page.locator('#mandarin-flashcard-grid .flashcard-term', { hasText: '早上好' })).toBeVisible();
  await expect(page.locator('#mandarin-flashcard-grid .flashcard-term', { hasText: '红色' })).toBeVisible();

  const state = await page.evaluate(() => window.__learningQuestTestState);
  expect(state.contentPackRegistryCount).toBeGreaterThanOrEqual(2);
  expect(state.contentPackRegistryError).toBeNull();
  expect(state.hkChinesePackId).toBe('hk-chinese-basics-v1');
  expect(state.mandarinPackId).toBe('mandarin-basics-v1');
  expect(state.recommendedCurriculumTitles).toContain('Simplified Mandarin basics');

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
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

test('registered content packs fall back when registry is unavailable', async ({ page }) => {
  await page.route('**/content-packs/registry.json*', route => route.fulfill({ status: 503, body: 'registry unavailable' }));
  await page.goto('/');

  await expect(page.getByText('LearningQuest').first()).toBeVisible();
  await expect(page.locator('#flashcard-grid .flashcard-term', { hasText: '早晨' })).toBeVisible();
  await expect(page.locator('#mandarin-flashcard-grid .flashcard-term', { hasText: '早上好' })).toBeVisible();

  const state = await page.evaluate(() => window.__learningQuestTestState);
  expect(state.contentPackRegistryCount).toBeGreaterThanOrEqual(2);
  expect(state.contentPackRegistryError).toContain('content-packs/registry.json');
  expect(state.hkChinesePackId).toBe('hk-chinese-basics-v1');
  expect(state.mandarinPackId).toBe('mandarin-basics-v1');
});
