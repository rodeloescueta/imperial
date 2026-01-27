# Change: Add Clients & Plans Admin Management

## Why

Imperial Internet needs to manage their 9,782 customers through the admin dashboard. Currently, the "Clients" section shows as "Coming Soon" in the sidebar. Client data exists in a CSV export from their billing system (UCRM) and needs to be imported and manageable through the admin interface.

## What Changes

### Database
- **NEW**: Plan model - stores internet plans (Solo, Bronze, Silver, etc.)
- **NEW**: Client model - stores customer information
- **NEW**: Subscription model - links clients to plans with dates/status

### Admin Pages
- **NEW**: Plans management (/admin/plans) - Full CRUD
- **NEW**: Clients management (/admin/clients) - Full CRUD with plan selector

### Data Import
- **NEW**: CSV import script to seed 9,782 customers from billing export

### Navigation
- Enable "Clients" link in sidebar (currently disabled)
- Add "Plans" link to sidebar

## Impact

- **Affected files:**
  - `prisma/schema.prisma` - Add 3 new models + 2 enums
  - `lib/actions/` - New clients.ts and plans.ts
  - `lib/validations/` - New client.ts and plan.ts
  - `components/admin/` - New table and form components
  - `app/admin/(dashboard)/` - New clients/ and plans/ pages
  - `components/admin/sidebar.tsx` - Enable navigation

- **Data sources:**
  - CSV: `/home/rodelo-escueta/Downloads/405_export_2026-01-26_173135.csv`
  - Plans: `data/plans.ts`

## Client Data Fields

From CSV import:
- Customer ID, Name, Email, Phone
- Address, City, ZIP, GPS coordinates
- PPPoE username
- Plan/Service subscription
- Balance, Registration date
- Status (Active, Lead, Archived)
