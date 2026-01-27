import {
  BusinessHero,
  BusinessPlans,
  BusinessFeatures,
  Footer,
} from "@/components/sections"

export default function PrimePage() {
  return (
    <main className="pt-16">
      {/* Business Hero */}
      <BusinessHero />

      {/* SME & Corporate Plans */}
      <BusinessPlans />

      {/* Business Features */}
      <BusinessFeatures />

      {/* Footer */}
      <Footer />
    </main>
  )
}
