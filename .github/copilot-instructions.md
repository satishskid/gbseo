# Copilot Instructions for Healthcare/EdTech AI SEO Platform

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a healthcare, edtech, and AI SEO automation platform built with Next.js 14, TypeScript, and Tailwind CSS. The platform helps businesses in these industries generate comprehensive SEO strategies, content, and social media posts tailored for the Indian market.

## Key Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Payments**: Razorpay
- **Deployment**: Netlify

## Coding Guidelines
1. Use TypeScript strict mode
2. Follow Next.js 14 App Router patterns
3. Use Tailwind CSS for styling (avoid custom CSS)
4. Implement responsive design for mobile-first approach
5. Use server components when possible, client components only when needed
6. Follow React best practices and hooks patterns

## API Integration Guidelines
- Implement fallback APIs for content generation (OpenAI GPT-4, Claude, Gemini)
- Handle API rate limits and errors gracefully
- Cache responses when appropriate
- Use environment variables for API keys

## Authentication & Security
- Use Clerk for user authentication and management
- Implement role-based access control
- Secure API routes with proper middleware
- Validate all user inputs

## Indian Market Focus
- Optimize for mobile users (78% of Indian traffic)
- Support multiple languages (English, Hindi, regional)
- Include UPI and Indian payment methods
- Consider 3G/4G network optimization
- Use Indian timezone (IST) for scheduling

## Component Structure
- Create reusable UI components
- Use compound component patterns for complex forms
- Implement proper loading and error states
- Follow accessibility guidelines (WCAG 2.1)

## Performance Optimization
- Implement code splitting and lazy loading
- Optimize images with Next.js Image component
- Use React.memo and useMemo for expensive operations
- Minimize bundle size with tree shaking
