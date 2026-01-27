# Task: Imperial Internet Data Integration

## Overview

Integrate real customer data and accurate plan information into the Imperial Internet website based on data exports and marketing materials provided by the client.

## Data Sources Received

### 1. Customer Database Export (CSV)
- **File**: `/home/rodelo-escueta/Downloads/405_export_2026-01-26_173135.csv`
- **Size**: 5.5MB (~19,500 rows)
- **Export Date**: 2026-01-26
- **Source**: ISP billing system (likely UCRM/UNMS)

**Key Statistics:**
| Metric | Value |
|--------|-------|
| Total Customers | 9,782 |
| Data Period | Oct 2022 - Jan 2026 |
| Customers with GPS | 8,752 (89%) |
| Outstanding Balance | ₱98,667.87 |

**Customer Distribution by Plan:**
| Plan | Subscribers | Percentage |
|------|-------------|------------|
| SILVER 999 | 2,582 | 26.4% |
| BRONZE 799 | 2,422 | 24.8% |
| SOLO PLAN | 1,624 | 16.6% |
| GOLD 1200 | 1,293 | 13.2% |
| PLATINUM 1400 | 794 | 8.1% |
| DIAMOND 1600 | 672 | 6.9% |
| RUBY 2000 | 148 | 1.5% |
| Other (OLD/SME) | ~247 | 2.5% |

**Coverage by Location (from addresses):**
| City | Customers | Percentage |
|------|-----------|------------|
| Tanza | 4,843 | 90% |
| Cavite (other) | 210 | 4% |
| Trece Martires | 197 | 4% |
| Imus | 122 | 2% |
| General Trias | 29 | <1% |

**Recent Growth (monthly registrations):**
- Aug 2025: 650
- Sep 2025: 520
- Oct 2025: 978
- Nov 2025: 553
- Dec 2025: 623
- Jan 2026: 461

---

### 2. Residential Plans Screenshot
- **File**: `/home/rodelo-escueta/Pictures/viber_image_2026-01-26_17-59-53-884.jpg`
- **Brand**: Imperial Network Incorporated
- **Website**: www.imperialnetworkph.com

**Actual Residential Plans:**
| Plan | Price | Speed | Data |
|------|-------|-------|------|
| SOLO | ₱599 | 35 Mbps | Unlimited |
| BRONZE | ₱799 | 50 Mbps | Unlimited |
| SILVER | ₱999 | 100 Mbps | Unlimited |
| GOLD | ₱1,200 | 150 Mbps | Unlimited |
| PLATINUM | ₱1,400 | 200 Mbps | Unlimited |
| DIAMOND | ₱1,600 | 300 Mbps | Unlimited |
| RUBY | ₱2,000 | 500 Mbps | Unlimited |

---

## Implementation Progress

### Phase 1: Website Content Updates ✅ COMPLETED
- [x] Update residential plans to match actual offerings (7 plans)
- [x] Update stats section with real customer count (~9,700+)
- [x] Update Hero section with correct speed (up to 500Mbps)
- [ ] Update coverage areas based on customer distribution
- [ ] Determine which plans to feature (top 3? all 7?)

**Files Modified:**
- `data/plans.ts` - Centralized plan data
- `components/sections/ResidentialPlans.tsx` - Uses real plan data
- `components/sections/Stats.tsx` - Shows 9,700+ customers
- `components/sections/Hero.tsx` - Updated speed to 500Mbps

### Phase 2: Coverage Map Enhancement
- [ ] Use GPS coordinates (8,752 customers) to show coverage heat map
- [ ] Highlight Tanza as primary service area
- [ ] Show expansion areas (Imus, Trece Martires, Gen. Trias)

### Phase 3: Admin Dashboard Integration ✅ COMPLETED
- [x] Database schema: Plan, Client, Subscription models
- [x] Import customer data via seed-clients.ts script
- [x] Admin Plans CRUD pages (/admin/plans)
- [x] Admin Clients CRUD pages (/admin/clients)
- [x] Client filters (search, status, city, plan)
- [x] Sidebar navigation updated
- [x] Fixed Decimal serialization for Next.js client components

---

## Technical Implementation Details

### Database Schema
Added to `prisma/schema.prisma`:
- `ClientStatus` enum: ACTIVE, INACTIVE, LEAD, ARCHIVED
- `SubscriptionStatus` enum: ACTIVE, SUSPENDED, CANCELLED, EXPIRED
- `Plan` model: id, name, tier, speed, price, type, features, isActive
- `Client` model: personal info, contact, address, GPS, balance, PPPoE
- `Subscription` model: links clients to plans with dates and status

### Files Created

**Server Actions:**
- `lib/actions/plans.ts` - getPlans, getPlan, getActivePlans, createPlan, updatePlan, deletePlan
- `lib/actions/clients.ts` - getClients, getClient, createClient, updateClient, archiveClient, deleteClient, createSubscription, getClientCities

**Validation Schemas:**
- `lib/validations/plan.ts` - Zod schemas for plan create/update
- `lib/validations/client.ts` - Zod schemas for client and subscription

**Admin Pages:**
- `app/admin/(dashboard)/plans/page.tsx` - List with pagination
- `app/admin/(dashboard)/plans/new/page.tsx` - Create form
- `app/admin/(dashboard)/plans/[id]/page.tsx` - View details
- `app/admin/(dashboard)/plans/[id]/edit/page.tsx` - Edit form
- `app/admin/(dashboard)/clients/page.tsx` - List with filters
- `app/admin/(dashboard)/clients/new/page.tsx` - Create with plan selector
- `app/admin/(dashboard)/clients/[id]/page.tsx` - View with subscription history
- `app/admin/(dashboard)/clients/[id]/edit/page.tsx` - Edit form

**Components:**
- `components/admin/plan-table.tsx` - Plan data table with actions
- `components/admin/plan-form.tsx` - Plan create/edit form
- `components/admin/client-table.tsx` - Client data table with actions
- `components/admin/client-form.tsx` - Client create/edit form
- `components/admin/client-filters.tsx` - Search, status, city, plan filters
- `components/ui/checkbox.tsx` - shadcn checkbox component

**Database Scripts:**
- `prisma/seed.ts` - Seeds 15 plans from data/plans.ts
- `prisma/seed-clients.ts` - Imports CSV data (9,782 clients, 9,745 subscriptions)
- `prisma/migrations/20260127034728_add_clients_plans/` - Migration

### CSV Import Strategy
The CSV has alternating rows (client row, then service row). The import script:
1. Detects client rows by presence of `Id` field
2. Looks ahead for service data in next row
3. Normalizes plan names: "02.  BRONZE 799" → "BRONZE"
4. Creates client with subscription if plan found

### Bug Fixes Applied
1. **Prisma client undefined**: Required `npx prisma generate` after schema changes
2. **Decimal serialization**: Added `serialize()` helper to convert Prisma Decimal to numbers for Next.js client components

---

## Import Results

Successfully imported:
- **15 plans** (7 residential + 8 legacy/SME/corporate)
- **9,782 clients**
- **9,745 subscriptions**

### Plan Subscriber Counts (from admin):
| Plan | Subscribers |
|------|-------------|
| Silver | 2,580 |
| Bronze | 2,420 |
| Solo | 1,621 |
| Gold | 1,292 |
| Platinum | 793 |
| Diamond | 672 |
| Old 800 | 176 |
| Ruby | 148 |

---

## Open Questions (Need Client Input)

1. **Plan Display**: Show all 7 plans on homepage or just top 3-4?
2. **Plan Names**: Keep current names (SOLO, BRONZE, etc.) or rebrand to "Essential" series?
3. **Most Popular**: Which plan should be marked as "Most Popular"? (SILVER has most subscribers)
4. **Coverage Map**: Use real customer GPS data for heat map visualization?
5. **Stats Display**: Show "9,700+ customers" or round to "10,000+"?
6. **SME Plans**: The CSV shows SME plans (₱2,999, ₱3,999) - do we have a full SME plan list?
7. **Privacy**: Can customer GPS coordinates be used for coverage visualization? (aggregated, not individual)

---

## Notes

- The CSV contains PII (names, emails, phones, addresses) - should NOT be committed to git
- GPS data is valuable for accurate coverage mapping
- Customer growth shows healthy ~500-900 new subscribers per month
- Tanza is dominant market (90%) - website should reflect this
- May need business plans screenshot for `/prime` page

---

## Status

**Status**: Phase 1 & 3 Complete ✅

**Commits:**
1. `434b78d` - Update hero and other sections with real data
2. `0fc9f71` - Update residential plans with real pricing data
3. `98239dc` - Add admin clients and plans management with CSV import

**Next Steps**:
1. Client to provide SME/Business plans information (for /prime page)
2. Phase 2: Coverage map enhancement with GPS data
3. Coverage analytics by barangay
