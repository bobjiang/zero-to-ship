# CLAUDE.md

## What This Is

**02Ship** — learning portal for non-programmers to build/ship ideas with AI coding tools. Next.js 14 (App Router), TypeScript strict, Tailwind CSS, Vercel. Content is static JSON (courses) + MDX (blog), no database or auth yet.

## Consistency & Conflict Prevention

**Before coding:**
1. Read related files, imports, and types first. Match existing patterns.
2. Check for duplicate names, conflicting types, circular deps, inconsistent patterns.

**During coding:**
3. One pattern per concern — don't introduce alternatives without approval.
4. Check imports after every edit. Follow sibling file conventions.

**After coding:**
5. Run the full check suite (lint, type-check, build).
6. Log any conflicts in `CONFLICTS.md` with date, files, and resolution.

## Self-Learning

Treat every error/conflict/failure as a learning signal.

1. **Diagnose root cause** — ask "why?" before "how to fix?"
2. **Record in `LEARNINGS.md`** — error, root cause, fix, prevention.
3. **Update this file** if the error reveals a missing rule.
4. After multi-step tasks, self-review for inconsistencies and simplification opportunities.

## Don'ts

- No new deps without justification and checking `package.json` first.
- No shared type changes without checking all consumers.
- No `console.log` in committed code.
- No files outside established directory structure.
- No inline styles — use Tailwind.
- No `@ts-ignore` / `eslint-disable` without an explaining comment.

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
