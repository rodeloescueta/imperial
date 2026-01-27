import Link from "next/link"
import { Plus } from "lucide-react"
import { auth } from "@/auth"
import { getPlans } from "@/lib/actions/plans"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlanTable } from "@/components/admin/plan-table"

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string; type?: string }>
}

export default async function PlansPage({ searchParams }: PageProps) {
  const params = await searchParams
  const session = await auth()
  const page = Number(params.page) || 1
  const search = params.search || ""
  const type = params.type || ""

  const { plans, total, pages } = await getPlans({ page, search, type })

  const canCreate =
    session?.user.role === "SUPER_ADMIN" || session?.user.role === "ADMIN"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Plans
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage internet plans and pricing
          </p>
        </div>
        {canCreate && (
          <Button asChild>
            <Link href="/admin/plans/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Plan
            </Link>
          </Button>
        )}
      </div>

      {/* Plans table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Plans ({total})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <PlanTable
            plans={plans}
            currentUserRole={session?.user.role || "OPERATOR"}
          />
        </CardContent>
      </Card>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of{" "}
            {total} plans
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Button variant="outline" asChild>
                <Link href={`/admin/plans?page=${page - 1}`}>Previous</Link>
              </Button>
            )}
            {page < pages && (
              <Button variant="outline" asChild>
                <Link href={`/admin/plans?page=${page + 1}`}>Next</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
