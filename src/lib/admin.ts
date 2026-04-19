import crypto from 'crypto';

const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
export const ADMIN_SESSION_COOKIE = 'zts_admin';

function secret(): string {
  return process.env.ADMIN_TOKEN ?? '';
}

export function constantTimeTokenMatch(provided: string): boolean {
  const expected = secret();
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (!expected || a.length !== b.length) {
    // Always run timingSafeEqual so timing is stable across "unset", "wrong length", and "wrong value" paths
    const dummy = Buffer.alloc(Math.max(a.length, 1));
    crypto.timingSafeEqual(dummy, Buffer.alloc(dummy.length));
    return false;
  }
  return crypto.timingSafeEqual(a, b);
}

export function signSession(expMs: number): string {
  const payload = String(expMs);
  const hmac = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  return `${payload}.${hmac}`;
}

export function verifySession(value: string | undefined, nowMs: number): boolean {
  if (!value) return false;
  const dot = value.indexOf('.');
  if (dot <= 0) return false;
  const payload = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expMs = Number(payload);
  if (!Number.isFinite(expMs) || expMs < nowMs) return false;
  const expected = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export interface NewSession {
  value: string;
  expiresAt: Date;
}

export function newSessionCookieValue(nowMs: number = Date.now()): NewSession {
  const expMs = nowMs + SESSION_TTL_MS;
  return { value: signSession(expMs), expiresAt: new Date(expMs) };
}
