// User access control for internal team vs external users
import { currentUser } from '@clerk/nextjs/server';

export async function getUserAccessLevel() {
  const user = await currentUser();
  
  if (!user) {
    return { level: 'none', user: null };
  }

  const userEmail = user.emailAddresses[0]?.emailAddress;
  const internalTeamEmails = (process.env.INTERNAL_TEAM_EMAILS || '').split(',');
  const isInternalTeam = internalTeamEmails.includes(userEmail);
  const paymentGatewayEnabled = process.env.PAYMENT_GATEWAY_ENABLED === 'true';

  return {
    level: isInternalTeam ? 'internal' : 'external',
    user,
    userEmail,
    isInternalTeam,
    paymentGatewayEnabled,
    hasFullAccess: isInternalTeam || paymentGatewayEnabled
  };
}

export function getSubscriptionStatus(accessLevel: any) {
  if (accessLevel.isInternalTeam) {
    return {
      plan: 'Internal Team',
      status: 'active',
      features: ['unlimited_generations', 'all_business_types', 'priority_support'],
      canUseFeature: () => true
    };
  }

  // For external users when payment is not enabled
  if (!accessLevel.paymentGatewayEnabled) {
    return {
      plan: 'Free Preview',
      status: 'trial',
      features: ['limited_generations'],
      canUseFeature: (feature: string) => feature === 'basic_generation',
      remainingGenerations: 5
    };
  }

  // Future: When payment gateway is enabled, check actual subscription
  return {
    plan: 'Free',
    status: 'trial',
    features: ['limited_generations'],
    canUseFeature: (feature: string) => feature === 'basic_generation',
    remainingGenerations: 5
  };
}
