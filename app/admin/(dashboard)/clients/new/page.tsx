import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ClientForm } from "@/components/admin/client-form"
import { createClient } from "@/lib/actions/clients"
import { getActivePlans } from "@/lib/actions/plans"

export default async function NewClientPage() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  // Only admins and super admins can create clients
  if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN") {
    redirect("/admin/clients")
  }

  const plans = await getActivePlans()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Add Client
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create a new customer account
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
          <CardDescription>
            Fill in the customer details. Required fields are marked with *.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientForm action={createClient} plans={plans} mode="create" />
        </CardContent>
      </Card>
    </div>
  )
}
