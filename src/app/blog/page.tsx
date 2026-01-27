import { Container } from '@/components/ui/Container';
import { getAllBlogPosts } from '@/lib/content';

export const metadata = {
  title: 'Blog - Zero to Ship',
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
