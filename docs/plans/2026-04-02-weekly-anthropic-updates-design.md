# Weekly Anthropic & Claude Updates — Design

## Overview

A new content type for 02Ship: curated weekly digests of updates from Anthropic and Claude, tailored for non-programmer builders. Focus on "what changed that affects me using Claude as a tool."

**Sources:** anthropic.com, claude.com

**Route:** `/weekly` (list), `/weekly/[week]` (detail)

## Content Model

### File Location

`content/weekly/YYYY-WNN.json` (ISO week format, e.g., `2026-W14.json`)

### Schema

```json
{
  "week": "2026-W14",
  "startDate": "2026-03-30",
  "endDate": "2026-04-05",
  "summary": "Big week: Opus 4.6 launched with 1M context",
  "sections": [
    {
      "id": "product-updates",
      "title": "Product Updates and News",
      "items": [
        {
          "title": "Claude Opus 4.6 now available",
          "summary": "New flagship model with 1M context window and faster output. Available on all plans.",
          "url": "https://anthropic.com/news/opus-4-6",
          "impact": "high",
          "tags": ["model-release", "pricing"]
        }
      ]
    }
  ]
}
```

### Sections (all optional — only render if items exist)

| ID | Title |
|----|-------|
| `product-updates` | Product Updates and News |
| `developer-tools` | Developer Tools and Tips and Tricks |
| `community-learning` | Community & Learning |
| `research-safety` | Research & Safety |
| `whats-coming` | What's Coming |

### Impact Levels

- `high` — red dot, major announcements (model releases, pricing changes)
- `medium` — blue dot, notable updates
- `low` — gray dot, minor/informational

## Types

**File:** `src/types/weekly.ts`

```typescript
export type WeeklyImpact = 'high' | 'medium' | 'low'

export type WeeklySectionId =
  | 'product-updates'
  | 'developer-tools'
  | 'community-learning'
  | 'research-safety'
  | 'whats-coming'

export interface WeeklyItem {
  title: string
  summary: string
  url: string
  impact: WeeklyImpact
  tags: string[]
}

export interface WeeklySection {
  id: WeeklySectionId
  title: string
  items: WeeklyItem[]
}

export interface WeeklyDigest {
  week: string
  startDate: string
  endDate: string
  summary: string
  sections: WeeklySection[]
}
```

## Content Loader

**File:** `src/lib/weekly.ts` (mirrors `src/lib/news.ts` pattern)

- `getAllWeeks(): Promise<string[]>` — reads `content/weekly/`, returns week IDs sorted descending
- `getWeeklyDigest(week: string): Promise<WeeklyDigest | null>` — reads and parses a specific week file

## Routes & Pages

### List Page: `/weekly`

**File:** `src/app/weekly/page.tsx`

- Title: "Weekly Anthropic & Claude Updates"
- Subtitle: "Curated weekly digest of what's new from Anthropic and Claude"
- Each week rendered as a card with inline preview:
  - Date range in bold (e.g., "Mar 30 – Apr 5, 2026")
  - Week number badge (e.g., "W14")
  - Editorial summary line
  - Tag pills from top 2-3 high-impact items
  - Item count + section count
- Cards link to detail page
- Same hover/border style as daily news list

### Detail Page: `/weekly/[week]`

**File:** `src/app/weekly/[week]/page.tsx`

- `generateStaticParams()` for static generation
- Dynamic metadata per week
- Header: week date range + editorial summary
- Sections rendered in order, empty sections skipped
- Each item: impact color dot, title (linked to URL), summary, tag pills
- Newer/Older week navigation at bottom
- Impact colors: high = red/orange, medium = blue, low = gray
- Tags: small rounded pills with muted colors

## Integration

- **Header nav:** Add "Weekly" link to main navigation
- **Footer:** Add "Weekly" link
- **Sitemap:** Add `/weekly` (weekly change frequency, 0.8 priority) + individual weeks (0.5 priority, never change frequency)
- **Dark mode:** All colors via Tailwind dark: variants

## Files to Create/Modify

### New Files
- `src/types/weekly.ts`
- `src/lib/weekly.ts`
- `src/app/weekly/page.tsx`
- `src/app/weekly/[week]/page.tsx`
- `content/weekly/` (directory + sample data file)

### Modified Files
- `src/components/layout/Header.tsx` — add Weekly nav link
- `src/components/layout/Footer.tsx` — add Weekly link
- `src/app/sitemap.ts` — add weekly entries
