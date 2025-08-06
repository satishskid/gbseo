import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint during build 
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Enable external packages
  serverExternalPackages: ['@clerk/nextjs'],
  
  // Use standalone output for Netlify functions
  output: 'standalone',
  trailingSlash: false,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
  // Image optimization
  images: {
    domains: ['images.clerk.dev'],
  },
};

export default nextConfig;
