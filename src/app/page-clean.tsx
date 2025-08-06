import Link from 'next/link'

export default function Home() {
  return (
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
              <Link href="/analytics" className="text-gray-600 hover:text-gray-900">Analytics</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link 
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-6xl mb-8">
            AI-Powered SEO for<br />
            <span className="text-blue-600">Healthcare & EdTech</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Generate comprehensive SEO strategies, keyword research, and content 
            tailored for the Indian healthcare and education technology market.
          </p>
          
          <div className="flex justify-center space-x-4 mb-16">
            <Link 
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/pricing"
              className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-md text-lg font-medium border border-gray-300 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Keywords</h3>
            <p className="text-gray-600">
              AI-powered keyword research specifically for Indian healthcare and edtech markets
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Content Strategy</h3>
            <p className="text-gray-600">
              Complete SEO content plans with implementation guidance and best practices
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile-First</h3>
            <p className="text-gray-600">
              Optimized for Indian mobile users - 78% of healthcare searches are on mobile
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">₹8.6T</div>
              <div className="text-gray-600">Healthcare Market</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">₹750B</div>
              <div className="text-gray-600">EdTech Market</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
              <div className="text-gray-600">Mobile Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-gray-600">Profit Margins</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Dominate Healthcare & EdTech SEO?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of businesses using AI to create winning SEO strategies
          </p>
          <Link 
            href="/dashboard"
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-md text-lg font-medium transition-colors inline-block"
          >
            Get Started Now - Free
          </Link>
        </div>
      </div>
    </div>
  );
}
