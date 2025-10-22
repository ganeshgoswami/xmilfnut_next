import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'https://api.badwap.fun/api/:path*' },
      { source: '/api/v1/:path*', destination: 'https://api.badwap.fun/api/v1/:path*' },
    ];
  },
  async redirects() {
    return [
      {
        source: '/video/:id',
        has: [
          {
            type: 'query',
            key: 'title',
            value: '(?<title>.*)',
          },
        ],
        destination: '/video/:id/:title',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
