import Link from "next/link"
import { notFound } from "next/navigation"
import { Pencil, ArrowLeft } from "lucide-react"
import { auth } from "@/auth"
import { getUser } from "@/lib/actions/users"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PageProps {
  params: Promise<{ id: string }>
}

const roleColors = {
  SUPER_ADMIN: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  ADMIN: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  OPERATOR: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
}

const statusColors = {
  ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  INACTIVE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  SUSPENDED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
}

export default async function ViewUserPage({ params }: PageProps) {
  const { id } = await params
  const session = await auth()
  const user = await getUser(id)

  if (!user) {
    notFound()
  }

  const canEdit =
    session?.user.role === "SUPER_ADMIN" || session?.user.role === "ADMIN"

  function formatDate(date: Date | null) {
    if (!date) return "Never"
    return new Date(date).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/users">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {user.name}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
        {canEdit && (
          <Button asChild>
            <Link href={`/admin/users/${id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit User
            </Link>
          </Button>
        )}
      </div>

      {/* User details */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Name</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Role</span>
              <Badge className={cn("text-xs", roleColors[user.role as keyof typeof roleColors])}>
                {user.role.replace("_", " ")}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <Badge className={cn("text-xs", statusColors[user.status as keyof typeof statusColors])}>
                {user.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Last Login</span>
              <span className="font-medium">{formatDate(user.lastLoginAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Created</span>
              <span className="font-medium">{formatDate(user.createdAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Last Updated</span>
              <span className="font-medium">{formatDate(user.updatedAt)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
