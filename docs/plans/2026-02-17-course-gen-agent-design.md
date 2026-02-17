# Course Generation Agent Design

**Date:** 2026-02-17
**Status:** Approved

## Overview

A Claude Code skill (`/generate-course`) that takes a PDF document as input and produces a complete video course matching the existing 02Ship course format. The agent extracts curriculum from the PDF, generates all supporting files (lesson JSONs, shooting guides, slides), and renders videos using the existing Gemini TTS + ffmpeg pipeline.

## Invocation

```bash
# New course from PDF
/generate-course path/to/document.pdf

# Append lessons to existing series
/generate-course path/to/document.pdf --series existing-slug
```

## Architecture: Single Skill with Staged Prompts

One skill file at `.claude/skills/generate-course/SKILL.md` orchestrates the entire pipeline. It uses Claude's native PDF reading, writes files directly, and shells out to the existing `generate-lesson-video.mjs` for video rendering.

### Why This Approach

- Simplest implementation — one skill file, Claude handles all reasoning
- Leverages Claude's native PDF reading (no parsing library needed)
- Reuses the battle-tested video generation pipeline
- The pause-after-curriculum checkpoint catches errors early

## Two-Stage Workflow

### Stage 1: PDF → Curriculum (then pause for review)

1. **Read & Analyze PDF** — Extract main theme, chapter structure, key concepts, logical ordering using Claude's native PDF reading
2. **Generate Curriculum** — Map chapters to lessons (each with 1-3 videos, <10 min each). For each lesson: title, description, learning objectives, exercises, common mistakes, reflection questions, text sections, resources. For each video: title, description, script outline, talking points
3. **Write Files** — `series.json` + `lesson-XX-<slug>.json` files matching existing format
4. **Pause** — Display summary, ask user to review and approve before continuing

### Stage 2: Curriculum → Videos (after user approval)

5. **Generate Shooting Guides** — `lesson-XX-video-YY-shooting-guide.md` with timestamped sections, `**SCRIPT:**` narration blocks, visual suggestions, production notes (~320 lines each)
6. **Generate Slides HTML** — `lesson-XX-video-YY-slides.html` self-contained with existing dark theme (CSS variables, DM Sans + JetBrains Mono), one slide per shooting guide section
7. **Generate Video Configs** — `video-gen/configs/LXXVYY.json` with narration text extracted from shooting guides, slide counts, pause timings
8. **Cross-Validate** — Verify narration count matches slide count, text consistency between config and shooting guide, all paths resolve
9. **Render Videos** — Run `generate-lesson-video.mjs` for each config (Playwright slides → Gemini TTS → silence fix → single-pass ffmpeg)

## File Layout

### New course directory
```
content/courses/<new-slug>/
├── series.json
├── lesson-01-<slug>.json
├── lesson-01-video-01-shooting-guide.md
├── lesson-01-video-01-slides.html
├── ...
└── video-gen/
    ├── configs/
    │   ├── L01V01.json
    │   └── ...
    └── output/
        └── L01V01/
            ├── slides/
            ├── audio/
            └── final/
```

### Shared video-gen scripts
```
agents/video-gen/
├── generate-lesson-video.mjs   (moved from claude-basics/video-gen/)
├── fix-silence.mjs             (moved from claude-basics/video-gen/)
├── package.json
└── node_modules/
```

Scripts are updated to accept `--base-dir` so they work with any course directory. Invoked as:
```bash
node agents/video-gen/generate-lesson-video.mjs --config <path> --base-dir <course-dir>
```

## Skill Definition

```yaml
---
name: generate-course
description: Generate a complete video course from a PDF document. Extracts curriculum, creates lesson files, shooting guides, slides, and renders videos.
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
---
```

## Appending to Existing Series

When `--series <slug>` is provided:
- Read existing `series.json` to determine next lesson order number
- Never overwrite existing lesson files
- Create new files with next available `lesson-XX` prefix
- Append new lesson slugs to the series.json lessons array
- If slug conflict detected, append a suffix

## Error Handling

- **Unreadable PDF**: Report error, stop
- **No clear chapters**: Ask user how to segment before proceeding
- **Curriculum quality**: Pause checkpoint + summary table for user review
- **Narration/slide mismatch**: Auto-fix before writing config
- **TTS failure**: Existing exponential backoff retry (max 5 attempts)
- **ffmpeg failure**: Report which video failed, continue with remaining
- **Session death mid-Stage-2**: User can manually re-run `generate-lesson-video.mjs` for missing videos using already-generated configs

## Environment Requirements

- `GOOGLE_TTS_API_KEY` in `.env.local`
- `ffmpeg` and `ffprobe` on PATH
- Playwright (installed in agents/video-gen/)
- Claude Code CLI

## Out of Scope (v1)

- Web UI or progress dashboard
- Database persistence
- Rollback mechanism
- Website URL input (PDF only)
- Multi-PDF input
