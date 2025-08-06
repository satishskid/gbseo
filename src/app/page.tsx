// Force dynamic rendering for authentication
export const dynamic = 'force-dynamic';

import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Home() {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🏥💡🎓 Healthcare EdTech AI SEO
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SignedOut>
          {/* Landing Page for Non-Authenticated Users */}
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Your Digital Health, Education & AI Solutions
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Generate comprehensive SEO strategies, content, and social media posts
              tailored specifically for healthcare, edtech, and AI businesses targeting the Indian market.
            </p>

            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">Healthcare</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">EdTech</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">AI Solutions</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">Pan India</span>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Keyword Research</h3>
                <p className="text-gray-600">Advanced keyword analysis focusing on healthcare urgency, educational intent, and AI implementation across Indian cities.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">Content Generation</h3>
                <p className="text-gray-600">SEO-optimized content and social media posts tailored for mobile-first Indian users with multi-language support.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Conversion Optimization</h3>
                <p className="text-gray-600">UPI integration, WhatsApp support, and cultural adaptations for maximum conversion rates in India.</p>
              </div>
            </div>

            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
                Get Started - Generate Your SEO Strategy
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          {/* Dashboard for Authenticated Users */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Your SEO Dashboard
            </h2>
            <p className="text-lg text-gray-600">
              Generate comprehensive SEO strategies for your healthcare, edtech, or AI business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold mb-2">Quick Start</h3>
              <p className="text-gray-600 mb-4">Begin with our guided SEO strategy generator</p>
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
                Start Now →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600 mb-4">Track your SEO performance and ROI</p>
              <Link href="/analytics" className="text-blue-600 hover:text-blue-800 font-medium">
                View Analytics →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-3">💎</div>
              <h3 className="text-lg font-semibold mb-2">Upgrade</h3>
              <p className="text-gray-600 mb-4">Unlock premium features and advanced AI</p>
              <Link href="/pricing" className="text-blue-600 hover:text-blue-800 font-medium">
                View Plans →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold mb-6">Recent Projects</h3>
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📋</div>
              <p>No projects yet. Create your first SEO strategy to get started!</p>
              <Link href="/dashboard" className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                Create Project
              </Link>
            </div>
          </div>
        </SignedIn>
      </main>
    </div>
    </ClerkProvider>
  );
}
