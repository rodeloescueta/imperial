import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Pencil,
  Mail,
  Phone,
  MapPin,
  Zap,
  Calendar,
  CreditCard,
  User,
  Building,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getClient } from "@/lib/actions/clients"
import { cn } from "@/lib/utils"

type DecimalLike = number | { toString: () => string }

interface PageProps {
  params: Promise<{ id: string }>
}

const statusColors = {
  ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  INACTIVE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  LEAD: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  ARCHIVED: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
}

const subscriptionStatusColors = {
  ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  SUSPENDED: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  EXPIRED: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
}

export default async function ClientDetailPage({ params }: PageProps) {
  const { id } = await params
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  const client = await getClient(id)

  if (!client) {
    notFound()
  }

  const canEdit =
    session.user.role === "SUPER_ADMIN" || session.user.role === "ADMIN"

  function formatPrice(price: number | DecimalLike) {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(Number(price))
  }

  function formatDate(date: Date | null) {
    if (!date) return "—"
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const activeSubscription = client.subscriptions.find((s) => s.status === "ACTIVE")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/clients">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {client.name}
              </h1>
              <Badge
                className={cn(
                  "text-xs",
                  statusColors[client.status as keyof typeof statusColors]
                )}
              >
                {client.status}
              </Badge>
              {client.isLead && (
                <Badge variant="outline" className="text-xs">
                  Lead
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {client.city || "No location"} • Created {formatDate(client.createdAt)}
            </p>
          </div>
        </div>
        {canEdit && (
          <Button asChild>
            <Link href={`/admin/clients/${client.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Client
            </Link>
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-sky-100 p-3 dark:bg-sky-900/30">
              <Zap className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Plan</p>
              <p className="text-xl font-semibold">
                {activeSubscription?.plan.name || "No plan"}
              </p>
              {activeSubscription && (
                <p className="text-xs text-gray-500">
                  {activeSubscription.plan.speed} Mbps
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div
              className={cn(
                "rounded-lg p-3",
                Number(client.balance) < 0
                  ? "bg-red-100 dark:bg-red-900/30"
                  : Number(client.balance) > 0
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-gray-100 dark:bg-gray-800"
              )}
            >
              <CreditCard
                className={cn(
                  "h-6 w-6",
                  Number(client.balance) < 0
                    ? "text-red-600 dark:text-red-400"
                    : Number(client.balance) > 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-600 dark:text-gray-400"
                )}
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
              <p
                className={cn(
                  "text-xl font-semibold",
                  Number(client.balance) < 0
                    ? "text-red-600 dark:text-red-400"
                    : Number(client.balance) > 0
                      ? "text-green-600 dark:text-green-400"
                      : ""
                )}
              >
                {formatPrice(client.balance)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Registered</p>
              <p className="text-xl font-semibold">
                {client.registeredAt
                  ? formatDate(client.registeredAt)
                  : formatDate(client.createdAt)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  First Name
                </p>
                <p className="mt-1">{client.firstName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Last Name
                </p>
                <p className="mt-1">{client.lastName}</p>
              </div>
            </div>

            {client.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <a
                  href={`mailto:${client.email}`}
                  className="text-sky-600 hover:underline dark:text-sky-400"
                >
                  {client.email}
                </a>
              </div>
            )}

            {client.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <a
                  href={`tel:${client.phone}`}
                  className="text-sky-600 hover:underline dark:text-sky-400"
                >
                  {client.phone}
                </a>
              </div>
            )}

            {client.companyName && (
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-400" />
                <span>{client.companyName}</span>
              </div>
            )}

            {(client.address || client.city) && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                <div>
                  {client.address && <p>{client.address}</p>}
                  <p className="text-gray-500">
                    {[client.city, client.zipCode].filter(Boolean).join(" ")}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  PPPoE Username
                </p>
                <p className="mt-1 font-mono text-sm">
                  {client.pppoeUsername || "—"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  External ID
                </p>
                <p className="mt-1 font-mono text-sm">
                  {client.externalId || "—"}
                </p>
              </div>
            </div>

            {client.latitude && client.longitude && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Coordinates
                </p>
                <p className="mt-1 font-mono text-sm">
                  {Number(client.latitude).toFixed(6)},{" "}
                  {Number(client.longitude).toFixed(6)}
                </p>
              </div>
            )}

            {client.note && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Notes
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm">{client.note}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Subscription History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {client.subscriptions.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No subscriptions found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-400">
                      Plan
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-400">
                      Price
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-400">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-400">
                      Active From
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-400">
                      Active To
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {client.subscriptions.map((subscription) => (
                    <tr
                      key={subscription.id}
                      className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-sky-500" />
                          <span className="font-medium">{subscription.plan.name}</span>
                          <span className="text-xs text-gray-500">
                            {subscription.plan.speed}Mbps
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {subscription.individualPrice
                          ? formatPrice(subscription.individualPrice)
                          : formatPrice(subscription.plan.price)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={cn(
                            "text-xs",
                            subscriptionStatusColors[
                              subscription.status as keyof typeof subscriptionStatusColors
                            ]
                          )}
                        >
                          {subscription.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        {formatDate(subscription.activeFrom)}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        {formatDate(subscription.activeTo)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
