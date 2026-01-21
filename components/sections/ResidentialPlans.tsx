"use client"

import { motion } from "framer-motion"
import { PricingCard } from "@/components/ui/pricing-card"

const residentialPlans = [
  {
    name: "Essential 50",
    speed: "50",
    price: 1299,
    features: [
      "Unlimited data",
      "Free installation",
      "Free Wi-Fi router",
      "24/7 customer support",
      "No lock-in period",
    ],
    popular: false,
  },
  {
    name: "Essential 100",
    speed: "100",
    price: 1799,
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
    name: "Essential 200",
    speed: "200",
    price: 2499,
    features: [
      "Unlimited data",
      "Free installation",
      "Free Wi-Fi 6 router",
      "24/7 priority support",
      "No lock-in period",
      "Free 1 month for referrals",
      "Static IP available",
    ],
    popular: false,
  },
]

export function ResidentialPlans() {
  return (
    <section className="py-20 section-light">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Residential Plans
          </span>
          <h2 className="text-headline text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            Choose the perfect plan for your home. All plans include unlimited
            data, free installation, and 24/7 local support.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {residentialPlans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              {...plan}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Additional Info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          All prices are VAT inclusive. Installation typically completed within
          3-5 business days.
        </motion.p>
      </div>
    </section>
  )
}
