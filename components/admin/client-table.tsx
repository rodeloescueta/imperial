"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Pencil, Trash2, Eye, Archive, Zap } from "lucide-react"
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
import { archiveClient, deleteClient } from "@/lib/actions/clients"
import { cn } from "@/lib/utils"

interface Subscription {
  id: string
  status: string
  plan: {
    id: string
    name: string
    tier: string
    speed: number
  }
}

interface Client {
  id: string
  name: string
  email: string | null
  phone: string | null
  city: string | null
  status: "ACTIVE" | "INACTIVE" | "LEAD" | "ARCHIVED"
  balance: number | { toString: () => string }
  createdAt: Date
  subscriptions: Subscription[]
}

interface ClientTableProps {
  clients: Client[]
  currentUserRole: string
}

const statusColors = {
  ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  INACTIVE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  LEAD: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  ARCHIVED: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
}

export function ClientTable({ clients, currentUserRole }: ClientTableProps) {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"archive" | "delete">("archive")
  const [clientToAction, setClientToAction] = useState<Client | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canDelete = currentUserRole === "SUPER_ADMIN"
  const canEdit = currentUserRole === "SUPER_ADMIN" || currentUserRole === "ADMIN"

  async function handleAction() {
    if (!clientToAction) return

    setIsProcessing(true)
    setError(null)

    const result =
      dialogType === "delete"
        ? await deleteClient(clientToAction.id)
        : await archiveClient(clientToAction.id)

    if (result.error) {
      setError(result.error)
      setIsProcessing(false)
    } else {
      setDialogOpen(false)
      setClientToAction(null)
      setIsProcessing(false)
      router.refresh()
    }
  }

  function formatBalance(balance: number | { toString: () => string }) {
    const num = Number(balance)
    if (num === 0) return "₱0"
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(num)
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-white dark:bg-gray-950">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 dark:bg-gray-900">
                <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                  Client
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                  Contact
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                  Plan
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">
                  Balance
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-600 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No clients found
                  </td>
                </tr>
              ) : (
                clients.map((client) => {
                  const activePlan = client.subscriptions[0]?.plan

                  return (
                    <tr
                      key={client.id}
                      className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30">
                            <span className="text-sm font-medium text-sky-600 dark:text-sky-400">
                              {client.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium">{client.name}</p>
                            {client.city && (
                              <p className="truncate text-xs text-gray-500">{client.city}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          {client.email && (
                            <p className="truncate text-gray-600 dark:text-gray-400">
                              {client.email}
                            </p>
                          )}
                          {client.phone && (
                            <p className="text-xs text-gray-500">{client.phone}</p>
                          )}
                          {!client.email && !client.phone && (
                            <p className="text-gray-400">—</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {activePlan ? (
                          <div className="flex items-center gap-1.5">
                            <Zap className="h-3.5 w-3.5 text-sky-500" />
                            <span className="font-medium">{activePlan.name}</span>
                            <span className="text-xs text-gray-500">
                              {activePlan.speed}Mbps
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">No plan</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={cn("text-xs", statusColors[client.status])}>
                          {client.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "font-medium",
                            Number(client.balance) < 0
                              ? "text-red-600 dark:text-red-400"
                              : Number(client.balance) > 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-gray-500"
                          )}
                        >
                          {formatBalance(client.balance)}
                        </span>
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
                              <Link href={`/admin/clients/${client.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            {canEdit && (
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/clients/${client.id}/edit`}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                            )}
                            {canEdit && client.status !== "ARCHIVED" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setClientToAction(client)
                                    setDialogType("archive")
                                    setDialogOpen(true)
                                  }}
                                >
                                  <Archive className="mr-2 h-4 w-4" />
                                  Archive
                                </DropdownMenuItem>
                              </>
                            )}
                            {canDelete && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => {
                                    setClientToAction(client)
                                    setDialogType("delete")
                                    setDialogOpen(true)
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
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action confirmation dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogType === "delete" ? "Delete Client" : "Archive Client"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogType === "delete" ? (
                <>
                  Are you sure you want to permanently delete{" "}
                  <strong>{clientToAction?.name}</strong>? This action cannot be undone.
                </>
              ) : (
                <>
                  Are you sure you want to archive{" "}
                  <strong>{clientToAction?.name}</strong>? They will no longer appear in
                  active client lists.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAction}
              disabled={isProcessing}
              className={
                dialogType === "delete"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }
            >
              {isProcessing
                ? dialogType === "delete"
                  ? "Deleting..."
                  : "Archiving..."
                : dialogType === "delete"
                  ? "Delete"
                  : "Archive"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
