import Link from 'next/link';

const pricingPlans = [
  {
    name: 'Starter',
    price: '₹999',
    period: '/month',
    description: 'Perfect for small clinics and individual practitioners',
    features: [
      '5 SEO projects per month',
      'Basic keyword research',
      'Content generation for 2 cities',
      'Social media posts (10/month)',
      'Email support',
      'Basic analytics'
    ],
    recommended: false
  },
  {
    name: 'Professional',
    price: '₹2,999',
    period: '/month',
    description: 'Ideal for growing healthcare/edtech businesses',
    features: [
      '20 SEO projects per month',
      'Advanced AI keyword research',
      'Content for 10 cities',
      'Unlimited social media posts',
      'Technical SEO recommendations',
      'Priority support',
      'Advanced analytics',
      'WhatsApp integration'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: '₹9,999',
    period: '/month',
    description: 'For large healthcare networks and AI companies',
    features: [
      'Unlimited SEO projects',
      'Premium AI models (GPT-4, Claude)',
      'Pan-India coverage',
      'Custom content strategies',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom integrations',
      'API access',
      'White-label options'
    ],
    recommended: false
  }
];

export default function Pricing() {
  const handleSubscribe = (plan: typeof pricingPlans[0]) => {
    alert(`You selected the ${plan.name} plan for ${plan.price}${plan.period}. Payment integration coming soon!`);
  };

  return (
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
              <Link href="/analytics" className="text-gray-600 hover:text-gray-900">Analytics</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your SEO Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the full power of AI-driven SEO for your healthcare, edtech, or AI business. 
            Plans designed specifically for the Indian market.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-lg relative ${
                plan.recommended ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                    plan.recommended
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Indian Market Features */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Our Platform for Indian Market?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🇮🇳</div>
              <h4 className="font-semibold mb-2">India-First Approach</h4>
              <p className="text-gray-600 text-sm">Optimized for Indian search patterns, mobile usage, and cultural preferences</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💳</div>
              <h4 className="font-semibold mb-2">Indian Payments</h4>
              <p className="text-gray-600 text-sm">UPI, NetBanking, Cards - all major Indian payment methods supported</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📱</div>
              <h4 className="font-semibold mb-2">Mobile-First</h4>
              <p className="text-gray-600 text-sm">78% of Indian traffic is mobile - our strategies are optimized accordingly</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🏥</div>
              <h4 className="font-semibold mb-2">Industry Expertise</h4>
              <p className="text-gray-600 text-sm">Specialized in healthcare, edtech, and AI - the fastest growing sectors in India</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-50 rounded-lg p-6 text-center mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">Secure Payments Coming Soon</h4>
          <div className="flex justify-center items-center space-x-8 text-gray-600">
            <span>💳 Credit/Debit Cards</span>
            <span>📱 UPI</span>
            <span>🏦 Net Banking</span>
            <span>💰 Wallets</span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Payment integration with Razorpay launching soon. Currently accepting early access requests.
          </p>
        </div>

        {/* Free Trial Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="text-center">
            <div className="text-2xl mb-2">🎁</div>
            <h4 className="font-semibold text-green-800 mb-2">Start with Our Free Features</h4>
            <p className="text-green-700 mb-4">
              Generate your first SEO strategy for free! No payment required to get started.
            </p>
            <Link 
              href="/dashboard"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Try Free SEO Generator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
