/**
 * API Route: /api/explain-scheme
 * 
 * This endpoint provides detailed explanation of a specific scheme.
 * Returns eligibility explanation, document checklist, and simplified description.
 * 
 * Request Body:
 * {
 *   schemeId: string,
 *   userData?: UserEligibilityData,
 *   userDocuments?: UserDocumentStatus
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   scheme: Scheme,
 *   explanation: EligibilityResult,
 *   simplifiedDescription: string
 * }
 */

import { NextRequest, NextResponse } from "next/server"
import { getSchemesFromDb } from "@/lib/supabase/schemes"
import {
  checkEligibilityWithExplanation,
  type UserEligibilityData,
  type UserDocumentStatus,
} from "@/lib/eligibility-engine"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { schemeId, userData, userDocuments } = body

    // Validate schemeId
    if (!schemeId) {
      return NextResponse.json(
        { success: false, error: "schemeId is required" },
        { status: 400 }
      )
    }

    // Find scheme
    const activeSchemes = await getSchemesFromDb()
    const scheme = activeSchemes.find((s) => s.id === schemeId)
    if (!scheme) {
      return NextResponse.json(
        { success: false, error: `Scheme with ID ${schemeId} not found` },
        { status: 404 }
      )
    }

    // If user data provided, check eligibility
    if (userData && userDocuments) {
      const result = checkEligibilityWithExplanation(
        scheme,
        userData as UserEligibilityData,
        userDocuments as UserDocumentStatus
      )

      return NextResponse.json({
        success: true,
        scheme,
        explanation: result.eligibility,
        simplifiedDescription: result.simplifiedDescription,
      })
    }

    // Otherwise, return scheme info without eligibility check
    return NextResponse.json({
      success: true,
      scheme,
      explanation: {
        isEligible: null,
        confidenceScore: null,
        explanation: "Provide userData and userDocuments to check eligibility",
        reasons: [],
        missingRequirements: [],
        documentChecklist: {
          required: scheme.documents,
          optional: [],
          missing: scheme.documents,
          userHas: [],
        },
      },
      simplifiedDescription: scheme.simplifiedDescription || scheme.description,
    })
  } catch (error) {
    console.error("Error explaining scheme:", error)
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
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const schemeId = searchParams.get("schemeId")

  if (!schemeId) {
    const activeSchemes = await getSchemesFromDb()
    return NextResponse.json({
      message: "Use POST method or provide schemeId as query parameter",
      endpoint: "/api/explain-scheme",
      availableSchemes: activeSchemes.map((s: any) => ({ id: s.id, name: s.name })),
    })
  }

  const activeSchemes = await getSchemesFromDb()
  const scheme = activeSchemes.find((s) => s.id === schemeId)
  if (!scheme) {
    return NextResponse.json(
      { success: false, error: `Scheme with ID ${schemeId} not found` },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    scheme,
    simplifiedDescription: scheme.simplifiedDescription || scheme.description,
  })
}

