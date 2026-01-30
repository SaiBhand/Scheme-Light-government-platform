/**
 * API Route: /api/compare-schemes
 * 
 * This endpoint compares 2-3 schemes side by side.
 * Returns comparison of eligibility, benefits, requirements, and confidence scores.
 * 
 * Request Body:
 * {
 *   schemeIds: string[] (2-3 scheme IDs),
 *   userData: UserEligibilityData,
 *   userDocuments: UserDocumentStatus
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   comparison: {
 *     schemes: EligibilityResponse[],
 *     bestMatch: EligibilityResponse,
 *     comparisonTable: ComparisonRow[]
 *   }
 * }
 */

import { NextRequest, NextResponse } from "next/server"
import { type Scheme } from "@/lib/schemes-data"
import { getSchemesFromDb } from "@/lib/supabase/schemes"
import {
  checkEligibilityWithExplanation,
  type UserEligibilityData,
  type UserDocumentStatus,
  type EligibilityResponse,
} from "@/lib/eligibility-engine"

interface ComparisonRow {
  criteria: string
  scheme1: string | number | boolean
  scheme2: string | number | boolean
  scheme3?: string | number | boolean
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { schemeIds, userData, userDocuments } = body

    // Validate inputs
    if (!schemeIds || !Array.isArray(schemeIds)) {
      return NextResponse.json(
        { success: false, error: "schemeIds must be an array" },
        { status: 400 }
      )
    }

    if (schemeIds.length < 2 || schemeIds.length > 3) {
      return NextResponse.json(
        { success: false, error: "Please provide 2-3 scheme IDs to compare" },
        { status: 400 }
      )
    }

    if (!userData || !userDocuments) {
      return NextResponse.json(
        { success: false, error: "userData and userDocuments are required" },
        { status: 400 }
      )
    }

    // Fetch and find schemes
    const activeSchemes = await getSchemesFromDb()
    const schemeResults: EligibilityResponse[] = []

    for (const schemeId of schemeIds) {
      const scheme = activeSchemes.find((s) => s.id === schemeId)
      if (!scheme) {
        return NextResponse.json(
          { success: false, error: `Scheme with ID ${schemeId} not found` },
          { status: 404 }
        )
      }

      const result = checkEligibilityWithExplanation(
        scheme,
        userData as UserEligibilityData,
        userDocuments as UserDocumentStatus
      )
      schemeResults.push(result)
    }

    // Find best match (highest confidence score among eligible schemes, or highest overall)
    const eligibleSchemes = schemeResults.filter((r) => r.eligibility.isEligible)
    const bestMatch = eligibleSchemes.length > 0
      ? eligibleSchemes.reduce((best, current) =>
        current.eligibility.confidenceScore > best.eligibility.confidenceScore ? current : best
      )
      : schemeResults.reduce((best, current) =>
        current.eligibility.confidenceScore > best.eligibility.confidenceScore ? current : best
      )

    // Create comparison table
    const comparisonTable: ComparisonRow[] = [
      {
        criteria: "Scheme Name",
        scheme1: schemeResults[0].scheme.name,
        scheme2: schemeResults[1].scheme.name,
        scheme3: schemeResults[2]?.scheme.name,
      },
      {
        criteria: "Eligibility Status",
        scheme1: schemeResults[0].eligibility.isEligible ? "✅ Eligible" : "❌ Not Eligible",
        scheme2: schemeResults[1].eligibility.isEligible ? "✅ Eligible" : "❌ Not Eligible",
        scheme3: schemeResults[2]?.eligibility.isEligible ? "✅ Eligible" : "❌ Not Eligible",
      },
      {
        criteria: "Confidence Score",
        scheme1: `${schemeResults[0].eligibility.confidenceScore}%`,
        scheme2: `${schemeResults[1].eligibility.confidenceScore}%`,
        scheme3: schemeResults[2] ? `${schemeResults[2].eligibility.confidenceScore}%` : undefined,
      },
      {
        criteria: "Benefit",
        scheme1: schemeResults[0].scheme.benefit,
        scheme2: schemeResults[1].scheme.benefit,
        scheme3: schemeResults[2]?.scheme.benefit,
      },
      {
        criteria: "Application Mode",
        scheme1: schemeResults[0].scheme.applicationMode,
        scheme2: schemeResults[1].scheme.applicationMode,
        scheme3: schemeResults[2]?.scheme.applicationMode,
      },
      {
        criteria: "Required Documents",
        scheme1: schemeResults[0].scheme.documents.length,
        scheme2: schemeResults[1].scheme.documents.length,
        scheme3: schemeResults[2]?.scheme.documents.length,
      },
      {
        criteria: "Missing Documents",
        scheme1: schemeResults[0].eligibility.documentChecklist.missing.length,
        scheme2: schemeResults[1].eligibility.documentChecklist.missing.length,
        scheme3: schemeResults[2]?.eligibility.documentChecklist.missing.length,
      },
    ]

    // Add age requirement if applicable
    if (
      schemeResults[0].scheme.eligibility.minAge ||
      schemeResults[0].scheme.eligibility.maxAge ||
      schemeResults[1].scheme.eligibility.minAge ||
      schemeResults[1].scheme.eligibility.maxAge
    ) {
      const getAgeRange = (scheme: Scheme) => {
        if (scheme.eligibility.minAge && scheme.eligibility.maxAge) {
          return `${scheme.eligibility.minAge}-${scheme.eligibility.maxAge} years`
        }
        if (scheme.eligibility.minAge) {
          return `Min: ${scheme.eligibility.minAge} years`
        }
        if (scheme.eligibility.maxAge) {
          return `Max: ${scheme.eligibility.maxAge} years`
        }
        return "Any age"
      }

      comparisonTable.push({
        criteria: "Age Requirement",
        scheme1: getAgeRange(schemeResults[0].scheme),
        scheme2: getAgeRange(schemeResults[1].scheme),
        scheme3: schemeResults[2] ? getAgeRange(schemeResults[2].scheme) : undefined,
      })
    }

    // Add income limit if applicable
    if (
      schemeResults[0].scheme.eligibility.incomeLimit ||
      schemeResults[1].scheme.eligibility.incomeLimit
    ) {
      comparisonTable.push({
        criteria: "Income Limit",
        scheme1: schemeResults[0].scheme.eligibility.incomeLimit
          ? `₹${schemeResults[0].scheme.eligibility.incomeLimit.toLocaleString("en-IN")}`
          : "No limit",
        scheme2: schemeResults[1].scheme.eligibility.incomeLimit
          ? `₹${schemeResults[1].scheme.eligibility.incomeLimit.toLocaleString("en-IN")}`
          : "No limit",
        scheme3: schemeResults[2]?.scheme.eligibility.incomeLimit
          ? `₹${schemeResults[2].scheme.eligibility.incomeLimit.toLocaleString("en-IN")}`
          : "No limit",
      })
    }

    return NextResponse.json({
      success: true,
      comparison: {
        schemes: schemeResults,
        bestMatch,
        comparisonTable,
      },
    })
  } catch (error) {
    console.error("Error comparing schemes:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

// Handle GET requests
export async function GET() {
  return NextResponse.json({
    message: "Use POST method to compare schemes",
    endpoint: "/api/compare-schemes",
    requiredFields: [
      "schemeIds: string[] (2-3 scheme IDs)",
      "userData: UserEligibilityData",
      "userDocuments: UserDocumentStatus",
    ],
    example: {
      schemeIds: ["F01", "H01"],
      userData: {
        age: 25,
        gender: "female",
        occupation: "farmer",
        annualIncome: 50000,
        state: "maharashtra",
        category: "General",
        isDisabled: false,
        isWidow: false,
        isWoman: true,
        isFarmer: true,
        isStudent: false
      },
      userDocuments: {
        aadhaar: true,
        bankAccount: true,
        incomeCertificate: false,
        categoryCertificate: false
      },
    },
  })
}

