'use client';

import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Analytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <SignedIn>
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <Link href="/" className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    🏥💡🎓 Healthcare EdTech AI SEO
                  </h1>
                </Link>
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                  <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </div>
          </header>

          {/* Analytics Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                📊 Analytics Dashboard
              </h2>
              <p className="text-gray-600 mb-6">
                Advanced SEO analytics and performance tracking for the Indian market.
              </p>
              
              <div className="bg-purple-50 border border-purple-200 rounded-md p-4 mb-6">
                <h3 className="font-semibold text-purple-800 mb-2">🔮 Coming Soon</h3>
                <ul className="text-purple-700 space-y-1">
                  <li>• Real-time keyword ranking tracking</li>
                  <li>• Traffic analysis and conversion metrics</li>
                  <li>• Competitor monitoring for healthcare/edtech/AI</li>
                  <li>• ROI reporting and performance insights</li>
                  <li>• City-wise performance breakdowns</li>
                </ul>
              </div>

              <div className="text-center">
                <Link 
                  href="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Healthcare AI SEO</h1>
              <p className="text-xl text-gray-600 mb-8">Please sign in to access analytics</p>
              <Link 
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </SignedOut>
      </div>
    </ClerkProvider>
  );
}
