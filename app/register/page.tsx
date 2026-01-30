"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { AlertCircle, UserPlus, ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [supabaseError, setSupabaseError] = useState<string | null>(null)

  let supabase: ReturnType<typeof createClient> | null = null
  try {
    supabase = createClient()
  } catch (err) {
    if (err instanceof Error) {
      setSupabaseError(err.message)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!supabase) {
      setError("Supabase is not configured. Please set up your .env.local file with Supabase credentials.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setIsLoading(true)

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        setIsLoading(false)
        return
      }

      if (data.user) {
        await new Promise(resolve => setTimeout(resolve, 500))

        if (data.session) {
          router.push("/dashboard?setup=true")
          router.refresh()
        } else {
          setError("Registration successful! Please check your email to confirm your account before logging in.")
          setIsLoading(false)
        }
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
            src="/images/indian-students-studying.jpg" // Using existing asset
            alt="Background"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-black/60" />
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
              Start Your Journey with SchemeLight
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Create an account to access a personalized dashboard, track applications,
              and get AI-powered scheme recommendations.
            </p>
          </div>

          <div className="flex gap-4 text-sm text-gray-400">
            <span>© 2025 SchemeLight Gov Platform</span>
          </div>
        </div>
      </div>

      {/* Right: Register Form */}
      <div className="flex items-center justify-center p-8 bg-white dark:bg-zinc-950">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Create an account
            </h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Enter your details below to create your account
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

          <form onSubmit={handleRegister} className="space-y-6">
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={6}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={6}
                className="h-11"
              />
            </div>

            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading || !supabase}>
              {isLoading ? (
                "Creating account..."
              ) : !supabase ? (
                "Supabase Not Configured"
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">
              Already have an account?{" "}
            </span>
            <Link href="/login" className="font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

