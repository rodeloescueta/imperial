"use client"

import * as React from "react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight, Hand } from "lucide-react"
import { cn } from "@/lib/utils"

interface CoverflowCarouselProps {
  children: React.ReactNode[]
  defaultIndex?: number
  className?: string
}

export function CoverflowCarousel({
  children,
  defaultIndex = 0,
  className,
}: CoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState(defaultIndex)
  const [isDragging, setIsDragging] = React.useState(false)
  const [showSwipeHint, setShowSwipeHint] = React.useState(false)
  const [hasInteracted, setHasInteracted] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const itemCount = React.Children.count(children)

  // Check if mobile and show swipe hint
  React.useEffect(() => {
    const isMobile = window.innerWidth < 768
    const hasSeenHint = sessionStorage.getItem("carousel-hint-seen")

    if (isMobile && !hasSeenHint) {
      setShowSwipeHint(true)
      const timer = setTimeout(() => {
        setShowSwipeHint(false)
        sessionStorage.setItem("carousel-hint-seen", "true")
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [])

  const dismissHint = React.useCallback(() => {
    setShowSwipeHint(false)
    setHasInteracted(true)
    sessionStorage.setItem("carousel-hint-seen", "true")
  }, [])

  const goTo = React.useCallback(
    (index: number) => {
      if (index < 0) {
        setActiveIndex(0)
      } else if (index >= itemCount) {
        setActiveIndex(itemCount - 1)
      } else {
        setActiveIndex(index)
      }
      if (!hasInteracted) dismissHint()
    },
    [itemCount, hasInteracted, dismissHint]
  )

  const goNext = React.useCallback(() => {
    goTo(activeIndex + 1)
  }, [activeIndex, goTo])

  const goPrev = React.useCallback(() => {
    goTo(activeIndex - 1)
  }, [activeIndex, goTo])

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goNext, goPrev])

  // Handle drag/swipe
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false)
    dismissHint()
    const threshold = 50
    if (info.offset.x < -threshold) {
      goNext()
    } else if (info.offset.x > threshold) {
      goPrev()
    }
  }

  // Calculate 3D transform for each card - adjusted for edge preview
  const getCardStyle = (index: number) => {
    const offset = index - activeIndex
    const absOffset = Math.abs(offset)

    // Show 3 cards on each side for better edge preview
    if (absOffset > 3) {
      return {
        x: offset * 200,
        rotateY: 0,
        scale: 0,
        z: -500,
        opacity: 0,
      }
    }

    // Adjusted spacing to show more of edge cards
    const spacing = absOffset === 0 ? 0 : 180 + absOffset * 40

    return {
      x: offset * spacing,
      rotateY: offset * -30,
      scale: absOffset === 0 ? 1 : Math.max(0.7, 0.88 - absOffset * 0.06),
      z: absOffset === 0 ? 0 : -100 * absOffset,
      opacity: absOffset === 0 ? 1 : Math.max(0.3, 0.8 - absOffset * 0.2),
    }
  }

  return (
    <div className={cn("relative", className)}>
      {/* Swipe Hint Overlay (Mobile) */}
      <AnimatePresence>
        {showSwipeHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-[2px] rounded-2xl md:hidden"
            onClick={dismissHint}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3 text-white"
            >
              <motion.div
                animate={{ x: [0, 30, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Hand className="w-10 h-10" />
              </motion.div>
              <span className="text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                Swipe to explore plans
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edge Fade Gradients with blur */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none backdrop-blur-[2px]" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none backdrop-blur-[2px]" />

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative h-[580px] md:h-[620px] overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          style={{ transformStyle: "preserve-3d" }}
        >
          <AnimatePresence mode="sync">
            {React.Children.map(children, (child, index) => {
              const style = getCardStyle(index)
              const isActive = index === activeIndex

              return (
                <motion.div
                  key={index}
                  className={cn(
                    "absolute w-[280px] md:w-[340px]",
                    !isActive && "pointer-events-none",
                    isActive && "z-20"
                  )}
                  initial={false}
                  animate={{
                    x: style.x,
                    rotateY: style.rotateY,
                    scale: style.scale,
                    z: style.z,
                    opacity: style.opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: 10 - Math.abs(index - activeIndex),
                  }}
                  onClick={() => {
                    if (!isDragging && index !== activeIndex) {
                      goTo(index)
                    }
                  }}
                >
                  {child}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        disabled={activeIndex === 0}
        className={cn(
          "absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-30",
          "w-12 h-12 rounded-full bg-white shadow-lg border border-border",
          "flex items-center justify-center",
          "transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary",
          "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-current"
        )}
        aria-label="Previous plan"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goNext}
        disabled={activeIndex === itemCount - 1}
        className={cn(
          "absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-30",
          "w-12 h-12 rounded-full bg-white shadow-lg border border-border",
          "flex items-center justify-center",
          "transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary",
          "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-current"
        )}
        aria-label="Next plan"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators with Counter */}
      <div className="flex flex-col items-center gap-3 mt-6">
        <div className="flex justify-center gap-2">
          {Array.from({ length: itemCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "bg-primary w-8"
                  : "bg-border hover:bg-primary/50"
              )}
              aria-label={`Go to plan ${index + 1}`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {activeIndex + 1} of {itemCount} plans
        </span>
      </div>
    </div>
  )
}
