import { Suspense } from "react"
import { getPublicPlansByType } from "@/lib/actions/plans"
import { ResidentialPlansClient } from "./ResidentialPlansClient"
import { CarouselSkeleton } from "@/components/ui/pricing-card-skeleton"

async function ResidentialPlansContent() {
  const plans = await getPublicPlansByType("RESIDENTIAL")

  // Find the most popular plan (popularityRank === 1)
  // Plans are already reordered with top 3 in center
  const mostPopularIndex = plans.findIndex((plan) => plan.popularityRank === 1)
  const defaultIndex = mostPopularIndex >= 0 ? mostPopularIndex : Math.floor(plans.length / 2)

  return (
    <ResidentialPlansClient
      plans={plans}
      defaultIndex={defaultIndex}
    />
  )
}

function ResidentialPlansSkeleton() {
  return (
    <section className="py-20 section-light overflow-hidden">
      <div className="container-wide">
        {/* Header skeleton */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-muted w-36 h-7 animate-pulse mb-4" />
          <div className="h-10 w-80 bg-muted rounded mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-muted rounded mx-auto animate-pulse" />
        </div>

        {/* Carousel skeleton */}
        <CarouselSkeleton />
      </div>
    </section>
  )
}

export function ResidentialPlans() {
  return (
    <Suspense fallback={<ResidentialPlansSkeleton />}>
      <ResidentialPlansContent />
    </Suspense>
  )
}
