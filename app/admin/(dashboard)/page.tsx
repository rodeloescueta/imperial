import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Shield, UserX } from "lucide-react"

async function getStats() {
  const [totalUsers, activeUsers, usersByRole] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { status: "ACTIVE" } }),
    prisma.user.groupBy({
      by: ["role"],
      _count: { role: true },
    }),
  ])

  const roleStats = {
    SUPER_ADMIN: 0,
    ADMIN: 0,
    OPERATOR: 0,
  }

  usersByRole.forEach((stat: { role: keyof typeof roleStats; _count: { role: number } }) => {
    roleStats[stat.role] = stat._count.role
  })

  return {
    totalUsers,
    activeUsers,
    roleStats,
  }
}

export default async function AdminDashboard() {
  const session = await auth()
  const stats = await getStats()

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Welcome back, {session?.user?.name}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Here&apos;s an overview of your admin dashboard
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-gray-500">Registered admin users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Active Users
            </CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-gray-500">Currently active accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Super Admins
            </CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.roleStats.SUPER_ADMIN}</div>
            <p className="text-xs text-gray-500">Full access accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Inactive Users
            </CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalUsers - stats.activeUsers}
            </div>
            <p className="text-xs text-gray-500">Inactive or suspended</p>
          </CardContent>
        </Card>
      </div>

      {/* Role breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Users by Role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-sm font-medium">Super Admin</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats.roleStats.SUPER_ADMIN}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium">Admin</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats.roleStats.ADMIN}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-500" />
                <span className="text-sm font-medium">Operator</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats.roleStats.OPERATOR}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
