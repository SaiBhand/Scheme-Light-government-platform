/**
 * API Route: /api/check-eligibility
 * 
 * This endpoint checks eligibility for all schemes based on user data.
 * Returns detailed eligibility results with explanations, confidence scores, and document checklists.
 * 
 * Request Body:
 * {
 *   userData: UserEligibilityData,
 *   userDocuments: UserDocumentStatus
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   results: EligibilityResponse[],
 *   summary: {
 *     totalSchemes: number,
 *     eligibleCount: number,
 *     notEligibleCount: number
 *   }
 * }
 */

import { NextRequest, NextResponse } from "next/server"
import { schemes } from "@/lib/schemes-data"
import {
  checkEligibilityWithExplanation,
  type UserEligibilityData,
  type UserDocumentStatus,
  type EligibilityResponse,
} from "@/lib/eligibility-engine"
import { createClient } from "@/lib/supabase/server"
import { getSchemesFromDb } from "@/lib/supabase/schemes"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userData, userDocuments } = body

    // Validate request data
    if (!userData) {
      return NextResponse.json(
        { success: false, error: "userData is required" },
        { status: 400 }
      )
    }

    if (!userDocuments) {
      return NextResponse.json(
        { success: false, error: "userDocuments is required" },
        { status: 400 }
      )
    }

    // Validate userData fields
    const requiredFields = ["age", "gender", "occupation", "annualIncome", "state", "category"]
    for (const field of requiredFields) {
      if (userData[field] === undefined || userData[field] === null || userData[field] === "") {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Fetch and map schemes from database
    const activeSchemes = await getSchemesFromDb()

    if (!activeSchemes || activeSchemes.length === 0) {
      return NextResponse.json({
        success: true,
        results: [],
        summary: {
          totalSchemes: 0,
          eligibleCount: 0,
          notEligibleCount: 0,
        },
      })
    }

    // Process all schemes
    const results: EligibilityResponse[] = activeSchemes.map((scheme) =>
      checkEligibilityWithExplanation(
        scheme,
        userData as UserEligibilityData,
        userDocuments as UserDocumentStatus
      )
    )

    // Sort by eligibility status and confidence score
    results.sort((a, b) => {
      // Eligible schemes first
      if (a.eligibility.isEligible && !b.eligibility.isEligible) return -1
      if (!a.eligibility.isEligible && b.eligibility.isEligible) return 1
      // Then by confidence score (higher first)
      return b.eligibility.confidenceScore - a.eligibility.confidenceScore
    })

    // Calculate summary
    const eligibleCount = results.filter((r) => r.eligibility.isEligible).length
    const notEligibleCount = results.length - eligibleCount

    // Save eligibility logs to Supabase (if user is authenticated)
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // Save user profile if it doesn't exist or update it
        await supabase.from("user_profiles").upsert({
          id: user.id,
          full_name: userData.fullName || null,
          age: userData.age || null,
          gender: userData.gender || null,
          occupation: userData.occupation || null,
          annual_income: userData.annualIncome || null,
          state: userData.state || null,
          category: userData.category || null,
          is_disabled: userData.isDisabled || false,
          is_widow: userData.isWidow || false,
          is_orphan: userData.isOrphan || false,
          land_ownership: userData.landOwnership || null,
          current_class: userData.currentClass || null,
          institution_type: userData.institutionType || null,
        })

        // Save document status
        await supabase.from("document_status").upsert({
          user_id: user.id,
          aadhaar: userDocuments.aadhaar || false,
          bank_account: userDocuments.bankAccount || false,
          income_certificate: userDocuments.incomeCertificate || false,
          category_certificate: userDocuments.categoryCertificate || false,
        })

        // Save eligibility logs for all checked schemes
        const logsToInsert = results.map((result) => ({
          user_id: user.id,
          scheme_id: result.scheme.id,
          scheme_name: result.scheme.name,
          is_eligible: result.eligibility.isEligible,
          confidence_score: result.eligibility.confidenceScore,
          user_data: userData,
          eligibility_result: result.eligibility,
        }))

        if (logsToInsert.length > 0) {
          await supabase.from("eligibility_logs").insert(logsToInsert)
        }
      }
    } catch (error) {
      // Log error but don't fail the request
      console.error("Error saving eligibility logs:", error)
    }

    return NextResponse.json({
      success: true,
      results,
      summary: {
        totalSchemes: results.length,
        eligibleCount,
        notEligibleCount,
      },
    })
  } catch (error) {
    console.error("Error checking eligibility:", error)
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

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({
    message: "Use POST method to check eligibility",
    endpoint: "/api/check-eligibility",
    requiredFields: [
      "userData: { age, gender, occupation, annualIncome, state, category, isDisabled, isWidow, isWoman, isFarmer, isStudent }",
      "userDocuments: { aadhaar, bankAccount, incomeCertificate, categoryCertificate }",
    ],
  })
}

