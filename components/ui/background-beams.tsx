"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Fixed particle positions to avoid hydration mismatch
const particlePositions = [
  { x: 5, y: 10, duration: 3.5, delay: 0.2 },
  { x: 15, y: 25, duration: 4.0, delay: 0.8 },
  { x: 25, y: 15, duration: 3.2, delay: 1.5 },
  { x: 35, y: 45, duration: 4.5, delay: 0.5 },
  { x: 45, y: 30, duration: 3.8, delay: 1.2 },
  { x: 55, y: 20, duration: 4.2, delay: 0.3 },
  { x: 65, y: 55, duration: 3.6, delay: 1.8 },
  { x: 75, y: 35, duration: 4.0, delay: 0.7 },
  { x: 85, y: 65, duration: 3.4, delay: 1.0 },
  { x: 95, y: 40, duration: 4.3, delay: 1.6 },
  { x: 10, y: 70, duration: 3.9, delay: 0.4 },
  { x: 20, y: 85, duration: 4.1, delay: 1.3 },
  { x: 30, y: 60, duration: 3.3, delay: 0.9 },
  { x: 40, y: 75, duration: 4.4, delay: 1.7 },
  { x: 50, y: 50, duration: 3.7, delay: 0.6 },
  { x: 60, y: 80, duration: 4.0, delay: 1.1 },
  { x: 70, y: 90, duration: 3.5, delay: 1.4 },
  { x: 80, y: 45, duration: 4.2, delay: 0.1 },
  { x: 90, y: 70, duration: 3.8, delay: 1.9 },
  { x: 12, y: 38, duration: 4.1, delay: 0.0 },
]

export function BackgroundBeams({ className }: { className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {/* Animated gradient that follows mouse subtly */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)",
        }}
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />

      {/* SVG Beams */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(14,165,233,0)" />
            <stop offset="50%" stopColor="rgba(14,165,233,0.5)" />
            <stop offset="100%" stopColor="rgba(14,165,233,0)" />
          </linearGradient>
          <linearGradient id="beam-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(14,165,233,0)" />
            <stop offset="50%" stopColor="rgba(14,165,233,0.3)" />
            <stop offset="100%" stopColor="rgba(14,165,233,0)" />
          </linearGradient>
        </defs>

        {/* Animated beam paths */}
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${-100 + i * 200},${600 + i * 50} Q${400 + i * 100},${200 - i * 30} ${900 + i * 150},${-100 + i * 40}`}
            stroke="url(#beam-gradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Secondary beams going opposite direction */}
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={`secondary-${i}`}
            d={`M${1200 - i * 200},${-50 + i * 100} Q${600 - i * 50},${400 + i * 50} ${-100 + i * 100},${700 - i * 100}`}
            stroke="url(#beam-gradient-2)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              duration: 5 + i * 0.7,
              repeat: Infinity,
              delay: 2 + i * 1.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Floating particles - fixed positions to avoid hydration mismatch */}
      {particlePositions.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
