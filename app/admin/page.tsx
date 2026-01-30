"use client"

import React, { useState, useEffect } from "react"
import {
    LayoutDashboard,
    FilePlus,
    Settings,
    Users,
    ShieldCheck,
    TrendingUp,
    AlertCircle,
    BarChart3,
    Search,
    Plus,
    Edit,
    Trash2,
    CheckCircle2,
    Clock,
    ExternalLink,
    Globe
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { schemes, type Scheme } from "@/lib/schemes-data"
import { type Language } from "@/lib/translations"
import { useLanguage } from "@/components/LanguageContext"
import { SchemeForm } from "./components/SchemeForm"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { ADMIN_EMAILS } from "@/lib/constants"

export default function AdminDashboard() {
    const [schemeList, setSchemeList] = useState<Scheme[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("schemes")
    const { language, setLanguage, t } = useLanguage()

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingScheme, setEditingScheme] = useState<Scheme | null>(null)

    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const checkAdminAccess = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
                router.push("/")
            }
        }
        checkAdminAccess()
        fetchSchemes()
    }, [])

    const fetchSchemes = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("/api/admin/schemes")
            const data = await res.json()
            if (Array.isArray(data)) {
                // Map snake_case from DB to camelCase for frontend
                const mappedData = data.map((s: any) => ({
                    ...s,
                    targetGroup: s.target_group,
                    applicationMode: s.application_mode,
                    applyUrl: s.apply_url,
                    keyBenefits: s.key_benefits,
                    howToApply: s.how_to_apply,
                    simplifiedDescription: s.simplified_description,
                    offlineAssistance: s.offline_assistance,
                    videoTutorialUrl: s.video_tutorial_url,
                    lastUpdated: s.last_updated
                }))
                setSchemeList(mappedData)
            }
        } catch (err) {
            console.error("Error fetching schemes:", err)
        } finally {
            setIsLoading(false)
        }
    }

    const filteredSchemes = schemeList.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.ministry.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSaveScheme = async (data: any) => {
        try {
            const res = await fetch("/api/admin/schemes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...editingScheme, ...data })
            })
            if (res.ok) {
                fetchSchemes()
                setIsFormOpen(false)
                setEditingScheme(null)
            }
        } catch (err) {
            console.error("Error saving scheme:", err)
        }
    }

    const handleDeleteScheme = async (id: string) => {
        if (confirm("Are you sure you want to delete this scheme?")) {
            try {
                const res = await fetch(`/api/admin/schemes/${id}`, {
                    method: "DELETE"
                })
                if (res.ok) {
                    fetchSchemes()
                }
            } catch (err) {
                console.error("Error deleting scheme:", err)
            }
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 hidden md:flex">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">SchemeAdmin</span>
                </div>

                <nav className="space-y-2 flex-1">
                    <NavItem
                        icon={<LayoutDashboard className="w-4 h-4" />}
                        label={t.home}
                        active={activeTab === "dashboard"}
                        onClick={() => setActiveTab("dashboard")}
                    />
                    <NavItem
                        icon={<FilePlus className="w-4 h-4" />}
                        label={t.manageSchemes}
                        active={activeTab === "schemes"}
                        onClick={() => setActiveTab("schemes")}
                    />
                    <NavItem
                        icon={<Users className="w-4 h-4" />}
                        label={t.userAnalytics}
                        active={activeTab === "users"}
                        onClick={() => setActiveTab("users")}
                    />
                    <NavItem
                        icon={<Settings className="w-4 h-4" />}
                        label={t.settings}
                        active={activeTab === "settings"}
                        onClick={() => setActiveTab("settings")}
                    />
                </nav>

                {/* Language Switcher in Admin Sidebar */}
                <div className="mt-4 flex gap-2 px-2">
                    {["en", "hi", "mr"].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang as Language)}
                            className={`text-[10px] font-bold px-2 py-1 rounded border ${language === lang
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                                }`}
                        >
                            {lang.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-800">
                    <div className="flex items-center gap-3 p-2">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">AD</div>
                        <div className="text-xs">
                            <p className="font-bold">Admin User</p>
                            <p className="text-slate-500">Ministry of IT</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">
                            {activeTab === "schemes" ? t.manageSchemes : t.adminTitle}
                        </h1>
                        <p className="text-sm text-slate-500">Government Portal Administration</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="hidden sm:flex">
                            <Clock className="w-4 h-4 mr-2" /> {t.auditLogs}
                        </Button>
                        <Button variant="secondary" size="sm" onClick={async () => {
                            if (confirm("This will attempt to seed default schemes. If schemes already exist, duplicates might occur or be skipped depending on logic. Continue?")) {
                                for (const s of schemes) {
                                    await handleSaveScheme(s)
                                }
                                alert("Seeding process initiated.")
                            }
                        }}>
                            <Globe className="w-4 h-4 mr-2" /> Seed Data
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => { setEditingScheme(null); setIsFormOpen(true); }}>
                            <Plus className="w-4 h-4 mr-2" /> {t.addNewScheme}
                        </Button>
                    </div>
                </header>

                {/* Dashboard Tab Content */}
                {activeTab === "dashboard" && (
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <StatCard title="Total Schemes" value={schemeList.length} sub={`Active: ${schemeList.length}`} icon={<BarChart3 className="text-blue-600" />} />
                            <StatCard title="Checks Today" value="1,248" sub="+12% from yesterday" icon={<TrendingUp className="text-emerald-600" />} />
                            <StatCard title="AI Conversations" value="842" sub="98% Success Rate" icon={<CheckCircle2 className="text-purple-600" />} />
                            <StatCard title="Pending Verifications" value="15" sub="Requires attention" icon={<AlertCircle className="text-amber-600" />} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Latest system events and updates</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">New scheme added: Solar Roof Subsidy</p>
                                                    <p className="text-xs text-muted-foreground">Admin User • 2 hours ago</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>System Health</CardTitle>
                                    <CardDescription>Server status and performance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Database (Supabase)</span>
                                            <Badge className="bg-green-500">Operational</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">AI API (Gemini)</span>
                                            <Badge className="bg-green-500">Operational</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Storage</span>
                                            <Badge className="bg-green-500">Operational</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Manage Schemes Tab Content */}
                {activeTab === "schemes" && (
                    <Card className="border-none shadow-sm">
                        <CardHeader className="pb-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <CardTitle className="text-lg">Database Records</CardTitle>
                                    <CardDescription>View and manage all government schemes in the system</CardDescription>
                                </div>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder="Search schemes..."
                                        className="pl-10 h-9 text-sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="py-20 text-center text-slate-500">
                                    <Clock className="w-8 h-8 animate-spin mx-auto mb-4 opacity-20" />
                                    <p>Loading database records...</p>
                                </div>
                            ) : schemeList.length === 0 ? (
                                <div className="py-20 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4">
                                        <Globe className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">No Schemes Found</h3>
                                    <p className="text-slate-500 max-w-xs mx-auto mb-6 text-sm">
                                        Your scheme database is currently empty. You can add one manually or seed initial data.
                                    </p>
                                    <div className="flex justify-center gap-4">
                                        <Button size="sm" className="bg-blue-600" onClick={() => setIsFormOpen(true)}>
                                            <Plus className="w-4 h-4 mr-2" /> Manually Add
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-y border-slate-100">
                                                <tr>
                                                    <th className="px-4 py-3">{t.schemeName}</th>
                                                    <th className="px-4 py-3">{t.ministry}</th>
                                                    <th className="px-4 py-3">{t.targetGroup}</th>
                                                    <th className="px-4 py-3">Status</th>
                                                    <th className="px-4 py-3">{t.lastUpdated}</th>
                                                    <th className="px-4 py-3 text-right">{t.actions}</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {filteredSchemes.slice(0, 10).map((scheme) => (
                                                    <tr key={scheme.id} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-xl">{scheme.icon}</span>
                                                                <span className="font-bold text-slate-900 truncate max-w-[200px]">{scheme.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-slate-500">{scheme.ministry}</td>
                                                        <td className="px-4 py-4 text-slate-500">{scheme.targetGroup}</td>
                                                        <td className="px-4 py-4">
                                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">
                                                                {scheme.status || "Active"}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-4 py-4 text-slate-500 text-xs">
                                                            {new Date(scheme.lastUpdated || Date.now()).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-4 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600" onClick={() => { setEditingScheme(scheme); setIsFormOpen(true); }}>
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600" onClick={() => handleDeleteScheme(scheme.id)}>
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900" onClick={() => window.open(`/scheme/${scheme.id}`, '_blank')}>
                                                                    <ExternalLink className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                                        <p>Showing {Math.min(filteredSchemes.length, 10)} of {filteredSchemes.length} schemes</p>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="h-8 px-3" disabled>Previous</Button>
                                            <Button variant="outline" size="sm" className="h-8 px-3">Next</Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Analytics Tab Content */}
                {activeTab === "users" && (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                        <BarChart3 className="w-16 h-16 text-slate-300 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900">User Analytics</h3>
                        <p className="text-slate-500 mb-6">Detailed user engagement charts and demographic breakdowns will appear here.</p>
                        <Button variant="outline">Download Report</Button>
                    </div>
                )}

                {/* Settings Tab Content */}
                {activeTab === "settings" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Admin Settings</CardTitle>
                            <CardDescription>Configure global system parameters.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Platform Name</label>
                                <Input defaultValue="SchemeLight" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Contact Email</label>
                                <Input defaultValue="admin@schemelight.gov.in" />
                            </div>
                            <div className="pt-4">
                                <Button>Save Configuration</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>

            {/* Form Overlay */}
            {isFormOpen && (
                <SchemeForm
                    onClose={() => setIsFormOpen(false)}
                    onSave={handleSaveScheme}
                    initialData={editingScheme}
                    t={t}
                />
            )}
        </div>
    )
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${active
                ? "bg-blue-600 text-white font-bold"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
        >
            {icon}
            {label}
        </button>
    )
}

function StatCard({ title, value, sub, icon }: { title: string, value: string | number, sub: string, icon: React.ReactNode }) {
    return (
        <Card className="border-none shadow-sm overflow-hidden relative">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
                </div>
                <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-1">{value}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-2">{title}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{sub}</p>
                </div>
            </CardContent>
        </Card>
    )
}
