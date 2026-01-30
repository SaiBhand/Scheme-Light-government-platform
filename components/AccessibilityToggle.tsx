"use client"

import React, { useState } from "react"
import { Accessibility, Eye, Type, Check, X, Shield, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAccessibility } from "@/hooks/use-accessibility"
import { AnimatePresence, motion } from "framer-motion"

export function AccessibilityToggle({ t }: { t: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const { highContrast, largeText, toggleHighContrast, toggleLargeText } = useAccessibility()

    return (
        <div className="fixed bottom-24 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4"
                    >
                        <Card className="w-64 p-6 shadow-2xl border-2 bg-white/95 backdrop-blur-md dark:bg-slate-900/95 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-black text-sm uppercase tracking-tighter flex items-center gap-2">
                                    <Accessibility className="w-4 h-4 text-primary" />
                                    {t.accessibilitySettings}
                                </h3>
                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setIsOpen(false)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between group">
                                    <div className="space-y-0.5">
                                        <Label className="text-xs font-bold flex items-center gap-2">
                                            <Eye className="w-3.5 h-3.5" /> {t.highContrast}
                                        </Label>
                                        <p className="text-[10px] text-slate-500">{t.forBetterVisibility}</p>
                                    </div>
                                    <Switch checked={highContrast} onCheckedChange={toggleHighContrast} />
                                </div>

                                <div className="flex items-center justify-between group">
                                    <div className="space-y-0.5">
                                        <Label className="text-xs font-bold flex items-center gap-2">
                                            <Type className="w-3.5 h-3.5" /> {t.largeText}
                                        </Label>
                                        <p className="text-[10px] text-slate-500">{t.easierToRead}</p>
                                    </div>
                                    <Switch checked={largeText} onCheckedChange={toggleLargeText} />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 italic">
                                    <Shield className="w-3 h-3" />
                                    {t.inclusiveDesign}
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                size="icon"
                className={`h-14 w-14 rounded-full shadow-xl transition-all duration-300 hover:scale-105 ${isOpen ? "bg-slate-800 rotate-90" : "bg-indigo-600 shadow-indigo-200"}`}
            >
                <Accessibility className="w-6 h-6" />
            </Button>
        </div>
    )
}
