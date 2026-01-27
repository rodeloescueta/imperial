# Plans Management Specification

## ADDED Requirements

### Requirement: Plan Data Model
The system SHALL store internet plan information in a database.

#### Scenario: Plan record structure
- **WHEN** a plan is created
- **THEN** it SHALL have: name, tier (unique), speed (Mbps), price, type, features array, isActive flag

#### Scenario: Plan types
- **WHEN** a plan is categorized
- **THEN** type SHALL be one of: RESIDENTIAL, SME, CORPORATE

### Requirement: Plan List Page
The system SHALL provide a list of plans at /admin/plans.

#### Scenario: Plan list display
- **WHEN** admin navigates to /admin/plans
- **THEN** display plans in a table with: Name, Tier, Speed, Price, Type, Status, Actions

### Requirement: Plan CRUD Operations
The system SHALL allow authorized users to manage plans.

#### Scenario: Create plan
- **WHEN** admin submits plan form with valid data
- **THEN** create plan record with unique tier identifier

#### Scenario: View plan details
- **WHEN** admin clicks on a plan
- **THEN** show plan details including subscriber count

#### Scenario: Edit plan
- **WHEN** admin edits plan with valid data
- **THEN** update plan record

#### Scenario: Deactivate plan
- **WHEN** admin deactivates a plan
- **THEN** set isActive to false (existing subscriptions remain)

### Requirement: Plan Seeding
The system SHALL seed initial plans from data/plans.ts.

#### Scenario: Initial plan data
- **WHEN** database is seeded
- **THEN** create 7 residential plans: Solo, Bronze, Silver, Gold, Platinum, Diamond, Ruby
