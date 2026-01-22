"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface NeighborhoodRevealProps {
  className?: string
}

export function NeighborhoodReveal({ className }: NeighborhoodRevealProps) {
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

  // Fiber cable draws from left to right
  const cableWidth = useTransform(scrollYProgress, [0.15, 0.7], [0, 100])

  // House 1 transforms
  const house1BadOpacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 0])
  const house1GoodOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1])
  const house1Glow = useTransform(scrollYProgress, [0.3, 0.4], [0, 1])

  // House 2 transforms
  const house2BadOpacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0])
  const house2GoodOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1])
  const house2Glow = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])

  // House 3 transforms
  const house3BadOpacity = useTransform(scrollYProgress, [0.4, 0.5], [1, 0])
  const house3GoodOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1])
  const house3Glow = useTransform(scrollYProgress, [0.5, 0.6], [0, 1])

  // House 4 transforms
  const house4BadOpacity = useTransform(scrollYProgress, [0.5, 0.6], [1, 0])
  const house4GoodOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1])
  const house4Glow = useTransform(scrollYProgress, [0.6, 0.7], [0, 1])

  // House 5 transforms
  const house5BadOpacity = useTransform(scrollYProgress, [0.6, 0.7], [1, 0])
  const house5GoodOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1])
  const house5Glow = useTransform(scrollYProgress, [0.7, 0.8], [0, 1])

  // Labels appear
  const labelOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1])

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={cn("relative w-full h-[400px] md:h-[450px]", className)}
        role="img"
        aria-label="Visualization showing a neighborhood being connected with Imperial fiber internet"
      >
        <StaticNeighborhoodView />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-[400px] md:h-[450px] overflow-hidden", className)}
      role="img"
      aria-label="Visualization showing a neighborhood being connected with Imperial fiber internet"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-slate-100 rounded-2xl" />

      {/* SVG Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="500"
          height="350"
          viewBox="0 0 500 350"
          className="w-full h-full max-w-[500px]"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* House glow filter */}
            <filter id="houseGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Cable glow */}
            <filter id="cableGlow" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Roof gradients */}
            <linearGradient id="roof1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="roof2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="roof3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <linearGradient id="roof4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
            <linearGradient id="roof5" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>

            {/* Cable gradient */}
            <linearGradient id="cableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Ground */}
          <rect x="0" y="280" width="500" height="70" fill="#d1d5db" rx="4" />
          <rect x="0" y="280" width="500" height="8" fill="#9ca3af" />

          {/* Underground section */}
          <rect x="0" y="288" width="500" height="62" fill="#78716c" opacity="0.3" />

          {/* Fiber Cable - Underground */}
          <motion.rect
            x="0"
            y="300"
            height="8"
            rx="4"
            fill="url(#cableGrad)"
            filter="url(#cableGlow)"
            style={{ width: useTransform(cableWidth, (v) => `${v}%`) }}
          />

          {/* === House 1 (Small) === */}
          <g transform="translate(30, 0)">
            {/* House body */}
            <rect x="0" y="210" width="55" height="70" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="1" />
            {/* Roof */}
            <polygon points="27.5,170 -5,210 60,210" fill="url(#roof1)" />
            {/* Door */}
            <rect x="20" y="245" width="15" height="35" fill="#78716c" rx="1" />
            {/* Window */}
            <rect x="8" y="220" width="12" height="12" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />

            {/* Bad WiFi signal */}
            <motion.g style={{ opacity: house1BadOpacity }}>
              <path d="M 20 160 Q 27.5 150 35 160" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
              <path d="M 23 165 Q 27.5 158 32 165" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              <circle cx="27.5" cy="170" r="2" fill="#ef4444" />
            </motion.g>

            {/* Good WiFi signal */}
            <motion.g style={{ opacity: house1GoodOpacity }}>
              <path d="M 17 155 Q 27.5 140 38 155" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 20 160 Q 27.5 150 35 160" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 23 165 Q 27.5 158 32 165" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <circle cx="27.5" cy="170" r="2" fill="#22c55e" />
            </motion.g>

            {/* Glow effect */}
            <motion.rect
              x="-5"
              y="165"
              width="65"
              height="120"
              fill="#0ea5e9"
              opacity="0.15"
              rx="4"
              style={{ opacity: useTransform(house1Glow, (v) => v * 0.15) }}
            />
          </g>

          {/* === House 2 (Medium) === */}
          <g transform="translate(110, 0)">
            {/* House body */}
            <rect x="0" y="195" width="65" height="85" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="1" />
            {/* Roof */}
            <polygon points="32.5,150 -8,195 73,195" fill="url(#roof2)" />
            {/* Door */}
            <rect x="25" y="240" width="15" height="40" fill="#78716c" rx="1" />
            {/* Windows */}
            <rect x="8" y="205" width="14" height="14" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
            <rect x="43" y="205" width="14" height="14" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />

            {/* Bad WiFi signal */}
            <motion.g style={{ opacity: house2BadOpacity }}>
              <path d="M 25 140 Q 32.5 130 40 140" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              <path d="M 28 145 Q 32.5 138 37 145" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <circle cx="32.5" cy="150" r="2" fill="#f97316" />
            </motion.g>

            {/* Good WiFi signal */}
            <motion.g style={{ opacity: house2GoodOpacity }}>
              <path d="M 22 135 Q 32.5 120 43 135" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 25 140 Q 32.5 130 40 140" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 28 145 Q 32.5 138 37 145" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <circle cx="32.5" cy="150" r="2" fill="#22c55e" />
            </motion.g>

            {/* Glow effect */}
            <motion.rect
              x="-8"
              y="145"
              width="81"
              height="140"
              fill="#0ea5e9"
              rx="4"
              style={{ opacity: useTransform(house2Glow, (v) => v * 0.15) }}
            />
          </g>

          {/* === House 3 (Large - Center) === */}
          <g transform="translate(200, 0)">
            {/* House body */}
            <rect x="0" y="175" width="80" height="105" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="1" />
            {/* Roof */}
            <polygon points="40,125 -10,175 90,175" fill="url(#roof3)" />
            {/* Door */}
            <rect x="32" y="230" width="18" height="50" fill="#78716c" rx="1" />
            {/* Door handle */}
            <circle cx="45" cy="258" r="2" fill="#a8a29e" />
            {/* Windows */}
            <rect x="8" y="185" width="18" height="18" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
            <rect x="54" y="185" width="18" height="18" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
            {/* Second floor windows */}
            <rect x="8" y="210" width="18" height="12" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
            <rect x="54" y="210" width="18" height="12" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />

            {/* Bad WiFi signal */}
            <motion.g style={{ opacity: house3BadOpacity }}>
              <path d="M 30 115 Q 40 102 50 115" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
              <path d="M 34 120 Q 40 112 46 120" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <circle cx="40" cy="125" r="2" fill="#ef4444" />
            </motion.g>

            {/* Good WiFi signal */}
            <motion.g style={{ opacity: house3GoodOpacity }}>
              <path d="M 27 110 Q 40 92 53 110" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 30 115 Q 40 102 50 115" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 34 120 Q 40 112 46 120" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <circle cx="40" cy="125" r="2" fill="#22c55e" />
            </motion.g>

            {/* Glow effect */}
            <motion.rect
              x="-10"
              y="120"
              width="100"
              height="165"
              fill="#0ea5e9"
              rx="4"
              style={{ opacity: useTransform(house3Glow, (v) => v * 0.15) }}
            />
          </g>

          {/* === House 4 (Medium) === */}
          <g transform="translate(305, 0)">
            {/* House body */}
            <rect x="0" y="200" width="60" height="80" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="1" />
            {/* Roof */}
            <polygon points="30,158 -6,200 66,200" fill="url(#roof4)" />
            {/* Door */}
            <rect x="23" y="242" width="14" height="38" fill="#78716c" rx="1" />
            {/* Window */}
            <rect x="8" y="210" width="13" height="13" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
            <rect x="39" y="210" width="13" height="13" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />

            {/* Bad WiFi signal */}
            <motion.g style={{ opacity: house4BadOpacity }}>
              <path d="M 23 148 Q 30 140 37 148" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
              <path d="M 26 153 Q 30 147 34 153" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              <circle cx="30" cy="158" r="2" fill="#f97316" />
            </motion.g>

            {/* Good WiFi signal */}
            <motion.g style={{ opacity: house4GoodOpacity }}>
              <path d="M 20 143 Q 30 130 40 143" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 23 148 Q 30 140 37 148" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 26 153 Q 30 147 34 153" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <circle cx="30" cy="158" r="2" fill="#22c55e" />
            </motion.g>

            {/* Glow effect */}
            <motion.rect
              x="-6"
              y="153"
              width="72"
              height="132"
              fill="#0ea5e9"
              rx="4"
              style={{ opacity: useTransform(house4Glow, (v) => v * 0.15) }}
            />
          </g>

          {/* === House 5 (Small) === */}
          <g transform="translate(395, 0)">
            {/* House body */}
            <rect x="0" y="215" width="50" height="65" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="1" />
            {/* Roof */}
            <polygon points="25,178 -5,215 55,215" fill="url(#roof5)" />
            {/* Door */}
            <rect x="18" y="248" width="14" height="32" fill="#78716c" rx="1" />
            {/* Window */}
            <rect x="6" y="225" width="10" height="10" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />

            {/* Bad WiFi signal */}
            <motion.g style={{ opacity: house5BadOpacity }}>
              <path d="M 20 170 Q 25 165 30 170" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <circle cx="25" cy="175" r="2" fill="#ef4444" />
            </motion.g>

            {/* Good WiFi signal */}
            <motion.g style={{ opacity: house5GoodOpacity }}>
              <path d="M 15 160 Q 25 148 35 160" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 18 165 Q 25 157 32 165" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 20 170 Q 25 165 30 170" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <circle cx="25" cy="175" r="2" fill="#22c55e" />
            </motion.g>

            {/* Glow effect */}
            <motion.rect
              x="-5"
              y="173"
              width="60"
              height="112"
              fill="#0ea5e9"
              rx="4"
              style={{ opacity: useTransform(house5Glow, (v) => v * 0.15) }}
            />
          </g>

          {/* Trees/bushes for decoration */}
          <circle cx="95" cy="265" r="12" fill="#22c55e" opacity="0.6" />
          <circle cx="180" cy="268" r="10" fill="#22c55e" opacity="0.5" />
          <circle cx="295" cy="265" r="11" fill="#22c55e" opacity="0.6" />
          <circle cx="385" cy="268" r="9" fill="#22c55e" opacity="0.5" />
          <circle cx="460" cy="265" r="10" fill="#22c55e" opacity="0.6" />
        </svg>
      </div>

      {/* Labels - Desktop */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        <motion.div
          className="absolute bottom-20 left-[10%]"
          style={{ opacity: labelOpacity }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
            <span className="text-sm font-semibold text-sky-600">Fiber Connected</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-12 right-[15%]"
          style={{ opacity: labelOpacity }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
            <span className="text-sm font-semibold text-sky-600">Full Coverage</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-28 right-[25%]"
          style={{ opacity: labelOpacity }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
            <span className="text-sm font-semibold text-sky-600">Happy Neighbors</span>
          </div>
        </motion.div>
      </div>

      {/* Labels - Mobile */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 md:hidden"
        style={{ opacity: labelOpacity }}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-sky-100">
            <span className="text-xs font-semibold text-sky-600">Fiber Connected</span>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-sky-100">
            <span className="text-xs font-semibold text-sky-600">Full Coverage</span>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-sky-100">
            <span className="text-xs font-semibold text-sky-600">Happy Neighbors</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function StaticNeighborhoodView() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-slate-100 rounded-2xl" />
      <svg
        width="500"
        height="350"
        viewBox="0 0 500 350"
        className="w-full h-full max-w-[500px] relative z-10"
      >
        <defs>
          <linearGradient id="roof1Static" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="roof2Static" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="roof3Static" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="roof4Static" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
          <linearGradient id="roof5Static" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
        </defs>

        {/* Ground */}
        <rect x="0" y="280" width="500" height="70" fill="#d1d5db" rx="4" />
        <rect x="0" y="280" width="500" height="8" fill="#9ca3af" />
        <rect x="0" y="288" width="500" height="62" fill="#78716c" opacity="0.3" />

        {/* Fiber Cable - Full */}
        <rect x="0" y="300" width="500" height="8" rx="4" fill="#0ea5e9" />

        {/* House 1 */}
        <g transform="translate(30, 0)">
          <rect x="-5" y="165" width="65" height="120" fill="#0ea5e9" opacity="0.15" rx="4" />
          <rect x="0" y="210" width="55" height="70" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="1" />
          <polygon points="27.5,170 -5,210 60,210" fill="url(#roof1Static)" />
          <rect x="20" y="245" width="15" height="35" fill="#78716c" rx="1" />
          <rect x="8" y="220" width="12" height="12" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
          <path d="M 17 155 Q 27.5 140 38 155" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <path d="M 20 160 Q 27.5 150 35 160" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <path d="M 23 165 Q 27.5 158 32 165" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <circle cx="27.5" cy="170" r="2" fill="#22c55e" />
        </g>

        {/* House 2 */}
        <g transform="translate(110, 0)">
          <rect x="-8" y="145" width="81" height="140" fill="#0ea5e9" opacity="0.15" rx="4" />
          <rect x="0" y="195" width="65" height="85" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="1" />
          <polygon points="32.5,150 -8,195 73,195" fill="url(#roof2Static)" />
          <rect x="25" y="240" width="15" height="40" fill="#78716c" rx="1" />
          <rect x="8" y="205" width="14" height="14" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
          <rect x="43" y="205" width="14" height="14" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
          <path d="M 22 135 Q 32.5 120 43 135" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <path d="M 25 140 Q 32.5 130 40 140" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <path d="M 28 145 Q 32.5 138 37 145" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32.5" cy="150" r="2" fill="#22c55e" />
        </g>

        {/* House 3 */}
        <g transform="translate(200, 0)">
          <rect x="-10" y="120" width="100" height="165" fill="#0ea5e9" opacity="0.15" rx="4" />
          <rect x="0" y="175" width="80" height="105" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="1" />
          <polygon points="40,125 -10,175 90,175" fill="url(#roof3Static)" />
          <rect x="32" y="230" width="18" height="50" fill="#78716c" rx="1" />
          <circle cx="45" cy="258" r="2" fill="#a8a29e" />
          <rect x="8" y="185" width="18" height="18" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
          <rect x="54" y="185" width="18" height="18" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
          <rect x="8" y="210" width="18" height="12" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
          <rect x="54" y="210" width="18" height="12" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
          <path d="M 27 110 Q 40 92 53 110" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <path d="M 30 115 Q 40 102 50 115" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <path d="M 34 120 Q 40 112 46 120" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <circle cx="40" cy="125" r="2" fill="#22c55e" />
        </g>

        {/* House 4 */}
        <g transform="translate(305, 0)">
          <rect x="-6" y="153" width="72" height="132" fill="#0ea5e9" opacity="0.15" rx="4" />
          <rect x="0" y="200" width="60" height="80" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="1" />
          <polygon points="30,158 -6,200 66,200" fill="url(#roof4Static)" />
          <rect x="23" y="242" width="14" height="38" fill="#78716c" rx="1" />
          <rect x="8" y="210" width="13" height="13" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
          <rect x="39" y="210" width="13" height="13" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
          <path d="M 20 143 Q 30 130 40 143" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <path d="M 23 148 Q 30 140 37 148" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <path d="M 26 153 Q 30 147 34 153" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <circle cx="30" cy="158" r="2" fill="#22c55e" />
        </g>

        {/* House 5 */}
        <g transform="translate(395, 0)">
          <rect x="-5" y="173" width="60" height="112" fill="#0ea5e9" opacity="0.15" rx="4" />
          <rect x="0" y="215" width="50" height="65" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="1" />
          <polygon points="25,178 -5,215 55,215" fill="url(#roof5Static)" />
          <rect x="18" y="248" width="14" height="32" fill="#78716c" rx="1" />
          <rect x="6" y="225" width="10" height="10" fill="#bae6fd" stroke="#e7e5e4" strokeWidth="1" />
          <path d="M 15 160 Q 25 148 35 160" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <path d="M 18 165 Q 25 157 32 165" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <path d="M 20 170 Q 25 165 30 170" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <circle cx="25" cy="175" r="2" fill="#22c55e" />
        </g>

        {/* Trees */}
        <circle cx="95" cy="265" r="12" fill="#22c55e" opacity="0.6" />
        <circle cx="180" cy="268" r="10" fill="#22c55e" opacity="0.5" />
        <circle cx="295" cy="265" r="11" fill="#22c55e" opacity="0.6" />
        <circle cx="385" cy="268" r="9" fill="#22c55e" opacity="0.5" />
        <circle cx="460" cy="265" r="10" fill="#22c55e" opacity="0.6" />
      </svg>

      {/* Static labels */}
      <div className="absolute bottom-20 left-[10%] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
          <span className="text-sm font-semibold text-sky-600">Fiber Connected</span>
        </div>
      </div>
      <div className="absolute top-12 right-[15%] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
          <span className="text-sm font-semibold text-sky-600">Full Coverage</span>
        </div>
      </div>
      <div className="absolute bottom-28 right-[25%] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
          <span className="text-sm font-semibold text-sky-600">Happy Neighbors</span>
        </div>
      </div>
    </div>
  )
}
