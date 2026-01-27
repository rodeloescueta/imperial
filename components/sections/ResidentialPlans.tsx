"use client"

import { motion } from "framer-motion"
import { PricingCard } from "@/components/ui/pricing-card"
import { residentialPlans } from "@/data/plans"

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

        {/* Pricing Cards - 7 plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {residentialPlans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              speed={plan.speed}
              price={plan.price}
              features={plan.features}
              popular={plan.popular}
              delay={index * 0.05}
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
