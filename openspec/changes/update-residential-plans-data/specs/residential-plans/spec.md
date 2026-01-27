# Residential Plans Specification

## ADDED Requirements

### Requirement: Centralized Plan Data
The system SHALL maintain a centralized data source for residential plan definitions.

#### Scenario: Plan data structure
- **WHEN** a plan is defined
- **THEN** it SHALL include: name, price, speed, features array, and popularity flag

#### Scenario: Data import
- **WHEN** components need plan data
- **THEN** they SHALL import from `data/plans.ts`

### Requirement: Seven-Tier Plan Structure
The system SHALL display seven residential internet plans matching official pricing.

#### Scenario: SOLO plan display
- **WHEN** user views residential plans
- **THEN** SOLO plan shows ₱599/month at 35 Mbps

#### Scenario: BRONZE plan display
- **WHEN** user views residential plans
- **THEN** BRONZE plan shows ₱799/month at 50 Mbps

#### Scenario: SILVER plan display (Most Popular)
- **WHEN** user views residential plans
- **THEN** SILVER plan shows ₱999/month at 100 Mbps with "Most Popular" badge

#### Scenario: GOLD plan display
- **WHEN** user views residential plans
- **THEN** GOLD plan shows ₱1,200/month at 150 Mbps

#### Scenario: PLATINUM plan display
- **WHEN** user views residential plans
- **THEN** PLATINUM plan shows ₱1,400/month at 200 Mbps

#### Scenario: DIAMOND plan display
- **WHEN** user views residential plans
- **THEN** DIAMOND plan shows ₱1,600/month at 300 Mbps

#### Scenario: RUBY plan display
- **WHEN** user views residential plans
- **THEN** RUBY plan shows ₱2,000/month at 500 Mbps

### Requirement: Accurate Customer Statistics
The system SHALL display accurate customer count based on real data.

#### Scenario: Customer count display
- **WHEN** user views the stats section
- **THEN** customer count displays "9,700+" (reflecting actual 9,782 subscribers)

## REMOVED Requirements

### Requirement: Placeholder Plan Data
**Reason**: Replaced with actual plan data from client
**Migration**: Update `ResidentialPlans.tsx` to use new plan structure

The following placeholder plans are removed:
- Essential 50 (₱1,299 / 50 Mbps)
- Essential 100 (₱1,799 / 100 Mbps)
- Essential 200 (₱2,499 / 200 Mbps)
