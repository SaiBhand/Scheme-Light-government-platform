"use client"

import React, { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SaveSchemeButtonProps {
    schemeId: string
    schemeName: string
    variant?: "icon" | "full"
    t?: any
}

export function SaveSchemeButton({ schemeId, schemeName, variant = "icon", t }: SaveSchemeButtonProps) {
    const [isSaved, setIsSaved] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        const checkSavedStatus = async () => {
            try {
                const res = await fetch("/api/save-scheme")
                const data = await res.json()
                if (data.success && data.savedSchemes) {
                    setIsSaved(data.savedSchemes.some((s: any) => s.scheme_id === schemeId))
                }
            } catch (err) { console.error(err) }
        }
        checkSavedStatus()
    }, [schemeId])

    const handleSave = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsSaving(true)
        try {
            const action = isSaved ? "unsave" : "save"
            const res = await fetch("/api/save-scheme", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ schemeId, schemeName, action })
            })
            const data = await res.json()
            if (data.success) {
                setIsSaved(!isSaved)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsSaving(false)
        }
    }

    if (variant === "icon") {
        return (
            <button
                onClick={handleSave}
                disabled={isSaving}
                className={`p-2 rounded-full transition-all ${isSaved ? "text-rose-500 bg-rose-50" : "text-slate-400 bg-slate-100 hover:text-rose-500 hover:shadow-md"}`}
                title={isSaved ? "Unsave Scheme" : "Save Scheme"}
            >
                <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            </button>
        )
    }

    return (
        <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className={`gap-2 rounded-full ${isSaved ? "bg-rose-500 hover:bg-rose-600 text-white border-rose-500" : ""}`}
        >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? (t?.saved || "Saved") : (t?.saveScheme || "Save Scheme")}
        </Button>
    )
}
