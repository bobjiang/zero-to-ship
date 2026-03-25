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
- `--series <slug>`: optional flag to append lessons to an existing series instead of creating a new one

If no PDF path is provided, ask the user for it.

## Pre-Processing Checklist

Before processing the PDF, present this checklist to the user:

1. Read and analyze the PDF content
2. Extract curriculum structure (lessons, videos, exercises)
3. Generate series.json and lesson JSON files
4. **PAUSE for user review**
5. Generate shooting guides for each video
6. Generate slide HTML files for each video
7. Generate video config JSON files
8. Cross-validate all generated files for consistency
9. Render videos using TTS + ffmpeg pipeline

## STAGE 1: PDF to Curriculum

### Step 1: Read & Analyze the PDF

Read the PDF using the Read tool. Extract:
- Main theme/topic (this becomes the course name)
- Chapter/section structure
- Key concepts per section
- Logical ordering of content

If the PDF lacks clear chapter/section structure, infer logical topic boundaries based on content shifts. Ask the user for guidance if the structure is ambiguous.

### Step 2: Plan the Curriculum

Map the PDF content to lessons:
- Each lesson covers a coherent topic area
- Target 1-3 videos per lesson
- Each video MUST be under 10 minutes of narration (~1500 words max)
- Every lesson MUST have at least 1 exercise
- Preserve the document's logical order unless a pedagogically better sequence is clearly justified

Determine all of the following for each lesson:
- Series slug (kebab-case, e.g., `react-fundamentals`)
- Series title and description
- Lesson slugs, titles, descriptions, order numbers
- Video titles and descriptions per lesson (1-3 videos each)
- Learning objectives (3 per lesson)
- Exercises (1-3 per lesson, each with title, description, output, successCriteria array, estimatedTime)
- Common mistakes (3-4 per lesson, each with mistake and explanation)
- Reflection questions (3 per lesson)
- Text sections (2-4 per lesson, each with title and content)
- Resources (3-5 per lesson with URLs where available)
- Script outlines and talking points for each video

### Step 3: Write Curriculum Files

Create the course directory: `content/courses/<slug>/`

If `--series` was provided:
- Read the existing `content/courses/<slug>/series.json`
- Read existing lesson files to find the highest XX number in `lesson-XX-*.json` filenames
- Start new lessons at XX+1 (e.g., if existing lessons go up to lesson-07, start at lesson-08)
- Set the lesson `order` field to continue the existing sequence
- Do NOT overwrite any existing files
- Append new lesson slugs to the end of the `lessons` array in series.json

#### series.json format:
```json
{
  "slug": "<slug>",
  "title": "<title>",
  "description": "<description>",
  "thumbnail": "/images/<slug>-thumbnail.jpg",
  "order": 1,
  "lessons": ["<lesson-1-slug>", "<lesson-2-slug>"]
}
```

Note: The `lessons` array contains slug strings on disk. The application loads full Lesson objects at runtime from the individual lesson JSON files.

#### lesson-XX-<slug>.json format:
```json
{
  "slug": "<lesson-slug>",
  "title": "Lesson N - <Title>",
  "description": "<description>",
  "duration": "<estimated total time>",
  "order": 1,
  "learningObjectives": [
    "Objective 1",
    "Objective 2",
    "Objective 3"
  ],
  "videos": [
    {
      "title": "<video title>",
      "description": "<video description>",
      "youtubeId": "",
      "slidesUrl": "/courses/<series-slug>/lesson-XX-video-YY-slides.html",
      "maxLength": "10 minutes",
      "estimatedDuration": "<N> minutes",
      "scriptOutline": ["point 1", "point 2"],
      "talkingPoints": ["point 1", "point 2"]
    }
  ],
  "textSections": [
    {"title": "Section Title", "content": "Section content with details."}
  ],
  "commonMistakes": [
    {"mistake": "Common mistake", "explanation": "Why this is a mistake and how to avoid it."}
  ],
  "reflectionQuestions": [
    "Question 1?",
    "Question 2?",
    "Question 3?"
  ],
  "exercises": [
    {
      "title": "Exercise Title",
      "description": "What to do.",
      "output": "What to produce.",
      "successCriteria": ["Criterion 1", "Criterion 2"],
      "estimatedTime": "20 minutes"
    }
  ],
  "resources": [
    {"title": "Resource Name", "url": "https://example.com"}
  ],
  "instructorNotes": [
    "Note for instructors about teaching this lesson."
  ]
}
```

### Step 4: Pause for Review

Display a summary:

```
=== Course Generation: Stage 1 Complete ===

Course: <title>
Directory: content/courses/<slug>/
Lessons: <count>
Total videos: <count>
Total exercises: <count>

Lesson 1: <title> (<N> videos)
Lesson 2: <title> (<N> videos)
...

Review the files in content/courses/<slug>/.
Edit anything you'd like, then tell me to continue with Stage 2.
```

Use AskUserQuestion to ask: "Ready to continue with Stage 2? (shooting guides, slides, and video rendering)"

**STOP HERE. Do not proceed to Stage 2 until the user explicitly approves.**

## STAGE 2: Generate Shooting Guides, Slides, Configs & Videos

Re-read all lesson JSON files from `content/courses/<slug>/` -- the user may have edited them during review.

### Step 5: Generate Shooting Guides

For each video in each lesson, create `content/courses/<slug>/lesson-XX-video-YY-shooting-guide.md`.

IMPORTANT: The shooting guide is the source of truth for all narration text. The SCRIPT blocks contain the exact words to be spoken.

For each video, use the `scriptOutline` and `talkingPoints` from the lesson JSON as the structural foundation. Every item in `scriptOutline` should map to a section in the guide, and every item in `talkingPoints` should appear somewhere in the narration.

Follow this structure EXACTLY:

```markdown
# Video Y Shooting Guide: <Video Title>

**Target Duration:** <N> minutes
**Max Duration:** 10 minutes
**Target Audience:** <from series description>

---

## Opening (0:00 - <timestamp>)

### Hook & Introduction

**SCRIPT:**
> "<Exact narration text. Write in a warm, conversational tone. This text will be read aloud by TTS. Write as if speaking naturally to a friend who is learning. Aim for ~150 words per minute.>"

**Keypoints:**
- Key point 1
- Key point 2

**Visual suggestions:**
- What should appear on screen

---

## Section N: <Section Title> (<start> - <end>)

### <Subsection Title>

**SCRIPT:**
> "<Exact narration text for this section.>"

**Keypoints:**
- Key point 1
- Key point 2

**What to emphasize:**
> "<Additional guidance for emphasis>"

**Visual suggestions:**
- What to show on screen

---

## Closing (<timestamp> - end)

### Recap & Next Steps

**SCRIPT:**
> "<Closing narration. Recap key points. Tease what's next.>"

**Keypoints:**
- Quick recap items

---

## Key Talking Points Summary

1. Essential message 1
2. Essential message 2
3. Essential message 3

## Production Notes

### Tone & Style
- Conversational and warm (friend teaching a friend)
- Encouraging, not condescending
- Use analogies where helpful

### Things to Avoid
- Technical jargon without explanation
- Overwhelming with details
- Making it sound too easy or too hard

## Post-Production Checklist

- [ ] Video length: under 10 minutes
- [ ] All key points covered
- [ ] Captions added and reviewed
```

CRITICAL RULES for shooting guides:
- Every `**SCRIPT:**` block MUST contain the EXACT text to be spoken aloud
- Write narration for TTS: warm, natural, conversational. No AI-sounding phrases.
- Timestamps must be realistic (aim for ~150 words per minute)
- Each SCRIPT block becomes one slide in the presentation
- Count your SCRIPT blocks -- this number must match the slide count
- Do NOT use markdown formatting inside SCRIPT blocks (no **, no ##, etc.)
- Use -- for em dashes, not the unicode character
- Keep each SCRIPT block under 200 words for natural pacing

### Step 6: Generate Slides HTML

For each video, create `content/courses/<slug>/lesson-XX-video-YY-slides.html`.

Each slide file is a self-contained HTML document with the 02Ship dark theme.

**Theme and layouts:** Read the shared theme CSS from `.claude/skills/create-slide/assets/base-theme.css` and embed it in the `<style>` block. For layout patterns (title, centered, two-col, three-grid, comparison-table, etc.), reference `.claude/skills/create-slide/references/layouts.md`.

Use this HTML skeleton:

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
        /* Embed base-theme.css here, then add slide-specific layout styles from layouts.md */
    </style>
</head>
<body>
    <header class="presentation-header">
        <h1>Video Y: <Video Title></h1>
        <p><Series Title> - Visual Slides Guide</p>
    </header>
    <div class="slides-container">
        <!-- SLIDES GO HERE -->
    </div>
</body>
</html>
```

For each slide, add a `<section class="slide {layout-class}" data-slide-number="N">` inside `.slides-container`.

CRITICAL RULES for slides:
- ONE slide per SCRIPT block in the shooting guide -- the counts MUST match exactly
- Slide 1 is always the title slide with the video title, series name, and a badge
- Each slide has a `<span class="slide-section">Section Name - Timestamp</span>`
- Use visual elements: grids, cards, flow diagrams, comparison boxes, lists, icons
- Keep text concise on slides -- the narration (TTS) provides the detail
- Add slide-specific CSS classes inside the `<style>` block for each slide type
- Use the CSS variables (--accent-coral, --accent-teal, --accent-gold, --text-primary, --text-secondary)
- The last slide should be a "Next Steps" or "Coming Up" slide with gradient background

### Step 7: Generate Video Configs

Create directory: `content/courses/<slug>/video-gen/configs/`

For each video, create `content/courses/<slug>/video-gen/configs/LXXVYY.json`:

```json
{
  "lesson": 1,
  "video": 1,
  "slidesHtml": "../lesson-XX-video-YY-slides.html",
  "slidesCount": 17,
  "outputDir": "output/LXXVYY",
  "outputFile": "lesson-XX-video-YY.mp4",
  "narrations": [
    {
      "slide": 1,
      "text": "Exact narration text from SCRIPT block, flattened to single line.",
      "pauseAfter": 1.5
    }
  ]
}
```

CRITICAL RULES for configs:
- `narrations` array MUST have exactly `slidesCount` entries
- Each `narrations[i].slide` must equal `i + 1`
- The `text` field must be the EXACT text from the corresponding SCRIPT block in the shooting guide
- Flatten to single line (no line breaks), remove markdown formatting (no >, **, etc.)
- Use -- for em dashes, not the unicode em dash character
- `pauseAfter`: 1.5 for the title slide (slide 1), 2.0 for the last slide, 1.0 for all others
- `slidesHtml` path is relative to the video-gen directory

### Step 8: Cross-Validate

Before rendering, verify consistency for EVERY video:

1. Count SCRIPT blocks in the shooting guide
2. Count .slide divs in the HTML file
3. Count narrations in the config
4. Verify all three counts match
5. Verify narration text in config matches SCRIPT blocks in shooting guide
6. Verify slidesHtml path in config points to an existing file
7. Count total words across all SCRIPT blocks in the shooting guide
8. Verify total words / 150 < 10 (must fit under 10-minute target)
9. If over budget, flag which sections are too long and trim them

If ANY mismatch is found:
- Report what's wrong
- Fix it automatically
- Report what was fixed

### Step 9: Render Videos

Before rendering the first video, ensure dependencies are installed:

```bash
cd agents/video-gen && npm install
```

For each config file, run:

```bash
node agents/video-gen/generate-lesson-video.mjs \
  --config content/courses/<slug>/video-gen/configs/LXXVYY.json
```

Run videos ONE AT A TIME (sequentially) to avoid overwhelming the TTS API.

If a video fails:
- Report which video failed and the error message
- Continue with the remaining videos
- At the end, list all failed videos so the user can retry

After all videos complete, display:

```
=== Video Rendering Complete ===

Rendered:
  Lesson 1 Video 1: content/courses/<slug>/video-gen/output/L01V01/lesson-01-video-01.mp4
  Lesson 1 Video 2: content/courses/<slug>/video-gen/output/L01V02/lesson-01-video-02.mp4
  ...

Failed: (none)

Course generation complete!
```
