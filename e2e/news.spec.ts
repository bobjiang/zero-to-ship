import { test, expect } from '@playwright/test';

test.describe('News', () => {
  test('news page loads', async ({ page }) => {
    await page.goto('/news');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('news page lists dates', async ({ page }) => {
    await page.goto('/news');
    const links = page.locator('a[href^="/news/"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(24);
  });

  test('news pagination links to older and newer briefings', async ({ page }) => {
    await page.goto('/news');
    await expect(page.getByRole('navigation', { name: 'News pagination' })).toBeVisible();
    await page.getByRole('link', { name: /Older/ }).click();
    await expect(page).toHaveURL(/\/news\?page=2$/);
    await page.getByRole('link', { name: /Newer/ }).click();
    await expect(page).toHaveURL(/\/news$/);
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
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
