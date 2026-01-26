"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteUser } from "@/lib/actions/users"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  email: string
  role: "SUPER_ADMIN" | "ADMIN" | "OPERATOR"
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED"
  createdAt: Date
  lastLoginAt: Date | null
}

interface UserTableProps {
  users: User[]
  currentUserRole: string
  currentUserId: string
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

export function UserTable({ users, currentUserRole, currentUserId }: UserTableProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canDelete = currentUserRole === "SUPER_ADMIN"
  const canEdit = currentUserRole === "SUPER_ADMIN" || currentUserRole === "ADMIN"

  async function handleDelete() {
    if (!userToDelete) return

    setIsDeleting(true)
    setError(null)

    const result = await deleteUser(userToDelete.id)

    if (result.error) {
      setError(result.error)
      setIsDeleting(false)
    } else {
      setDeleteDialogOpen(false)
      setUserToDelete(null)
      setIsDeleting(false)
      router.refresh()
    }
  }

  function formatDate(date: Date | null) {
    if (!date) return "Never"
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-white dark:bg-gray-950">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 dark:bg-gray-900">
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                Email
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                Role
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                Last Login
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-600 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={cn("text-xs", roleColors[user.role])}>
                      {user.role.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={cn("text-xs", statusColors[user.status])}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {formatDate(user.lastLoginAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/users/${user.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        {canEdit && (
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${user.id}/edit`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {canDelete && user.id !== currentUserId && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => {
                                setUserToDelete(user)
                                setDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
