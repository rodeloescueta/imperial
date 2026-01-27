import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient, ClientStatus, SubscriptionStatus } from "@prisma/client"
import pg from "pg"
import * as fs from "fs"
import * as path from "path"

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Plan name normalization map
const planMapping: Record<string, string> = {
  "01. SOLO PLAN": "SOLO",
  "02.  BRONZE 799": "BRONZE",
  "02. BRONZE 799": "BRONZE",
  "03. SILVER 999": "SILVER",
  "04. GOLD 1200": "GOLD",
  "05. PLATINUM 1400": "PLATINUM",
  "06. DIAMOND 1600": "DIAMOND",
  "07. RUBY 2000": "RUBY",
  "08. OLD 800": "OLD_800",
  "23. OLD 1000": "OLD_1000",
  "24. Imperial Bliz": "IMPERIAL_BLIZ",
  "IMPERIAL SME 2999": "SME_2999",
  "IMPERIAL SME 3999": "SME_3999",
  "DIA BGP TIM": "DIA_BGP_TIM",
  "DIA BGP VM2": "DIA_BGP_VM2",
  "LEASED LINE 5GB": "LEASED_LINE_5GB",
}

function normalizePlanName(planName: string): string | null {
  if (!planName) return null
  const trimmed = planName.trim()
  return planMapping[trimmed] || null
}

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.split("\n")
  const headers = lines[0].split(",").map((h) => h.trim())
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue

    // Handle CSV with quoted fields containing commas
    const values: string[] = []
    let current = ""
    let inQuotes = false

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === "," && !inQuotes) {
        values.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }
    values.push(current.trim())

    const row: Record<string, string> = {}
    headers.forEach((header, index) => {
      row[header] = values[index] || ""
    })
    rows.push(row)
  }

  return rows
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null
  try {
    const date = new Date(dateStr)
    return isNaN(date.getTime()) ? null : date
  } catch {
    return null
  }
}

function parseDecimal(value: string): number | null {
  if (!value) return null
  const cleaned = value.replace(/[₱,]/g, "").trim()
  const num = parseFloat(cleaned)
  return isNaN(num) ? null : num
}

function getClientStatus(row: Record<string, string>): ClientStatus {
  if (row["Archived"] === "1") return ClientStatus.ARCHIVED
  if (row["Is Lead"] === "1") return ClientStatus.LEAD
  return ClientStatus.ACTIVE
}

async function main() {
  console.log("Starting client import from CSV...")

  // Clear existing data for fresh import
  console.log("Clearing existing subscriptions and clients...")
  await prisma.subscription.deleteMany()
  await prisma.client.deleteMany()
  console.log("Cleared.")

  // Read CSV file
  const csvPath = "/home/rodelo-escueta/Downloads/405_export_2026-01-26_173135.csv"
  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found: ${csvPath}`)
    process.exit(1)
  }

  const content = fs.readFileSync(csvPath, "utf-8")
  const rows = parseCSV(content)
  console.log(`Parsed ${rows.length} rows from CSV`)

  // Get all plans for matching
  const plans = await prisma.plan.findMany()
  const plansByTier = new Map(plans.map((p) => [p.tier, p]))
  console.log(`Found ${plans.length} plans in database`)

  let clientsCreated = 0
  let clientsSkipped = 0
  let subscriptionsCreated = 0
  let unmatchedPlans = new Set<string>()

  // CSV structure: Client row (has Id) followed by Service row (no Id, has Service)
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]

    // If row has an Id, it's a client row
    if (row["Id"]) {
      const externalId = row["Id"]
      const firstName = row["First name"] || ""
      const lastName = row["Last name"] || ""
      const name = row["Name"] || `${firstName} ${lastName}`.trim()

      if (!name) {
        clientsSkipped++
        continue
      }

      // Check if client already exists
      const existing = await prisma.client.findUnique({
        where: { externalId },
      })

      if (existing) {
        clientsSkipped++
        continue
      }

      // Look ahead for service data in the next row
      const nextRow = rows[i + 1]
      const serviceRow = nextRow && !nextRow["Id"] && nextRow["Service"] ? nextRow : null

      try {
        const client = await prisma.client.create({
          data: {
            externalId,
            firstName: firstName || name.split(" ")[0] || "Unknown",
            lastName: lastName || name.split(" ").slice(1).join(" ") || "",
            name,
            email: row["Emails"] || null,
            phone: row["Phones"] || null,
            address: row["Address"] || null,
            city: row["City"] || null,
            zipCode: row["ZIP code"] || null,
            latitude: parseDecimal(row["Client latitude"]),
            longitude: parseDecimal(row["Client longitude"]),
            companyName: row["Company name"] || null,
            status: getClientStatus(row),
            isLead: row["Is Lead"] === "1",
            balance: parseDecimal(row["Balance"]) || 0,
            pppoeUsername: row["PPPOE Username (custom attribute)"] || null,
            note: row["Note"] || null,
            registeredAt: parseDate(row["Registration date"]),
          },
        })

        clientsCreated++

        // Create subscription from service row
        if (serviceRow) {
          const serviceName = serviceRow["Service"]
          const tier = normalizePlanName(serviceName)

          if (tier) {
            const plan = plansByTier.get(tier)
            if (plan) {
              await prisma.subscription.create({
                data: {
                  clientId: client.id,
                  planId: plan.id,
                  individualPrice: parseDecimal(serviceRow["Service individual price"]),
                  latitude: parseDecimal(serviceRow["Service latitude"]),
                  longitude: parseDecimal(serviceRow["Service longitude"]),
                  activeFrom: parseDate(serviceRow["Service active from (Y-m-d)"]),
                  activeTo: parseDate(serviceRow["Service active to (Y-m-d)"]),
                  status: SubscriptionStatus.ACTIVE,
                },
              })
              subscriptionsCreated++
            } else {
              unmatchedPlans.add(serviceName)
            }
          } else {
            unmatchedPlans.add(serviceName)
          }
        }

        if (clientsCreated % 500 === 0) {
          console.log(`  Progress: ${clientsCreated} clients created, ${subscriptionsCreated} subscriptions...`)
        }
      } catch (error: any) {
        if (error.code === "P2002") {
          // Unique constraint violation (e.g., duplicate pppoeUsername)
          clientsSkipped++
        } else {
          console.error(`Error creating client ${externalId}:`, error.message)
          clientsSkipped++
        }
      }
    }
  }

  if (unmatchedPlans.size > 0) {
    console.log(`\nUnmatched plan names:`)
    unmatchedPlans.forEach((p) => console.log(`  - ${p}`))
  }

  console.log("\n=== Import Complete ===")
  console.log(`Clients created: ${clientsCreated}`)
  console.log(`Clients skipped: ${clientsSkipped}`)
  console.log(`Subscriptions created: ${subscriptionsCreated}`)

  // Verify counts
  const totalClients = await prisma.client.count()
  const totalSubscriptions = await prisma.subscription.count()
  console.log(`\nDatabase totals:`)
  console.log(`  Clients: ${totalClients}`)
  console.log(`  Subscriptions: ${totalSubscriptions}`)
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
