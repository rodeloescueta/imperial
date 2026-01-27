// Feature descriptions for tooltip display on pricing cards
export const featureDescriptions: Record<string, string> = {
  // Common features
  "Unlimited data": "No data caps or throttling. Stream, download, and browse without limits.",
  "Free installation": "Professional installation by our certified technicians at no extra cost.",
  "Free Wi-Fi router": "Dual-band Wi-Fi router included to get you connected right away.",
  "Free Wi-Fi 6 router": "Latest Wi-Fi 6 router for faster speeds and better coverage.",
  "24/7 customer support": "Round-the-clock support via phone, chat, or email.",
  "24/7 priority support": "Priority queue for faster response times, 24 hours a day.",
  "No lock-in period": "Cancel anytime without penalty fees or long-term contracts.",
  "Free 1 month for referrals": "Get a free month of service for each friend you refer.",

  // Business features
  "Dedicated bandwidth": "Your connection isn't shared with neighbors - consistent speeds guaranteed.",
  "Static IP address": "Fixed IP address for hosting servers, remote access, or VPN.",
  "1 Static IP address": "One dedicated static IP included with your plan.",
  "2 Static IP addresses": "Two dedicated static IPs for multiple services or devices.",
  "8 Static IP addresses": "Eight static IPs for enterprise networking needs.",
  "16 Static IP addresses": "Sixteen static IPs for large-scale enterprise operations.",
  "99.5% SLA guarantee": "Service Level Agreement guaranteeing 99.5% network uptime.",
  "99.99% SLA guarantee": "Enterprise-grade SLA with 99.99% uptime guarantee.",
  "Business hours on-site support": "Technician visits available Monday-Friday, 9AM-6PM.",
  "Same-day on-site support": "Emergency technician dispatch within the same business day.",
  "Monthly performance reports": "Detailed reports on your connection speed and reliability.",
  "Quarterly business reviews": "Face-to-face meetings to review service and plan improvements.",
  "Monthly business reviews": "Regular check-ins to ensure your connectivity meets business needs.",

  // Corporate features
  "Dedicated fiber line": "Exclusive fiber connection from our network to your premises.",
  "Dedicated account manager": "Personal contact for all your service needs and inquiries.",
  "Free premium installation": "White-glove installation with network assessment included.",
  "4-hour response time": "Guaranteed technician response within 4 hours for issues.",
  "2-hour response time": "Critical response SLA with 2-hour maximum response time.",
  "Network monitoring dashboard": "Real-time dashboard to monitor your connection status.",
  "Redundant connection option": "Add a backup line for mission-critical uptime requirements.",
}

// Helper to get description with fallback
export function getFeatureDescription(feature: string): string | null {
  // Exact match
  if (featureDescriptions[feature]) {
    return featureDescriptions[feature]
  }

  // Partial match (case-insensitive)
  const lowerFeature = feature.toLowerCase()
  for (const [key, value] of Object.entries(featureDescriptions)) {
    if (key.toLowerCase().includes(lowerFeature) || lowerFeature.includes(key.toLowerCase())) {
      return value
    }
  }

  return null
}
