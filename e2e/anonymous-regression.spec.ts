import { test, expect } from '@playwright/test';

test.describe('Anonymous Regression - Public pages work without auth', () => {
  test('homepage loads without auth', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/02Ship/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('courses list page loads', async ({ page }) => {
    await page.goto('/courses');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('blog list page loads', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('news page loads', async ({ page }) => {
    await page.goto('/news');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('header shows Sign in button when not authenticated', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    // UserNav is a client component that loads async — wait for it
    await expect(page.locator('a[href="/login"]').first()).toBeVisible({ timeout: 10000 });
  });

  test('footer is visible on public pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
  });

  test('navigation still works', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await page.click('nav[aria-label="Main navigation"] a[href="/courses"]');
    await expect(page).toHaveURL('/courses');
  });
});
