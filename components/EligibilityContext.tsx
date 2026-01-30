"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { type EligibilityResponse, type UserEligibilityData, type UserDocumentStatus } from "@/lib/eligibility-engine"

export interface EligibilityForm {
    fullName: string
    age: string
    gender: string
    occupation: string
    annualIncome: string
    state: string
    category: string
    language: string
    isDisabled: boolean
    isWidow: boolean
    isOrphan?: boolean
    landOwnership?: boolean
    landArea?: string
    currentClass?: string
    institutionType?: string
}

export interface DocumentStatus {
    aadhaar: boolean
    bankAccount: boolean
    incomeCertificate: boolean
    categoryCertificate: boolean
}

interface EligibilityContextType {
    formData: EligibilityForm
    setFormData: (data: EligibilityForm) => void
    documentStatus: DocumentStatus
    setDocumentStatus: (status: DocumentStatus) => void
    enhancedResults: EligibilityResponse[]
    setEnhancedResults: (results: EligibilityResponse[]) => void
    showResults: boolean
    setShowResults: (show: boolean) => void
    eligibleSchemes: any[]
    setEligibleSchemes: (schemes: any[]) => void
    notEligibleSchemes: any[]
    setNotEligibleSchemes: (schemes: any[]) => void
    resetEligibility: () => void
}

const defaultFormData: EligibilityForm = {
    fullName: "",
    age: "",
    gender: "",
    occupation: "",
    annualIncome: "",
    state: "",
    category: "",
    language: "English",
    isDisabled: false,
    isWidow: false,
    isOrphan: false,
}

const defaultDocumentStatus: DocumentStatus = {
    aadhaar: false,
    bankAccount: false,
    incomeCertificate: false,
    categoryCertificate: false,
}

const EligibilityContext = createContext<EligibilityContextType | undefined>(undefined)

export function EligibilityProvider({ children }: { children: React.ReactNode }) {
    const [formData, setFormData] = useState<EligibilityForm>(defaultFormData)
    const [documentStatus, setDocumentStatus] = useState<DocumentStatus>(defaultDocumentStatus)
    const [enhancedResults, setEnhancedResults] = useState<EligibilityResponse[]>([])
    const [showResults, setShowResults] = useState(false)
    const [eligibleSchemes, setEligibleSchemes] = useState<any[]>([])
    const [notEligibleSchemes, setNotEligibleSchemes] = useState<any[]>([])

    const [isInitialized, setIsInitialized] = useState(false)

    // Load from local storage on mount
    useEffect(() => {
        const savedForm = localStorage.getItem("eligibility_form")
        const savedDocs = localStorage.getItem("document_status")
        const savedResults = localStorage.getItem("eligibility_results")
        const savedShow = localStorage.getItem("show_results")
        const savedEligible = localStorage.getItem("eligible_schemes")
        const savedNotEligible = localStorage.getItem("not_eligible_schemes")

        if (savedForm) setFormData(JSON.parse(savedForm))
        if (savedDocs) setDocumentStatus(JSON.parse(savedDocs))
        if (savedResults) setEnhancedResults(JSON.parse(savedResults))
        if (savedShow) setShowResults(JSON.parse(savedShow))
        if (savedEligible) setEligibleSchemes(JSON.parse(savedEligible))
        if (savedNotEligible) setNotEligibleSchemes(JSON.parse(savedNotEligible))

        setIsInitialized(true)
    }, [])

    // Save to local storage on change
    useEffect(() => {
        if (!isInitialized) return
        localStorage.setItem("eligibility_form", JSON.stringify(formData))
    }, [formData, isInitialized])

    useEffect(() => {
        if (!isInitialized) return
        localStorage.setItem("document_status", JSON.stringify(documentStatus))
    }, [documentStatus, isInitialized])

    useEffect(() => {
        if (!isInitialized) return
        localStorage.setItem("eligibility_results", JSON.stringify(enhancedResults))
    }, [enhancedResults, isInitialized])

    useEffect(() => {
        if (!isInitialized) return
        localStorage.setItem("show_results", JSON.stringify(showResults))
    }, [showResults, isInitialized])

    useEffect(() => {
        if (!isInitialized) return
        localStorage.setItem("eligible_schemes", JSON.stringify(eligibleSchemes))
    }, [eligibleSchemes, isInitialized])

    useEffect(() => {
        if (!isInitialized) return
        localStorage.setItem("not_eligible_schemes", JSON.stringify(notEligibleSchemes))
    }, [notEligibleSchemes, isInitialized])

    const resetEligibility = () => {
        setFormData(defaultFormData)
        setDocumentStatus(defaultDocumentStatus)
        setEnhancedResults([])
        setShowResults(false)
        setEligibleSchemes([])
        setNotEligibleSchemes([])
        localStorage.removeItem("eligibility_form")
        localStorage.removeItem("document_status")
        localStorage.removeItem("eligibility_results")
        localStorage.removeItem("show_results")
        localStorage.removeItem("eligible_schemes")
        localStorage.removeItem("not_eligible_schemes")
    }

    return (
        <EligibilityContext.Provider
            value={{
                formData,
                setFormData,
                documentStatus,
                setDocumentStatus,
                enhancedResults,
                setEnhancedResults,
                showResults,
                setShowResults,
                eligibleSchemes,
                setEligibleSchemes,
                notEligibleSchemes,
                setNotEligibleSchemes,
                resetEligibility,
            }}
        >
            {children}
        </EligibilityContext.Provider>
    )
}

export function useEligibility() {
    const context = useContext(EligibilityContext)
    if (context === undefined) {
        throw new Error("useEligibility must be used within an EligibilityProvider")
    }
    return context
}
