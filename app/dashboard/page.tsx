"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  FileText,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Bot,
  ArrowUpRight,
  Clock,
  Briefcase,
  User,
  Heart
} from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useSearchParams } from "next/navigation"
import { ProfileTab } from "./components/ProfileTab"
import { ApplicationsTab } from "./components/ApplicationsTab"

import { SettingsTab } from "./components/SettingsTab"
import { useLanguage } from "@/components/LanguageContext"

interface UserProfile {
  id: string
  full_name: string | null
  age: number | null
  gender: string | null
  occupation: string | null
  annual_income: number | null
  state: string | null
  category: string | null
  is_disabled: boolean
  is_widow: boolean
  is_orphan: boolean
}

interface SavedScheme {
  id: string
  scheme_id: string
  scheme_name: string
  created_at: string
}

interface EligibilityLog {
  id: string
  scheme_id: string
  scheme_name: string
  is_eligible: boolean
  confidence_score: number
  created_at: string
}

export default function DashboardPage() {
  const { t, language } = useLanguage()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [eligibilityLogs, setEligibilityLogs] = useState<EligibilityLog[]>([])
  const [savedSchemes, setSavedSchemes] = useState<SavedScheme[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [needsSetup, setNeedsSetup] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (currentUser) {
        setUser(currentUser)

        const [profileResult, logsResult, savedResult] = await Promise.allSettled([
          supabase.from("user_profiles").select("*").eq("id", currentUser.id).single(),
          supabase.from("eligibility_logs").select("*").eq("user_id", currentUser.id).order("created_at", { ascending: false }).limit(5),
          supabase.from("saved_schemes").select("*").eq("user_id", currentUser.id).order("created_at", { ascending: false })
        ])

        if (profileResult.status === "fulfilled") {
          const { data } = profileResult.value
          if (data) {
            setProfile(data)
            if (!data.full_name || !data.age) setNeedsSetup(true)
          } else {
            setNeedsSetup(true)
          }
        }

        if (logsResult.status === "fulfilled" && logsResult.value.data) {
          setEligibilityLogs(logsResult.value.data)
        }

        if (savedResult.status === "fulfilled" && savedResult.value.data) {
          setSavedSchemes(savedResult.value.data)
        }
      }
      setIsLoading(false)
    } catch {
      setIsLoading(false)
    }
  }

  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'

  if (isLoading) {
    return <div className="p-8">Loading dashboard data...</div>
  }

  if (activeTab === 'profile') {
    return <ProfileTab user={user} />
  }

  if (activeTab === 'history') {
    return <ApplicationsTab user={user} />
  }

  if (activeTab === 'settings') {
    return <SettingsTab user={user} />
  }

  // --- Overview Tab Content ---
  const eligibleCount = eligibilityLogs.filter((log) => log.is_eligible).length
  const totalChecks = eligibilityLogs.length
  const successRate = totalChecks > 0 ? Math.round((eligibleCount / totalChecks) * 100) : 0

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t.dashboardOverview}</h2>
        <p className="text-muted-foreground">{t.welcomeBack}</p>
      </div>

      {needsSetup && (
        <Alert className="bg-amber-50 border-amber-200 text-amber-800">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription>
            {t.profileIncomplete} <Link href="/dashboard?tab=profile" className="font-bold hover:underline">{t.completeNow}</Link> {t.betterRecs}
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalChecks}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalChecks}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.eligibleSchemes}</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eligibleCount}</div>
            <p className="text-xs text-muted-foreground text-green-600">
              {t.accessGranted}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.successRate}</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <Progress value={successRate} className="mt-2 h-2 text-blue-600" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.savedSchemes}</CardTitle>
            <Heart className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedSchemes.length}</div>
            <p className="text-xs text-muted-foreground">{t.bookmarkedForLater}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t.recentChecks}</CardTitle>
          </CardHeader>
          <CardContent>
            {eligibilityLogs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {t.noActivity} <Link href="/" className="text-primary hover:underline">{t.checkAScheme}</Link>
              </div>
            ) : (
              <div className="space-y-6">
                {eligibilityLogs.map((log) => (
                  <div key={log.id} className="flex items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border ${log.is_eligible ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'}`}>
                      {log.is_eligible ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{log.scheme_name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="ml-auto font-medium text-sm">
                      {log.confidence_score}% Match
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Saved Schemes */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              {t.savedSchemes}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {savedSchemes.length === 0 ? (
              <div className="text-center py-6 text-xs text-muted-foreground">
                No saved schemes yet.
              </div>
            ) : (
              <div className="space-y-4">
                {savedSchemes.map((scheme) => (
                  <div key={scheme.id} className="flex flex-col gap-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-bold truncate">{scheme.scheme_name}</p>
                    <Link href={`/scheme/${scheme.scheme_id}`} className="text-[10px] text-primary hover:underline flex items-center gap-1">
                      {t.viewDetails} <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
                {savedSchemes.length > 3 && (
                  <Link href="/dashboard?tab=history" className="text-xs text-center block text-muted-foreground hover:text-primary transition-colors">
                    {t.viewAllSaved}
                  </Link>
                )}
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{t.aiAssistanceSection}</h3>
              <p className="text-xs text-muted-foreground mb-4">
                {t.aiAssistanceDesc}
              </p>
              <Link href="/assistant">
                <Button variant="outline" size="sm" className="w-full">
                  {t.chatButton}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

