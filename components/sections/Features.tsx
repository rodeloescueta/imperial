"use client"

import { motion } from "framer-motion"
import { Zap, Shield, HeadphonesIcon, BadgeCheck } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description:
      "Experience fiber-optic speeds up to 200 Mbps. Stream, game, and work without buffering.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Shield,
    title: "Always Reliable",
    description:
      "99.9% uptime guarantee backed by our service level agreement. Your connection, always on.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: HeadphonesIcon,
    title: "Local Support",
    description:
      "Cavite-based customer service team available 24/7. Real people, real solutions.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: BadgeCheck,
    title: "No Hidden Fees",
    description:
      "Transparent pricing with no surprises. What you see is what you pay, every month.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Features() {
  return (
    <section className="py-20 section-white">
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
            Why Choose Us
          </span>
          <h2 className="text-headline text-foreground mb-4">
            Internet That Works for You
          </h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            We&apos;re not just another ISP. We&apos;re your neighbors,
            committed to bringing you the best internet experience in Cavite.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group p-6 bg-white rounded-2xl border border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
