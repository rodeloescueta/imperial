"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

type DecimalLike = number | { toString: () => string }

interface Plan {
  id: string
  name: string
  tier: string
  speed: number
  price: DecimalLike
}

interface ClientFormProps {
  action: (formData: FormData) => Promise<{
    error?: string
    fieldErrors?: Record<string, string[]>
  } | void>
  client?: {
    id: string
    firstName: string
    lastName: string
    email: string | null
    phone: string | null
    address: string | null
    city: string | null
    zipCode: string | null
    latitude: DecimalLike | null
    longitude: DecimalLike | null
    companyName: string | null
    status: string
    isLead: boolean
    balance: DecimalLike
    pppoeUsername: string | null
    note: string | null
  }
  plans: Plan[]
  mode: "create" | "edit"
}

function SubmitButton({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {mode === "create" ? "Creating..." : "Saving..."}
        </>
      ) : mode === "create" ? (
        "Create Client"
      ) : (
        "Save Changes"
      )}
    </Button>
  )
}

export function ClientForm({ action, client, plans, mode }: ClientFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [isLead, setIsLead] = useState(client?.isLead ?? false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setFieldErrors({})

    formData.set("isLead", isLead.toString())

    const result = await action(formData)

    if (result?.error) {
      setError(result.error)
      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors)
      }
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Juan"
              defaultValue={client?.firstName}
              required
              aria-invalid={!!fieldErrors.firstName}
            />
            {fieldErrors.firstName && (
              <p className="text-xs text-destructive">{fieldErrors.firstName[0]}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Dela Cruz"
              defaultValue={client?.lastName}
              required
              aria-invalid={!!fieldErrors.lastName}
            />
            {fieldErrors.lastName && (
              <p className="text-xs text-destructive">{fieldErrors.lastName[0]}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="juan@example.com"
              defaultValue={client?.email || ""}
              aria-invalid={!!fieldErrors.email}
            />
            {fieldErrors.email && (
              <p className="text-xs text-destructive">{fieldErrors.email[0]}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+63 917 123 4567"
              defaultValue={client?.phone || ""}
              aria-invalid={!!fieldErrors.phone}
            />
            {fieldErrors.phone && (
              <p className="text-xs text-destructive">{fieldErrors.phone[0]}</p>
            )}
          </div>

          {/* Company Name */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="companyName">Company Name (Optional)</Label>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Company or business name"
              defaultValue={client?.companyName || ""}
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Address</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Address */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="123 Main Street, Barangay Name"
              defaultValue={client?.address || ""}
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">City / Municipality</Label>
            <Input
              id="city"
              name="city"
              type="text"
              placeholder="Imus"
              defaultValue={client?.city || ""}
            />
          </div>

          {/* Zip Code */}
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              type="text"
              placeholder="4103"
              defaultValue={client?.zipCode || ""}
            />
          </div>

          {/* Latitude */}
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              placeholder="14.4296"
              defaultValue={client?.latitude ? Number(client.latitude) : ""}
            />
          </div>

          {/* Longitude */}
          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              placeholder="120.9387"
              defaultValue={client?.longitude ? Number(client.longitude) : ""}
            />
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Account Details</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {/* PPPoE Username */}
          <div className="space-y-2">
            <Label htmlFor="pppoeUsername">PPPoE Username</Label>
            <Input
              id="pppoeUsername"
              name="pppoeUsername"
              type="text"
              placeholder="unique_pppoe_id"
              defaultValue={client?.pppoeUsername || ""}
              aria-invalid={!!fieldErrors.pppoeUsername}
            />
            {fieldErrors.pppoeUsername ? (
              <p className="text-xs text-destructive">{fieldErrors.pppoeUsername[0]}</p>
            ) : (
              <p className="text-xs text-gray-500">Unique identifier for network access</p>
            )}
          </div>

          {/* Balance */}
          <div className="space-y-2">
            <Label htmlFor="balance">Balance (PHP)</Label>
            <Input
              id="balance"
              name="balance"
              type="number"
              step="0.01"
              placeholder="0.00"
              defaultValue={client ? Number(client.balance) : 0}
            />
            <p className="text-xs text-gray-500">
              Positive = credit, Negative = outstanding balance
            </p>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={client?.status || "ACTIVE"}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="LEAD">Lead (Potential Customer)</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Plan (only for create mode) */}
          {mode === "create" && (
            <div className="space-y-2">
              <Label htmlFor="planId">Initial Plan</Label>
              <Select name="planId" defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No plan</SelectItem>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name} - {plan.speed}Mbps (₱{Number(plan.price).toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Creates an active subscription for this client
              </p>
            </div>
          )}

          {/* Is Lead */}
          <div className="flex items-center space-x-2 pt-6">
            <Checkbox
              id="isLead"
              checked={isLead}
              onCheckedChange={(checked: boolean | "indeterminate") => setIsLead(checked === true)}
            />
            <Label htmlFor="isLead" className="cursor-pointer">
              Mark as lead (potential customer)
            </Label>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="note">Notes</Label>
        <Textarea
          id="note"
          name="note"
          placeholder="Add any additional notes about this client..."
          defaultValue={client?.note || ""}
          rows={3}
        />
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <SubmitButton mode={mode} />
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
