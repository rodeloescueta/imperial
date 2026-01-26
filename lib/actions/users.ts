"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { userCreateSchema, userUpdateSchema } from "@/lib/validations/user"
import bcrypt from "bcryptjs"
import { UserRole, UserStatus } from "@prisma/client"

// Permission checks
function canManageUsers(role: UserRole): boolean {
  return role === "SUPER_ADMIN" || role === "ADMIN"
}

function canDeleteUsers(role: UserRole): boolean {
  return role === "SUPER_ADMIN"
}

function canAssignRole(currentRole: UserRole, targetRole: UserRole): boolean {
  if (currentRole === "SUPER_ADMIN") return true
  if (currentRole === "ADMIN" && targetRole !== "SUPER_ADMIN") return true
  return false
}

// Get paginated users
export async function getUsers({
  page = 1,
  limit = 10,
  search = "",
  role,
  status,
}: {
  page?: number
  limit?: number
  search?: string
  role?: UserRole
  status?: UserStatus
} = {}) {
  const session = await auth()
  if (!session) {
    return { users: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } }
  }

  const skip = (page - 1) * limit

  const where = {
    AND: [
      search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {},
      role ? { role } : {},
      status ? { status } : {},
    ],
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        lastLoginAt: true,
      },
    }),
    prisma.user.count({ where }),
  ])

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

// Get single user
export async function getUser(id: string) {
  const session = await auth()
  if (!session) return null

  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
      createdBy: true,
    },
  })
}

// Create user
export async function createUser(formData: FormData) {
  const session = await auth()
  if (!session) {
    return { error: "Unauthorized" }
  }

  if (!canManageUsers(session.user.role)) {
    return { error: "You don't have permission to create users" }
  }

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  }

  const validated = userCreateSchema.safeParse(rawData)

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors
    return { error: "Validation failed", fieldErrors: errors }
  }

  const { name, email, password, role } = validated.data

  // Check if current user can assign this role
  if (!canAssignRole(session.user.role, role as UserRole)) {
    return { error: "You can't assign this role" }
  }

  // Check if email exists
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: "Email already exists", fieldErrors: { email: ["Email already exists"] } }
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role as UserRole,
      createdBy: session.user.id,
    },
  })

  revalidatePath("/admin/users")
  redirect("/admin/users")
}

// Update user
export async function updateUser(id: string, formData: FormData) {
  const session = await auth()
  if (!session) {
    return { error: "Unauthorized" }
  }

  if (!canManageUsers(session.user.role)) {
    return { error: "You don't have permission to edit users" }
  }

  const rawData = {
    name: formData.get("name") || undefined,
    email: formData.get("email") || undefined,
    role: formData.get("role") || undefined,
    status: formData.get("status") || undefined,
  }

  const validated = userUpdateSchema.safeParse(rawData)

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors
    return { error: "Validation failed", fieldErrors: errors }
  }

  const data = validated.data

  // Check if current user can assign this role
  if (data.role && !canAssignRole(session.user.role, data.role as UserRole)) {
    return { error: "You can't assign this role" }
  }

  // Check if email exists (if changing email)
  if (data.email) {
    const existing = await prisma.user.findFirst({
      where: { email: data.email, NOT: { id } },
    })
    if (existing) {
      return { error: "Email already exists", fieldErrors: { email: ["Email already exists"] } }
    }
  }

  await prisma.user.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.role && { role: data.role as UserRole }),
      ...(data.status && { status: data.status as UserStatus }),
    },
  })

  revalidatePath("/admin/users")
  revalidatePath(`/admin/users/${id}`)
  redirect("/admin/users")
}

// Delete user
export async function deleteUser(id: string) {
  const session = await auth()
  if (!session) {
    return { error: "Unauthorized" }
  }

  if (!canDeleteUsers(session.user.role)) {
    return { error: "You don't have permission to delete users" }
  }

  // Prevent self-deletion
  if (session.user.id === id) {
    return { error: "You cannot delete your own account" }
  }

  // Check if this is the last super admin
  const user = await prisma.user.findUnique({ where: { id } })
  if (user?.role === "SUPER_ADMIN") {
    const superAdminCount = await prisma.user.count({
      where: { role: "SUPER_ADMIN" },
    })
    if (superAdminCount <= 1) {
      return { error: "Cannot delete the last super admin" }
    }
  }

  await prisma.user.delete({ where: { id } })

  revalidatePath("/admin/users")
  return { success: true }
}
