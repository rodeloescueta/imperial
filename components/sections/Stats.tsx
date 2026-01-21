"use client"

import { motion } from "framer-motion"
import { Users, Wifi, HeadphonesIcon, TrendingUp } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Happy Customers",
    description: "Homes and businesses connected",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Wifi,
    value: 99.9,
    suffix: "%",
    label: "Uptime",
    description: "Network reliability guaranteed",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: HeadphonesIcon,
    value: 24,
    suffix: "/7",
    label: "Support",
    description: "Local team ready to help",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: TrendingUp,
    value: 200,
    suffix: " Mbps",
    label: "Max Speed",
    description: "Blazing fast fiber connection",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
}

export function Stats() {
  return (
    <section className="py-24 section-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Our Impact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-headline text-foreground mb-4"
          >
            Trusted by Caviteños
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-subtitle max-w-2xl mx-auto"
          >
            Join hundreds of satisfied customers who have made the switch to
            Imperial Internet.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative text-center group"
            >
              {/* Card background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-muted/30 border border-border group-hover:border-primary/20 group-hover:shadow-xl group-hover:shadow-primary/5 transition-all duration-300" />

              <div className="relative p-8">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-6 mx-auto`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </motion.div>

                {/* Counter */}
                <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>

                {/* Label */}
                <div className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>

                {/* Decorative glow on hover */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                  style={{
                    background: `radial-gradient(circle, ${stat.color.includes('primary') ? 'rgba(14,165,233,0.15)' : stat.color.includes('green') ? 'rgba(34,197,94,0.15)' : stat.color.includes('purple') ? 'rgba(168,85,247,0.15)' : 'rgba(234,179,8,0.15)'} 0%, transparent 70%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated background elements */}
        <motion.div
          className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </section>
  )
}
