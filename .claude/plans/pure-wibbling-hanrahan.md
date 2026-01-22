# Data Journey Scroll-Reveal - Imperial Internet

## Summary

Create a scroll-reveal section showing data's journey from user device → router → fiber → Imperial HQ → internet. Uses isometric illustrations with zoom-out reveal animation.

**Placement**: After Hero, before Pricing section (high visibility)
**Style**: Isometric illustrations (3D-ish perspective)
**Reference**: Existing iceberg implementation in `/components/ui/iceberg-reveal-c.tsx`

---

## Final Design Decisions

| Decision | Choice |
|----------|--------|
| Concept | Data Journey (vertical path) |
| Placement | After Hero, before Pricing |
| Visual Style | Isometric illustrations |
| Color Palette | Sky blue (#0EA5E9) + gradients |
| Animation | Zoom-out + clip-path reveal |

---

## Implementation Plan

### Phase 1: Create Component Structure
1. Create `/components/ui/data-journey-reveal.tsx`
2. Set up container with `useScroll` targeting the section
3. Implement zoom-out transform (scale 2 → 1)
4. Implement clip-path reveal animation

### Phase 2: Build Isometric SVG Illustrations
5. Create isometric device icon (laptop/phone with screen glow)
6. Create isometric router icon (WiFi signals emanating)
7. Create isometric ONT box icon (fiber cable connected)
8. Create isometric building icon (Imperial HQ with server racks)
9. Create isometric globe icon (network connections)

### Phase 3: Add Labels & Connectors
10. Position labels on left/right of each stage
11. Implement staggered opacity for labels
12. Add animated connector lines (dashed, glowing)
13. Add data "packets" flowing animation (optional enhancement)

### Phase 4: Integrate into Homepage
14. Import component into `/app/page.tsx`
15. Place after Hero section, before PricingSection
16. Adjust section height for comfortable scroll reveal

### Phase 5: Responsive Adjustments
17. Tablet: Stack labels below icons
18. Mobile: Simplify to smaller icons, inline labels

---

## Files to Modify/Create

| File | Action |
|------|--------|
| `/components/ui/data-journey-reveal.tsx` | Create (main component) |
| `/components/sections/DataJourney.tsx` | Create (section wrapper with headline) |
| `/app/page.tsx` | Modify (add section after Hero) |

---

## Proposed Options (Archive)

### Option 1: "Underground Fiber Network" (Most Literal)

**Concept**: Show a simple house with WiFi signal above ground → reveal the complex fiber infrastructure underground

```
ABOVE GROUND (Visible at start)
┌─────────────────────────────┐
│     🏠 House with WiFi      │
│        📶 Signal            │
├─────────────────────────────┤ ← Ground Level
│                             │
│  UNDERGROUND (Revealed)     │
│                             │
│  ┌─────┐    ┌─────┐        │
│  │ ONT │────│Fiber │        │  ← Last Mile
│  └─────┘    │Cable │        │
│             └──┬───┘        │
│                │            │
│         ┌──────┴──────┐     │
│         │ Distribution │    │  ← Node/Splitter
│         │    Hub       │    │
│         └──────┬───────┘    │
│                │            │
│    ════════════╪════════    │  ← Fiber Backbone
│                │            │
│         ┌──────┴──────┐     │
│         │  Imperial   │     │  ← Central Office
│         │    Core     │     │
│         └─────────────┘     │
└─────────────────────────────┘
```

**Revealed Labels (staggered)**:
1. "Fiber-to-Home" (ONT device)
2. "Local Distribution" (splitter/node)
3. "Fiber Backbone" (main line)
4. "Imperial Core Network" (central office)
5. "99.9% Uptime Infrastructure"

**Message**: "Your fast WiFi is just the surface. Here's what powers it underground."

---

### Option 2: "Signal Roots" (Nature Metaphor)

**Concept**: A WiFi signal icon or router above ground with "roots" of fiber cables spreading underground like a tree

```
       📶
      ╱│╲     ← Signal waves (visible first)
     ╱ │ ╲
    ╱──┴──╲   ← Router base
───────┬──────  Ground
       │
      ╱│╲      ← Fiber roots spread out
     ╱ │ ╲
    ╱  │  ╲    ← Each root = a feature
   ╱   │   ╲
Labels: Speed | Reliability | Support | Coverage
```

**Revealed Labels (on each root)**:
1. "200 Mbps Pure Fiber"
2. "99.9% Uptime"
3. "24/7 Local Support"
4. "Cavite-Wide Coverage"

**Message**: "Strong signal needs deep roots. Ours run on fiber."

---

### Option 3: "Data Journey" (Vertical Path)

**Concept**: Vertical cross-section showing your data's journey from device → through Imperial network → to the internet

```
┌─────────────────────────────┐
│      📱 Your Device         │  ← Start zoomed here
│            ↓                │
│      📶 WiFi Router         │
├─────────────────────────────┤
│            ↓                │
│      🔌 Fiber ONT           │  ← Reveal on scroll
│            ↓                │
│      ═══ Fiber Line ═══     │
│            ↓                │
│     ┌────────────┐          │
│     │ Imperial   │          │
│     │ Network    │          │
│     │ Operations │          │
│     └─────┬──────┘          │
│           ↓                 │
│      🌐 Internet            │
└─────────────────────────────┘
```

**Revealed Stages**:
1. "Your Home" (device + router)
2. "Fiber Connection" (ONT)
3. "Imperial Backbone" (network)
4. "The World" (internet globe)

**Message**: "From your device to the world. See how your data flows."

---

### Option 4: "Speed Layers" (Performance Reveal)

**Concept**: Start with the speed number (e.g., "200 Mbps"), scroll reveals the layers of technology making it possible

```
┌─────────────────────────────┐
│                             │
│        ╔═══════════╗        │
│        ║  200 Mbps ║        │  ← Big speed number (zoomed)
│        ╚═══════════╝        │
│                             │
├─────────────────────────────┤  ← Reveal below
│                             │
│   Layer 1: Pure Fiber       │  ← Not copper, not hybrid
│   ───────────────────       │
│   Layer 2: Direct Routing   │  ← No congestion
│   ───────────────────       │
│   Layer 3: Local NOC        │  ← Quick response
│   ───────────────────       │
│   Layer 4: Dedicated Line   │  ← Not shared bandwidth
│                             │
└─────────────────────────────┘
```

**Message**: "200 Mbps isn't just a number. It's built on these."

---

## Comparison Matrix

| Option | Visual Appeal | Business Relevance | Implementation Complexity | Uniqueness |
|--------|---------------|-------------------|---------------------------|------------|
| 1. Underground Fiber | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Medium | ⭐⭐⭐⭐ |
| 2. Signal Roots | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Low-Medium | ⭐⭐⭐⭐⭐ |
| 3. Data Journey | ⭐⭐⭐ | ⭐⭐⭐⭐ | Medium | ⭐⭐⭐ |
| 4. Speed Layers | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Low | ⭐⭐⭐ |

---

## Selected Option: Data Journey

User selected Option 3 - the vertical cross-section showing data's journey from device through Imperial network to the internet.

---

## Refined Design: "Your Data's Journey"

### Visual Layout

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              📱 YOUR DEVICE                     │  ← Start zoomed here
│         ┌──────────────────────┐                │
│         │  Phone/Laptop/TV     │                │
│         │  watching Netflix    │                │
│         └──────────┬───────────┘                │
│                    │                            │
│                    ↓  WiFi Signal               │
│                    │                            │
├────────────────────┼────────────────────────────┤
│              📶 YOUR ROUTER                     │  ← Reveal stage 1
│         ┌──────────────────────┐                │
│         │   Imperial Router    │                │
│         │   with WiFi 6        │                │
│         └──────────┬───────────┘                │
│                    │                            │
│                    ↓  Fiber Line                │
│                    │                            │
├────────────────────┼────────────────────────────┤
│              🔌 FIBER ONT                       │  ← Reveal stage 2
│         ┌──────────────────────┐                │
│         │  Optical Network     │                │
│         │  Terminal (ONT)      │                │
│         └──────────┬───────────┘                │
│                    │                            │
│           ═══════════════════                   │  ← Fiber Backbone
│                    │                            │
├────────────────────┼────────────────────────────┤
│            🏢 IMPERIAL HQ                       │  ← Reveal stage 3
│         ┌──────────────────────┐                │
│         │  Network Operations  │                │
│         │  Center (Cavite)     │                │
│         │  ┌────┐ ┌────┐       │                │
│         │  │NOC │ │24/7│       │                │
│         │  └────┘ └────┘       │                │
│         └──────────┬───────────┘                │
│                    │                            │
│           ═══════════════════                   │  ← High-speed uplink
│                    │                            │
├────────────────────┼────────────────────────────┤
│              🌐 THE WORLD                       │  ← Reveal stage 4
│         ┌──────────────────────┐                │
│         │    Global Internet   │                │
│         │  Netflix, YouTube,   │                │
│         │  Gaming Servers      │                │
│         └──────────────────────┘                │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Animation Sequence

| Scroll Progress | What Happens |
|-----------------|--------------|
| 0% | Zoomed in on "Your Device" - user sees their device streaming |
| 0-20% | Zoom out begins, reveal "Your Router" with label fade-in |
| 20-40% | Continue zoom, reveal "Fiber ONT" - show fiber cable connecting |
| 40-60% | Reveal "Imperial HQ" with NOC visualization |
| 60-80% | Reveal "The World" - globe/cloud icons |
| 80-100% | Full view visible, all labels shown |

### Label Details (Staggered Reveal)

1. **"Your Device"** - "Streaming, gaming, working - all at once"
2. **"Your Router"** - "WiFi 6 for whole-home coverage"
3. **"Fiber ONT"** - "Light-speed connection to our network"
4. **"Imperial Operations"** - "Local team monitoring 24/7"
5. **"The World"** - "Low latency to global servers"

### Visual Style

- **Color palette**: Sky blue (#0EA5E9) for fiber lines, glowing effects
- **Connection lines**: Animated dashed or glowing lines between stages
- **Icons**: Clean, minimal line icons for each stage
- **Background**: Gradient from light (top) to slightly darker (bottom) to show depth

### Copy/Headline

Section title: **"See Where Your Data Goes"** or **"From Your Device to the World"**

---

## Technical Implementation

### Files to Create

1. `/components/ui/data-journey-reveal.tsx` - Main scroll-reveal component
2. Inline SVG illustrations (no separate files)

### Framer Motion Approach

```tsx
// Same pattern as iceberg
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start 0.9", "end start"],
})

// Zoom out effect
const scale = useTransform(scrollYProgress, [0, 0.5], [2, 1])

// Clip path to reveal stages
const clipPath = useTransform(
  scrollYProgress,
  [0, 0.25, 0.5, 0.75, 1],
  [
    "inset(0% 0% 80% 0%)",  // Only device visible
    "inset(0% 0% 60% 0%)",  // + Router
    "inset(0% 0% 40% 0%)",  // + ONT
    "inset(0% 0% 20% 0%)",  // + HQ
    "inset(0% 0% 0% 0%)",   // + World
  ]
)

// Staggered label opacities
const label1Opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1])
const label2Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1])
// etc.
```

### Responsive Considerations

- **Desktop**: Full vertical layout with labels on sides
- **Tablet**: Slightly condensed, labels below each stage
- **Mobile**: Simplified icons, labels as overlays or below

---

## Verification Plan

After implementation:
- [ ] Scroll animation triggers at correct viewport positions
- [ ] Zoom-out effect is smooth (starts zoomed on device, ends at full view)
- [ ] Labels fade in at staggered intervals (not all at once)
- [ ] Isometric icons render correctly with gradients/shadows
- [ ] Connector lines animate properly
- [ ] Mobile layout is readable with condensed icons
- [ ] Section integrates smoothly between Hero and Pricing
- [ ] Performance: 60fps on scroll (check with devtools)

### Testing Steps
1. Run `npm run dev` and navigate to homepage
2. Scroll through the Data Journey section
3. Verify animation timing and smoothness
4. Test on mobile viewport (320px, 768px)
5. Use Playwright MCP to capture screenshots at different scroll positions
