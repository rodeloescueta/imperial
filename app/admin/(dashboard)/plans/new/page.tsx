import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PlanForm } from "@/components/admin/plan-form"
import { createPlan } from "@/lib/actions/plans"

export default async function NewPlanPage() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  // Only admins and super admins can create plans
  if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN") {
    redirect("/admin/plans")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/plans">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Create Plan
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add a new internet plan to the system
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Details</CardTitle>
          <CardDescription>
            Fill in the information for the new plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PlanForm action={createPlan} mode="create" />
        </CardContent>
      </Card>
    </div>
  )
}
