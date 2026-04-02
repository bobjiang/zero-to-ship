# Weekly Anthropic & Claude Updates — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `/weekly` content type that curates Anthropic & Claude updates as weekly digests for non-programmer builders.

**Architecture:** Mirrors the existing daily news pattern — flat JSON files in `content/weekly/`, TypeScript types, fs-based loader, Next.js App Router pages with static generation. Completely independent from daily news.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, fs/promises

**Design doc:** `docs/plans/2026-04-02-weekly-anthropic-updates-design.md`

---

### Task 1: Types

**Files:**
- Create: `src/types/weekly.ts`

**Step 1: Create the types file**

```typescript
export type WeeklyImpact = 'high' | 'medium' | 'low';

export type WeeklySectionId =
  | 'product-updates'
  | 'developer-tools'
  | 'community-learning'
  | 'research-safety'
  | 'whats-coming';

export interface WeeklyItem {
  title: string;
  summary: string;
  url: string;
  impact: WeeklyImpact;
  tags: string[];
}

export interface WeeklySection {
  id: WeeklySectionId;
  title: string;
  items: WeeklyItem[];
}

export interface WeeklyDigest {
  week: string;
  startDate: string;
  endDate: string;
  summary: string;
  sections: WeeklySection[];
}
```

**Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS (no errors)

**Step 3: Commit**

```bash
git add src/types/weekly.ts
git commit -m "feat(weekly): add TypeScript types for weekly digest"
```

---

### Task 2: Sample Content

**Files:**
- Create: `content/weekly/2026-W14.json`

**Step 1: Create the content directory and sample file**

Create `content/weekly/2026-W14.json` with realistic sample data covering all 5 sections. This data is needed for testing the loader and pages.

```json
{
  "week": "2026-W14",
  "startDate": "2026-03-30",
  "endDate": "2026-04-05",
  "summary": "Big week: Opus 4.6 launched with 1M context, Claude Code gets security enhancements",
  "sections": [
    {
      "id": "product-updates",
      "title": "Product Updates and News",
      "items": [
        {
          "title": "Claude Opus 4.6 now available with 1M context window",
          "summary": "Anthropic's new flagship model brings 1M token context and faster output. Available on all plans including Free (limited), Pro, and Max.",
          "url": "https://www.anthropic.com/news/opus-4-6",
          "impact": "high",
          "tags": ["model-release", "context-window"]
        },
        {
          "title": "Claude now available as desktop app on Mac and Windows",
          "summary": "Claude Code is now available as a standalone desktop application, making it easier to use outside the browser.",
          "url": "https://www.anthropic.com/news/claude-desktop",
          "impact": "medium",
          "tags": ["desktop", "claude-code"]
        }
      ]
    },
    {
      "id": "developer-tools",
      "title": "Developer Tools and Tips and Tricks",
      "items": [
        {
          "title": "Claude Code security enhancements: sandboxed execution",
          "summary": "Claude Code now runs in a sandboxed environment by default, preventing accidental file system damage. Tip: use the permission mode settings to customize access.",
          "url": "https://www.anthropic.com/news/claude-code-security",
          "impact": "high",
          "tags": ["claude-code", "security"]
        },
        {
          "title": "MCP server support expanded with 12 new integrations",
          "summary": "Model Context Protocol now supports Slack, GitHub, Jira, Linear, and 8 more services. Connect your tools directly to Claude.",
          "url": "https://docs.anthropic.com/en/docs/mcp",
          "impact": "medium",
          "tags": ["mcp", "integrations"]
        }
      ]
    },
    {
      "id": "community-learning",
      "title": "Community & Learning",
      "items": [
        {
          "title": "Anthropic Academy launches free prompt engineering course",
          "summary": "A new self-paced course covering prompt engineering fundamentals, from basic techniques to advanced chain-of-thought strategies.",
          "url": "https://www.anthropic.com/news/academy-prompt-engineering",
          "impact": "medium",
          "tags": ["learning", "prompt-engineering"]
        }
      ]
    },
    {
      "id": "research-safety",
      "title": "Research & Safety",
      "items": [
        {
          "title": "Anthropic publishes updated Responsible Scaling Policy",
          "summary": "The updated policy adds new evaluation criteria for frontier models and clearer deployment thresholds. This may affect how Claude responds to certain edge-case prompts.",
          "url": "https://www.anthropic.com/news/responsible-scaling-policy-update",
          "impact": "medium",
          "tags": ["safety", "policy"]
        }
      ]
    },
    {
      "id": "whats-coming",
      "title": "What's Coming",
      "items": [
        {
          "title": "Claude Projects: shared workspaces coming to Teams plan",
          "summary": "Anthropic previewed collaborative project workspaces where team members can share Claude conversations, custom instructions, and uploaded files.",
          "url": "https://www.anthropic.com/news/claude-projects-preview",
          "impact": "low",
          "tags": ["teams", "collaboration", "preview"]
        }
      ]
    }
  ]
}
```

**Step 2: Commit**

```bash
git add content/weekly/2026-W14.json
git commit -m "feat(weekly): add sample weekly digest content for W14"
```

---

### Task 3: Content Loader

**Files:**
- Create: `src/lib/weekly.ts`
- Test: `src/lib/__tests__/weekly.test.ts`

**Step 1: Write the failing tests**

Create `src/lib/__tests__/weekly.test.ts` mirroring the pattern in `src/lib/__tests__/news.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { getAllWeeks, getWeeklyDigest } from '@/lib/weekly';

describe('weekly loaders', () => {
  describe('getAllWeeks', () => {
    it('returns an array of week strings', async () => {
      const weeks = await getAllWeeks();
      expect(Array.isArray(weeks)).toBe(true);
    });

    it('weeks are sorted descending', async () => {
      const weeks = await getAllWeeks();
      if (weeks.length > 1) {
        for (let i = 1; i < weeks.length; i++) {
          expect(weeks[i - 1].localeCompare(weeks[i])).toBeGreaterThanOrEqual(0);
        }
      }
    });

    it('weeks match YYYY-WNN format', async () => {
      const weeks = await getAllWeeks();
      for (const week of weeks) {
        expect(week).toMatch(/^\d{4}-W\d{2}$/);
      }
    });
  });

  describe('getWeeklyDigest', () => {
    it('returns digest for a valid week', async () => {
      const weeks = await getAllWeeks();
      if (weeks.length > 0) {
        const digest = await getWeeklyDigest(weeks[0]);
        expect(digest).not.toBeNull();
        expect(digest?.week).toBe(weeks[0]);
        expect(Array.isArray(digest?.sections)).toBe(true);
      }
    });

    it('each item has required fields', async () => {
      const weeks = await getAllWeeks();
      if (weeks.length > 0) {
        const digest = await getWeeklyDigest(weeks[0]);
        if (digest) {
          for (const section of digest.sections) {
            expect(section.id).toBeDefined();
            expect(section.title).toBeDefined();
            for (const item of section.items) {
              expect(item.title).toBeDefined();
              expect(item.summary).toBeDefined();
              expect(item.url).toBeDefined();
              expect(item.impact).toBeDefined();
              expect(Array.isArray(item.tags)).toBe(true);
            }
          }
        }
      }
    });

    it('returns null for an invalid week', async () => {
      const digest = await getWeeklyDigest('1900-W01');
      expect(digest).toBeNull();
    });
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/__tests__/weekly.test.ts`
Expected: FAIL — `@/lib/weekly` module not found

**Step 3: Write the loader**

Create `src/lib/weekly.ts`:

```typescript
import fs from 'fs/promises';
import path from 'path';
import { WeeklyDigest } from '@/types/weekly';

const WEEKLY_DIR = path.join(process.cwd(), 'content', 'weekly');

export async function getAllWeeks(): Promise<string[]> {
  try {
    const files = await fs.readdir(WEEKLY_DIR);
    const weeks = files
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''))
      .sort((a, b) => b.localeCompare(a));
    return weeks;
  } catch {
    return [];
  }
}

export async function getWeeklyDigest(week: string): Promise<WeeklyDigest | null> {
  try {
    const filePath = path.join(WEEKLY_DIR, `${week}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as WeeklyDigest;
  } catch {
    return null;
  }
}
```

**Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/__tests__/weekly.test.ts`
Expected: ALL PASS

**Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 6: Commit**

```bash
git add src/lib/weekly.ts src/lib/__tests__/weekly.test.ts
git commit -m "feat(weekly): add content loader with tests"
```

---

### Task 4: List Page

**Files:**
- Create: `src/app/weekly/page.tsx`

**Step 1: Create the list page**

Create `src/app/weekly/page.tsx`. Pattern follows `src/app/news/page.tsx` but with inline preview (summary, tags, item/section counts).

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getAllWeeks, getWeeklyDigest } from '@/lib/weekly';

export const metadata: Metadata = {
  title: 'Weekly Anthropic & Claude Updates',
  description: 'Curated weekly digest of what\'s new from Anthropic and Claude, tailored for builders.',
  alternates: { canonical: '/weekly' },
};

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const yearOpts: Intl.DateTimeFormatOptions = { ...opts, year: 'numeric' };
  return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', yearOpts)}`;
}

function getTopTags(digest: { sections: { items: { impact: string; tags: string[] }[] }[] }): string[] {
  const tags: string[] = [];
  for (const section of digest.sections) {
    for (const item of section.items) {
      if (item.impact === 'high') {
        tags.push(...item.tags);
      }
    }
  }
  return [...new Set(tags)].slice(0, 3);
}

function getStats(digest: { sections: { items: unknown[] }[] }): { items: number; sections: number } {
  const sections = digest.sections.filter(s => s.items.length > 0).length;
  const items = digest.sections.reduce((sum, s) => sum + s.items.length, 0);
  return { items, sections };
}

export default async function WeeklyPage() {
  const weeks = await getAllWeeks();
  const digests = await Promise.all(weeks.map(w => getWeeklyDigest(w)));

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Weekly Anthropic & Claude Updates
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Curated weekly digest of what&apos;s new from Anthropic and Claude
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          {digests.length > 0 ? (
            <div className="space-y-4">
              {digests.map((digest) => {
                if (!digest) return null;
                const dateRange = formatDateRange(digest.startDate, digest.endDate);
                const topTags = getTopTags(digest);
                const stats = getStats(digest);
                return (
                  <Link
                    key={digest.week}
                    href={`/weekly/${digest.week}`}
                    className="block rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-lg font-semibold text-gray-900">{dateRange}</span>
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {digest.week.split('-')[1]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{digest.summary}</p>
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      {topTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {stats.items} updates &middot; {stats.sections} sections
                    </p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>No weekly updates yet. Check back soon!</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: PASS — page builds and `/weekly` route is generated

**Step 3: Commit**

```bash
git add src/app/weekly/page.tsx
git commit -m "feat(weekly): add list page with inline preview cards"
```

---

### Task 5: Detail Page

**Files:**
- Create: `src/app/weekly/[week]/page.tsx`

**Step 1: Create the detail page**

Create `src/app/weekly/[week]/page.tsx`. Pattern follows `src/app/news/[date]/page.tsx` with sections, impact dots, tag pills, and week navigation.

```tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getWeeklyDigest, getAllWeeks } from '@/lib/weekly';
import { cn } from '@/lib/utils';
import { WeeklyImpact } from '@/types/weekly';

interface WeeklyDetailPageProps {
  params: Promise<{
    week: string;
  }>;
}

export async function generateStaticParams() {
  const weeks = await getAllWeeks();
  return weeks.map((week) => ({ week }));
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  const opts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  const yearOpts: Intl.DateTimeFormatOptions = { ...opts, year: 'numeric' };
  return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', yearOpts)}`;
}

export async function generateMetadata({ params }: WeeklyDetailPageProps) {
  const { week } = await params;
  const digest = await getWeeklyDigest(week);

  if (!digest) {
    return { title: 'Week Not Found' };
  }

  const dateRange = formatDateRange(digest.startDate, digest.endDate);

  return {
    title: `Anthropic & Claude Updates — ${dateRange}`,
    description: digest.summary,
    openGraph: {
      title: `Anthropic & Claude Updates — ${dateRange}`,
      description: digest.summary,
      type: 'article' as const,
    },
    alternates: {
      canonical: `/weekly/${week}`,
    },
  };
}

const impactColors: Record<WeeklyImpact, string> = {
  high: 'bg-red-500',
  medium: 'bg-blue-500',
  low: 'bg-gray-400',
};

export default async function WeeklyDetailPage({ params }: WeeklyDetailPageProps) {
  const { week } = await params;
  const digest = await getWeeklyDigest(week);

  if (!digest) {
    notFound();
  }

  const dateRange = formatDateRange(digest.startDate, digest.endDate);

  const allWeeks = await getAllWeeks();
  const currentIndex = allWeeks.indexOf(week);
  const newerWeek = currentIndex > 0 ? allWeeks[currentIndex - 1] : null;
  const olderWeek = currentIndex < allWeeks.length - 1 ? allWeeks[currentIndex + 1] : null;

  const nonEmptySections = digest.sections.filter(s => s.items.length > 0);

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Link
              href="/weekly"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              &larr; Back to Weekly Updates
            </Link>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {dateRange}
          </h1>
          <p className="mt-2 text-lg text-gray-600">{digest.summary}</p>

          <div className="mt-10 space-y-10">
            {nonEmptySections.map((section) => (
              <div key={section.id}>
                <h2 className="border-l-4 border-blue-500 pl-3 text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.items.map((item, i) => (
                    <article
                      key={i}
                      className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            'mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full',
                            impactColors[item.impact]
                          )}
                          title={`${item.impact} impact`}
                        />
                        <div className="min-w-0">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {item.title}
                          </a>
                          <p className="mt-1 text-gray-600">{item.summary}</p>
                          <div className="mt-2 flex items-center gap-2 flex-wrap">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between border-t border-gray-200 pt-6">
            {newerWeek ? (
              <Link
                href={`/weekly/${newerWeek}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                &larr; Newer
              </Link>
            ) : (
              <span />
            )}
            {olderWeek ? (
              <Link
                href={`/weekly/${olderWeek}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Older &rarr;
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: PASS — both `/weekly` and `/weekly/2026-W14` routes are generated

**Step 3: Commit**

```bash
git add src/app/weekly/\[week\]/page.tsx
git commit -m "feat(weekly): add detail page with sections, impact dots, and navigation"
```

---

### Task 6: Navigation & Sitemap Integration

**Files:**
- Modify: `src/components/layout/Header.tsx:7-13` — add "Weekly" to navLinks
- Modify: `src/components/layout/Footer.tsx:57-68` — add "Weekly" link in About section
- Modify: `src/app/sitemap.ts` — add weekly entries

**Step 1: Add "Weekly" to Header navLinks**

In `src/components/layout/Header.tsx`, add to the `navLinks` array (after "Daily News"):

```typescript
const navLinks = [
  { label: 'Courses', href: '/courses' },
  { label: 'Daily News', href: '/news' },
  { label: 'Weekly', href: '/weekly' },
  { label: 'Services', href: '/services' },
  { label: 'Events', href: '/events' },
  { label: 'Get Involved', href: '/get-involved' },
];
```

**Step 2: Add "Weekly" to Footer**

In `src/components/layout/Footer.tsx`, add a new `<li>` after the "Daily News" link (around line 59):

```tsx
<li>
  <Link href="/weekly" className="text-sm text-gray-600 hover:text-gray-900">
    Weekly Updates
  </Link>
</li>
```

**Step 3: Add weekly to sitemap**

In `src/app/sitemap.ts`:

1. Add import: `import { getAllWeeks } from '@/lib/weekly';`
2. Add static page entry for `/weekly` (after the `/news` entry):
   ```typescript
   {
     url: `${siteUrl}/weekly`,
     lastModified: new Date(),
     changeFrequency: 'weekly',
     priority: 0.8,
   },
   ```
3. Add dynamic entries for individual weeks (before the return statement):
   ```typescript
   const weeks = await getAllWeeks();
   const weeklyPages: MetadataRoute.Sitemap = weeks.map((week) => ({
     url: `${siteUrl}/weekly/${week}`,
     lastModified: new Date(),
     changeFrequency: 'never' as const,
     priority: 0.5,
   }));
   ```
4. Add `...weeklyPages` to the return array.

**Step 4: Run full check suite**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: ALL PASS

**Step 5: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Footer.tsx src/app/sitemap.ts
git commit -m "feat(weekly): add nav links and sitemap integration"
```

---

### Task 7: Final Verification

**Step 1: Run all tests**

Run: `npx vitest run`
Expected: ALL PASS (both news and weekly tests)

**Step 2: Run full check suite**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: ALL PASS

**Step 3: Visual check**

Run: `npm run dev`
Verify:
- `/weekly` shows the W14 card with date range, summary, tags, item/section count
- `/weekly/2026-W14` shows all 5 sections with impact dots, tags, and items
- Header shows "Weekly" link
- Footer shows "Weekly Updates" link
- Dark mode works on both pages

**Step 4: Commit any fixes, then done**
