# Tasks: Add "David vs Goliath" Market Disruption Reveal

## 1. Cleanup Old Implementation
- [x] 1.1 Remove `components/ui/fiber-optic-reveal.tsx`
- [x] 1.2 Remove or rename `components/sections/FiberTechnology.tsx`

## 2. Create Market Reveal Animation Component
- [x] 2.1 Create `components/ui/market-reveal.tsx` with component scaffold
- [x] 2.2 Set up `useScroll` and `useTransform` hooks for scroll-linked animation
- [x] 2.3 Build SVG with 3 generic "big ISP" tower rectangles
- [x] 2.4 Add Imperial rising tower/presence element (sky blue)
- [x] 2.5 Add tower scale transforms (big ISPs shrink as scroll progresses)
- [x] 2.6 Add Imperial growth transforms (starts small, grows prominent)
- [x] 2.7 Add coverage wave circles expanding from Imperial
- [x] 2.8 Add labels with staggered opacity reveals

## 3. Create Section Wrapper Component
- [x] 3.1 Create `components/sections/MarketDisruption.tsx`
- [x] 3.2 Add section heading: "The Local Challenger"
- [x] 3.3 Add subheading: "Taking on the giants. One barangay at a time."
- [x] 3.4 Implement two-column grid layout (animation + content)
- [x] 3.5 Add benefits/stats list with icons
- [x] 3.6 Add responsive styles (stack on mobile)

## 4. Update Home Page Integration
- [x] 4.1 Update import in `app/page.tsx` (FiberTechnology → MarketDisruption)
- [x] 4.2 Update sections index export

## 5. Accessibility & Polish
- [x] 5.1 Add `prefers-reduced-motion` check
- [x] 5.2 Add proper aria-label to SVG container
- [x] 5.3 Test at mobile breakpoints (375px)
- [x] 5.4 Test at desktop breakpoints (1440px)

## 6. Validation
- [x] 6.1 Run `npm run dev` and verify scroll animation
- [x] 6.2 Verify towers shrink and Imperial grows on scroll
- [x] 6.3 Verify coverage waves expand
- [x] 6.4 Test reduced motion preference
