"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface DevicesRevealProps {
  className?: string
}

export function DevicesReveal({ className }: DevicesRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

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

  // Imperial wave sweeps from right to left
  const waveX = useTransform(scrollYProgress, [0.2, 0.5], [500, -100])
  const waveOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0, 1, 0])

  // Bad state fades out
  const badOpacity = useTransform(scrollYProgress, [0.3, 0.45], [1, 0])

  // Good state fades in
  const goodOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1])

  // Glow effect on devices after transformation
  const glowOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1])

  // Labels appear staggered
  const label1Opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1])
  const label2Opacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1])
  const label3Opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1])

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={cn("relative w-full h-[450px] md:h-[500px]", className)}
        role="img"
        aria-label="Visualization showing devices transforming from bad internet to great connection with Imperial"
      >
        <StaticDevicesView />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-[450px] md:h-[500px] overflow-hidden", className)}
      role="img"
      aria-label="Visualization showing devices transforming from bad internet to great connection with Imperial"
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
            {/* Glow filter for good state */}
            <filter id="deviceGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Shadow for devices */}
            <filter id="deviceShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.1" />
            </filter>

            {/* Wave gradient */}
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
              <stop offset="30%" stopColor="#0ea5e9" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </linearGradient>

            {/* Screen gradient */}
            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Good screen gradient */}
            <linearGradient id="goodScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* === TV === */}
          <g filter="url(#deviceShadow)">
            {/* TV Frame */}
            <rect x="40" y="80" width="140" height="100" rx="8" fill="#374151" />
            <rect x="48" y="88" width="124" height="76" rx="4" fill="url(#screenGrad)" />
            {/* TV Stand */}
            <rect x="95" y="180" width="30" height="8" rx="2" fill="#4B5563" />
            <rect x="80" y="188" width="60" height="6" rx="2" fill="#6B7280" />

            {/* Bad State - Buffering */}
            <motion.g style={{ opacity: badOpacity }}>
              {/* Buffering circle */}
              <circle cx="110" cy="126" r="20" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="40 80" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 110 126" to="360 110 126" dur="1s" repeatCount="indefinite" />
              </circle>
              {/* Buffering text */}
              <text x="110" y="160" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="500">Buffering...</text>
            </motion.g>

            {/* Good State - 4K */}
            <motion.g style={{ opacity: goodOpacity }}>
              <rect x="58" y="98" width="104" height="56" rx="2" fill="url(#goodScreenGrad)" />
              <text x="110" y="132" textAnchor="middle" fontSize="24" fill="#ffffff" fontWeight="bold">4K</text>
              <text x="110" y="148" textAnchor="middle" fontSize="8" fill="#ffffff" opacity="0.8">Streaming</text>
            </motion.g>
          </g>

          {/* === Phone === */}
          <g filter="url(#deviceShadow)">
            {/* Phone Frame */}
            <rect x="210" y="100" width="70" height="130" rx="10" fill="#374151" />
            <rect x="216" y="112" width="58" height="106" rx="4" fill="url(#screenGrad)" />
            {/* Notch */}
            <rect x="230" y="104" width="30" height="6" rx="3" fill="#1f2937" />

            {/* Bad State - High Ping */}
            <motion.g style={{ opacity: badOpacity }}>
              {/* Ping indicator */}
              <text x="245" y="155" textAnchor="middle" fontSize="18" fill="#ef4444" fontWeight="bold">999</text>
              <text x="245" y="170" textAnchor="middle" fontSize="10" fill="#ef4444">ms ping</text>
              {/* Lag bars */}
              <rect x="225" y="185" width="8" height="20" rx="1" fill="#ef4444" opacity="0.3" />
              <rect x="237" y="190" width="8" height="15" rx="1" fill="#ef4444" opacity="0.5" />
              <rect x="249" y="195" width="8" height="10" rx="1" fill="#ef4444" opacity="0.7" />
            </motion.g>

            {/* Good State - Low Ping */}
            <motion.g style={{ opacity: goodOpacity }}>
              <text x="245" y="155" textAnchor="middle" fontSize="18" fill="#22c55e" fontWeight="bold">12</text>
              <text x="245" y="170" textAnchor="middle" fontSize="10" fill="#22c55e">ms ping</text>
              {/* Full signal bars */}
              <rect x="225" y="185" width="8" height="20" rx="1" fill="#22c55e" />
              <rect x="237" y="180" width="8" height="25" rx="1" fill="#22c55e" />
              <rect x="249" y="175" width="8" height="30" rx="1" fill="#22c55e" />
            </motion.g>
          </g>

          {/* === Laptop === */}
          <g filter="url(#deviceShadow)">
            {/* Laptop Screen */}
            <rect x="320" y="120" width="140" height="90" rx="6" fill="#374151" />
            <rect x="328" y="128" width="124" height="74" rx="3" fill="url(#screenGrad)" />
            {/* Laptop Base */}
            <path d="M 300 210 L 320 210 L 325 220 L 475 220 L 480 210 L 500 210 L 495 230 L 305 230 Z" fill="#4B5563" />
            {/* Keyboard area hint */}
            <rect x="335" y="212" width="90" height="4" rx="1" fill="#6B7280" />

            {/* Bad State - Connection Lost */}
            <motion.g style={{ opacity: badOpacity }}>
              {/* X icon */}
              <circle cx="390" cy="155" r="15" fill="#ef4444" opacity="0.2" />
              <path d="M 382 147 L 398 163 M 398 147 L 382 163" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
              <text x="390" y="185" textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="500">Connection Lost</text>
            </motion.g>

            {/* Good State - Connected */}
            <motion.g style={{ opacity: goodOpacity }}>
              {/* Check icon */}
              <circle cx="390" cy="155" r="15" fill="#22c55e" opacity="0.2" />
              <path d="M 380 155 L 387 162 L 400 148" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="390" y="185" textAnchor="middle" fontSize="9" fill="#22c55e" fontWeight="500">Connected</text>
            </motion.g>
          </g>

          {/* === Imperial Wave === */}
          <motion.g style={{ x: waveX, opacity: waveOpacity }}>
            <rect x="0" y="0" width="100" height="400" fill="url(#waveGradient)" />
            {/* Wave particles */}
            <circle cx="50" cy="100" r="4" fill="#38bdf8" opacity="0.6" />
            <circle cx="30" cy="200" r="3" fill="#7dd3fc" opacity="0.5" />
            <circle cx="60" cy="300" r="5" fill="#0ea5e9" opacity="0.7" />
            <circle cx="40" cy="150" r="2" fill="#38bdf8" opacity="0.4" />
            <circle cx="70" cy="250" r="3" fill="#7dd3fc" opacity="0.6" />
          </motion.g>

          {/* === Glow effect on devices after transformation === */}
          <motion.g style={{ opacity: glowOpacity }}>
            {/* TV glow */}
            <ellipse cx="110" cy="130" rx="80" ry="60" fill="#0ea5e9" opacity="0.1" />
            {/* Phone glow */}
            <ellipse cx="245" cy="165" rx="50" ry="70" fill="#0ea5e9" opacity="0.1" />
            {/* Laptop glow */}
            <ellipse cx="390" cy="165" rx="90" ry="60" fill="#0ea5e9" opacity="0.1" />
          </motion.g>
        </svg>
      </div>

      {/* Labels - Desktop */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        <motion.div
          className="absolute bottom-28 left-[8%]"
          style={{ opacity: label1Opacity }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
            <span className="text-sm font-semibold text-sky-600">Stream in 4K</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-20 left-[42%]"
          style={{ opacity: label2Opacity }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
            <span className="text-sm font-semibold text-sky-600">12ms Latency</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-16 right-[8%]"
          style={{ opacity: label3Opacity }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
            <span className="text-sm font-semibold text-sky-600">Always Connected</span>
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
            <span className="text-xs font-semibold text-sky-600">4K Streaming</span>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-sky-100">
            <span className="text-xs font-semibold text-sky-600">12ms Ping</span>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-sky-100">
            <span className="text-xs font-semibold text-sky-600">Connected</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function StaticDevicesView() {
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
          <linearGradient id="goodScreenGradStatic" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* TV - Good State */}
        <g>
          <rect x="40" y="80" width="140" height="100" rx="8" fill="#374151" />
          <rect x="48" y="88" width="124" height="76" rx="4" fill="url(#goodScreenGradStatic)" />
          <rect x="95" y="180" width="30" height="8" rx="2" fill="#4B5563" />
          <rect x="80" y="188" width="60" height="6" rx="2" fill="#6B7280" />
          <text x="110" y="132" textAnchor="middle" fontSize="24" fill="#ffffff" fontWeight="bold">4K</text>
          <text x="110" y="148" textAnchor="middle" fontSize="8" fill="#ffffff" opacity="0.8">Streaming</text>
        </g>

        {/* Phone - Good State */}
        <g>
          <rect x="210" y="100" width="70" height="130" rx="10" fill="#374151" />
          <rect x="216" y="112" width="58" height="106" rx="4" fill="#1e293b" />
          <rect x="230" y="104" width="30" height="6" rx="3" fill="#1f2937" />
          <text x="245" y="155" textAnchor="middle" fontSize="18" fill="#22c55e" fontWeight="bold">12</text>
          <text x="245" y="170" textAnchor="middle" fontSize="10" fill="#22c55e">ms ping</text>
          <rect x="225" y="185" width="8" height="20" rx="1" fill="#22c55e" />
          <rect x="237" y="180" width="8" height="25" rx="1" fill="#22c55e" />
          <rect x="249" y="175" width="8" height="30" rx="1" fill="#22c55e" />
        </g>

        {/* Laptop - Good State */}
        <g>
          <rect x="320" y="120" width="140" height="90" rx="6" fill="#374151" />
          <rect x="328" y="128" width="124" height="74" rx="3" fill="#1e293b" />
          <path d="M 300 210 L 320 210 L 325 220 L 475 220 L 480 210 L 500 210 L 495 230 L 305 230 Z" fill="#4B5563" />
          <rect x="335" y="212" width="90" height="4" rx="1" fill="#6B7280" />
          <circle cx="390" cy="155" r="15" fill="#22c55e" opacity="0.2" />
          <path d="M 380 155 L 387 162 L 400 148" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="390" y="185" textAnchor="middle" fontSize="9" fill="#22c55e" fontWeight="500">Connected</text>
        </g>
      </svg>

      {/* Static labels */}
      <div className="absolute bottom-28 left-[8%] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
          <span className="text-sm font-semibold text-sky-600">Stream in 4K</span>
        </div>
      </div>
      <div className="absolute top-20 left-[42%] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
          <span className="text-sm font-semibold text-sky-600">12ms Latency</span>
        </div>
      </div>
      <div className="absolute bottom-16 right-[8%] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
          <span className="text-sm font-semibold text-sky-600">Always Connected</span>
        </div>
      </div>
    </div>
  )
}
