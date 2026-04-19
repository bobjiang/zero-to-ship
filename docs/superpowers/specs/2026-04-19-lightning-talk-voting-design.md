# Design — Community Lightning Talk Voting

**Status:** Draft — pending user review
**Date:** 2026-04-19
**Source PRD:** `docs/community-lightning-talk-voting-prd.md`

## 1. Goal

Ship a mobile-first, QR-driven lightning-talk submission and voting tool on top of the existing 02ship.com Next.js app, with no database and no auth framework. Stores data in Vercel KV. Scoped to a single hardcoded event.

## 2. Non-goals (explicit cuts from the PRD)

- Multi-event support
- Full admin dashboard UI with filters and bulk actions (replaced by a minimal token-gated table)
- Account system or OAuth (Discord, wallet, magic link)
- Voter search/filter on the voting page
- Voter vote editing
- Speaker submission editing
- Comment system, speaker profiles, gamification, leaderboards
- Runtime QR code generation
- Live public vote counts

## 3. Architecture

A single-event, mobile-first voting feature bolted onto the existing Next.js 14 / Vercel app. Write store is **Vercel KV**; event metadata is a JSON file committed to the repo.

```
content/events/lightning-talk.json       # event config
src/app/submit/page.tsx                  # QR 1 target
src/app/vote/page.tsx                    # QR 2 target
src/app/admin/page.tsx                   # landing (token prompt)
src/app/admin/submissions/page.tsx       # moderation queue
src/app/admin/results/page.tsx           # ranked tally
src/app/api/submissions/route.ts         # POST new submission
src/app/api/votes/route.ts               # POST ballot
src/app/api/admin/submissions/route.ts   # GET/PATCH (token)
src/app/api/admin/results/route.ts       # GET (token)
src/lib/voting.ts                        # KV + cookie helpers, tallyVotes
src/lib/admin.ts                         # timing-safe token check
src/middleware.ts                        # sets zts_voter cookie if missing
public/events/lightning-talk-qr-submit.png
public/events/lightning-talk-qr-vote.png
```

**End-to-end flow:**
1. Organizer edits `content/events/lightning-talk.json` and deploys.
2. Speaker scans QR 1 → `/submit` → POST `/api/submissions` → KV `submission:<id>` with `status: pending`.
3. Organizer visits `/admin/submissions?token=...` → PATCH `/api/admin/submissions?id=<id>` → status → `approved`.
4. Voter scans QR 2 → `/vote` → sees approved submissions in per-session-randomized order, no counts → selects up to `voteLimit` → POST `/api/votes` → KV `vote:<event>:<voterUuid>` = ballot.
5. Organizer watches `/admin/results?token=...`. After `votingClosesAt`, publishes final list.

**Design choices (locked in during brainstorming):**
- Vercel KV is the only write store.
- Event config committed to the repo (git-versioned). Redeploy to change.
- Anonymous voter identity via `httpOnly`, `SameSite=Lax` UUID cookie `zts_voter`, set by Next.js middleware on first request to any `/submit`, `/vote`, or `/api/{submissions,votes}` path. This guarantees the cookie exists before any page renders or any API handler runs, avoiding a race between the cookie-seeded shuffle and a cookieless first visit.
- Organizer-only vote-count visibility to avoid popularity bias; voter sees cards in a per-session-randomized order seeded from the cookie.
- Admin endpoints gated by `ADMIN_TOKEN` env var compared with `crypto.timingSafeEqual`.
- Submission anti-spam: same cookie keys a 24h rate-limit counter, cap 3 submissions per browser.

## 4. Data model

### 4.1 Event config (repo file)

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
  "submissionLimitPerCookie": 3
}
```

Typed by a new `src/types/event.ts`. Loaded via `getEventConfig()` in `src/lib/voting.ts`.

### 4.2 Vercel KV keys

| Key | Value shape | Purpose |
|---|---|---|
| `submission:<uuid>` | `{ id, event, speakerName, handle?, contact?, title, intro, tag?, status, createdAt }` | One submission. `status ∈ "pending" \| "approved" \| "rejected"`. |
| `submissions:index:<event>` | `string[]` of submission IDs | Cheap iteration; append-only. |
| `vote:<event>:<voterUuid>` | `string[]` of submission IDs, length ≤ `voteLimit` | Full ballot per voter. Overwrite is allowed (idempotent). |
| `voters:index:<event>` | `string[]` of voter UUIDs | For `totalVoters` in results. |
| `submit-rate:<cookieUuid>` | `number`, TTL 86400s | Submission counter per browser, 24h window. |

**Rationale:**
- Per-submission keys make status updates atomic single `SET`s.
- Index keys work around KV's lack of `SCAN`.
- Per-voter ballot key: one write per voter, idempotent overwrite, trivial future "edit before close".
- No aggregated counters stored — `tallyVotes()` always computes — so counts can't drift.

## 5. Routes and pages

### 5.1 Public pages

- **`/submit`** — Server reads event config, renders `<SubmissionForm />` client component. Fields: `speakerName` (required), `handle` (optional), `contact` (optional), `title` (≤ 80 chars, required), `intro` (≤ 500 chars, required), `tag` (optional), `consent` (required checkbox). Top copy: "Submit a 5-minute talk idea" + event name + close time. Banner "Submissions are closed" when `now` is outside the submission window. On success, page state switches to "Thanks, your submission is under review."
- **`/vote`** — Server fetches approved submissions from KV, shuffles with a seed stored in the voter cookie (so refresh keeps the same order for that voter), renders `<VoteClient />`. Voter taps up to `voteLimit` cards to toggle selection. "Submit vote" button POSTs ballot. After success, page state switches to confirmation with share CTAs. Banner "Voting is closed" outside window. No vote counts visible anywhere.

### 5.2 Admin pages (token-gated)

All admin pages are server components that read `?token=` from the URL and compare it with `ADMIN_TOKEN` via `crypto.timingSafeEqual`. If missing or wrong, the page renders a "paste your token" form that GETs back to the same path with `?token=<input>`. Token stays in the URL on every navigation (admin bookmarks include it). Server components pass `token` as a prop to any client component that needs to issue mutations; those components include it in the `x-admin-token` header on `fetch`. No `sessionStorage`, no cookie, no client-side persistence of the token.

- **`/admin`** — Landing. On valid token, renders links to `/admin/submissions?token=...` and `/admin/results?token=...`.
- **`/admin/submissions`** — Moderation queue. Table grouped by status (pending first). Each row: title, speaker, intro preview, tag, Approve / Reject / Reset-to-pending buttons. Buttons live in a client component that receives `token` as a prop and PATCHes `/api/admin/submissions?id=<id>` with `x-admin-token`. Header shows total submissions per status plus `totalVoters` and `totalVotes` snapshot (fetched server-side).
- **`/admin/results`** — Ranked results table: rank (ties share), title, speaker, vote count, tag, status. "Voting closes in Xh" while open; "Final results" after close. "Download CSV" button generates a CSV client-side from data already on the page.

### 5.3 QR codes

Not a page. Generated once via any external QR generator from the full absolute URLs:

- `https://02ship.com/submit`
- `https://02ship.com/vote`

Saved as PNGs in `public/events/` and linked from a private Notion/doc. No runtime generation.

## 6. API endpoints

All under `src/app/api/`. JSON in, JSON out. Most logic lives in `src/lib/voting.ts`; routes are thin.

### 6.1 `POST /api/submissions`

**Request body**
```ts
{ speakerName: string; handle?: string; contact?: string;
  title: string; intro: string; tag?: string; consent: boolean }
```

**Validations (server-side, all enforced):**
- `event.submissionOpensAt <= now < event.submissionClosesAt`
- `title.length` in `[1, 80]`
- `intro.length` in `[1, 500]`
- `consent === true`
- `submit-rate:<cookieUuid>` < `event.submissionLimitPerCookie`

**Side effects (ordered):**
1. Read `zts_voter` cookie (guaranteed set by middleware).
2. `id = crypto.randomUUID()`.
3. `SET submission:<id>` with `status: "pending"`, `createdAt: nowIso`.
4. Append `id` to `submissions:index:<event>`.
5. `INCR submit-rate:<cookieUuid>` and `EXPIRE 86400` on first hit.

**Responses**
- `200 { ok: true, id }`
- `400 { ok: false, error: "validation" | "closed" | "rate-limited" }`

### 6.2 `POST /api/votes`

**Request body**
```ts
{ submissionIds: string[] }  // length 1..voteLimit
```

**Validations:**
- `event.votingOpensAt <= now < event.votingClosesAt`
- `submissionIds.length` in `[1, voteLimit]`
- No duplicates within the array.
- Every id exists in KV AND `submission.status === "approved"`. Unknown or non-approved IDs: return `unknown-submission` (we do NOT silently drop in the normal vote path; see §7 for the post-hoc rejection edge case).

**Side effects (ordered):**
1. Read `zts_voter` cookie (guaranteed set by middleware).
2. `SET vote:<event>:<voterUuid>` = `submissionIds`.
3. Add `voterUuid` to `voters:index:<event>` if new.

**Responses**
- `200 { ok: true, recorded: submissionIds.length }`
- `400 { ok: false, error: "validation" | "closed" | "unknown-submission" }`

### 6.3 `GET|PATCH /api/admin/submissions`

Auth: header `x-admin-token` compared with `ADMIN_TOKEN` env var using `crypto.timingSafeEqual`.

- `GET /api/admin/submissions?status=pending|approved|rejected|all` → `{ submissions: Submission[] }`
- `PATCH /api/admin/submissions?id=<uuid>` with body `{ status: "approved" | "rejected" | "pending" }` → `{ ok: true }`
- `401` on missing/wrong token.

### 6.4 `GET /api/admin/results`

Auth: same.

**Response**
```ts
{
  totalVoters: number,
  totalVotes: number,
  results: Array<{
    id: string, title: string, speakerName: string,
    handle?: string, tag?: string, status: Status,
    voteCount: number, rank: number
  }>
}
```

Sorted by `voteCount` desc; ties share rank (1, 1, 3, ...).

## 7. Error handling and edge cases

**User-facing failures** (inline banner, never throw):
- Submission outside window → "Submissions are closed" with close time.
- Voting outside window → "Voting is closed. Results will be announced soon."
- Submission rate-limited → "You've reached the limit of 3 submissions from this browser."
- Cookies disabled → form POST fails because we can't identify the voter; show "Please enable cookies to vote" with a retry button.

**Post-hoc rejection edge case** (organizer rejects a talk while a voter is choosing):
- Server-side when saving the ballot: filter `submissionIds` to only those currently `approved`, persist the filtered array.
- If anything was filtered, respond `200 { ok: true, recorded: N, dropped: M }`; client shows "Vote recorded (N of N+M counted — some selections were no longer available)."
- This is the ONE case where we silently drop IDs; the normal-path validation in §6.2 still rejects IDs that were never approved.

**Admin failures:**
- Wrong/missing token → 401; admin pages render the "paste token" form.
- KV unavailable → error boundary renders "Service temporarily unavailable, please retry." No auto-retry.

**Race conditions we accept without locking:**
- Two voters submit simultaneously → different keys, no lock needed.
- Two admin tabs approve the same submission → last write wins.
- Voter voted, admin later rejects a talk on their ballot → ballot key still contains the rejected ID, but `tallyVotes()` filters by `submission.status === "approved"`, so counts stay correct without rewriting ballots.

**Explicit non-guards:**
- Abuser clearing cookies to vote twice — accepted cost of cookie-only identity.
- Replay of a submitted ballot via curl — same voterUuid = same key = idempotent overwrite.

## 8. Testing

Intentionally lightweight for a short-lived, single-event tool.

1. **Unit tests** at `src/lib/__tests__/voting.test.ts` (Vitest, matching existing setup) for pure functions:
   - `isWithinWindow(opens, closes, now)`
   - `tallyVotes(ballots, submissions)` — including the "rejected submission on ballot" case
   - Ballot-shape validator (length, duplicates, unknown IDs)
2. **Smoke script** at `scripts/smoke-voting.mjs` against a local dev server + scratch KV namespace: submit 3 talks → approve 2 via admin API → cast 2 ballots → fetch results, assert counts and rank order.
3. **No E2E browser tests.** Two forms and a table; manual QA on a real phone for 10 minutes before the event is cheaper and higher-signal than Playwright here.

## 9. Environment variables

| Var | Purpose | Where |
|---|---|---|
| `KV_REST_API_URL` | Vercel KV | Vercel project env (auto-set when KV linked) |
| `KV_REST_API_TOKEN` | Vercel KV | Vercel project env (auto-set when KV linked) |
| `ADMIN_TOKEN` | Moderator auth | Set manually in Vercel project env; share out-of-band |

## 10. Open operational notes

- The organizer needs a strong random `ADMIN_TOKEN` (e.g., 32 bytes base64) set before launch.
- KV must be provisioned and linked to the Vercel project before the first write.
- QR codes need to be regenerated if the production domain changes.
- After the event, `content/events/lightning-talk.json` can stay in the repo as an archived record; KV data can be purged with a one-off `scripts/purge-event.mjs` if desired.
