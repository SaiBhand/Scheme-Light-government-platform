/**
 * Eligibility Engine - Core Business Logic
 * 
 * This module contains the enhanced eligibility checking logic with:
 * - Detailed eligibility explanations
 * - Confidence scoring (0-100%)
 * - Document checklist generation
 * - AI-friendly simplification layer
 * 
 * Architecture:
 * - checkEligibilityWithExplanation: Main eligibility checker with detailed reasoning
 * - calculateConfidenceScore: Calculates how well user matches scheme requirements
 * - generateDocumentChecklist: Creates required/optional/missing document lists
 * - simplifyExplanation: Converts technical language to simple, human-friendly text
 */

import { schemes, type Scheme } from "./schemes-data"
import { translations, type Language } from "@/lib/translations"

// User data interface for eligibility checking
export interface UserEligibilityData {
  age: number
  gender: string
  occupation: string
  annualIncome: number
  state: string
  category: string
  isDisabled: boolean
  isWidow: boolean
  isWoman: boolean
  isFarmer: boolean
  isStudent: boolean
  isOrphan?: boolean
  landOwnership?: boolean
  currentClass?: string
  institutionType?: string
  fullName?: string
}

// Document status from user
export interface UserDocumentStatus {
  aadhaar: boolean
  bankAccount: boolean
  incomeCertificate: boolean
  categoryCertificate: boolean
}

// Eligibility check result with detailed explanation
export interface EligibilityResult {
  isEligible: boolean
  confidenceScore: number // 0-100
  explanation: string // Human-friendly explanation
  reasons: string[] // List of failed conditions (legacy compatibility)
  passedReasons: string[] // Why user IS eligible
  failedReasons: string[] // Why user is NOT eligible
  missingRequirements: string[] // What's missing if not eligible
  documentChecklist: DocumentChecklist
  improvementGuidance: ImprovementStep[]
}

export interface ImprovementStep {
  condition: string
  status: "failed" | "passed"
  message: string
  action: string
  fixLink?: string
  diff?: string
}

// Document checklist structure
export interface DocumentChecklist {
  required: string[]
  optional: string[]
  missing: string[] // Based on user's document status
  userHas: string[] // Documents user has
}

// Complete eligibility response
export interface EligibilityResponse {
  scheme: Scheme
  eligibility: EligibilityResult
  simplifiedDescription: string
}

/**
 * Main eligibility checking function with detailed explanations
 * 
 * This function checks all eligibility criteria and provides:
 * - Clear yes/no eligibility status
 * - Detailed explanation of why user is/isn't eligible
 * - Confidence score based on how well user matches requirements
 * - Document checklist with missing items
 */
export function checkEligibilityWithExplanation(
  scheme: Scheme,
  userData: UserEligibilityData,
  userDocuments: UserDocumentStatus,
  language: Language = 'en'
): EligibilityResponse {
  const t = translations[language]
  const reasons: string[] = [] // Legacy reasons (mostly failed)
  const passedReasons: string[] = []
  const failedReasons: string[] = []
  const missingRequirements: string[] = []
  const improvementGuidance: ImprovementStep[] = []
  let passedChecks = 0
  let totalChecks = 0

  if (!scheme || !scheme.eligibility) {
    return {
      scheme,
      simplifiedDescription: scheme?.simplifiedDescription || "",
      eligibility: {
        isEligible: false,
        confidenceScore: 0,
        explanation: "Incomplete scheme criteria in database.",
        reasons: ["Missing eligibility data"],
        passedReasons: [],
        failedReasons: ["Scheme criteria not fully defined"],
        missingRequirements: ["Consult administration"],
        documentChecklist: { required: [], optional: [], missing: [], userHas: [] },
        improvementGuidance: [],
      },
    }
  }

  // Check age requirements
  if (scheme.eligibility.minAge || scheme.eligibility.maxAge) {
    totalChecks++
    if (scheme.eligibility.minAge && userData.age < scheme.eligibility.minAge) {
      const diff = scheme.eligibility.minAge - userData.age
      const reason = `❌ ${t.ageMinReq.replace('{age}', scheme.eligibility.minAge.toString())} ${t.ageCurrent.replace('{age}', userData.age.toString())}`
      reasons.push(reason)
      failedReasons.push(reason)
      missingRequirements.push(t.ageWait.replace('{age}', scheme.eligibility.minAge.toString()))
      improvementGuidance.push({
        condition: t.age, // "Age"
        status: "failed",
        message: t.ageMinReq.replace('{age}', scheme.eligibility.minAge.toString()),
        action: t.actionRecheck,
        diff: `${diff} ${t.yearsPlaceholder}`
      })
    } else if (scheme.eligibility.maxAge && userData.age > scheme.eligibility.maxAge) {
      const diff = userData.age - scheme.eligibility.maxAge
      const reason = `❌ ${t.ageMaxReq.replace('{age}', scheme.eligibility.maxAge.toString())} ${t.ageCurrent.replace('{age}', userData.age.toString())}`
      reasons.push(reason)
      failedReasons.push(reason)
      missingRequirements.push(t.ageExceeded)
      improvementGuidance.push({
        condition: t.age,
        status: "failed",
        message: t.ageMaxReq.replace('{age}', scheme.eligibility.maxAge.toString()),
        action: t.actionExploreAge,
        diff: `${diff} ${t.yearsPlaceholder}`
      })
    } else {
      passedChecks++
      passedReasons.push(`✅ ${t.ageValid.replace('{age}', userData.age.toString())}`)
      improvementGuidance.push({
        condition: t.age,
        status: "passed",
        message: t.criteriaMet.replace('{label}', t.age),
        action: t.actionNone
      })
    }
  }

  // Check income limit
  if (scheme.eligibility.incomeLimit) {
    totalChecks++
    if (userData.annualIncome > scheme.eligibility.incomeLimit) {
      const diff = userData.annualIncome - scheme.eligibility.incomeLimit
      const reason = `❌ ${t.incomeMaxReq.replace('{income}', scheme.eligibility.incomeLimit.toLocaleString("en-IN"))} ${t.incomeYour.replace('{income}', userData.annualIncome.toLocaleString("en-IN"))}`
      reasons.push(reason)
      failedReasons.push(reason)
      missingRequirements.push(t.incomeExceeded)
      improvementGuidance.push({
        condition: t.annualIncome, // "Income" (using field label)
        status: "failed",
        message: t.incomeMaxReq.replace('{income}', diff.toLocaleString("en-IN")), // Reusing string differently, but acceptable for now
        action: t.actionIncomeCert,
        diff: `₹${diff.toLocaleString("en-IN")}`
      })
    } else {
      passedChecks++
      passedReasons.push(`✅ ${t.incomeValid.replace('{income}', userData.annualIncome.toLocaleString("en-IN"))}`)
      improvementGuidance.push({
        condition: t.annualIncome,
        status: "passed",
        message: t.criteriaMet.replace('{label}', t.annualIncome),
        action: t.actionNone
      })
    }
  }

  // Check category requirement
  if (scheme.eligibility.categories && !scheme.eligibility.categories.includes("All")) {
    totalChecks++
    if (!scheme.eligibility.categories.includes(userData.category)) {
      const reason = `❌ ${t.categoryReq.replace('{categories}', scheme.eligibility.categories.join(", "))} ${t.categoryYour.replace('{category}', userData.category)}`
      reasons.push(reason)
      failedReasons.push(reason)
      missingRequirements.push(t.categoryReq.replace('{categories}', scheme.eligibility.categories.join(", ")))
      improvementGuidance.push({
        condition: t.category,
        status: "failed",
        message: t.categoryReq.replace('{categories}', scheme.eligibility.categories.join(", ")),
        action: t.actionCategoryUpdate,
      })
    } else {
      passedChecks++
      passedReasons.push(`✅ ${t.categoryValid.replace('{category}', userData.category)}`)
      improvementGuidance.push({
        condition: t.category,
        status: "passed",
        message: t.criteriaMet.replace('{label}', t.category),
        action: t.actionNone
      })
    }
  }

  // Check occupation requirement
  if (scheme.eligibility.occupation && scheme.eligibility.occupation.length > 0) {
    totalChecks++
    if (!scheme.eligibility.occupation.includes(userData.occupation)) {
      const reason = `❌ ${t.occupationReq.replace('{occupation}', scheme.eligibility.occupation.join(", "))} ${t.occupationYour.replace('{occupation}', userData.occupation)}`
      reasons.push(reason)
      failedReasons.push(reason)
      missingRequirements.push(t.occupationReq.replace('{occupation}', scheme.eligibility.occupation.join(", ")))
      improvementGuidance.push({
        condition: t.occupation,
        status: "failed",
        message: t.occupationReq.replace('{occupation}', scheme.eligibility.occupation.join(", ")),
        action: t.actionExploreOcc,
      })
    } else {
      passedChecks++
      passedReasons.push(`✅ ${t.occupationValid.replace('{occupation}', userData.occupation)}`)
      improvementGuidance.push({
        condition: t.occupation,
        status: "passed",
        message: t.criteriaMet.replace('{label}', t.occupation),
        action: t.actionNone
      })
    }
  }

  // Check state requirement
  if (scheme.eligibility.states && !scheme.eligibility.states.includes("All")) {
    totalChecks++
    if (!scheme.eligibility.states.includes(userData.state)) {
      const reason = `❌ ${t.stateReq.replace('{states}', scheme.eligibility.states.join(", "))} ${t.stateYour.replace('{state}', userData.state)}`
      reasons.push(reason)
      failedReasons.push(reason)
      missingRequirements.push(t.stateReq.replace('{states}', scheme.eligibility.states.join(", ")))
      improvementGuidance.push({
        condition: t.state, // "State"
        status: "failed",
        message: t.stateReq.replace('{states}', scheme.eligibility.states.join(", ")),
        action: t.actionStateSchemes,
      })
    } else {
      passedChecks++
      passedReasons.push(`✅ ${t.stateValid.replace('{state}', userData.state)}`)
      improvementGuidance.push({
        condition: t.state, status: "passed", message: t.criteriaMet.replace('{label}', t.state), action: t.actionNone
      })
    }
  }

  // Check conditionals
  if (scheme.eligibility.conditionals) {
    const conditionals = [
      { key: "isDisabled", label: "Person with Disability", userValue: userData.isDisabled },
      { key: "isWidow", label: "Widow", userValue: userData.isWidow },
      { key: "isWoman", label: "Woman", userValue: userData.isWoman },
      { key: "isFarmer", label: "Farmer", userValue: userData.isFarmer },
      { key: "isStudent", label: "Student", userValue: userData.isStudent },
      { key: "isOrphan", label: "Orphan", userValue: userData.isOrphan },
    ]

    conditionals.forEach(cond => {
      const required = (scheme.eligibility.conditionals as any)[cond.key]
      if (required) {
        totalChecks++
        if (cond.userValue) {
          passedChecks++
          passedReasons.push(`✅ ${t.criteriaMet.replace('{label}', cond.label)}`)
          improvementGuidance.push({
            condition: cond.label,
            status: "passed",
            message: t.criteriaMet.replace('{label}', cond.label),
            action: t.actionNone
          })
        } else {
          const reason = `❌ ${t.criteriaSpecific.replace('{label}', cond.label)}`
          reasons.push(reason)
          failedReasons.push(reason)
          missingRequirements.push(cond.label)
          improvementGuidance.push({
            condition: cond.label,
            status: "failed",
            message: t.criteriaSpecific.replace('{label}', cond.label),
            action: t.actionVerifyProfile,
          })
        }
      }
    })
  }

  // Calculate confidence score (0-100%)
  const confidenceScore = totalChecks > 0
    ? Math.round((passedChecks / totalChecks) * 100)
    : 100

  // Determine eligibility (must pass ALL checks)
  const isEligible = missingRequirements.length === 0

  // Generate explanation
  const explanation = generateExplanation(isEligible, scheme, reasons, missingRequirements, confidenceScore, t)

  // Generate document checklist
  const documentChecklist = generateDocumentChecklist(scheme, userDocuments)

  // Generate simplified description
  const simplifiedDescription = simplifySchemeDescription(scheme)

  return {
    scheme,
    eligibility: {
      isEligible,
      confidenceScore,
      explanation,
      reasons,
      passedReasons,
      failedReasons,
      missingRequirements,
      documentChecklist,
      improvementGuidance
    },
    simplifiedDescription,
  }
}

/**
 * Generates human-friendly explanation of eligibility status
 */
function generateExplanation(
  isEligible: boolean,
  scheme: Scheme,
  reasons: string[],
  missingRequirements: string[],
  confidenceScore: number,
  t: any
): string {
  if (isEligible) {
    return t.eligibleMessage
      .replace('{scheme}', scheme.name)
      .replace('{score}', confidenceScore.toString())
  } else {
    // "To become eligible: {requirements}"
    const requirements = missingRequirements.length > 0
      ? t.toBecomeEligible.replace('{requirements}', missingRequirements.slice(0, 2).join(", "))
      : ""

    return `${t.notEligibleMessage.replace('{scheme}', scheme.name).replace('{score}', confidenceScore.toString())} ${requirements} ${t.checkRequirements}`
  }
}

/**
 * Generates document checklist based on scheme requirements and user's document status
 */
function generateDocumentChecklist(
  scheme: Scheme,
  userDocuments: UserDocumentStatus
): DocumentChecklist {
  const required: string[] = []
  const optional: string[] = []
  const userHas: string[] = []
  const missing: string[] = []

  // Map scheme documents to our document status
  const documentMap: Record<string, keyof UserDocumentStatus> = {
    "Aadhaar Card": "aadhaar",
    "Bank Account": "bankAccount",
    "Bank Passbook": "bankAccount",
    "Bank Account with Passbook": "bankAccount",
    "Income Certificate": "incomeCertificate",
    "Caste Certificate": "categoryCertificate",
    "Category Certificate": "categoryCertificate",
    "Caste/Category Certificate": "categoryCertificate",
  }

  if (!scheme.documents) return {
    required: [],
    optional: [],
    missing: [],
    userHas: [],
  }

  scheme.documents.forEach((doc) => {
    // Check if this is a required document
    const isCommonDoc = doc.includes("Aadhaar") ||
      doc.includes("Bank") ||
      doc.includes("Income") ||
      doc.includes("Caste") ||
      doc.includes("Category")

    if (isCommonDoc) {
      required.push(doc)

      // Check if user has this document
      const docKey = Object.keys(documentMap).find(key => doc.includes(key))
      if (docKey && documentMap[docKey]) {
        const userDocKey = documentMap[docKey]
        if (userDocuments[userDocKey]) {
          userHas.push(doc)
        } else {
          missing.push(doc)
        }
      } else {
        // Document not in our tracking system, assume missing
        missing.push(doc)
      }
    } else {
      // Other documents (like land records, certificates, etc.)
      required.push(doc)
      missing.push(doc) // Assume missing if not in our tracking
    }
  })

  return {
    required,
    optional: [], // Can be extended later
    missing,
    userHas,
  }
}

/**
 * Simplifies scheme description to human-friendly language
 * This acts as an AI simplification layer
 */
function simplifySchemeDescription(scheme: Scheme): string {
  // Use simplified description if available, otherwise create one
  if (scheme.simplifiedDescription) {
    return scheme.simplifiedDescription
  }

  // Generate simplified version from regular description
  if (!scheme) return ""
  let simplified = scheme.description || scheme.name || ""

  // Replace technical terms with simpler ones
  simplified = simplified
    .replace(/Pradhan Mantri/g, "PM")
    .replace(/Ministry of/g, "")
    .replace(/scheme/gi, "program")
    .replace(/financial assistance/gi, "money help")
    .replace(/subsidy/gi, "discount or money back")
    .replace(/eligibility/gi, "who can apply")
    .replace(/application/gi, "apply")
    .replace(/certificate/gi, "paper proof")
    .replace(/beneficiary/gi, "person who gets help")

  // Keep it short (first 150 characters)
  if (simplified.length > 150) {
    simplified = simplified.substring(0, 147) + "..."
  }

  return simplified
}

/**
 * Calculate confidence score for a scheme based on user data
 * This is used for ranking and comparison
 */
export function calculateConfidenceScore(
  scheme: Scheme,
  userData: UserEligibilityData
): number {
  let score = 0
  let maxScore = 0

  // Age match (20 points)
  if (scheme.eligibility.minAge || scheme.eligibility.maxAge) {
    maxScore += 20
    if (scheme.eligibility.minAge && scheme.eligibility.maxAge) {
      if (userData.age >= scheme.eligibility.minAge && userData.age <= scheme.eligibility.maxAge) {
        score += 20
      } else {
        const distance = Math.min(
          Math.abs(userData.age - (scheme.eligibility.minAge || 0)),
          Math.abs(userData.age - (scheme.eligibility.maxAge || 100))
        )
        score += Math.max(0, 20 - distance * 2) // Penalize by distance
      }
    } else if (scheme.eligibility.minAge && userData.age >= scheme.eligibility.minAge) {
      score += 20
    } else if (scheme.eligibility.maxAge && userData.age <= scheme.eligibility.maxAge) {
      score += 20
    }
  }

  // Income match (20 points)
  if (scheme.eligibility.incomeLimit) {
    maxScore += 20
    if (userData.annualIncome <= scheme.eligibility.incomeLimit) {
      const ratio = userData.annualIncome / scheme.eligibility.incomeLimit
      score += 20 * (1 - ratio * 0.5) // Prefer lower income (closer to limit = lower score)
    }
  }

  // Category match (15 points)
  if (scheme.eligibility.categories) {
    maxScore += 15
    if (scheme.eligibility.categories.includes("All") || scheme.eligibility.categories.includes(userData.category)) {
      score += 15
    }
  }

  // Occupation match (15 points)
  if (scheme.eligibility.occupation) {
    maxScore += 15
    if (scheme.eligibility.occupation.includes(userData.occupation)) {
      score += 15
    }
  }

  // Gender match (10 points)
  if (scheme.eligibility.gender) {
    maxScore += 10
    if (userData.gender === scheme.eligibility.gender) {
      score += 10
    }
  }

  // State match (10 points)
  if (scheme.eligibility.states) {
    maxScore += 10
    if (scheme.eligibility.states.includes("All") || scheme.eligibility.states.includes(userData.state)) {
      score += 10
    }
  }

  // Conditional matches (10 points total)
  if (scheme.eligibility.conditionals) {
    const conditionals = scheme.eligibility.conditionals
    const conditionalChecks = [
      { key: "isDisabled", value: userData.isDisabled },
      { key: "isWoman", value: userData.isWoman },
      { key: "isFarmer", value: userData.isFarmer },
      { key: "isStudent", value: userData.isStudent },
      { key: "isWidow", value: userData.isWidow },
      { key: "isOrphan", value: userData.isOrphan || false },
    ]

    conditionalChecks.forEach((check) => {
      if (conditionals[check.key as keyof typeof conditionals]) {
        maxScore += 2
        if (check.value) {
          score += 2
        }
      }
    })
  }

  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 100
}

