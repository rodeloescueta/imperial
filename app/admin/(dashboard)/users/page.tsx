import Link from "next/link"
import { Plus } from "lucide-react"
import { auth } from "@/auth"
import { getUsers } from "@/lib/actions/users"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserTable } from "@/components/admin/user-table"

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string }>
}

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams
  const session = await auth()
  const page = Number(params.page) || 1
  const search = params.search || ""

  const { users, pagination } = await getUsers({ page, search })

  const canCreate =
    session?.user.role === "SUPER_ADMIN" || session?.user.role === "ADMIN"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Users
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage admin users and their permissions
          </p>
        </div>
        {canCreate && (
          <Button asChild>
            <Link href="/admin/users/new">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Link>
          </Button>
        )}
      </div>

      {/* Users table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            All Users ({pagination.total})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <UserTable
            users={users}
            currentUserRole={session?.user.role || "OPERATOR"}
            currentUserId={session?.user.id || ""}
          />
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} users
          </p>
          <div className="flex gap-2">
            {pagination.page > 1 && (
              <Button variant="outline" asChild>
                <Link href={`/admin/users?page=${pagination.page - 1}`}>
                  Previous
                </Link>
              </Button>
            )}
            {pagination.page < pagination.totalPages && (
              <Button variant="outline" asChild>
                <Link href={`/admin/users?page=${pagination.page + 1}`}>
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
