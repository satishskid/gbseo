'use client';

import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Pricing() {
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
                  <Link href="/analytics" className="text-gray-600 hover:text-gray-900">Analytics</Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </div>
          </header>

          {/* Pricing Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                💰 Pricing Plans
              </h2>
              <p className="text-gray-600 mb-6">
                Affordable SEO automation for healthcare, edtech, and AI businesses in India.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">🎯 Built for Indian Market</h3>
                <ul className="text-green-700 space-y-1">
                  <li>• Pricing in INR with UPI/NetBanking support</li>
                  <li>• Plans starting from ₹999/month</li>
                  <li>• Mobile-first optimization for 78% Indian mobile users</li>
                  <li>• Local SEO for 50+ Indian cities</li>
                  <li>• Industry-specific templates for healthcare/edtech/AI</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                <p className="text-blue-800 font-semibold">
                  💼 Special Launch Offer: Free strategy generation for SKIDS Health team members
                </p>
              </div>

              <div className="text-center">
                <Link 
                  href="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block mr-4"
                >
                  Try Free Generation
                </Link>
                <Link 
                  href="/"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Healthcare AI SEO</h1>
              <p className="text-xl text-gray-600 mb-8">Please sign in to view pricing</p>
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
