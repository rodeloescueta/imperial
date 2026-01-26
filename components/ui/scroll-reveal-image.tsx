"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollRevealImageProps {
  direction: "left" | "right"
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ScrollRevealImage({
  direction,
  children,
  className,
  delay = 0,
}: ScrollRevealImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

  // Overlay animation - sweeps across the image
  const overlayVariants = {
    hidden: {
      x: direction === "left" ? "-100%" : "100%",
    },
    visible: {
      x: direction === "left" ? "100%" : "-100%",
      transition: {
        duration: 0.6,
        ease: [0.65, 0, 0.35, 1] as const,
        delay: delay,
      },
    },
  }

  // Image container slides in from the side
  const containerVariants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -60 : 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] as const,
        delay: delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Content (image placeholder) */}
      <div className="relative">
        {children}
      </div>

      {/* Animated overlay bar */}
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="absolute inset-0 bg-primary z-10"
        style={{ willChange: "transform" }}
      />
    </motion.div>
  )
}
