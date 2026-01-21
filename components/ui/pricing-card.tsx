"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  name: string
  speed: string
  price: number
  features: string[]
  popular?: boolean
  delay?: number
}

export function PricingCard({
  name,
  speed,
  price,
  features,
  popular = false,
  delay = 0,
}: PricingCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)

  // Mouse position for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  })

  // Glare effect position
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)

    mouseX.set(percentX * 0.5)
    mouseY.set(percentY * 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        delay
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative flex flex-col p-6 bg-white rounded-2xl border transition-all duration-300 cursor-pointer group",
        popular
          ? "border-primary shadow-xl shadow-primary/20 scale-[1.02] z-10"
          : "border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
      )}
    >
      {/* Glare effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(14,165,233,0.15) 0%, transparent 50%)`
          ),
        }}
      />

      {/* Popular badge with animation */}
      {popular && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.4 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2"
        >
          <span className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg shadow-primary/30">
            <Sparkles className="w-3 h-3" />
            Most Popular
          </span>
        </motion.div>
      )}

      {/* Plan name */}
      <h3 className="text-lg font-semibold text-foreground">{name}</h3>

      {/* Speed with animated gradient */}
      <div className="mt-2 flex items-baseline gap-1">
        <motion.span
          className={cn(
            "text-4xl font-bold",
            popular
              ? "bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
              : "text-foreground"
          )}
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
        >
          {speed}
        </motion.span>
        <span className="text-muted-foreground">Mbps</span>
      </div>

      {/* Price */}
      <div className="mt-4 pb-6 border-b border-border">
        <span className="text-3xl font-bold text-foreground">
          ₱{price.toLocaleString()}
        </span>
        <span className="text-muted-foreground">/mo</span>
      </div>

      {/* Features with staggered animation */}
      <ul className="mt-6 space-y-3 flex-1">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3 + index * 0.08, duration: 0.3 }}
            className="flex items-start gap-3 group/item"
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Check
                className={cn(
                  "h-5 w-5 flex-shrink-0 mt-0.5 transition-colors",
                  popular ? "text-primary" : "text-primary/70 group-hover/item:text-primary"
                )}
              />
            </motion.div>
            <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* CTA with enhanced animation */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6"
      >
        <Button
          className={cn(
            "w-full relative overflow-hidden group/btn",
            popular && "shadow-lg shadow-primary/30"
          )}
          variant={popular ? "default" : "outline"}
        >
          {/* Shimmer effect on popular button */}
          {popular && (
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}
          <span className="relative z-10">Get Started</span>
        </Button>
      </motion.div>

      {/* Decorative gradient for popular card */}
      {popular && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      )}
    </motion.div>
  )
}
