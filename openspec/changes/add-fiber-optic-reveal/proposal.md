# Change: Add "David vs Goliath" Market Disruption Scroll Reveal

## Why
Imperial Internet is a local challenger in a market dominated by big telecom players. A scroll-triggered animation showing Imperial growing and expanding creates emotional resonance with customers who want to support local businesses and see the "little guy" succeed. This visual storytelling reinforces Imperial's brand positioning as the scrappy, customer-focused alternative.

## What Changes
- **New Component**: `components/ui/market-reveal.tsx` - Scroll-triggered SVG animation showing market disruption
- **Updated Section**: `components/sections/FiberTechnology.tsx` → Renamed to `MarketDisruption.tsx` with new content
- **Remove**: Old fiber optic cross-section component (no longer used)

## Impact
- Affected specs: scroll-animation (updated capability)
- Affected code:
  - `components/ui/market-reveal.tsx` - New file
  - `components/ui/fiber-optic-reveal.tsx` - Remove
  - `components/sections/FiberTechnology.tsx` - Replace with MarketDisruption.tsx
  - `app/page.tsx` - Update import
