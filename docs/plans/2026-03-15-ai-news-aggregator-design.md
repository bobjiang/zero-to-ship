# AI News Aggregator — Design

**Date:** 2026-03-15
**Status:** Approved

## Overview

Daily AI news page at `/news` powered by an automated pipeline. A GitHub Actions cron job fetches from 4 free API sources, uses Gemini 2.5 Pro for summarization and ranking, and commits a static JSON file per day. The Next.js site reads these files at build time.

## Data Sources (Tier 1)

| Source | API | Signal |
|--------|-----|--------|
| Hacker News | Algolia API (`hn.algolia.com/api/v1/`) — AI/LLM stories with >50 points | Community buzz, breaking news |
| Reddit | JSON API (`reddit.com/r/{sub}/top.json?t=day`) — r/MachineLearning + r/LocalLLaMA | Research discussion, open-source |
| arXiv | RSS (`arxiv.org/rss/cs.AI`, `cs.CL`, `cs.LG`) | Cutting-edge research papers |
| Hugging Face Daily Papers | API (`huggingface.co/api/daily_papers?limit=100`) | Curated top papers |

Future tiers: company blogs (RSS), tech publications (RSS), newsletters, GitHub trending, Bluesky.

## Data Flow

```
GitHub Actions (daily 8am UTC + manual trigger)
  -> Node.js script fetches 4 sources in parallel
  -> Deduplicates by URL/title similarity
  -> Sends to Gemini 2.5 Pro:
     - Pick top 15 items
     - One-sentence summary each
     - Impact score 1-10
     - Categorize: research | product | open-source | industry
  -> Writes content/news/YYYY-MM-DD.json
  -> Git commit & push -> Vercel auto-deploys
```

## Daily JSON Schema

```json
{
  "date": "2026-03-15",
  "items": [
    {
      "title": "Paper/article title",
      "summary": "One-sentence AI-generated summary.",
      "source": "Hacker News",
      "url": "https://...",
      "score": 9,
      "category": "research"
    }
  ]
}
```

- 10-15 items per day, sorted by score descending
- Categories: `research`, `product`, `open-source`, `industry`

## Pages & Routes

### `/news` — Index page
- Lists all available daily digests, newest first
- Each entry shows formatted date, links to `/news/[date]`
- Uses `Container` wrapper, matches blog listing pattern

### `/news/[date]` — Daily detail page
- Heading: "AI News — March 15, 2026"
- Items as cards: score badge, title (linked to source), summary, source label, category tag
- Previous day / Next day navigation
- `generateStaticParams()` for static generation

## File Structure

```
content/news/
  YYYY-MM-DD.json              # one file per day

src/types/news.ts              # NewsItem, DailyNews types
src/lib/news.ts                # getAllNewsDates(), getNewsByDate(date)
src/app/news/
  page.tsx                     # index listing
  [date]/
    page.tsx                   # daily detail

scripts/generate-news.mjs     # pipeline script
.github/workflows/daily-news.yml  # cron workflow
```

## Pipeline Script: `scripts/generate-news.mjs`

- Standalone ESM Node.js script
- Fetches all 4 sources in parallel with native `fetch()`
- Uses `fast-xml-parser` for arXiv RSS parsing (one new dependency)
- Normalizes items into common format with raw engagement metrics
- Calls Gemini 2.5 Pro to select top 15, summarize, score, categorize
- Writes JSON to `content/news/YYYY-MM-DD.json`

## GitHub Actions: `.github/workflows/daily-news.yml`

- Schedule: `0 8 * * *` (daily 8am UTC)
- Manual trigger: `workflow_dispatch`
- Steps: checkout, setup Node, run script, commit & push
- Secret: `GEMINI_API_KEY`

## Dependencies

- `fast-xml-parser` — lightweight XML parser for arXiv RSS (new)
- No other new dependencies

## Navigation

- Add "News" link to Header component between "Blog" and "Events"
