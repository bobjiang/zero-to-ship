import { test, expect } from '@playwright/test';

test.describe('Ships', () => {
  test('ships page loads', async ({ page }) => {
    await page.goto('/ships');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('ships page lists projects', async ({ page }) => {
    await page.goto('/ships');
    const links = page.locator('a[href^="/ships/"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('clicking a ship navigates to project detail', async ({ page }) => {
    await page.goto('/ships');
    const firstShipLink = page.locator('a[href^="/ships/"]').first();
    const href = await firstShipLink.getAttribute('href');
    await firstShipLink.click();
    await expect(page).toHaveURL(href!);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('ship detail page shows project info', async ({ page }) => {
    await page.goto('/ships');
    await page.locator('a[href^="/ships/"]').first().click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toBeVisible();
  });
});
