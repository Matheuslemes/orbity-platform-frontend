/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.v0.app',
      },
      {
        protocol: 'https',
        hostname: 'cdn.seu-dominio.com',
      },
    ],
  },
  // Don't ignore TypeScript and ESLint errors
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
