# Tasks: Add Clients & Plans Admin Management

## 1. Database Schema
- [ ] 1.1 Add ClientStatus and SubscriptionStatus enums to schema.prisma
- [ ] 1.2 Add Plan model with fields: name, tier, speed, price, type, features
- [ ] 1.3 Add Client model with fields: name, email, phone, address, GPS, status
- [ ] 1.4 Add Subscription model linking Client to Plan
- [ ] 1.5 Run migration: `npx prisma migrate dev --name add_clients`

## 2. Seed Plans
- [ ] 2.1 Update prisma/seed.ts to seed Plan records from data/plans.ts
- [ ] 2.2 Run seed and verify plans created

## 3. CSV Import Script
- [ ] 3.1 Create prisma/seed-clients.ts
- [ ] 3.2 Parse CSV with plan name normalization
- [ ] 3.3 Create clients with subscriptions
- [ ] 3.4 Test import with full dataset (~9,700 records)

## 4. Server Actions - Plans
- [ ] 4.1 Create lib/validations/plan.ts with Zod schemas
- [ ] 4.2 Create lib/actions/plans.ts with CRUD operations

## 5. Server Actions - Clients
- [ ] 5.1 Create lib/validations/client.ts with Zod schemas
- [ ] 5.2 Create lib/actions/clients.ts with CRUD operations

## 6. Plans Admin Pages
- [ ] 6.1 Create app/admin/(dashboard)/plans/page.tsx (list)
- [ ] 6.2 Create components/admin/plan-table.tsx
- [ ] 6.3 Create app/admin/(dashboard)/plans/new/page.tsx
- [ ] 6.4 Create components/admin/plan-form.tsx
- [ ] 6.5 Create app/admin/(dashboard)/plans/[id]/page.tsx (view)
- [ ] 6.6 Create app/admin/(dashboard)/plans/[id]/edit/page.tsx

## 7. Clients Admin Pages
- [ ] 7.1 Create app/admin/(dashboard)/clients/page.tsx (list)
- [ ] 7.2 Create components/admin/client-table.tsx
- [ ] 7.3 Create app/admin/(dashboard)/clients/new/page.tsx
- [ ] 7.4 Create components/admin/client-form.tsx
- [ ] 7.5 Create app/admin/(dashboard)/clients/[id]/page.tsx (view)
- [ ] 7.6 Create app/admin/(dashboard)/clients/[id]/edit/page.tsx

## 8. Navigation
- [ ] 8.1 Enable "Clients" link in sidebar.tsx
- [ ] 8.2 Add "Plans" link to sidebar.tsx

## 9. Testing
- [ ] 9.1 Test Plans CRUD operations
- [ ] 9.2 Test Clients list with pagination (9,700 records)
- [ ] 9.3 Test Clients search functionality
- [ ] 9.4 Test mobile responsiveness
