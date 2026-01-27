"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useTransition } from "react"

interface Plan {
  id: string
  name: string
  tier: string
}

interface ClientFiltersProps {
  cities: string[]
  plans: Plan[]
  currentFilters: {
    search: string
    status: string
    city: string
    planId: string
  }
}

export function ClientFilters({ cities, plans, currentFilters }: ClientFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchValue, setSearchValue] = useState(currentFilters.search)

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // Reset to page 1 when filtering
    params.delete("page")

    startTransition(() => {
      router.push(`/admin/clients?${params.toString()}`)
    })
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    updateFilter("search", searchValue)
  }

  function clearFilters() {
    setSearchValue("")
    startTransition(() => {
      router.push("/admin/clients")
    })
  }

  const hasFilters =
    currentFilters.search ||
    currentFilters.status ||
    currentFilters.city ||
    currentFilters.planId

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-white p-4 dark:bg-gray-950 sm:flex-row sm:items-center">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex flex-1 gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name, email, phone, or PPPoE..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button type="submit" variant="secondary" disabled={isPending}>
          Search
        </Button>
      </form>

      {/* Status Filter */}
      <Select
        value={currentFilters.status || "all"}
        onValueChange={(value) => updateFilter("status", value === "all" ? "" : value)}
      >
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="INACTIVE">Inactive</SelectItem>
          <SelectItem value="LEAD">Lead</SelectItem>
          <SelectItem value="ARCHIVED">Archived</SelectItem>
        </SelectContent>
      </Select>

      {/* City Filter */}
      <Select
        value={currentFilters.city || "all"}
        onValueChange={(value) => updateFilter("city", value === "all" ? "" : value)}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="City" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cities</SelectItem>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Plan Filter */}
      <Select
        value={currentFilters.planId || "all"}
        onValueChange={(value) => updateFilter("planId", value === "all" ? "" : value)}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="Plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Plans</SelectItem>
          {plans.map((plan) => (
            <SelectItem key={plan.id} value={plan.id}>
              {plan.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearFilters}
          disabled={isPending}
          className="shrink-0"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear filters</span>
        </Button>
      )}
    </div>
  )
}
