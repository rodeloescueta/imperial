"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Pencil, Trash2, Eye, Zap } from "lucide-react"
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
import { deletePlan } from "@/lib/actions/plans"
import { cn } from "@/lib/utils"

interface Plan {
  id: string
  name: string
  tier: string
  speed: number
  price: number | { toString: () => string }
  type: string
  isActive: boolean
  createdAt: Date
  _count: {
    subscriptions: number
  }
}

interface PlanTableProps {
  plans: Plan[]
  currentUserRole: string
}

const typeColors: Record<string, string> = {
  RESIDENTIAL: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  SME: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  CORPORATE: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
}

export function PlanTable({ plans, currentUserRole }: PlanTableProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [planToDelete, setPlanToDelete] = useState<Plan | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canDelete = currentUserRole === "SUPER_ADMIN"
  const canEdit = currentUserRole === "SUPER_ADMIN" || currentUserRole === "ADMIN"

  async function handleDelete() {
    if (!planToDelete) return

    setIsDeleting(true)
    setError(null)

    const result = await deletePlan(planToDelete.id)

    if (result.error) {
      setError(result.error)
      setIsDeleting(false)
    } else {
      setDeleteDialogOpen(false)
      setPlanToDelete(null)
      setIsDeleting(false)
      router.refresh()
    }
  }

  function formatPrice(price: number | { toString: () => string }) {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(Number(price))
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-white dark:bg-gray-950">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 dark:bg-gray-900">
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                Plan
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                Speed
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                Price
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                Type
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                Subscribers
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-600 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {plans.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No plans found
                </td>
              </tr>
            ) : (
              plans.map((plan) => (
                <tr
                  key={plan.id}
                  className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{plan.name}</span>
                      <span className="text-xs text-gray-500">{plan.tier}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Zap className="h-3.5 w-3.5 text-sky-500" />
                      {plan.speed} Mbps
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {formatPrice(plan.price)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={cn("text-xs", typeColors[plan.type] || typeColors.RESIDENTIAL)}>
                      {plan.type}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
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
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {plan._count.subscriptions.toLocaleString()}
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
                          <Link href={`/admin/plans/${plan.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        {canEdit && (
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/plans/${plan.id}/edit`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {canDelete && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => {
                                setPlanToDelete(plan)
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
            <AlertDialogTitle>Delete Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the &quot;{planToDelete?.name}&quot; plan?
              {planToDelete && planToDelete._count.subscriptions > 0 && (
                <span className="mt-2 block text-destructive">
                  Warning: This plan has {planToDelete._count.subscriptions} active subscribers.
                </span>
              )}
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
