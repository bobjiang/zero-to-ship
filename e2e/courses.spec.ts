import { test, expect } from '@playwright/test';

test.describe('Courses', () => {
  test('courses page lists available series', async ({ page }) => {
    await page.goto('/courses');
    await expect(page.locator('h1')).toBeVisible();
    const links = page.locator('a[href^="/courses/"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('clicking a series navigates to series detail', async ({ page }) => {
    await page.goto('/courses');
    const firstSeriesLink = page.locator('a[href^="/courses/"]').first();
    const href = await firstSeriesLink.getAttribute('href');
    await firstSeriesLink.click();
    await expect(page).toHaveURL(href!);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('series detail page shows lessons', async ({ page }) => {
    await page.goto('/courses');
    await page.locator('a[href^="/courses/"]').first().click();
    const lessonLinks = page.locator('a[href*="/courses/"][href*="/"]').filter({ hasNot: page.locator('a[href="/courses"]') });
    const count = await lessonLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('lesson page loads and has content', async ({ page }) => {
    await page.goto('/courses');
    await page.locator('a[href^="/courses/"]').first().click();
    await page.waitForLoadState('networkidle');

    const lessonLinks = page.locator('a').filter({ hasText: /lesson|Lesson/i });
    const count = await lessonLinks.count();
    if (count > 0) {
      await lessonLinks.first().click();
      await expect(page.locator('h1')).toBeVisible();
    }
  });
});
