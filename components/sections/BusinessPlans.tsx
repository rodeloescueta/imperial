import { Suspense } from "react"
import { getPublicPlansByType } from "@/lib/actions/plans"
import { BusinessPlansClient } from "./BusinessPlansClient"
import { PricingCardSkeleton } from "@/components/ui/pricing-card-skeleton"

async function BusinessPlansContent() {
  const [smePlans, corporatePlans] = await Promise.all([
    getPublicPlansByType("SME"),
    getPublicPlansByType("CORPORATE"),
  ])

  // Find most popular plan index for each category
  const smeDefaultIndex = smePlans.findIndex((p) => p.popularityRank === 1)
  const corpDefaultIndex = corporatePlans.findIndex((p) => p.popularityRank === 1)

  return (
    <BusinessPlansClient
      smePlans={smePlans}
      corporatePlans={corporatePlans}
      smeDefaultIndex={smeDefaultIndex >= 0 ? smeDefaultIndex : 0}
      corpDefaultIndex={corpDefaultIndex >= 0 ? corpDefaultIndex : 0}
    />
  )
}

function BusinessPlansSkeleton() {
  return (
    <>
      {/* SME Section Skeleton */}
      <section className="py-20 section-light overflow-hidden">
        <div className="container-wide">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-muted w-28 h-7 animate-pulse mb-4" />
            <div className="h-10 w-72 bg-muted rounded mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-muted rounded mx-auto animate-pulse" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <PricingCardSkeleton />
            <PricingCardSkeleton />
          </div>
        </div>
      </section>

      {/* Corporate Section Skeleton */}
      <section className="py-20 section-white overflow-hidden">
        <div className="container-wide">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-muted w-32 h-7 animate-pulse mb-4" />
            <div className="h-10 w-64 bg-muted rounded mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-80 bg-muted rounded mx-auto animate-pulse" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <PricingCardSkeleton />
            <PricingCardSkeleton />
          </div>
        </div>
      </section>
    </>
  )
}

export function BusinessPlans() {
  return (
    <Suspense fallback={<BusinessPlansSkeleton />}>
      <BusinessPlansContent />
    </Suspense>
  )
}
