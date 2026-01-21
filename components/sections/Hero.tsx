"use client"

import { motion } from "framer-motion"
import { CoverageChecker } from "@/components/CoverageChecker"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center section-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-imperial-gradient opacity-50" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Fiber Internet for Cavite
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display text-foreground mb-6"
            >
              Fast. Reliable.{" "}
              <span className="text-primary">Local Internet.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-subtitle mb-8 max-w-lg"
            >
              Experience blazing-fast fiber internet with speeds up to 200 Mbps.
              Trusted by hundreds of homes in Cavite with 24/7 local support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <CoverageChecker />
            </motion.div>
          </div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Placeholder for hero image */}
              <div className="aspect-square max-w-lg mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl flex items-center justify-center border border-primary/10">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-muted-foreground">
                    Hero illustration placeholder
                  </p>
                  <p className="text-sm text-muted-foreground/60 mt-1">
                    Replace with lifestyle image
                  </p>
                </div>
              </div>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-lg p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">99.9%</p>
                    <p className="text-xs text-muted-foreground">Uptime</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -right-8 bottom-1/4 bg-white rounded-xl shadow-lg p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-lg">⚡</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">200</p>
                    <p className="text-xs text-muted-foreground">Mbps Speed</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
