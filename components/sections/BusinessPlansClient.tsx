"use client"

import { motion } from "framer-motion"
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel"
import { PricingCard } from "@/components/ui/pricing-card"
import type { PublicPlanWithPopularity } from "@/lib/actions/plans"

interface BusinessPlansClientProps {
  smePlans: PublicPlanWithPopularity[]
  corporatePlans: PublicPlanWithPopularity[]
  smeDefaultIndex: number
  corpDefaultIndex: number
}

// Component for rendering plans - uses carousel for 3+ plans, grid for fewer
function PlanSection({
  plans,
  defaultIndex,
}: {
  plans: PublicPlanWithPopularity[]
  defaultIndex: number
}) {
  // Use carousel for 3+ plans, grid layout for fewer
  if (plans.length >= 3) {
    return (
      <CoverflowCarousel defaultIndex={defaultIndex}>
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            name={plan.name}
            speed={String(plan.speed)}
            price={plan.price}
            features={plan.features}
            popular={plan.popularityRank === 1}
            disableEntrance
          />
        ))}
      </CoverflowCarousel>
    )
  }

  // Grid layout for 1-2 plans
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
      {plans.map((plan, index) => (
        <PricingCard
          key={plan.id}
          name={plan.name}
          speed={String(plan.speed)}
          price={plan.price}
          features={plan.features}
          popular={plan.popularityRank === 1}
          delay={index * 0.1}
        />
      ))}
    </div>
  )
}

export function BusinessPlansClient({
  smePlans,
  corporatePlans,
  smeDefaultIndex,
  corpDefaultIndex,
}: BusinessPlansClientProps) {
  return (
    <>
      {/* SME Plans Section */}
      {smePlans.length > 0 && (
        <section className="py-20 section-light overflow-hidden">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
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

            <PlanSection
              plans={smePlans}
              defaultIndex={smeDefaultIndex}
            />
          </div>
        </section>
      )}

      {/* Corporate Plans Section */}
      {corporatePlans.length > 0 && (
        <section className="py-20 section-white overflow-hidden">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
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

            <PlanSection
              plans={corporatePlans}
              defaultIndex={corpDefaultIndex}
            />

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
      )}
    </>
  )
}
