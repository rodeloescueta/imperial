import Link from "next/link"
import { Plus } from "lucide-react"
import { auth } from "@/auth"
import { getClients, getClientCities } from "@/lib/actions/clients"
import { getActivePlans } from "@/lib/actions/plans"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientTable } from "@/components/admin/client-table"
import { ClientFilters } from "@/components/admin/client-filters"

interface PageProps {
  searchParams: Promise<{
    page?: string
    search?: string
    status?: string
    city?: string
    planId?: string
  }>
}

export default async function ClientsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const session = await auth()
  const page = Number(params.page) || 1
  const search = params.search || ""
  const status = params.status || ""
  const city = params.city || ""
  const planId = params.planId || ""

  const [clientsData, cities, plans] = await Promise.all([
    getClients({ page, search, status, city, planId }),
    getClientCities(),
    getActivePlans(),
  ])

  const { clients, total, pages } = clientsData

  const canCreate =
    session?.user.role === "SUPER_ADMIN" || session?.user.role === "ADMIN"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Clients
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage customer accounts and subscriptions
          </p>
        </div>
        {canCreate && (
          <Button asChild>
            <Link href="/admin/clients/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Link>
          </Button>
        )}
      </div>

      {/* Filters */}
      <ClientFilters
        cities={cities}
        plans={plans}
        currentFilters={{ search, status, city, planId }}
      />

      {/* Clients table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Clients ({total.toLocaleString()})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ClientTable
            clients={clients}
            currentUserRole={session?.user.role || "OPERATOR"}
          />
        </CardContent>
      </Card>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {((page - 1) * 10 + 1).toLocaleString()} to{" "}
            {Math.min(page * 10, total).toLocaleString()} of {total.toLocaleString()} clients
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Button variant="outline" asChild>
                <Link
                  href={`/admin/clients?page=${page - 1}${search ? `&search=${search}` : ""}${status ? `&status=${status}` : ""}${city ? `&city=${city}` : ""}${planId ? `&planId=${planId}` : ""}`}
                >
                  Previous
                </Link>
              </Button>
            )}
            {page < pages && (
              <Button variant="outline" asChild>
                <Link
                  href={`/admin/clients?page=${page + 1}${search ? `&search=${search}` : ""}${status ? `&status=${status}` : ""}${city ? `&city=${city}` : ""}${planId ? `&planId=${planId}` : ""}`}
                >
                  Next
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
