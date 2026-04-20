# Design — Community Lightning Talk Voting

**Status:** Draft — revised after architecture review  
**Date:** 2026-04-19  
**Source PRD:** `docs/community-lightning-talk-voting-prd.md`

## 1. Goal

Ship a mobile-first, QR-driven lightning-talk submission and voting tool inside the existing 02ship.com Next.js app. MVP is a single deployed event with config in the repo, no full auth framework, and mutable state stored in Vercel KV via `@vercel/kv`.

## 2. Non-goals

- Multi-event support
- Runtime event-settings UI
- Full admin dashboard UI with filters, bulk actions, or inline copy editing
- Voter search / filter / sort controls
- Vote editing after submission
- Speaker submission editing
- Public live vote counts
- Public in-app results page
- Runtime QR code generation
- Account system or OAuth
- Comment system, speaker profiles, gamification, or leaderboards

## 3. Architecture

A single-event voting feature added to the existing Next.js 14 / Vercel app. Event metadata is a JSON file committed to the repo. Mutable submission and ballot data lives in Vercel KV.

```
content/events/lightning-talk.json       # event config
src/types/event.ts                       # typed event config
src/app/submit/page.tsx                  # QR 1 target
src/app/vote/page.tsx                    # QR 2 target
src/app/admin/page.tsx                   # token form / landing
src/app/admin/submissions/page.tsx       # moderation queue
src/app/admin/results/page.tsx           # ranked tally
src/app/api/submissions/route.ts         # POST new submission
src/app/api/votes/route.ts               # POST ballot
src/app/api/admin/session/route.ts       # POST admin token -> session cookie
src/app/api/admin/logout/route.ts        # POST clear admin session
src/app/api/admin/submissions/route.ts   # GET/PATCH submissions
src/app/api/admin/results/route.ts       # GET ranked results
src/lib/voting.ts                        # KV access, validators, tally, shuffle helpers
src/lib/admin.ts                         # token compare + signed session cookie helpers
src/middleware.ts                        # best-effort zts_voter cookie seeding
public/events/lightning-talk-qr-submit.png
public/events/lightning-talk-qr-vote.png
```

Add `@vercel/kv` to the app dependencies. No separate backend service.

**End-to-end flow**
1. Organizer edits `content/events/lightning-talk.json` and deploys.
2. Speaker scans QR 1, opens `/submit`, and POSTs `/api/submissions`. Server writes `submission:<id>` with `status: "pending"`.
3. Organizer opens `/admin`, submits the admin token once, receives a signed session cookie, and approves or rejects submissions from `/admin/submissions`.
4. Voter scans QR 2, opens `/vote`, sees approved talks in neutral order, selects up to `voteLimit`, and POSTs `/api/votes`. Server writes a single ballot for that voter cookie.
5. Organizer watches `/admin/results`, exports CSV, and announces the final agenda outside the app.

**Locked design choices**
- Vercel KV is the only write store.
- Event config is git-versioned. Changing submission window, voting window, vote limit, or contact rule requires redeploy.
- Anonymous voter identity uses an `httpOnly`, `SameSite=Lax` UUID cookie named `zts_voter`. Middleware seeds it best-effort on public paths, but pages and APIs must tolerate the cookie being missing on the first render.
- Public voters never see vote counts. Approved cards are shown in neutral order; when `zts_voter` exists, order is deterministically shuffled from that seed for that browser.
- Admin access uses a signed `httpOnly` session cookie (`zts_admin`) issued by `/api/admin/session`. No admin secret appears in the URL.
- Submission anti-spam is browser-scoped with a 24-hour counter.
- Ballots are write-once per voter cookie. Retrying the same ballot is idempotent; trying to change it after submission is rejected.
- All pages and handlers that depend on current time, cookies, or KV use dynamic rendering and `no-store` fetch semantics. This feature must not be statically optimized.

## 4. Data model

### 4.1 Event config

`content/events/lightning-talk.json`:

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

Typed by `src/types/event.ts` and loaded through `getEventConfig()` in `src/lib/voting.ts`.

### 4.2 Vercel KV keys

| Key | Value shape | Purpose |
|---|---|---|
| `submission:<uuid>` | `{ id, event, speakerName, handle?, contact?, title, intro, tag?, status, createdAt }` | One submission. `status ∈ "pending" \| "approved" \| "rejected"`. |
| `submissions:set:<event>` | Redis set of submission IDs | Enumerate submissions without race-prone array appends. |
| `vote:<event>:<voterUuid>` | `{ submissionIds: string[]; submittedAt: string }` | One immutable ballot per voter cookie. |
| `voters:set:<event>` | Redis set of voter UUIDs | Stable `totalVoters` count with `SCARD`. |
| `submit-rate:<event>:<cookieUuid>` | `number`, TTL 86400s | Submission counter per browser in a rolling 24-hour window. |

**Rationale**
- Per-submission keys keep moderation updates atomic.
- Redis sets avoid lost updates and duplicate IDs that would happen with read-modify-write array indexes.
- One ballot key per voter preserves write-once semantics while still allowing idempotent retries.
- Vote counts are always derived by `tallyVotes()`, so no aggregate counters can drift.

## 5. Routes and pages

### 5.1 Public pages

- **`/submit`**  
  Server component that reads event config and renders `<SubmissionForm />`. Required fields: `speakerName`, `title`, `intro`, `consent`. `handle` and `contact` are individually optional but at least one must be present. `title` max 80 chars, `intro` max 500 chars. Top copy includes event name and submission close time. Outside the window, the page remains viewable but the form is disabled and shows "Submissions are closed."

- **`/vote`**  
  Server component that reads approved submissions plus the current ballot, if one exists. If the voter has already submitted a ballot, render a read-only confirmation state instead of the selection UI. Otherwise render `<VoteClient />`, which shows approved talks with no counts and lets the voter toggle up to `voteLimit` selections. The display order is seeded from `zts_voter` when available; if the first render has no cookie yet, use a request-scoped fallback seed and accept that a first refresh may reshuffle.

### 5.2 Admin pages

Admin pages are protected by a signed `zts_admin` cookie. They never accept the admin token via query string.

- **`/admin`**  
  If no valid admin session cookie exists, render a token-entry form that `POST`s to `/api/admin/session`. On success, redirect to `/admin/submissions`. If a session exists, render links to the submissions queue and results page plus a sign-out button.

- **`/admin/submissions`**  
  Protected server component. Table grouped by status with pending first. Each row shows title, speaker, reachable contact, intro preview, tag, and actions: Approve, Reject, Reset to pending. Header includes per-status counts and a read-only summary of the configured submission window, voting window, and vote limit.

- **`/admin/results`**  
  Protected server component. Ranked table with rank, title, speaker, reachable contact, vote count, tag, and status. While voting is open, show the close timestamp; after close, show "Final ranking." "Download CSV" builds a client-side export from data already on the page, including contact info even if that column is visually collapsed on mobile.

### 5.3 QR codes

Generated once from the production URLs:

- `https://02ship.com/submit`
- `https://02ship.com/vote`

Saved as static PNGs in `public/events/`. No runtime generation, no in-app QR management screen.

## 6. API endpoints

All routes live under `src/app/api/`. Most business logic stays in `src/lib/voting.ts` and `src/lib/admin.ts`; route handlers remain thin.

### 6.1 `POST /api/submissions`

**Request body**
```ts
{
  speakerName: string;
  handle?: string;
  contact?: string;
  title: string;
  intro: string;
  tag?: string;
  consent: boolean;
}
```

**Validations**
- `event.submissionOpensAt <= now < event.submissionClosesAt`
- `speakerName`, `title`, and `intro` are non-empty after trim
- `title.length <= 80`
- `intro.length <= 500`
- At least one of `handle` or `contact` is non-empty after trim
- `consent === true`
- `zts_voter` cookie exists
- `submit-rate:<event>:<cookieUuid>` is below `event.submissionRateLimitPerCookie24h`

**Side effects**
1. Read `zts_voter`.
2. Generate `id = crypto.randomUUID()`.
3. `SET submission:<id>` with `status: "pending"` and `createdAt`.
4. `SADD submissions:set:<event> <id>`.
5. `INCR submit-rate:<event>:<cookieUuid>` and set TTL to 86400 seconds on the first hit.

**Responses**
- `200 { ok: true, id }`
- `400 { ok: false, error: "validation" | "closed" | "cookies-required" }`
- `429 { ok: false, error: "rate-limited" }`

### 6.2 `POST /api/votes`

**Request body**
```ts
{ submissionIds: string[] }
```

**Validations**
- `zts_voter` cookie exists
- `event.votingOpensAt <= now < event.votingClosesAt`
- `submissionIds.length` is in `[1, voteLimit]`
- No duplicates within `submissionIds`
- Every ID currently exists and is `approved` during the initial validation pass
- If `vote:<event>:<voterUuid>` already exists:
  - same canonical submission set => treat as idempotent retry
  - different canonical submission set => reject as `already-voted`

**Side effects**
1. Re-read the selected submissions immediately before writing.
2. Keep only IDs that are still `approved`.
3. If zero selections remain, return `409 selection-unavailable`.
4. `SET vote:<event>:<voterUuid>` to `{ submissionIds: approvedIds, submittedAt: nowIso }`.
5. `SADD voters:set:<event> <voterUuid>`.

**Responses**
- `200 { ok: true, recorded: number, dropped?: number, alreadyRecorded?: true }`
- `400 { ok: false, error: "validation" | "closed" | "cookies-required" | "unknown-submission" }`
- `409 { ok: false, error: "already-voted" | "selection-unavailable" }`

### 6.3 `POST /api/admin/session`

**Request body**
```ts
{ token: string }
```

**Behavior**
- Compare the submitted token with `ADMIN_TOKEN` using a constant-time helper.
- On success, set signed `httpOnly`, `secure`, `SameSite=Lax` cookie `zts_admin`.
- Default session lifetime: 8 hours.

**Responses**
- `204` on success
- `401` on invalid token

### 6.4 `POST /api/admin/logout`

Clears `zts_admin` and redirects or returns `204`.

### 6.5 `GET | PATCH /api/admin/submissions`

Auth: valid `zts_admin` cookie required.

- `GET /api/admin/submissions?status=pending|approved|rejected|all`  
  Returns `{ submissions: Submission[] }`
- `PATCH /api/admin/submissions?id=<uuid>` with body `{ status: "approved" | "rejected" | "pending" }`  
  Returns `{ ok: true }`
- `401` on missing or invalid admin session

### 6.6 `GET /api/admin/results`

Auth: valid `zts_admin` cookie required.

**Response**
```ts
{
  totalVoters: number;
  totalVotes: number;
  results: Array<{
    id: string;
    title: string;
    speakerName: string;
    handle?: string;
    contact?: string;
    tag?: string;
    status: "pending" | "approved" | "rejected";
    voteCount: number;
    rank: number;
  }>;
}
```

Sorted by `voteCount` descending. Ties share rank: `1, 1, 3`.
Only currently approved submissions contribute to `voteCount`; pending and rejected rows remain visible to admins for context.

## 7. Error handling and edge cases

**User-facing failures**
- Submission outside window => "Submissions are closed."
- Missing reachable contact => "Add a public handle or contact info so organizers can reach you."
- Submission rate-limited => "You've reached the limit of 3 submissions from this browser in 24 hours."
- Missing cookie => "Please enable cookies and reload before submitting or voting."
- Voting not open or already closed => show the approved talk list, disable submit controls, and display the relevant timestamp.
- `already-voted` => "This browser has already submitted a ballot."
- `selection-unavailable` => "Your selected talks changed while you were voting. Refresh and try again."
- Partial drop (`dropped > 0`) => "Vote recorded, but some selections were no longer available."

**Admin failures**
- Missing or invalid admin session => redirect to `/admin`.
- KV unavailable => render "Service temporarily unavailable, please retry." No silent retry loops.

**Race conditions we accept**
- Two submissions or votes arriving at once => different primary keys; KV sets avoid index append races.
- Two admin tabs changing the same submission => last write wins.
- A talk changes out of `approved` while a voter is submitting => the server filters to currently approved selections right before writing, and `tallyVotes()` also ignores any non-approved submissions.
- The same ballot is retried after a network hiccup => idempotent success if the submission set matches.

**Explicit non-guards**
- Clearing cookies to vote twice. Accepted trade-off for cookie-only identity in MVP.
- Any runtime change to event windows or vote limit without redeploy. Not supported.

## 8. Testing

Keep the test surface small, but do not skip the integration points that are easiest to break.

1. **Unit tests** in `src/lib/__tests__/voting.test.ts` for:
   - `isWithinWindow(opens, closes, now)`
   - ballot validation
   - canonical ballot comparison
   - `tallyVotes(ballots, submissions)` including non-approved-submission filtering
2. **Unit tests** in `src/lib/__tests__/admin.test.ts` for:
   - token comparison helper
   - admin session cookie signing / verification
3. **One Playwright smoke spec** in `e2e/lightning-talk-voting.spec.ts` covering:
   - submit a talk
   - approve it through admin session flow
   - cast a ballot once
   - verify the ballot cannot be changed
   - verify the approved talk appears in admin results

## 9. Environment variables

| Var | Purpose | Where |
|---|---|---|
| `KV_REST_API_URL` | Vercel KV | Vercel project env |
| `KV_REST_API_TOKEN` | Vercel KV | Vercel project env |
| `ADMIN_TOKEN` | Admin login token and admin-session signing secret | Vercel project env |

## 10. Operational notes

- Add `@vercel/kv` before implementation. The current repo does not include it yet.
- Set a strong random `ADMIN_TOKEN` before launch.
- Provision and link Vercel KV before the first write.
- Because event config is repo-backed, any change to windows, vote limit, or contact rule requires redeploy.
- Regenerate QR codes if the production domain changes.
- After the event, keep `content/events/lightning-talk.json` as an archive and purge KV data with a one-off script if desired.
