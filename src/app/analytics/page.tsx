'use client';

import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Analytics() {
  return (
    <SignedIn>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">SEO Analytics Dashboard</h2>
            <p className="text-gray-600">Track your healthcare/edtech/AI SEO performance across India</p>
          </div>

          {/* Coming Soon Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center mb-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-2">Advanced Analytics Coming Soon</h3>
            <p className="text-lg opacity-90 mb-4">
              We&apos;re building comprehensive analytics to track your SEO performance, 
              keyword rankings, and conversion rates across all Indian cities.
            </p>
            <div className="bg-white bg-opacity-20 rounded-md p-4 max-w-2xl mx-auto">
              <p className="text-sm">
                Expected features: Real-time rankings, traffic analysis, conversion tracking, 
                competitor monitoring, and ROI reporting for healthcare/edtech/AI sectors.
              </p>
            </div>
          </div>

          {/* Sample Analytics Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Keywords</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <div className="text-2xl">🎯</div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Generate keywords to see data</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Content Pieces</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <div className="text-2xl">📝</div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Create content to track performance</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Est. Reach</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <div className="text-2xl">👥</div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Monthly estimated reach</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">SEO Score</p>
                  <p className="text-2xl font-bold text-gray-900">0%</p>
                </div>
                <div className="text-2xl">📈</div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Overall SEO health score</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Start Generating Your SEO Strategy</h3>
            <p className="text-gray-600 mb-6">
              Create your first SEO project to begin tracking analytics and performance metrics.
            </p>
            <Link 
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Create SEO Project
            </Link>
          </div>
        </div>
      </div>
    </SignedIn>
  );
}
