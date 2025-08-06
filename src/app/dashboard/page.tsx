'use client';

// Force dynamic rendering to avoid static generation issues with Clerk
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { ClerkProvider, SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { contentAPI } from '@/lib/content-api';
import Link from 'next/link';

interface BusinessData {
  name: string;
  website: string;
  businessType: string;
  serviceType: string;
  locationScope: string;
  specificLocations: string;
  selectedCities: string[];
  description: string;
  targetCustomer: string;
  keyServices: string;
}

interface GeneratedContent {
  keywords?: string;
  content?: string;
  social?: string;
  technical?: string;
  conversion?: string;
}

export default function Dashboard() {
  const { user } = useUser();
  
  // Access control state
  const [userAccess, setUserAccess] = useState<{
    isInternalTeam: boolean;
    hasFullAccess: boolean;
    plan: string;
    remainingGenerations?: number;
  }>({
    isInternalTeam: false,
    hasFullAccess: false,
    plan: 'Free',
    remainingGenerations: 5
  });

  // Check user access level
  useEffect(() => {
    if (user?.emailAddresses?.[0]?.emailAddress) {
      const userEmail = user.emailAddresses[0].emailAddress;
      const internalTeamEmails = (process.env.NEXT_PUBLIC_INTERNAL_TEAM_EMAILS || '').split(',');
      const isInternalTeam = internalTeamEmails.includes(userEmail);
      const paymentGatewayEnabled = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_ENABLED === 'true';
      
      setUserAccess({
        isInternalTeam,
        hasFullAccess: isInternalTeam || paymentGatewayEnabled,
        plan: isInternalTeam ? 'Internal Team' : 'Free Preview',
        remainingGenerations: isInternalTeam ? undefined : 5
      });
    }
  }, [user]);

  const [businessData, setBusinessData] = useState<BusinessData>({
    name: '',
    website: '',
    businessType: '',
    serviceType: '',
    locationScope: 'pan-india',
    specificLocations: '',
    selectedCities: [],
    description: '',
    targetCustomer: '',
    keyServices: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [analytics, setAnalytics] = useState({
    keywords: 0,
    content: 0,
    social: 0,
    reach: 0,
    competitive: 0,
    seo: 0
  });

  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Kochi', 'Indore', 'Coimbatore', 'Visakhapatnam', 'Nagpur'
  ];

  const businessTypes = [
    { value: 'telemedicine', label: 'Telemedicine & Digital Health' },
    { value: 'pediatric-healthcare', label: 'Pediatric Healthcare' },
    { value: 'women-health', label: 'Women\'s Health & Fertility' },
    { value: 'mental-health', label: 'Mental Health Services' },
    { value: 'diagnostic-services', label: 'Diagnostic Services' },
    { value: 'pharmacy-delivery', label: 'Pharmacy & Medicine Delivery' },
    { value: 'edtech-k12', label: 'EdTech - K12 Education' },
    { value: 'edtech-higher-ed', label: 'EdTech - Higher Education' },
    { value: 'skill-development', label: 'Skill Development & Training' },
    { value: 'language-learning', label: 'Language Learning' },
    { value: 'test-preparation', label: 'Test Preparation & Coaching' },
    { value: 'ai-healthcare', label: 'AI for Healthcare' },
    { value: 'ai-education', label: 'AI for Education' },
    { value: 'ai-business', label: 'AI Business Solutions' },
    { value: 'ai-analytics', label: 'AI Analytics & Insights' },
    { value: 'machine-learning', label: 'Machine Learning Services' }
  ];

  const handleCityToggle = (city: string) => {
    setBusinessData(prev => ({
      ...prev,
      selectedCities: prev.selectedCities.includes(city)
        ? prev.selectedCities.filter(c => c !== city)
        : [...prev.selectedCities, city]
    }));
  };

  const generateKeywords = async () => {
    if (!businessData.name || !businessData.businessType || !businessData.description) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await contentAPI.generateKeywords(businessData);
      if (response.success) {
        setGeneratedContent(prev => ({ ...prev, keywords: response.content }));
        setAnalytics(prev => ({ ...prev, keywords: 50, competitive: 78, seo: 85 }));
        setCurrentStep(2);
      } else {
        alert('Failed to generate keywords: ' + response.error);
      }
    } catch (error) {
      console.error('Error generating keywords:', error);
      alert('Error generating keywords');
    } finally {
      setIsLoading(false);
    }
  };

  const generateContent = async () => {
    // Check access for external users
    if (!userAccess.isInternalTeam && userAccess.remainingGenerations && userAccess.remainingGenerations <= 0) {
      alert('You have reached your free generation limit. Please upgrade to continue.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await contentAPI.generateContentStrategy(businessData);
      if (response.success) {
        setGeneratedContent(prev => ({ ...prev, content: response.content }));
        setAnalytics(prev => ({ ...prev, content: 15, reach: 25000 + (businessData.selectedCities.length * 5000) }));
        
        // Decrease remaining generations for external users
        if (!userAccess.isInternalTeam && userAccess.remainingGenerations) {
          setUserAccess(prev => ({ 
            ...prev, 
            remainingGenerations: prev.remainingGenerations! - 1 
          }));
        }
        
        setCurrentStep(3);
      } else {
        alert('Failed to generate content: ' + response.error);
      }
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Error generating content');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSocial = async () => {
    setIsLoading(true);
    try {
      const response = await contentAPI.generateSocialMedia(businessData);
      if (response.success) {
        setGeneratedContent(prev => ({ ...prev, social: response.content }));
        setAnalytics(prev => ({ ...prev, social: 16 }));
        setCurrentStep(4);
      } else {
        alert('Failed to generate social media content: ' + response.error);
      }
    } catch (error) {
      console.error('Error generating social media content:', error);
      alert('Error generating social media content');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      // Redirect to sign-in page if not signed in
      window.location.href = '/sign-in';
    }
  }, [user]);

  return (
    <ClerkProvider>
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
                <Link href="/analytics" className="text-gray-600 hover:text-gray-900">Analytics</Link>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </header>

        {/* User Access Status Banner */}
        {userAccess.isInternalTeam ? (
          <div className="bg-green-100 border-l-4 border-green-500 p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    <strong>Internal Team Access:</strong> Unlimited content generation and all features available
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Free Preview:</strong> {userAccess.remainingGenerations} content generations remaining. 
                    <Link href="/pricing" className="underline ml-1">Upgrade for unlimited access</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">SEO Strategy Generator</h2>
              <div className="text-sm text-gray-600">Step {currentStep} of 5</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Analytics Dashboard */}
          {analytics.keywords > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">📊 Real-time Analytics</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{analytics.keywords}</div>
                  <div className="text-sm text-gray-600">Keywords</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{analytics.content}</div>
                  <div className="text-sm text-gray-600">Content Pieces</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{analytics.social}</div>
                  <div className="text-sm text-gray-600">Social Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{analytics.reach.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Est. Reach</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{analytics.competitive}%</div>
                  <div className="text-sm text-gray-600">Competitive Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{analytics.seo}%</div>
                  <div className="text-sm text-gray-600">SEO Readiness</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Business Information */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">1</div>
              <h3 className="text-xl font-semibold">Business Information Input</h3>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <h4 className="font-semibold text-green-800 mb-2">🎯 Optimized for Your Industry</h4>
              <p className="text-green-700">This platform is specifically designed for healthcare services, educational technology, and AI-based solutions targeting the Indian market.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand/Business Name *
                </label>
                <input
                  type="text"
                  value={businessData.name}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Skids Health, Santaan.in, Greybrain.ai"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={businessData.website}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://skids.health"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry Focus *
                </label>
                <select
                  value={businessData.businessType}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, businessType: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Industry</option>
                  {businessTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Model *
                </label>
                <select
                  value={businessData.serviceType}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, serviceType: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Service Type</option>
                  <option value="b2c">B2C - Direct to Consumer</option>
                  <option value="b2b">B2B - Business to Business</option>
                  <option value="b2b2c">B2B2C - Business to Business to Consumer</option>
                  <option value="saas">SaaS - Software as a Service</option>
                  <option value="marketplace">Marketplace/Platform</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Target Cities (Select all applicable)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {indianCities.map(city => (
                  <label key={city} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={businessData.selectedCities.includes(city)}
                      onChange={() => handleCityToggle(city)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{city}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Your Business *
                </label>
                <textarea
                  value={businessData.description}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your healthcare/edtech/AI solution, unique value proposition, target audience, key services, technology stack, etc."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Customer Persona *
                </label>
                <textarea
                  value={businessData.targetCustomer}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, targetCustomer: e.target.value }))}
                  placeholder="Describe your ideal customer (parents seeking pediatric care, students preparing for exams, hospitals needing AI solutions, etc.)"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Services/Features
                </label>
                <textarea
                  value={businessData.keyServices}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, keyServices: e.target.value }))}
                  placeholder="List your main services/features (e.g., online consultations, AI diagnosis, personalized learning, automated workflows, etc.)"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={generateKeywords}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  '🎯 Generate SEO Strategy'
                )}
              </button>
            </div>
          </div>

          {/* Generated Content Display */}
          {generatedContent.keywords && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">2</div>
                <h3 className="text-xl font-semibold">AI Keyword Research & Strategy</h3>
              </div>
              
              <div className="bg-gray-50 rounded-md p-4 mb-6">
                <p className="text-sm text-gray-700"><strong>🧠 AI Analysis:</strong> Advanced keyword research focusing on healthcare urgency, educational intent, AI implementation keywords, and location-specific terms across India.</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <h4 className="font-semibold text-green-800 mb-2">📈 Generated Keywords & Strategy</h4>
                <pre className="whitespace-pre-wrap text-sm text-green-700 max-h-96 overflow-y-auto">
                  {generatedContent.keywords}
                </pre>
              </div>

              <button
                onClick={generateContent}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  '📝 Generate SEO Content'
                )}
              </button>
            </div>
          )}

          {generatedContent.content && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">3</div>
                <h3 className="text-xl font-semibold">AI Content & Social Media Generation</h3>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-md p-4 mb-6">
                <h4 className="font-semibold text-purple-800 mb-2">📄 Generated Content Strategy</h4>
                <pre className="whitespace-pre-wrap text-sm text-purple-700 max-h-96 overflow-y-auto">
                  {generatedContent.content}
                </pre>
              </div>

              <button
                onClick={generateSocial}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  '📱 Generate Social Media Content'
                )}
              </button>
            </div>
          )}

          {generatedContent.social && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">4</div>
                <h3 className="text-xl font-semibold">Social Media Content</h3>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mb-6">
                <h4 className="font-semibold text-orange-800 mb-2">📱 Generated Social Media Posts</h4>
                <pre className="whitespace-pre-wrap text-sm text-orange-700 max-h-96 overflow-y-auto">
                  {generatedContent.social}
                </pre>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-md p-6">
                <h4 className="font-semibold text-green-800 mb-4">🎯 Complete SEO Automation Package</h4>
                <p className="text-green-700 mb-4">Congratulations! Your comprehensive SEO strategy has been generated. You now have:</p>
                <ul className="list-disc list-inside text-green-700 mb-4">
                  <li>AI-powered keyword research optimized for Indian market</li>
                  <li>Complete content strategy with 15+ pages</li>
                  <li>Social media content for all major platforms</li>
                  <li>Location-specific optimization for your target cities</li>
                  <li>Mobile-first approach for 78% Indian mobile users</li>
                </ul>
                <div className="flex gap-4 flex-wrap">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                    Export to PDF
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                    Copy All Content
                  </button>
                  <Link href="/analytics" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                    View Analytics
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SignedIn>
    </ClerkProvider>
  );
}
