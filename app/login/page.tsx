"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { AlertCircle, LogIn, ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [supabaseError, setSupabaseError] = useState<string | null>(null)

  let supabase: ReturnType<typeof createClient> | null = null
  try {
    supabase = createClient()
  } catch (err) {
    // Supabase not configured
    if (err instanceof Error) {
      setSupabaseError(err.message)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!supabase) {
      setError("Supabase is not configured. Please set up your .env.local file with Supabase credentials.")
      return
    }

    setIsLoading(true)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        setIsLoading(false)
        return
      }

      if (data.user) {
        router.push("/")
        router.refresh()
      } else {
        setError("Login failed - no user data received.")
        setIsLoading(false)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Branding & Visuals */}
      <div className="hidden lg:flex flex-col relative bg-zinc-900 text-white p-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/indian-farmer-in-field.jpg" // Using existing asset
            alt="Background"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-black/60" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-xl">SL</span>
            </div>
            <span className="font-bold text-xl tracking-tight">SchemeLight</span>
          </div>

          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-6 leading-tight">
              Empowering Citizens with Government Schemes
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Access thousands of government schemes tailored for you.
              Checking eligibility has never been easier.
            </p>
          </div>

          <div className="flex gap-4 text-sm text-gray-400">
            <span>© 2025 SchemeLight Gov Platform</span>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex items-center justify-center p-8 bg-white dark:bg-zinc-950">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Welcome back
            </h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Enter your credentials to access your dashboard
            </p>
          </div>

          {supabaseError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Configuration Required:</strong> {supabaseError}
              </AlertDescription>
            </Alert>
          )}

          {error && !supabaseError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading || !supabase}>
              {isLoading ? (
                "Signing in..."
              ) : !supabase ? (
                "Supabase Not Configured"
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">
              Don't have an account?{" "}
            </span>
            <Link href="/register" className="font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

