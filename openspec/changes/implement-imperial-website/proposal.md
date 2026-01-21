# Change: Implement Imperial Internet Website

## Why
Imperial Internet needs a modern, simple website to showcase their fiber internet services in Cavite, Philippines. The website must effectively present residential (Essential) and business (Prime) plans, allow users to check coverage, and provide network status updates. Phase 1 foundation is complete - this proposal covers the remaining implementation phases.

## What Changes
- **Essential Page (Home)**: Hero with coverage checker, residential pricing cards, features section, coverage map, stats section, footer
- **Prime Page**: Business hero, SME plans, corporate plans, business features section
- **Contact Page**: Contact form with validation, contact information, social links
- **Network Page**: Status banner, service status table, scheduled maintenance feed, incident history
- **Shared Components**: Coverage checker, Cavite map component, animated counters, pricing cards

## Impact
- Affected specs: essential-page, prime-page, contact-page, network-page, shared-components
- Affected code:
  - `app/page.tsx` - Essential/home page
  - `app/prime/page.tsx` - Business plans page
  - `app/contact/page.tsx` - Contact page
  - `app/network/page.tsx` - Network status page
  - `components/sections/` - All section components
  - `components/CoverageChecker.tsx` - Coverage search component
  - `components/CaviteMap.tsx` - Interactive map component
