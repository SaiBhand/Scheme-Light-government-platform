"use client"

import React from "react"
import { CheckCircle2, XCircle, Info, ChevronRight, AlertCircle, Calendar, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SaveSchemeButton } from "./SaveSchemeButton"
import type { EligibilityResult } from "@/lib/eligibility-engine"
import { EligibilityScoreBoard } from "./EligibilityScoreBoard"

interface EligibilityExplanationCardProps {
    result: EligibilityResult
    schemeName: string
    schemeId: string
    lastUpdated?: string
    sourceUrl?: string
    t: any
}

export function EligibilityExplanationCard({ result, schemeName, schemeId, lastUpdated, sourceUrl, t }: EligibilityExplanationCardProps) {
    const { isEligible, confidenceScore, explanation, passedReasons, failedReasons, missingRequirements } = result

    return (
        <Card className="w-full border-2 overflow-hidden bg-white/80 backdrop-blur-md dark:bg-slate-900/80 shadow-xl transition-all hover:shadow-2xl">
            <div className={`h-2 w-full ${isEligible ? "bg-emerald-500" : "bg-rose-500"}`} />

            <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                    <Badge
                        variant={isEligible ? "default" : "destructive"}
                        className={`${isEligible ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200" : "bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-200"} px-3 py-1 text-xs font-semibold uppercase tracking-wider border`}
                    >
                        {isEligible ? t.likelyEligible : t.actionNeeded}
                    </Badge>
                    <div className="flex items-center gap-2">
                        {lastUpdated && (
                            <div className="flex items-center text-[10px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                                <Calendar className="w-3 h-3 mr-1" />
                                {t.verified}: {lastUpdated}
                            </div>
                        )}
                        <SaveSchemeButton
                            schemeId={schemeId}
                            schemeName={schemeName}
                            variant="icon"
                        />
                    </div>
                </div>

                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {schemeName}
                    {isEligible ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-50" />
                    ) : (
                        <AlertCircle className="w-6 h-6 text-rose-500 fill-rose-50" />
                    )}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 mt-2 italic font-medium">
                    "{explanation}"
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-4 space-y-6">
                {/* Confidence Meter */}
                <EligibilityScoreBoard
                    score={confidenceScore}
                    guidance={result.improvementGuidance}
                    schemeName={schemeName}
                />

                <div className="grid md:grid-cols-2 gap-4">
                    {/* Why you match */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center uppercase tracking-widest">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            {t.whyYouMatch}
                        </h4>
                        <ul className="space-y-2">
                            {passedReasons.length > 0 ? (
                                passedReasons.map((reason, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 bg-emerald-50/50 dark:bg-emerald-950/20 p-2 rounded-lg border border-emerald-100/50 dark:border-emerald-900/30">
                                        <ChevronRight className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                                        <span>{reason.replace("✅ ", "")}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-sm text-slate-400 italic px-2">{t.noMatchingFound}</li>
                            )}
                        </ul>
                    </div>

                    {/* Points to address */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-rose-700 dark:text-rose-400 flex items-center uppercase tracking-widest">
                            <XCircle className="w-4 h-4 mr-2" />
                            {t.pointsToAddress}
                        </h4>
                        <ul className="space-y-2">
                            {failedReasons.length > 0 ? (
                                failedReasons.map((reason, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 bg-rose-50/50 dark:bg-rose-950/20 p-2 rounded-lg border border-rose-100/50 dark:border-rose-900/30">
                                        <ChevronRight className="w-4 h-4 mt-0.5 text-rose-500 flex-shrink-0" />
                                        <span>{reason.replace("❌ ", "")}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-sm text-slate-400 italic px-2 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
                                    {t.meetAllCriteria}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* AI Transparency Badge */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 italic">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {t.verifiedDataNote}
                    </div>
                    <button
                        onClick={() => sourceUrl && window.open(sourceUrl, "_blank")}
                        className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline disabled:opacity-50 disabled:no-underline"
                        disabled={!sourceUrl}
                    >
                        {t.viewSourceGuidelines}
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
