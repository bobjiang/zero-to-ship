/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/weekly', destination: '/news', permanent: true },
      { source: '/weekly/:week', destination: '/news', permanent: true },
      {
        source: '/blog/weekly-anthropic-claude-updates',
        destination: '/news',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
