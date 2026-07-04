# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

**02Ship** is a learning portal and community site for non-programmers and AI builders. It uses Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS, Supabase Auth/Postgres, Upstash Redis, and Vercel.

The product includes static learning content, member auth, dashboards, bookmarks/progress, a ships showcase, daily AI news, event pages, and a single-event lightning-talk submission/voting/admin tool.

## Commands

```bash
npm run dev          # Next.js dev server
npm run build        # Production build
npm run lint         # ESLint flat config
npm run typecheck    # Type check (no build output)
npm run test         # Vitest unit/component tests
npm run test:e2e     # Playwright e2e tests
npm run verify       # Lint, typecheck, unit tests, production build
```

After coding changes, run `npm run verify`. Run `npm run test:e2e` when the change affects routes, auth, voting, navigation, or critical user flows.

## Architecture

### Content Model

Public editorial content lives in `content/` as flat files loaded via `fs/promises` and validated with Zod schemas in `src/lib/content-schemas.ts`:

- **Courses**: `content/courses/<series-slug>/series.json` + `lesson-XX-<slug>.json`
- **Blog**: `content/blog/*.mdx` (YAML front-matter parsed with `gray-matter`)
- **News**: `content/news/YYYY-MM-DD.json` (daily curated AI news)
- **Ships**: `content/ships/*.json` (markdown content rendered with `react-markdown`)
- **Events**: `content/events/lightning-talk.json` (single active lightning-talk config)

Content loaders: `src/lib/content.ts`, `src/lib/news.ts`, `src/lib/voting.ts`.

### Data Stores

- **Supabase Auth/Postgres**: member auth, profiles, lesson progress, and bookmarks. Client/server helpers live in `src/lib/supabase/`; versioned schema and RLS policies live in `supabase/migrations/`.
- **Upstash Redis**: lightning-talk submissions, ballots, rate counters, and anonymous voter IDs. Helper: `src/lib/kv.ts`. Legacy `KV_REST_API_*` env names are still accepted, but prefer `UPSTASH_REDIS_REST_*`.

### Routing

```
/                           Homepage (hero + features + CTA)
/courses                    Series list
/courses/[series]           Series detail + lesson list
/courses/[series]/[lesson]  Lesson detail + video player
/blog                       Blog post list
/blog/[slug]                Single post (MDX rendered via next-mdx-remote)
/news                       Latest daily AI news
/news/[date]                News by date (YYYY-MM-DD)
/ships                      Project showcase
/ships/[slug]               Project detail
/dashboard                  Member dashboard
/dashboard/{courses,bookmarks,settings}
/login, /signup, /auth/callback
/submit                     Lightning-talk submission
/vote                       Lightning-talk voting
/admin                      Lightning-talk admin
/about, /community, /events, /get-involved
```

SEO: `robots.ts`, `sitemap.ts` (dynamic, includes courses, blog, news, ships), Schema.org JSON-LD in root `layout.tsx`.

### Course Data Model

Lessons support two formats — legacy (single `youtubeId` + `transcript`) and extended (multiple `videos[]` with slides + shooting guides). Key types in `src/types/course.ts`:

- `Series` → `Lesson[]` → `Video[]` (each video has `youtubeId`, `scriptOutline`, `talkingPoints`)
- Each lesson can also have `textSections`, `commonMistakes`, `exercises`, `resources`

### Video Generation Pipeline

Located in `agents/video-gen/`. Generates lesson videos from HTML slides + TTS audio:

1. Playwright screenshots HTML slides → images
2. Google Cloud TTS (or ElevenLabs) → audio per narration block
3. ffmpeg composes images + audio → MP4

Config files: `content/courses/<slug>/video-gen/configs/LXXVYY.json`

Course generation skill (`.claude/skills/generate-course/`) orchestrates the full pipeline: PDF → curriculum JSON → shooting guides → slides HTML → video configs → rendered videos.

```bash
/generate-course path/to/doc.pdf                    # new course
/generate-course path/to/doc.pdf --series slug       # append to existing
```

Requires: `GOOGLE_TTS_API_KEY` in `.env.local`, `ffmpeg`/`ffprobe` on PATH, Playwright in `agents/video-gen/`.

## Conventions

- Named exports only, no default exports
- Components organized: `src/components/{ui,layout,courses}/`
- Styling: Tailwind only (no inline styles), use `cn()` from `src/lib/utils.ts` for conditional classes
- Mobile-first and accessible by default. Dark mode is not currently implemented.
- YouTube: use `youtubeId` field on Video type, never full URLs
- Path alias: `@/*` maps to `./src/*`

## Key References

- Types: `src/types/course.ts`, `src/types/blog.ts`, `src/types/news.ts`, `src/types/voting.ts`, `src/types/database.generated.ts`
- Content loaders: `src/lib/content.ts`, `src/lib/news.ts`
- Content schemas: `src/lib/content-schemas.ts`
- Auth helpers: `src/lib/auth.ts`, `src/lib/supabase/*`
- Voting/admin helpers: `src/lib/voting.ts`, `src/lib/admin.ts`, `src/lib/kv.ts`
- Utility: `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- Theme config: `tailwind.config.ts` (CSS variable-based colors, typography plugin)
- Root layout: `src/app/layout.tsx` (metadata, optional GA, JSON-LD)
- Request proxy: `src/proxy.ts` (Supabase session refresh and anonymous voter cookie seeding)
- Video renderer: `agents/video-gen/generate-lesson-video.mjs`

## Agent skills

### Issue tracker

Issues and PRDs are tracked in GitHub Issues using the `gh` CLI; external PRs are not a triage surface. See `docs/agents/issue-tracker.md`.

### Triage labels

This repo uses the default mattpocock/skills triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

This repo uses a single-context domain docs layout. See `docs/agents/domain.md`.

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
