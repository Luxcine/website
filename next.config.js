/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'luxcine.vercel.app' }],
        destination: 'https://luxurycine.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
