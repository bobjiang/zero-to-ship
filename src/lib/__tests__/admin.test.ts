import { describe, it, expect, beforeEach } from 'vitest';

const SECRET = 'a'.repeat(48);

beforeEach(() => {
  process.env.ADMIN_TOKEN = SECRET;
});

async function load() {
  return await import('@/lib/admin');
}

describe('constantTimeTokenMatch', () => {
  it('matches the configured token', async () => {
    const { constantTimeTokenMatch } = await load();
    expect(constantTimeTokenMatch(SECRET)).toBe(true);
  });
  it('rejects a different same-length token', async () => {
    const { constantTimeTokenMatch } = await load();
    expect(constantTimeTokenMatch('b'.repeat(48))).toBe(false);
  });
  it('rejects a shorter token', async () => {
    const { constantTimeTokenMatch } = await load();
    expect(constantTimeTokenMatch('short')).toBe(false);
  });
  it('rejects when ADMIN_TOKEN is unset', async () => {
    delete process.env.ADMIN_TOKEN;
    const { constantTimeTokenMatch } = await load();
    expect(constantTimeTokenMatch(SECRET)).toBe(false);
  });
});

describe('signSession / verifySession', () => {
  it('verifies a freshly signed session', async () => {
    const { signSession, verifySession } = await load();
    const now = 1_700_000_000_000;
    const exp = now + 60_000;
    const value = signSession(exp);
    expect(verifySession(value, now)).toBe(true);
  });
  it('rejects an expired session', async () => {
    const { signSession, verifySession } = await load();
    const now = 1_700_000_000_000;
    const exp = now - 1;
    expect(verifySession(signSession(exp), now)).toBe(false);
  });
  it('rejects a tampered signature', async () => {
    const { signSession, verifySession } = await load();
    const now = 1_700_000_000_000;
    const value = signSession(now + 60_000);
    const tampered = value.slice(0, -1) + (value.slice(-1) === 'a' ? 'b' : 'a');
    expect(verifySession(tampered, now)).toBe(false);
  });
  it('rejects a malformed value', async () => {
    const { verifySession } = await load();
    expect(verifySession('not-a-session', Date.now())).toBe(false);
    expect(verifySession(undefined, Date.now())).toBe(false);
  });
});

describe('newSessionCookieValue', () => {
  it('produces a value that verifies right now', async () => {
    const { newSessionCookieValue, verifySession } = await load();
    const now = Date.now();
    const { value, expiresAt } = newSessionCookieValue(now);
    expect(verifySession(value, now)).toBe(true);
    expect(expiresAt.getTime()).toBeGreaterThan(now);
  });
});
