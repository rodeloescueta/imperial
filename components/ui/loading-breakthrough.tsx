"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingBreakthroughProps {
  className?: string
}

export function LoadingBreakthrough({ className }: LoadingBreakthroughProps) {
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

  // Loading state opacity (fades out as breakthrough happens)
  const loadingOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0])

  // Progress bar width (stuck at 99%)
  const progressWidth = useTransform(scrollYProgress, [0.1, 0.25], [85, 99])

  // Spinner rotation speed increases before breakthrough
  const spinnerScale = useTransform(scrollYProgress, [0.3, 0.45], [1, 0.8])

  // Imperial logo breakthrough
  const logoScale = useTransform(scrollYProgress, [0.35, 0.6], [0, 1])
  const logoOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1])

  // Crack/shatter effect
  const crackOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7], [0, 1, 0])
  const crackScale = useTransform(scrollYProgress, [0.45, 0.65], [0.5, 1.5])

  // Success state
  const successOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1])
  const successScale = useTransform(scrollYProgress, [0.55, 0.7], [0.8, 1])

  // Labels
  const labelOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1])

  // Text flicker effect based on scroll
  const textIndex = useTransform(scrollYProgress, [0.1, 0.35], [0, 3])

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={cn("relative w-full h-[400px] md:h-[450px]", className)}
        role="img"
        aria-label="Visualization showing Imperial breaking through loading screens"
      >
        <StaticLoadingView />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-[400px] md:h-[450px] overflow-hidden", className)}
      role="img"
      aria-label="Visualization showing Imperial breaking through loading screens"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-slate-50 rounded-2xl" />

      {/* SVG Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="400"
          height="350"
          viewBox="0 0 400 350"
          className="w-full h-full max-w-[400px]"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Glow filters */}
            <filter id="loadingGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="imperialBreakGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Progress bar gradient */}
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>

            {/* Imperial gradient */}
            <linearGradient id="imperialBreakGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Success gradient */}
            <linearGradient id="successGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>

          {/* === LOADING STATE === */}
          <motion.g style={{ opacity: loadingOpacity }}>
            {/* Outer spinner ring */}
            <motion.g style={{ scale: spinnerScale, originX: "200px", originY: "150px" }}>
              <circle
                cx="200"
                cy="150"
                r="80"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              {/* Spinning arc */}
              <circle
                cx="200"
                cy="150"
                r="80"
                fill="none"
                stroke="#ef4444"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="150 350"
                filter="url(#loadingGlow)"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 200 150"
                  to="360 200 150"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Inner spinner ring */}
              <circle
                cx="200"
                cy="150"
                r="60"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="4"
              />
              <circle
                cx="200"
                cy="150"
                r="60"
                fill="none"
                stroke="#f97316"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="100 280"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="360 200 150"
                  to="0 200 150"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* 99% text */}
              <text
                x="200"
                y="145"
                textAnchor="middle"
                fontSize="32"
                fontWeight="bold"
                fill="#6b7280"
              >
                99%
              </text>
              <text
                x="200"
                y="165"
                textAnchor="middle"
                fontSize="12"
                fill="#9ca3af"
              >
                stuck...
              </text>
            </motion.g>

            {/* Progress bar */}
            <g transform="translate(100, 260)">
              <rect
                x="0"
                y="0"
                width="200"
                height="12"
                rx="6"
                fill="#e5e7eb"
              />
              <motion.rect
                x="0"
                y="0"
                height="12"
                rx="6"
                fill="url(#progressGrad)"
                style={{ width: useTransform(progressWidth, (v) => v * 2) }}
              />
              {/* Progress text */}
              <text
                x="100"
                y="30"
                textAnchor="middle"
                fontSize="11"
                fill="#9ca3af"
              >
                Download stuck at 99%...
              </text>
            </g>

            {/* Frustrating messages */}
            <motion.g>
              <motion.text
                x="200"
                y="320"
                textAnchor="middle"
                fontSize="14"
                fill="#ef4444"
                fontWeight="500"
                style={{ opacity: useTransform(textIndex, (v) => v < 1 ? 1 : 0) }}
              >
                Loading...
              </motion.text>
              <motion.text
                x="200"
                y="320"
                textAnchor="middle"
                fontSize="14"
                fill="#ef4444"
                fontWeight="500"
                style={{ opacity: useTransform(textIndex, (v) => (v >= 1 && v < 2) ? 1 : 0) }}
              >
                Reconnecting...
              </motion.text>
              <motion.text
                x="200"
                y="320"
                textAnchor="middle"
                fontSize="14"
                fill="#ef4444"
                fontWeight="500"
                style={{ opacity: useTransform(textIndex, (v) => (v >= 2 && v < 3) ? 1 : 0) }}
              >
                Please wait...
              </motion.text>
              <motion.text
                x="200"
                y="320"
                textAnchor="middle"
                fontSize="14"
                fill="#ef4444"
                fontWeight="500"
                style={{ opacity: useTransform(textIndex, (v) => v >= 3 ? 1 : 0) }}
              >
                Almost there...
              </motion.text>
            </motion.g>
          </motion.g>

          {/* === CRACK/SHATTER EFFECT === */}
          <motion.g
            style={{
              opacity: crackOpacity,
              scale: crackScale,
              originX: "200px",
              originY: "150px",
            }}
          >
            {/* Radial cracks */}
            <line x1="200" y1="150" x2="200" y2="50" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
            <line x1="200" y1="150" x2="280" y2="80" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <line x1="200" y1="150" x2="300" y2="150" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
            <line x1="200" y1="150" x2="280" y2="220" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <line x1="200" y1="150" x2="200" y2="250" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
            <line x1="200" y1="150" x2="120" y2="220" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <line x1="200" y1="150" x2="100" y2="150" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
            <line x1="200" y1="150" x2="120" y2="80" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />

            {/* Shatter particles */}
            <circle cx="150" cy="100" r="4" fill="#7dd3fc" />
            <circle cx="250" cy="100" r="3" fill="#38bdf8" />
            <circle cx="270" cy="180" r="4" fill="#0ea5e9" />
            <circle cx="130" cy="180" r="3" fill="#7dd3fc" />
            <circle cx="180" cy="220" r="4" fill="#38bdf8" />
            <circle cx="220" cy="80" r="3" fill="#0ea5e9" />
          </motion.g>

          {/* === IMPERIAL BREAKTHROUGH === */}
          <motion.g
            style={{
              scale: logoScale,
              opacity: logoOpacity,
              originX: "200px",
              originY: "150px",
            }}
            filter="url(#imperialBreakGlow)"
          >
            {/* Imperial logo circle */}
            <circle cx="200" cy="150" r="50" fill="url(#imperialBreakGrad)" />
            {/* I letter */}
            <text
              x="200"
              y="165"
              textAnchor="middle"
              fontSize="48"
              fontWeight="bold"
              fill="#ffffff"
            >
              I
            </text>
          </motion.g>

          {/* === SUCCESS STATE === */}
          <motion.g
            style={{
              opacity: successOpacity,
              scale: successScale,
              originX: "200px",
              originY: "175px",
            }}
          >
            {/* Success ring */}
            <circle cx="200" cy="150" r="70" fill="none" stroke="#22c55e" strokeWidth="4" opacity="0.3" />

            {/* Checkmark */}
            <circle cx="200" cy="150" r="45" fill="url(#successGrad)" />
            <path
              d="M 180 150 L 195 165 L 225 135"
              fill="none"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Connected text */}
            <text
              x="200"
              y="230"
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fill="#22c55e"
            >
              Connected!
            </text>

            {/* Speed indicator */}
            <text
              x="200"
              y="255"
              textAnchor="middle"
              fontSize="13"
              fill="#6b7280"
            >
              200 Mbps • 12ms ping
            </text>

            {/* Progress bar complete */}
            <g transform="translate(100, 280)">
              <rect x="0" y="0" width="200" height="8" rx="4" fill="#dcfce7" />
              <rect x="0" y="0" width="200" height="8" rx="4" fill="#22c55e" />
              <text x="100" y="22" textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="500">
                Download complete!
              </text>
            </g>
          </motion.g>
        </svg>
      </div>

      {/* Labels - Desktop */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        <motion.div
          className="absolute top-8 left-[10%]"
          style={{ opacity: labelOpacity }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-green-100">
            <span className="text-sm font-semibold text-green-600">Zero Buffering</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-8 right-[10%]"
          style={{ opacity: labelOpacity }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-green-100">
            <span className="text-sm font-semibold text-green-600">Instant Loading</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-[15%]"
          style={{ opacity: labelOpacity }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-green-100">
            <span className="text-sm font-semibold text-green-600">No More 99%</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 right-[15%]"
          style={{ opacity: labelOpacity }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-green-100">
            <span className="text-sm font-semibold text-green-600">Always Online</span>
          </div>
        </motion.div>
      </div>

      {/* Labels - Mobile */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 md:hidden"
        style={{ opacity: labelOpacity }}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-green-100">
            <span className="text-xs font-semibold text-green-600">Zero Buffering</span>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-green-100">
            <span className="text-xs font-semibold text-green-600">Instant Loading</span>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-green-100">
            <span className="text-xs font-semibold text-green-600">Always Online</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function StaticLoadingView() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-slate-50 rounded-2xl" />
      <svg
        width="400"
        height="350"
        viewBox="0 0 400 350"
        className="w-full h-full max-w-[400px] relative z-10"
      >
        <defs>
          <linearGradient id="successGradStatic" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="imperialGradStatic" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* Imperial logo */}
        <circle cx="200" cy="150" r="50" fill="url(#imperialGradStatic)" />
        <text x="200" y="165" textAnchor="middle" fontSize="48" fontWeight="bold" fill="#ffffff">I</text>

        {/* Success ring */}
        <circle cx="200" cy="150" r="70" fill="none" stroke="#22c55e" strokeWidth="4" opacity="0.3" />

        {/* Checkmark below */}
        <circle cx="200" cy="150" r="45" fill="url(#successGradStatic)" opacity="0" />

        {/* Connected text */}
        <text x="200" y="230" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#22c55e">
          Connected!
        </text>
        <text x="200" y="255" textAnchor="middle" fontSize="13" fill="#6b7280">
          200 Mbps • 12ms ping
        </text>

        {/* Progress bar complete */}
        <g transform="translate(100, 280)">
          <rect x="0" y="0" width="200" height="8" rx="4" fill="#22c55e" />
          <text x="100" y="22" textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="500">
            Download complete!
          </text>
        </g>
      </svg>

      {/* Static labels */}
      <div className="absolute top-8 left-[10%] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-green-100">
          <span className="text-sm font-semibold text-green-600">Zero Buffering</span>
        </div>
      </div>
      <div className="absolute top-8 right-[10%] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-green-100">
          <span className="text-sm font-semibold text-green-600">Instant Loading</span>
        </div>
      </div>
      <div className="absolute bottom-8 left-[15%] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-green-100">
          <span className="text-sm font-semibold text-green-600">No More 99%</span>
        </div>
      </div>
      <div className="absolute bottom-8 right-[15%] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-green-100">
          <span className="text-sm font-semibold text-green-600">Always Online</span>
        </div>
      </div>
    </div>
  )
}
