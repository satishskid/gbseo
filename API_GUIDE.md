# API Integration Guide

## 🔑 Recommended AI Providers for Indian Market

### Primary Recommendations

#### 1. **OpenAI GPT-4** (Most Recommended)
- **Best for**: Comprehensive SEO strategies, high-quality content
- **Strengths**: Excellent understanding of Indian market nuances, multilingual capabilities
- **Cost**: $20/month for significant usage
- **Setup**: Get API key from [OpenAI Platform](https://platform.openai.com/)
- **Rate Limits**: 3 requests/minute (free tier), higher for paid plans

```env
OPENAI_API_KEY=sk-proj-your-key-here
```

#### 2. **Anthropic Claude** (Excellent Alternative)
- **Best for**: Detailed content generation, cultural understanding
- **Strengths**: Strong reasoning, good for Indian healthcare/edtech context
- **Cost**: $20/month for Claude 3 Sonnet
- **Setup**: Get API key from [Anthropic Console](https://console.anthropic.com/)
- **Rate Limits**: 5 requests/minute (free tier)

```env
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

### Fallback/Budget Options

#### 3. **Google Gemini** (Free Tier Available)
- **Best for**: Budget-conscious users, basic keyword research
- **Strengths**: Free tier, good for simple tasks
- **Cost**: Free tier available, then $0.50 per 1M characters
- **Setup**: Get API key from [Google AI Studio](https://makersuite.google.com/)
- **Rate Limits**: 60 requests/minute (free tier)

```env
GOOGLE_AI_API_KEY=AIzaSy-your-key-here
```

## 💳 Payment Integration - Razorpay

### Why Razorpay for Indian Market?
- **UPI Support**: 70% of Indian transactions use UPI
- **Local Payment Methods**: NetBanking, Wallets, EMI options
- **INR Native**: No currency conversion issues
- **Compliance**: RBI compliant, trusted by Indian users

### Setup Instructions
1. Create account at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Get Test/Live API credentials
3. Enable required payment methods
4. Configure webhooks for subscription management

```env
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_secret_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

### Supported Payment Methods
- **UPI**: Google Pay, PhonePe, Paytm, BHIM
- **Cards**: Visa, Mastercard, RuPay, Amex
- **NetBanking**: All major Indian banks
- **Wallets**: Paytm, Mobikwik, Freecharge
- **EMI**: No-cost EMI for healthcare plans

## 🔐 Authentication - Clerk

### Pre-configured Credentials (Ready to Use)
The platform comes with working Clerk credentials for immediate testing:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bmVhcmJ5LW95c3Rlci0zOC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_Dlv81K9fHwhCFt34hj1FtSjuuWSZ7wuKhT4LZHj5fy
```

### For Production Deployment
1. Create your own Clerk application at [Clerk Dashboard](https://dashboard.clerk.com/)
2. Configure allowed origins for your domain
3. Set up user management and permissions
4. Replace with your own API keys

## 🚀 Quick Start Testing

### 1. Test API Providers
```bash
# Run the API testing script
node test-apis.js
```

### 2. Minimum Configuration for Testing
Set at least one AI provider API key in `.env.local`:

```env
# Choose ONE of these for basic testing:
OPENAI_API_KEY=your-openai-key
# OR
ANTHROPIC_API_KEY=your-claude-key  
# OR
GOOGLE_AI_API_KEY=your-gemini-key

# Razorpay (for payment testing)
RAZORPAY_KEY_ID=your-test-key
RAZORPAY_KEY_SECRET=your-test-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-test-key
```

### 3. Test the Platform
1. Start development server: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. Sign in using Clerk authentication
4. Create a test SEO project
5. Verify content generation works
6. Test payment flow with Razorpay test mode

## 💡 Cost Optimization Tips

### AI Provider Costs
- **Start with Google Gemini** for development (free tier)
- **Upgrade to OpenAI** for production quality
- **Use Claude for specialized healthcare content**
- **Implement caching** to reduce API calls

### Estimated Monthly Costs (for 100 users)
- **OpenAI GPT-4**: $50-100/month
- **Anthropic Claude**: $40-80/month  
- **Google Gemini**: $10-30/month
- **Razorpay**: 2% transaction fee
- **Clerk**: Free for up to 10k MAU

## 🔄 Fallback Strategy

The platform automatically falls back between providers:

1. **Primary**: OpenAI GPT-4 (best quality)
2. **Secondary**: Anthropic Claude (good alternative)
3. **Fallback**: Google Gemini (budget option)

### Configure Multiple Providers
```env
# Configure all three for maximum reliability
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-claude-key
GOOGLE_AI_API_KEY=your-gemini-key
```

## 🛡️ Security Best Practices

### API Key Management
- Never commit API keys to git
- Use different keys for development/production
- Rotate keys regularly
- Monitor usage and set up alerts

### Rate Limiting
- Implement client-side rate limiting
- Queue requests during high traffic
- Show loading states to users
- Handle API errors gracefully

### User Data Protection
- Don't store generated content with API keys
- Implement request logging
- Monitor for unusual usage patterns
- Comply with Indian data protection laws

## 📊 Monitoring & Analytics

### Track API Performance
- Response times for each provider
- Success/failure rates
- Cost per generation
- User satisfaction metrics

### Error Handling
- Log all API failures
- Implement retry mechanisms
- Show helpful error messages
- Fallback to alternative providers

## 🔧 Troubleshooting

### Common Issues

#### API Key Invalid
- Verify key format and permissions
- Check billing status
- Ensure correct environment variables

#### Rate Limit Exceeded
- Implement exponential backoff
- Show queue position to users
- Upgrade to paid plans

#### Payment Integration Issues
- Verify Razorpay test/live mode
- Check webhook configurations
- Test with different payment methods

#### Authentication Problems
- Verify Clerk domain settings
- Check redirect URLs
- Ensure middleware configuration

### Getting Help
- Check provider documentation
- Join community forums
- Contact support for production issues
- Monitor error logs and metrics
