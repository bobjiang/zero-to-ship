# CLAUDE.md

## What This Is

**02Ship** — learning portal for non-programmers to build/ship ideas with AI coding tools. Next.js 14 (App Router), TypeScript strict, Tailwind CSS, Vercel. Content is static JSON (courses) + MDX (blog), no database or auth yet.

## Key References

- Types: `src/types/course.ts`, `src/types/blog.ts`
- Content loader: `src/lib/content.ts`
- Utility: `src/lib/utils.ts` — `cn()` for conditional Tailwind classes
- Course content: `content/courses/[series-slug]/` — `series.json` + `lesson-XX-slug.json`
- Blog content: `content/blog/*.mdx`
- Video renderer: `agents/video-gen/generate-lesson-video.mjs` (Gemini TTS + ffmpeg)
- Course generation skill: `.claude/skills/generate-course/`

## Conventions

- Named exports, no default exports
- Components: `src/components/{ui,layout,courses}/`
- Tailwind theme: `tailwind.config.ts`, dark mode (class-based), mobile-first, WCAG 2.1 AA
- YouTube: use `youtubeId` field, never full URLs
- Lessons support multiple videos, each with slides (`.html`) and shooting guides (`.md`)

## Course Generation

```bash
/generate-course path/to/doc.pdf                    # new course
/generate-course path/to/doc.pdf --series slug       # append to existing
```

Requires: `GOOGLE_TTS_API_KEY` in `.env.local`, `ffmpeg`/`ffprobe` on PATH, Playwright in `agents/video-gen/`.

## Commands

`npm run dev` | `npm run build` | `npm run lint` | `npx tsc --noEmit`
