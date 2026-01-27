"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { getFeatureDescription } from "@/data/feature-descriptions"

// Default features to show when plan has no features
const defaultFeatures = [
  "Unlimited data",
  "Free installation",
  "24/7 customer support",
  "No lock-in period",
]

interface PricingCardProps {
  name: string
  speed: string
  price: number
  features: string[]
  popular?: boolean
  delay?: number
  disableEntrance?: boolean
}

export function PricingCard({
  name,
  speed,
  price,
  features,
  popular = false,
  delay = 0,
  disableEntrance = false,
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

  // Entrance animation props (disabled for carousel use)
  const entranceProps = disableEntrance
    ? {}
    : {
        initial: { opacity: 0, y: 20 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, margin: "-50px" } as const,
        transition: {
          type: "spring" as const,
          stiffness: 100,
          damping: 15,
          mass: 1,
          delay,
        },
      }

  return (
    <motion.div
      ref={cardRef}
      {...entranceProps}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative flex flex-col p-6 bg-white rounded-2xl border transition-all duration-300 cursor-pointer group h-full min-h-[520px]",
        popular
          ? "border-primary shadow-xl shadow-primary/20 scale-[1.02] z-10 lg:scale-[1.05]"
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
          className="absolute -top-4 left-1/2 -translate-x-1/2"
        >
          <motion.span
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-primary via-primary/90 to-primary rounded-full shadow-lg shadow-primary/40"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular
          </motion.span>
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

      {/* Features with staggered animation and tooltips */}
      <ul className="mt-6 space-y-3 flex-1">
        {(features.length > 0 ? features : defaultFeatures).map((feature, index) => {
          const description = getFeatureDescription(feature)

          const featureContent = (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.3 + index * 0.08, duration: 0.3 }}
              className={cn(
                "flex items-start gap-3 group/item",
                description && "cursor-help"
              )}
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
              <span className={cn(
                "text-sm text-muted-foreground group-hover/item:text-foreground transition-colors",
                description && "underline decoration-dotted decoration-muted-foreground/50 underline-offset-2"
              )}>
                {feature}
              </span>
            </motion.li>
          )

          if (description) {
            return (
              <Tooltip key={index} content={description} side="top">
                {featureContent}
              </Tooltip>
            )
          }

          return featureContent
        })}
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
