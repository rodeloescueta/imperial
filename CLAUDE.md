<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Goal**: Build a modern, simple website for Imperial Internet - a local fiber internet provider targeting Cavite, Philippines. Inspired by Google Fiber's clean layout and Fraxbit's smooth animations.

### Design Theme
- **Primary Background**: White (#FFFFFF) - 70% of the design
- **Primary Accent**: Sky Blue (#0EA5E9) - 30% for CTAs, highlights, icons
- **Text Colors**: Dark Gray (#1F2937) for headings, Gray (#6B7280) for descriptions
- **Key Goal**: Clean, minimal design with smooth Framer Motion animations

### Animation Inspiration
- **Google Fiber** (https://fiber.google.com/) - Clean layout, simple pricing cards, coverage checker
- **Fraxbit** (https://fraxbit.com/) - GSAP scroll animations, hover effects, animated counters
- **Key Effects**: Scroll-triggered reveals, hover effects on cards/buttons, animated number counters

### Critical Requirements
- **Mobile Responsiveness**: App MUST be fully responsive (mobile-first approach)
- **Testing**: Use Playwright MCP to validate each section after implementation
- **Breakpoints**: Mobile (320-639px), Tablet (640-1023px), Desktop (1024px+)

### Navigation Structure
```
[Logo] | Essential | Prime | Contact Us | Network | [Check Coverage CTA]
```
- **Essential** (`/`) - Residential plans (home page) - hover shows "Residential"
- **Prime** (`/prime`) - Business plans (SME & Corporate) - hover shows "Business"
- **Contact Us** (`/contact`) - Contact form and info
- **Network** (`/network`) - Maintenance schedule & status - hover shows "Maintenance"

### Essential Page Sections (Home)
1. Hero - Headline + Coverage Checker
2. Residential Plans - 3-tier pricing cards
3. Features - Why Choose Us icon cards
4. Coverage Map - Cavite map with heat zones (Google Fiber style)
5. Stats - Animated counters
6. Footer

### Prime Page Sections
1. Hero - Business headline
2. SME Plans - 2-tier pricing
3. Corporate Plans - 2-tier pricing
4. Business Features

### Reference
- Full PRD: `/PRD.md`
- Coverage data: `/data/coverage.json`

---

# Plan & Review

### Before starting work

- Write a plan to .claude/tasks/TASK_NAME.md.
- The plan should be a detailed implementation plan and the reasoning behind them, as well as tasks broken down.
- Don't over plan it, always think MVP.
- Once you write the plan, firstly ask me to review it. Do not continue until I approve the plan.

### While implementing

- You should update the plan as you work.
- After you complete tasks in the plan, you should update and append detailed descriptions of the changes you made, so following tasks can be easily hand over to other engineers.


## Development Commands

```bash
npm run dev      # Start development server (localhost:3011)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 16** with App Router and React Server Components
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS 4** with PostCSS
- **shadcn/ui** (radix-vega style) with Base UI and Radix primitives
- **Lucide React** for icons
- **Framer Motion** for scroll-based animations and interactions
- **Playwright MCP** for visual/functional testing across viewports

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages and layouts
- `components/ui/` - shadcn UI components (button, card, input, select, combobox, alert-dialog, etc.)
- `components/` - Application-specific components
- `lib/utils.ts` - Utility functions including `cn()` for class merging

### Import Aliases

All imports use the `@/` prefix for absolute paths:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

### Component Patterns

- **Compound components**: Cards use CardHeader, CardContent, CardFooter subcomponents
- **Variants via CVA**: Components accept `variant` and `size` props defined with class-variance-authority
- **Data attributes**: Components use `data-slot`, `data-size`, `data-variant` for styling hooks
- **Client components**: Add `"use client"` directive for interactive components

### Theming

CSS variables in `globals.css` use oklch color format with light/dark mode support. Key semantic colors: `--primary`, `--secondary`, `--accent`, `--destructive`, `--muted`.

## Adding shadcn Components

```bash
npx shadcn@latest add [component-name]
```

Components are configured in `components.json` with RSC enabled and path aliases set.

---

## Memory

### Deployment Preferences
- **Do NOT automatically push to git or deploy to Vercel** - User wants to review changes first or batch features before shipping
- Always wait for explicit user instruction before running `git push` or `npx vercel --prod`
