## MODIFIED Requirements

### Requirement: Market Disruption Scroll Reveal
The system SHALL provide a scroll-triggered animation component that visualizes Imperial Internet's growth as a local challenger against established telecom players.

#### Scenario: Big ISP Towers Shrink on Scroll
- **WHEN** the user scrolls the market disruption section into view
- **THEN** three generic "big ISP" tower elements begin at full size
- **AND** as scroll progresses (10-60%), the towers shrink to ~60% of original size
- **AND** towers fade slightly in opacity (to ~70%)

#### Scenario: Imperial Presence Grows on Scroll
- **WHEN** the user scrolls past 10% of the section
- **THEN** the Imperial element appears small at the bottom center
- **AND** as scroll progresses (10-50%), Imperial grows to full prominence
- **AND** Imperial element uses sky blue (#0EA5E9) with glow effect

#### Scenario: Coverage Waves Expand
- **WHEN** the user scrolls past 30% of the section
- **THEN** circular waves emanate from the Imperial element
- **AND** waves expand outward as scroll progresses (30-70%)
- **AND** waves use sky blue with decreasing opacity

#### Scenario: Labels Reveal with Stats
- **WHEN** Imperial growth animation progresses past 40%
- **THEN** labels appear in staggered sequence:
  1. "500+ Happy Customers" at 40-50%
  2. "Growing Daily" at 50-60%
  3. "Locally Owned" at 60-70%

### Requirement: Market Disruption Section Layout
The system SHALL provide a section component displaying the market animation with supporting content.

#### Scenario: Desktop Two-Column Layout
- **WHEN** viewport width is 1024px or greater
- **THEN** the market animation displays on the left (50% width)
- **AND** the content (heading: "The Local Challenger", benefits list) displays on the right

#### Scenario: Mobile Stacked Layout
- **WHEN** viewport width is less than 1024px
- **THEN** content stacks vertically: heading, animation, benefits list

### Requirement: Reduced Motion Support
The system SHALL respect user accessibility preferences for reduced motion.

#### Scenario: Reduced Motion Preference
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** scroll-triggered animations are disabled
- **AND** the visualization displays in its final state (Imperial prominent, towers small)

## REMOVED Requirements

### Requirement: Fiber Optic Cross-Section Reveal
**Reason**: Replaced with market disruption concept that better tells Imperial's brand story
**Migration**: Remove fiber-optic-reveal.tsx, replace FiberTechnology section with MarketDisruption
