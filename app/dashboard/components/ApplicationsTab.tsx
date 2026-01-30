"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, ExternalLink, CheckCircle, XCircle, FileText, Calendar } from "lucide-react"

interface EligibilityLog {
    id: string
    scheme_id: string
    scheme_name: string
    is_eligible: boolean
    confidence_score: number
    created_at: string
    eligibility_result: any
}

import { useLanguage } from "@/components/LanguageContext"

export function ApplicationsTab({ user }: { user: any }) {
    const { t } = useLanguage()
    const [logs, setLogs] = useState<EligibilityLog[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const { data } = await supabase
                    .from("eligibility_logs")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false })

                if (data) setLogs(data)
            } catch (error) {
                console.error("Error fetching logs:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchLogs()
    }, [user.id, supabase])

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600">
                    <FileText className="h-8 w-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{t.applicationsHistory}</h2>
                    <p className="text-slate-500">{t.trackApplication}</p>
                </div>
            </div>

            <div className="grid gap-4">
                {logs.length === 0 ? (
                    <Card className="p-12 text-center">
                        <p className="text-muted-foreground mb-4">{t.noSchemesChecked}</p>
                        <Button asChild>
                            <a href="/">{t.checkEligibilityNow}</a>
                        </Button>
                    </Card>
                ) : (
                    logs.map((log) => (
                        <Card key={log.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-lg">{log.scheme_name}</h3>
                                        <Badge variant={log.is_eligible ? "default" : "destructive"} className={log.is_eligible ? "bg-green-600 hover:bg-green-700" : ""}>
                                            {log.is_eligible ? t.eligible : t.notEligible}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(log.created_at).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            {log.is_eligible ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                                            {log.confidence_score}% {t.matchConfidence}
                                        </span>
                                    </div>
                                    {log.eligibility_result?.missingRequirements?.length > 0 && (
                                        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm mt-3">
                                            <p className="font-semibold mb-1">{t.missingRequirements}:</p>
                                            <ul className="list-disc list-inside">
                                                {log.eligibility_result.missingRequirements.slice(0, 3).map((req: string, i: number) => (
                                                    <li key={i}>{req}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="flex shrink-0 gap-2">
                                    <Button variant="outline" asChild>
                                        <a href={`/scheme/${log.scheme_id}`}>{t.viewDetails}</a>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
