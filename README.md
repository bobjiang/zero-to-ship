# 02Ship

A learning portal for non-programmers to build and ship their ideas using Claude Code and AI tools.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** JSON (courses) + MDX (blog)
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm

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
npx tsc --noEmit
```

## Project Structure

```
zero-to-ship/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and helpers
│   └── types/            # TypeScript type definitions
├── content/              # Course and blog content
│   ├── courses/          # Course series and lessons (JSON)
│   └── blog/             # Blog posts (MDX)
├── public/               # Static assets
└── docs/                 # Documentation
```

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
