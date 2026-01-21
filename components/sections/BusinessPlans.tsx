"use client"

import { motion } from "framer-motion"
import { PricingCard } from "@/components/ui/pricing-card"

const smePlans = [
  {
    name: "Prime SME 100",
    speed: "100",
    price: 2999,
    features: [
      "Dedicated bandwidth",
      "1 Static IP address",
      "24/7 priority support",
      "99.5% SLA guarantee",
      "Free installation",
      "Business hours on-site support",
    ],
    popular: false,
  },
  {
    name: "Prime SME 200",
    speed: "200",
    price: 4499,
    features: [
      "Dedicated bandwidth",
      "2 Static IP addresses",
      "24/7 priority support",
      "99.5% SLA guarantee",
      "Free installation",
      "Same-day on-site support",
      "Monthly performance reports",
    ],
    popular: true,
  },
]

const corporatePlans = [
  {
    name: "Prime Corporate 500",
    speed: "500",
    price: 9999,
    features: [
      "Dedicated fiber line",
      "8 Static IP addresses",
      "Dedicated account manager",
      "99.99% SLA guarantee",
      "Free premium installation",
      "4-hour response time",
      "Quarterly business reviews",
      "Network monitoring dashboard",
    ],
    popular: false,
  },
  {
    name: "Prime Corporate 1G",
    speed: "1000",
    price: 14999,
    features: [
      "Dedicated fiber line",
      "16 Static IP addresses",
      "Dedicated account manager",
      "99.99% SLA guarantee",
      "Free premium installation",
      "2-hour response time",
      "Monthly business reviews",
      "Network monitoring dashboard",
      "Redundant connection option",
    ],
    popular: true,
  },
]

export function BusinessPlans() {
  return (
    <>
      {/* SME Plans Section */}
      <section className="py-20 section-light">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              SME Plans
            </span>
            <h2 className="text-headline text-foreground mb-4">
              For Small & Medium Businesses
            </h2>
            <p className="text-subtitle max-w-2xl mx-auto">
              Reliable connectivity for growing businesses. Get dedicated support
              and guaranteed uptime without enterprise pricing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {smePlans.map((plan, index) => (
              <PricingCard key={plan.name} {...plan} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Plans Section */}
      <section className="py-20 section-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Corporate Plans
            </span>
            <h2 className="text-headline text-foreground mb-4">
              Enterprise-Grade Solutions
            </h2>
            <p className="text-subtitle max-w-2xl mx-auto">
              Maximum reliability for mission-critical operations. Dedicated fiber,
              guaranteed SLA, and white-glove service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {corporatePlans.map((plan, index) => (
              <PricingCard key={plan.name} {...plan} delay={index * 0.1} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            Need a custom solution? Contact our sales team for tailored enterprise packages.
          </motion.p>
        </div>
      </section>
    </>
  )
}
