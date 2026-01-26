# Design: Admin Authentication & User Management

## Context

Imperial Internet needs an admin dashboard for staff to manage operational data. This change introduces the first backend infrastructure to an otherwise frontend-only Next.js application. The architecture must support future expansion to client, coverage, and branch management.

**Stakeholders**: Internal staff (admin users), development team
**Constraints**: Must integrate with existing Next.js 16 App Router, use PostgreSQL, containerized with Docker

## Goals / Non-Goals

### Goals
- Secure authentication for admin staff
- User CRUD with role-based access control
- Extensible schema for future admin features
- Simple deployment with Docker

### Non-Goals
- OAuth/social login (future consideration)
- Public user registration
- Password reset via email (future consideration)
- Two-factor authentication (future consideration)

## Decisions

### 1. ORM: Prisma

**Decision**: Use Prisma over Drizzle

**Rationale**:
- Native NextAuth.js adapter (`@auth/prisma-adapter`)
- Declarative migrations simplify schema evolution
- Lower learning curve for the team
- Mature ecosystem with excellent TypeScript support
- Prisma Studio for easy database inspection

**Alternatives considered**:
- Drizzle: More SQL-like, but requires custom NextAuth setup
- Raw SQL: Too low-level for this use case

### 2. Authentication: Auth.js v5 (NextAuth)

**Decision**: Use Auth.js v5 with credentials provider

**Rationale**:
- Native Next.js App Router support
- Built-in session management
- Middleware integration for route protection
- Well-documented, active community
- Credentials provider sufficient for internal staff

**Session Strategy**: JWT (stateless)
- Scalable across serverless deployments
- No session table queries on each request
- Token includes user ID and role for RBAC

### 3. API Approach: Server Actions + API Routes

**Decision**: Server Actions primary, API Routes for complex queries

**Rationale**:
- Server Actions: Simple CRUD, form submissions, built-in CSRF protection
- API Routes: Pagination, filtering, complex queries where URL params are useful

**Pattern**:
```
lib/actions/users.ts    → createUser, updateUser, deleteUser (Server Actions)
app/api/admin/users/    → GET with pagination/filters (API Route)
```

### 4. Password Security

**Decision**: bcryptjs with 12 salt rounds

**Rationale**:
- Pure JavaScript (no native dependencies)
- 12 rounds balance security and performance
- Industry standard for password hashing

### 5. Admin UI: Neutral/Minimal Style

**Decision**: Gray-based admin UI, distinct from main site

**Rationale**:
- Clear visual separation between admin and public site
- Neutral colors reduce distraction for operational tasks
- Reuse existing shadcn/ui components with custom styling

## Architecture

### Database Schema

```
User
├── id (cuid)
├── email (unique)
├── name
├── password (bcrypt hash)
├── role (SUPER_ADMIN | ADMIN | OPERATOR)
├── status (ACTIVE | INACTIVE | SUSPENDED)
├── createdAt
├── updatedAt
├── createdBy (nullable, references User)
├── lastLoginAt (nullable)
├── accounts[] (Auth.js)
└── sessions[] (Auth.js)
```

### Role Permissions

| Permission | SUPER_ADMIN | ADMIN | OPERATOR |
|------------|-------------|-------|----------|
| View users | Yes | Yes | Yes |
| Create users | Yes | Yes | No |
| Edit users | Yes | Yes | No |
| Delete users | Yes | No | No |
| Change roles | Yes | No | No |
| Manage admins | Yes | No | No |

### File Structure

```
/
├── docker-compose.yml
├── auth.ts
├── middleware.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── lib/
│   ├── prisma.ts
│   ├── actions/
│   │   ├── auth.ts
│   │   └── users.ts
│   └── validations/
│       └── user.ts
├── components/admin/
│   ├── sidebar.tsx
│   ├── header.tsx
│   ├── user-form.tsx
│   └── user-table.tsx
├── app/admin/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/page.tsx
│   └── users/
│       ├── page.tsx
│       ├── new/page.tsx
│       └── [id]/
│           ├── page.tsx
│           └── edit/page.tsx
└── app/api/
    └── auth/[...nextauth]/route.ts
```

## Risks / Trade-offs

### Risk: JWT token size
**Mitigation**: Keep token payload minimal (id, email, role only)

### Risk: No password reset
**Mitigation**: SUPER_ADMIN can manually reset passwords; add email reset in future

### Trade-off: Credentials-only auth
**Rationale**: Simpler for MVP internal use; OAuth can be added later without breaking changes

### Trade-off: bcryptjs vs bcrypt
**Rationale**: bcryptjs is slower but has no native dependencies, simplifying deployment

## Migration Plan

1. **Phase 1**: Infrastructure (Docker, Prisma, migrations)
2. **Phase 2**: Authentication (Auth.js, login, middleware)
3. **Phase 3**: Admin layout (shell, sidebar, header)
4. **Phase 4**: User management (CRUD)
5. **Phase 5**: Polish (validation, security, testing)

**Rollback**: Delete `/admin` routes, remove prisma, docker-compose to revert to frontend-only

## Environment Variables

```bash
# Required
DATABASE_URL="postgresql://user:pass@localhost:5432/imperial"
AUTH_SECRET="<32-byte-random-string>"

# Development
POSTGRES_PASSWORD="<dev-password>"
AUTH_URL="http://localhost:3011"
```

## Open Questions

1. ~~Initial admin email?~~ **Resolved**: `admin@imperial.ph`
2. ~~OAuth providers for MVP?~~ **Resolved**: No, email/password only
3. ~~Admin UI styling?~~ **Resolved**: Neutral/minimal gray-based
