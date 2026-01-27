"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { UserRole, ClientStatus, SubscriptionStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { clientCreateSchema, clientUpdateSchema, subscriptionCreateSchema } from "@/lib/validations/client"

// Helper to serialize Prisma objects (converts Decimal to number)
function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data, (_, value) =>
    typeof value === "object" && value !== null && "toNumber" in value
      ? value.toNumber()
      : value
  ))
}

// Permission helpers
function canManageClients(role: UserRole): boolean {
  return role === "SUPER_ADMIN" || role === "ADMIN"
}

function canDeleteClients(role: UserRole): boolean {
  return role === "SUPER_ADMIN"
}

// Get paginated clients
export async function getClients({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  city = "",
  planId = "",
}: {
  page?: number
  limit?: number
  search?: string
  status?: string
  city?: string
  planId?: string
} = {}) {
  const session = await auth()
  if (!session) return { clients: [], total: 0, pages: 0 }

  const where = {
    AND: [
      search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } },
              { phone: { contains: search, mode: "insensitive" as const } },
              { pppoeUsername: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {},
      status ? { status: status as ClientStatus } : {},
      city ? { city: { contains: city, mode: "insensitive" as const } } : {},
      planId
        ? {
            subscriptions: {
              some: {
                planId,
                status: SubscriptionStatus.ACTIVE,
              },
            },
          }
        : {},
    ],
  }

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        subscriptions: {
          where: { status: "ACTIVE" },
          include: { plan: true },
          take: 1,
        },
      },
    }),
    prisma.client.count({ where }),
  ])

  return {
    clients: serialize(clients),
    total,
    pages: Math.ceil(total / limit),
  }
}

// Get single client with subscriptions
export async function getClient(id: string) {
  const session = await auth()
  if (!session) return null

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      subscriptions: {
        include: { plan: true },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  return client ? serialize(client) : null
}

// Create client
export async function createClient(formData: FormData) {
  const session = await auth()
  if (!session) return { error: "Unauthorized" }
  if (!canManageClients(session.user.role)) {
    return { error: "You don't have permission to manage clients" }
  }

  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    zipCode: formData.get("zipCode"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    companyName: formData.get("companyName"),
    status: formData.get("status") || "ACTIVE",
    isLead: formData.get("isLead") === "true",
    balance: formData.get("balance"),
    pppoeUsername: formData.get("pppoeUsername"),
    note: formData.get("note"),
    planId: formData.get("planId"),
  }

  const validated = clientCreateSchema.safeParse(rawData)
  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors
    return { error: "Validation failed", fieldErrors: errors }
  }

  // Check for duplicate pppoeUsername
  if (validated.data.pppoeUsername) {
    const existing = await prisma.client.findUnique({
      where: { pppoeUsername: validated.data.pppoeUsername },
    })
    if (existing) {
      return { error: "A client with this PPPoE username already exists" }
    }
  }

  const name = `${validated.data.firstName} ${validated.data.lastName}`.trim()

  const client = await prisma.client.create({
    data: {
      firstName: validated.data.firstName,
      lastName: validated.data.lastName,
      name,
      email: validated.data.email || null,
      phone: validated.data.phone || null,
      address: validated.data.address || null,
      city: validated.data.city || null,
      zipCode: validated.data.zipCode || null,
      latitude: validated.data.latitude || null,
      longitude: validated.data.longitude || null,
      companyName: validated.data.companyName || null,
      status: validated.data.status as ClientStatus,
      isLead: validated.data.isLead,
      balance: validated.data.balance,
      pppoeUsername: validated.data.pppoeUsername || null,
      note: validated.data.note || null,
      createdBy: session.user.id,
    },
  })

  // Create subscription if planId provided
  if (validated.data.planId) {
    await prisma.subscription.create({
      data: {
        clientId: client.id,
        planId: validated.data.planId,
        status: SubscriptionStatus.ACTIVE,
        activeFrom: new Date(),
      },
    })
  }

  revalidatePath("/admin/clients")
  redirect("/admin/clients")
}

// Update client
export async function updateClient(id: string, formData: FormData) {
  const session = await auth()
  if (!session) return { error: "Unauthorized" }
  if (!canManageClients(session.user.role)) {
    return { error: "You don't have permission to manage clients" }
  }

  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    zipCode: formData.get("zipCode"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    companyName: formData.get("companyName"),
    status: formData.get("status"),
    isLead: formData.get("isLead") === "true",
    balance: formData.get("balance"),
    pppoeUsername: formData.get("pppoeUsername"),
    note: formData.get("note"),
  }

  const validated = clientUpdateSchema.safeParse(rawData)
  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors
    return { error: "Validation failed", fieldErrors: errors }
  }

  // Check for duplicate pppoeUsername (excluding current client)
  if (validated.data.pppoeUsername) {
    const existing = await prisma.client.findFirst({
      where: {
        pppoeUsername: validated.data.pppoeUsername,
        id: { not: id },
      },
    })
    if (existing) {
      return { error: "A client with this PPPoE username already exists" }
    }
  }

  const name =
    validated.data.firstName && validated.data.lastName
      ? `${validated.data.firstName} ${validated.data.lastName}`.trim()
      : undefined

  await prisma.client.update({
    where: { id },
    data: {
      ...(validated.data.firstName && { firstName: validated.data.firstName }),
      ...(validated.data.lastName && { lastName: validated.data.lastName }),
      ...(name && { name }),
      ...(validated.data.email !== undefined && { email: validated.data.email || null }),
      ...(validated.data.phone !== undefined && { phone: validated.data.phone || null }),
      ...(validated.data.address !== undefined && { address: validated.data.address || null }),
      ...(validated.data.city !== undefined && { city: validated.data.city || null }),
      ...(validated.data.zipCode !== undefined && { zipCode: validated.data.zipCode || null }),
      ...(validated.data.latitude !== undefined && { latitude: validated.data.latitude || null }),
      ...(validated.data.longitude !== undefined && { longitude: validated.data.longitude || null }),
      ...(validated.data.companyName !== undefined && { companyName: validated.data.companyName || null }),
      ...(validated.data.status && { status: validated.data.status as ClientStatus }),
      ...(validated.data.isLead !== undefined && { isLead: validated.data.isLead }),
      ...(validated.data.balance !== undefined && { balance: validated.data.balance }),
      ...(validated.data.pppoeUsername !== undefined && { pppoeUsername: validated.data.pppoeUsername || null }),
      ...(validated.data.note !== undefined && { note: validated.data.note || null }),
    },
  })

  revalidatePath("/admin/clients")
  revalidatePath(`/admin/clients/${id}`)
  redirect(`/admin/clients/${id}`)
}

// Archive client (soft delete)
export async function archiveClient(id: string) {
  const session = await auth()
  if (!session) return { error: "Unauthorized" }
  if (!canManageClients(session.user.role)) {
    return { error: "You don't have permission to manage clients" }
  }

  await prisma.client.update({
    where: { id },
    data: { status: ClientStatus.ARCHIVED },
  })

  revalidatePath("/admin/clients")
  revalidatePath(`/admin/clients/${id}`)
  return { success: true }
}

// Delete client (hard delete, super admin only)
export async function deleteClient(id: string) {
  const session = await auth()
  if (!session) return { error: "Unauthorized" }
  if (!canDeleteClients(session.user.role)) {
    return { error: "Only super admins can delete clients" }
  }

  await prisma.client.delete({ where: { id } })

  revalidatePath("/admin/clients")
  return { success: true }
}

// Add subscription to client
export async function createSubscription(clientId: string, formData: FormData) {
  const session = await auth()
  if (!session) return { error: "Unauthorized" }
  if (!canManageClients(session.user.role)) {
    return { error: "You don't have permission to manage subscriptions" }
  }

  const rawData = {
    planId: formData.get("planId"),
    individualPrice: formData.get("individualPrice"),
    activeFrom: formData.get("activeFrom"),
    activeTo: formData.get("activeTo"),
    status: formData.get("status") || "ACTIVE",
  }

  const validated = subscriptionCreateSchema.safeParse(rawData)
  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors
    return { error: "Validation failed", fieldErrors: errors }
  }

  // Cancel any existing active subscription
  await prisma.subscription.updateMany({
    where: {
      clientId,
      status: "ACTIVE",
    },
    data: {
      status: SubscriptionStatus.CANCELLED,
      activeTo: new Date(),
    },
  })

  await prisma.subscription.create({
    data: {
      clientId,
      planId: validated.data.planId,
      individualPrice: validated.data.individualPrice || null,
      activeFrom: validated.data.activeFrom ? new Date(validated.data.activeFrom) : new Date(),
      activeTo: validated.data.activeTo ? new Date(validated.data.activeTo) : null,
      status: validated.data.status as SubscriptionStatus,
    },
  })

  revalidatePath(`/admin/clients/${clientId}`)
  return { success: true }
}

// Get unique cities for filter dropdown
export async function getClientCities() {
  const cities = await prisma.client.findMany({
    where: {
      city: { not: null },
    },
    select: { city: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
  })

  return cities.map((c) => c.city).filter(Boolean) as string[]
}
