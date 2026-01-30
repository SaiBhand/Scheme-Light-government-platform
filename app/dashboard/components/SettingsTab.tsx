"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { LogOut, Bell, Shield, Trash2, Smartphone, Moon, Sun } from "lucide-react"

import { useLanguage } from "@/components/LanguageContext"

export function SettingsTab({ user }: { user: any }) {
    const { t } = useLanguage()
    const [notifications, setNotifications] = useState(true)
    const [marketing, setMarketing] = useState(false)

    const handleSignOut = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        window.location.href = "/login"
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-2xl font-bold">{t.settings}</h2>
                <p className="text-slate-500">{t.manageSettings}</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="w-5 h-5" /> {t.notifications}
                        </CardTitle>
                        <CardDescription>{t.configureAlerts}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="notifications" className="flex flex-col space-y-1">
                                <span>{t.schemeAlerts}</span>
                                <span className="font-normal text-xs text-muted-foreground">{t.schemeAlertsDesc}</span>
                            </Label>
                            <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="marketing" className="flex flex-col space-y-1">
                                <span>{t.tipsNews}</span>
                                <span className="font-normal text-xs text-muted-foreground">{t.tipsNewsDesc}</span>
                            </Label>
                            <Switch id="marketing" checked={marketing} onCheckedChange={setMarketing} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5" /> {t.securitySession}
                        </CardTitle>
                        <CardDescription>{t.manageSecurity}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
                            <div className="flex items-center gap-3">
                                <Smartphone className="w-5 h-5 text-slate-500" />
                                <div>
                                    <p className="font-medium text-sm">{t.currentSession}</p>
                                    <p className="text-xs text-muted-foreground">{t.activeNow} • {user.email}</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleSignOut}>{t.signOut}</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-red-200 dark:border-red-900/30">
                    <CardHeader>
                        <CardTitle className="text-red-600 flex items-center gap-2">
                            <Trash2 className="w-5 h-5" /> {t.dangerZone}
                        </CardTitle>
                        <CardDescription>{t.irreversibleAction}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{t.deleteAccount}</p>
                                <p className="text-xs text-muted-foreground">{t.deleteAccountDesc}</p>
                            </div>
                            <Button variant="destructive" disabled>{t.deleteAccount}</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
