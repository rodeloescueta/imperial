# Scroll Animation Sections - Customer Pain Points

**Status**: In Progress
**Goal**: Create scroll animation sections that connect emotionally with customers' pain points

## Overview

Working on scroll animation sections that will connect emotionally with customers' pain points. These sections use Framer Motion scroll-triggered animations to tell a story as users scroll.

## Implementation Status

| Option | Name | Status |
|--------|------|--------|
| A | Internet Struggles → Imperial Saves the Day | ✅ Implemented |
| B | The Neighborhood Transformation | Pending |
| C | David vs Goliath - Market Disruption | ✅ Implemented |
| D | Speed Race Comparison | Pending |
| E | The Loading Screen We All Hate | Pending |
| F | Coverage Expansion (Map-based) | Pending |

---

## Option A: "Internet Struggles → Imperial Saves the Day" ✅

**Concept**: Devices suffering from bad internet → Imperial arrives → Everything works perfectly

**Visual Flow (on scroll)**:
1. TV showing "Buffering..." spinner
2. Phone with laggy game / high ping indicator
3. Laptop with "Connection Lost" error
4. Scroll trigger: Imperial signal wave sweeps across
5. All devices transform: TV plays 4K, phone shows "12ms ping", laptop connected

**Message**: "Tired of this? Imperial is here."

**Implementation**: Completed
- `components/ui/devices-reveal.tsx` - SVG scroll animation
- `components/sections/InternetStruggles.tsx` - Section wrapper

---

## Option B: "The Neighborhood Transformation"

**Concept**: A street of houses with bad internet → Imperial fiber cable installs → Neighborhood lights up

**Visual Flow (on scroll)**:
1. Row of houses with weak WiFi signals, frustrated emojis
2. Scroll trigger: Fiber cable "draws" along the street underground
3. Each house lights up with strong signal as cable passes
4. Final: Happy neighborhood, all connected

**Message**: "We're wiring Cavite, one barangay at a time."

---

## Option C: "David vs Goliath" - Market Disruption ✅

**Concept**: Big ISPs dominating → Imperial enters small but grows → Takes territory

**Visual Flow (on scroll)**:
1. Large towers/buildings representing big ISPs (PLDT, Globe, Converge - shown generically)
2. Small Imperial icon appears at corner
3. Scroll trigger: Imperial expands, coverage area grows
4. Big players shrink relatively as Imperial's presence grows

**Message**: "The local challenger is here."

**Implementation**: Completed - see screenshot reference

---

## Option D: "Speed Race" Comparison

**Concept**: Visual race showing Imperial vs typical ISP speeds

**Visual Flow (on scroll)**:
1. Two "packets" or "signals" at starting line
2. Scroll trigger: Race begins
3. Generic ISP struggles (buffering, stuttering)
4. Imperial zooms ahead smoothly
5. Imperial finishes while other is still halfway

**Message**: "Not all fiber is created equal."

---

## Option E: "The Loading Screen We All Hate"

**Concept**: Familiar frustrating loading experiences → Imperial eliminates them

**Visual Flow (on scroll)**:
1. Giant loading spinner / progress bar stuck at 99%
2. Familiar "Reconnecting..." messages
3. Scroll trigger: Imperial logo "breaks through" the spinner
4. Loading disappears, replaced with instant content

**Message**: "Say goodbye to buffering. Forever."

---

## Option F: "Coverage Expansion" (Map-based)

**Concept**: Cavite map showing Imperial's coverage spreading like light/water

**Visual Flow (on scroll)**:
1. Dark/dim Cavite map
2. Imperial starting point glows (Imus, Bacoor)
3. Scroll trigger: Light/color spreads outward to more areas
4. Coverage areas illuminate as you scroll
5. "Coming Soon" areas pulse gently

**Message**: "We're growing. Every. Single. Day."

---

---

## Option A Implementation Plan

### Overview

Create a scroll-animated section showing devices suffering from bad internet, then Imperial's signal wave sweeps across and transforms everything to work perfectly.

### Files to Create

1. **`components/ui/devices-reveal.tsx`** - The scroll animation component with SVG devices
2. **`components/sections/InternetStruggles.tsx`** - The section wrapper with header and benefits

### Visual Design

**Layout**: Similar to MarketDisruption - two-column grid with animation on left, benefits on right

**SVG Animation Elements**:
- TV with buffering spinner (spinning circle animation)
- Phone with "999ms" ping / lag indicator
- Laptop with "Connection Lost" error message
- Imperial signal wave that sweeps from right to left
- Transformation: TV shows "4K", phone shows "12ms", laptop shows "Connected"

**Scroll Animation Flow**:
1. `scrollYProgress [0, 0.3]` - Devices visible with "bad internet" state
2. `scrollYProgress [0.3, 0.5]` - Imperial wave sweeps across (sky-blue gradient wave)
3. `scrollYProgress [0.5, 0.8]` - Devices transform to "good internet" state
4. Labels fade in with staggered timing

**Benefits List** (right side):
- "No More Buffering" - Stream 4K without interruption
- "Low Latency Gaming" - 12ms ping for competitive advantage
- "Reliable Connection" - 99.9% uptime guaranteed
- "Whole Home Coverage" - Every device stays connected

### Implementation Tasks

1. [x] Create `devices-reveal.tsx` with:
   - SVG devices (TV, phone, laptop)
   - Scroll-based transforms using `useScroll` and `useTransform`
   - Imperial wave animation
   - Bad → Good state transitions
   - Reduced motion fallback

2. [x] Create `InternetStruggles.tsx` section with:
   - Section header with badge, title, subtitle
   - Two-column layout
   - Benefits list with icons
   - Bottom quote/CTA

3. [x] Export from `components/sections/index.ts`

4. [x] Add to `app/page.tsx` (place after Features, before MarketDisruption)

5. [x] Test responsiveness on mobile/tablet/desktop

---

## Next Steps

1. [x] Write implementation plan for Option A
2. [x] Implement Option A: Internet Struggles → Imperial Saves the Day
3. [ ] Implement additional options as needed (B, D, E, F)
4. [ ] Present all implemented options to client for selection
5. [ ] Client selects preferred section(s) for final website

## Technical Notes

- All animations use Framer Motion with scroll-triggered effects
- Components should be modular and reusable
- Mobile responsiveness is critical
- Follow existing animation patterns from Option C implementation
