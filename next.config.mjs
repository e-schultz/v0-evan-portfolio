/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com', 
      'public.blob.vercel-storage.com',
      '9yxzsogx6jrkcrnz.public.blob.vercel-storage.com',
      'sjc.microlink.io'
    ],
    unoptimized: false,
  },
  // Enable ESLint and TypeScript checks during builds
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Explicitly set the output to be standalone to avoid issues with sharp
  output: 'standalone',
};

export default nextConfig;
