# Fraxbit-Style Entrance Animation for LoadingBreakthrough Section

## Goal
Replace the current LoadingBreakthrough section with a Fraxbit-inspired two-sided entrance animation featuring:
- Two images sliding in from opposite sides
- Colored overlay sweep reveal effect
- Comparison text in the center ("Without" vs "With Imperial")

## Reference
- **Fraxbit**: Two statue images (cracked vs perfect) that reveal with directional overlay sweeps
- **Animation**: Left image slides from left with left-to-right overlay sweep; Right image slides from right with right-to-left overlay sweep
- **Trigger**: Viewport entrance (scroll-triggered)

## Implementation Plan

### 1. Create new UI component: `scroll-reveal-image.tsx`
- Reusable component for the overlay reveal animation
- Props: `direction` ("left" | "right"), `src`, `alt`, `className`
- Uses Framer Motion's `useInView` for trigger
- Overlay bar sweeps across (sky blue `#0EA5E9` to match brand)
- Image fades in simultaneously

### 2. Update `LoadingBreakthrough.tsx` section
- Replace current centered animation with two-sided layout
- Left side: Placeholder image + "[WITHOUT]" + "Slow Internet" heading + description
- Right side: Placeholder image + "[WITH IMPERIAL]" + "Fast Internet" heading + description
- Use gray placeholder boxes for images (can be replaced later)
- Center divider or spacing between the two sides
- Keep benefits grid below

### 3. Layout Structure
```
|  [LEFT IMAGE]  |     [CENTER TEXT]     |  [RIGHT IMAGE]  |
|  slides in ←   |  [WITHOUT] | [WITH]   |  slides in →    |
|                |  text comparison      |                 |
```

### 4. Animation Timing
- Trigger: when section enters viewport (top 80%)
- Duration: ~0.6s for overlay sweep
- Images fade in simultaneously with overlay movement
- Stagger: left starts first, right follows 0.1s later

## Files to Modify/Create
1. `components/ui/scroll-reveal-image.tsx` (new)
2. `components/sections/LoadingBreakthrough.tsx` (update)

## Tasks
- [x] Create `scroll-reveal-image.tsx` component
- [x] Update `LoadingBreakthrough.tsx` with new layout and animation
- [ ] Test responsive behavior (mobile stacks vertically)

## Changes Made

### `components/ui/scroll-reveal-image.tsx` (NEW)
- Reusable component with `direction` prop ("left" | "right")
- Uses `useInView` hook for scroll trigger
- Two animations:
  1. Container slides in from the specified direction (60px offset → 0)
  2. Sky blue overlay sweeps across the image
- Accepts `delay` prop for staggering multiple reveals
- Duration: 0.6-0.7s with custom easing

### `components/sections/LoadingBreakthrough.tsx` (UPDATED)
- Replaced centered animation with two-sided Fraxbit-style layout
- Left side: Gray placeholder + "[ WITHOUT ] Slow INTERNET" text
- Right side: Sky blue placeholder + "[ WITH IMPERIAL ] Blazing INTERNET" text
- Center divider on desktop
- Mobile: stacks vertically with reversed order on right side
- Kept benefits grid and bottom decoration
