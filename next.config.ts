import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export for Clerk compatibility
  // output: 'standalone',
  
  // Enable experimental features
  serverExternalPackages: ['@clerk/nextjs'],
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
  // Image optimization
  images: {
    domains: ['images.clerk.dev'],
    // unoptimized: true, // Only needed for static export
  },
};

export default nextConfig;
