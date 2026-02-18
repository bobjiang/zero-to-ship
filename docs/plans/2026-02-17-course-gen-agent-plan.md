# Course Generation Agent Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Claude Code skill (`/generate-course`) that takes a PDF document and produces a complete video course matching the existing 02Ship format, including TTS audio and rendered videos.

**Architecture:** A single Claude Code skill at `.claude/skills/generate-course/SKILL.md` that orchestrates a two-stage pipeline. Stage 1 extracts curriculum from the PDF and generates series/lesson JSON files, then pauses for review. Stage 2 generates shooting guides, slides HTML, video configs, and renders videos via the existing `generate-lesson-video.mjs` script (relocated to `agents/video-gen/`).

**Tech Stack:** Claude Code skill (Markdown), Node.js (video pipeline), Google Gemini TTS, Playwright, ffmpeg

---

### Task 1: Create shared video-gen directory

**Files:**
- Create: `agents/video-gen/package.json`
- Create: `agents/video-gen/generate-lesson-video.mjs` (copy + modify from existing)
- Create: `agents/video-gen/fix-silence.mjs` (copy from existing)

**Step 1: Create `agents/video-gen/` directory and copy scripts**

```bash
mkdir -p agents/video-gen
cp content/courses/claude-basics/video-gen/generate-lesson-video.mjs agents/video-gen/
cp content/courses/claude-basics/video-gen/fix-silence.mjs agents/video-gen/
cp content/courses/claude-basics/video-gen/package.json agents/video-gen/
```

**Step 2: Add `--base-dir` support to `generate-lesson-video.mjs`**

The script currently resolves all paths relative to `__dirname` (the video-gen directory). Add a `--base-dir` flag that changes where it looks for slides HTML and writes output. The key changes:

1. Parse `--base-dir` argument (defaults to `__dirname` for backward compat)
2. Resolve `slidesHtml` relative to `--base-dir` instead of `__dirname`
3. Resolve `outputDir` relative to `--base-dir` instead of `__dirname`
4. Keep `.env.local` resolution walking up from the project root

Replace the path resolution block (lines 8-28) with:

```javascript
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Parse --config argument
const configArgIdx = process.argv.indexOf('--config');
if (configArgIdx === -1 || !process.argv[configArgIdx + 1]) {
  console.error('Usage: node generate-lesson-video.mjs --config <path> [--base-dir <course-dir>]');
  process.exit(1);
}
const configPath = path.resolve(process.argv[configArgIdx + 1]);
const config = JSON.parse(readFileSync(configPath, 'utf8'));

// Parse --base-dir argument (defaults to directory containing the config)
const baseDirIdx = process.argv.indexOf('--base-dir');
const BASE_DIR = baseDirIdx !== -1 && process.argv[baseDirIdx + 1]
  ? path.resolve(process.argv[baseDirIdx + 1])
  : path.dirname(configPath);

const { lesson, video, slidesHtml, slidesCount, outputDir, outputFile, narrations } = config;

// Resolve paths relative to BASE_DIR
const OUTPUT_DIR = path.resolve(BASE_DIR, outputDir);
const AUDIO_DIR = path.join(OUTPUT_DIR, 'audio');
const FIXED_DIR = path.join(AUDIO_DIR, 'fixed');
const SLIDES_DIR = path.join(OUTPUT_DIR, 'slides');
const TEMP_DIR = path.join(OUTPUT_DIR, 'temp_build');
const SLIDES_HTML = path.resolve(BASE_DIR, slidesHtml);
```

Update the `.env.local` resolution (lines 34-42) to search upward from the current working directory instead of hardcoded `../../..`:

```javascript
// Load Google Cloud TTS API key - search upward for .env.local
function findEnvFile(startDir) {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    const envPath = path.join(dir, '.env.local');
    try { readFileSync(envPath, 'utf8'); return envPath; } catch {}
    dir = path.dirname(dir);
  }
  return null;
}
const envPath = findEnvFile(process.cwd());
if (!envPath) {
  console.error('.env.local not found in any parent directory');
  process.exit(1);
}
const envContent = readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/GOOGLE_TTS_API_KEY=(.+)/);
if (!apiKeyMatch) {
  console.error('GOOGLE_TTS_API_KEY not found in .env.local');
  process.exit(1);
}
const API_KEY = apiKeyMatch[1].trim();
```

**Step 3: Install dependencies in agents/video-gen/**

```bash
cd agents/video-gen && npm install
```

Run: `cd /Users/bobjiang1/Documents/codes/zero-to-ship/agents/video-gen && npm install`
Expected: Playwright installed successfully

**Step 4: Verify the moved script works with existing course**

Run: `cd /Users/bobjiang1/Documents/codes/zero-to-ship && node agents/video-gen/generate-lesson-video.mjs --config content/courses/claude-basics/video-gen/configs/L01V01.json --base-dir content/courses/claude-basics/ --skip-audio --skip-silence-fix --skip-slides`

Expected: Script runs without errors (will skip all steps but verify path resolution works)

Note: We are NOT deleting the original scripts from `content/courses/claude-basics/video-gen/` — they stay as-is for backward compatibility.

**Step 5: Commit**

```bash
git add agents/video-gen/
git commit -m "feat: add shared video-gen scripts with --base-dir support"
```

---

### Task 2: Create the skill directory structure

**Files:**
- Create: `.claude/skills/generate-course/SKILL.md`

**Step 1: Create the skill directory**

```bash
mkdir -p .claude/skills/generate-course
```

**Step 2: Write the SKILL.md file**

Create `.claude/skills/generate-course/SKILL.md` with the content below. This is the core deliverable — a comprehensive prompt that instructs Claude how to generate a complete course.

```markdown
---
name: generate-course
description: Generate a complete video course from a PDF document. Extracts curriculum, creates lesson files, shooting guides, slides, and renders videos with TTS.
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion, TaskCreate, TaskUpdate, TaskList
---

# Course Generation Agent

You are a course generation agent. Given a PDF document, you produce a complete video course matching the 02Ship format.

## Arguments

`$ARGUMENTS` contains: `<pdf-path> [--series <existing-slug>]`

Parse the arguments:
- First argument: path to the PDF file (required)
- `--series <slug>`: optional, append to existing series instead of creating new

## Two-Stage Workflow

### STAGE 1: PDF → Curriculum (then pause)

#### Step 1: Read & Analyze the PDF

Read the PDF using the Read tool. Extract:
- Main theme/topic (becomes course name)
- Chapter/section structure
- Key concepts per section
- Logical ordering

#### Step 2: Plan the Curriculum

Map PDF content to lessons:
- Each lesson should cover a coherent topic area
- Target 1-3 videos per lesson
- Each video must be under 10 minutes of narration
- Every lesson must have at least 1 exercise
- Preserve the document's logical order unless pedagogically better to reorder

Determine:
- Series slug (kebab-case, e.g., `react-fundamentals`)
- Series title
- Series description
- Lesson slugs, titles, descriptions, order numbers
- Video titles, descriptions per lesson
- Learning objectives per lesson (3 items)
- Exercises per lesson (1-3, each with title, description, output, success criteria, estimated time)
- Common mistakes per lesson (3-4 items)
- Reflection questions per lesson (3 items)
- Text sections per lesson (2-4 items)
- Resources per lesson (3-5 items with URLs where available)

#### Step 3: Write Curriculum Files

Create the course directory: `content/courses/<slug>/`

If `--series` was provided, read the existing `series.json` and determine the next lesson order number. Do NOT overwrite existing files.

**Write `series.json`** matching this exact format:
```json
{
  "slug": "<slug>",
  "title": "<title>",
  "description": "<description>",
  "thumbnail": "/images/<slug>-thumbnail.jpg",
  "order": <N>,
  "lessons": ["<lesson-1-slug>", "<lesson-2-slug>", ...]
}
```

**Write each `lesson-XX-<slug>.json`** matching this exact format:
```json
{
  "slug": "<lesson-slug>",
  "title": "Lesson N - <Title>",
  "description": "<description>",
  "duration": "<estimated total time>",
  "order": <N>,
  "learningObjectives": ["...", "...", "..."],
  "videos": [
    {
      "title": "<video title>",
      "description": "<video description>",
      "youtubeId": "",
      "slidesUrl": "/courses/<series-slug>/lesson-XX-video-YY-slides.html",
      "maxLength": "10 minutes",
      "estimatedDuration": "<N> minutes",
      "scriptOutline": ["point 1", "point 2", "..."],
      "talkingPoints": ["point 1", "point 2", "..."]
    }
  ],
  "textSections": [
    {"title": "...", "content": "..."}
  ],
  "commonMistakes": [
    {"mistake": "...", "explanation": "..."}
  ],
  "reflectionQuestions": ["...", "...", "..."],
  "exercises": [
    {
      "title": "...",
      "description": "...",
      "output": "...",
      "successCriteria": ["...", "..."],
      "estimatedTime": "XX minutes"
    }
  ],
  "resources": [
    {"title": "...", "url": "..."}
  ],
  "instructorNotes": ["...", "..."]
}
```

#### Step 4: Pause for Review

Display a summary table:
```
Course: <title>
Lessons: <count>
Total videos: <count>
Total exercises: <count>

Lesson 1: <title> (X videos)
Lesson 2: <title> (X videos)
...
```

Then ask the user:
"Review the files in `content/courses/<slug>/`. Edit anything you'd like, then tell me to continue with Stage 2."

**STOP HERE. Do not proceed until the user explicitly says to continue.**

---

### STAGE 2: Curriculum → Shooting Guides, Slides, Configs & Videos

Re-read all lesson JSON files from disk (the user may have edited them).

#### Step 5: Generate Shooting Guides

For each video in each lesson, create `lesson-XX-video-YY-shooting-guide.md`.

Follow this exact structure:

```markdown
# Video Y Shooting Guide: <Video Title>

**Target Duration:** <N> minutes
**Max Duration:** 10 minutes
**Target Audience:** <from series description>

---

## Opening (0:00 - <timestamp>)

### Hook & Introduction

**SCRIPT:**
> "<Exact narration text for the speaker to read. Write in a warm, conversational tone.>"

**Keypoints:**
- Key point 1
- Key point 2

**Visual suggestions:**
- Visual suggestion 1
- Visual suggestion 2

---

## Section N: <Section Title> (<start> - <end>)

### <Subsection>

**SCRIPT:**
> "<Exact narration text>"

**Keypoints:**
- ...

**What to emphasize:**
> "..."

**Visual suggestions:**
- ...

---

## Closing (<timestamp> - end)

### Recap & Next Steps

**SCRIPT:**
> "<Exact narration text>"

---

## Key Talking Points Summary

1. ...
2. ...

## Production Notes

### Tone & Style
- Conversational and warm
- Encouraging, not condescending
- Use analogies where helpful

### Things to Avoid
- Technical jargon without explanation
- Overwhelming with details
- Making it sound too easy

## Post-Production Checklist

- [ ] Video length: under 10 minutes
- [ ] All key points covered
- [ ] Captions added and reviewed
```

CRITICAL RULES for shooting guides:
- Every `**SCRIPT:**` block must contain the EXACT text to be spoken aloud
- Timestamps must be realistic (aim for ~150 words per minute of narration)
- Each section should flow naturally into the next
- The narration should sound like a real human teaching, not an AI

#### Step 6: Generate Slides HTML

For each video, create `lesson-XX-video-YY-slides.html`.

Use this exact CSS theme (matching existing 02Ship style):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Y: <Video Title></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-dark: #0f0f14;
            --bg-slide: #16161d;
            --accent-coral: #ff6b6b;
            --accent-teal: #4ecdc4;
            --accent-gold: #ffd93d;
            --text-primary: #f8f8f2;
            --text-secondary: #a9a9b3;
            --success: #50fa7b;
            --error: #ff5555;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'DM Sans', sans-serif;
            background: var(--bg-dark);
            color: var(--text-primary);
            min-height: 100vh;
            padding: 2rem;
        }
        .presentation-header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem;
            background: linear-gradient(135deg, var(--accent-coral) 0%, var(--accent-teal) 100%);
            border-radius: 16px;
        }
        .presentation-header h1 { font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; }
        .presentation-header p { opacity: 0.9; font-size: 1.1rem; }
        .slides-container {
            display: flex; flex-direction: column; gap: 3rem;
            max-width: 1200px; margin: 0 auto;
        }
        .slide {
            background: var(--bg-slide);
            border-radius: 16px; padding: 3rem;
            aspect-ratio: 16/9;
            display: flex; flex-direction: column; justify-content: center;
            position: relative; overflow: hidden;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .slide::before {
            content: attr(data-slide-number);
            position: absolute; top: 1rem; right: 1.5rem;
            font-size: 0.9rem; color: var(--text-secondary); font-weight: 500;
        }
        .slide-section {
            position: absolute; top: 1rem; left: 1.5rem;
            font-size: 0.8rem; color: var(--accent-teal);
            text-transform: uppercase; letter-spacing: 2px; font-weight: 600;
        }
        /* Add slide-specific CSS classes as needed for each slide's layout */
    </style>
</head>
<body>
    <header class="presentation-header">
        <h1>Video Y: <Video Title></h1>
        <p><Series Title> - Visual Slides Guide</p>
    </header>
    <div class="slides-container">
        <!-- One .slide div per slide, with data-slide-number attribute -->
        <!-- Slide 1 is always the title slide -->
        <!-- Each slide maps to one SCRIPT block in the shooting guide -->
    </div>
</body>
</html>
```

CRITICAL RULES for slides:
- One slide per `**SCRIPT:**` block in the shooting guide
- Slide 1 is always the title slide
- Each slide has `data-slide-number="N"` attribute
- Each slide has a `<span class="slide-section">` showing the section name and timestamp
- Use visual elements: grids, cards, flow diagrams, comparison boxes, code blocks
- Keep text concise on slides — the narration provides the detail
- Add custom CSS classes for each slide type (e.g., `.slide-title`, `.slide-definition`)

#### Step 7: Generate Video Configs

Create `content/courses/<slug>/video-gen/configs/` directory.

For each video, create `LXXVYY.json`:

```json
{
  "lesson": <lesson_number>,
  "video": <video_number>,
  "slidesHtml": "../lesson-XX-video-YY-slides.html",
  "slidesCount": <number_of_slides>,
  "outputDir": "output/LXXVYY",
  "outputFile": "lesson-XX-video-YY.mp4",
  "narrations": [
    {
      "slide": 1,
      "text": "<exact narration text from shooting guide SCRIPT block>",
      "pauseAfter": 1.5
    },
    {
      "slide": 2,
      "text": "<exact narration text>",
      "pauseAfter": 1.0
    }
  ]
}
```

CRITICAL RULES for configs:
- `narrations` array MUST have exactly as many entries as `slidesCount`
- Each `narrations[i].slide` must equal `i + 1`
- The `text` field must be the EXACT text from the corresponding `**SCRIPT:**` block in the shooting guide, but flattened to a single line (no line breaks)
- Remove markdown formatting (no `>`, `**`, etc.) — plain text only
- Use `--` for em dashes, not `—`
- `pauseAfter`: 1.5 for title slides, 2.0 for closing slides, 1.0 for all others

#### Step 8: Cross-Validate

Before rendering videos, verify:
1. For each video: count of `**SCRIPT:**` blocks in shooting guide == `slidesCount` in config == number of `.slide` divs in HTML
2. For each narration in config: text matches the corresponding SCRIPT block in the shooting guide
3. All `slidesHtml` paths in configs resolve to existing files

If any mismatch is found, fix it before proceeding. Report what was fixed.

#### Step 9: Render Videos

For each config file, run:

```bash
node agents/video-gen/generate-lesson-video.mjs \
  --config content/courses/<slug>/video-gen/configs/LXXVYY.json \
  --base-dir content/courses/<slug>/
```

Run videos sequentially (one at a time) to avoid overwhelming the TTS API.

If a video fails:
- Report which video failed and the error
- Continue with the remaining videos
- At the end, list all failed videos so the user can retry manually

After all videos complete, display a summary:
```
Videos rendered:
  Lesson 1 Video 1: lesson-01-video-01.mp4 (X:XX)
  Lesson 1 Video 2: lesson-01-video-02.mp4 (X:XX)
  ...

Failed:
  (none)
```
```

**Step 3: Verify the skill file is valid**

Run: `ls -la .claude/skills/generate-course/SKILL.md`
Expected: File exists with reasonable size

**Step 4: Commit**

```bash
git add .claude/skills/generate-course/
git commit -m "feat: add /generate-course skill for PDF-to-video course generation"
```

---

### Task 3: Test the skill with an existing lesson

**Purpose:** Validate the skill works by running it against a small test PDF. Since we need a real PDF to test with, we'll create a minimal test document.

**Step 1: Create a simple test PDF**

Create a 2-page PDF with clear chapters using a simple script:

```bash
# Use Python to create a minimal test PDF
python3 -c "
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
c = canvas.Canvas('test-course-input.pdf', pagesize=letter)
c.setFont('Helvetica-Bold', 24)
c.drawString(72, 720, 'Introduction to Git')
c.setFont('Helvetica', 12)
c.drawString(72, 690, 'Chapter 1: What is Version Control?')
c.drawString(72, 670, 'Version control tracks changes to files over time.')
c.drawString(72, 650, 'It lets you revert to previous versions if needed.')
c.drawString(72, 620, 'Chapter 2: Getting Started with Git')
c.drawString(72, 600, 'Install Git, configure your name and email.')
c.drawString(72, 580, 'Create your first repository with git init.')
c.save()
print('Created test-course-input.pdf')
"
```

If reportlab is not available, create a simple markdown file and convert it, or use any available PDF the user provides.

**Step 2: Run the skill**

In Claude Code, run:
```
/generate-course test-course-input.pdf
```

**Step 3: Verify Stage 1 output**

Check that the following files were created:
- `content/courses/introduction-to-git/series.json` — valid JSON, correct format
- `content/courses/introduction-to-git/lesson-01-*.json` — valid JSON with all required fields

**Step 4: Approve and continue to Stage 2**

After reviewing the curriculum files, tell the agent to continue. Verify:
- Shooting guides created with `**SCRIPT:**` blocks
- Slides HTML created with correct number of `.slide` divs
- Video configs created with matching narration counts
- Cross-validation passes
- Videos render successfully (or at least the pipeline starts without errors)

**Step 5: Clean up test files**

```bash
rm test-course-input.pdf
rm -rf content/courses/introduction-to-git/
```

**Step 6: Commit any fixes discovered during testing**

```bash
git add -A
git commit -m "fix: address issues found during course-gen agent testing"
```

---

### Task 4: Update CLAUDE.md with agent documentation

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Add agent section to CLAUDE.md**

Add a section after the "Development Commands" section:

```markdown
## Course Generation Agent

Generate a complete video course from a PDF document:

```bash
# Create a new course from a PDF
/generate-course path/to/document.pdf

# Append lessons to an existing series
/generate-course path/to/document.pdf --series existing-slug
```

The agent runs in two stages:
1. **Stage 1:** Extracts curriculum from PDF, generates series.json + lesson JSONs, then pauses for review
2. **Stage 2:** After approval, generates shooting guides, slides, video configs, and renders videos via TTS + ffmpeg

### Requirements
- `GOOGLE_TTS_API_KEY` in `.env.local`
- `ffmpeg` and `ffprobe` on PATH
- Playwright (installed in `agents/video-gen/`)
```

**Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add course generation agent to CLAUDE.md"
```
