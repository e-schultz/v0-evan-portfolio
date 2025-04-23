/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any necessary configuration here
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com', 'sjc.microlink.io'],
    unoptimized: true,
  },
  // Explicitly set the output to be standalone to avoid issues with sharp
  output: 'standalone',
}

export default nextConfig
