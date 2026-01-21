"use client"

import * as React from "react"
import { Search, CheckCircle, Clock, XCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import coverageData from "@/data/coverage.json"

type CoverageStatus = "available" | "coming_soon" | "not_available" | null

interface CoverageResult {
  status: CoverageStatus
  area?: string
}

export function CoverageChecker({ className }: { className?: string }) {
  const [query, setQuery] = React.useState("")
  const [result, setResult] = React.useState<CoverageResult>({ status: null })
  const [isSearching, setIsSearching] = React.useState(false)

  const handleSearch = () => {
    if (!query.trim()) return

    setIsSearching(true)

    // Simulate search delay for better UX
    setTimeout(() => {
      const searchTerm = query.trim().toLowerCase()

      // Search in covered areas
      const coveredArea = coverageData.covered.find(
        (area) =>
          area.name.toLowerCase() === searchTerm ||
          area.zip === searchTerm
      )

      if (coveredArea) {
        setResult({ status: "available", area: coveredArea.name })
        setIsSearching(false)
        return
      }

      // Search in coming soon areas
      const comingSoonArea = coverageData.coming_soon.find(
        (area) =>
          area.name.toLowerCase() === searchTerm ||
          area.zip === searchTerm
      )

      if (comingSoonArea) {
        setResult({ status: "coming_soon", area: comingSoonArea.name })
        setIsSearching(false)
        return
      }

      // Not found
      setResult({ status: "not_available" })
      setIsSearching(false)
    }, 500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const resetSearch = () => {
    setQuery("")
    setResult({ status: null })
  }

  return (
    <div className={cn("w-full max-w-md", className)}>
      {/* Search Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Enter barangay or ZIP code"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-12 pl-10 pr-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
          className="h-12 px-6"
        >
          {isSearching ? "Checking..." : "Check"}
        </Button>
      </div>

      {/* Result Display */}
      <AnimatePresence mode="wait">
        {result.status && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-4"
          >
            {result.status === "available" && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-800">
                    Available in your area!
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Great news! Imperial Internet is available in{" "}
                    <span className="font-medium">{result.area}</span>. Get
                    connected today!
                  </p>
                  <Button size="sm" className="mt-3">
                    View Plans
                  </Button>
                </div>
              </div>
            )}

            {result.status === "coming_soon" && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <Clock className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-800">Coming Soon!</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    We&apos;re expanding to{" "}
                    <span className="font-medium">{result.area}</span> soon.
                    Join our waitlist to be notified!
                  </p>
                  <Button size="sm" variant="outline" className="mt-3">
                    Join Waitlist
                  </Button>
                </div>
              </div>
            )}

            {result.status === "not_available" && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <XCircle className="h-6 w-6 text-gray-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">
                    Not yet available
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    We haven&apos;t reached your area yet, but we&apos;re
                    expanding! Leave your details to be notified.
                  </p>
                  <Button size="sm" variant="outline" className="mt-3">
                    Notify Me
                  </Button>
                </div>
              </div>
            )}

            <button
              onClick={resetSearch}
              className="mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Search another area
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper Text */}
      {!result.status && (
        <p className="mt-2 text-sm text-muted-foreground">
          Try: Imus, Bacoor, Dasmarinas, or ZIP codes like 4103
        </p>
      )}
    </div>
  )
}
