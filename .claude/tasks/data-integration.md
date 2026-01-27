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

## Current Website State (Incorrect)

The website currently displays placeholder plans that don't match the real offerings:

| Website (Wrong) | Price | Speed |
|-----------------|-------|-------|
| Essential 50 | ₱1,299 | 50 Mbps |
| Essential 100 | ₱1,799 | 100 Mbps |
| Essential 200 | ₱2,499 | 200 Mbps |

**Files affected:**
- `components/sections/ResidentialPlans.tsx` - Plan definitions
- `components/sections/Stats.tsx` - Customer count stats
- `data/coverage.json` - Coverage areas (may need updating)

---

## Potential Use Cases for Data

### Phase 1: Website Content Updates
- [ ] Update residential plans to match actual offerings (7 plans)
- [ ] Update stats section with real customer count (~9,700+)
- [ ] Update coverage areas based on customer distribution
- [ ] Determine which plans to feature (top 3? all 7?)

### Phase 2: Coverage Map Enhancement
- [ ] Use GPS coordinates (8,752 customers) to show coverage heat map
- [ ] Highlight Tanza as primary service area
- [ ] Show expansion areas (Imus, Trece Martires, Gen. Trias)

### Phase 3: Admin Dashboard Integration
- [ ] Import customer data into admin "Clients" section
- [ ] Display customer statistics on dashboard
- [ ] Coverage analytics by barangay

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

**Status**: Awaiting client review and additional information

**Next Steps**:
1. Client to review this document
2. Client to provide answers to open questions
3. Client to provide SME/Business plans information (for /prime page)
4. Proceed with implementation based on feedback
