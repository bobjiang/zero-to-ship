# LEARNINGS

A running log of errors, their root causes, fixes, and prevention.

---

## 2026-05-21 — `tsc --noEmit` fails after deleting an App Router route

- **Error:** `npm run lint && npx tsc --noEmit && npm run build` failed at the `tsc`
  step with `TS2307: Cannot find module '../../../../src/app/ship-weeks/page.js'`
  pointing at `.next/types/app/ship-weeks/page.ts`.
- **Root cause:** Next.js generates per-route type files under `.next/types/`. Deleting
  a route's source (`src/app/ship-weeks/`) does **not** remove the stale generated type
  file. Because the check suite chains with `&&`, `tsc` ran against the stale `.next`
  from a previous build before `next build` had a chance to regenerate it.
- **Fix:** Regenerate `.next` first — `rm -rf .next && npm run build`, then `npx tsc
  --noEmit` passes clean. (`next build` prunes the stale generated types.)
- **Prevention:** After deleting or renaming any `src/app/**` route, run `npm run build`
  *before* a standalone `npx tsc --noEmit`, or clear `.next` first. The build's own
  type-check is the authoritative gate after route changes.
