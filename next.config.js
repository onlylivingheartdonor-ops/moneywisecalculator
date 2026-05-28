/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'moneywisecalculator.com' }],
        destination: 'https://www.moneywisecalculator.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
