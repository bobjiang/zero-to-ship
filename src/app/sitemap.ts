import { MetadataRoute } from 'next';
import { getAllSeries, getAllBlogPosts } from '@/lib/content';
import { getAllNewsDates } from '@/lib/news';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.02ship.com';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const allSeries = await getAllSeries();
  const coursePages: MetadataRoute.Sitemap = allSeries.flatMap((series) => [
    {
      url: `${siteUrl}/courses/${series.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...series.lessons.map((lesson) => ({
      url: `${siteUrl}/courses/${series.slug}/${lesson.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]);

  const blogPosts = await getAllBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const newsDates = await getAllNewsDates();
  const newsPages: MetadataRoute.Sitemap = newsDates.map((date) => ({
    url: `${siteUrl}/news/${date}`,
    lastModified: new Date(date),
    changeFrequency: 'never' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...coursePages, ...blogPages, ...newsPages];
}
