"use client"

import * as React from "react"
import { motion } from "framer-motion"
import coverageData from "@/data/coverage.json"

// Simple SVG paths representing Cavite municipalities (simplified shapes)
const municipalityPaths: Record<string, string> = {
  "Cavite City": "M 280 60 L 320 50 L 340 80 L 310 100 L 270 90 Z",
  "Bacoor": "M 220 80 L 270 70 L 280 110 L 250 130 L 210 110 Z",
  "Imus": "M 180 100 L 230 90 L 250 140 L 220 170 L 170 150 Z",
  "Kawit": "M 250 50 L 280 45 L 290 70 L 260 85 L 240 70 Z",
  "Noveleta": "M 240 85 L 270 80 L 280 100 L 255 115 L 235 100 Z",
  "Rosario": "M 200 70 L 240 60 L 255 90 L 230 110 L 195 95 Z",
  "Dasmarinas": "M 140 140 L 200 120 L 230 180 L 190 220 L 130 190 Z",
  "General Trias": "M 100 160 L 150 140 L 180 200 L 140 240 L 90 210 Z",
  "Tanza": "M 60 180 L 110 160 L 140 220 L 100 260 L 50 230 Z",
  "Naic": "M 40 230 L 90 210 L 120 270 L 80 310 L 30 280 Z",
}

export function CaviteMap() {
  const [hoveredArea, setHoveredArea] = React.useState<string | null>(null)

  const coveredNames = coverageData.covered.map((a) => a.name)
  const comingSoonNames = coverageData.coming_soon.map((a) => a.name)

  const getAreaStatus = (name: string) => {
    if (coveredNames.includes(name)) return "covered"
    if (comingSoonNames.includes(name)) return "coming_soon"
    return "unavailable"
  }

  const getAreaColor = (name: string, isHovered: boolean) => {
    const status = getAreaStatus(name)
    if (status === "covered") {
      return isHovered ? "#0284C7" : "#0EA5E9" // Darker blue on hover
    }
    if (status === "coming_soon") {
      return isHovered ? "#16A34A" : "#22C55E" // Darker green on hover
    }
    return isHovered ? "#D1D5DB" : "#E5E7EB" // Gray for unavailable
  }

  return (
    <div className="relative">
      <svg
        viewBox="0 0 380 350"
        className="w-full max-w-md mx-auto"
        style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
      >
        {/* Background */}
        <rect
          x="0"
          y="0"
          width="380"
          height="350"
          fill="#F8FAFC"
          rx="16"
        />

        {/* Water indication */}
        <ellipse cx="320" cy="80" rx="60" ry="40" fill="#DBEAFE" opacity="0.5" />

        {/* Municipality paths */}
        {Object.entries(municipalityPaths).map(([name, path]) => (
          <motion.path
            key={name}
            d={path}
            fill={getAreaColor(name, hoveredArea === name)}
            stroke="#FFFFFF"
            strokeWidth="2"
            onMouseEnter={() => setHoveredArea(name)}
            onMouseLeave={() => setHoveredArea(null)}
            whileHover={{ scale: 1.02 }}
            style={{ cursor: "pointer", transformOrigin: "center" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}

        {/* Tooltip */}
        {hoveredArea && (
          <g>
            <rect
              x="140"
              y="300"
              width="100"
              height="30"
              fill="white"
              stroke="#E5E7EB"
              rx="6"
            />
            <text
              x="190"
              y="320"
              textAnchor="middle"
              fontSize="12"
              fontWeight="500"
              fill="#1F2937"
            >
              {hoveredArea}
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Imperial Covered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <span className="text-sm text-muted-foreground">Coming Soon</span>
        </div>
      </div>
    </div>
  )
}
