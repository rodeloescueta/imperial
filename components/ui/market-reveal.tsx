"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface MarketRevealProps {
  className?: string
}

export function MarketReveal({ className }: MarketRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Big ISP towers shrink
  const towerScale = useTransform(scrollYProgress, [0.1, 0.6], [1, 0.55])
  const towerOpacity = useTransform(scrollYProgress, [0.1, 0.6], [1, 0.5])
  const towerY = useTransform(scrollYProgress, [0.1, 0.6], [0, 40])

  // Imperial grows
  const imperialScale = useTransform(scrollYProgress, [0.1, 0.5], [0.15, 1])
  const imperialOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])
  const imperialY = useTransform(scrollYProgress, [0.1, 0.5], [80, 0])

  // Coverage waves expand
  const wave1Scale = useTransform(scrollYProgress, [0.3, 0.7], [0, 2.5])
  const wave1Opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.4, 0])
  const wave2Scale = useTransform(scrollYProgress, [0.35, 0.75], [0, 2.5])
  const wave2Opacity = useTransform(scrollYProgress, [0.35, 0.55, 0.75], [0, 0.3, 0])
  const wave3Scale = useTransform(scrollYProgress, [0.4, 0.8], [0, 2.5])
  const wave3Opacity = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 0.2, 0])

  // Labels appear (staggered)
  const label1Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])
  const label2Opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1])
  const label3Opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1])

  // If reduced motion, show final state
  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={cn("relative w-full h-[450px] md:h-[500px]", className)}
        role="img"
        aria-label="Visualization showing Imperial Internet growing as a local challenger in the market"
      >
        <StaticMarketView />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-[450px] md:h-[500px] overflow-hidden", className)}
      role="img"
      aria-label="Visualization showing Imperial Internet growing as a local challenger in the market"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl" />

      {/* SVG Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="500"
          height="400"
          viewBox="0 0 500 400"
          className="w-full h-full max-w-[500px]"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Imperial glow filter */}
            <filter id="imperialGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Tower shadow */}
            <filter id="towerShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
            </filter>

            {/* Gradients for towers */}
            <linearGradient id="towerGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#6B7280" />
            </linearGradient>
            <linearGradient id="towerGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#6B7280" />
            </linearGradient>
            <linearGradient id="towerGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#6B7280" />
            </linearGradient>

            {/* Imperial gradient */}
            <linearGradient id="imperialGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Ground line */}
          <line x1="30" y1="320" x2="470" y2="320" stroke="#E5E7EB" strokeWidth="2" />

          {/* Big ISP Tower 1 (Left) */}
          <motion.g
            style={{
              scale: towerScale,
              opacity: towerOpacity,
              y: towerY,
              originX: "100px",
              originY: "320px",
            }}
          >
            <rect
              x="60"
              y="120"
              width="80"
              height="200"
              rx="4"
              fill="url(#towerGrad1)"
              filter="url(#towerShadow)"
            />
            {/* Tower windows */}
            <rect x="70" y="140" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="100" y="140" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="70" y="170" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="100" y="170" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="70" y="200" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="100" y="200" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            {/* Antenna */}
            <rect x="95" y="100" width="10" height="20" fill="#4B5563" />
            <circle cx="100" cy="95" r="6" fill="#6B7280" />
          </motion.g>

          {/* Big ISP Tower 2 (Center-Left) */}
          <motion.g
            style={{
              scale: towerScale,
              opacity: towerOpacity,
              y: towerY,
              originX: "210px",
              originY: "320px",
            }}
          >
            <rect
              x="170"
              y="100"
              width="80"
              height="220"
              rx="4"
              fill="url(#towerGrad2)"
              filter="url(#towerShadow)"
            />
            {/* Tower windows */}
            <rect x="180" y="120" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="210" y="120" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="180" y="150" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="210" y="150" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="180" y="180" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="210" y="180" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="180" y="210" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="210" y="210" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            {/* Antenna */}
            <rect x="205" y="75" width="10" height="25" fill="#4B5563" />
            <circle cx="210" cy="68" r="8" fill="#6B7280" />
          </motion.g>

          {/* Big ISP Tower 3 (Right) */}
          <motion.g
            style={{
              scale: towerScale,
              opacity: towerOpacity,
              y: towerY,
              originX: "400px",
              originY: "320px",
            }}
          >
            <rect
              x="360"
              y="140"
              width="80"
              height="180"
              rx="4"
              fill="url(#towerGrad3)"
              filter="url(#towerShadow)"
            />
            {/* Tower windows */}
            <rect x="370" y="160" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="400" y="160" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="370" y="190" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="400" y="190" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="370" y="220" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            <rect x="400" y="220" width="20" height="15" rx="2" fill="#E5E7EB" opacity="0.5" />
            {/* Antenna */}
            <rect x="395" y="118" width="10" height="22" fill="#4B5563" />
            <circle cx="400" cy="112" r="7" fill="#6B7280" />
          </motion.g>

          {/* Coverage Waves (from Imperial) */}
          <motion.circle
            cx="290"
            cy="280"
            r="40"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2"
            style={{ scale: wave1Scale, opacity: wave1Opacity }}
          />
          <motion.circle
            cx="290"
            cy="280"
            r="40"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            style={{ scale: wave2Scale, opacity: wave2Opacity }}
          />
          <motion.circle
            cx="290"
            cy="280"
            r="40"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="1"
            style={{ scale: wave3Scale, opacity: wave3Opacity }}
          />

          {/* Imperial Tower (Center) - Growing */}
          <motion.g
            style={{
              scale: imperialScale,
              opacity: imperialOpacity,
              y: imperialY,
              originX: "290px",
              originY: "320px",
            }}
            filter="url(#imperialGlow)"
          >
            {/* Main tower */}
            <rect
              x="260"
              y="160"
              width="60"
              height="160"
              rx="6"
              fill="url(#imperialGrad)"
            />
            {/* Imperial logo area */}
            <rect x="270" y="180" width="40" height="40" rx="4" fill="#ffffff" opacity="0.9" />
            <text
              x="290"
              y="207"
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fill="#0ea5e9"
            >
              I
            </text>
            {/* Windows */}
            <rect x="270" y="235" width="15" height="12" rx="2" fill="#ffffff" opacity="0.6" />
            <rect x="295" y="235" width="15" height="12" rx="2" fill="#ffffff" opacity="0.6" />
            <rect x="270" y="260" width="15" height="12" rx="2" fill="#ffffff" opacity="0.6" />
            <rect x="295" y="260" width="15" height="12" rx="2" fill="#ffffff" opacity="0.6" />
            <rect x="270" y="285" width="15" height="12" rx="2" fill="#ffffff" opacity="0.6" />
            <rect x="295" y="285" width="15" height="12" rx="2" fill="#ffffff" opacity="0.6" />
            {/* Antenna with signal */}
            <rect x="285" y="130" width="10" height="30" fill="#0284c7" />
            <circle cx="290" cy="122" r="10" fill="#0ea5e9" />
            {/* Signal waves on antenna */}
            <path
              d="M 275 115 Q 290 100 305 115"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              opacity="0.7"
            />
            <path
              d="M 268 108 Q 290 88 312 108"
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="1.5"
              opacity="0.5"
            />
          </motion.g>
        </svg>
      </div>

      {/* Labels - Desktop */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        <motion.div
          className="absolute bottom-24 left-[15%]"
          style={{ opacity: label1Opacity }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
            <span className="text-sm font-semibold text-sky-600">500+ Happy Customers</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-12 right-[20%]"
          style={{ opacity: label2Opacity }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
            <span className="text-sm font-semibold text-sky-600">Growing Daily</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-16 right-[15%]"
          style={{ opacity: label3Opacity }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
            <span className="text-sm font-semibold text-sky-600">Locally Owned</span>
          </div>
        </motion.div>
      </div>

      {/* Labels - Mobile */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 md:hidden"
        style={{ opacity: label1Opacity }}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-sky-100">
            <span className="text-xs font-semibold text-sky-600">500+ Customers</span>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-sky-100">
            <span className="text-xs font-semibold text-sky-600">Growing Daily</span>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-sky-100">
            <span className="text-xs font-semibold text-sky-600">Local</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Static version for reduced motion
function StaticMarketView() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl" />
      <svg
        width="500"
        height="400"
        viewBox="0 0 500 400"
        className="w-full h-full max-w-[500px] relative z-10"
      >
        <defs>
          <filter id="imperialGlowStatic" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="imperialGradStatic" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* Ground line */}
        <line x1="30" y1="320" x2="470" y2="320" stroke="#E5E7EB" strokeWidth="2" />

        {/* Shrunk towers */}
        <g opacity="0.5" transform="translate(0, 40) scale(0.55)">
          <rect x="60" y="120" width="80" height="200" rx="4" fill="#6B7280" />
          <rect x="170" y="100" width="80" height="220" rx="4" fill="#6B7280" />
          <rect x="360" y="140" width="80" height="180" rx="4" fill="#6B7280" />
        </g>

        {/* Imperial Tower - Full size */}
        <g filter="url(#imperialGlowStatic)">
          <rect x="260" y="160" width="60" height="160" rx="6" fill="url(#imperialGradStatic)" />
          <rect x="270" y="180" width="40" height="40" rx="4" fill="#ffffff" opacity="0.9" />
          <text x="290" y="207" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0ea5e9">I</text>
          <rect x="285" y="130" width="10" height="30" fill="#0284c7" />
          <circle cx="290" cy="122" r="10" fill="#0ea5e9" />
        </g>
      </svg>

      {/* Static labels */}
      <div className="absolute bottom-24 left-[15%] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
          <span className="text-sm font-semibold text-sky-600">500+ Happy Customers</span>
        </div>
      </div>
      <div className="absolute bottom-12 right-[20%] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
          <span className="text-sm font-semibold text-sky-600">Growing Daily</span>
        </div>
      </div>
      <div className="absolute top-16 right-[15%] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
          <span className="text-sm font-semibold text-sky-600">Locally Owned</span>
        </div>
      </div>
    </div>
  )
}
