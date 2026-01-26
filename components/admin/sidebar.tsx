"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Wifi, LayoutDashboard, Users, MapPin, Building2, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  user: {
    name?: string | null
    email?: string | null
    role?: string
  }
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  // Future routes (disabled for now)
  { name: "Clients", href: "/admin/clients", icon: User, disabled: true },
  { name: "Coverage", href: "/admin/coverage", icon: MapPin, disabled: true },
  { name: "Branches", href: "/admin/branches", icon: Building2, disabled: true },
]

export function AdminSidebar({ user }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r bg-white dark:bg-gray-950 lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Wifi className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold">Imperial Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
                item.disabled && "cursor-not-allowed opacity-50"
              )}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
              {item.disabled && (
                <span className="ml-auto text-xs text-gray-400">Soon</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User info */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-gray-500">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
