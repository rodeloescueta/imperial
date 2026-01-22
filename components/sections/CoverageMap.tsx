"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MapControls,
} from "@/components/ui/map"
import coverageData from "@/data/coverage.json"

// Cavite coordinates (approximate center)
const CAVITE_CENTER = { lat: 14.2829, lng: 120.8686 }

// Map coverage areas to actual coordinates
const coveredCoordinates = [
  { name: "Imus", lat: 14.4297, lng: 120.9367 },
  { name: "Bacoor", lat: 14.4624, lng: 120.9645 },
  { name: "Dasmarinas", lat: 14.3294, lng: 120.9367 },
  { name: "General Trias", lat: 14.3833, lng: 120.8833 },
  { name: "Cavite City", lat: 14.4833, lng: 120.9000 },
]

const comingSoonCoordinates = [
  { name: "Kawit", lat: 14.4442, lng: 120.9031 },
  { name: "Noveleta", lat: 14.4286, lng: 120.8797 },
  { name: "Rosario", lat: 14.4139, lng: 120.8581 },
  { name: "Tanza", lat: 14.3969, lng: 120.8478 },
  { name: "Naic", lat: 14.3167, lng: 120.7667 },
]

function MarkerDot({ status }: { status: "serving" | "coming-soon" }) {
  const isServing = status === "serving"

  return (
    <div className={`relative h-4 w-4 rounded-full ${
      isServing
        ? "bg-green-500 shadow-[0_0_20px_6px_rgba(34,197,94,0.6)]"
        : "bg-amber-500 shadow-[0_0_20px_6px_rgba(245,158,11,0.6)]"
    }`}>
      <div className={`absolute inset-0 rounded-full animate-ping opacity-40 ${
        isServing ? "bg-green-400" : "bg-amber-400"
      }`} />
    </div>
  )
}

export function CoverageMap() {
  const totalSubscribers = coverageData.covered.length * 547 + 123 // Mock calculation

  return (
    <section className="py-20 bg-[#1a1a2e]">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-headline text-white mb-4">
            We&apos;re growing. Every. Single. Day.
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Imperial Internet is expanding fast, reliable fiber coverage across Cavite.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden border border-gray-800"
        >
          {/* Stats Overlay */}
          <div className="absolute top-4 left-4 z-10 bg-[#1a1a2e]/90 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Active Subscribers</p>
            <p className="text-3xl font-bold text-white">{totalSubscribers.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">+12.5% vs last month</span>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-10 bg-[#1a1a2e]/90 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-700">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_3px_rgba(34,197,94,0.5)]" />
                <span className="text-xs text-gray-300">Currently Serving</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_10px_3px_rgba(245,158,11,0.5)]" />
                <span className="text-xs text-gray-300">Coming Soon</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[500px] w-full">
            <Map
              theme="dark"
              center={[CAVITE_CENTER.lng, CAVITE_CENTER.lat]}
              zoom={10}
              minZoom={8}
              maxZoom={15}
            >
              {/* Covered Areas Markers */}
              {coveredCoordinates.map((area) => (
                <MapMarker
                  key={area.name}
                  longitude={area.lng}
                  latitude={area.lat}
                >
                  <MarkerContent>
                    <MarkerDot status="serving" />
                  </MarkerContent>
                  <MarkerTooltip>
                    <div className="text-center">
                      <p className="font-semibold">{area.name}</p>
                      <p className="text-green-400 text-xs">Now Serving</p>
                    </div>
                  </MarkerTooltip>
                </MapMarker>
              ))}

              {/* Coming Soon Areas Markers */}
              {comingSoonCoordinates.map((area) => (
                <MapMarker
                  key={area.name}
                  longitude={area.lng}
                  latitude={area.lat}
                >
                  <MarkerContent>
                    <MarkerDot status="coming-soon" />
                  </MarkerContent>
                  <MarkerTooltip>
                    <div className="text-center">
                      <p className="font-semibold">{area.name}</p>
                      <p className="text-amber-400 text-xs">Coming Soon</p>
                    </div>
                  </MarkerTooltip>
                </MapMarker>
              ))}

              <MapControls
                position="bottom-right"
                showZoom={true}
                showLocate={false}
              />
            </Map>
          </div>
        </motion.div>

        {/* Coverage Lists */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#232340] rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_3px_rgba(34,197,94,0.5)]" />
              Currently Serving
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {coverageData.covered.map((area) => (
                <span key={area.name} className="text-gray-300 hover:text-green-400 transition-colors cursor-default">
                  {area.name}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#232340] rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_10px_3px_rgba(245,158,11,0.5)]" />
              Coming Soon
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {coverageData.coming_soon.map((area) => (
                <span key={area.name} className="text-gray-300 hover:text-amber-400 transition-colors cursor-default">
                  {area.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
