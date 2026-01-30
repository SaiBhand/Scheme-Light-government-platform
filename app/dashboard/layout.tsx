"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
    LayoutDashboard,
    User,
    FileText,
    Bot,
    LogOut,
    Menu,
    X,
    Settings,
    Bell,
    Search,
    ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"

import { NotificationsDropdown } from "./components/NotificationsDropdown"
import { ADMIN_EMAILS } from "@/lib/constants"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [user, setUser] = useState<any>(null)

    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push("/login")
            } else {
                setUser(user)
            }
        }
        getUser()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/login")
        router.refresh()
    }

    const navItems = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard?tab=profile", label: "Profile", icon: User },
        { href: "/dashboard?tab=history", label: "Applications", icon: FileText },
        { href: "/assistant", label: "AI Assistant", icon: Bot },
        { href: "/dashboard?tab=settings", label: "Settings", icon: Settings },

    ]

    // Only add Admin Dashboard if authenticated user is an admin
    if (user?.email && ADMIN_EMAILS.includes(user.email)) {
        navItems.push({ href: "/admin", label: "Admin Dashboard", icon: ShieldCheck })
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 fixed h-full z-30">
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">SL</span>
                    </div>
                    <span className="font-bold text-lg tracking-tight">SchemeLight</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        // Check if active based on path and query param if present in item.href
                        let isActive = false

                        if (item.href === '/dashboard') {
                            // Exact match for overview if no query params in URL
                            isActive = pathname === '/dashboard' && searchParams.toString() === ''
                        } else if (item.href.includes('?')) {
                            const searchPart = item.href.split('?')[1]
                            isActive = pathname === '/dashboard' && searchParams.toString().includes(searchPart)
                        } else {
                            isActive = pathname === item.href
                        }

                        // Fallback logic to highlight 'Overview' if we are on dashboard but no specific tab match (though handled above)
                        if (pathname === '/dashboard' && item.href === '/dashboard' && !searchParams.has('tab')) {
                            isActive = true;
                        }

                        // Correction: The above logic might be slightly redundant. Let's simplify.
                        // Basic check:
                        if (item.href.includes('?')) {
                            const params = new URLSearchParams(item.href.split('?')[1]);
                            const tab = params.get('tab');
                            isActive = pathname === '/dashboard' && searchParams.get('tab') === tab;
                        } else if (item.href === '/dashboard') {
                            isActive = pathname === '/dashboard' && !searchParams.has('tab');
                        } else {
                            isActive = pathname === item.href;
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
                    {user && (
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {user.email?.[0].toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">{user.email}</p>
                                <p className="text-[10px] text-muted-foreground">Citizen</p>
                            </div>
                        </div>
                    )}
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                        <h1 className="text-lg font-semibold lg:hidden">SchemeLight</h1>

                        {/* Search Bar (Desktop) */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value
                                if (query.trim()) {
                                    router.push(`/?search=${encodeURIComponent(query)}`)
                                }
                            }}
                            className="hidden md:flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-full px-4 py-2 w-64 lg:w-96"
                        >
                            <Search className="w-4 h-4 text-muted-foreground mr-2" />
                            <input
                                name="search"
                                type="text"
                                placeholder="Search schemes..."
                                className="bg-transparent border-none outline-none text-sm w-full"
                            />
                        </form>
                    </div>

                    <div className="flex items-center gap-3">
                        <NotificationsDropdown />
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8 flex-1 overflow-x-hidden">
                    {children}
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* Mobile Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-950 shadow-xl transform transition-transform duration-200 lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex items-center justify-between border-b">
                    <span className="font-bold text-lg">Menu</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100"
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}

                    <div className="pt-4 mt-4 border-t">
                        <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </nav>
            </aside>
        </div>
    )
}
