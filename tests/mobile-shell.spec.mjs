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
  await expect(page.getByText('早晨')).toBeVisible();
  await expect(page.getByText('紅色')).toBeVisible();

  const loadedPackId = await page.evaluate(() => window.__learningQuestTestState?.hkChinesePackId);
  expect(loadedPackId).toBe('hk-chinese-basics-v1');

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
