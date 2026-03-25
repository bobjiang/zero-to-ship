# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

**02Ship** — learning portal for non-programmers to build/ship ideas with AI coding tools. Next.js 14 (App Router), TypeScript strict, Tailwind CSS, deployed on Vercel. No database or auth — content is static JSON (courses, news) + MDX (blog).

## Commands

```bash
npm run dev          # Next.js dev server
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # Type check (no build output)
```

After coding changes, run the full check suite: `npm run lint && npx tsc --noEmit && npm run build`

## Architecture

### Content Model (no database)

All content lives in `content/` as flat files loaded via `fs/promises` at request time:

- **Courses**: `content/courses/<series-slug>/series.json` + `lesson-XX-<slug>.json`
- **Blog**: `content/blog/*.mdx` (YAML front-matter parsed with `gray-matter`)
- **News**: `content/news/YYYY-MM-DD.json` (daily curated AI news)

Content loaders: `src/lib/content.ts` (courses + blog), `src/lib/news.ts` (news)

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
/about, /services           Static pages
/community, /events         Placeholder pages
```

SEO: `robots.ts`, `sitemap.ts` (dynamic — includes all courses, blog, news), Schema.org JSON-LD in root `layout.tsx`.

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
- Dark mode: class-based, mobile-first, WCAG 2.1 AA target
- YouTube: use `youtubeId` field on Video type, never full URLs
- Path alias: `@/*` maps to `./src/*`

## Key References

- Types: `src/types/course.ts`, `src/types/blog.ts`, `src/types/news.ts`
- Content loaders: `src/lib/content.ts`, `src/lib/news.ts`
- Utility: `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- Theme config: `tailwind.config.ts` (CSS variable-based colors, typography plugin)
- Root layout: `src/app/layout.tsx` (metadata, GA, JSON-LD)
- Video renderer: `agents/video-gen/generate-lesson-video.mjs`
