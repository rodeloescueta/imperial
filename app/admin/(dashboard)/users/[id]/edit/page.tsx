import { redirect, notFound } from "next/navigation"
import { auth } from "@/auth"
import { getUser, updateUser } from "@/lib/actions/users"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserForm } from "@/components/admin/user-form"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditUserPage({ params }: PageProps) {
  const { id } = await params
  const session = await auth()

  // Only SUPER_ADMIN and ADMIN can edit users
  if (session?.user.role !== "SUPER_ADMIN" && session?.user.role !== "ADMIN") {
    redirect("/admin/users")
  }

  const user = await getUser(id)

  if (!user) {
    notFound()
  }

  async function handleUpdate(formData: FormData) {
    "use server"
    return updateUser(id, formData)
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
          <CardDescription>
            Update user information and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm
            action={handleUpdate}
            user={user}
            currentUserRole={session.user.role}
            mode="edit"
          />
        </CardContent>
      </Card>
    </div>
  )
}
