"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={cn(
        "relative flex flex-col p-6 bg-white rounded-2xl border transition-shadow duration-300",
        popular
          ? "border-primary shadow-lg shadow-primary/10"
          : "border-border hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Plan name */}
      <h3 className="text-lg font-semibold text-foreground">{name}</h3>

      {/* Speed */}
      <div className="mt-2">
        <span className="text-4xl font-bold text-foreground">{speed}</span>
        <span className="text-muted-foreground ml-1">Mbps</span>
      </div>

      {/* Price */}
      <div className="mt-4 pb-6 border-b border-border">
        <span className="text-3xl font-bold text-foreground">
          ₱{price.toLocaleString()}
        </span>
        <span className="text-muted-foreground">/mo</span>
      </div>

      {/* Features */}
      <ul className="mt-6 space-y-3 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        className={cn("mt-6 w-full", popular && "cta-pulse")}
        variant={popular ? "default" : "outline"}
      >
        Get Started
      </Button>
    </motion.div>
  )
}
