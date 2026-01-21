"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useCountUp } from "@/lib/hooks/use-count-up"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const { count, ref, hasAnimated } = useCountUp({ end, duration })

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={cn("relative inline-block", className)}>
      <motion.span
        initial={{ scale: 1 }}
        animate={hasAnimated ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {count}
        {suffix}
      </motion.span>

      {/* Sparkle effect on completion */}
      <AnimatePresence>
        {hasAnimated && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-primary pointer-events-none"
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  x: [0, (i - 1) * 20],
                  y: [0, -15 - i * 5],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                style={{
                  top: "0",
                  left: "50%",
                  fontSize: "0.5em",
                }}
              >
                ✦
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>
    </span>
  )
}
