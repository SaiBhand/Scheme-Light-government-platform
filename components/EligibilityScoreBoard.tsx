"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, HelpCircle, FileText, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ImprovementStep } from "@/lib/eligibility-engine"

interface EligibilityScoreBoardProps {
    score: number
    guidance: ImprovementStep[]
    schemeName: string
}

export function EligibilityScoreBoard({ score, guidance, schemeName }: EligibilityScoreBoardProps) {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [showFixFlow, setShowFixFlow] = React.useState(false)

    // Color logic
    const getScoreColor = (s: number) => {
        if (s >= 80) return "bg-green-600"
        if (s >= 50) return "bg-amber-500"
        return "bg-red-600"
    }

    const getScoreTextColor = (s: number) => {
        if (s >= 80) return "text-green-700"
        if (s >= 50) return "text-amber-700"
        return "text-red-700"
    }

    const getScoreLabel = (s: number) => {
        if (s >= 80) return "High chance"
        if (s >= 50) return "Possible with improvements"
        return "Currently not eligible"
    }

    const failedSteps = guidance.filter(g => g.status === "failed")

    return (
        <div className="space-y-6 bg-slate-50/50 p-6 rounded-xl border border-slate-200">
            {/* Score Header */}
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <div>
                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Eligibility Score</h4>
                        <p className={cn("text-3xl font-bold", getScoreTextColor(score))}>{score}%</p>
                    </div>
                    <div className="text-right">
                        <span className={cn("text-sm font-medium px-2.5 py-1 rounded-full border",
                            score >= 80 ? "bg-green-50 border-green-200 text-green-700" :
                                score >= 50 ? "bg-amber-50 border-amber-200 text-amber-700" :
                                    "bg-red-50 border-red-200 text-red-700"
                        )}>
                            {getScoreLabel(score)}
                        </span>
                    </div>
                </div>

                <div className="relative pt-1">
                    <Progress value={score} className="h-3 bg-slate-200" indicatorClassName={getScoreColor(score)} />
                    <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                </div>
            </div>

            {/* Improvement Guidance */}
            {failedSteps.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                        <h5 className="font-bold text-slate-900 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                            How to Increase Your Eligibility
                        </h5>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-primary hover:text-primary/80"
                        >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                    </div>

                    {isExpanded && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                            {failedSteps.map((step, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-2">
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">{step.condition} Match Failed</span>
                                        {step.diff && <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{step.diff} Difference</span>}
                                    </div>
                                    <p className="text-sm text-slate-700 font-medium">{step.message}</p>
                                    <div className="flex items-start gap-2 text-sm text-slate-600 bg-blue-50/50 p-2 rounded border border-blue-100/50">
                                        <HelpCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                        <span><span className="font-bold text-blue-700 underline px-1 rounded">Fix:</span> {step.action}</span>
                                    </div>
                                </div>
                            ))}

                            <Button
                                className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-lg shadow-md"
                                onClick={() => setShowFixFlow(true)}
                            >
                                Improve My Eligibility
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Step-by-Step Fix Flow Dialog */}
            {showFixFlow && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <Card className="max-w-xl w-full bg-white shadow-2xl border-none overflow-hidden rounded-2xl">
                        <div className="bg-slate-900 text-white p-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <FileText className="w-6 h-6" />
                                Eligibility Fix Checklist
                            </h3>
                            <p className="text-slate-400 text-sm mt-1">Guided steps to become eligible for {schemeName}</p>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Identify missing documents</h4>
                                        <p className="text-sm text-slate-600 mt-1">Gather current Income, Caste, or Residential certificates to verify your eligibility profile.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Where to obtain it</h4>
                                        <p className="text-sm text-slate-600 mt-1">Visit your local Common Service Centre (CSC), Taluka Office, or apply online via Mahaswayam/Aaple Sarkar portals.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Update Profile & Re-check</h4>
                                        <p className="text-sm text-slate-600 mt-1">Once you have the documents, update your profile on SchemeLight to see your updated score.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex gap-3">
                                <Button variant="outline" className="flex-1 h-12" onClick={() => setShowFixFlow(false)}>Close</Button>
                                <Button className="flex-1 h-12 bg-primary hover:bg-primary/90" onClick={() => {
                                    setShowFixFlow(false)
                                    window.scrollTo({ top: document.getElementById('eligibility')?.offsetTop || 0, behavior: 'smooth' })
                                }}>
                                    Update My Details <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}
