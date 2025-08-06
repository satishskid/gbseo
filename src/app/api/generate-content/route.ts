import { NextRequest, NextResponse } from 'next/server';

interface ProviderConfig {
  name: string;
  apiKey: string | undefined;
  endpoint: string;
  headers: Record<string, string>;
  buildPayload: (prompt: string) => Record<string, unknown>;
  parseResponse: (response: Record<string, unknown>) => string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, provider = 'openai' } = body;

    // Define providers with fallback support (free APIs first)
    const providers: Record<string, ProviderConfig> = {
      groq: {
        name: 'Groq (Llama 2)',
        apiKey: process.env.GROQ_API_KEY,
        endpoint: 'https://api.groq.com/openai/v1/chat/completions',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        buildPayload: (prompt: string) => ({
          model: 'llama2-70b-4096',
          messages: [
            {
              role: 'system',
              content: 'You are an expert SEO consultant specializing in healthcare, edtech, and AI industries in India. Provide detailed, actionable strategies optimized for the Indian market.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.7,
        }),
        parseResponse: (response: Record<string, unknown>) => {
          const choices = response.choices as Array<{ message?: { content?: string } }>;
          return choices?.[0]?.message?.content || '';
        }
      },

      huggingface: {
        name: 'Hugging Face (Mistral)',
        apiKey: process.env.HUGGINGFACE_API_KEY,
        endpoint: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        buildPayload: (prompt: string) => ({
          inputs: `You are an expert SEO consultant specializing in healthcare, edtech, and AI industries in India. ${prompt}`,
          parameters: {
            max_new_tokens: 2000,
            temperature: 0.7,
            return_full_text: false
          }
        }),
        parseResponse: (response: Record<string, unknown>) => {
          if (Array.isArray(response)) {
            return response[0]?.generated_text || '';
          }
          return response.generated_text as string || '';
        }
      },

      cohere: {
        name: 'Cohere Generate',
        apiKey: process.env.COHERE_API_KEY,
        endpoint: 'https://api.cohere.ai/v1/generate',
        headers: {
          'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        buildPayload: (prompt: string) => ({
          model: 'command',
          prompt: `You are an expert SEO consultant specializing in healthcare, edtech, and AI industries in India. ${prompt}`,
          max_tokens: 2000,
          temperature: 0.7,
          k: 0,
          stop_sequences: [],
          return_likelihoods: 'NONE'
        }),
        parseResponse: (response: Record<string, unknown>) => {
          const generations = response.generations as Array<{ text?: string }>;
          return generations?.[0]?.text || '';
        }
      },

      google: {
        name: 'Google Gemini',
        apiKey: process.env.GOOGLE_AI_API_KEY,
        endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`,
        headers: {
          'Content-Type': 'application/json',
        },
        buildPayload: (prompt: string) => ({
          contents: [
            {
              parts: [
                {
                  text: `You are an expert SEO consultant specializing in healthcare, edtech, and AI industries in India. ${prompt}`
                }
              ]
            }
          ]
        }),
        parseResponse: (response: Record<string, unknown>) => {
          const candidates = response.candidates as Array<{ content?: { parts?: Array<{ text?: string }> } }>;
          return candidates?.[0]?.content?.parts?.[0]?.text || '';
        }
      },
      
      openai: {
        name: 'OpenAI GPT-4',
        apiKey: process.env.OPENAI_API_KEY,
        endpoint: 'https://api.openai.com/v1/chat/completions',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        buildPayload: (prompt: string) => ({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert SEO consultant specializing in healthcare, edtech, and AI industries in India. Provide detailed, actionable strategies optimized for the Indian market.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.7,
        }),
        parseResponse: (response: Record<string, unknown>) => {
          const choices = response.choices as Array<{ message?: { content?: string } }>;
          return choices?.[0]?.message?.content || '';
        }
      },
      
      anthropic: {
        name: 'Claude',
        apiKey: process.env.ANTHROPIC_API_KEY,
        endpoint: 'https://api.anthropic.com/v1/messages',
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY || '',
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        buildPayload: (prompt: string) => ({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 4000,
          messages: [
            {
              role: 'user',
              content: `You are an expert SEO consultant specializing in healthcare, edtech, and AI industries in India. ${prompt}`
            }
          ]
        }),
        parseResponse: (response: Record<string, unknown>) => {
          const content = response.content as Array<{ text?: string }>;
          return content?.[0]?.text || '';
        }
      }
    };

    const selectedProvider = providers[provider];
    
    if (!selectedProvider || !selectedProvider.apiKey) {
      return NextResponse.json(
        { error: `Provider ${provider} not configured` }, 
        { status: 400 }
      );
    }

    // Make API call to selected provider
    const apiResponse = await fetch(selectedProvider.endpoint, {
      method: 'POST',
      headers: selectedProvider.headers,
      body: JSON.stringify(selectedProvider.buildPayload(prompt)),
    });

    if (!apiResponse.ok) {
      throw new Error(`${selectedProvider.name} API error: ${apiResponse.status}`);
    }

    const data = await apiResponse.json() as Record<string, unknown>;
    const content = selectedProvider.parseResponse(data);

    if (!content) {
      throw new Error('No content received from provider');
    }

    return NextResponse.json({
      success: true,
      content,
      provider: selectedProvider.name
    });

  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
}
