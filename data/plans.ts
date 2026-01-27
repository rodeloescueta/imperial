export interface Plan {
  name: string
  tier: string
  speed: string
  price: number
  features: string[]
  popular?: boolean
}

export const residentialPlans: Plan[] = [
  {
    name: "Solo",
    tier: "SOLO",
    speed: "35",
    price: 599,
    features: [
      "Unlimited data",
      "Free installation",
      "Free Wi-Fi router",
      "24/7 customer support",
    ],
  },
  {
    name: "Bronze",
    tier: "BRONZE",
    speed: "50",
    price: 799,
    features: [
      "Unlimited data",
      "Free installation",
      "Free Wi-Fi router",
      "24/7 customer support",
      "No lock-in period",
    ],
  },
  {
    name: "Silver",
    tier: "SILVER",
    speed: "100",
    price: 999,
    features: [
      "Unlimited data",
      "Free installation",
      "Free Wi-Fi 6 router",
      "24/7 priority support",
      "No lock-in period",
      "Free 1 month for referrals",
    ],
    popular: true,
  },
  {
    name: "Gold",
    tier: "GOLD",
    speed: "150",
    price: 1200,
    features: [
      "Unlimited data",
      "Free installation",
      "Free Wi-Fi 6 router",
      "24/7 priority support",
      "No lock-in period",
      "Free 1 month for referrals",
    ],
  },
  {
    name: "Platinum",
    tier: "PLATINUM",
    speed: "200",
    price: 1400,
    features: [
      "Unlimited data",
      "Free installation",
      "Free Wi-Fi 6 router",
      "24/7 priority support",
      "No lock-in period",
      "Free 1 month for referrals",
      "Static IP available",
    ],
  },
  {
    name: "Diamond",
    tier: "DIAMOND",
    speed: "300",
    price: 1600,
    features: [
      "Unlimited data",
      "Free installation",
      "Free Wi-Fi 6 router",
      "24/7 priority support",
      "No lock-in period",
      "Free 1 month for referrals",
      "Static IP included",
    ],
  },
  {
    name: "Ruby",
    tier: "RUBY",
    speed: "500",
    price: 2000,
    features: [
      "Unlimited data",
      "Free installation",
      "Free Wi-Fi 6E router",
      "24/7 VIP support",
      "No lock-in period",
      "Free 1 month for referrals",
      "Static IP included",
      "Priority installation",
    ],
  },
]

// Stats based on actual customer data (as of Jan 2026)
export const stats = {
  customerCount: 9700,
  uptime: 99.9,
  maxSpeed: 500,
  supportHours: 24,
}
