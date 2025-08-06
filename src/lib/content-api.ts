// API client for content generation with fallback support

export interface ContentGenerationRequest {
  prompt: string;
  type: 'keywords' | 'content' | 'social' | 'technical' | 'conversion';
  businessData: {
    name: string;
    businessType: string;
    serviceType: string;
    description: string;
    targetCustomer: string;
    selectedCities: string[];
    keyServices?: string;
  };
}

export interface ContentGenerationResponse {
  content: string;
  success: boolean;
  error?: string;
  provider?: string;
}

class ContentGenerationAPI {
  // Prioritize free APIs first, then paid ones
  private providers = ['groq', 'google', 'huggingface', 'cohere', 'openai', 'anthropic'] as const;
  private currentProviderIndex = 0;

  async generateContent(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[this.currentProviderIndex];
      
      try {
        const response = await this.callProvider(provider, request);
        if (response.success) {
          return { ...response, provider };
        }
      } catch (error) {
        console.warn(`Provider ${provider} failed:`, error);
      }
      
      // Move to next provider
      this.currentProviderIndex = (this.currentProviderIndex + 1) % this.providers.length;
    }

    return {
      success: false,
      content: '',
      error: 'All content generation providers failed'
    };
  }

  private async callProvider(
    provider: typeof this.providers[number], 
    request: ContentGenerationRequest
  ): Promise<ContentGenerationResponse> {
    const response = await fetch('/api/generate-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...request,
        provider
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  // Generate specific content types
  async generateKeywords(businessData: ContentGenerationRequest['businessData']) {
    const prompt = this.buildKeywordPrompt(businessData);
    return this.generateContent({
      prompt,
      type: 'keywords',
      businessData
    });
  }

  async generateContentStrategy(businessData: ContentGenerationRequest['businessData']) {
    const prompt = this.buildContentPrompt(businessData);
    return this.generateContent({
      prompt,
      type: 'content',
      businessData
    });
  }

  async generateSocialMedia(businessData: ContentGenerationRequest['businessData']) {
    const prompt = this.buildSocialPrompt(businessData);
    return this.generateContent({
      prompt,
      type: 'social',
      businessData
    });
  }

  async generateTechnicalSEO(businessData: ContentGenerationRequest['businessData']) {
    const prompt = this.buildTechnicalPrompt(businessData);
    return this.generateContent({
      prompt,
      type: 'technical',
      businessData
    });
  }

  async generateConversionStrategy(businessData: ContentGenerationRequest['businessData']) {
    const prompt = this.buildConversionPrompt(businessData);
    return this.generateContent({
      prompt,
      type: 'conversion',
      businessData
    });
  }

  private buildKeywordPrompt(data: ContentGenerationRequest['businessData']): string {
    return `Generate a comprehensive keyword research strategy for ${data.name}, a ${data.businessType} business targeting ${data.selectedCities.join(', ')} in India.

Business Description: ${data.description}
Target Customer: ${data.targetCustomer}
Service Type: ${data.serviceType}
Key Services: ${data.keyServices || 'Not specified'}

Focus on:
1. High-intent commercial keywords for Indian market
2. Location-specific terms for each target city
3. Problem-solving keywords with research to purchase intent
4. Urgent/immediate need keywords (highest conversion)
5. Long-tail opportunities with low competition
6. Hindi-English mixed search patterns
7. Mobile voice search optimization

Provide keyword difficulty, search volume estimates, and content pillar recommendations.
Format the response with clear sections and actionable insights for the Indian healthcare/edtech/AI market.`;
  }

  private buildContentPrompt(data: ContentGenerationRequest['businessData']): string {
    return `Create a comprehensive content strategy for ${data.name}, targeting the Indian ${data.businessType} market.

Business Context:
- Name: ${data.name}
- Industry: ${data.businessType}
- Service Model: ${data.serviceType}
- Target Cities: ${data.selectedCities.join(', ')}
- Description: ${data.description}
- Target Customer: ${data.targetCustomer}

Generate:
1. Homepage optimization strategy (Hindi + English)
2. Service pages content outline (15+ pages)
3. Location-specific landing pages for each city
4. Blog content calendar (20 SEO-optimized posts)
5. Internal linking strategy
6. Mobile-first optimization guidelines
7. Multi-language content approach
8. Trust signals and social proof integration

Focus on Indian market specifics: mobile users, payment preferences, cultural considerations, and local competition.`;
  }

  private buildSocialPrompt(data: ContentGenerationRequest['businessData']): string {
    return `Generate social media content for ${data.name}, a ${data.businessType} business in India.

Business Details:
- Target Cities: ${data.selectedCities.join(', ')}
- Industry: ${data.businessType}
- Target Audience: ${data.targetCustomer}
- Key Services: ${data.keyServices || 'Not specified'}

Create 4 posts each for:
1. LinkedIn (Professional, B2B focused)
2. Twitter (Engaging threads, news updates)
3. Facebook (Community building, detailed posts)
4. Instagram (Visual content, stories)

Requirements:
- Include relevant hashtags for Indian market
- Incorporate trust-building elements
- Use appropriate mix of Hindi/English
- Focus on healthcare/education/AI trends
- Include location-specific content
- Add call-to-actions for Indian users
- Consider cultural festivals and events`;
  }

  private buildTechnicalPrompt(data: ContentGenerationRequest['businessData']): string {
    return `Generate technical SEO strategy for ${data.name}, optimized for Indian users and ${data.businessType} industry.

Business Context:
- Industry: ${data.businessType}
- Target Locations: ${data.selectedCities.join(', ')}
- Service Model: ${data.serviceType}

Focus Areas:
1. Core Web Vitals optimization for 3G/4G networks
2. Schema markup for healthcare/edtech/AI industries
3. Mobile-first indexing for Indian users (78% mobile traffic)
4. Multilingual SEO (Hindi + English + regional)
5. Indian-specific technical requirements
6. Page speed optimization for low-bandwidth areas
7. Local business schema with Indian address formats
8. Payment gateway integration considerations
9. Compliance with Indian data protection laws
10. CDN setup with Indian edge servers

Provide specific implementation guidelines and code snippets where applicable.`;
  }

  private buildConversionPrompt(data: ContentGenerationRequest['businessData']): string {
    return `Create conversion optimization strategy for ${data.name} targeting Indian ${data.businessType} market.

Business Profile:
- Industry: ${data.businessType}
- Target Cities: ${data.selectedCities.join(', ')}
- Customer Base: ${data.targetCustomer}
- Service Type: ${data.serviceType}

Optimization Areas:
1. High-converting CTAs in Hindi + English
2. Indian payment method integration (UPI, NetBanking, Cards)
3. Trust signals for Indian healthcare/education market
4. Mobile conversion optimization (78% traffic)
5. Regional adaptation for each target city
6. WhatsApp Business integration
7. Cultural considerations and pricing psychology
8. Social proof and testimonial strategy
9. Multi-language customer support options
10. Festival timing and seasonal offers

Include specific recommendations for form optimization, checkout flow, and user journey mapping for Indian users.`;
  }
}

export const contentAPI = new ContentGenerationAPI();
