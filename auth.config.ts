import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Edge-compatible auth config (no bcrypt, no prisma)
// Used by middleware for route protection
export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  providers: [
    // Placeholder provider - actual auth logic is in auth.ts
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // This won't be called by middleware, just needed for config
      authorize: () => null,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isAuthenticated = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith("/admin")
      const isLoginPage = nextUrl.pathname === "/admin/login"

      if (isAdminRoute) {
        if (isLoginPage) {
          // Redirect authenticated users away from login
          if (isAuthenticated) {
            return Response.redirect(new URL("/admin", nextUrl.origin))
          }
          return true
        }
        // Protect other admin routes
        return isAuthenticated
      }

      return true
    },
  },
} satisfies NextAuthConfig
