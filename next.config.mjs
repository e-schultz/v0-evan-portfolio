/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any necessary configuration here
  eslint: {
    // Comment out or remove this line to enable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Comment out or remove this line to enable TypeScript checks during builds
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com', 
      'public.blob.vercel-storage.com',
      'sjc.microlink.io'
    ],
    unoptimized: false,
  },
  // Explicitly set the output to be standalone to avoid issues with sharp
  output: 'standalone',
}

export default nextConfig
