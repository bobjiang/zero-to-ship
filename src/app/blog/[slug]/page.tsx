import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '@/components/ui/Container';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/content';

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
      title: 'Post Not Found - 02Ship',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${siteUrl}/blog/${slug}`;

  return {
    title: `${post.title} - 02Ship`,
    description: post.excerpt,
    keywords: post.keywords || 'AI coding, Claude AI, build with AI, learning platform',
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
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
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
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
      <div className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Link
              href="/blog"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              ← Back to Blog
            </Link>
          </div>

          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <time dateTime={post.date}>{post.date}</time>
                <span>•</span>
                <span>{post.author}</span>
              </div>
            </header>

            <div className="prose prose-lg prose-blue max-w-none">
              <MDXRemote source={post.content} />
            </div>
          </article>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <Link
              href="/blog"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </Container>
    </div>
    </>
  );
}
