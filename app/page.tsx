import {
  Hero,
  ResidentialPlans,
  Features,
  InternetStruggles,
  MarketDisruption,
  CoverageMap,
  Stats,
  Footer,
} from "@/components/sections"

export default function EssentialPage() {
  return (
    <main className="pt-16">
      {/* Hero with Coverage Checker */}
      <Hero />

      {/* Residential Pricing Plans */}
      <ResidentialPlans />

      {/* Why Choose Us Features */}
      <Features />

      {/* Internet Struggles Section */}
      <InternetStruggles />

      {/* Market Disruption Section */}
      <MarketDisruption />

      {/* Coverage Map Section */}
      <CoverageMap />

      {/* Stats/Social Proof */}
      <Stats />

      {/* Footer */}
      <Footer />
    </main>
  )
}
