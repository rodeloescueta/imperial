"use client"

import { motion } from "framer-motion"
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel"
import { PricingCard } from "@/components/ui/pricing-card"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import type { PublicPlanWithPopularity } from "@/lib/actions/plans"

interface ResidentialPlansClientProps {
  plans: PublicPlanWithPopularity[]
  defaultIndex: number
}

export function ResidentialPlansClient({
  plans,
  defaultIndex,
}: ResidentialPlansClientProps) {
  return (
    <section className="py-20 section-light overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <ContainerScroll
          titleComponent={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
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
          }
        >
          {/* Coverflow Carousel */}
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
        </ContainerScroll>

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
