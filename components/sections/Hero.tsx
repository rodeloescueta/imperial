"use client"

import { motion } from "framer-motion"
import { CoverageChecker } from "@/components/CoverageChecker"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { SparklesIcon } from "@/components/ui/sparkles-icon"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center section-white overflow-hidden">
      {/* Background Beams Animation */}
      <BackgroundBeams className="z-0" />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-imperial-gradient opacity-50 z-0" />

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                <SparklesIcon className="w-4 h-4 mr-1" />
                Fiber Internet for Cavite
              </span>
            </motion.div>

            {/* Text Generate Effect for Headline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h1 className="text-display text-foreground mb-6 leading-none">
                <TextGenerateEffect
                  words="Fast. Reliable."
                  className="inline"
                  duration={0.4}
                />
                <span className="block text-primary -mt-2 md:-mt-3 lg:-mt-4">
                  <TextGenerateEffect
                    words="Local Internet."
                    className="inline"
                    duration={0.4}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-subtitle mb-8 max-w-lg"
            >
              Experience blazing-fast fiber internet with speeds up to 500 Mbps.
              Trusted by thousands of homes in Cavite with 24/7 local support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <CoverageChecker />
            </motion.div>
          </div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="relative perspective-1000">
              {/* Main card with 3D effect */}
              <motion.div
                whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="aspect-square max-w-lg mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/5 backdrop-blur-sm"
              >
                <div className="text-center p-8">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(14,165,233,0.2)",
                        "0 0 40px rgba(14,165,233,0.4)",
                        "0 0 20px rgba(14,165,233,0.2)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center"
                  >
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
                  </motion.div>
                  <p className="text-muted-foreground">
                    Hero illustration placeholder
                  </p>
                  <p className="text-sm text-muted-foreground/60 mt-1">
                    Replace with lifestyle image
                  </p>
                </div>
              </motion.div>

              {/* Floating stats - enhanced with better animations */}
              <motion.div
                initial={{ opacity: 0, x: -40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-lg shadow-primary/10 p-4 border border-primary/10 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <span className="text-green-600 text-lg">✓</span>
                  </motion.div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">99.9%</p>
                    <p className="text-xs text-muted-foreground">Uptime</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute -right-8 bottom-1/4 bg-white rounded-xl shadow-lg shadow-primary/10 p-4 border border-primary/10 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <span className="text-primary text-lg">⚡</span>
                  </motion.div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">500</p>
                    <p className="text-xs text-muted-foreground">Mbps Speed</p>
                  </div>
                </div>
              </motion.div>

              {/* New floating element - Customer count */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg shadow-primary/10 px-6 py-3 border border-primary/10"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-white flex items-center justify-center text-xs text-primary font-medium"
                      >
                        {["J", "M", "A"][i]}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">9,700+</span>{" "}
                    happy customers
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  )
}
