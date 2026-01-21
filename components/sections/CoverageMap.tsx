"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { CaviteMap } from "@/components/CaviteMap"
import { Button } from "@/components/ui/button"
import coverageData from "@/data/coverage.json"

export function CoverageMap() {
  return (
    <section className="py-20 section-light">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-headline text-foreground mb-4">
            We&apos;re growing. Every. Single. Day.
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6 border border-border"
          >
            <CaviteMap />
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-lg text-muted-foreground mb-8">
              Imperial Internet is bringing fast, reliable internet to more and
              more barangays in Cavite. See if we&apos;re in your area.
            </p>

            {/* Covered Areas */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                <MapPin className="h-4 w-4 text-primary" />
                Currently Serving
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {coverageData.covered.map((area) => (
                  <motion.a
                    key={area.name}
                    href="#"
                    whileHover={{ x: 4 }}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {area.name}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Coming Soon Areas */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                <MapPin className="h-4 w-4 text-green-500" />
                Coming Soon
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {coverageData.coming_soon.map((area) => (
                  <motion.a
                    key={area.name}
                    href="#"
                    whileHover={{ x: 4 }}
                    className="text-green-600 hover:text-green-500 font-medium transition-colors"
                  >
                    {area.name}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Button size="lg" className="cta-pulse">
              Check if we&apos;re available in your area
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
