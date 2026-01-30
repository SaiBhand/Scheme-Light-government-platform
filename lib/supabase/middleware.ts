/**
 * Supabase Client for Middleware
 * 
 * Used in Next.js middleware for authentication checks.
 */

import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // If not configured, allow access to all routes without auth checks
    return supabaseResponse
  }

  // Skip auth check for static assets and API routes (except auth-related)
  const pathname = request.nextUrl.pathname
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp)$/)
  ) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: any) {
          cookiesToSet.forEach(({ name, value, options }: any) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }: any) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Define protected routes that require authentication
  const protectedRoutes = ["/dashboard"]
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthPage = pathname === "/login" || pathname === "/register"

  // Only check auth for protected routes or if we want to refresh session
  // We should usually ensure session is refreshed, but robustly.

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      if (!error.message.includes("fetch failed")) {
        console.log("Middleware Auth Error:", error.message)
      }
    }

    // Protection Logic
    if (isProtectedRoute && !user) {
      console.log("Middleware: No user found for protected route, redirecting to login from", pathname)
      const url = request.nextUrl.clone()
      url.pathname = "/login"
      url.searchParams.set("redirectedFrom", pathname)
      return NextResponse.redirect(url)
    }

    if (isAuthPage && user) {
      const url = request.nextUrl.clone()
      url.pathname = "/dashboard"
      return NextResponse.redirect(url)
    }

  } catch (err) {
    console.error("Middleware Supabase Fetch Error (Ignored for public routes):", err)
    // If it's a protected route and we crashed, we probably should redirect to login or error
    if (isProtectedRoute) {
      // redirect to login might just loop if the error persists, but safer than 500
      const url = request.nextUrl.clone()
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

