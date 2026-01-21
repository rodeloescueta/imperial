## ADDED Requirements

### Requirement: Status Banner
The Network page SHALL display a prominent network status banner.

#### Scenario: Operational status displays
- **WHEN** all systems are operational
- **THEN** banner displays green background
- **AND** text shows "All Systems Operational"
- **AND** green pulse indicator is visible

#### Scenario: Partial outage status displays
- **WHEN** some areas have issues
- **THEN** banner displays yellow background
- **AND** text shows "Partial Outage"

#### Scenario: Major outage status displays
- **WHEN** major outage occurs
- **THEN** banner displays red background
- **AND** text shows "Major Outage"

### Requirement: Service Status Table
The Network page SHALL display service status per area.

#### Scenario: Status table displays correctly
- **WHEN** user views network page
- **THEN** table shows all covered municipalities
- **AND** each row displays area name, status indicator, and last updated time
- **AND** operational areas show green indicator

### Requirement: Scheduled Maintenance Feed
The Network page SHALL display upcoming scheduled maintenance.

#### Scenario: Maintenance items display
- **WHEN** maintenance is scheduled
- **THEN** maintenance card shows date and time
- **AND** affected areas are listed
- **AND** description explains the maintenance

#### Scenario: No maintenance scheduled
- **WHEN** no maintenance is scheduled
- **THEN** message displays "No scheduled maintenance at this time"

### Requirement: Incident History
The Network page SHALL display recent resolved incidents.

#### Scenario: Incident history displays
- **WHEN** user views incident history section
- **THEN** recent incidents are listed
- **AND** each incident shows title, date, duration, and description
- **AND** resolved status badge is visible

#### Scenario: View full history
- **WHEN** user clicks "View Full History"
- **THEN** expanded list of incidents is shown
