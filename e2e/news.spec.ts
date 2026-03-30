import { test, expect } from '@playwright/test';

test.describe('News', () => {
  test('news page loads', async ({ page }) => {
    await page.goto('/news');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('news page lists dates', async ({ page }) => {
    await page.goto('/news');
    const links = page.locator('a[href^="/news/"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('clicking a date navigates to daily news', async ({ page }) => {
    await page.goto('/news');
    const firstDateLink = page.locator('a[href^="/news/"]').first();
    const href = await firstDateLink.getAttribute('href');
    await firstDateLink.click();
    await expect(page).toHaveURL(href!);
  });

  test('daily news page shows news items', async ({ page }) => {
    await page.goto('/news');
    const firstDateLink = page.locator('a[href^="/news/"]').first();
    await firstDateLink.click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toBeVisible();
  });
});
