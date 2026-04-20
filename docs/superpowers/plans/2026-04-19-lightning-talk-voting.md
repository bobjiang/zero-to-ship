# Lightning Talk Voting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the community lightning-talk submission and voting feature exactly as specified in `docs/superpowers/specs/2026-04-19-lightning-talk-voting-design.md`.

**Architecture:** Single-event, mobile-first, QR-driven flow inside the existing Next.js 14 App Router app. Public pages + thin JSON APIs. Mutable state in Vercel KV (`@vercel/kv`). Event config committed to the repo. Anonymous voter identity via an `httpOnly` UUID cookie seeded by middleware. Admin access via a signed session cookie backed by `ADMIN_TOKEN`.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Tailwind, `@vercel/kv`, `zod` (already in deps), `crypto` (node built-in), Vitest for unit tests, Playwright for the one smoke spec.

---

## Pre-flight

Before starting, confirm:

1. You are working on a dedicated branch. A stale `feat/community-voting` branch exists from a prior Supabase attempt — do NOT build on it. Start from `main` on a new branch, e.g. `feat/lightning-talk-voting`.
2. Vercel KV has been provisioned for the project (so `KV_REST_API_URL` and `KV_REST_API_TOKEN` are available locally via `vercel env pull .env.local` when you want to exercise KV in dev). Unit tests never touch KV and work without it.
3. The spec file path: `docs/superpowers/specs/2026-04-19-lightning-talk-voting-design.md`. Re-read it if anything below is ambiguous — the spec wins.

## File structure

**Create:**

| Path | Responsibility |
|---|---|
| `content/events/lightning-talk.json` | Single-event config (windows, limits, rules) |
| `src/types/event.ts` | `EventConfig` type |
| `src/types/voting.ts` | `Submission`, `SubmissionStatus`, `Ballot`, `AdminSession` types |
| `src/lib/voting.ts` | Pure helpers (`isWithinWindow`, `validateBallot`, `sameCanonicalBallot`, `tallyVotes`, `shuffleWithSeed`, `getEventConfig`) + KV access (`createSubmission`, `listSubmissions`, `setSubmissionStatus`, `getBallot`, `writeBallot`, `voterCount`, `incrSubmitRate`, `getSubmitRate`) |
| `src/lib/admin.ts` | `constantTimeTokenMatch`, `signSession`, `verifySession`, `newSessionCookieValue`, `readAdminSession` |
| `src/lib/__tests__/voting.test.ts` | Unit tests for pure helpers in `voting.ts` |
| `src/lib/__tests__/admin.test.ts` | Unit tests for pure helpers in `admin.ts` |
| `src/middleware.ts` | Seeds `zts_voter` cookie on public + API paths |
| `src/app/submit/page.tsx` | Server page for QR 1 |
| `src/app/submit/SubmissionForm.tsx` | Client form component |
| `src/app/vote/page.tsx` | Server page for QR 2 |
| `src/app/vote/VoteClient.tsx` | Client selection UI |
| `src/app/admin/page.tsx` | Landing / token-entry |
| `src/app/admin/AdminLoginForm.tsx` | Client form that POSTs to `/api/admin/session` |
| `src/app/admin/submissions/page.tsx` | Moderation queue |
| `src/app/admin/submissions/SubmissionActions.tsx` | Client action buttons (PATCH) |
| `src/app/admin/results/page.tsx` | Ranked tally |
| `src/app/admin/results/ResultsExport.tsx` | Client CSV download button |
| `src/app/api/submissions/route.ts` | POST create submission |
| `src/app/api/votes/route.ts` | POST ballot |
| `src/app/api/admin/session/route.ts` | POST login |
| `src/app/api/admin/logout/route.ts` | POST clear session |
| `src/app/api/admin/submissions/route.ts` | GET + PATCH submissions |
| `src/app/api/admin/results/route.ts` | GET tally |
| `e2e/lightning-talk-voting.spec.ts` | Playwright smoke |
| `public/events/.gitkeep` | Placeholder; real QRs are tracked PNGs added manually |

**Modify:**

| Path | Change |
|---|---|
| `package.json` | Add `@vercel/kv` dependency |
| `.env.example` (create if absent) | Document `ADMIN_TOKEN`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` |
| `README.md` | Short "Lightning Talk Voting" section with env vars + QR generation note |

---

## Phase 0 — Foundation

### Task 0.1: Install `@vercel/kv` and add env example

**Files:**
- Modify: `package.json`
- Create: `.env.example`

- [ ] **Step 1: Install the dependency**

Run:
```bash
npm install @vercel/kv
```

Expected: `package.json` gains `"@vercel/kv": "^<version>"` under `dependencies`, `package-lock.json` updates.

- [ ] **Step 2: Create `.env.example` with required vars**

Create `.env.example`:
```bash
# Vercel KV (auto-populated by `vercel env pull .env.local` after linking KV)
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Lightning-talk voting admin access (32+ random bytes recommended)
ADMIN_TOKEN=

# Optional — used by src/app/layout.tsx and sitemap
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] **Step 3: Verify install did not break typecheck**

Run:
```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .env.example
git commit -m "feat(voting): add @vercel/kv dep and env example"
```

---

### Task 0.2: Event config file and types

**Files:**
- Create: `content/events/lightning-talk.json`
- Create: `src/types/event.ts`
- Create: `src/types/voting.ts`

- [ ] **Step 1: Create the event config**

Create `content/events/lightning-talk.json`:
```json
{
  "slug": "lightning-talk",
  "name": "Community Lightning Talks — April 2026",
  "submissionOpensAt": "2026-04-15T00:00:00Z",
  "submissionClosesAt": "2026-04-25T23:59:00Z",
  "votingOpensAt": "2026-04-20T00:00:00Z",
  "votingClosesAt": "2026-04-27T23:59:00Z",
  "voteLimit": 3,
  "submissionRateLimitPerCookie24h": 3,
  "contactRule": "handle-or-contact"
}
```

- [ ] **Step 2: Create event type**

Create `src/types/event.ts`:
```ts
export type ContactRule = 'handle-or-contact';

export interface EventConfig {
  slug: string;
  name: string;
  submissionOpensAt: string;
  submissionClosesAt: string;
  votingOpensAt: string;
  votingClosesAt: string;
  voteLimit: number;
  submissionRateLimitPerCookie24h: number;
  contactRule: ContactRule;
}
```

- [ ] **Step 3: Create voting/submission types**

Create `src/types/voting.ts`:
```ts
export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface Submission {
  id: string;
  event: string;
  speakerName: string;
  handle?: string;
  contact?: string;
  title: string;
  intro: string;
  tag?: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface Ballot {
  submissionIds: string[];
  submittedAt: string;
}

export interface AdminSession {
  expMs: number;
}
```

- [ ] **Step 4: Typecheck**

Run:
```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add content/events/lightning-talk.json src/types/event.ts src/types/voting.ts
git commit -m "feat(voting): add event config + core types"
```

---

## Phase 1 — Pure helpers with unit tests

### Task 1.1: Voting pure helpers (TDD)

**Files:**
- Create: `src/lib/voting.ts`
- Test: `src/lib/__tests__/voting.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/lib/__tests__/voting.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import {
  isWithinWindow,
  validateBallot,
  sameCanonicalBallot,
  tallyVotes,
  shuffleWithSeed,
} from '@/lib/voting';

describe('isWithinWindow', () => {
  const opens = '2026-04-20T00:00:00Z';
  const closes = '2026-04-27T00:00:00Z';

  it('is false before opens', () => {
    expect(isWithinWindow(opens, closes, new Date('2026-04-19T23:59:59Z'))).toBe(false);
  });
  it('is true at opens', () => {
    expect(isWithinWindow(opens, closes, new Date('2026-04-20T00:00:00Z'))).toBe(true);
  });
  it('is true mid-window', () => {
    expect(isWithinWindow(opens, closes, new Date('2026-04-23T12:00:00Z'))).toBe(true);
  });
  it('is false at closes (exclusive)', () => {
    expect(isWithinWindow(opens, closes, new Date('2026-04-27T00:00:00Z'))).toBe(false);
  });
});

describe('validateBallot', () => {
  const approved = new Set(['a', 'b', 'c', 'd']);

  it('rejects empty array', () => {
    expect(validateBallot([], 3, approved)).toEqual({ ok: false, error: 'validation' });
  });
  it('rejects over limit', () => {
    expect(validateBallot(['a', 'b', 'c', 'd'], 3, approved)).toEqual({ ok: false, error: 'validation' });
  });
  it('rejects duplicates', () => {
    expect(validateBallot(['a', 'a'], 3, approved)).toEqual({ ok: false, error: 'validation' });
  });
  it('rejects unknown id', () => {
    expect(validateBallot(['a', 'z'], 3, approved)).toEqual({ ok: false, error: 'unknown-submission' });
  });
  it('accepts a valid ballot', () => {
    expect(validateBallot(['a', 'b'], 3, approved)).toEqual({ ok: true });
  });
});

describe('sameCanonicalBallot', () => {
  it('is true for same ids in same order', () => {
    expect(sameCanonicalBallot(['a', 'b'], ['a', 'b'])).toBe(true);
  });
  it('is true for same ids different order', () => {
    expect(sameCanonicalBallot(['a', 'b', 'c'], ['c', 'a', 'b'])).toBe(true);
  });
  it('is false for different lengths', () => {
    expect(sameCanonicalBallot(['a'], ['a', 'b'])).toBe(false);
  });
  it('is false for different ids', () => {
    expect(sameCanonicalBallot(['a', 'b'], ['a', 'c'])).toBe(false);
  });
});

describe('tallyVotes', () => {
  const approved = new Set(['a', 'b', 'c']);

  it('counts approved ids only', () => {
    const ballots = [
      { submissionIds: ['a', 'b'] },
      { submissionIds: ['a', 'c'] },
      { submissionIds: ['a', 'd'] }, // d is not approved -> ignored
    ];
    const counts = tallyVotes(ballots, approved);
    expect(counts.get('a')).toBe(3);
    expect(counts.get('b')).toBe(1);
    expect(counts.get('c')).toBe(1);
    expect(counts.has('d')).toBe(false);
  });

  it('returns an empty map when no ballots', () => {
    expect(tallyVotes([], approved).size).toBe(0);
  });
});

describe('shuffleWithSeed', () => {
  it('is deterministic for the same seed', () => {
    const a = shuffleWithSeed(['x', 'y', 'z', 'w', 'v'], 'seed-1');
    const b = shuffleWithSeed(['x', 'y', 'z', 'w', 'v'], 'seed-1');
    expect(a).toEqual(b);
  });
  it('differs across seeds', () => {
    const a = shuffleWithSeed(['x', 'y', 'z', 'w', 'v'], 'seed-1');
    const b = shuffleWithSeed(['x', 'y', 'z', 'w', 'v'], 'seed-2');
    expect(a).not.toEqual(b);
  });
  it('preserves the multiset', () => {
    const input = ['x', 'y', 'z', 'w', 'v'];
    const out = shuffleWithSeed(input, 'seed-3');
    expect(out.sort()).toEqual([...input].sort());
  });
  it('does not mutate input', () => {
    const input = ['x', 'y', 'z'];
    shuffleWithSeed(input, 's');
    expect(input).toEqual(['x', 'y', 'z']);
  });
});
```

- [ ] **Step 2: Run tests — they must fail**

Run:
```bash
npx vitest run src/lib/__tests__/voting.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement the pure helpers**

Create `src/lib/voting.ts`:
```ts
import fs from 'fs/promises';
import path from 'path';
import type { EventConfig } from '@/types/event';

export async function getEventConfig(slug = 'lightning-talk'): Promise<EventConfig> {
  const file = path.join(process.cwd(), 'content', 'events', `${slug}.json`);
  const raw = await fs.readFile(file, 'utf-8');
  return JSON.parse(raw) as EventConfig;
}

export function isWithinWindow(opens: string, closes: string, now: Date): boolean {
  const o = new Date(opens).getTime();
  const c = new Date(closes).getTime();
  const n = now.getTime();
  return n >= o && n < c;
}

export type BallotValidation =
  | { ok: true }
  | { ok: false; error: 'validation' | 'unknown-submission' };

export function validateBallot(
  submissionIds: unknown,
  voteLimit: number,
  approvedIds: Set<string>
): BallotValidation {
  if (!Array.isArray(submissionIds)) return { ok: false, error: 'validation' };
  if (submissionIds.length < 1 || submissionIds.length > voteLimit) {
    return { ok: false, error: 'validation' };
  }
  const seen = new Set<string>();
  for (const id of submissionIds) {
    if (typeof id !== 'string' || id.length === 0) return { ok: false, error: 'validation' };
    if (seen.has(id)) return { ok: false, error: 'validation' };
    seen.add(id);
  }
  for (const id of submissionIds as string[]) {
    if (!approvedIds.has(id)) return { ok: false, error: 'unknown-submission' };
  }
  return { ok: true };
}

export function sameCanonicalBallot(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const A = [...a].sort();
  const B = [...b].sort();
  for (let i = 0; i < A.length; i++) if (A[i] !== B[i]) return false;
  return true;
}

export function tallyVotes(
  ballots: Array<{ submissionIds: string[] }>,
  approvedIds: Set<string>
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const b of ballots) {
    for (const id of b.submissionIds) {
      if (approvedIds.has(id)) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
  }
  return counts;
}

function xmur3(str: string): () => number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

export function shuffleWithSeed<T>(items: T[], seed: string): T[] {
  const rand = xmur3(seed);
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

- [ ] **Step 4: Run tests — they must pass**

Run:
```bash
npx vitest run src/lib/__tests__/voting.test.ts
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/voting.ts src/lib/__tests__/voting.test.ts
git commit -m "feat(voting): pure helpers with unit tests"
```

---

### Task 1.2: Admin auth pure helpers (TDD)

**Files:**
- Create: `src/lib/admin.ts`
- Test: `src/lib/__tests__/admin.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/lib/__tests__/admin.test.ts`:
```ts
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
```

- [ ] **Step 2: Run tests — they must fail**

Run:
```bash
npx vitest run src/lib/__tests__/admin.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement the helpers**

Create `src/lib/admin.ts`:
```ts
import crypto from 'crypto';

const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
export const ADMIN_SESSION_COOKIE = 'zts_admin';

function secret(): string {
  return process.env.ADMIN_TOKEN ?? '';
}

export function constantTimeTokenMatch(provided: string): boolean {
  const expected = secret();
  if (!expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    // keep timing stable even when lengths differ
    crypto.timingSafeEqual(Buffer.alloc(b.length), b);
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
```

- [ ] **Step 4: Run tests — they must pass**

Run:
```bash
npx vitest run src/lib/__tests__/admin.test.ts
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/admin.ts src/lib/__tests__/admin.test.ts
git commit -m "feat(voting): admin token + signed session helpers"
```

---

## Phase 2 — KV layer

### Task 2.1: Submission + ballot + rate-limit KV helpers

**Files:**
- Modify: `src/lib/voting.ts`

- [ ] **Step 1: Append KV helpers to `voting.ts`**

Append the following exports to `src/lib/voting.ts` (keep the existing pure helpers above):
```ts
import { kv } from '@vercel/kv';
import type { Submission, SubmissionStatus, Ballot } from '@/types/voting';

const submissionKey = (id: string) => `submission:${id}`;
const submissionsSetKey = (event: string) => `submissions:set:${event}`;
const voteKey = (event: string, voter: string) => `vote:${event}:${voter}`;
const votersSetKey = (event: string) => `voters:set:${event}`;
const submitRateKey = (event: string, cookie: string) => `submit-rate:${event}:${cookie}`;

export async function createSubmission(input: Omit<Submission, 'id' | 'status' | 'createdAt'>): Promise<Submission> {
  const id = crypto.randomUUID();
  const submission: Submission = {
    ...input,
    id,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  await kv.set(submissionKey(id), submission);
  await kv.sadd(submissionsSetKey(input.event), id);
  return submission;
}

export async function getSubmission(id: string): Promise<Submission | null> {
  return (await kv.get<Submission>(submissionKey(id))) ?? null;
}

export async function listSubmissions(event: string): Promise<Submission[]> {
  const ids = (await kv.smembers(submissionsSetKey(event))) as string[];
  if (ids.length === 0) return [];
  const results = await Promise.all(ids.map((id) => kv.get<Submission>(submissionKey(id))));
  return results.filter((s): s is Submission => s !== null);
}

export async function setSubmissionStatus(id: string, status: SubmissionStatus): Promise<void> {
  const current = await getSubmission(id);
  if (!current) throw new Error(`submission ${id} not found`);
  await kv.set(submissionKey(id), { ...current, status });
}

export async function getBallot(event: string, voter: string): Promise<Ballot | null> {
  return (await kv.get<Ballot>(voteKey(event, voter))) ?? null;
}

export async function writeBallot(event: string, voter: string, ballot: Ballot): Promise<void> {
  await kv.set(voteKey(event, voter), ballot);
  await kv.sadd(votersSetKey(event), voter);
}

export async function voterCount(event: string): Promise<number> {
  return (await kv.scard(votersSetKey(event))) as number;
}

export async function listBallots(event: string): Promise<Ballot[]> {
  const voters = (await kv.smembers(votersSetKey(event))) as string[];
  if (voters.length === 0) return [];
  const results = await Promise.all(voters.map((v) => kv.get<Ballot>(voteKey(event, v))));
  return results.filter((b): b is Ballot => b !== null);
}

export async function getSubmitRate(event: string, cookie: string): Promise<number> {
  return (await kv.get<number>(submitRateKey(event, cookie))) ?? 0;
}

export async function incrSubmitRate(event: string, cookie: string): Promise<number> {
  const key = submitRateKey(event, cookie);
  const n = (await kv.incr(key)) as number;
  if (n === 1) await kv.expire(key, 86400);
  return n;
}
```

- [ ] **Step 2: Typecheck and lint**

Run:
```bash
npx tsc --noEmit && npm run lint
```

Expected: no errors. If `@vercel/kv` typings complain, verify Task 0.1 installed it.

- [ ] **Step 3: Run existing unit tests — still pass**

Run:
```bash
npx vitest run
```

Expected: all pass (KV code paths are not exercised by unit tests).

- [ ] **Step 4: Commit**

```bash
git add src/lib/voting.ts
git commit -m "feat(voting): KV helpers for submissions, ballots, rate limit"
```

---

## Phase 3 — Middleware (voter cookie)

### Task 3.1: `zts_voter` middleware

**Files:**
- Create: `src/middleware.ts`

- [ ] **Step 1: Create middleware**

Create `src/middleware.ts`:
```ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const VOTER_COOKIE = 'zts_voter';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (!req.cookies.get(VOTER_COOKIE)) {
    res.cookies.set({
      name: VOTER_COOKIE,
      value: crypto.randomUUID(),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return res;
}

export const config = {
  matcher: ['/submit', '/vote', '/api/submissions', '/api/votes'],
};
```

- [ ] **Step 2: Typecheck**

Run:
```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Build**

Run:
```bash
npm run build
```

Expected: build succeeds. Warnings are fine as long as compilation passes.

- [ ] **Step 4: Commit**

```bash
git add src/middleware.ts
git commit -m "feat(voting): middleware seeds zts_voter cookie"
```

---

## Phase 4 — Submissions flow

### Task 4.1: `POST /api/submissions`

**Files:**
- Create: `src/app/api/submissions/route.ts`

- [ ] **Step 1: Implement route**

Create `src/app/api/submissions/route.ts`:
```ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { VOTER_COOKIE } from '@/middleware';
import {
  createSubmission,
  getEventConfig,
  getSubmitRate,
  incrSubmitRate,
  isWithinWindow,
} from '@/lib/voting';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  speakerName: z.string().trim().min(1),
  handle: z.string().trim().optional(),
  contact: z.string().trim().optional(),
  title: z.string().trim().min(1).max(80),
  intro: z.string().trim().min(1).max(500),
  tag: z.string().trim().optional(),
  consent: z.literal(true),
});

export async function POST(req: Request) {
  const voter = cookies().get(VOTER_COOKIE)?.value;
  if (!voter) {
    return NextResponse.json({ ok: false, error: 'cookies-required' }, { status: 400 });
  }

  const event = await getEventConfig();
  if (!isWithinWindow(event.submissionOpensAt, event.submissionClosesAt, new Date())) {
    return NextResponse.json({ ok: false, error: 'closed' }, { status: 400 });
  }

  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
  }
  const { handle, contact } = parsed.data;
  if (!(handle && handle.length > 0) && !(contact && contact.length > 0)) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
  }

  const count = await getSubmitRate(event.slug, voter);
  if (count >= event.submissionRateLimitPerCookie24h) {
    return NextResponse.json({ ok: false, error: 'rate-limited' }, { status: 429 });
  }

  const submission = await createSubmission({
    event: event.slug,
    speakerName: parsed.data.speakerName,
    handle,
    contact,
    title: parsed.data.title,
    intro: parsed.data.intro,
    tag: parsed.data.tag,
  });
  await incrSubmitRate(event.slug, voter);

  return NextResponse.json({ ok: true, id: submission.id });
}
```

- [ ] **Step 2: Typecheck + build**

Run:
```bash
npx tsc --noEmit && npm run build
```

Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/submissions/route.ts
git commit -m "feat(voting): POST /api/submissions"
```

---

### Task 4.2: `/submit` page + `<SubmissionForm />`

**Files:**
- Create: `src/app/submit/page.tsx`
- Create: `src/app/submit/SubmissionForm.tsx`

- [ ] **Step 1: Create the client form**

Create `src/app/submit/SubmissionForm.tsx`:
```tsx
'use client';

import { useState } from 'react';

interface Props {
  disabled: boolean;
  submissionClosesAt: string;
  eventName: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function SubmissionForm({ disabled, submissionClosesAt, eventName }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disabled) return;
    setStatus('submitting');
    const fd = new FormData(e.currentTarget);
    const body = {
      speakerName: String(fd.get('speakerName') ?? '').trim(),
      handle: String(fd.get('handle') ?? '').trim() || undefined,
      contact: String(fd.get('contact') ?? '').trim() || undefined,
      title: String(fd.get('title') ?? '').trim(),
      intro: String(fd.get('intro') ?? '').trim(),
      tag: String(fd.get('tag') ?? '').trim() || undefined,
      consent: fd.get('consent') === 'on',
    };
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      setStatus('success');
      return;
    }
    setStatus('error');
    switch (data.error) {
      case 'closed':
        setErrorMsg('Submissions are closed.');
        break;
      case 'rate-limited':
        setErrorMsg("You've reached the limit of submissions from this browser in 24 hours.");
        break;
      case 'cookies-required':
        setErrorMsg('Please enable cookies and reload before submitting.');
        break;
      case 'validation':
      default:
        setErrorMsg('Please fill in every required field, including a handle or contact.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-md border border-green-300 bg-green-50 p-4 text-green-900">
        <p className="font-medium">Thanks — your talk is under review.</p>
        <p className="text-sm">You&apos;ll see it on the voting page once organizers approve it.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="text-sm text-neutral-600">
        Submitting to <strong>{eventName}</strong>. Window closes{' '}
        {new Date(submissionClosesAt).toLocaleString()}.
      </p>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Your name</span>
        <input
          name="speakerName"
          required
          className="w-full rounded border border-neutral-300 p-2"
          disabled={disabled}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Public handle (optional if you fill in contact)</span>
        <input name="handle" className="w-full rounded border border-neutral-300 p-2" disabled={disabled} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Contact info (optional if you fill in handle)</span>
        <input name="contact" className="w-full rounded border border-neutral-300 p-2" disabled={disabled} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Talk title (≤ 80 chars)</span>
        <input
          name="title"
          required
          maxLength={80}
          className="w-full rounded border border-neutral-300 p-2"
          disabled={disabled}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Short intro (≤ 500 chars)</span>
        <textarea
          name="intro"
          required
          maxLength={500}
          rows={4}
          className="w-full rounded border border-neutral-300 p-2"
          disabled={disabled}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Tag (optional)</span>
        <input name="tag" className="w-full rounded border border-neutral-300 p-2" disabled={disabled} />
      </label>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="consent" required disabled={disabled} />
        <span>
          I understand this is a 5-minute lightning talk and agree my submission can be displayed publicly for
          voting.
        </span>
      </label>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-700">
          {errorMsg}
        </p>
      )}
      <button
        type="submit"
        disabled={disabled || status === 'submitting'}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit talk'}
      </button>
      {disabled && <p className="text-sm text-neutral-600">Submissions are closed.</p>}
    </form>
  );
}
```

- [ ] **Step 2: Create the server page**

Create `src/app/submit/page.tsx`:
```tsx
import { getEventConfig, isWithinWindow } from '@/lib/voting';
import { SubmissionForm } from './SubmissionForm';

export const dynamic = 'force-dynamic';

export default async function SubmitPage() {
  const event = await getEventConfig();
  const open = isWithinWindow(event.submissionOpensAt, event.submissionClosesAt, new Date());
  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-2 text-2xl font-semibold">Submit a 5-minute talk</h1>
      <p className="mb-6 text-sm text-neutral-600">
        Share something useful, fun, or inspiring with the community.
      </p>
      <SubmissionForm
        disabled={!open}
        submissionClosesAt={event.submissionClosesAt}
        eventName={event.name}
      />
    </div>
  );
}
```

- [ ] **Step 3: Build**

Run:
```bash
npm run build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/app/submit/page.tsx src/app/submit/SubmissionForm.tsx
git commit -m "feat(voting): /submit page + form"
```

---

## Phase 5 — Admin auth

### Task 5.1: `/api/admin/session` + `/api/admin/logout`

**Files:**
- Create: `src/app/api/admin/session/route.ts`
- Create: `src/app/api/admin/logout/route.ts`

- [ ] **Step 1: Create login route**

Create `src/app/api/admin/session/route.ts`:
```ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import {
  ADMIN_SESSION_COOKIE,
  constantTimeTokenMatch,
  newSessionCookieValue,
} from '@/lib/admin';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({ token: z.string().min(1) });

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!constantTimeTokenMatch(parsed.data.token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { value, expiresAt } = newSessionCookieValue();
  cookies().set({
    name: ADMIN_SESSION_COOKIE,
    value,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  });
  return new NextResponse(null, { status: 204 });
}
```

- [ ] **Step 2: Create logout route**

Create `src/app/api/admin/logout/route.ts`:
```ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export async function POST() {
  cookies().delete(ADMIN_SESSION_COOKIE);
  return new NextResponse(null, { status: 204 });
}
```

- [ ] **Step 3: Build**

Run:
```bash
npm run build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/admin/session/route.ts src/app/api/admin/logout/route.ts
git commit -m "feat(voting): admin session login + logout"
```

---

### Task 5.2: `/admin` landing page

**Files:**
- Create: `src/app/admin/AdminLoginForm.tsx`
- Create: `src/app/admin/page.tsx`

- [ ] **Step 1: Create client form**

Create `src/app/admin/AdminLoginForm.tsx`:
```tsx
'use client';

import { useState } from 'react';

export function AdminLoginForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const fd = new FormData(e.currentTarget);
    const token = String(fd.get('token') ?? '');
    const res = await fetch('/api/admin/session', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (res.status === 204) {
      window.location.href = '/admin/submissions';
      return;
    }
    setStatus('error');
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Admin token</span>
        <input
          name="token"
          type="password"
          required
          className="w-full rounded border border-neutral-300 p-2"
          autoComplete="off"
        />
      </label>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-700">
          Invalid token.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {status === 'submitting' ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Create landing page**

Create `src/app/admin/page.tsx`:
```tsx
import Link from 'next/link';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import { AdminLoginForm } from './AdminLoginForm';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const authed = verifySession(session, Date.now());

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-4 py-10">
        <h1 className="mb-4 text-2xl font-semibold">Admin sign-in</h1>
        <AdminLoginForm />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-4 text-2xl font-semibold">Admin</h1>
      <ul className="space-y-2">
        <li>
          <Link className="text-blue-700 underline" href="/admin/submissions">
            Submissions queue
          </Link>
        </li>
        <li>
          <Link className="text-blue-700 underline" href="/admin/results">
            Results
          </Link>
        </li>
      </ul>
      <form action="/api/admin/logout" method="post" className="mt-6">
        <button type="submit" className="text-sm text-neutral-600 underline">
          Sign out
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 3: Build**

Run:
```bash
npm run build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/app/admin/page.tsx src/app/admin/AdminLoginForm.tsx
git commit -m "feat(voting): /admin landing page"
```

---

## Phase 6 — Admin moderation

### Task 6.1: `GET|PATCH /api/admin/submissions`

**Files:**
- Create: `src/app/api/admin/submissions/route.ts`

- [ ] **Step 1: Create route**

Create `src/app/api/admin/submissions/route.ts`:
```ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import {
  getEventConfig,
  listSubmissions,
  setSubmissionStatus,
  getSubmission,
} from '@/lib/voting';
import type { SubmissionStatus } from '@/types/voting';

export const dynamic = 'force-dynamic';

function unauthorized() {
  return NextResponse.json({ ok: false }, { status: 401 });
}

function requireSession(): boolean {
  const v = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  return verifySession(v, Date.now());
}

export async function GET(req: Request) {
  if (!requireSession()) return unauthorized();
  const url = new URL(req.url);
  const filter = (url.searchParams.get('status') ?? 'all') as SubmissionStatus | 'all';
  const event = await getEventConfig();
  const all = await listSubmissions(event.slug);
  const submissions = filter === 'all' ? all : all.filter((s) => s.status === filter);
  return NextResponse.json({ submissions });
}

const patchSchema = z.object({ status: z.enum(['pending', 'approved', 'rejected']) });

export async function PATCH(req: Request) {
  if (!requireSession()) return unauthorized();
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
  const existing = await getSubmission(id);
  if (!existing) return NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });
  const json = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
  }
  await setSubmissionStatus(id, parsed.data.status);
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Build**

Run:
```bash
npm run build
```

Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/admin/submissions/route.ts
git commit -m "feat(voting): admin submissions GET + PATCH"
```

---

### Task 6.2: `/admin/submissions` page

**Files:**
- Create: `src/app/admin/submissions/SubmissionActions.tsx`
- Create: `src/app/admin/submissions/page.tsx`

- [ ] **Step 1: Create client action buttons**

Create `src/app/admin/submissions/SubmissionActions.tsx`:
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Status = 'pending' | 'approved' | 'rejected';

export function SubmissionActions({ id, current }: { id: string; current: Status }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function set(status: Status) {
    setBusy(true);
    const res = await fetch(`/api/admin/submissions?id=${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setBusy(false);
    if (res.ok) router.refresh();
    else alert('Update failed.');
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={busy || current === 'approved'}
        onClick={() => set('approved')}
        className="rounded bg-green-700 px-2 py-1 text-xs text-white disabled:opacity-50"
      >
        Approve
      </button>
      <button
        type="button"
        disabled={busy || current === 'rejected'}
        onClick={() => set('rejected')}
        className="rounded bg-red-700 px-2 py-1 text-xs text-white disabled:opacity-50"
      >
        Reject
      </button>
      <button
        type="button"
        disabled={busy || current === 'pending'}
        onClick={() => set('pending')}
        className="rounded bg-neutral-700 px-2 py-1 text-xs text-white disabled:opacity-50"
      >
        Reset
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create page**

Create `src/app/admin/submissions/page.tsx`:
```tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import { getEventConfig, listSubmissions, voterCount, listBallots } from '@/lib/voting';
import type { Submission, SubmissionStatus } from '@/types/voting';
import { SubmissionActions } from './SubmissionActions';

export const dynamic = 'force-dynamic';

const ORDER: SubmissionStatus[] = ['pending', 'approved', 'rejected'];

function groupByStatus(list: Submission[]): Record<SubmissionStatus, Submission[]> {
  const out: Record<SubmissionStatus, Submission[]> = { pending: [], approved: [], rejected: [] };
  for (const s of list) out[s.status].push(s);
  return out;
}

export default async function AdminSubmissionsPage() {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySession(session, Date.now())) redirect('/admin');

  const event = await getEventConfig();
  const [all, totalVoters, ballots] = await Promise.all([
    listSubmissions(event.slug),
    voterCount(event.slug),
    listBallots(event.slug),
  ]);
  const totalVotes = ballots.reduce((n, b) => n + b.submissionIds.length, 0);
  const grouped = groupByStatus(all);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-semibold">Submissions</h1>
      <p className="mb-6 text-sm text-neutral-600">
        {event.name} · submissions close {new Date(event.submissionClosesAt).toLocaleString()} · voting closes{' '}
        {new Date(event.votingClosesAt).toLocaleString()} · vote limit {event.voteLimit} · voters {totalVoters} ·
        total votes {totalVotes}
      </p>
      {ORDER.map((status) => (
        <section key={status} className="mb-8">
          <h2 className="mb-2 text-lg font-semibold capitalize">
            {status} ({grouped[status].length})
          </h2>
          {grouped[status].length === 0 ? (
            <p className="text-sm text-neutral-600">None.</p>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Speaker</th>
                  <th className="py-2 pr-4">Contact</th>
                  <th className="py-2 pr-4">Intro</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {grouped[status].map((s) => (
                  <tr key={s.id} className="border-b align-top">
                    <td className="py-2 pr-4 font-medium">{s.title}</td>
                    <td className="py-2 pr-4">
                      {s.speakerName}
                      {s.handle ? ` · ${s.handle}` : ''}
                    </td>
                    <td className="py-2 pr-4 text-neutral-700">{s.contact ?? ''}</td>
                    <td className="py-2 pr-4 text-neutral-700">{s.intro}</td>
                    <td className="py-2 pr-4">
                      <SubmissionActions id={s.id} current={s.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Build**

Run:
```bash
npm run build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/app/admin/submissions/page.tsx src/app/admin/submissions/SubmissionActions.tsx
git commit -m "feat(voting): admin moderation queue"
```

---

## Phase 7 — Voting

### Task 7.1: `POST /api/votes`

**Files:**
- Create: `src/app/api/votes/route.ts`

- [ ] **Step 1: Create route**

Create `src/app/api/votes/route.ts`:
```ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { VOTER_COOKIE } from '@/middleware';
import {
  getBallot,
  getEventConfig,
  isWithinWindow,
  listSubmissions,
  sameCanonicalBallot,
  validateBallot,
  writeBallot,
} from '@/lib/voting';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({ submissionIds: z.array(z.string().min(1)) });

export async function POST(req: Request) {
  const voter = cookies().get(VOTER_COOKIE)?.value;
  if (!voter) {
    return NextResponse.json({ ok: false, error: 'cookies-required' }, { status: 400 });
  }

  const event = await getEventConfig();
  if (!isWithinWindow(event.votingOpensAt, event.votingClosesAt, new Date())) {
    return NextResponse.json({ ok: false, error: 'closed' }, { status: 400 });
  }

  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
  }
  const requested = parsed.data.submissionIds;

  // Initial validation pass
  const initial = await listSubmissions(event.slug);
  const approvedIds = new Set(initial.filter((s) => s.status === 'approved').map((s) => s.id));
  const first = validateBallot(requested, event.voteLimit, approvedIds);
  if (!first.ok) {
    return NextResponse.json({ ok: false, error: first.error }, { status: 400 });
  }

  // Idempotency / already-voted check
  const existing = await getBallot(event.slug, voter);
  if (existing) {
    if (sameCanonicalBallot(existing.submissionIds, requested)) {
      return NextResponse.json({ ok: true, recorded: existing.submissionIds.length, alreadyRecorded: true });
    }
    return NextResponse.json({ ok: false, error: 'already-voted' }, { status: 409 });
  }

  // Re-read right before writing — talks may have changed status
  const fresh = await listSubmissions(event.slug);
  const freshApproved = new Set(fresh.filter((s) => s.status === 'approved').map((s) => s.id));
  const final = requested.filter((id) => freshApproved.has(id));
  if (final.length === 0) {
    return NextResponse.json({ ok: false, error: 'selection-unavailable' }, { status: 409 });
  }

  await writeBallot(event.slug, voter, {
    submissionIds: final,
    submittedAt: new Date().toISOString(),
  });

  const dropped = requested.length - final.length;
  return NextResponse.json({
    ok: true,
    recorded: final.length,
    ...(dropped > 0 ? { dropped } : {}),
  });
}
```

- [ ] **Step 2: Build**

Run:
```bash
npm run build
```

Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/votes/route.ts
git commit -m "feat(voting): POST /api/votes (idempotent, write-once)"
```

---

### Task 7.2: `/vote` page + `<VoteClient />`

**Files:**
- Create: `src/app/vote/VoteClient.tsx`
- Create: `src/app/vote/page.tsx`

- [ ] **Step 1: Create client**

Create `src/app/vote/VoteClient.tsx`:
```tsx
'use client';

import { useState } from 'react';

interface Card {
  id: string;
  title: string;
  speakerName: string;
  handle?: string;
  tag?: string;
  intro: string;
}

export function VoteClient({ cards, voteLimit }: { cards: Card[]; voteLimit: number }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < voteLimit) next.add(id);
      return next;
    });
  }

  async function submit() {
    setStatus('submitting');
    const res = await fetch('/api/votes', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ submissionIds: Array.from(selected) }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      setStatus('success');
      const dropped = Number(data.dropped ?? 0);
      setMessage(
        dropped > 0
          ? 'Vote recorded, but some selections were no longer available.'
          : data.alreadyRecorded
            ? 'You already submitted this ballot. Nothing changed.'
            : 'Thanks — your vote has been recorded.'
      );
      return;
    }
    setStatus('error');
    switch (data.error) {
      case 'already-voted':
        setMessage('This browser has already submitted a ballot.');
        break;
      case 'selection-unavailable':
        setMessage('Your selected talks changed while you were voting. Refresh and try again.');
        break;
      case 'closed':
        setMessage('Voting is closed.');
        break;
      case 'cookies-required':
        setMessage('Please enable cookies and reload.');
        break;
      case 'unknown-submission':
        setMessage('One of your selections is no longer available. Refresh and try again.');
        break;
      default:
        setMessage('Could not record your vote. Try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-md border border-green-300 bg-green-50 p-4 text-green-900">
        <p className="font-medium">{message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-600">
        Pick up to {voteLimit} talks. {selected.size}/{voteLimit} selected.
      </p>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {cards.map((c) => {
          const isSelected = selected.has(c.id);
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => toggle(c.id)}
                className={`w-full rounded-lg border p-4 text-left transition ${
                  isSelected ? 'border-black bg-neutral-900 text-white' : 'border-neutral-300 bg-white'
                }`}
                aria-pressed={isSelected}
              >
                <div className="font-medium">{c.title}</div>
                <div className="text-xs opacity-80">
                  {c.speakerName}
                  {c.handle ? ` · ${c.handle}` : ''}
                  {c.tag ? ` · ${c.tag}` : ''}
                </div>
                <p className="mt-2 text-sm opacity-90">{c.intro}</p>
              </button>
            </li>
          );
        })}
      </ul>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-700">
          {message}
        </p>
      )}
      <button
        type="button"
        onClick={submit}
        disabled={selected.size === 0 || status === 'submitting'}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {status === 'submitting' ? 'Submitting…' : `Submit vote (${selected.size})`}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create page**

Create `src/app/vote/page.tsx`:
```tsx
import { cookies } from 'next/headers';
import { VOTER_COOKIE } from '@/middleware';
import {
  getBallot,
  getEventConfig,
  isWithinWindow,
  listSubmissions,
  shuffleWithSeed,
} from '@/lib/voting';
import { VoteClient } from './VoteClient';

export const dynamic = 'force-dynamic';

export default async function VotePage() {
  const event = await getEventConfig();
  const open = isWithinWindow(event.votingOpensAt, event.votingClosesAt, new Date());
  const voter = cookies().get(VOTER_COOKIE)?.value;
  const seed = (voter ?? `anon-${Date.now()}`) + ':' + event.slug;
  const [all, existing] = await Promise.all([
    listSubmissions(event.slug),
    voter ? getBallot(event.slug, voter) : Promise.resolve(null),
  ]);
  const approved = all.filter((s) => s.status === 'approved');
  const cards = shuffleWithSeed(
    approved.map((s) => ({
      id: s.id,
      title: s.title,
      speakerName: s.speakerName,
      handle: s.handle,
      tag: s.tag,
      intro: s.intro,
    })),
    seed
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-semibold">Vote for talks you want to hear</h1>
      <p className="mb-6 text-sm text-neutral-600">
        {event.name} · voting closes {new Date(event.votingClosesAt).toLocaleString()}
      </p>

      {existing ? (
        <div className="rounded-md border border-neutral-300 bg-neutral-50 p-4">
          <p className="font-medium">You&apos;ve already voted from this browser.</p>
          <p className="text-sm text-neutral-700">
            {existing.submissionIds.length} selection(s) recorded at{' '}
            {new Date(existing.submittedAt).toLocaleString()}.
          </p>
        </div>
      ) : !open ? (
        <div className="rounded-md border border-neutral-300 bg-neutral-50 p-4">
          <p className="font-medium">
            {Date.now() < new Date(event.votingOpensAt).getTime()
              ? `Voting opens ${new Date(event.votingOpensAt).toLocaleString()}.`
              : 'Voting is closed. Results will be announced soon.'}
          </p>
        </div>
      ) : approved.length === 0 ? (
        <p className="text-sm text-neutral-700">No talks are available for voting yet.</p>
      ) : (
        <VoteClient cards={cards} voteLimit={event.voteLimit} />
      )}
    </div>
  );
}
```

- [ ] **Step 3: Build**

Run:
```bash
npm run build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/app/vote/page.tsx src/app/vote/VoteClient.tsx
git commit -m "feat(voting): /vote page + selection UI"
```

---

## Phase 8 — Admin results

### Task 8.1: `GET /api/admin/results`

**Files:**
- Create: `src/app/api/admin/results/route.ts`

- [ ] **Step 1: Create route**

Create `src/app/api/admin/results/route.ts`:
```ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import {
  getEventConfig,
  listBallots,
  listSubmissions,
  tallyVotes,
  voterCount,
} from '@/lib/voting';
import type { Submission } from '@/types/voting';

export const dynamic = 'force-dynamic';

function assignRanks(rows: Array<Submission & { voteCount: number }>): Array<Submission & { voteCount: number; rank: number }> {
  const sorted = [...rows].sort((a, b) => b.voteCount - a.voteCount);
  let rank = 0;
  let lastCount = -1;
  let seen = 0;
  return sorted.map((r) => {
    seen += 1;
    if (r.voteCount !== lastCount) {
      rank = seen;
      lastCount = r.voteCount;
    }
    return { ...r, rank };
  });
}

export async function GET() {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySession(session, Date.now())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const event = await getEventConfig();
  const [subs, ballots, totalVoters] = await Promise.all([
    listSubmissions(event.slug),
    listBallots(event.slug),
    voterCount(event.slug),
  ]);
  const approvedIds = new Set(subs.filter((s) => s.status === 'approved').map((s) => s.id));
  const counts = tallyVotes(ballots, approvedIds);
  const totalVotes = ballots.reduce((n, b) => n + b.submissionIds.length, 0);

  const rows = subs.map((s) => ({ ...s, voteCount: counts.get(s.id) ?? 0 }));
  const ranked = assignRanks(rows).map((r) => ({
    id: r.id,
    title: r.title,
    speakerName: r.speakerName,
    handle: r.handle,
    contact: r.contact,
    tag: r.tag,
    status: r.status,
    voteCount: r.voteCount,
    rank: r.rank,
  }));

  return NextResponse.json({ totalVoters, totalVotes, results: ranked });
}
```

- [ ] **Step 2: Build**

Run:
```bash
npm run build
```

Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/admin/results/route.ts
git commit -m "feat(voting): admin results endpoint"
```

---

### Task 8.2: `/admin/results` page

**Files:**
- Create: `src/app/admin/results/ResultsExport.tsx`
- Create: `src/app/admin/results/page.tsx`

- [ ] **Step 1: Create CSV export client**

Create `src/app/admin/results/ResultsExport.tsx`:
```tsx
'use client';

interface Row {
  rank: number;
  title: string;
  speakerName: string;
  handle?: string;
  contact?: string;
  tag?: string;
  status: string;
  voteCount: number;
}

function csvEscape(v: string): string {
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export function ResultsExport({ rows, filename }: { rows: Row[]; filename: string }) {
  function download() {
    const header = ['rank', 'title', 'speaker', 'handle', 'contact', 'tag', 'status', 'voteCount'];
    const lines = [header.join(',')];
    for (const r of rows) {
      lines.push(
        [
          String(r.rank),
          csvEscape(r.title),
          csvEscape(r.speakerName),
          csvEscape(r.handle ?? ''),
          csvEscape(r.contact ?? ''),
          csvEscape(r.tag ?? ''),
          r.status,
          String(r.voteCount),
        ].join(',')
      );
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button type="button" onClick={download} className="rounded bg-black px-3 py-1 text-sm text-white">
      Download CSV
    </button>
  );
}
```

- [ ] **Step 2: Create page**

Create `src/app/admin/results/page.tsx`:
```tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import {
  getEventConfig,
  isWithinWindow,
  listBallots,
  listSubmissions,
  tallyVotes,
  voterCount,
} from '@/lib/voting';
import type { Submission } from '@/types/voting';
import { ResultsExport } from './ResultsExport';

export const dynamic = 'force-dynamic';

function assignRanks(rows: Array<Submission & { voteCount: number }>) {
  const sorted = [...rows].sort((a, b) => b.voteCount - a.voteCount);
  let rank = 0;
  let lastCount = -1;
  let seen = 0;
  return sorted.map((r) => {
    seen += 1;
    if (r.voteCount !== lastCount) {
      rank = seen;
      lastCount = r.voteCount;
    }
    return { ...r, rank };
  });
}

export default async function AdminResultsPage() {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySession(session, Date.now())) redirect('/admin');

  const event = await getEventConfig();
  const [subs, ballots, totalVoters] = await Promise.all([
    listSubmissions(event.slug),
    listBallots(event.slug),
    voterCount(event.slug),
  ]);
  const approvedIds = new Set(subs.filter((s) => s.status === 'approved').map((s) => s.id));
  const counts = tallyVotes(ballots, approvedIds);
  const totalVotes = ballots.reduce((n, b) => n + b.submissionIds.length, 0);
  const rows = assignRanks(subs.map((s) => ({ ...s, voteCount: counts.get(s.id) ?? 0 })));
  const votingOpen = isWithinWindow(event.votingOpensAt, event.votingClosesAt, new Date());

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-semibold">Results</h1>
        <ResultsExport
          rows={rows.map((r) => ({
            rank: r.rank,
            title: r.title,
            speakerName: r.speakerName,
            handle: r.handle,
            contact: r.contact,
            tag: r.tag,
            status: r.status,
            voteCount: r.voteCount,
          }))}
          filename={`${event.slug}-results.csv`}
        />
      </div>
      <p className="mb-6 text-sm text-neutral-600">
        {event.name} ·{' '}
        {votingOpen
          ? `voting closes ${new Date(event.votingClosesAt).toLocaleString()}`
          : 'Final ranking'}{' '}
        · voters {totalVoters} · total votes {totalVotes}
      </p>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2 pr-4">Rank</th>
            <th className="py-2 pr-4">Title</th>
            <th className="py-2 pr-4">Speaker</th>
            <th className="py-2 pr-4">Contact</th>
            <th className="py-2 pr-4">Tag</th>
            <th className="py-2 pr-4">Status</th>
            <th className="py-2 pr-4">Votes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b align-top">
              <td className="py-2 pr-4">{r.rank}</td>
              <td className="py-2 pr-4 font-medium">{r.title}</td>
              <td className="py-2 pr-4">
                {r.speakerName}
                {r.handle ? ` · ${r.handle}` : ''}
              </td>
              <td className="py-2 pr-4 text-neutral-700">{r.contact ?? ''}</td>
              <td className="py-2 pr-4">{r.tag ?? ''}</td>
              <td className="py-2 pr-4">{r.status}</td>
              <td className="py-2 pr-4">{r.voteCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 3: Build**

Run:
```bash
npm run build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/app/admin/results/page.tsx src/app/admin/results/ResultsExport.tsx
git commit -m "feat(voting): admin results page + CSV export"
```

---

## Phase 9 — E2E smoke test + finalize

### Task 9.1: Playwright smoke spec

**Files:**
- Create: `e2e/lightning-talk-voting.spec.ts`

**Note:** This spec requires a working KV connection so that submissions / votes persist between HTTP calls. If running locally, `vercel env pull .env.local` before `npm run test:e2e`. If KV is not reachable, skip this task and rely on the unit tests plus a manual walkthrough.

- [ ] **Step 1: Create the spec**

Create `e2e/lightning-talk-voting.spec.ts`:
```ts
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
```

- [ ] **Step 2: Run the spec locally**

Before running, ensure `.env.local` has `ADMIN_TOKEN=<value>` and KV envs pulled from Vercel, then run:
```bash
E2E_ADMIN_TOKEN="$ADMIN_TOKEN" npm run test:e2e -- lightning-talk-voting.spec.ts
```

Expected: the spec passes end-to-end.

- [ ] **Step 3: Commit**

```bash
git add e2e/lightning-talk-voting.spec.ts
git commit -m "test(voting): playwright smoke spec"
```

---

### Task 9.2: README + operational docs, placeholders, and full check suite

**Files:**
- Modify: `README.md`
- Create: `public/events/.gitkeep`

- [ ] **Step 1: Append a short section to `README.md`**

Append this section (adjust the heading level to match the existing README) to `README.md`:
```md
## Lightning Talk Voting

Single-event submission + voting tool under `/submit`, `/vote`, and `/admin`.

**Required env vars** (see `.env.example`):

- `KV_REST_API_URL`, `KV_REST_API_TOKEN` — Vercel KV (run `vercel env pull .env.local` after linking the KV store)
- `ADMIN_TOKEN` — used for admin login and session-cookie signing; generate 32+ random bytes

**Event config:** edit `content/events/lightning-talk.json` and redeploy. Runtime edits are not supported.

**QR codes:** generate PNGs from the production URLs (`/submit` and `/vote`) using any external QR generator, then drop them into `public/events/` as `lightning-talk-qr-submit.png` and `lightning-talk-qr-vote.png`. Regenerate if the production domain changes.

**After the event:** keep `content/events/lightning-talk.json` as an archive; purge KV data with a one-off script if desired.
```

- [ ] **Step 2: Create `.gitkeep` for the QR directory**

Create `public/events/.gitkeep` with empty content.

- [ ] **Step 3: Run the full check suite**

Run:
```bash
npm run lint && npx tsc --noEmit && npx vitest run && npm run build
```

Expected: all pass. If any step fails, fix before proceeding.

- [ ] **Step 4: Commit**

```bash
git add README.md public/events/.gitkeep
git commit -m "docs(voting): README section + QR directory placeholder"
```

- [ ] **Step 5: Final verification**

Manual spot-check (~10 min, using local `.env.local` with KV + `ADMIN_TOKEN`):

1. `npm run dev`
2. Visit `/submit` on phone → submit a talk → confirm confirmation state.
3. Visit `/admin` → sign in → approve the talk in `/admin/submissions`.
4. Open `/vote` in a new incognito window → vote → confirm "recorded".
5. Reload `/vote` → confirm "already voted" state.
6. Visit `/admin/results` → confirm ranking + CSV download.

---

## Self-review checklist

Run this after completing the plan — not a subagent dispatch.

**1. Spec coverage** — map every spec section to tasks:

| Spec section | Tasks |
|---|---|
| §3 Architecture / file layout | 0.2, 1.1, 1.2, 2.1, 3.1, 4.x, 5.x, 6.x, 7.x, 8.x |
| §4.1 Event config | 0.2 |
| §4.2 KV keys (submissions, ballots, voters, rate-limit) | 2.1 |
| §5.1 `/submit` public page + validation rules | 4.2, 4.1 |
| §5.1 `/vote` public page + shuffle + already-voted state | 7.2, 1.1 |
| §5.2 `/admin` session-based gate | 5.2, 1.2 |
| §5.2 `/admin/submissions` queue | 6.2 |
| §5.2 `/admin/results` ranking + CSV | 8.2 |
| §5.3 QR codes | 9.2 (docs), `public/events/` placeholder |
| §6.1 POST /api/submissions contract | 4.1 |
| §6.2 POST /api/votes contract (idempotent, write-once, partial-drop, already-voted, selection-unavailable) | 7.1, 1.1 |
| §6.3 POST /api/admin/session | 5.1 |
| §6.4 POST /api/admin/logout | 5.1 |
| §6.5 GET/PATCH /api/admin/submissions | 6.1 |
| §6.6 GET /api/admin/results (ranking + tallyVotes filter) | 8.1, 1.1 |
| §7 Error handling / user copy | 4.2, 7.2 |
| §7 Race handling (re-read before write, tally filters) | 7.1, 1.1, 8.1 |
| §8 Unit tests (isWithinWindow, validation, canonical, tally) | 1.1 |
| §8 Unit tests (token compare, session sign/verify) | 1.2 |
| §8 Playwright smoke | 9.1 |
| §9 Env vars | 0.1, 9.2 |
| §10 Operational notes | 9.2 |

No gaps.

**2. Placeholder scan** — no `TBD`, no `TODO`, no "implement appropriate error handling" style hand-waves. Every step that writes code shows the code. Every step with a command shows the command.

**3. Type consistency** — exported names used across tasks:
- `VOTER_COOKIE` defined in Task 3.1 (`src/middleware.ts`), imported in 4.1, 7.1, 7.2 ✓
- `ADMIN_SESSION_COOKIE` defined in Task 1.2, imported in 5.1, 5.2, 6.1, 6.2, 8.1, 8.2 ✓
- `verifySession(value, nowMs)` signature matches across all call sites ✓
- `Submission`, `Ballot`, `SubmissionStatus` types defined in Task 0.2, used uniformly ✓
- `isWithinWindow(opens, closes, now)` signature stable across calls ✓
- `tallyVotes(ballots, approvedIds)` called with `Ballot[]` and `Set<string>` in 8.1 and 8.2 ✓
- `shuffleWithSeed(items, seed)` deterministic in 7.2 — seed built from voter cookie + event slug, matches spec §5.1 ✓
