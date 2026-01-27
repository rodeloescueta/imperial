"use client"

import { cn } from "@/lib/utils"

interface PricingCardSkeletonProps {
  className?: string
}

export function PricingCardSkeleton({ className }: PricingCardSkeletonProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col p-6 bg-white rounded-2xl border border-border",
        "animate-pulse",
        className
      )}
    >
      {/* Plan name skeleton */}
      <div className="h-6 w-24 bg-muted rounded" />

      {/* Speed skeleton */}
      <div className="mt-3 flex items-baseline gap-2">
        <div className="h-10 w-20 bg-muted rounded" />
        <div className="h-4 w-12 bg-muted rounded" />
      </div>

      {/* Price skeleton */}
      <div className="mt-4 pb-6 border-b border-border">
        <div className="flex items-baseline gap-1">
          <div className="h-8 w-28 bg-muted rounded" />
          <div className="h-4 w-8 bg-muted rounded" />
        </div>
      </div>

      {/* Features skeleton */}
      <div className="mt-6 space-y-3 flex-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-5 w-5 bg-muted rounded-full flex-shrink-0" />
            <div
              className="h-4 bg-muted rounded"
              style={{ width: `${60 + Math.random() * 30}%` }}
            />
          </div>
        ))}
      </div>

      {/* Button skeleton */}
      <div className="mt-6">
        <div className="h-10 w-full bg-muted rounded-md" />
      </div>

      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-2xl" />
    </div>
  )
}

export function CarouselSkeleton() {
  return (
    <div className="relative">
      {/* Edge gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

      {/* Cards container */}
      <div className="relative h-[580px] md:h-[620px] overflow-hidden flex items-center justify-center">
        {/* Left card (faded) */}
        <div className="absolute w-[280px] md:w-[340px] opacity-40 -translate-x-[200px] scale-90 rotate-y-[30deg]">
          <PricingCardSkeleton />
        </div>

        {/* Center card */}
        <div className="absolute w-[280px] md:w-[340px] z-10">
          <PricingCardSkeleton />
        </div>

        {/* Right card (faded) */}
        <div className="absolute w-[280px] md:w-[340px] opacity-40 translate-x-[200px] scale-90 -rotate-y-[30deg]">
          <PricingCardSkeleton />
        </div>
      </div>

      {/* Dot indicators skeleton */}
      <div className="flex flex-col items-center gap-3 mt-6">
        <div className="flex justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2.5 rounded-full bg-muted",
                i === 2 ? "w-8" : "w-2.5"
              )}
            />
          ))}
        </div>
        <div className="h-3 w-20 bg-muted rounded" />
      </div>
    </div>
  )
}
