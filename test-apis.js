#!/usr/bin/env node

/**
 * API Testing Script for Healthcare EdTech AI SEO Platform
 * Tests all configured API providers for content generation
 */

const https = require('https');
const { promisify } = require('util');

// Test data
const testPrompt = "Generate 5 healthcare SEO keywords for telemedicine services in Mumbai, India targeting families with children.";

// API configurations
const providers = {
  openai: {
    name: 'OpenAI GPT-4',
    apiKey: process.env.OPENAI_API_KEY,
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    payload: {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert SEO consultant specializing in healthcare industries in India.'
        },
        {
          role: 'user',
          content: testPrompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    }
  },
  anthropic: {
    name: 'Claude',
    apiKey: process.env.ANTHROPIC_API_KEY,
    url: 'https://api.anthropic.com/v1/messages',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    payload: {
      model: 'claude-3-sonnet-20240229',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: testPrompt
        }
      ]
    }
  },
  google: {
    name: 'Google Gemini',
    apiKey: process.env.GOOGLE_AI_API_KEY,
    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`,
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      contents: [
        {
          parts: [
            {
              text: testPrompt
            }
          ]
        }
      ]
    }
  }
};

async function testProvider(providerKey, config) {
  if (!config.apiKey) {
    console.log(`❌ ${config.name}: API key not configured`);
    return false;
  }

  try {
    console.log(`🧪 Testing ${config.name}...`);
    
    const data = JSON.stringify(config.payload);
    const options = {
      method: 'POST',
      headers: {
        ...config.headers,
        'Content-Length': data.length
      }
    };

    const response = await new Promise((resolve, reject) => {
      const req = https.request(config.url, options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        res.on('end', () => {
          try {
            resolve({
              statusCode: res.statusCode,
              data: JSON.parse(responseData)
            });
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });

    if (response.statusCode === 200) {
      let content = '';
      
      // Extract content based on provider
      if (providerKey === 'openai') {
        content = response.data.choices?.[0]?.message?.content || 'No content';
      } else if (providerKey === 'anthropic') {
        content = response.data.content?.[0]?.text || 'No content';
      } else if (providerKey === 'google') {
        content = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No content';
      }

      console.log(`✅ ${config.name}: SUCCESS`);
      console.log(`📝 Response preview: ${content.substring(0, 100)}...`);
      return true;
    } else {
      console.log(`❌ ${config.name}: HTTP ${response.statusCode}`);
      console.log(`📝 Error: ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${config.name}: ${error.message}`);
    return false;
  }
}

async function testRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.log('❌ Razorpay: Credentials not configured');
    return false;
  }

  try {
    console.log('🧪 Testing Razorpay...');
    
    const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    };

    const response = await new Promise((resolve, reject) => {
      const req = https.request('https://api.razorpay.com/v1/payments', options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            data: responseData
          });
        });
      });

      req.on('error', reject);
      req.end();
    });

    if (response.statusCode === 200) {
      console.log('✅ Razorpay: SUCCESS - API credentials valid');
      return true;
    } else {
      console.log(`❌ Razorpay: HTTP ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Razorpay: ${error.message}`);
    return false;
  }
}

async function testClerk() {
  if (!process.env.CLERK_SECRET_KEY) {
    console.log('❌ Clerk: Secret key not configured');
    return false;
  }

  try {
    console.log('🧪 Testing Clerk...');
    
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await new Promise((resolve, reject) => {
      const req = https.request('https://api.clerk.com/v1/users', options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            data: responseData
          });
        });
      });

      req.on('error', reject);
      req.end();
    });

    if (response.statusCode === 200) {
      console.log('✅ Clerk: SUCCESS - API credentials valid');
      return true;
    } else {
      console.log(`❌ Clerk: HTTP ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Clerk: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Healthcare EdTech AI SEO Platform - API Testing\n');
  
  const results = {
    ai: [],
    payments: false,
    auth: false
  };

  // Test AI providers
  console.log('🤖 Testing AI Content Generation Providers:\n');
  for (const [key, config] of Object.entries(providers)) {
    const success = await testProvider(key, config);
    results.ai.push({ provider: config.name, success });
    console.log('');
  }

  // Test payment provider
  console.log('💳 Testing Payment Provider:\n');
  results.payments = await testRazorpay();
  console.log('');

  // Test authentication provider
  console.log('🔐 Testing Authentication Provider:\n');
  results.auth = await testClerk();
  console.log('');

  // Summary
  console.log('📊 TEST SUMMARY:\n');
  
  const workingAI = results.ai.filter(r => r.success);
  console.log(`🤖 AI Providers: ${workingAI.length}/${results.ai.length} working`);
  workingAI.forEach(r => console.log(`   ✅ ${r.provider}`));
  
  console.log(`💳 Payment Gateway: ${results.payments ? '✅ Working' : '❌ Not working'}`);
  console.log(`🔐 Authentication: ${results.auth ? '✅ Working' : '❌ Not working'}`);

  const readiness = workingAI.length > 0 && results.payments && results.auth;
  console.log(`\n🎯 Platform Readiness: ${readiness ? '✅ READY FOR DEPLOYMENT' : '❌ NEEDS CONFIGURATION'}`);

  if (!readiness) {
    console.log('\n🔧 Next Steps:');
    if (workingAI.length === 0) {
      console.log('   - Configure at least one AI provider API key');
    }
    if (!results.payments) {
      console.log('   - Configure Razorpay credentials');
    }
    if (!results.auth) {
      console.log('   - Configure Clerk authentication');
    }
  }
}

// Run tests
main().catch(console.error);
