import { z } from "zod"

export const clientCreateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  companyName: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "LEAD", "ARCHIVED"]).default("ACTIVE"),
  isLead: z.coerce.boolean().default(false),
  balance: z.coerce.number().default(0),
  pppoeUsername: z.string().optional(),
  note: z.string().optional(),
  // Subscription (optional, for creating with a plan)
  planId: z.string().optional(),
})

export const clientUpdateSchema = clientCreateSchema.partial()

export const subscriptionCreateSchema = z.object({
  planId: z.string().min(1, "Plan is required"),
  individualPrice: z.coerce.number().optional(),
  activeFrom: z.string().optional(),
  activeTo: z.string().optional(),
  status: z.enum(["ACTIVE", "SUSPENDED", "CANCELLED", "EXPIRED"]).default("ACTIVE"),
})

export type ClientCreateInput = z.infer<typeof clientCreateSchema>
export type ClientUpdateInput = z.infer<typeof clientUpdateSchema>
export type SubscriptionCreateInput = z.infer<typeof subscriptionCreateSchema>
