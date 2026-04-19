export function resolveContentUrl(
  contentType: string,
  contentSlug: string,
  parentSlug: string
): string {
  switch (contentType) {
    case 'series':
      return `/courses/${contentSlug}`;
    case 'lesson':
      return `/courses/${parentSlug}/${contentSlug}`;
    case 'blog':
      return `/blog/${contentSlug}`;
    case 'news':
      return `/news/${contentSlug}`;
    default:
      return '/';
  }
}
