import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization configuration
  images: {
    domains: ['api.badwap.fun'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // API rewrites
  async rewrites() {
    return [
      { 
        source: '/api/:path*', 
        destination: 'https://api.badwap.fun/api/:path*' 
      },
      { 
        source: '/api/v1/:path*', 
        destination: 'https://api.badwap.fun/api/v1/:path*' 
      },
    ];
  },
  
  // URL redirects
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

  // Webpack configuration for better bundle optimization
  webpack: (config) => {
    return config;
  },

  // Enable React strict mode
  reactStrictMode: true,
};

export default nextConfig;