# Autoresearch Changelog — create-slide

## Eval Suite v1 (retired — 100% baseline, too easy)

Structural checks only (valid HTML, self-contained, timing badges, layout variety, theme compliance). All passed trivially.

## Eval Suite v2 (current — ULTRA HARD)

```
EVAL 1: Text sparsity
Question: Does every slide's prose text (all <p> elements, excluding speaker notes) stay under 25 words per paragraph?
Pass: Every <p> in slide sections has ≤25 words
Fail: Any <p> in a slide section exceeds 25 words

EVAL 2: Zero inline styles
Question: Does the <body> contain zero style= attributes?
Pass: No style= attributes anywhere in the HTML body
Fail: Any element in <body> has a style= attribute

EVAL 3: Bullet speaker notes
Question: Do at least 75% of speaker-notes divs use <ul> lists instead of single <p> paragraphs?
Pass: ≥75% of speaker-notes contain a <ul> element
Fail: <75% of speaker-notes contain a <ul> — too many are just <p> walls of text

EVAL 4: Rich code blocks
Question: Does every .code-block use at least 3 different syntax highlight classes from (.comment, .keyword, .string, .prompt, .output)?
Pass: Every code-block div uses ≥3 distinct syntax classes
Fail: Any code-block uses fewer than 3 syntax classes

EVAL 5: No template comments
Question: Is the output CSS free of meta-comments like "Embed this entire file inside the style tag" or "Paste base-theme.css here"?
Pass: No template instruction comments in the embedded CSS
Fail: Template instruction comments from base-theme.css or SKILL.md are present in output

EVAL 6: Slide-section timestamps
Question: Does every non-title/non-closing slide's .slide-section span include a timestamp (e.g., "Section · 0:04")?
Pass: Every slide-section label contains a time reference matching the speaker notes timing
Fail: Any slide-section label is missing a timestamp or uses only topic names
```

---

## Experiment 0 (v1 evals) — baseline

**Score:** 15/15 (100%)
**Description:** Original skill, v1 structural evals — all trivially passed
**Result:** Evals too easy, replaced with v2 ultra-hard suite

---

## Experiment 0 (v2 evals) — baseline

**Score:** 6/18 (33.3%)
**Description:** Original skill scored against ultra-hard evals
**Failing evals:**
- EVAL 5 (0/3): All runs included template meta-comments like "Embed this entire file"
- EVAL 6 (0/3): No slide-section spans included timestamps — all used "Section · Topic" format
- EVAL 3 (1/3): Most speaker notes were single `<p>` paragraphs, not `<ul>` bullet lists
- EVAL 4 (1/3): Some code blocks used only 2 syntax classes instead of 3+

---

## Experiment 1 — KEEP

**Score:** 18/18 (100%)
**Change:** Added 2 rules to SKILL.md: (1) strip template instruction comments from embedded CSS, (2) require timestamps in slide-section labels with format "Section Name · M:SS"
**Reasoning:** EVAL 5 and EVAL 6 were at 0/3 — the skill had no instructions for either behavior
**Result:** All 6 evals passed across all 3 runs. The explicit rules also indirectly improved EVAL 1 (text sparsity), EVAL 2 (inline styles), EVAL 3 (bullet notes), and EVAL 4 (rich code blocks) — likely because the added specificity raised overall output quality.
**Failing outputs:** None

---

