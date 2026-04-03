import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';
import { getAllBlogPosts } from '@/lib/content';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: { slug: string } }) {
  const posts = await getAllBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  return generateOgImage({
    title: post?.title || 'Blog Post',
    subtitle: post?.excerpt,
    tag: 'Blog',
    date: post?.date
      ? new Date(post.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : undefined,
  });
}
