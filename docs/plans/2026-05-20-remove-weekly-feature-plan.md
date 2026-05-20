# Plan — Remove `/weekly` feature

Date: 2026-05-20
Author: Bob Jiang
Status: pending approval

## Goal

Fully remove the `/weekly` feature (Weekly Anthropic & Claude digest) from the 02Ship site. Preserve SEO value of existing inbound links by 301-redirecting `/weekly` URLs to `/news`.

## Decisions confirmed

- **Redirects:** `/weekly` and `/weekly/:week` → 301 → `/news`.
- **Blog post:** delete `content/blog/weekly-anthropic-claude-updates.mdx`. Add 301 redirect to `/news`.
- **Data files:** delete all seven JSON files in `content/weekly/`.

---

## Step 1 — Delete route files

```
src/app/weekly/page.tsx
src/app/weekly/[week]/page.tsx
src/app/weekly/[week]/opengraph-image.tsx
src/app/weekly/                       (directory)
```

## Step 2 — Delete content data

```
content/weekly/2026-04-08.json
content/weekly/2026-04-14.json
content/weekly/2026-04-21.json
content/weekly/2026-04-28.json
content/weekly/2026-05-05.json
content/weekly/2026-05-12.json
content/weekly/2026-05-19.json
content/weekly/                       (directory)
```

## Step 3 — Delete library, types, tests, and scripts

```
src/lib/weekly.ts
src/lib/__tests__/weekly.test.ts
src/types/weekly.ts
scripts/generate-weekly.mjs
scripts/post-telegram-weekly.mjs
```

## Step 4 — Delete the related blog post

```
content/blog/weekly-anthropic-claude-updates.mdx
```

## Step 5 — Update cross-references

### `src/components/layout/Header.tsx`
- Remove line 11: `{ label: 'Weekly', href: '/weekly' },`

### `src/components/layout/Footer.tsx`
- Remove the Weekly Updates link block (lines ~62–64).

### `src/app/sitemap.ts`
- Remove `import { getAllWeeks } from '@/lib/weekly';`
- Remove the `/weekly` static entry (line ~35).
- Remove the `weeklyPages` dynamic map (lines ~107–114) and from the final return array.
- **Keep** every `changeFrequency: 'weekly'` — that field is the crawl-frequency hint, unrelated to the feature.

### `src/app/about/page.tsx`
- Lines 157 and 178: drop "weekly" from the offerings prose (likely just removing "and weekly updates" or similar).

### `src/app/community/page.tsx`
- Remove the "Weekly Updates" card/section (around lines 92–95).
- Update the meta description on line 59 to drop "weekly".
- Update the FAQ answer on line 127 to drop "weekly updates".

### `CLAUDE.md`
- Remove any reference to weekly content in the routing or content-model description.

## Step 6 — Add redirects in `next.config.*`

Find the existing config file (likely `next.config.js`, `.mjs`, or `.ts`). If a `redirects()` async function already exists, append entries; if not, add one.

```js
async redirects() {
  return [
    { source: '/weekly', destination: '/news', permanent: true },
    { source: '/weekly/:week', destination: '/news', permanent: true },
    {
      source: '/blog/weekly-anthropic-claude-updates',
      destination: '/news',
      permanent: true,
    },
  ];
}
```

If `next.config.*` does not exist, create `next.config.mjs` with the minimum config plus this `redirects()`.

## Step 7 — Spot-check incidental mentions (skip if irrelevant)

These files mention "weekly" but most are unrelated (e.g., course copy talking about weekly cadence). Do **not** blanket-edit; open each and only change wording that specifically refers to the deleted feature:

```
content/news/2026-03-28.json
content/courses/claude-basics/lesson-02-prompting-fundamentals.json
content/courses/claude-basics/lesson-02-video-02-shooting-guide.md
content/courses/claude-basics/lesson-02-video-03-shooting-guide.md
content/courses/claude-basics/lesson-07-building-mvp.json
content/courses/claude-basics/video-gen/configs/L02V02.json
content/courses/claude-basics/video-gen/configs/L02V03.json
content/courses/agent-skills/lesson-01-what-are-agent-skills.json
```

## Step 8 — Historical planning docs (leave alone)

```
docs/plans/2026-04-02-weekly-anthropic-updates-plan.md
docs/plans/2026-04-02-weekly-anthropic-updates-design.md
```

These document past decisions. Keeping them on disk is fine.

## Step 9 — Verify

```
npm run lint
npx tsc --noEmit
npm run build
```

All three must pass. The build will surface any straggler imports of the deleted `weekly` module.

After build passes, dev-run a quick smoke check:
- `/weekly` → 308/301 to `/news`
- `/weekly/2026-04-28` → 308/301 to `/news`
- Header and Footer no longer show "Weekly" links
- `/about` and `/community` pages render without missing-content errors
- `/sitemap.xml` no longer contains `/weekly/*` URLs

## Step 10 — Commit and PR

- Branch: `chore/remove-weekly-feature`
- Commit: `chore: remove /weekly feature and redirect to /news`
- PR title: `chore: remove /weekly feature`
- PR body: link to this plan, list redirects added, list of deleted paths.

## Rollback notes

All deletions are recoverable from git history. The redirects are additive only. To roll back, revert the merge commit and the redirects come out with it.
