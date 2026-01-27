# Change: Update Residential Plans with Real Data

## Why

The current website displays placeholder plan data that doesn't match Imperial Internet's actual offerings. Client has provided:
1. Customer database export (9,782 customers with plan distribution)
2. Official pricing screenshot showing 7 residential plans

The website needs to reflect accurate pricing, speeds, and plan names to avoid customer confusion and ensure marketing consistency.

## What Changes

### Residential Plans Update
- **BREAKING**: Replace 3 placeholder plans with 7 actual plans
- Update plan names: SOLO, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, RUBY
- Update pricing: ₱599 - ₱2,000 range (vs current ₱1,299 - ₱2,499)
- Update speeds: 35 Mbps - 500 Mbps (vs current 50 - 200 Mbps)
- Mark SILVER as "Most Popular" (highest subscriber count: 2,582)

### Stats Section Update
- Update customer count from "500+" to "9,700+" (actual: 9,782)
- Optionally add growth indicator

### Plan Display Strategy
- Show top 4 plans on homepage (BRONZE, SILVER, GOLD, PLATINUM)
- Add "View All Plans" link to show remaining 3 (SOLO, DIAMOND, RUBY)
- Or: Show all 7 plans with responsive grid

## Impact

- **Affected files:**
  - `components/sections/ResidentialPlans.tsx` - Plan definitions and display
  - `components/ui/pricing-card.tsx` - May need adjustment for 7 cards
  - `components/sections/Stats.tsx` - Customer count update
  - `data/plans.ts` (new) - Centralized plan data

- **User impact:**
  - Customers will see accurate pricing
  - Plan names match billing system and marketing materials

- **Data sources:**
  - CSV: `/home/rodelo-escueta/Downloads/405_export_2026-01-26_173135.csv`
  - Screenshot: `/home/rodelo-escueta/Pictures/viber_image_2026-01-26_17-59-53-884.jpg`

## Plan Data Reference

| Plan | Price | Speed | Subscribers |
|------|-------|-------|-------------|
| SOLO | ₱599 | 35 Mbps | 1,624 |
| BRONZE | ₱799 | 50 Mbps | 2,422 |
| SILVER | ₱999 | 100 Mbps | 2,582 (Most Popular) |
| GOLD | ₱1,200 | 150 Mbps | 1,293 |
| PLATINUM | ₱1,400 | 200 Mbps | 794 |
| DIAMOND | ₱1,600 | 300 Mbps | 672 |
| RUBY | ₱2,000 | 500 Mbps | 148 |

## Open Questions

1. **Display strategy**: Show all 7 plans or top 4 with "View All" option?
2. **Plan features**: What features to list per plan? (Current placeholders: unlimited data, free installation, etc.)
3. **Naming**: Keep tier names (SOLO, BRONZE, etc.) or add "Essential" prefix?
