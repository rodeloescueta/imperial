"use client"

import { motion } from "framer-motion"
import { Building2, Shield, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BusinessHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center section-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-white" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

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
                Business Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display text-foreground mb-6"
            >
              Internet Built for{" "}
              <span className="text-primary">Business</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-subtitle mb-8 max-w-lg"
            >
              Reliable fiber connectivity for SMEs and enterprises in Cavite.
              Dedicated support, guaranteed uptime, and scalable solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="cta-pulse text-base px-8">
                Get a Quote
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8">
                Contact Sales
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Features Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="space-y-4">
              {[
                {
                  icon: Building2,
                  title: "Enterprise Grade",
                  description: "Dedicated fiber lines for maximum reliability",
                },
                {
                  icon: Shield,
                  title: "99.99% SLA",
                  description: "Guaranteed uptime with service credits",
                },
                {
                  icon: Headphones,
                  title: "Priority Support",
                  description: "Dedicated account manager for your business",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-border hover:border-primary/20 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
