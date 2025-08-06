# Healthcare EdTech AI SEO Platform

A comprehensive SEO automation platform built with Next.js 14, designed specifically for healthcare, edtech, and AI businesses targeting the Indian market.

## 🚀 Features

- **AI-Powered SEO Strategy**: Generate complete keyword research, content strategies, and social media posts
- **Indian Market Optimization**: Mobile-first approach optimized for 78% Indian mobile users
- **Multi-Language Support**: Hindi-English mixed search patterns and regional language considerations
- **Industry-Specific**: Tailored for healthcare, edtech, and AI sectors in India
- **Secure Authentication**: Clerk-based authentication with user management
- **Payment Integration**: Razorpay integration for Indian payment methods (UPI, NetBanking, Cards)
- **Fallback APIs**: Multiple AI providers (OpenAI, Claude, Gemini) for reliability

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Payments**: Razorpay
- **AI Integration**: OpenAI GPT-4, Claude, Google Gemini
- **Deployment**: Netlify

## 📋 Prerequisites

- Node.js 18+ and npm
- Clerk account for authentication
- Razorpay account for payments
- API keys for at least one AI provider (OpenAI/Anthropic/Google)

## 🔧 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/satishskid/gbseo.git
   cd gbseo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables in `.env.local`:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # AI API Keys (at least one required)
   OPENAI_API_KEY=your_openai_api_key
   ANTHROPIC_API_KEY=your_claude_api_key
   GOOGLE_AI_API_KEY=your_gemini_api_key
   
   # Razorpay Payment Gateway
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment on Netlify

1. **Connect your GitHub repository** to Netlify
2. **Set build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Add environment variables** in Netlify dashboard
4. **Deploy** - Netlify will automatically build and deploy your site

## 🏥 Recommended API Providers

### Primary (Recommended)
- **OpenAI GPT-4**: Best for comprehensive SEO strategies
- **Anthropic Claude**: Excellent for content generation and Indian market insights

### Fallback Options
- **Google Gemini**: Good free tier, reliable for keyword research
- **Custom prompts**: Implement your own content generation logic

## 🎯 Indian Market Optimization

This platform is specifically optimized for:
- **Mobile-first design** (78% of Indian traffic)
- **Regional payment methods** (UPI, NetBanking, Wallets)
- **Multi-language content** (Hindi-English mixed patterns)
- **Cultural considerations** (festivals, local preferences)
- **3G/4G optimization** (faster loading for slower connections)
- **Local business schema** (Indian address formats)

## 🔐 Security Features

- Clerk authentication with role-based access
- Secure API routes with middleware protection
- Input validation and sanitization
- Rate limiting for API calls
- Secure payment processing with Razorpay

## 📊 Platform Capabilities

### Keyword Research
- High-intent commercial keywords
- Location-specific terms for Indian cities
- Problem-solving keywords with purchase intent
- Urgent/immediate need keywords
- Long-tail opportunities
- Hindi-English mixed search patterns

### Content Generation
- Homepage optimization (Hindi + English)
- Service pages content (15+ pages)
- Location-specific landing pages
- Blog content calendar (20+ SEO posts)
- Internal linking strategies
- Mobile-first optimization guidelines

### Social Media Content
- LinkedIn (Professional, B2B focused)
- Twitter (Engaging threads, news updates)
- Facebook (Community building)
- Instagram (Visual content, stories)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in this repository
- Email: [your-email@domain.com]
- Documentation: [Link to detailed docs]

## 🎉 Acknowledgments

- Built for the growing Indian healthcare, edtech, and AI markets
- Optimized for Indian user behavior and preferences
- Supports the Digital India initiative

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
