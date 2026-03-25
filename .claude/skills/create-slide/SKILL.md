---
name: create-slide
description: Create self-contained HTML slide decks for meetup presentations and course lesson videos. Use when the user asks to create slides, a slide deck, a presentation, lesson slides, or training materials. Supports the 02Ship dark theme by default with optional custom theming.
user-invocable: true
---

# Create Slide

Generate a single, self-contained HTML file with all CSS inlined. No JavaScript. No frameworks. Only external dependency: Google Fonts.

## Arguments

`$ARGUMENTS` contains the user's slide request. If key details are missing, ask for:
- **Topic** and **audience**
- **Duration** and approximate **slide count**
- **Key sections** (outline)
- **Theme**: 02Ship dark (default) or custom

## Workflow

1. **Gather requirements** — Parse the user's request. Fill gaps by asking.
2. **Select layouts** — Choose from [references/layouts.md](references/layouts.md) for each slide.
3. **Generate HTML** — Single file using [assets/base-theme.css](assets/base-theme.css) as the embedded `<style>` block. Add slide-specific CSS classes as needed.
4. **Add speaker notes** — Below each slide, with timing badges that sum to the target duration.
5. **Write the file** — To the path the user specifies, or suggest a sensible default.

## HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{Deck Title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        /* Paste base-theme.css here, then add slide-specific styles */
    </style>
</head>
<body>
    <header class="presentation-header">
        <h1>{Deck Title}</h1>
        <p>{Subtitle} &bull; {Slide Count} Slides</p>
    </header>
    <div class="slides-container">
        <!-- Slides go here -->
    </div>
</body>
</html>
```

## Rules

- Every slide: `<section class="slide {layout-class}" data-slide-number="N">`
- 16:9 aspect ratio via `aspect-ratio: 16/9` on `.slide`
- Section label: `<span class="slide-section">Section &bull; Timestamp</span>`
- Slide 1 is always the title slide
- Last slide is closing/thank-you with gradient background
- Keep text sparse on slides — speaker notes carry the detail
- Use CSS variables from the theme (`--accent-coral`, `--accent-teal`, `--accent-gold`, `--accent-blue`, `--success`, `--error`)
- Speaker notes go in a `<div class="speaker-notes">` after each slide `<section>`
- Include timing badge: `<span class="timing">Start – End (N min)</span>`
- Include `@media print` styles for printability

## Presentation Mode

The base-theme.css includes a commented-out presentation mode block at the bottom. It enables snap-scrolling (one slide at a time with arrow keys) and hides speaker notes. Inform users they can uncomment it.

## Custom Theming

If the user requests a non-02Ship theme, replace the CSS variables in `:root` and adjust the gradient/accent colors throughout. Keep the same structural classes and layout patterns.
