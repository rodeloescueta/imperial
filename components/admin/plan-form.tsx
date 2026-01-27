"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface PlanFormProps {
  action: (formData: FormData) => Promise<{ error?: string; fieldErrors?: Record<string, string[]> } | void>
  plan?: {
    id: string
    name: string
    tier: string
    speed: number
    price: number | { toString: () => string }
    type: string
    features: string[]
    isActive: boolean
  }
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
        "Create Plan"
      ) : (
        "Save Changes"
      )}
    </Button>
  )
}

export function PlanForm({ action, plan, mode }: PlanFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [isActive, setIsActive] = useState(plan?.isActive ?? true)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setFieldErrors({})

    // Add isActive as string since checkbox doesn't submit unchecked values
    formData.set("isActive", isActive.toString())

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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Plan Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="e.g., Solo, Bronze, Silver"
            defaultValue={plan?.name}
            required
            aria-invalid={!!fieldErrors.name}
          />
          {fieldErrors.name && (
            <p className="text-xs text-destructive">{fieldErrors.name[0]}</p>
          )}
        </div>

        {/* Tier */}
        <div className="space-y-2">
          <Label htmlFor="tier">Tier Identifier</Label>
          <Input
            id="tier"
            name="tier"
            type="text"
            placeholder="e.g., SOLO, BRONZE, SILVER"
            defaultValue={plan?.tier}
            required
            aria-invalid={!!fieldErrors.tier}
          />
          {fieldErrors.tier ? (
            <p className="text-xs text-destructive">{fieldErrors.tier[0]}</p>
          ) : (
            <p className="text-xs text-gray-500">
              Unique identifier used for system matching (auto-uppercased)
            </p>
          )}
        </div>

        {/* Speed */}
        <div className="space-y-2">
          <Label htmlFor="speed">Speed (Mbps)</Label>
          <Input
            id="speed"
            name="speed"
            type="number"
            min={1}
            placeholder="e.g., 25, 50, 100"
            defaultValue={plan?.speed}
            required
            aria-invalid={!!fieldErrors.speed}
          />
          {fieldErrors.speed && (
            <p className="text-xs text-destructive">{fieldErrors.speed[0]}</p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price">Monthly Price (PHP)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            step="0.01"
            placeholder="e.g., 599, 799, 999"
            defaultValue={plan ? Number(plan.price) : undefined}
            required
            aria-invalid={!!fieldErrors.price}
          />
          {fieldErrors.price && (
            <p className="text-xs text-destructive">{fieldErrors.price[0]}</p>
          )}
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Plan Type</Label>
          <Select name="type" defaultValue={plan?.type || "RESIDENTIAL"}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RESIDENTIAL">Residential</SelectItem>
              <SelectItem value="SME">SME (Small Business)</SelectItem>
              <SelectItem value="CORPORATE">Corporate</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Determines which page the plan appears on
          </p>
        </div>

        {/* Active Status */}
        <div className="flex items-center space-x-2 pt-8">
          <Checkbox
            id="isActive"
            checked={isActive}
            onCheckedChange={(checked: boolean | "indeterminate") => setIsActive(checked === true)}
          />
          <Label htmlFor="isActive" className="cursor-pointer">
            Plan is active and available
          </Label>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <Label htmlFor="features">Features</Label>
        <Textarea
          id="features"
          name="features"
          placeholder="Enter features separated by commas&#10;e.g., Unlimited bandwidth, Free installation, 24/7 support"
          defaultValue={plan?.features.join(", ")}
          rows={3}
          aria-invalid={!!fieldErrors.features}
        />
        {fieldErrors.features ? (
          <p className="text-xs text-destructive">{fieldErrors.features[0]}</p>
        ) : (
          <p className="text-xs text-gray-500">
            Comma-separated list of plan features
          </p>
        )}
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
