# Admin Dashboard Setup Guide

This guide walks you through setting up the admin dashboard for local development after cloning the repository.

## Prerequisites

- **Node.js** 18+
- **Docker** and **Docker Compose**
- **npm** or **pnpm**

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL database
docker compose up -d

# 3. Run database migrations
npx prisma migrate deploy

# 4. Seed the database with initial admin user and plans
npx tsx prisma/seed.ts

# 5. Start development server
npm run dev
```

The admin dashboard will be available at: **http://localhost:3011/admin/login**

## Default Admin Credentials

| Field    | Value              |
|----------|-------------------|
| Email    | admin@imperial.ph |
| Password | Imperial@2024     |

> **Important:** Change this password after first login in production!

## Logging Out

To sign out of the admin dashboard:

1. Click on your **username/avatar** in the top-right corner of the header
2. A dropdown menu will appear showing your name and email
3. Click **"Sign out"** at the bottom of the menu

You will be redirected to the login page at `/admin/login`.

---

## Detailed Setup Steps

### 1. Environment Variables

Copy the example environment file (if not already present):

```bash
cp .env.example .env.local
```

Required variables in `.env.local`:

```bash
# Database (PostgreSQL)
DATABASE_URL="postgresql://imperial_admin:imperial_dev_2024@localhost:5433/imperial"
POSTGRES_PASSWORD="imperial_dev_2024"

# NextAuth.js / Auth.js
AUTH_SECRET="your-secret-key-min-32-chars"
AUTH_URL="http://localhost:3011"
```

> **Note:** Generate a secure `AUTH_SECRET` for production using: `openssl rand -base64 32`

### 2. Database Setup

Start the PostgreSQL container:

```bash
docker compose up -d
```

Verify the container is running:

```bash
docker compose ps
```

Expected output:
```
NAME               STATUS          PORTS
imperial_postgres  Up              0.0.0.0:5433->5432/tcp
```

### 3. Database Migration

Apply all migrations:

```bash
npx prisma migrate deploy
```

Or for development (creates migrations if schema changed):

```bash
npx prisma migrate dev
```

### 4. Seed Initial Data

Create the initial super admin user and plans:

```bash
npx tsx prisma/seed.ts
```

Output:
```
Seeding database...
Created super admin user: admin@imperial.ph
Default password: Imperial@2024
Created 15 plans
Please change this password after first login!
```

### 5. Import Client Data (Optional)

If you have a customer CSV export from the billing system, you can import it:

```bash
npx tsx prisma/seed-clients.ts
```

This imports customer data including:
- Client information (name, email, phone, address)
- GPS coordinates
- Subscription history linked to plans

> **Note:** The CSV file path is configured in `prisma/seed-clients.ts`

### 6. Start Development Server

```bash
npm run dev
```

The server runs on port 3011 by default.

---

## Admin Routes

| Route                       | Description              | Access          |
|-----------------------------|--------------------------|-----------------|
| `/admin/login`              | Login page               | Public          |
| `/admin`                    | Dashboard                | Authenticated   |
| **Users**                   |                          |                 |
| `/admin/users`              | User listing             | Authenticated   |
| `/admin/users/new`          | Create new user          | ADMIN+          |
| `/admin/users/[id]`         | View user details        | Authenticated   |
| `/admin/users/[id]/edit`    | Edit user                | ADMIN+          |
| **Clients**                 |                          |                 |
| `/admin/clients`            | Client listing           | Authenticated   |
| `/admin/clients/new`        | Create new client        | ADMIN+          |
| `/admin/clients/[id]`       | View client details      | Authenticated   |
| `/admin/clients/[id]/edit`  | Edit client              | ADMIN+          |
| **Plans**                   |                          |                 |
| `/admin/plans`              | Plan listing             | Authenticated   |
| `/admin/plans/new`          | Create new plan          | ADMIN+          |
| `/admin/plans/[id]`         | View plan details        | Authenticated   |
| `/admin/plans/[id]/edit`    | Edit plan                | ADMIN+          |

## User Roles

| Role        | Permissions                                              |
|-------------|----------------------------------------------------------|
| SUPER_ADMIN | Full system access, can delete users/clients/plans       |
| ADMIN       | Can manage users, clients, plans (no delete)             |
| OPERATOR    | View-only access with limited edit permissions           |

---

## Admin Features

### User Management
- Create, view, edit, and delete admin users
- Role-based access control (SUPER_ADMIN, ADMIN, OPERATOR)
- Status management (ACTIVE, INACTIVE, SUSPENDED)

### Client Management
- Full CRUD for customer accounts
- Search by name, email, phone, or PPPoE username
- Filter by status, city, or subscribed plan
- View subscription history
- Archive clients (soft delete)

### Plan Management
- Full CRUD for internet plans
- Track subscriber counts per plan
- Support for RESIDENTIAL, SME, and CORPORATE plan types
- Activate/deactivate plans

---

## Common Commands

### Database

```bash
# Start database
docker compose up -d

# Stop database
docker compose down

# View database logs
docker compose logs -f postgres

# Reset database (delete all data)
docker compose down -v
docker compose up -d
npx prisma migrate deploy
npx tsx prisma/seed.ts

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Prisma

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Reset database and apply all migrations
npx prisma migrate reset
```

---

## Troubleshooting

### Port 5432 Already in Use

If you have another PostgreSQL instance running on port 5432, our setup uses port **5433** instead. Verify your `DATABASE_URL` uses the correct port:

```
DATABASE_URL="postgresql://...@localhost:5433/imperial"
```

### Database Connection Failed

1. Check if Docker container is running:
   ```bash
   docker compose ps
   ```

2. Check container logs:
   ```bash
   docker compose logs postgres
   ```

3. Verify credentials match between `.env.local` and `docker-compose.yml`

### Prisma Client Not Generated

If you see errors about missing Prisma client or undefined models:

```bash
npx prisma generate
```

Then restart the dev server.

### Decimal Serialization Errors

If you see "Only plain objects can be passed to Client Components" errors related to Decimal, ensure the server actions are using the `serialize()` helper function to convert Prisma Decimal objects to numbers.

### Migration Errors

Reset the database and reapply migrations:

```bash
npx prisma migrate reset
```

> **Warning:** This deletes all data!

### Edge Runtime Crypto Error

This is handled by the split auth configuration (`auth.config.ts` for edge-compatible middleware, `auth.ts` for full auth with database). If you see this error, ensure you're not importing from `@/auth` in middleware.

---

## Project Structure (Admin-related)

```
/
├── docker-compose.yml           # PostgreSQL container config
├── .env.local                   # Environment variables
├── auth.ts                      # Auth.js full configuration
├── auth.config.ts               # Auth.js edge-compatible config
├── middleware.ts                # Route protection
├── prisma/
│   ├── schema.prisma            # Database schema
│   ├── migrations/              # Database migrations
│   ├── seed.ts                  # Initial admin + plans seed
│   └── seed-clients.ts          # CSV client import script
├── prisma.config.ts             # Prisma configuration
├── data/
│   └── plans.ts                 # Plan definitions (used by seed + website)
├── lib/
│   ├── prisma.ts                # Prisma client singleton
│   ├── actions/
│   │   ├── auth.ts              # Login/logout server actions
│   │   ├── users.ts             # User CRUD server actions
│   │   ├── clients.ts           # Client CRUD server actions
│   │   └── plans.ts             # Plan CRUD server actions
│   └── validations/
│       ├── user.ts              # User validation schemas
│       ├── client.ts            # Client validation schemas
│       └── plan.ts              # Plan validation schemas
├── components/admin/
│   ├── sidebar.tsx              # Admin navigation sidebar
│   ├── header.tsx               # Top bar with user menu
│   ├── user-form.tsx            # Create/edit user form
│   ├── user-table.tsx           # Users data table
│   ├── client-form.tsx          # Create/edit client form
│   ├── client-table.tsx         # Clients data table
│   ├── client-filters.tsx       # Client search/filter controls
│   ├── plan-form.tsx            # Create/edit plan form
│   └── plan-table.tsx           # Plans data table
├── app/admin/
│   ├── (auth)/
│   │   ├── layout.tsx           # Auth layout (no auth required)
│   │   └── login/page.tsx       # Login page
│   └── (dashboard)/
│       ├── layout.tsx           # Dashboard layout (auth required)
│       ├── page.tsx             # Dashboard home
│       ├── users/
│       │   ├── page.tsx         # User listing
│       │   ├── new/page.tsx     # Create user
│       │   └── [id]/
│       │       ├── page.tsx     # View user
│       │       └── edit/page.tsx # Edit user
│       ├── clients/
│       │   ├── page.tsx         # Client listing with filters
│       │   ├── new/page.tsx     # Create client
│       │   └── [id]/
│       │       ├── page.tsx     # View client + subscriptions
│       │       └── edit/page.tsx # Edit client
│       └── plans/
│           ├── page.tsx         # Plan listing
│           ├── new/page.tsx     # Create plan
│           └── [id]/
│               ├── page.tsx     # View plan details
│               └── edit/page.tsx # Edit plan
├── app/api/auth/[...nextauth]/
│   └── route.ts                 # Auth API handlers
└── types/next-auth.d.ts         # TypeScript type extensions
```

---

## Database Schema

### Models

| Model        | Description                                      |
|--------------|--------------------------------------------------|
| User         | Admin users with roles and authentication        |
| Client       | Customer accounts with contact/location info     |
| Plan         | Internet plans with pricing and features         |
| Subscription | Links clients to plans with date ranges          |

### Enums

| Enum               | Values                                    |
|--------------------|-------------------------------------------|
| UserRole           | SUPER_ADMIN, ADMIN, OPERATOR              |
| UserStatus         | ACTIVE, INACTIVE, SUSPENDED               |
| ClientStatus       | ACTIVE, INACTIVE, LEAD, ARCHIVED          |
| SubscriptionStatus | ACTIVE, SUSPENDED, CANCELLED, EXPIRED     |

---

## Tech Stack

- **Next.js 16** - App Router with React Server Components
- **Auth.js v5** (NextAuth) - Authentication with credentials provider
- **Prisma 7** - ORM with PostgreSQL adapter
- **PostgreSQL 16** - Database (via Docker)
- **Zod** - Schema validation
- **bcryptjs** - Password hashing
- **shadcn/ui** - UI components
