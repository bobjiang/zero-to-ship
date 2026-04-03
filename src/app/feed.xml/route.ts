import { getAllBlogPosts } from '@/lib/content';
import { getAllNewsDates } from '@/lib/news';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.02ship.com';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const blogPosts = await getAllBlogPosts();
  const newsDates = await getAllNewsDates();

  const blogItems = blogPosts.map((post) => {
    const pubDate = new Date(post.date).toUTCString();
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt || post.title)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>Blog</category>
    </item>`;
  });

  const newsItems = newsDates.slice(0, 14).map((date) => {
    const pubDate = new Date(date).toUTCString();
    const formatted = new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    return `    <item>
      <title>AI News — ${escapeXml(formatted)}</title>
      <link>${siteUrl}/news/${date}</link>
      <guid isPermaLink="true">${siteUrl}/news/${date}</guid>
      <description>Top AI news for ${escapeXml(formatted)}, curated from leading AI research labs, companies, and open-source projects.</description>
      <pubDate>${pubDate}</pubDate>
      <category>Daily AI News</category>
    </item>`;
  });

  const allItems = [...blogItems, ...newsItems].join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>02Ship — Sydney&apos;s Claude Builder Community</title>
    <link>${siteUrl}</link>
    <description>Blog posts, daily AI news, and community updates from Sydney&apos;s Claude builder community.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${allItems}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
