'use client';

import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import { ReactNode } from 'react';

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <ClerkProvider>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Healthcare AI SEO</h1>
            <p className="text-xl text-gray-600 mb-8">Please sign in to access the platform</p>
            <a 
              href="/sign-in"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </SignedOut>
    </ClerkProvider>
  );
}
