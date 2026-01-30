"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  CheckCircle,
  FileText,
  Search,
  UserCheck,
  Shield,
  LinkIcon,
  Users,
  Clock,
  AlertTriangle,
  Info,
  X,
  ArrowRight,
  Bot,
  MapPin,
  ChevronRight,
  Star,
  Menu
} from "lucide-react"
import { checkEligibility, schemes, type Scheme, getLocalizedScheme } from "@/lib/schemes-data"
import { type EligibilityResponse, checkEligibilityWithExplanation } from "@/lib/eligibility-engine"
import { translations, type Language } from "@/lib/translations"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, LayoutDashboard, Settings, User as UserIcon } from "lucide-react"
import { ChatbotPopup } from "@/components/ChatbotPopup"
import { EligibilityScoreBoard } from "@/components/EligibilityScoreBoard"
import { EligibilityExplanationCard } from "@/components/EligibilityExplanationCard"
import { generateEligibilityReport } from "@/lib/report-generator"
import { type UserEligibilityData } from "@/lib/eligibility-engine"
import { SchemeComparison } from "@/components/SchemeComparison"
import { AccessibilityToggle } from "@/components/AccessibilityToggle"
import { useEligibility, type EligibilityForm, type DocumentStatus } from "@/components/EligibilityContext"

// --- Interfaces ---


import { useLanguage } from "@/components/LanguageContext"
import { FeaturedSchemes } from "@/components/FeaturedSchemes"

// --- Main Component ---

export default function HomePage() {
  const { language, setLanguage, t } = useLanguage()
  const searchParams = useSearchParams()

  const {
    formData,
    setFormData,
    documentStatus,
    setDocumentStatus,
    enhancedResults,
    setEnhancedResults,
    showResults,
    setShowResults
  } = useEligibility()
  const [user, setUser] = useState<any>(null)

  // Check for authenticated user
  useEffect(() => {
    const supabase = createClient()
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()

    // Check for search param
    const query = searchParams.get('search')
    if (query) {
      setManualSearch(query)
      setTimeout(() => {
        // Trigger generic search update logic if needed, 
        // but for now we just scroll to manual results after setting it
        // Note: We need to manually call the filter logic or set it
        const searchTerm = (query as string).toLowerCase()
        const results = schemes.filter(
          (scheme: Scheme) =>
            scheme.name.toLowerCase().includes(searchTerm) ||
            scheme.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm)) ||
            scheme.ministry.toLowerCase().includes(searchTerm) ||
            scheme.targetGroup.toLowerCase().includes(searchTerm),
        )
        setManualSearchResults(results)
        setShowResults(false)
        document.getElementById("manual-results")?.scrollIntoView({ behavior: "smooth" })
      }, 500)
    }
  }, [])

  const [eligibleSchemes, setEligibleSchemes] = useState<Scheme[]>([])
  const [notEligibleSchemes, setNotEligibleSchemes] = useState<Array<{ scheme: Scheme; reasons: string[] }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const [simplifiedMode, setSimplifiedMode] = useState(false)
  const [manualSearch, setManualSearch] = useState("")
  const [manualSearchResults, setManualSearchResults] = useState<Scheme[]>([])


  // --- Handlers ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const userData = {
      age: Number.parseInt(formData.age),
      gender: formData.gender,
      occupation: formData.occupation,
      annualIncome: Number.parseInt(formData.annualIncome),
      state: formData.state,
      category: formData.category,
      isDisabled: formData.isDisabled,
      isWidow: formData.isWidow,
      isOrphan: formData.isOrphan || false,
      isWoman: formData.gender === "female",
      isFarmer: formData.occupation === "farmer" || formData.occupation === "agricultural-worker",
      isStudent: formData.occupation === "student",
      landOwnership: formData.landOwnership,
      currentClass: formData.currentClass,
      fullName: formData.fullName,
      institutionType: formData.institutionType,
    }

    try {
      // Call the new API endpoint
      const response = await fetch("/api/check-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData, userDocuments: documentStatus }),
      })

      const apiResult = await response.json()

      if (apiResult.success && apiResult.results.length > 0) {
        setEnhancedResults(apiResult.results)
        // Maintain backward compatibility
        const eligible = apiResult.results
          .filter((r: any) => r.eligibility.isEligible)
          .map((r: any) => r.scheme)
        const notEligible = apiResult.results
          .filter((r: any) => !r.eligibility.isEligible)
          .map((r: any) => ({
            scheme: r.scheme,
            reasons: r.eligibility.missingRequirements,
          }))

        setEligibleSchemes(eligible)
        setNotEligibleSchemes(notEligible)
        setShowResults(true)
        setManualSearchResults([])

        setTimeout(() => {
          document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      } else {
        // Fallback if success but empty, or if failure
        fallbackCheck(userData)
      }
    } catch (error) {
      console.error("Error checking eligibility:", error)
      fallbackCheck(userData)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadReport = () => {
    const userData: UserEligibilityData = {
      age: Number.parseInt(formData.age),
      gender: formData.gender,
      occupation: formData.occupation,
      annualIncome: Number.parseInt(formData.annualIncome),
      state: formData.state,
      category: formData.category,
      isDisabled: formData.isDisabled,
      isWidow: formData.isWidow,
      isOrphan: formData.isOrphan || false,
      isWoman: formData.gender === "female",
      isFarmer: formData.occupation === "farmer" || formData.occupation === "agricultural-worker",
      isStudent: formData.occupation === "student",
      landOwnership: formData.landOwnership,
      currentClass: formData.currentClass,
      institutionType: formData.institutionType,
      fullName: formData.fullName,
    }

    generateEligibilityReport(userData, enhancedResults)
  }

  const fallbackCheck = (userData: any) => {
    const results = checkEligibility(userData)

    // Use the real eligibility engine for fallback too, but on local data
    const enhanced: EligibilityResponse[] = schemes.map(scheme =>
      checkEligibilityWithExplanation(getLocalizedScheme(scheme, language), userData, documentStatus, language)
    ).sort((a, b) => {
      if (a.eligibility.isEligible && !b.eligibility.isEligible) return -1
      if (!a.eligibility.isEligible && b.eligibility.isEligible) return 1
      return b.eligibility.confidenceScore - a.eligibility.confidenceScore
    })

    setEnhancedResults(enhanced)
    setEligibleSchemes(results.eligible)
    setNotEligibleSchemes(results.notEligible)
    setShowResults(true)
    setManualSearchResults([])
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleManualSearch = () => {
    if (!manualSearch.trim()) return

    const searchTerm = manualSearch.toLowerCase()
    const results = schemes.filter(
      (scheme: Scheme) =>
        scheme.name.toLowerCase().includes(searchTerm) ||
        scheme.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm)) ||
        scheme.ministry.toLowerCase().includes(searchTerm) ||
        scheme.targetGroup.toLowerCase().includes(searchTerm),
    )

    setManualSearchResults(results)
    setShowResults(false)

    setTimeout(() => {
      document.getElementById("manual-results")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const calculateReadiness = () => {
    const total = 4
    const available = Object.values(documentStatus).filter((v) => v).length
    return Math.round((available / total) * 100)
  }

  const showConditionalFields = formData.occupation === "farmer" || formData.occupation === "agricultural-worker"
  const showStudentFields = formData.occupation === "student"

  // --- Render ---

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      <AccessibilityToggle t={t} />
      {/* --- Header --- */}
      <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">SL</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">SchemeLight</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6 text-sm font-medium text-slate-600">
              <a href="#home" className="hover:text-primary transition-colors">{t.home}</a>
              <a href="#features" className="hover:text-primary transition-colors">{t.trust}</a>
              <a href="#how-it-works" className="hover:text-primary transition-colors">{t.howItWorks}</a>
              <a href="#eligibility" className="hover:text-primary transition-colors">{t.checkEligibility}</a>
            </nav>
            <div className="flex items-center gap-3">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 overflow-hidden">
                      <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary">
                        <UserIcon className="h-5 w-5" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">User Account</p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/dashboard">
                      <DropdownMenuItem className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/settings">
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onClick={async () => {
                        const supabase = createClient()
                        await supabase.auth.signOut()
                        window.location.reload()
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button variant="outline" className="border-slate-300">Sign In</Button>
                </Link>
              )}
              <div className="h-4 w-px bg-slate-200"></div>
              <div className="flex text-xs font-semibold text-slate-500 gap-2">
                <button onClick={() => setLanguage("en")} className={language === 'en' ? 'text-primary' : 'hover:text-slate-800'}>EN</button>
                <button onClick={() => setLanguage("hi")} className={language === 'hi' ? 'text-primary' : 'hover:text-slate-800'}>HI</button>
                <button onClick={() => setLanguage("mr")} className={language === 'mr' ? 'text-primary' : 'hover:text-slate-800'}>MR</button>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon"><Menu className="w-5 h-5" /></Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  <a href="#home" className="text-lg font-medium">Home</a>
                  <a href="#features" className="text-lg font-medium">Features</a>
                  <a href="#eligibility" className="text-lg font-medium">Check Eligibility</a>
                  {user ? (
                    <Link href="/dashboard"><Button className="w-full">Dashboard</Button></Link>
                  ) : (
                    <Link href="/login"><Button className="w-full">Sign In</Button></Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section id="home" className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/images/indian-farmer-in-field.jpg" // Using existing valid asset
            alt="Background"
            fill
            className="object-cover object-center opacity-40" // Increased visibility
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/50 to-slate-50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            {t.aiPoweredPlatform}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 text-balance leading-[1.1]">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed text-balance">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/25 rounded-full" onClick={() => document.getElementById("eligibility")?.scrollIntoView({ behavior: "smooth" })}>
              {t.heroButton} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full border-slate-300 bg-white/50 backdrop-blur-sm hover:bg-white" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>
              {t.learnHowItWorks}
            </Button>
          </div>

          {/* Home Page Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative z-20">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white shadow-lg rounded-full flex items-center p-2 border border-slate-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                <Search className="ml-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-slate-700 placeholder:text-slate-400"
                  value={manualSearch}
                  onChange={(e) => setManualSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
                />
                <Button onClick={handleManualSearch} size="sm" className="rounded-full px-6">Search</Button>
              </div>
            </div>
            {manualSearchResults.length > 0 && manualSearch && (
              <div id="manual-results" className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-30 max-h-[400px] overflow-y-auto">
                <div className="p-2 space-y-1">
                  {manualSearchResults.map((scheme: Scheme) => (
                    <div key={scheme.id} className="p-3 hover:bg-slate-50 rounded-xl transition-colors text-left border-b border-slate-50 last:border-0 cursor-pointer" onClick={() => window.location.href = `/scheme/${scheme.id}`}>
                      <h4 className="font-bold text-slate-900 text-sm">{scheme.name}</h4>
                      <p className="text-xs text-slate-500 truncate">{scheme.ministry}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-slate-400 grayscale opacity-70">
            {/* Placeholder logos for trust/government bodies if needed */}
            <div className="flex items-center gap-2"><Shield className="w-5 h-5" /><span className="font-bold text-sm">{t.secureLabel}</span></div>
            <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /><span className="font-bold text-sm">{t.verifiedLabel}</span></div>
            <div className="flex items-center gap-2"><Users className="w-5 h-5" /><span className="font-bold text-sm">{t.citizenFirstLabel}</span></div>
          </div>
        </div>
      </section>

      {/* --- Featured Schemes Section --- */}
      <FeaturedSchemes />

      {/* --- Features / Trust Section --- */}
      <section id="features" className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">{t.whyTrustTitle}</h2>
            <p className="text-slate-600 text-lg">{t.whyTrustDesc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: t.trustCard1Title, desc: t.trustCard1Desc },
              { icon: Search, title: t.trustCard2Title, desc: t.trustCard2Desc },
              { icon: Bot, title: t.trustCard3Title, desc: t.trustCard3Desc }
            ].map((item, i) => (
              <Card key={i} className="p-8 border-none shadow-lg shadow-slate-200/50 bg-slate-50/50 hover:bg-white transition-all text-center group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform text-primary">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- How It Works --- */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.howItWorksSubtitle}</h2>
              <div className="space-y-6">
                {[
                  { num: "01", title: t.step1Title, desc: t.step1Desc },
                  { num: "02", title: t.step2Title, desc: t.step2Desc },
                  { num: "03", title: t.step3Title, desc: t.step3Desc },
                  { num: "04", title: t.step4Title, desc: t.step4Desc }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-2xl font-bold text-primary/20">{step.num}</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-slate-200 bg-white">
                <img src="/images/indian-students-studying.jpg" alt="How it works" className="w-full h-auto object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Bot className="w-10 h-10 text-primary p-2 bg-primary/10 rounded-lg" />
                    <div>
                      <p className="font-bold text-sm">{t.schemeSathiAI}</p>
                      <p className="text-xs text-slate-500">{t.alwaysHereToHelp}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-100 rounded-full w-3/4"></div>
                    <div className="h-2 bg-slate-100 rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Eligibility Form --- */}
      <section id="eligibility" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.eligibilityTitle}</h2>
              <p className="text-slate-600">{t.eligibilitySubtitle}</p>
            </div>

            <Card className="border-none shadow-2xl shadow-slate-200/50 bg-white ring-1 ring-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <FileText className="w-4 h-4" />
                  <span>{t.basicInformation}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Label htmlFor="simplified-mode" className="text-sm cursor-pointer select-none">{t.simpleMode}</Label>
                  <Switch id="simplified-mode" checked={simplifiedMode} onCheckedChange={setSimplifiedMode} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.fullName}</Label>
                    <Input id="fullName" placeholder={t.fullNamePlaceholder} value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="h-11" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">{t.age}</Label>
                    <Input id="age" type="number" placeholder={t.yearsPlaceholder} value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="h-11" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">{t.gender}</Label>
                    <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                      <SelectTrigger className="h-11"><SelectValue placeholder={t.selectPlaceholder} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{t.male}</SelectItem>
                        <SelectItem value="female">{t.female}</SelectItem>
                        <SelectItem value="other">{t.other}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">{t.state}</Label>
                    <Select value={formData.state} onValueChange={(v) => setFormData({ ...formData, state: v })}>
                      <SelectTrigger className="h-11"><SelectValue placeholder={t.selectState} /></SelectTrigger>
                      <SelectContent>
                        {["andhra-pradesh", "assam", "bihar", "delhi", "gujarat", "karnataka", "maharashtra", "punjab", "rajasthan", "tamil-nadu", "uttar-pradesh", "west-bengal"].map((s) => (
                          <SelectItem key={s} value={s} className="capitalize">{s.replace("-", " ")}</SelectItem>
                        ))}
                        <SelectItem value="other">{t.other}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">{t.category}</Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                      <SelectTrigger className="h-11"><SelectValue placeholder={t.selectPlaceholder} /></SelectTrigger>
                      <SelectContent>
                        {["General", "OBC", "SC", "ST", "EWS"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annualIncome">{t.annualIncome}</Label>
                    <Input id="annualIncome" type="number" placeholder={t.annualIncomePlaceholder} value={formData.annualIncome} onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })} className="h-11" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="occupation">{t.occupation}</Label>
                    <Select value={formData.occupation} onValueChange={(v) => setFormData({ ...formData, occupation: v })}>
                      <SelectTrigger className="h-11"><SelectValue placeholder={t.selectOccupation} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">{t.student}</SelectItem>
                        <SelectItem value="farmer">{t.farmer}</SelectItem>
                        <SelectItem value="salaried">{t.salariedEmployee}</SelectItem>
                        <SelectItem value="self-employed">{t.selfEmployed}</SelectItem>
                        <SelectItem value="unemployed">{t.unemployed}</SelectItem>
                        <SelectItem value="homemaker">{t.homemaker}</SelectItem>
                        <SelectItem value="agricultural-worker">{t.agriculturalWorker}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Document Status */}
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                  <h4 className="font-semibold mb-4 text-blue-900 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> {t.documentsAvailable}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Hardcoded mapping for now to ensure keys match */}
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-blue-100/50 shadow-sm">
                      <Switch checked={documentStatus.aadhaar} onCheckedChange={(c) => setDocumentStatus({ ...documentStatus, aadhaar: c })} />
                      <span className="text-sm font-medium capitalize">{t.documentAadhaar}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-blue-100/50 shadow-sm">
                      <Switch checked={documentStatus.bankAccount} onCheckedChange={(c) => setDocumentStatus({ ...documentStatus, bankAccount: c })} />
                      <span className="text-sm font-medium capitalize">{t.documentBank}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-blue-100/50 shadow-sm">
                      <Switch checked={documentStatus.incomeCertificate} onCheckedChange={(c) => setDocumentStatus({ ...documentStatus, incomeCertificate: c })} />
                      <span className="text-sm font-medium capitalize">{t.documentIncome}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-blue-100/50 shadow-sm">
                      <Switch checked={documentStatus.categoryCertificate} onCheckedChange={(c) => setDocumentStatus({ ...documentStatus, categoryCertificate: c })} />
                      <span className="text-sm font-medium capitalize">{t.documentCategory}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full h-12 text-base shadow-lg shadow-primary/20" disabled={isLoading}>
                    {isLoading ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t.checking}</span> : t.checkEligibilityButton}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground mt-4">By clicking check, you agree to our terms of service.</p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* --- Results Section --- */}
      {showResults && (
        <section id="results" className="py-24 bg-slate-50 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-1 bg-primary rounded-full"></div>
                  <h2 className="text-3xl font-bold text-slate-900">{t.eligibilityTitle}</h2>
                </div>
                <Button
                  onClick={handleDownloadReport}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 rounded-full px-6 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  {t.downloadReport}
                </Button>
              </div>

              {/* Eligible Schemes */}
              {eligibleSchemes.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8">
                  {enhancedResults.filter((r: any) => r.eligibility.isEligible).map((result, i) => (
                    <div key={i} className="space-y-4">
                      <EligibilityExplanationCard
                        result={result.eligibility}
                        schemeName={result.scheme.name}
                        schemeId={result.scheme.id}
                        lastUpdated={result.scheme.lastUpdated}
                        sourceUrl={result.scheme.applyUrl}
                        t={t}
                      />
                      <div className="flex gap-4 justify-end">
                        <Link href={`/scheme/${result.scheme.id}`}>
                          <Button variant="outline" className="rounded-full px-8">{t.fullDetails || "Full Details"}</Button>
                        </Link>
                        <Button className="rounded-full px-8 shadow-lg shadow-primary/20" onClick={() => window.open(result.scheme.applyUrl, "_blank")}>
                          {t.applyNow} <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                  <p className="text-slate-500">{t.noMatchingFound || "No matching schemes found right now. Try updating your profile."}</p>
                </div>
              )}

              {/* Not Eligible (Collapsed or Secondary) */}
              {notEligibleSchemes.length > 0 && (
                <div className="mt-16">
                  <h3 className="text-xl font-bold mb-6 text-slate-400">{t.otherSchemes || "Other Schemes (Not Eligible)"}</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {enhancedResults.filter((r: any) => !r.eligibility.isEligible).map((result, i) => (
                      <EligibilityExplanationCard
                        key={i}
                        result={result.eligibility}
                        schemeName={result.scheme.name}
                        schemeId={result.scheme.id}
                        lastUpdated={result.scheme.lastUpdated}
                        sourceUrl={result.scheme.applyUrl}
                        t={t}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* --- Compare Schemes Section --- */}
      <section id="compare" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SchemeComparison t={t} />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SL</span>
                </div>
                <span className="font-bold text-xl text-white">SchemeLight</span>
              </div>
              <p className="text-sm max-w-sm mb-6">
                Empowering citizens with easy access to government schemes.
                Simplifying governance through technology.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">{t.quickLinks}</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/pages/about" className="hover:text-white transition-colors">{t.aboutUs}</Link></li>
                <li><Link href="/pages/contact" className="hover:text-white transition-colors">{t.contact}</Link></li>
                <li><Link href="/pages/privacy" className="hover:text-white transition-colors">{t.privacyPolicy}</Link></li>
                <li><Link href="/pages/terms" className="hover:text-white transition-colors">{t.termsOfService}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">{t.support}</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/pages/help" className="hover:text-white transition-colors">{t.helpCenter}</Link></li>
                <li><Link href="/pages/feedback" className="hover:text-white transition-colors">{t.feedback}</Link></li>
                <li><Link href="/pages/report-issue" className="hover:text-white transition-colors">{t.reportIssue}</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 text-center text-xs">
            <p>{t.footerCopyright}</p>
            <p className="mt-2 text-slate-600">{t.footerDisclaimer}</p>
          </div>
        </div>
      </footer>
      <ChatbotPopup t={t} />
    </div>
  )
}
