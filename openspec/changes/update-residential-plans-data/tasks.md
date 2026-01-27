# Tasks: Update Residential Plans with Real Data

## 1. Data Layer
- [x] 1.1 Create `data/plans.ts` with centralized plan definitions
- [x] 1.2 Define TypeScript interface for Plan type
- [x] 1.3 Add all 7 residential plans with accurate pricing/speeds

## 2. Residential Plans Section
- [x] 2.1 Update `ResidentialPlans.tsx` to import from data layer
- [x] 2.2 Implement display strategy (all 7 or top 4 + modal) - Showing all 7
- [x] 2.3 Mark SILVER as "Most Popular"
- [x] 2.4 Update responsive grid for 7 plans (if showing all) - 4-col grid on xl
- [x] 2.5 Add plan features (unlimited data, free installation, etc.)

## 3. Pricing Card Component
- [x] 3.1 Review `pricing-card.tsx` for 7-plan support - Works as-is
- [x] 3.2 Adjust card sizing if needed for mobile (7 cards) - Grid handles it
- [x] 3.3 Ensure tier badges display correctly - "Most Popular" shows on Silver

## 4. Stats Section
- [x] 4.1 Update customer count in `Stats.tsx` to "9,700+"
- [x] 4.2 Verify animated counter handles new value

## 5. Testing
- [ ] 5.1 Test responsive layout at mobile (375px)
- [ ] 5.2 Test responsive layout at tablet (768px)
- [x] 5.3 Test responsive layout at desktop (1440px)
- [x] 5.4 Verify all plan cards render correctly
- [ ] 5.5 Test pricing card interactions (hover, click)

## 6. Documentation
- [x] 6.1 Update task document with completion notes
- [x] 6.2 Document any decisions made during implementation

---

## Completion Notes

### Files Changed
- `data/plans.ts` (new) - Centralized plan data with stats
- `components/sections/ResidentialPlans.tsx` - Updated to use data layer, 4-col grid
- `components/sections/Stats.tsx` - Uses stats from data layer, updated text

### Decisions Made
- **Display all 7 plans** rather than top 4 + modal (simpler UX)
- **4-column grid on xl** breakpoint for desktop, 2-col on md, 1-col on mobile
- **Reduced animation delay** to 0.05s per card (was 0.1s) for faster reveal

### Known Follow-ups (Out of Scope)
- Hero section still shows "200 Mbps" and "500+ customers" - separate component
- MarketDisruption section shows "500+ Happy Customers" - separate component
- Hero text says "hundreds of homes" - could update to "thousands"
