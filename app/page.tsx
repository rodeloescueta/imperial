import {
  Hero,
  ResidentialPlans,
  Features,
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

      {/* Coverage Map Section */}
      <CoverageMap />

      {/* Stats/Social Proof */}
      <Stats />

      {/* Footer */}
      <Footer />
    </main>
  )
}
