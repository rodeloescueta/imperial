## ADDED Requirements

### Requirement: Business Hero Section
The Prime page SHALL display a business-focused hero section.

#### Scenario: Business hero displays correctly
- **WHEN** user visits /prime
- **THEN** hero section displays "Internet Built for Business" headline
- **AND** subheadline "Reliable fiber connectivity for SMEs and enterprises in Cavite"
- **AND** background uses business/office imagery

### Requirement: SME Plans Section
The Prime page SHALL display SME (Small-Medium Enterprise) internet plans.

#### Scenario: SME plans display correctly
- **WHEN** user scrolls to SME plans section
- **THEN** 2 pricing cards are displayed (Prime SME 100, Prime SME 200)
- **AND** each card shows speed, price, and business features
- **AND** features include: Static IP, 24/7 priority support, SLA guarantee

### Requirement: Corporate Plans Section
The Prime page SHALL display Corporate internet plans for enterprises.

#### Scenario: Corporate plans display correctly
- **WHEN** user scrolls to corporate plans section
- **THEN** 2 pricing cards are displayed (Prime Corporate 500, Prime Corporate 1G)
- **AND** each card shows speed, price, and enterprise features
- **AND** features include: Dedicated line, Static IP block, Account manager, 99.99% SLA

### Requirement: Business Features Section
The Prime page SHALL display business-specific features.

#### Scenario: Business features display correctly
- **WHEN** user scrolls to business features section
- **THEN** 4 feature cards are displayed
- **AND** features include: Dedicated Support, SLA Guarantee, Static IP, Scalable
