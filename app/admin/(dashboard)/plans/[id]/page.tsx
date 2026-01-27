import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Pencil, Zap, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPlan } from "@/lib/actions/plans"
import { cn } from "@/lib/utils"

interface PageProps {
  params: Promise<{ id: string }>
}

const typeColors: Record<string, string> = {
  RESIDENTIAL: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  SME: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  CORPORATE: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
}

export default async function PlanDetailPage({ params }: PageProps) {
  const { id } = await params
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  const plan = await getPlan(id)

  if (!plan) {
    notFound()
  }

  const canEdit =
    session.user.role === "SUPER_ADMIN" || session.user.role === "ADMIN"

  function formatPrice(price: number | { toString: () => string }) {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(Number(price))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/plans">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {plan.name}
              </h1>
              <Badge
                className={cn(
                  "text-xs",
                  plan.isActive
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                )}
              >
                {plan.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {plan.tier} - {plan.type}
            </p>
          </div>
        </div>
        {canEdit && (
          <Button asChild>
            <Link href={`/admin/plans/${plan.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Plan
            </Link>
          </Button>
        )}
      </div>

      {/* Plan Info Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-sky-100 p-3 dark:bg-sky-900/30">
              <Zap className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Speed</p>
              <p className="text-2xl font-semibold">{plan.speed} Mbps</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
              <span className="text-xl font-bold text-green-600 dark:text-green-400">₱</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Price</p>
              <p className="text-2xl font-semibold">{formatPrice(plan.price)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Subscribers</p>
              <p className="text-2xl font-semibold">
                {plan._count.subscriptions.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Plan Name
              </p>
              <p className="mt-1">{plan.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Tier Identifier
              </p>
              <p className="mt-1 font-mono text-sm">{plan.tier}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Plan Type
              </p>
              <div className="mt-1">
                <Badge className={cn("text-xs", typeColors[plan.type])}>
                  {plan.type}
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </p>
              <p className="mt-1">
                {plan.isActive ? "Active - Available for subscription" : "Inactive - Not available"}
              </p>
            </div>
          </div>

          {/* Features */}
          {plan.features.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Features
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timestamps */}
          <div className="border-t pt-4">
            <div className="grid gap-4 md:grid-cols-2 text-sm text-gray-500 dark:text-gray-400">
              <div>
                Created: {new Date(plan.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div>
                Last updated: {new Date(plan.updatedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
