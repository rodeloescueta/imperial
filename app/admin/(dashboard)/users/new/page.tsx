import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { createUser } from "@/lib/actions/users"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserForm } from "@/components/admin/user-form"

export default async function NewUserPage() {
  const session = await auth()

  // Only SUPER_ADMIN and ADMIN can create users
  if (session?.user.role !== "SUPER_ADMIN" && session?.user.role !== "ADMIN") {
    redirect("/admin/users")
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create User</CardTitle>
          <CardDescription>
            Add a new admin user to the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm
            action={createUser}
            currentUserRole={session.user.role}
            mode="create"
          />
        </CardContent>
      </Card>
    </div>
  )
}
