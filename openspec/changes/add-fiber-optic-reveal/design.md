# "David vs Goliath" Market Disruption Reveal - Design

## Context
Imperial Internet competes against established telecom giants in the Philippines. Instead of a technical fiber cross-section, we'll tell a story that resonates emotionally: the local underdog growing to challenge the big players.

**Stakeholders**: Imperial Internet marketing, development team
**Constraints**: Must maintain 60fps, avoid using competitor logos/names, mobile responsive

## Goals / Non-Goals

### Goals
- Create a scroll-triggered animation showing market disruption story
- Show generic "big ISP" representations shrinking as Imperial grows
- Visualize coverage/market presence expanding
- Reinforce "local challenger" brand positioning
- Build emotional connection with customers

### Non-Goals
- Using actual competitor names or logos (legal risk)
- Complex 3D graphics
- Interactive elements beyond scroll

## Visual Concept

### The Story (Scroll Progression)
```
[Start State]                    [Mid Scroll]                    [End State]
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│  ████  ████  ████   │    │  ███   ███   ███    │    │  ██    ██    ██     │
│  ████  ████  ████   │    │  ███   ███   ███    │    │  ██    ██    ██     │
│  ████  ████  ████   │ →  │  ███   ███   ███    │ →  │  ██    ██    ██     │
│  (Big ISP Towers)   │    │                     │    │                     │
│                     │    │        ▲▲▲          │    │      ▲▲▲▲▲▲▲        │
│         .          │    │     Imperial         │    │    IMPERIAL         │
│     (tiny)         │    │     (growing)        │    │   (prominent)       │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

### Visual Elements

#### 1. Big ISP Towers (Generic)
- 3 tall rectangular towers representing market dominance
- Colors: Gray (#6B7280), muted, corporate
- No logos - just abstract building shapes
- Start: Large and prominent
- End: Shrink to ~60% size, fade slightly

#### 2. Imperial Presence
- Starts: Small dot/icon at bottom center
- Animation: Grows upward and outward
- Color: Sky blue (#0EA5E9) with glow
- Shape: Circular expanding coverage or rising tower
- End: Prominent presence, competing with big players

#### 3. Coverage Waves (Optional)
- Circular waves emanating from Imperial
- Show signal/coverage expanding
- Sky blue with decreasing opacity

#### 4. Labels/Stats (Staggered Reveal)
- "500+ Happy Customers"
- "Growing Daily"
- "Locally Owned"
- Appear as Imperial grows

### Color Palette
| Element | Color | Hex |
|---------|-------|-----|
| Big ISP Towers | Gray | `#6B7280` |
| Big ISP Shadow | Dark Gray | `#374151` |
| Imperial Core | Sky Blue | `#0EA5E9` |
| Imperial Glow | Light Sky | `#38BDF8` |
| Background | Light Gray | `#F3F4F6` |
| Text | Dark | `#1F2937` |

## Decisions

### Decision 1: Abstract Tower Representation
**What**: Use simple geometric shapes (rectangles) for competitor towers, no logos
**Why**:
- Avoids legal issues with competitor trademarks
- Keeps focus on the story, not specific competitors
- Universal understanding of "big corporate"

### Decision 2: Vertical Growth Animation
**What**: Imperial grows from bottom to top as a rising tower/bar
**Why**:
- "Rising" metaphor = growth, success, challenge
- Works well with scroll direction
- Clear visual hierarchy change

### Decision 3: Coverage Expansion Circles
**What**: Add expanding circles from Imperial showing coverage spread
**Why**:
- Reinforces ISP context (signal coverage)
- Creates dynamic movement
- Shows "spreading" presence

### Decision 4: Scale Transform Instead of Remove
**What**: Big towers shrink but don't disappear
**Why**:
- More realistic - competitors still exist
- Shows relative change, not elimination
- Less aggressive messaging

## Animation Timing

```typescript
// Scroll progress transforms
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"],
})

// Big ISP towers shrink
const towerScale = useTransform(scrollYProgress, [0.1, 0.6], [1, 0.6])
const towerOpacity = useTransform(scrollYProgress, [0.1, 0.6], [1, 0.7])

// Imperial grows
const imperialScale = useTransform(scrollYProgress, [0.1, 0.5], [0.2, 1])
const imperialOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

// Coverage waves expand
const waveScale = useTransform(scrollYProgress, [0.3, 0.7], [0, 1])

// Labels appear (staggered)
const label1Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])
const label2Opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1])
const label3Opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1])
```

## Section Layout

```
Desktop (lg:grid-cols-2):
┌──────────────────────────────────────────────────────┐
│              "The Local Challenger"                   │
│     "Taking on the giants. One barangay at a time."  │
├────────────────────────┬─────────────────────────────┤
│                        │                             │
│   [Market Animation]   │  • Locally owned & operated │
│   Big ISPs shrinking   │  • 500+ happy customers     │
│   Imperial growing     │  • Growing every day        │
│                        │  • Your neighbor's choice   │
│                        │                             │
└────────────────────────┴─────────────────────────────┘

Mobile (stacked):
┌─────────────────────┐
│   "The Local        │
│    Challenger"      │
├─────────────────────┤
│                     │
│ [Market Animation]  │
│                     │
├─────────────────────┤
│ • Locally owned     │
│ • 500+ customers    │
│ • Growing daily     │
└─────────────────────┘
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Appears aggressive toward competitors | Use abstract shapes, no names/logos |
| Animation too complex | Keep geometry simple (rectangles, circles) |
| Message unclear | Add clear heading and supporting copy |
| Mobile performance | Reduce wave animations on mobile |

## Open Questions
- [x] Use competitor names/logos? → **No, use generic shapes**
- [ ] How many "big ISP" towers? → **3 towers suggested**
- [ ] Include specific stats? → **"500+", "24/7", etc. from existing site**
