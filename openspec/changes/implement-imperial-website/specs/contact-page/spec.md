## ADDED Requirements

### Requirement: Contact Form
The Contact page SHALL provide a contact form for customer inquiries.

#### Scenario: Form displays required fields
- **WHEN** user visits /contact
- **THEN** form displays fields: Name, Email, Phone, Message
- **AND** optional Company field is available
- **AND** submit button is visible

#### Scenario: Form validates required fields
- **WHEN** user attempts to submit with empty required fields
- **THEN** validation errors are displayed
- **AND** form is not submitted

#### Scenario: Form submits successfully
- **WHEN** user fills all required fields
- **AND** clicks submit button
- **THEN** success message is displayed
- **AND** form is cleared

### Requirement: Contact Information
The Contact page SHALL display company contact information.

#### Scenario: Contact details display correctly
- **WHEN** user visits /contact
- **THEN** phone number is displayed
- **AND** email address is displayed
- **AND** office address is displayed
- **AND** business hours are shown

### Requirement: Social Media Links
The Contact page SHALL display social media links.

#### Scenario: Social links display correctly
- **WHEN** user views contact page
- **THEN** Facebook link is visible
- **AND** links open in new tab
