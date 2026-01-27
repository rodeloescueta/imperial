import { z } from "zod"

export const planCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tier: z.string().min(1, "Tier identifier is required").toUpperCase(),
  speed: z.coerce.number().min(1, "Speed must be at least 1 Mbps"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  type: z.enum(["RESIDENTIAL", "SME", "CORPORATE"]).default("RESIDENTIAL"),
  features: z.string().optional(), // Comma-separated features
  isActive: z.coerce.boolean().default(true),
})

export const planUpdateSchema = planCreateSchema.partial()

export type PlanCreateInput = z.infer<typeof planCreateSchema>
export type PlanUpdateInput = z.infer<typeof planUpdateSchema>
