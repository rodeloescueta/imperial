"use client"

import { motion } from "framer-motion"
import { HeadphonesIcon, Shield, Globe, TrendingUp } from "lucide-react"

const features = [
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description:
      "Your own account manager who knows your business. Direct line access and priority escalation for all issues.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Shield,
    title: "SLA Guarantee",
    description:
      "Service level agreements with uptime guarantees up to 99.99%. Automatic service credits if we don't deliver.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Globe,
    title: "Static IP",
    description:
      "Fixed IP addresses for hosting servers, VPNs, and remote access. Essential for business operations.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: TrendingUp,
    title: "Scalable",
    description:
      "Easily upgrade your plan as your business grows. No downtime, no hassle, just faster internet.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
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

export function BusinessFeatures() {
  return (
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
            Business Advantages
          </span>
          <h2 className="text-headline text-foreground mb-4">
            Why Businesses Choose Imperial
          </h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            We understand that downtime means lost revenue. That&apos;s why we go
            above and beyond for our business customers.
          </p>
        </motion.div>

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
