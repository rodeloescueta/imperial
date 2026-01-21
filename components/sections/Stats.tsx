"use client"

import { motion } from "framer-motion"
import { Users, Wifi, HeadphonesIcon } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Happy Customers",
    description: "Homes and businesses connected",
  },
  {
    icon: Wifi,
    value: 99.9,
    suffix: "%",
    label: "Uptime",
    description: "Network reliability guaranteed",
  },
  {
    icon: HeadphonesIcon,
    value: 24,
    suffix: "/7",
    label: "Support",
    description: "Local team ready to help",
  },
]

export function Stats() {
  return (
    <section className="py-20 section-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-headline text-foreground mb-4">
            Trusted by Caviteños
          </h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            Join hundreds of satisfied customers who have made the switch to
            Imperial Internet.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2000}
                />
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
