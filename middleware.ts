/**
 * Next.js Middleware
 * 
 * Handles authentication and session management.
 * Redirects unauthenticated users to login page.
 * 
 * Note: Next.js 16 Turbopack may show a deprecation warning about "middleware" vs "proxy".
 * This is a known Turbopack quirk - middleware.ts is still the correct and standard way
 * to implement middleware in Next.js 16. The warning can be safely ignored.
 */

import { type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}

