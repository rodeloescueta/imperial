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

# 4. Seed the database with initial admin user
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

Create the initial super admin user:

```bash
npx tsx prisma/seed.ts
```

Output:
```
Seeding database...
Created super admin user: admin@imperial.ph
Default password: Imperial@2024
Please change this password after first login!
```

### 5. Start Development Server

```bash
npm run dev
```

The server runs on port 3011 by default.

---

## Admin Routes

| Route                     | Description              | Access          |
|---------------------------|--------------------------|-----------------|
| `/admin/login`            | Login page               | Public          |
| `/admin`                  | Dashboard                | Authenticated   |
| `/admin/users`            | User listing             | Authenticated   |
| `/admin/users/new`        | Create new user          | ADMIN+          |
| `/admin/users/[id]`       | View user details        | Authenticated   |
| `/admin/users/[id]/edit`  | Edit user                | ADMIN+          |

## User Roles

| Role        | Permissions                                    |
|-------------|------------------------------------------------|
| SUPER_ADMIN | Full system access, can manage all users       |
| ADMIN       | Can manage users, clients, coverage            |
| OPERATOR    | View-only access with limited edit permissions |

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

If you see errors about missing Prisma client:

```bash
npx prisma generate
```

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
│   └── seed.ts                  # Initial admin seed script
├── prisma.config.ts             # Prisma configuration
├── lib/
│   ├── prisma.ts                # Prisma client singleton
│   ├── actions/
│   │   ├── auth.ts              # Login/logout server actions
│   │   └── users.ts             # User CRUD server actions
│   └── validations/
│       └── user.ts              # Zod validation schemas
├── components/admin/
│   ├── sidebar.tsx              # Admin navigation sidebar
│   ├── header.tsx               # Top bar with user menu
│   ├── user-form.tsx            # Create/edit user form
│   └── user-table.tsx           # Users data table
├── app/admin/
│   ├── (auth)/
│   │   ├── layout.tsx           # Auth layout (no auth required)
│   │   └── login/page.tsx       # Login page
│   └── (dashboard)/
│       ├── layout.tsx           # Dashboard layout (auth required)
│       ├── page.tsx             # Dashboard home
│       └── users/
│           ├── page.tsx         # User listing
│           ├── new/page.tsx     # Create user
│           └── [id]/
│               ├── page.tsx     # View user
│               └── edit/page.tsx # Edit user
├── app/api/auth/[...nextauth]/
│   └── route.ts                 # Auth API handlers
└── types/next-auth.d.ts         # TypeScript type extensions
```

---

## Tech Stack

- **Next.js 16** - App Router with React Server Components
- **Auth.js v5** (NextAuth) - Authentication with credentials provider
- **Prisma 7** - ORM with PostgreSQL adapter
- **PostgreSQL 16** - Database (via Docker)
- **Zod** - Schema validation
- **bcryptjs** - Password hashing
- **shadcn/ui** - UI components
