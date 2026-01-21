"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Essential", href: "/", hoverLabel: "Residential" },
  { label: "Prime", href: "/prime", hoverLabel: "Business" },
  { label: "Contact Us", href: "/contact" },
  { label: "Network", href: "/network", hoverLabel: "Maintenance" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-white"
      )}
    >
      <nav className="container-wide">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                Imperial
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                hoverLabel={item.hoverLabel}
                isActive={pathname === item.href}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button className="cta-pulse">Check Coverage</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-border"
          >
            <div className="container-wide py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block py-3 px-4 rounded-lg text-base font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                  {item.hoverLabel && (
                    <span className="text-muted-foreground text-sm ml-2">
                      ({item.hoverLabel})
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-4">
                <Button className="w-full cta-pulse">Check Coverage</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavItem({
  href,
  label,
  hoverLabel,
  isActive,
}: {
  href: string
  label: string
  hoverLabel?: string
  isActive: boolean
}) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <Link
      href={href}
      className={cn(
        "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group",
        isActive
          ? "text-primary"
          : "text-foreground hover:text-primary"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative overflow-hidden block h-5">
        {/* Default label */}
        <motion.span
          className="block"
          animate={{
            y: hoverLabel && isHovered ? -20 : 0,
            opacity: hoverLabel && isHovered ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {label}
        </motion.span>

        {/* Hover label */}
        {hoverLabel && (
          <motion.span
            className="absolute top-0 left-0 text-primary font-semibold"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            {hoverLabel}
          </motion.span>
        )}
      </span>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}

      {/* Hover background */}
      <motion.div
        className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isHovered && !isActive ? 1 : 0,
          scale: isHovered && !isActive ? 1 : 0.95,
        }}
        transition={{ duration: 0.15 }}
      />
    </Link>
  )
}
