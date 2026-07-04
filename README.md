# 02Ship

A learning portal and community site for non-programmers and AI builders using Claude Code and related AI tools.

## Tech Stack

- **Framework:** Next.js 16 App Router + React 19
- **Language:** TypeScript strict
- **Styling:** Tailwind CSS
- **Content:** JSON (courses, news, ships, events) + MDX (blog)
- **Auth/database:** Supabase Auth + Postgres
- **Event state:** Upstash Redis
- **Testing:** Vitest, Testing Library, Playwright
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 20.9+ and npm. Node 22 is used in CI and is recommended locally.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bobjiang/zero-to-ship.git
cd zero-to-ship
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Start development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type check
npm run typecheck

# Run unit tests
npm run test

# Run the main verification gate
npm run verify
```

## Project Structure

```
zero-to-ship/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and helpers
│   └── types/            # TypeScript type definitions
├── content/              # Course, blog, news, ships, and event content
│   ├── courses/          # Course series and lessons (JSON)
│   ├── blog/             # Blog posts (MDX)
│   ├── news/             # Daily AI news JSON
│   ├── ships/            # Project showcase JSON
│   └── events/           # Event configuration JSON
├── supabase/             # Local Supabase config and migrations
├── public/               # Static assets
└── docs/                 # Documentation
```

## Product Areas

- **Learning portal:** courses, lessons, blog posts, and daily AI news.
- **Membership:** Supabase-backed login/signup, member dashboard, bookmarks, and lesson progress.
- **Ships showcase:** community project profiles under `/ships`.
- **Events:** Lu.ma event page plus lightning-talk submission, voting, and admin moderation.
- **Automation:** GitHub Actions generate daily AI news and post summaries to Discord/Telegram.

## Adding Content

### Adding a Course Series

1. Create a directory in `content/courses/[series-slug]/`
2. Add `series.json` with metadata:
```json
{
  "slug": "series-slug",
  "title": "Series Title",
  "description": "Series description",
  "thumbnail": "/images/thumbnail.jpg",
  "order": 1,
  "lessons": []
}
```

### Adding a Lesson

Create `lesson-XX-slug.json` in the series directory:
```json
{
  "slug": "lesson-slug",
  "title": "Lesson Title",
  "description": "Lesson description",
  "youtubeId": "VIDEO_ID",
  "duration": "10:30",
  "order": 1,
  "transcript": "Optional transcript text..."
}
```

### Adding a Blog Post

Create an MDX file in `content/blog/`:
```mdx
---
title: "Post Title"
excerpt: "Post excerpt"
date: "2024-01-27"
author: "Author Name"
---

Post content here...
```

## Community

- **Discord:** https://discord.gg/btqaA3hzKp
- **Forum:** https://github.com/bobjiang/zero-to-ship/discussions

## License

MIT License - see [LICENSE](LICENSE) for details

## Lightning Talk Voting

Single-event submission + voting tool under `/submit`, `/vote`, and `/admin`.

**Required env vars** (see `.env.example`):

- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` — Upstash Redis. Legacy `KV_REST_API_URL` / `KV_REST_API_TOKEN` are still accepted.
- `ADMIN_TOKEN` — used for admin login and session-cookie signing; generate 32+ random bytes
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase Auth/Postgres
- `NEXT_PUBLIC_SITE_URL` — canonical site URL used by metadata and sitemaps
- `NEXT_PUBLIC_GA_ID` — optional Google Analytics measurement ID

## Voting Integrity

The lightning-talk voting flow intentionally uses an anonymous `zts_voter` cookie for casual in-room events. Clearing cookies can create a fresh voter identity. If a future event needs stronger integrity, tie voting to Supabase auth or verified email before opening voting.

**Event config:** edit `content/events/lightning-talk.json` and redeploy. Runtime edits are not supported.

**QR codes:** generate PNGs from the production URLs (`/submit` and `/vote`) using any external QR generator, then drop them into `public/events/` as `lightning-talk-qr-submit.png` and `lightning-talk-qr-vote.png`. Regenerate if the production domain changes.

**After the event:** keep `content/events/lightning-talk.json` as an archive; purge KV data with a one-off script if desired.
