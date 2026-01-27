# 02Ship MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a learning portal for non-programmers to learn AI coding with Claude Code, featuring courses, blog, and community integration.

**Architecture:** Next.js 14 App Router with file-based content (JSON for courses, MDX for blog), Tailwind CSS styling, YouTube embeds for videos, and static generation for optimal performance.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, MDX, React

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`

**Step 1: Initialize Next.js with TypeScript**

Run:
```bash
npx create-next-app@14 . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

Expected: Creates Next.js 14 project with App Router, TypeScript, and Tailwind CSS

**Step 2: Verify installation**

Run:
```bash
npm run dev
```

Expected: Development server starts on http://localhost:3000

**Step 3: Stop dev server and commit**

Run:
```bash
git add .
git commit -m "feat: initialize Next.js 14 with TypeScript and Tailwind"
```

---

## Task 2: Project Structure Setup

**Files:**
- Create: `src/types/course.ts`
- Create: `src/types/blog.ts`
- Create: `src/lib/utils.ts`

**Step 1: Move app directory into src**

Run:
```bash
mkdir -p src
mv app src/
```

Expected: `src/app/` directory created

**Step 2: Create types directory and course types**

Create: `src/types/course.ts`
```typescript
export interface Lesson {
  slug: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  transcript?: string;
  order: number;
}

export interface Series {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: Lesson[];
  order: number;
}
```

**Step 3: Create blog types**

Create: `src/types/blog.ts`
```typescript
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
}
```

**Step 4: Create utility functions**

Create: `src/lib/utils.ts`
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 5: Install required dependencies**

Run:
```bash
npm install clsx tailwind-merge
npm install --save-dev @types/node
```

Expected: Dependencies installed successfully

**Step 6: Verify TypeScript config**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 7: Commit**

Run:
```bash
git add .
git commit -m "feat: setup project structure with types and utilities"
```

---

## Task 3: Content Structure Setup

**Files:**
- Create: `content/courses/zero-to-ship/series.json`
- Create: `content/blog/.gitkeep`
- Create: `public/images/.gitkeep`
- Create: `src/lib/content.ts`

**Step 1: Create content directories**

Run:
```bash
mkdir -p content/courses/zero-to-ship
mkdir -p content/blog
mkdir -p public/images
touch content/blog/.gitkeep
touch public/images/.gitkeep
```

Expected: Directory structure created

**Step 2: Create sample series metadata**

Create: `content/courses/zero-to-ship/series.json`
```json
{
  "slug": "zero-to-ship",
  "title": "02Ship: Building with Claude Code",
  "description": "Learn to build and ship your ideas using Claude Code, even with zero coding experience.",
  "thumbnail": "/images/zero-to-ship-thumbnail.jpg",
  "order": 1,
  "lessons": []
}
```

**Step 3: Create content fetching utilities**

Create: `src/lib/content.ts`
```typescript
import fs from 'fs/promises';
import path from 'path';
import { Series, Lesson } from '@/types/course';
import { BlogPost } from '@/types/blog';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const COURSES_DIR = path.join(CONTENT_DIR, 'courses');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');

export async function getAllSeries(): Promise<Series[]> {
  try {
    const seriesDirs = await fs.readdir(COURSES_DIR);
    const seriesPromises = seriesDirs
      .filter(dir => !dir.startsWith('.'))
      .map(async (seriesSlug) => {
        const seriesPath = path.join(COURSES_DIR, seriesSlug, 'series.json');
        const content = await fs.readFile(seriesPath, 'utf-8');
        const series: Series = JSON.parse(content);

        // Load lessons for this series
        const lessonsDir = path.join(COURSES_DIR, seriesSlug);
        const files = await fs.readdir(lessonsDir);
        const lessonFiles = files.filter(f => f.startsWith('lesson-') && f.endsWith('.json'));

        const lessons = await Promise.all(
          lessonFiles.map(async (file) => {
            const lessonPath = path.join(lessonsDir, file);
            const lessonContent = await fs.readFile(lessonPath, 'utf-8');
            return JSON.parse(lessonContent) as Lesson;
          })
        );

        return { ...series, lessons: lessons.sort((a, b) => a.order - b.order) };
      });

    const series = await Promise.all(seriesPromises);
    return series.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error loading series:', error);
    return [];
  }
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  try {
    const allSeries = await getAllSeries();
    return allSeries.find(s => s.slug === slug) || null;
  } catch (error) {
    console.error(`Error loading series ${slug}:`, error);
    return null;
  }
}

export async function getLessonBySlug(
  seriesSlug: string,
  lessonSlug: string
): Promise<Lesson | null> {
  try {
    const series = await getSeriesBySlug(seriesSlug);
    if (!series) return null;
    return series.lessons.find(l => l.slug === lessonSlug) || null;
  } catch (error) {
    console.error(`Error loading lesson ${seriesSlug}/${lessonSlug}:`, error);
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const mdxFiles = files.filter(f => f.endsWith('.mdx'));

    // For now, return empty array - we'll implement MDX parsing later
    return [];
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}
```

**Step 4: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 5: Commit**

Run:
```bash
git add .
git commit -m "feat: setup content structure and fetching utilities"
```

---

## Task 4: UI Components - Container

**Files:**
- Create: `src/components/ui/Container.tsx`

**Step 1: Create Container component**

Create: `src/components/ui/Container.tsx`
```typescript
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
```

**Step 2: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 3: Commit**

Run:
```bash
git add src/components/ui/Container.tsx
git commit -m "feat: add Container UI component"
```

---

## Task 5: UI Components - Button

**Files:**
- Create: `src/components/ui/Button.tsx`

**Step 1: Create Button component**

Create: `src/components/ui/Button.tsx`
```typescript
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600': variant === 'primary',
            'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500': variant === 'secondary',
            'border-2 border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500': variant === 'outline',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

**Step 2: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 3: Commit**

Run:
```bash
git add src/components/ui/Button.tsx
git commit -m "feat: add Button UI component"
```

---

## Task 6: UI Components - Card

**Files:**
- Create: `src/components/ui/Card.tsx`

**Step 1: Create Card component**

Create: `src/components/ui/Card.tsx`
```typescript
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-lg border border-gray-200 bg-white p-6 shadow-sm', className)}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return <h3 className={cn('text-xl font-semibold text-gray-900', className)}>{children}</h3>;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return <p className={cn('mt-2 text-sm text-gray-600', className)}>{children}</p>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('', className)}>{children}</div>;
}
```

**Step 2: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 3: Commit**

Run:
```bash
git add src/components/ui/Card.tsx
git commit -m "feat: add Card UI components"
```

---

## Task 7: Layout Components - Header

**Files:**
- Create: `src/components/layout/Header.tsx`

**Step 1: Create Header component**

Create: `src/components/layout/Header.tsx`
```typescript
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              02Ship
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/courses" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Courses
              </Link>
              <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Blog
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://discord.gg/btqaA3hzKp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Discord
            </a>
            <a
              href="https://github.com/bobjiang/zero-to-ship/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Forum
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
```

**Step 2: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 3: Commit**

Run:
```bash
git add src/components/layout/Header.tsx
git commit -m "feat: add Header layout component"
```

---

## Task 8: Layout Components - Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

**Step 1: Create Footer component**

Create: `src/components/layout/Footer.tsx`
```typescript
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">02Ship</h3>
              <p className="mt-4 text-sm text-gray-600">
                Learn to build and ship your ideas using AI coding tools.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Learn</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/courses" className="text-sm text-gray-600 hover:text-gray-900">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Community</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="https://discord.gg/btqaA3hzKp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/bobjiang/zero-to-ship/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Forum
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">About</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600">
              © {currentYear} 02Ship. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
```

**Step 2: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 3: Commit**

Run:
```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer layout component"
```

---

## Task 9: Root Layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Step 1: Update root layout**

Modify: `src/app/layout.tsx`
```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "02Ship - Learn AI Coding",
  description: "Learn to build and ship your ideas using Claude Code and AI tools, even with zero coding experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
```

**Step 2: Update global styles**

Modify: `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply antialiased;
  }

  body {
    @apply bg-white text-gray-900;
  }
}
```

**Step 3: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 4: Test in browser**

Run:
```bash
npm run dev
```

Expected: Development server starts, open http://localhost:3000 to see Header and Footer

**Step 5: Stop dev server and commit**

Run:
```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: update root layout with Header and Footer"
```

---

## Task 10: Landing Page

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Create landing page**

Modify: `src/app/page.tsx`
```typescript
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Build Your Ideas with AI
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Learn to build and ship your ideas using Claude Code, even with zero coding experience.
              Step-by-step courses designed for absolute beginners.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/courses">
                <Button size="lg">Start Learning</Button>
              </Link>
              <a
                href="https://discord.gg/btqaA3hzKp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  Join Community
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to start building
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From complete beginner to shipping your first project
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Step-by-Step Courses
              </h3>
              <p className="mt-4 text-gray-600">
                Follow along with video lessons that break down complex concepts into easy-to-understand steps.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Hands-On Practice
              </h3>
              <p className="mt-4 text-gray-600">
                Build real projects alongside the lessons and ship them to the world.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Community Support
              </h3>
              <p className="mt-4 text-gray-600">
                Join our Discord and forum to get help, share progress, and connect with others.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to start building?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join hundreds of learners turning their ideas into reality
            </p>
            <div className="mt-8">
              <Link href="/courses">
                <Button size="lg">Browse Courses</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
```

**Step 2: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 3: Test in browser**

Run:
```bash
npm run dev
```

Expected: Landing page displays with hero, features, and CTA sections

**Step 4: Stop dev server and commit**

Run:
```bash
git add src/app/page.tsx
git commit -m "feat: create landing page with hero and features"
```

---

## Task 11: Courses Page

**Files:**
- Create: `src/app/courses/page.tsx`
- Create: `src/components/courses/SeriesCard.tsx`

**Step 1: Create SeriesCard component**

Create: `src/components/courses/SeriesCard.tsx`
```typescript
import Link from 'next/link';
import { Series } from '@/types/course';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

interface SeriesCardProps {
  series: Series;
}

export function SeriesCard({ series }: SeriesCardProps) {
  const lessonCount = series.lessons.length;

  return (
    <Link href={`/courses/${series.slug}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>{series.title}</CardTitle>
          <CardDescription>{series.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
```

**Step 2: Create courses page**

Create: `src/app/courses/page.tsx`
```typescript
import { Container } from '@/components/ui/Container';
import { SeriesCard } from '@/components/courses/SeriesCard';
import { getAllSeries } from '@/lib/content';

export const metadata = {
  title: 'Courses - 02Ship',
  description: 'Browse our courses and start learning to build with AI tools.',
};

export default async function CoursesPage() {
  const allSeries = await getAllSeries();

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Courses
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Step-by-step video courses to help you build and ship your ideas
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allSeries.length > 0 ? (
            allSeries.map((series) => (
              <SeriesCard key={series.slug} series={series} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              <p>No courses available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
```

**Step 3: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 4: Commit**

Run:
```bash
git add src/app/courses/page.tsx src/components/courses/SeriesCard.tsx
git commit -m "feat: create courses catalog page"
```

---

## Task 12: Series Detail Page

**Files:**
- Create: `src/app/courses/[series]/page.tsx`
- Create: `src/components/courses/LessonCard.tsx`

**Step 1: Create LessonCard component**

Create: `src/components/courses/LessonCard.tsx`
```typescript
import Link from 'next/link';
import { Lesson } from '@/types/course';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

interface LessonCardProps {
  lesson: Lesson;
  seriesSlug: string;
}

export function LessonCard({ lesson, seriesSlug }: LessonCardProps) {
  return (
    <Link href={`/courses/${seriesSlug}/${lesson.slug}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{lesson.title}</CardTitle>
              <CardDescription className="mt-1">{lesson.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{lesson.duration}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
```

**Step 2: Create series detail page**

Create: `src/app/courses/[series]/page.tsx`
```typescript
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { LessonCard } from '@/components/courses/LessonCard';
import { getSeriesBySlug, getAllSeries } from '@/lib/content';

interface SeriesPageProps {
  params: Promise<{
    series: string;
  }>;
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries();
  return allSeries.map((series) => ({
    series: series.slug,
  }));
}

export async function generateMetadata({ params }: SeriesPageProps) {
  const { series: seriesSlug } = await params;
  const series = await getSeriesBySlug(seriesSlug);

  if (!series) {
    return {
      title: 'Series Not Found - 02Ship',
    };
  }

  return {
    title: `${series.title} - 02Ship`,
    description: series.description,
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series: seriesSlug } = await params;
  const series = await getSeriesBySlug(seriesSlug);

  if (!series) {
    notFound();
  }

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {series.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{series.description}</p>
          <p className="mt-2 text-sm text-gray-600">
            {series.lessons.length} {series.lessons.length === 1 ? 'lesson' : 'lessons'}
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {series.lessons.length > 0 ? (
            series.lessons.map((lesson) => (
              <LessonCard key={lesson.slug} lesson={lesson} seriesSlug={series.slug} />
            ))
          ) : (
            <div className="text-center text-gray-600">
              <p>No lessons available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
```

**Step 3: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 4: Commit**

Run:
```bash
git add src/app/courses/[series]/page.tsx src/components/courses/LessonCard.tsx
git commit -m "feat: create series detail page with lesson list"
```

---

## Task 13: Lesson Detail Page with Video

**Files:**
- Create: `src/app/courses/[series]/[lesson]/page.tsx`
- Create: `src/components/courses/VideoPlayer.tsx`

**Step 1: Create VideoPlayer component**

Create: `src/components/courses/VideoPlayer.tsx`
```typescript
interface VideoPlayerProps {
  youtubeId: string;
  title: string;
}

export function VideoPlayer({ youtubeId, title }: VideoPlayerProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
```

**Step 2: Create lesson detail page**

Create: `src/app/courses/[series]/[lesson]/page.tsx`
```typescript
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { VideoPlayer } from '@/components/courses/VideoPlayer';
import { Button } from '@/components/ui/Button';
import { getLessonBySlug, getSeriesBySlug, getAllSeries } from '@/lib/content';

interface LessonPageProps {
  params: Promise<{
    series: string;
    lesson: string;
  }>;
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries();
  const params: { series: string; lesson: string }[] = [];

  for (const series of allSeries) {
    for (const lesson of series.lessons) {
      params.push({
        series: series.slug,
        lesson: lesson.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { series: seriesSlug, lesson: lessonSlug } = await params;
  const lesson = await getLessonBySlug(seriesSlug, lessonSlug);

  if (!lesson) {
    return {
      title: 'Lesson Not Found - 02Ship',
    };
  }

  return {
    title: `${lesson.title} - 02Ship`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { series: seriesSlug, lesson: lessonSlug } = await params;
  const lesson = await getLessonBySlug(seriesSlug, lessonSlug);
  const series = await getSeriesBySlug(seriesSlug);

  if (!lesson || !series) {
    notFound();
  }

  const currentIndex = series.lessons.findIndex((l) => l.slug === lessonSlug);
  const previousLesson = currentIndex > 0 ? series.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < series.lessons.length - 1 ? series.lessons[currentIndex + 1] : null;

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <Link
              href={`/courses/${seriesSlug}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              ← Back to {series.title}
            </Link>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {lesson.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{lesson.description}</p>
          <p className="mt-2 text-sm text-gray-600">Duration: {lesson.duration}</p>

          <div className="mt-8">
            <VideoPlayer youtubeId={lesson.youtubeId} title={lesson.title} />
          </div>

          {lesson.transcript && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Transcript</h2>
              <div className="mt-4 whitespace-pre-wrap text-gray-600">
                {lesson.transcript}
              </div>
            </div>
          )}

          <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-8">
            <div>
              {previousLesson ? (
                <Link href={`/courses/${seriesSlug}/${previousLesson.slug}`}>
                  <Button variant="outline">← Previous Lesson</Button>
                </Link>
              ) : (
                <div />
              )}
            </div>
            <div>
              {nextLesson ? (
                <Link href={`/courses/${seriesSlug}/${nextLesson.slug}`}>
                  <Button>Next Lesson →</Button>
                </Link>
              ) : (
                <Link href={`/courses/${seriesSlug}`}>
                  <Button variant="outline">Back to Course</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
```

**Step 3: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 4: Commit**

Run:
```bash
git add src/app/courses/[series]/[lesson]/page.tsx src/components/courses/VideoPlayer.tsx
git commit -m "feat: create lesson detail page with video player"
```

---

## Task 14: Blog Listing Page

**Files:**
- Create: `src/app/blog/page.tsx`

**Step 1: Create blog listing page**

Create: `src/app/blog/page.tsx`
```typescript
import { Container } from '@/components/ui/Container';
import { getAllBlogPosts } from '@/lib/content';

export const metadata = {
  title: 'Blog - 02Ship',
  description: 'Tips, tutorials, and insights on building with AI tools.',
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Tips, tutorials, and insights on building with AI tools
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          {posts.length > 0 ? (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.slug} className="border-b border-gray-200 pb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    {post.date} • {post.author}
                  </p>
                  <p className="mt-4 text-gray-600">{post.excerpt}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
```

**Step 2: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 3: Commit**

Run:
```bash
git add src/app/blog/page.tsx
git commit -m "feat: create blog listing page"
```

---

## Task 15: About Page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1: Create about page**

Create: `src/app/about/page.tsx`
```typescript
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'About - 02Ship',
  description: 'Learn more about 02Ship and our mission to make AI coding accessible to everyone.',
};

export default function AboutPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About 02Ship
          </h1>

          <div className="mt-8 space-y-6 text-lg text-gray-600">
            <p>
              02Ship is a learning platform designed to help absolute beginners build and ship
              their ideas using AI coding tools like Claude Code.
            </p>

            <p>
              We believe that everyone should have the ability to bring their ideas to life, regardless
              of their coding experience. With AI tools, the barrier to entry has never been lower.
            </p>

            <p>
              Our step-by-step courses break down complex concepts into easy-to-understand lessons,
              so you can go from zero to shipping your first project in no time.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">Join Our Community</h2>
            <p className="mt-4 text-lg text-gray-600">
              Connect with other learners, get help, and share your progress.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://discord.gg/btqaA3hzKp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>Join Discord</Button>
              </a>
              <a
                href="https://github.com/bobjiang/zero-to-ship/discussions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Visit Forum</Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
```

**Step 2: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 3: Commit**

Run:
```bash
git add src/app/about/page.tsx
git commit -m "feat: create about page"
```

---

## Task 16: Environment Configuration

**Files:**
- Create: `.env.example`
- Create: `.env.local`

**Step 1: Create environment example file**

Create: `.env.example`
```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Future: Supabase
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

**Step 2: Create local environment file**

Create: `.env.local`
```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Step 3: Update .gitignore to ensure .env.local is ignored**

Run:
```bash
grep -q "^\.env\.local$" .gitignore || echo ".env.local" >> .gitignore
```

Expected: .env.local added to .gitignore if not already present

**Step 4: Commit**

Run:
```bash
git add .env.example .gitignore
git commit -m "feat: add environment configuration"
```

---

## Task 17: Sample Course Content

**Files:**
- Create: `content/courses/zero-to-ship/lesson-01-introduction.json`
- Modify: `content/courses/zero-to-ship/series.json`

**Step 1: Create first sample lesson**

Create: `content/courses/zero-to-ship/lesson-01-introduction.json`
```json
{
  "slug": "introduction",
  "title": "Introduction to Claude Code",
  "description": "Learn what Claude Code is and how it can help you build your ideas without prior coding experience.",
  "youtubeId": "dQw4w9WgXcQ",
  "duration": "5:30",
  "order": 1,
  "transcript": "Welcome to 02Ship!\n\nIn this course, you'll learn how to use Claude Code to build and ship your ideas, even if you've never written a line of code before.\n\nClaude Code is an AI-powered coding assistant that helps you write code through natural conversation. Instead of memorizing syntax and programming concepts, you can describe what you want to build in plain English, and Claude Code will help you create it.\n\nThroughout this course, we'll build real projects together, and by the end, you'll have shipped your first application to the web.\n\nLet's get started!"
}
```

**Step 2: Update series.json with lesson reference**

Modify: `content/courses/zero-to-ship/series.json`
```json
{
  "slug": "zero-to-ship",
  "title": "02Ship: Building with Claude Code",
  "description": "Learn to build and ship your ideas using Claude Code, even with zero coding experience.",
  "thumbnail": "/images/zero-to-ship-thumbnail.jpg",
  "order": 1,
  "lessons": []
}
```

Note: The lessons array will be populated automatically by the content loader from individual lesson files.

**Step 3: Commit**

Run:
```bash
git add content/
git commit -m "feat: add sample course content"
```

---

## Task 18: Build and Test

**Files:**
- None (testing only)

**Step 1: Run type check**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 2: Run linting**

Run:
```bash
npm run lint
```

Expected: No linting errors (or only minor warnings)

**Step 3: Build for production**

Run:
```bash
npm run build
```

Expected: Production build completes successfully

**Step 4: Test production build locally**

Run:
```bash
npm start
```

Expected: Production server starts, verify all pages work at http://localhost:3000

**Step 5: Stop server and verify all routes**

Test these routes:
- `/` - Landing page
- `/courses` - Course catalog
- `/courses/zero-to-ship` - Series detail
- `/courses/zero-to-ship/introduction` - Lesson with video
- `/blog` - Blog listing
- `/about` - About page

Expected: All pages render without errors

**Step 6: Commit if any fixes were needed**

If you made any fixes during testing:
```bash
git add .
git commit -m "fix: resolve build and testing issues"
```

---

## Task 19: Vercel Deployment Configuration

**Files:**
- Create: `vercel.json`

**Step 1: Create Vercel configuration**

Create: `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

**Step 2: Verify configuration**

Run:
```bash
cat vercel.json
```

Expected: Configuration file displays correctly

**Step 3: Commit**

Run:
```bash
git add vercel.json
git commit -m "feat: add Vercel deployment configuration"
```

---

## Task 20: Final Documentation

**Files:**
- Modify: `README.md`

**Step 1: Update README with complete instructions**

Modify: `README.md`
```markdown
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
```

**Step 2: Verify no type errors**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors

**Step 3: Final build test**

Run:
```bash
npm run build
```

Expected: Build completes successfully

**Step 4: Final commit**

Run:
```bash
git add README.md
git commit -m "docs: update README with complete setup instructions"
```

**Step 5: Create summary of work**

Run:
```bash
git log --oneline
```

Expected: List of all commits showing the complete implementation

---

## Completion Checklist

- [ ] Next.js 14 project initialized with TypeScript and Tailwind
- [ ] Project structure setup with proper directories
- [ ] Type definitions for courses and blog posts
- [ ] Content loading utilities
- [ ] UI components (Container, Button, Card)
- [ ] Layout components (Header, Footer)
- [ ] Landing page with hero and features
- [ ] Courses catalog page
- [ ] Series detail page with lesson list
- [ ] Lesson detail page with YouTube video player
- [ ] Blog listing page
- [ ] About page
- [ ] Environment configuration
- [ ] Sample course content
- [ ] Production build tested
- [ ] Vercel deployment configuration
- [ ] Documentation updated

## Next Steps (Future Enhancements)

1. **MDX Blog Posts:** Implement MDX parsing in `src/lib/content.ts`
2. **Database Integration:** Add Supabase for user progress tracking
3. **Authentication:** Implement NextAuth.js for user accounts
4. **Search Functionality:** Add search across courses and blog
5. **Dark Mode:** Implement theme toggle
6. **Comments:** Add comment system for lessons and blog posts
7. **Analytics:** Add tracking for lesson completion and engagement
8. **Mobile Navigation:** Add responsive mobile menu
9. **SEO Optimization:** Add sitemap and enhanced metadata
10. **Performance:** Optimize images and implement lazy loading
