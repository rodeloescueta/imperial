"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MovingBorderProps {
  children: React.ReactNode
  duration?: number
  rx?: string
  ry?: string
  className?: string
  containerClassName?: string
  borderClassName?: string
  as?: React.ElementType
  onClick?: () => void
}

export function MovingBorder({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...props
}: MovingBorderProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      className={cn(
        "relative p-[1px] overflow-hidden bg-transparent group",
        containerClassName
      )}
      {...props}
    >
      {/* Moving border */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="100%"
            height="100%"
            rx={rx}
            ry={ry}
            fill="none"
            strokeWidth="2"
            className={cn("stroke-primary", borderClassName)}
            strokeDasharray="100 200"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-300"
              dur={`${duration}ms`}
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at center, rgba(14,165,233,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div
        className={cn(
          "relative bg-white rounded-lg px-6 py-3 text-foreground font-medium",
          className
        )}
      >
        {children}
      </div>
    </Component>
  )
}

// Alternative: Button with animated gradient border
interface GradientBorderButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function GradientBorderButton({
  children,
  className,
  onClick,
}: GradientBorderButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-lg p-[2px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group",
        className
      )}
    >
      {/* Animated gradient background */}
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0EA5E9_0%,#ffffff_50%,#0EA5E9_100%)]" />

      {/* Inner content */}
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[6px] bg-white px-6 py-2 text-sm font-medium text-foreground backdrop-blur-3xl transition-all group-hover:bg-primary/5">
        {children}
      </span>
    </button>
  )
}

// Shimmering button effect
interface ShimmerButtonProps {
  children: React.ReactNode
  className?: string
  shimmerColor?: string
  onClick?: () => void
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "#0EA5E9",
  onClick,
}: ShimmerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex h-12 items-center justify-center rounded-lg border border-primary/20 bg-primary px-8 font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 overflow-hidden group",
        className
      )}
    >
      {/* Shimmer effect */}
      <span
        className="absolute inset-0 overflow-hidden rounded-lg"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}40, transparent)`,
          transform: "translateX(-100%)",
          animation: "shimmer 2s infinite",
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </button>
  )
}
