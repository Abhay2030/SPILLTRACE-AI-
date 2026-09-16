import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Transpile Three.js packages for proper module resolution
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

export default nextConfig;
