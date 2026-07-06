import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { getAllBlogPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Blog - AI Coding Tips & Tutorials',
  description:
    'Tips, tutorials, and real build stories about creating projects with Claude Code and AI tools.',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <PageHeader
          eyebrow="Build notes"
          title="Blog"
          description="Tips, tutorials, and insights on building with AI tools."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          {posts.length > 0 ? (
            <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {posts.map((post) => (
                <article key={post.slug} className="py-7">
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-black tracking-tight text-slate-950 transition-colors hover:text-blue-600 dark:text-white">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {post.date} / {post.author}
                  </p>
                  <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
                  >
                    Read more
                    <ArrowUpRight className="h-4 w-4" weight="bold" />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No blog posts yet."
              description="Check back soon for tutorials and build notes."
            />
          )}
        </div>
      </Container>
    </div>
  );
}
