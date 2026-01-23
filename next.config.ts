import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    // 生产环境移除 console.log，但保留 warn 和 error
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['warn', 'error'] }
        : false,
  },
  turbopack: {
    root: __dirname,
  },
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/socket.io',
        destination: 'http://127.0.0.1:4000/socket.io/',
      },
      {
        source: '/socket.io/:path*',
        destination: 'http://127.0.0.1:4000/socket.io/:path*',
      },
    ]
  },
}

export default withNextIntl(nextConfig)
