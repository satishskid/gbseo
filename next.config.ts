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
  
  // Enable static export for Netlify
  output: 'export',
  trailingSlash: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
  // Image optimization - disabled for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
