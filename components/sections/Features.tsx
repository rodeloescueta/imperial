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
    hoverBg: "group-hover:bg-yellow-100",
    glowColor: "rgba(234, 179, 8, 0.3)",
  },
  {
    icon: Shield,
    title: "Always Reliable",
    description:
      "99.9% uptime guarantee backed by our service level agreement. Your connection, always on.",
    color: "text-green-500",
    bgColor: "bg-green-50",
    hoverBg: "group-hover:bg-green-100",
    glowColor: "rgba(34, 197, 94, 0.3)",
  },
  {
    icon: HeadphonesIcon,
    title: "Local Support",
    description:
      "Cavite-based customer service team available 24/7. Real people, real solutions.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    hoverBg: "group-hover:bg-primary/20",
    glowColor: "rgba(14, 165, 233, 0.3)",
  },
  {
    icon: BadgeCheck,
    title: "No Hidden Fees",
    description:
      "Transparent pricing with no surprises. What you see is what you pay, every month.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    hoverBg: "group-hover:bg-purple-100",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
}

export function Features() {
  return (
    <section className="py-20 section-white overflow-hidden">
      <div className="container-wide">
        {/* Section Header */}
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
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-headline text-foreground mb-4"
          >
            Internet That Works for You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-subtitle max-w-2xl mx-auto"
          >
            We&apos;re not just another ISP. We&apos;re your neighbors,
            committed to bringing you the best internet experience in Cavite.
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative p-6 bg-white rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 cursor-pointer"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 40px ${feature.glowColor}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)"
              }}
            >
              {/* Icon with animation */}
              <motion.div
                className={`w-14 h-14 rounded-xl ${feature.bgColor} ${feature.hoverBg} flex items-center justify-center mb-5 transition-all duration-300`}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  scale: { duration: 0.2 },
                  rotate: { duration: 0.4 }
                }}
              >
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Animated border gradient on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${feature.glowColor} 0%, transparent 50%, ${feature.glowColor} 100%)`,
                  padding: "1px",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor",
                  WebkitMaskComposite: "xor",
                }}
              />

              {/* Floating decoration */}
              <motion.div
                className="absolute -top-1 -right-1 w-20 h-20 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl pointer-events-none"
                style={{ backgroundColor: feature.glowColor }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

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
