"use client"

import React, { useState } from "react"
import { Check, X, ArrowRight, ArrowLeftRight, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { schemes, type Scheme, getLocalizedScheme } from "@/lib/schemes-data"
import { useLanguage } from "@/components/LanguageContext"
import { SaveSchemeButton } from "./SaveSchemeButton"

export function SchemeComparison({ t }: { t: any }) {
    const { language } = useLanguage()
    const [scheme1Id, setScheme1Id] = useState<string>("")
    const [scheme2Id, setScheme2Id] = useState<string>("")

    const scheme1Raw = schemes.find(s => s.id === scheme1Id)
    const scheme2Raw = schemes.find(s => s.id === scheme2Id)

    const scheme1 = scheme1Raw ? getLocalizedScheme(scheme1Raw, language) : undefined
    const scheme2 = scheme2Raw ? getLocalizedScheme(scheme2Raw, language) : undefined

    const ComparisonRow = ({ label, val1, val2, isList = false }: { label: string, val1: any, val2: any, isList?: boolean }) => (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 py-6 border-b border-slate-100 dark:border-slate-800 last:border-0 group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors px-4 rounded-xl">
            <div className="md:col-span-1 flex items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
            </div>
            <div className="md:col-span-3">
                {isList ? (
                    <ul className="space-y-1">
                        {(val1 as string[] || []).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                <Check className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{val1 || "N/A"}</p>
                )}
            </div>
            <div className="md:col-span-3 md:border-l md:border-slate-100 dark:md:border-slate-800 md:pl-6">
                {isList ? (
                    <ul className="space-y-1">
                        {(val2 as string[] || []).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                <Check className="w-4 h-4 mt-0.5 text-indigo-500 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{val2 || "N/A"}</p>
                )}
            </div>
        </div>
    )

    return (
        <Card className="w-full border-none shadow-2xl bg-white dark:bg-slate-900/50 backdrop-blur-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
                <div className="flex items-center gap-3 mb-2">
                    <ArrowLeftRight className="w-6 h-6 text-indigo-400" />
                    <Badge variant="outline" className="text-indigo-200 border-indigo-200/30 uppercase tracking-tighter">{t.comparisonTitle}</Badge>
                </div>
                <CardTitle className="text-3xl font-black">{t.comparisonTitle}</CardTitle>
                <CardDescription className="text-slate-400">{t.comparisonSubtitle}</CardDescription>
            </CardHeader>

            <CardContent className="p-0">
                {/* Selectors */}
                <div className="grid md:grid-cols-2 gap-8 p-8 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800">
                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.firstScheme}</span>
                        <Select value={scheme1Id} onValueChange={setScheme1Id}>
                            <SelectTrigger className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 h-14 rounded-2xl">
                                <SelectValue placeholder={t.selectPlaceholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {schemes.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.secondScheme}</span>
                        <Select value={scheme2Id} onValueChange={setScheme2Id}>
                            <SelectTrigger className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 h-14 rounded-2xl">
                                <SelectValue placeholder={t.selectPlaceholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {schemes.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {scheme1 && scheme2 ? (
                    <div className="p-4 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
                            <div className="md:col-span-1"></div>
                            <div className="md:col-span-3">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-2xl">{scheme1.icon}</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{scheme1.name}</h4>
                                        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{scheme1.ministry}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-3">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20">
                                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-2xl">{scheme2.icon}</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{scheme2.name}</h4>
                                        <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">{scheme2.ministry}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ComparisonRow label={t.primaryBenefit} val1={scheme1.benefit} val2={scheme2.benefit} />
                        <ComparisonRow label={t.targetGroup} val1={scheme1.targetGroup} val2={scheme2.targetGroup} />
                        <ComparisonRow label={t.keyBenefits} val1={scheme1.keyBenefits} val2={scheme2.keyBenefits} isList />
                        <ComparisonRow label={t.eligibilityTitle} val1={scheme1.eligibility.targetGroups.join(", ")} val2={scheme2.eligibility.targetGroups.join(", ")} />
                        <ComparisonRow label={t.requiredDocuments} val1={scheme1.documents} val2={scheme2.documents} isList />
                        <ComparisonRow label={t.applicationMode} val1={scheme1.applicationMode} val2={scheme2.applicationMode} />

                        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mt-8 pt-8">
                            <div className="md:col-span-1"></div>
                            <div className="md:col-span-3 space-y-3">
                                <Button className="w-full rounded-full h-12 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200" onClick={() => window.open(scheme1.applyUrl, "_blank")}>
                                    {t.applyFor} {scheme1.name.split(" ")[0]} <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                                <div className="flex justify-center">
                                    <SaveSchemeButton schemeId={scheme1.id} schemeName={scheme1.name} variant="full" t={t} />
                                </div>
                            </div>
                            <div className="md:col-span-3 space-y-3">
                                <Button className="w-full rounded-full h-12 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200" onClick={() => window.open(scheme2.applyUrl, "_blank")}>
                                    {t.applyFor} {scheme2.name.split(" ")[0]} <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                                <div className="flex justify-center">
                                    <SaveSchemeButton schemeId={scheme2.id} schemeName={scheme2.name} variant="full" t={t} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-24 flex flex-col items-center justify-center text-center px-4">
                        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                            <ArrowLeftRight className="w-10 h-10 text-slate-300" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-400">{t.readyToCompare}</h4>
                        <p className="max-w-xs text-slate-500 mt-2">{t.pickTwo}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
