import { test, expect, request } from '@playwright/test';

const ADMIN_TOKEN = process.env.E2E_ADMIN_TOKEN ?? 'change-me-matching-ADMIN_TOKEN';

test('speaker submits, admin approves, voter votes once, already-voted on retry', async ({
  page,
  baseURL,
}) => {
  // Speaker: open /submit and submit a talk
  await page.goto('/submit');
  await page.fill('input[name="speakerName"]', 'E2E Speaker');
  await page.fill('input[name="handle"]', '@e2e');
  await page.fill('input[name="title"]', 'E2E Lightning Talk');
  await page.fill('textarea[name="intro"]', 'A short test intro for the end-to-end smoke.');
  await page.check('input[name="consent"]');
  await Promise.all([
    page.waitForResponse((r) => r.url().includes('/api/submissions') && r.request().method() === 'POST'),
    page.click('button[type="submit"]'),
  ]);
  await expect(page.getByText('Thanks — your talk is under review.')).toBeVisible();

  // Admin: log in, find pending submission, approve it
  const ctx = await request.newContext({ baseURL });
  const login = await ctx.post('/api/admin/session', { data: { token: ADMIN_TOKEN } });
  expect(login.status()).toBe(204);

  const list = await ctx.get('/api/admin/submissions?status=pending');
  expect(list.ok()).toBe(true);
  const pendingBody = await list.json();
  const target = pendingBody.submissions.find((s: { title: string; id: string }) =>
    s.title === 'E2E Lightning Talk'
  );
  expect(target).toBeTruthy();
  const patch = await ctx.patch(`/api/admin/submissions?id=${target.id}`, {
    data: { status: 'approved' },
  });
  expect(patch.ok()).toBe(true);

  // Voter: open /vote and cast a ballot for the approved talk
  await page.goto('/vote');
  await page.getByRole('button', { name: /E2E Lightning Talk/ }).click();
  await Promise.all([
    page.waitForResponse((r) => r.url().includes('/api/votes') && r.request().method() === 'POST'),
    page.getByRole('button', { name: /Submit vote/ }).click(),
  ]);
  await expect(page.getByText(/your vote has been recorded/i)).toBeVisible();

  // Reload /vote -- should now show "already voted" state
  await page.goto('/vote');
  await expect(page.getByText(/already voted from this browser/i)).toBeVisible();

  // Admin: results should include the approved talk with voteCount >= 1
  const results = await ctx.get('/api/admin/results');
  expect(results.ok()).toBe(true);
  const resultsBody = await results.json();
  const row = resultsBody.results.find((r: { id: string }) => r.id === target.id);
  expect(row).toBeTruthy();
  expect(row.voteCount).toBeGreaterThanOrEqual(1);
});
