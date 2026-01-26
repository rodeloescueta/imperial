import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient, UserRole, UserStatus } from "@prisma/client"
import pg from "pg"
import bcrypt from "bcryptjs"

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
