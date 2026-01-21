# Project Context

## Purpose
Build a modern, simple website for Imperial Internet - a local fiber internet provider targeting Cavite, Philippines. Inspired by Google Fiber's clean layout and Fraxbit's smooth animations.

## Tech Stack
- **Next.js 16** with App Router and React Server Components
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS 4** with PostCSS
- **shadcn/ui** (radix-vega style) with Base UI and Radix primitives
- **Framer Motion** for scroll-based animations and interactions
- **Lucide React** for icons
- **Playwright MCP** for visual/functional testing across viewports

## Project Conventions

### Code Style
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use `"use client"` directive for interactive components
- Import aliases use `@/` prefix for absolute paths
- Components use compound pattern (e.g., Card, CardHeader, CardContent)

### Architecture Patterns
- App Router with RSC (React Server Components)
- Client components only when needed for interactivity
- shadcn/ui components in `components/ui/`
- Application components in `components/`
- Section components in `components/sections/`
- Utilities in `lib/utils.ts`

### Testing Strategy
- Use Playwright MCP for visual/functional testing
- Test at 3 viewports: Mobile (375x667), Tablet (768x1024), Desktop (1440x900)
- Validate each section after implementation

### Git Workflow
- Feature branches for each phase
- Descriptive commit messages with co-author attribution
- PR-based workflow with review
- Do NOT auto-push or deploy without explicit user approval

## Domain Context
- **Business**: Imperial Internet - Local fiber internet provider
- **Target Market**: Cavite, Philippines (initial), expanding later
- **Audience**: Residential (Essential plans) and Business (Prime plans) customers
- **Theme**: 70% White, 30% Sky Blue (#0EA5E9) accent
- **Key Goal**: Clean, minimal design with smooth animations

## Site Structure
- `/` - Essential (Residential plans, home page)
- `/prime` - Prime (Business plans - SME & Corporate)
- `/contact` - Contact Us page
- `/network` - Network status and maintenance schedule

## Navigation
```
[Logo] | Essential | Prime | Contact Us | Network | [Check Coverage CTA]
```
- Essential → hover shows "Residential"
- Prime → hover shows "Business"
- Network → hover shows "Maintenance"

## Important Constraints
- Mobile-first responsive design (320px - 1440px+)
- Performance: 60fps animations, no jank
- Accessibility: Minimum 44px touch targets on mobile
- SEO: Server-rendered where possible

## Data Sources
- `/data/coverage.json` - Coverage checker data (municipalities, ZIP codes)

## Design Inspiration
- **Google Fiber** (https://fiber.google.com/) - Clean layout, pricing cards, coverage map
- **Fraxbit** (https://fraxbit.com/) - Scroll animations, hover effects, animated counters
