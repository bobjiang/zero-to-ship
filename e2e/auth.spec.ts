import { test, expect } from '@playwright/test';

test.describe('Auth Pages', () => {
  test('login page loads', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Sign In/);
    await expect(page.locator('h1')).toHaveText('Sign in to 02Ship');
  });

  test('signup page loads', async ({ page }) => {
    await page.goto('/signup');
    await expect(page).toHaveTitle(/Sign Up/);
    await expect(page.locator('h1')).toHaveText('Create your account');
  });

  test('login page has magic link form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Send magic link');
  });

  test('signup page has name and email fields', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('input#fullName')).toBeVisible();
    await expect(page.locator('input#email')).toBeVisible();
  });

  test('login page has OAuth buttons', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('button:has-text("Continue with GitHub")')).toBeVisible();
    await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible();
  });

  test('login page links to signup', async ({ page }) => {
    await page.goto('/login');
    const signupLink = page.locator('a[href*="/signup"]');
    await expect(signupLink).toBeVisible();
    await expect(signupLink).toHaveText('Sign up');
  });

  test('signup page links to login', async ({ page }) => {
    await page.goto('/signup');
    const loginLink = page.locator('main a[href*="/login"]');
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveText('Sign in');
  });

  test('login preserves next param in signup link', async ({ page }) => {
    await page.goto('/login?next=/courses/some-course');
    const signupLink = page.locator('a[href*="/signup"]');
    const href = await signupLink.getAttribute('href');
    expect(href).toContain('next=');
  });
});

test.describe('Protected Routes', () => {
  test('dashboard redirects unauthenticated users to login', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL('**/login**');
    expect(page.url()).toContain('/login');
  });

  test('dashboard/courses redirects to login', async ({ page }) => {
    await page.goto('/dashboard/courses');
    await page.waitForURL('**/login**');
    expect(page.url()).toContain('/login');
  });

  test('dashboard/bookmarks redirects to login', async ({ page }) => {
    await page.goto('/dashboard/bookmarks');
    await page.waitForURL('**/login**');
    expect(page.url()).toContain('/login');
  });

  test('dashboard/settings redirects to login', async ({ page }) => {
    await page.goto('/dashboard/settings');
    await page.waitForURL('**/login**');
    expect(page.url()).toContain('/login');
  });
});
