"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Wifi } from "lucide-react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Essential", href: "/", hoverLabel: "Residential" },
  { label: "Prime", href: "/prime", hoverLabel: "Business" },
  { label: "Contact Us", href: "/contact", hoverLabel: "Support" },
  { label: "Network", href: "/network", hoverLabel: "Maintenance" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0

    // Show navbar when at top
    if (latest < 50) {
      setHidden(false)
      setScrolled(false)
      return
    }

    setScrolled(true)

    // Hide on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: hidden ? -100 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/[0.03] border-b border-border/50"
          : "bg-white"
      )}
    >
      <nav className="container-wide">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden">
                {/* Animated wifi icon */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Wifi className="w-5 h-5 text-white" />
                </motion.div>
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Imperial
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <NavItem
                  href={item.href}
                  label={item.label}
                  hoverLabel={item.hoverLabel}
                  isActive={pathname === item.href}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="relative overflow-hidden group/btn">
                <span className="relative z-10">Check Coverage</span>
                {/* Shimmer effect */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 -mr-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <div className="container-wide py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium transition-all",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted hover:translate-x-1"
                    )}
                  >
                    <span>{item.label}</span>
                    {item.hoverLabel && (
                      <span className="text-muted-foreground text-sm">
                        {item.hoverLabel}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="pt-4"
              >
                <Button className="w-full">Check Coverage</Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
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

  // Determine the longer text to set min-width
  const displayText = hoverLabel && hoverLabel.length > label.length ? hoverLabel : label

  return (
    <Link
      href={href}
      className={cn(
        "relative px-5 py-2 text-sm font-medium transition-colors rounded-lg group",
        isActive
          ? "text-primary"
          : "text-foreground hover:text-primary"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative overflow-hidden block h-5">
        {/* Invisible spacer to ensure width accommodates longer text */}
        <span className="invisible font-semibold">{displayText}</span>

        {/* Default label */}
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
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
            className="absolute inset-0 flex items-center justify-center text-primary font-semibold"
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
