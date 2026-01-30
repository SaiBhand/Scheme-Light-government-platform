"use client"

import { useState, useEffect } from "react"

export interface AccessibilitySettings {
    highContrast: boolean
    largeText: boolean
    screenReaderOptimized: boolean
}

export function useAccessibility() {
    const [settings, setSettings] = useState<AccessibilitySettings>({
        highContrast: false,
        largeText: false,
        screenReaderOptimized: false,
    })

    useEffect(() => {
        const saved = localStorage.getItem("accessibility-settings")
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setSettings(parsed)
                applySettings(parsed)
            } catch (e) {
                console.error("Failed to parse accessibility settings", e)
            }
        }
    }, [])

    const applySettings = (newSettings: AccessibilitySettings) => {
        const root = document.documentElement

        if (newSettings.highContrast) {
            root.classList.add("high-contrast")
        } else {
            root.classList.remove("high-contrast")
        }

        if (newSettings.largeText) {
            root.classList.add("text-large")
        } else {
            root.classList.remove("text-large")
        }

        localStorage.setItem("accessibility-settings", JSON.stringify(newSettings))
    }

    const toggleHighContrast = () => {
        const newSettings = { ...settings, highContrast: !settings.highContrast }
        setSettings(newSettings)
        applySettings(newSettings)
    }

    const toggleLargeText = () => {
        const newSettings = { ...settings, largeText: !settings.largeText }
        setSettings(newSettings)
        applySettings(newSettings)
    }

    return {
        ...settings,
        toggleHighContrast,
        toggleLargeText,
    }
}
