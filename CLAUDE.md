# CLAUDE.md - Project Context for AI Assistants

## Project Overview

**02Ship** is a learning portal for non-programmers to build and ship their ideas using Claude Code and similar AI coding tools. The platform provides step-by-step courses, instructional videos (YouTube embeds), and community support.

**Target audience:** Absolute beginners with no coding experience.

## Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Framework  | Next.js 14 (App Router)       |
| Language   | TypeScript (strict mode)      |
| Styling    | Tailwind CSS                  |
| Content    | MDX (blog), JSON (courses)    |
| Videos     | YouTube embeds                |
| Hosting    | Vercel                        |
| Community  | Discord + GitHub Discussions  |

**Future:** Supabase (database), NextAuth.js (auth), tRPC (API)

## Project Structure

```
zero-to-ship/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page (/)
│   │   ├── globals.css         # Global styles
│   │   ├── courses/
│   │   │   ├── page.tsx        # /courses
│   │   │   └── [series]/
│   │   │       ├── page.tsx    # /courses/[series]
│   │   │       └── [lesson]/
│   │   │           └── page.tsx # /courses/[series]/[lesson]
│   │   ├── blog/
│   │   │   ├── page.tsx        # /blog
│   │   │   └── [slug]/page.tsx # /blog/[slug]
│   │   └── about/page.tsx      # /about
│   ├── components/
│   │   ├── ui/                 # Button, Card, Container, etc.
│   │   ├── layout/             # Header, Footer, Navigation
│   │   └── courses/            # VideoPlayer, LessonCard, etc.
│   ├── lib/
│   │   ├── utils.ts            # Helper functions
│   │   └── content.ts          # Content fetching utilities
│   └── types/
│       ├── course.ts           # Series, Lesson types
│       └── blog.ts             # BlogPost type
├── content/                    # Content files (outside src/)
│   ├── courses/
│   │   ├── zero-to-ship/       # Series directory
│   │   │   ├── series.json     # Series metadata
│   │   │   └── lesson-*.json   # Lesson files
│   │   └── claude-basics/
│   └── blog/
│       └── *.mdx               # Blog posts
└── public/images/              # Static assets
```

## Key Types

```typescript
// Series metadata
interface Series {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: Lesson[];
  order: number;
}

// Individual lesson
interface Lesson {
  slug: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  transcript?: string;
  order: number;
}

// Blog post
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
}
```

## Routes

| Route                          | Description                              |
|--------------------------------|------------------------------------------|
| `/`                            | Landing page with hero, courses preview  |
| `/courses`                     | Course catalog (all series)              |
| `/courses/[series]`            | Series overview with lesson list         |
| `/courses/[series]/[lesson]`   | Lesson page with video + notes           |
| `/blog`                        | Blog listing                             |
| `/blog/[slug]`                 | Individual blog post (MDX)               |
| `/about`                       | About page + community links             |

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Type check
npx tsc --noEmit
```

## Conventions

### Code Style
- Use TypeScript strict mode
- Prefer named exports over default exports
- Use `cn()` utility for conditional Tailwind classes
- Components go in `src/components/` organized by feature

### Content
- Course series: `content/courses/[series-slug]/`
- Each series has `series.json` for metadata
- Lessons are `lesson-XX-slug.json` files
- Blog posts are MDX files in `content/blog/`

### Styling
- Tailwind CSS with custom theme in `tailwind.config.ts`
- Dark mode support (class-based toggle)
- Mobile-first responsive design
- WCAG 2.1 AA accessibility

### Components
- UI primitives in `src/components/ui/`
- Layout components in `src/components/layout/`
- Feature-specific in `src/components/[feature]/`

## Community Links

- Discord: https://discord.gg/btqaA3hzKp
- Forum: https://github.com/bobjiang/zero-to-ship/discussions

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
# Required
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Future: Supabase
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Important Notes

1. **Content is static** - No database initially; courses/blog loaded from files
2. **No auth required** - All content is public for now
3. **YouTube embeds** - Use `youtubeId` field, not full URLs
4. **Transcripts** - Optional but recommended for accessibility
5. **SEO** - Each page should have proper metadata (title, description, OG tags)
