# Tasks: Add Admin Authentication & User Management

## 1. Infrastructure Setup

- [x] 1.1 Create `docker-compose.yml` with PostgreSQL 16
- [x] 1.2 Create `.env.example` with required variables template
- [x] 1.3 Create `.env.local` with development credentials
- [x] 1.4 Install Prisma: `npm install prisma @prisma/client`
- [x] 1.5 Initialize Prisma: `npx prisma init`
- [x] 1.6 Define User schema in `prisma/schema.prisma`
- [ ] 1.7 Run initial migration: `npx prisma migrate dev --name init` (requires Docker)
- [x] 1.8 Create `lib/prisma.ts` (Prisma client singleton)
- [x] 1.9 Create `prisma/seed.ts` with initial admin user
- [x] 1.10 Add seed script to `package.json`
- [ ] 1.11 Run seed: `npx prisma db seed` (requires Docker)

## 2. Authentication

- [x] 2.1 Install Auth.js: `npm install next-auth@beta @auth/prisma-adapter bcryptjs zod`
- [x] 2.2 Install types: `npm install -D @types/bcryptjs tsx`
- [x] 2.3 Create `auth.ts` (NextAuth configuration with credentials provider)
- [x] 2.4 Create `app/api/auth/[...nextauth]/route.ts` (Auth API handlers)
- [x] 2.5 Create `types/next-auth.d.ts` (TypeScript type extensions)
- [x] 2.6 Create `middleware.ts` (route protection for `/admin/*`)
- [x] 2.7 Create `lib/validations/user.ts` (Zod schemas for login/user)
- [x] 2.8 Create `lib/actions/auth.ts` (login/logout server actions)

## 3. Admin Login Page

- [x] 3.1 Create `app/admin/login/page.tsx` (login form page)
- [x] 3.2 Create login form component with email/password inputs
- [x] 3.3 Add form validation and error display
- [ ] 3.4 Test login flow end-to-end (requires Docker)

## 4. Admin Layout

- [x] 4.1 Create `app/admin/layout.tsx` (admin shell with auth check)
- [x] 4.2 Create `components/admin/sidebar.tsx` (navigation sidebar)
- [x] 4.3 Create `components/admin/header.tsx` (top bar with user menu)
- [x] 4.4 Create `app/admin/page.tsx` (dashboard home)
- [x] 4.5 Add basic dashboard stats (total users, active users, etc.)

## 5. User Management - List

- [x] 5.1 Create `lib/actions/users.ts` with `getUsers` action
- [x] 5.2 Create `app/admin/users/page.tsx` (user listing page)
- [x] 5.3 Create `components/admin/user-table.tsx` (data table)
- [x] 5.4 Add pagination support
- [ ] 5.5 Add search/filter functionality (basic structure in place)

## 6. User Management - Create

- [x] 6.1 Add `createUser` server action
- [x] 6.2 Create `app/admin/users/new/page.tsx` (create user page)
- [x] 6.3 Create `components/admin/user-form.tsx` (reusable form)
- [x] 6.4 Add form validation and error handling
- [ ] 6.5 Test user creation flow (requires Docker)

## 7. User Management - View/Edit

- [x] 7.1 Add `getUser`, `updateUser` server actions
- [x] 7.2 Create `app/admin/users/[id]/page.tsx` (view user)
- [x] 7.3 Create `app/admin/users/[id]/edit/page.tsx` (edit user)
- [x] 7.4 Reuse user-form component for editing
- [ ] 7.5 Test edit flow (requires Docker)

## 8. User Management - Delete

- [x] 8.1 Add `deleteUser` server action
- [x] 8.2 Add delete confirmation dialog
- [x] 8.3 Implement RBAC checks (prevent self-delete, protect last super admin)
- [ ] 8.4 Test delete flow (requires Docker)

## 9. Polish & Security

- [ ] 9.1 Add toast notifications for actions
- [ ] 9.2 Add rate limiting to login endpoint
- [x] 9.3 Test all RBAC permissions (code review complete)
- [ ] 9.4 Test edge cases (duplicate email, invalid data, etc.) (requires Docker)
- [ ] 9.5 Final end-to-end testing with Playwright MCP (requires Docker)

## Verification Checklist (Pending - requires Docker and database)

- [ ] Docker: `docker compose up -d` starts PostgreSQL
- [ ] Database: `npx prisma studio` shows User table with seeded admin
- [ ] Login: Navigate to `/admin/login`, login with `admin@imperial.ph`
- [ ] Protection: Unauthenticated `/admin` redirects to login
- [ ] Dashboard: After login, see dashboard with user stats
- [ ] User CRUD: Create, list, view, edit users work
- [ ] RBAC: OPERATOR cannot create users, ADMIN can
- [ ] Logout: Sign out returns to login page

---

## Implementation Notes

### Files Created

**Infrastructure:**
- `docker-compose.yml` - PostgreSQL 16 container
- `.env.example` - Environment variable template
- `.env.local` - Development credentials
- `prisma/schema.prisma` - Database schema with User model
- `prisma/seed.ts` - Initial admin seed script
- `prisma.config.ts` - Prisma 7 configuration
- `lib/prisma.ts` - Prisma client singleton

**Authentication:**
- `auth.ts` - NextAuth.js v5 configuration
- `middleware.ts` - Route protection for /admin/*
- `app/api/auth/[...nextauth]/route.ts` - Auth API handlers
- `types/next-auth.d.ts` - TypeScript extensions
- `lib/actions/auth.ts` - Login/logout server actions
- `lib/validations/user.ts` - Zod validation schemas

**Admin UI:**
- `app/admin/layout.tsx` - Admin shell layout
- `app/admin/page.tsx` - Dashboard with stats
- `app/admin/login/page.tsx` - Login page
- `app/admin/users/page.tsx` - User listing
- `app/admin/users/new/page.tsx` - Create user
- `app/admin/users/[id]/page.tsx` - View user
- `app/admin/users/[id]/edit/page.tsx` - Edit user
- `components/admin/sidebar.tsx` - Navigation sidebar
- `components/admin/header.tsx` - Top bar with user menu
- `components/admin/user-table.tsx` - Users data table
- `components/admin/user-form.tsx` - Create/edit form

**Server Actions:**
- `lib/actions/users.ts` - User CRUD operations with RBAC

### Next Steps (require Docker running)

1. Start Docker: `npm run docker:up` (or `docker compose --env-file .env.local up -d`)
2. Run migration: `npm run db:migrate`
3. Seed database: `npm run db:seed`
4. Start dev server: `npm run dev`
5. Test at: http://localhost:3011/admin/login
6. Login with: admin@imperial.ph / Imperial@2024

### Tech Stack Used

- **Database:** PostgreSQL 16 via Docker
- **ORM:** Prisma 7
- **Auth:** NextAuth.js v5 (Auth.js) with credentials provider
- **Validation:** Zod
- **Password Hashing:** bcryptjs (12 rounds)
- **Session:** JWT-based
