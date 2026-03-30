import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('blog page loads', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('blog page lists posts', async ({ page }) => {
    await page.goto('/blog');
    const links = page.locator('a[href^="/blog/"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('clicking a blog post navigates to post detail', async ({ page }) => {
    await page.goto('/blog');
    const firstPostLink = page.locator('a[href^="/blog/"]').first();
    const href = await firstPostLink.getAttribute('href');
    await firstPostLink.click();
    await expect(page).toHaveURL(href!);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('blog post has content', async ({ page }) => {
    await page.goto('/blog');
    await page.locator('a[href^="/blog/"]').first().click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
