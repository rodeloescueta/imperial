# Loading Breakthrough Collision Animation

## Goal
Create a scroll-linked animation where the "Slow" and "Blazing" images move toward each other and collide as the user scrolls, inspired by Fraxbit's entrance animation.

## Animation Behavior
- **Initial state**: Left image starts offset to the left, right image starts offset to the right
- **On scroll**: Both images move toward the center simultaneously
- **Collision point**: Images meet in the middle when the section is fully in view
- **Scroll-linked**: The animation progress is tied to scroll position (not just a one-time entrance)

## Implementation
1. Use Framer Motion's `useScroll` and `useTransform` hooks for scroll-linked animation
2. Create a `CollisionRevealImage` component that transforms based on scroll progress
3. Replace the current `ScrollRevealImage` usage with the new collision animation
4. Keep the overlay reveal effect for extra polish

## Technical Details
- `useScroll` with `target` ref to track scroll progress relative to the section
- `useTransform` to map scroll progress (0 to 1) to x position
- Left image: x moves from -150px to 0px
- Right image: x moves from 150px to 0px
- Add a subtle scale effect on collision (scale up slightly at the meeting point)

## Files to Modify
- `components/sections/LoadingBreakthrough.tsx` - Add scroll-linked collision animation

## Status
- [x] Implement collision animation

## Changes Made

### `components/sections/LoadingBreakthrough.tsx`
- Added `useRef`, `useScroll`, and `useTransform` imports from Framer Motion
- Created scroll-linked animation that tracks when section enters viewport
- Left image slides from -150px to 0px as user scrolls
- Right image slides from 150px to 0px as user scrolls
- Added opacity fade (0.3 to 1) and subtle scale effect (0.95 to 1) during collision
- Kept the reveal overlay bar animation for extra polish (gray bar for left, primary/blue bar for right)
- Removed dependency on `ScrollRevealImage` component

### `components/ui/scroll-reveal-image.tsx`
- Fixed TypeScript error by adding `as const` to ease arrays
