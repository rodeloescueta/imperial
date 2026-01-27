import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient, UserRole, UserStatus } from "@prisma/client"
import pg from "pg"
import bcrypt from "bcryptjs"
import { residentialPlans } from "../data/plans"

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding database...")

  // Create initial super admin user
  const hashedPassword = await bcrypt.hash("Imperial@2024", 12)

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@imperial.ph" },
    update: {},
    create: {
      email: "admin@imperial.ph",
      name: "Super Admin",
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
    },
  })

  console.log("Created super admin user:", adminUser.email)
  console.log("Default password: Imperial@2024")
  console.log("Please change this password after first login!")

  // Seed residential plans
  console.log("\nSeeding plans...")
  for (const plan of residentialPlans) {
    const createdPlan = await prisma.plan.upsert({
      where: { tier: plan.tier },
      update: {
        name: plan.name,
        speed: parseInt(plan.speed),
        price: plan.price,
        features: plan.features,
      },
      create: {
        name: plan.name,
        tier: plan.tier,
        speed: parseInt(plan.speed),
        price: plan.price,
        type: "RESIDENTIAL",
        features: plan.features,
        isActive: true,
      },
    })
    console.log(`  - ${createdPlan.name} (${createdPlan.tier}): ₱${createdPlan.price} / ${createdPlan.speed} Mbps`)
  }

  // Add legacy/SME plans that exist in CSV but not in data/plans.ts
  const additionalPlans = [
    { name: "Old 800", tier: "OLD_800", speed: 35, price: 800, type: "RESIDENTIAL" },
    { name: "Old 1000", tier: "OLD_1000", speed: 50, price: 1000, type: "RESIDENTIAL" },
    { name: "SME 2999", tier: "SME_2999", speed: 100, price: 2999, type: "SME" },
    { name: "SME 3999", tier: "SME_3999", speed: 200, price: 3999, type: "SME" },
    { name: "DIA BGP TIM", tier: "DIA_BGP_TIM", speed: 1000, price: 10000, type: "CORPORATE" },
    { name: "DIA BGP VM2", tier: "DIA_BGP_VM2", speed: 1000, price: 10000, type: "CORPORATE" },
    { name: "Leased Line 5GB", tier: "LEASED_LINE_5GB", speed: 5000, price: 50000, type: "CORPORATE" },
    { name: "Imperial Bliz", tier: "IMPERIAL_BLIZ", speed: 50, price: 599, type: "RESIDENTIAL" },
  ]

  for (const plan of additionalPlans) {
    await prisma.plan.upsert({
      where: { tier: plan.tier },
      update: {},
      create: {
        name: plan.name,
        tier: plan.tier,
        speed: plan.speed,
        price: plan.price,
        type: plan.type,
        features: [],
        isActive: true,
      },
    })
  }
  console.log(`  + ${additionalPlans.length} additional plans (legacy/SME/corporate)`)

  const totalPlans = await prisma.plan.count()
  console.log(`\nTotal plans seeded: ${totalPlans}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    await pool.end()
    process.exit(1)
  })
