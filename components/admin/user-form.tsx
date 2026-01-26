"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface UserFormProps {
  action: (formData: FormData) => Promise<{ error?: string; fieldErrors?: Record<string, string[]> } | void>
  user?: {
    id: string
    name: string
    email: string
    role: string
    status: string
  }
  currentUserRole: string
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
        "Create User"
      ) : (
        "Save Changes"
      )}
    </Button>
  )
}

export function UserForm({ action, user, currentUserRole, mode }: UserFormProps) {
  const canAssignSuperAdmin = currentUserRole === "SUPER_ADMIN"
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  async function handleSubmit(formData: FormData) {
    setError(null)
    setFieldErrors({})

    const result = await action(formData)

    if (result?.error) {
      setError(result.error)
      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors)
      }
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter full name"
          defaultValue={user?.name}
          required={mode === "create"}
          aria-invalid={!!fieldErrors.name}
        />
        {fieldErrors.name && (
          <p className="text-xs text-destructive">{fieldErrors.name[0]}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="user@imperial.ph"
          defaultValue={user?.email}
          required={mode === "create"}
          aria-invalid={!!fieldErrors.email}
        />
        {fieldErrors.email && (
          <p className="text-xs text-destructive">{fieldErrors.email[0]}</p>
        )}
      </div>

      {/* Password (only for create) */}
      {mode === "create" && (
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Min 8 characters with uppercase, lowercase, and number"
            required
            aria-invalid={!!fieldErrors.password}
          />
          {fieldErrors.password ? (
            <p className="text-xs text-destructive">{fieldErrors.password[0]}</p>
          ) : (
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters and contain uppercase, lowercase, and a number.
            </p>
          )}
        </div>
      )}

      {/* Role */}
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select name="role" defaultValue={user?.role || "OPERATOR"}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {canAssignSuperAdmin && (
              <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
            )}
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="OPERATOR">Operator</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">
          Super Admin: Full access | Admin: Can manage users | Operator: View only
        </p>
      </div>

      {/* Status (only for edit) */}
      {mode === "edit" && (
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={user?.status || "ACTIVE"}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

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
