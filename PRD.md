# Imperial Internet - Product Requirements Document

## 1. Project Overview

**Business**: Imperial Internet - Local fiber internet provider
**Target Market**: Cavite, Philippines (initial launch), with plans to expand
**Goal**: Modern, simple website that stands out from local competitors with smooth animations

### Brand Identity
- **Name**: Imperial Internet
- **Tagline**: TBD (suggestions: "Fast. Reliable. Local." or "Your Local Fiber Connection")
- **Logo**: TBD

### Design Inspiration
- **Google Fiber** (https://fiber.google.com/) - Clean layout, simple pricing cards, coverage map with markers
- **Fraxbit** (https://fraxbit.com/) - GSAP scroll animations, hover effects, animated counters

---

## 2. Design Theme

### Color Palette

| Role | Color | Usage |
|------|-------|-------|
| Primary Background | White (#FFFFFF) | 70% of the design |
| Primary Accent | Sky Blue (#0EA5E9) | 30% - CTAs, highlights, icons |
| Text Primary | Dark Gray (#1F2937) | Headings, body text |
| Text Secondary | Gray (#6B7280) | Descriptions, muted text |
| Covered Areas (Map) | Sky Blue (#0EA5E9) | Heat map for covered areas |
| Coming Soon (Map) | Green (#22C55E) | Heat map for coming soon areas |

### Typography
- **Headings**: Inter or similar modern sans-serif (bold)
- **Body**: Inter (regular)

### Animation Style (Fraxbit-inspired)
- Scroll-triggered fade-in/slide-up reveals
- Hover effects on buttons and cards (scale, shadow)
- Animated number counters for statistics
- Smooth page transitions
- **Nav hover text swap** (Phase 2): Essential → "Residential", Prime → "Business", Network → "Maintenance"

---

## 3. Site Structure

### Navigation (Sticky Header)

```
[Logo] | Essential | Prime | Contact Us | Network | [Check Coverage - CTA Button]
```

**Navigation Items with Hover Labels:**

| Nav Item | Route | Hover Text (Phase 2) | Description |
|----------|-------|---------------------|-------------|
| Essential | `/` (home) | "Residential" | Residential plans - default landing page |
| Prime | `/prime` | "Business" | Business plans (SME & Corporate) |
| Contact Us | `/contact` | - | Contact form and info |
| Network | `/network` | "Maintenance" | Maintenance schedule & network status |

### Pages
1. **Essential/Home** (`/`) - Residential plans and main landing page
2. **Prime** (`/prime`) - Business plans (SME & Corporate tiers)
3. **Contact Us** (`/contact`) - Contact form and information
4. **Network** (`/network`) - Maintenance schedule and network status news

---

## 4. Essential Page (Home - `/`)

### 4.1 Hero Section
- **Headline**: "Fast. Reliable. Local Internet." (with fade-in animation)
- **Subheadline**: "Fiber internet for Cavite homes and businesses"
- **Coverage Checker**: Input field for barangay/ZIP + "Check Coverage" button
- **Background**: Placeholder lifestyle image (Google Fiber style - family/home setting)

### 4.2 Residential Plans Section

| Plan | Speed | Price | Features |
|------|-------|-------|----------|
| Essential 50 | 50 Mbps | ₱1,299/mo | Unlimited data, Free installation, 24/7 support |
| Essential 100 | 100 Mbps | ₱1,799/mo | Unlimited data, Free installation, 24/7 support |
| Essential 200 | 200 Mbps | ₱2,499/mo | Unlimited data, Free installation, 24/7 support, Priority support |

*Note: Placeholder data - to be updated with actual pricing*

### 4.3 Why Choose Us Section

Feature cards with icons:
- **Blazing Fast** - Fiber-optic speeds up to 200 Mbps
- **Always Reliable** - 99.9% uptime guarantee
- **Local Support** - Cavite-based customer service team
- **No Hidden Fees** - Transparent pricing, no surprises

### 4.4 Coverage Area Section (Google Fiber Style)

**Headline**: "We're growing. Every. Single. Day."

**Layout**: Two-column
- **Left**: Cavite map with coverage markers
  - Blue markers/heat zones = Currently covered
  - Green markers/heat zones = Coming soon
  - Legend at bottom: "● Imperial Covered  ● Coming Soon"
- **Right**:
  - Description text: "Imperial Internet is bringing fast, reliable internet to more and more barangays in Cavite. See if we're in your area."
  - List of covered municipalities (3-column layout)
  - CTA: "Check if we're available in your area"

**Map Implementation (Phases)**:
- **MVP**: Static SVG map of Cavite with colored regions
- **Phase 2**: Interactive hover effects on regions
- **Phase 3**: 3D effect with depth/elevation

### 4.5 Stats/Social Proof Section

Animated counters:
- "500+ Happy Customers" (placeholder)
- "99.9% Uptime"
- "24/7 Support"

### 4.6 Footer
- Quick links (Essential, Prime, Contact Us, Network)
- Social media icons
- Legal links (Privacy Policy, Terms of Service)
- Copyright: "© 2026 Imperial Internet. All rights reserved."

---

## 5. Prime Page (`/prime`)

### 5.1 Hero Section
- **Headline**: "Internet Built for Business"
- **Subheadline**: "Reliable fiber connectivity for SMEs and enterprises in Cavite"
- **Background**: Placeholder business/office image

### 5.2 Business Plans Section

**SME Plans:**

| Plan | Speed | Price | Features |
|------|-------|-------|----------|
| Prime SME 100 | 100 Mbps | ₱2,999/mo | Static IP, 24/7 priority support, SLA guarantee |
| Prime SME 200 | 200 Mbps | ₱4,499/mo | Static IP, 24/7 priority support, SLA guarantee |

**Corporate Plans:**

| Plan | Speed | Price | Features |
|------|-------|-------|----------|
| Prime Corporate 500 | 500 Mbps | ₱9,999/mo | Dedicated line, Static IP block, Account manager, 99.99% SLA |
| Prime Corporate 1G | 1 Gbps | ₱14,999/mo | Dedicated line, Static IP block, Account manager, 99.99% SLA |

*Note: Placeholder data - to be updated with actual pricing*

### 5.3 Business Features Section

- **Dedicated Support** - Dedicated account manager for corporate clients
- **SLA Guarantee** - Service level agreements with uptime guarantees
- **Static IP** - Fixed IP addresses for servers and VPNs
- **Scalable** - Easily upgrade as your business grows

---

## 6. Contact Us Page (`/contact`)

### Sections
- Contact form (Name, Email, Phone, Company (optional), Message)
- Contact details (phone, email)
- Business hours
- Office location/address
- Social media links (Facebook, etc.)
- Embedded map (optional)

---

## 7. Network Page (`/network`)

### Purpose
Maintenance schedule news and network status - like a news/announcement page for service updates

### Sections
1. **Current Status Banner**: Green (All Systems Operational) / Yellow (Partial Outage) / Red (Major Outage)
2. **Scheduled Maintenance Feed**: News-style list of upcoming maintenance
   - Date, Time, Affected Areas, Description
3. **Service Status by Area**: Table showing status per municipality
4. **Incident History**: Recent resolved issues

### MVP Implementation
- Static page with hardcoded status/maintenance items
- Future: CMS or API integration for real-time updates

---

## 8. Technical Implementation

### 8.1 Coverage Checker (MVP)

**Data Source**: `/data/coverage.json`

```json
{
  "covered": [
    { "name": "Imus", "zip": "4103", "coords": { "x": 45, "y": 30 } },
    { "name": "Bacoor", "zip": "4102", "coords": { "x": 50, "y": 25 } },
    { "name": "Dasmarinas", "zip": "4114", "coords": { "x": 40, "y": 45 } }
  ],
  "coming_soon": [
    { "name": "Kawit", "zip": "4104", "coords": { "x": 55, "y": 20 } },
    { "name": "Noveleta", "zip": "4105", "coords": { "x": 58, "y": 22 } }
  ]
}
```

**Logic**:
1. User enters barangay name or ZIP code
2. Search in `covered` array → "Available in your area!"
3. Search in `coming_soon` array → "Coming soon! Join our waitlist."
4. Not found → "Not yet available. We're expanding soon!"

### 8.2 Cavite Coverage Map

**MVP**: Static SVG map of Cavite province
- Regions colored based on coverage status
- Blue (#0EA5E9) for covered areas
- Green (#22C55E) for coming soon areas
- Gray for not yet available

**Phase 2**: Interactive features
- Hover effects showing area name
- Click to see details

**Phase 3**: 3D effect
- Elevation/depth effect on the map
- Heat map intensity based on coverage density

### 8.3 Placeholder Images

Use placeholder images similar to Google Fiber style:
- Hero (Residential): Family/home lifestyle image
- Hero (Business): Office/professional setting
- Store in `/public/images/placeholders/`
- Will be replaced with actual images later

### 8.4 Animations (Framer Motion)

| Element | Animation |
|---------|-----------|
| Hero text | Fade in + slide up on load |
| Section headings | Fade in on scroll |
| Pricing cards | Scale up + shadow on hover |
| Stats numbers | Count up animation on scroll |
| Buttons | Scale (1.05) + shadow on hover |
| Form inputs | Border color transition on focus |
| Nav items | Text swap animation on hover (Phase 2) |
| Map regions | Highlight on hover (Phase 2) |

### 8.5 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | 320-639px | Single column, stacked |
| Tablet | 640-1023px | 2-column grids |
| Desktop | 1024px+ | Full layout, side-by-side |

---

## 9. Files to Create/Modify

### New Files
- `/PRD.md` - This document
- `/data/coverage.json` - Coverage data with coordinates
- `/public/images/placeholders/` - Placeholder images
- `/app/prime/page.tsx` - Business plans page
- `/app/contact/page.tsx` - Contact page
- `/app/network/page.tsx` - Network/maintenance page

### Component Structure
```
/components/
  /sections/
    Hero.tsx
    ResidentialPlans.tsx
    BusinessPlans.tsx
    Features.tsx
    CoverageMap.tsx
    Stats.tsx
    Contact.tsx
    Footer.tsx
  /ui/
    (shadcn components)
  Navbar.tsx
  CoverageChecker.tsx
  CaviteMap.tsx
```

---

## 10. Implementation Phases

### Phase 1: Foundation (MVP)
- [ ] Update color scheme in globals.css (white/sky blue theme)
- [ ] Create basic layout structure
- [ ] Implement responsive navbar (Essential, Prime, Contact Us, Network)
- [ ] Add placeholder images

### Phase 2: Essential Page (Home)
- [ ] Hero section with coverage checker
- [ ] Residential pricing cards
- [ ] Features section with icon cards
- [ ] Coverage map (static SVG)
- [ ] Stats section with animated counters
- [ ] Footer

### Phase 3: Additional Pages
- [ ] Prime page with business plans
- [ ] Contact page with form
- [ ] Network page with maintenance schedule

### Phase 4: Animations & Polish
- [ ] Add Framer Motion scroll animations
- [ ] Implement hover effects
- [ ] Nav text swap animations (Essential→Residential, etc.)
- [ ] Test on all viewports

### Phase 5: Map Enhancements (Future)
- [ ] Interactive map hover effects
- [ ] 3D map effect with depth
- [ ] Heat map visualization

---

## 11. Future Enhancements (Post-MVP)

- Real-time network status API
- Customer portal / login
- Online bill payment
- Live chat support
- Blog / News section
- Multi-language support (English/Filipino)
- Interactive 3D Cavite map with WebGL
