"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { UserRole } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { planCreateSchema, planUpdateSchema } from "@/lib/validations/plan"

// Helper to serialize Prisma objects (converts Decimal to number)
function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data, (_, value) =>
    typeof value === "object" && value !== null && "toNumber" in value
      ? value.toNumber()
      : value
  ))
}

// Permission helpers
function canManagePlans(role: UserRole): boolean {
  return role === "SUPER_ADMIN" || role === "ADMIN"
}

// Get paginated plans
export async function getPlans({
  page = 1,
  limit = 10,
  search = "",
  type = "",
}: {
  page?: number
  limit?: number
  search?: string
  type?: string
} = {}) {
  const session = await auth()
  if (!session) return { plans: [], total: 0, pages: 0 }

  const where = {
    AND: [
      search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { tier: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {},
      type ? { type } : {},
    ],
  }

  const [plans, total] = await Promise.all([
    prisma.plan.findMany({
      where,
      orderBy: { price: "asc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: { subscriptions: true },
        },
      },
    }),
    prisma.plan.count({ where }),
  ])

  return {
    plans: serialize(plans),
    total,
    pages: Math.ceil(total / limit),
  }
}

// Get single plan
export async function getPlan(id: string) {
  const session = await auth()
  if (!session) return null

  const plan = await prisma.plan.findUnique({
    where: { id },
    include: {
      _count: {
        select: { subscriptions: true },
      },
    },
  })

  return plan ? serialize(plan) : null
}

// Get all active plans (for dropdowns)
export async function getActivePlans() {
  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    orderBy: { price: "asc" },
    select: {
      id: true,
      name: true,
      tier: true,
      speed: true,
      price: true,
      type: true,
    },
  })

  return serialize(plans)
}

// Create plan
export async function createPlan(formData: FormData) {
  const session = await auth()
  if (!session) return { error: "Unauthorized" }
  if (!canManagePlans(session.user.role)) {
    return { error: "You don't have permission to manage plans" }
  }

  const rawData = {
    name: formData.get("name"),
    tier: formData.get("tier"),
    speed: formData.get("speed"),
    price: formData.get("price"),
    type: formData.get("type"),
    features: formData.get("features"),
    isActive: formData.get("isActive") === "true",
  }

  const validated = planCreateSchema.safeParse(rawData)
  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors
    return { error: "Validation failed", fieldErrors: errors }
  }

  // Check for duplicate tier
  const existing = await prisma.plan.findUnique({
    where: { tier: validated.data.tier },
  })
  if (existing) {
    return { error: "A plan with this tier identifier already exists" }
  }

  // Parse features from comma-separated string
  const features = validated.data.features
    ? validated.data.features.split(",").map((f) => f.trim()).filter(Boolean)
    : []

  await prisma.plan.create({
    data: {
      name: validated.data.name,
      tier: validated.data.tier,
      speed: validated.data.speed,
      price: validated.data.price,
      type: validated.data.type,
      features,
      isActive: validated.data.isActive,
    },
  })

  revalidatePath("/admin/plans")
  redirect("/admin/plans")
}

// Update plan
export async function updatePlan(id: string, formData: FormData) {
  const session = await auth()
  if (!session) return { error: "Unauthorized" }
  if (!canManagePlans(session.user.role)) {
    return { error: "You don't have permission to manage plans" }
  }

  const rawData = {
    name: formData.get("name"),
    tier: formData.get("tier"),
    speed: formData.get("speed"),
    price: formData.get("price"),
    type: formData.get("type"),
    features: formData.get("features"),
    isActive: formData.get("isActive") === "true",
  }

  const validated = planUpdateSchema.safeParse(rawData)
  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors
    return { error: "Validation failed", fieldErrors: errors }
  }

  // Check for duplicate tier (excluding current plan)
  if (validated.data.tier) {
    const existing = await prisma.plan.findFirst({
      where: {
        tier: validated.data.tier,
        id: { not: id },
      },
    })
    if (existing) {
      return { error: "A plan with this tier identifier already exists" }
    }
  }

  // Parse features
  const features = validated.data.features
    ? validated.data.features.split(",").map((f) => f.trim()).filter(Boolean)
    : undefined

  await prisma.plan.update({
    where: { id },
    data: {
      ...(validated.data.name && { name: validated.data.name }),
      ...(validated.data.tier && { tier: validated.data.tier }),
      ...(validated.data.speed && { speed: validated.data.speed }),
      ...(validated.data.price !== undefined && { price: validated.data.price }),
      ...(validated.data.type && { type: validated.data.type }),
      ...(features && { features }),
      ...(validated.data.isActive !== undefined && { isActive: validated.data.isActive }),
    },
  })

  revalidatePath("/admin/plans")
  revalidatePath(`/admin/plans/${id}`)
  redirect("/admin/plans")
}

// Delete plan
export async function deletePlan(id: string) {
  const session = await auth()
  if (!session) return { error: "Unauthorized" }
  if (session.user.role !== "SUPER_ADMIN") {
    return { error: "Only super admins can delete plans" }
  }

  // Check if plan has subscriptions
  const plan = await prisma.plan.findUnique({
    where: { id },
    include: { _count: { select: { subscriptions: true } } },
  })

  if (!plan) {
    return { error: "Plan not found" }
  }

  if (plan._count.subscriptions > 0) {
    return { error: `Cannot delete plan with ${plan._count.subscriptions} active subscriptions` }
  }

  await prisma.plan.delete({ where: { id } })

  revalidatePath("/admin/plans")
  return { success: true }
}
