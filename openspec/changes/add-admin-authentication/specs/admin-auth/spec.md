# Capability: Admin Authentication & User Management

Admin dashboard authentication and user management for Imperial Internet staff.

## ADDED Requirements

### Requirement: Admin Authentication

The system SHALL provide secure authentication for admin users using email and password credentials.

#### Scenario: Successful login
- **WHEN** a user navigates to `/admin/login` and enters valid email and password
- **THEN** the system authenticates the user, creates a JWT session, and redirects to `/admin`

#### Scenario: Failed login with invalid credentials
- **WHEN** a user enters an invalid email or password
- **THEN** the system displays an error message "Invalid credentials" and remains on the login page

#### Scenario: Failed login with inactive account
- **WHEN** a user with status INACTIVE or SUSPENDED attempts to login
- **THEN** the system displays an error message "Account is not active" and denies access

#### Scenario: Logout
- **WHEN** an authenticated user clicks the logout button
- **THEN** the system invalidates the session and redirects to `/admin/login`

### Requirement: Route Protection

The system SHALL protect all `/admin/*` routes (except `/admin/login`) from unauthenticated access.

#### Scenario: Unauthenticated access to admin route
- **WHEN** an unauthenticated user navigates to any `/admin/*` route (except login)
- **THEN** the system redirects to `/admin/login` with the original URL as callback

#### Scenario: Authenticated user accessing login page
- **WHEN** an authenticated user navigates to `/admin/login`
- **THEN** the system redirects to `/admin` dashboard

### Requirement: User Listing

The system SHALL provide a paginated list of all admin users at `/admin/users`.

#### Scenario: View user list
- **WHEN** an authenticated user navigates to `/admin/users`
- **THEN** the system displays a table with columns: Name, Email, Role, Status, Last Login, Created At

#### Scenario: Paginated results
- **WHEN** there are more than 10 users
- **THEN** the system displays pagination controls showing 10 users per page

#### Scenario: Search users
- **WHEN** a user enters a search term in the search field
- **THEN** the system filters results by name or email containing the search term

### Requirement: Create User

The system SHALL allow authorized users to create new admin users at `/admin/users/new`.

#### Scenario: Successful user creation
- **WHEN** an ADMIN or SUPER_ADMIN submits a valid user form (name, email, password, role)
- **THEN** the system creates the user with hashed password and redirects to user listing

#### Scenario: Duplicate email rejection
- **WHEN** a user submits a form with an email that already exists
- **THEN** the system displays an error "Email already exists" and does not create the user

#### Scenario: Unauthorized user creation attempt
- **WHEN** an OPERATOR attempts to access `/admin/users/new`
- **THEN** the system displays an "Unauthorized" message or redirects

### Requirement: Edit User

The system SHALL allow authorized users to edit existing users at `/admin/users/[id]/edit`.

#### Scenario: Successful user update
- **WHEN** an ADMIN or SUPER_ADMIN submits valid changes to a user
- **THEN** the system updates the user and displays a success message

#### Scenario: Role change restriction
- **WHEN** an ADMIN attempts to change a user's role to SUPER_ADMIN
- **THEN** the system denies the action (only SUPER_ADMIN can promote to SUPER_ADMIN)

### Requirement: Delete User

The system SHALL allow SUPER_ADMIN users to delete users.

#### Scenario: Successful user deletion
- **WHEN** a SUPER_ADMIN confirms deletion of a user
- **THEN** the system removes the user and displays a success message

#### Scenario: Self-deletion prevention
- **WHEN** a user attempts to delete their own account
- **THEN** the system displays an error "Cannot delete your own account"

#### Scenario: Last super admin protection
- **WHEN** attempting to delete the only SUPER_ADMIN user
- **THEN** the system displays an error "Cannot delete the last super admin"

### Requirement: Role-Based Access Control

The system SHALL enforce role-based permissions for all admin actions.

#### Scenario: Permission matrix enforcement
- **WHEN** a user attempts an action
- **THEN** the system checks permissions based on user role:
  - SUPER_ADMIN: Full access (create, edit, delete, change roles)
  - ADMIN: Can create and edit users, cannot delete or change roles
  - OPERATOR: View-only access

#### Scenario: Role hierarchy
- **WHEN** displaying role options in forms
- **THEN** users can only assign roles at or below their own level

### Requirement: Password Security

The system SHALL securely hash and validate passwords.

#### Scenario: Password hashing
- **WHEN** a new user is created or password is changed
- **THEN** the system hashes the password using bcrypt with 12 salt rounds

#### Scenario: Password validation
- **WHEN** a user sets a password
- **THEN** the password MUST be at least 8 characters and contain uppercase, lowercase, and a number

### Requirement: Admin Dashboard

The system SHALL provide a dashboard at `/admin` showing key metrics.

#### Scenario: Dashboard display
- **WHEN** an authenticated user navigates to `/admin`
- **THEN** the system displays: Total Users count, Active Users count, Users by Role breakdown

### Requirement: Session Management

The system SHALL manage user sessions using JWT tokens.

#### Scenario: Session creation
- **WHEN** a user successfully logs in
- **THEN** the system creates a JWT token containing user ID, email, and role

#### Scenario: Session validation
- **WHEN** a request is made to a protected route
- **THEN** the middleware validates the JWT token and allows or denies access

#### Scenario: Session expiry
- **WHEN** a JWT token expires (default 24 hours)
- **THEN** the system requires re-authentication
