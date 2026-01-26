# Change: Add Admin Authentication & User Management

## Why

Imperial Internet needs an admin dashboard for internal staff to manage operational data. The MVP focuses on authentication and user management as the foundation for future admin capabilities (client management, coverage management, branch management).

## What Changes

- **ADDED** Docker infrastructure for PostgreSQL database
- **ADDED** Prisma ORM with User schema and migrations
- **ADDED** Auth.js v5 (NextAuth) for authentication with credentials provider
- **ADDED** Protected `/admin/*` routes with middleware
- **ADDED** Admin login page (`/admin/login`)
- **ADDED** Admin dashboard layout with sidebar navigation
- **ADDED** User management CRUD (list, create, view, edit users)
- **ADDED** Role-based access control (SUPER_ADMIN, ADMIN, OPERATOR)

## Impact

- **New capability**: `admin-auth` - Authentication and user management
- **Affected code**:
  - New: `prisma/` directory (schema, migrations, seed)
  - New: `app/admin/` routes (dashboard, login, users)
  - New: `components/admin/` (sidebar, header, forms, tables)
  - New: `lib/actions/` (auth.ts, users.ts)
  - New: `lib/prisma.ts` (database client)
  - New: `auth.ts` (NextAuth config)
  - New: `middleware.ts` (route protection)
  - New: `docker-compose.yml` (PostgreSQL)
- **Dependencies added**:
  - `next-auth@beta`, `@auth/prisma-adapter`
  - `prisma`, `@prisma/client`
  - `bcryptjs`, `zod`

## Design Decisions

- **Auth method**: Email/password only (no OAuth for MVP)
- **Admin UI style**: Neutral/minimal gray-based (distinct from main site branding)
- **Seed admin**: `admin@imperial.ph` with default password
- **Session strategy**: JWT-based (stateless, scalable)
- **API approach**: Server Actions (primary) + API Routes (for pagination)

## Out of Scope (Future)

- Client management
- Coverage management
- Branch management
- OAuth providers (Google, etc.)
- Password reset via email
- Two-factor authentication
