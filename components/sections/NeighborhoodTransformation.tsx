"use client"

import { motion } from "framer-motion"
import { Cable, Users, Clock, Shield } from "lucide-react"
import { NeighborhoodReveal } from "@/components/ui/neighborhood-reveal"

const benefits = [
  {
    icon: Cable,
    title: "Fiber to Your Door",
    description: "Direct fiber connection, not shared copper",
  },
  {
    icon: Users,
    title: "Whole Barangay Coverage",
    description: "We don't leave neighbors behind",
  },
  {
    icon: Clock,
    title: "Quick Installation",
    description: "Usually within 3-5 business days",
  },
  {
    icon: Shield,
    title: "Future-Proof Network",
    description: "Infrastructure built to last decades",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

export function NeighborhoodTransformation() {
  return (
    <section className="py-20 section-white overflow-hidden">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Community First
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-headline text-foreground mb-4"
          >
            Connecting Neighborhoods
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-subtitle max-w-2xl mx-auto"
          >
            We&apos;re wiring Cavite, one barangay at a time.
            When we arrive, the whole neighborhood benefits.
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Benefits List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5 order-2 lg:order-1"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="flex gap-4 p-4 bg-white rounded-xl border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              className="pt-4"
            >
              <p className="text-sm text-muted-foreground italic">
                &ldquo;When Imperial comes to your street, everyone wins.&rdquo;
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Neighborhood Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <NeighborhoodReveal className="mx-auto" />
          </motion.div>
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        />
      </div>
    </section>
  )
}
