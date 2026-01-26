import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simple edge-compatible middleware that checks for auth session cookie
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for NextAuth session cookie
  const sessionCookie = request.cookies.get("authjs.session-token") ||
                        request.cookies.get("__Secure-authjs.session-token")
  const isAuthenticated = !!sessionCookie?.value

  // Admin routes protection
  if (pathname.startsWith("/admin")) {
    // Allow access to login page for unauthenticated users
    if (pathname === "/admin/login") {
      if (isAuthenticated) {
        // Redirect authenticated users away from login
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      return NextResponse.next()
    }

    // Protect all other admin routes - redirect to login if not authenticated
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
