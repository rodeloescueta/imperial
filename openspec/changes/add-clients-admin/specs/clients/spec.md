# Clients Management Specification

## ADDED Requirements

### Requirement: Client Data Model
The system SHALL store client information in a database with the following fields.

#### Scenario: Client record structure
- **WHEN** a client is created
- **THEN** it SHALL have: firstName, lastName, name, email, phone, address, city, zipCode, GPS coordinates, status, balance, pppoeUsername, registeredAt

#### Scenario: Client status tracking
- **WHEN** a client status changes
- **THEN** it SHALL be one of: ACTIVE, INACTIVE, LEAD, ARCHIVED

### Requirement: Client List Page
The system SHALL provide a paginated list of clients at /admin/clients.

#### Scenario: Client list display
- **WHEN** admin navigates to /admin/clients
- **THEN** display clients in a table with: Name, Email/Phone, City, Plan, Status, Balance, Actions

#### Scenario: Client search
- **WHEN** admin searches for a client
- **THEN** filter by name, email, phone, or PPPoE username

#### Scenario: Client pagination
- **WHEN** there are more than 10 clients
- **THEN** paginate results with navigation controls

### Requirement: Client CRUD Operations
The system SHALL allow authorized users to create, read, update clients.

#### Scenario: Create client
- **WHEN** admin submits client form with valid data
- **THEN** create client record and redirect to client list

#### Scenario: View client details
- **WHEN** admin clicks on a client
- **THEN** show client details including subscription information

#### Scenario: Edit client
- **WHEN** admin edits client with valid data
- **THEN** update client record and redirect to client detail

### Requirement: Client-Subscription Relationship
The system SHALL track client subscriptions to plans.

#### Scenario: Client has subscription
- **WHEN** viewing a client
- **THEN** show their current plan subscription with dates and status
