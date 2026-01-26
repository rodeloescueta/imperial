"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Loader, Zap, Download, Wifi } from "lucide-react"

const benefits = [
  {
    icon: Loader,
    title: "Zero Buffering",
    description: "Stream without the spinning wheel",
  },
  {
    icon: Zap,
    title: "Instant Loading",
    description: "Pages load in milliseconds",
  },
  {
    icon: Download,
    title: "No More 99%",
    description: "Downloads that actually complete",
  },
  {
    icon: Wifi,
    title: "Always Online",
    description: "Say goodbye to \"Reconnecting\"",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

export function LoadingBreakthrough() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Track scroll progress for the collision animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  })

  // Transform scroll progress to x position for collision effect
  // Left image: starts at -150px, moves to 0
  // Right image: starts at 150px, moves to 0
  const leftX = useTransform(scrollYProgress, [0, 1], [-150, 0])
  const rightX = useTransform(scrollYProgress, [0, 1], [150, 0])

  // Opacity tied to scroll - fade in as they approach
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1])

  // Scale effect - subtle grow on collision
  const scale = useTransform(scrollYProgress, [0.7, 1], [0.95, 1])

  return (
    <section ref={sectionRef} className="py-20 section-white overflow-hidden">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-500 text-sm font-medium mb-4"
          >
            We&apos;ve All Been There
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-headline text-foreground mb-4"
          >
            Say Goodbye to Buffering
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-subtitle max-w-2xl mx-auto"
          >
            That spinning wheel. The download stuck at 99%. The &quot;Reconnecting...&quot; message.
            With Imperial, those frustrations become a thing of the past.
          </motion.p>
        </motion.div>

        {/* Fraxbit-Style Two-Sided Comparison */}
        <div className="relative flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-4 mb-20">
          {/* Left Side - Without (Bad Internet) */}
          <div className="flex-1 flex flex-col lg:flex-row items-center gap-6">
            {/* Collision Animation - Left Image */}
            <motion.div
              style={{ x: leftX, opacity, scale }}
              className="relative w-full lg:w-auto overflow-hidden"
            >
              {/* Placeholder Image - Left */}
              <div className="w-full lg:w-[280px] xl:w-[320px] h-[400px] lg:h-[480px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-300 flex items-center justify-center">
                    <Loader className="w-8 h-8 animate-spin" />
                  </div>
                  <p className="text-sm font-medium">Image Placeholder</p>
                </div>
              </div>
              {/* Reveal overlay bar */}
              <motion.div
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
                className="absolute inset-0 bg-gray-400 z-10"
              />
            </motion.div>

            {/* Left Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center lg:text-left"
            >
              <span className="text-xs font-semibold tracking-wider text-gray-400 mb-2 block">
                [ WITHOUT ]
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                Slow
              </h3>
              <p className="text-3xl lg:text-4xl font-black text-gray-300 uppercase tracking-tight">
                INTERNET
              </p>
              <p className="mt-4 text-muted-foreground max-w-[280px] text-sm lg:text-base">
                Endless buffering, dropped connections, and downloads that never finish.
              </p>
              <div className="mt-4 w-12 h-1 bg-gray-300 mx-auto lg:mx-0" />
            </motion.div>
          </div>

          {/* Center Divider - Desktop Only */}
          <div className="hidden lg:flex items-center justify-center px-4">
            <div className="w-px h-64 bg-gradient-to-b from-transparent via-border to-transparent" />
          </div>

          {/* Right Side - With Imperial (Fast Internet) */}
          <div className="flex-1 flex flex-col-reverse lg:flex-row items-center gap-6">
            {/* Right Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center lg:text-right"
            >
              <span className="text-xs font-semibold tracking-wider text-primary mb-2 block">
                [ WITH IMPERIAL ]
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                Blazing
              </h3>
              <p className="text-3xl lg:text-4xl font-black text-primary uppercase tracking-tight">
                INTERNET
              </p>
              <p className="mt-4 text-muted-foreground max-w-[280px] text-sm lg:text-base">
                Lightning-fast fiber speeds, rock-solid reliability, and seamless streaming.
              </p>
              <div className="mt-4 w-12 h-1 bg-primary mx-auto lg:ml-auto lg:mr-0" />
            </motion.div>

            {/* Collision Animation - Right Image */}
            <motion.div
              style={{ x: rightX, opacity, scale }}
              className="relative w-full lg:w-auto overflow-hidden"
            >
              {/* Placeholder Image - Right */}
              <div className="w-full lg:w-[280px] xl:w-[320px] h-[400px] lg:h-[480px] bg-gradient-to-br from-sky-100 to-sky-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-primary/60">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium">Image Placeholder</p>
                </div>
              </div>
              {/* Reveal overlay bar */}
              <motion.div
                initial={{ x: "100%" }}
                whileInView={{ x: "-100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
                className="absolute inset-0 bg-primary z-10"
              />
            </motion.div>
          </div>
        </div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="text-center p-6 bg-white rounded-xl border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        />
      </div>
    </section>
  )
}
