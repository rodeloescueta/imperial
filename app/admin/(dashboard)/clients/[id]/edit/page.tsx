import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ClientForm } from "@/components/admin/client-form"
import { getClient, updateClient } from "@/lib/actions/clients"
import { getActivePlans } from "@/lib/actions/plans"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditClientPage({ params }: PageProps) {
  const { id } = await params
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  // Only admins and super admins can edit clients
  if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN") {
    redirect("/admin/clients")
  }

  const [client, plans] = await Promise.all([getClient(id), getActivePlans()])

  if (!client) {
    notFound()
  }

  // Create bound action with client id
  async function handleUpdate(formData: FormData) {
    "use server"
    return updateClient(id, formData)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/clients/${id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Edit Client
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Update {client.name}&apos;s information
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
          <CardDescription>
            Make changes to the client&apos;s account details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientForm action={handleUpdate} client={client} plans={plans} mode="edit" />
        </CardContent>
      </Card>
    </div>
  )
}
