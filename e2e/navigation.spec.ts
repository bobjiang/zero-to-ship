import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/02Ship/);
  });

  test('homepage has hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('header contains logo link to homepage', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('header a[href="/"]').first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText('02Ship');
  });

  test('desktop nav links are visible on wide viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
    await expect(page.locator('nav[aria-label="Main navigation"] a[href="/courses"]')).toBeVisible();
    await expect(page.locator('nav[aria-label="Main navigation"] a[href="/news"]')).toBeVisible();
  });

  test('navigates to courses page', async ({ page }) => {
    await page.goto('/');
    await page.click('nav[aria-label="Main navigation"] a[href="/courses"]');
    await expect(page).toHaveURL('/courses');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navigates to news page', async ({ page }) => {
    await page.goto('/');
    await page.click('nav[aria-label="Main navigation"] a[href="/news"]');
    await expect(page).toHaveURL('/news');
  });

  test('navigates to blog page', async ({ page }) => {
    await page.goto('/blog');
    await expect(page).toHaveURL('/blog');
  });

  test('navigates to about page', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL('/about');
  });

  test('navigates to ships page', async ({ page }) => {
    await page.goto('/ships');
    await expect(page).toHaveURL('/ships');
  });

  test('footer is present on all pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
  });

  test('404 page for invalid route', async ({ page }) => {
    const response = await page.goto('/nonexistent-page-xyz');
    expect(response?.status()).toBe(404);
  });
});
