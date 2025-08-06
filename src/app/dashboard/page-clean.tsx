'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Dashboard() {
  const [businessType, setBusinessType] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [targetCity, setTargetCity] = useState('');
  const [services, setServices] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    if (!businessType || !businessName || !targetCity || !services) {
      alert('Please fill in all fields to generate your SEO strategy');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent('');

    try {
      // Simulate API call with sample content
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const sampleContent = `
# SEO Strategy for ${businessName} - ${businessType} in ${targetCity}

## 🎯 Primary Keywords (High Priority)
1. **${businessType.toLowerCase()} ${targetCity.toLowerCase()}** - Primary geo-targeted keyword
2. **best ${businessType.toLowerCase()} in ${targetCity.toLowerCase()}** - Commercial intent
3. **${services} ${targetCity.toLowerCase()}** - Service-specific targeting
4. **top ${businessType.toLowerCase()} near me** - Local search optimization
5. **affordable ${businessType.toLowerCase()} ${targetCity.toLowerCase()}** - Price-conscious searches

## 📊 Keyword Analysis
- **Search Volume**: 2,500-15,000 monthly searches in ${targetCity}
- **Competition**: Medium to High
- **Commercial Intent**: High (85% of searches show buying intent)
- **Mobile Traffic**: 78% of searches come from mobile devices

## 📝 Content Strategy

### Blog Posts (Create 2-3 per month)
1. "Complete Guide to ${services} in ${targetCity} - 2025 Edition"
2. "How to Choose the Best ${businessType} in ${targetCity}"
3. "Top 10 ${businessType} Trends in ${targetCity} This Year"

### Landing Pages
- **Service Pages**: Create dedicated pages for each service you offer
- **Location Pages**: Target nearby areas around ${targetCity}
- **FAQ Page**: Address common customer questions
- **Testimonials**: Social proof from ${targetCity} customers

## 🏆 Local SEO Strategy

### Google My Business Optimization
- Complete profile with accurate NAP (Name, Address, Phone)
- Regular posts about your services
- Encourage ${targetCity} customer reviews
- Upload photos of your facility/team

### Citations & Directories
- List on ${targetCity} business directories
- Healthcare/EdTech specific directories
- Consistent NAP across all platforms

## 📱 Mobile Optimization
- **Page Speed**: Target under 3 seconds loading time
- **Responsive Design**: Perfect mobile experience
- **Click-to-Call**: Easy phone number access
- **WhatsApp Integration**: Popular in India

## 💰 Conversion Optimization
- **UPI Payment Integration**: Preferred payment method
- **Multi-language Support**: Hindi + regional languages
- **Trust Signals**: Certifications, awards, testimonials
- **Emergency Contact**: 24/7 availability messaging

## 📈 Expected Results
- **Month 1-2**: 50-100 additional website visitors
- **Month 3-4**: 150-250 visitors, first Google page rankings
- **Month 5-6**: 300-500 visitors, multiple top 3 rankings
- **Month 7-12**: 500+ visitors, market leadership

## 🎯 Next Steps
1. Create Google My Business listing if not done
2. Set up Google Analytics and Search Console
3. Start with the high-priority keywords
4. Create the recommended content
5. Build local citations

*Generated for ${businessName} targeting ${targetCity} market*
`;

      setGeneratedContent(sampleContent);
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Error generating content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
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
              <Link href="/analytics" className="text-gray-600 hover:text-gray-900">Analytics</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">AI SEO Strategy Generator</h2>
          <p className="text-gray-600">Generate comprehensive SEO strategies for your healthcare/edtech/AI business</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Business Information</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select your business type</option>
                  <option value="Healthcare Clinic">Healthcare Clinic</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Dental Clinic">Dental Clinic</option>
                  <option value="EdTech Startup">EdTech Startup</option>
                  <option value="Online Learning Platform">Online Learning Platform</option>
                  <option value="AI Software Company">AI Software Company</option>
                  <option value="Telemedicine Platform">Telemedicine Platform</option>
                  <option value="Educational Institution">Educational Institution</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Enter your business name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target City
                </label>
                <select
                  value={targetCity}
                  onChange={(e) => setTargetCity(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select target city</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Pune">Pune</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Lucknow">Lucknow</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Services/Products
                </label>
                <textarea
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                  placeholder="Describe your main services or products..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
                  isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating SEO Strategy...
                  </div>
                ) : (
                  'Generate SEO Strategy'
                )}
              </button>
            </div>
          </div>

          {/* Generated Content */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Generated SEO Strategy</h3>
            
            {!generatedContent && !isGenerating && (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">🚀</div>
                <p>Fill in your business information and click "Generate SEO Strategy" to get started!</p>
              </div>
            )}

            {generatedContent && (
              <div className="prose max-w-none">
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                    {generatedContent}
                  </pre>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedContent)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    📋 Copy Strategy
                  </button>
                  <button
                    onClick={() => setGeneratedContent('')}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    🔄 Generate New
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Keyword Research</h4>
            <p className="text-gray-600">AI-powered keyword analysis for your specific industry and location</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">📝</div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Content Strategy</h4>
            <p className="text-gray-600">Complete content plans with blog topics and landing page optimization</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">📱</div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Mobile-First</h4>
            <p className="text-gray-600">Optimized for Indian mobile users with local payment integration</p>
          </div>
        </div>
      </div>
    </div>
  );
}
