import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/content';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords || 'AI coding, Claude AI, build with AI, learning platform',
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      siteName: '02Ship',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@02ship',
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.02ship.com';
  const url = `${siteUrl}/blog/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: '02Ship',
      url: siteUrl,
    },
    url: url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
              >
                <ArrowLeft className="h-4 w-4" weight="bold" />
                Back to Blog
              </Link>
            </div>

            <article>
              <header className="mb-10 border-b border-slate-200 pb-8 dark:border-slate-800">
                <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                  {post.title}
                </h1>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <time dateTime={post.date}>{post.date}</time>
                  <span aria-hidden="true">/</span>
                  <span>{post.author}</span>
                </div>
                <div className="mt-5">
                  <BookmarkButton contentType="blog" contentSlug={slug} />
                </div>
              </header>

              <div className="prose prose-lg prose-blue max-w-none dark:prose-invert prose-headings:font-black prose-a:font-bold">
                <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
              </div>
            </article>

            <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
              >
                <ArrowLeft className="h-4 w-4" weight="bold" />
                Back to Blog
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
