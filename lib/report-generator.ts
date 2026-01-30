import jsPDF from "jspdf"
import type { UserEligibilityData, EligibilityResponse } from "./eligibility-engine"

/**
 * Generates a professional PDF eligibility report for the user
 * 
 * @param userData The user's profile information
 * @param results The eligibility results for various schemes
 * @param fileName Optional filename for the generated PDF
 */
export const generateEligibilityReport = (
    userData: UserEligibilityData,
    results: EligibilityResponse[],
    fileName: string = "SchemeLight_Eligibility_Report.pdf"
) => {
    const doc = new jsPDF()
    const eligibleSchemes = results.filter(r => r.eligibility.isEligible)

    // Set fonts and colors
    doc.setFont("helvetica")

    // Header
    doc.setFillColor(30, 41, 59) // slate-800
    doc.rect(0, 0, 210, 40, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.text("SchemeLight", 20, 25)

    doc.setFontSize(10)
    doc.text("AI-Based Government Scheme Eligibility & Guidance System", 20, 32)

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 150, 25)

    // User Profile Section
    let yPos = 55
    doc.setTextColor(30, 41, 59)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("User Profile Summary", 20, yPos)

    yPos += 10
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(71, 85, 105) // slate-600

    const profileItems = [
        `Name: ${sanitizeForPdf(userData.fullName) || "N/A"}`,
        `Age: ${userData.age} years`,
        `Gender: ${sanitizeForPdf(userData.gender)}`,
        `Occupation: ${sanitizeForPdf(userData.occupation)}`,
        `Annual Income: Rs. ${Number(userData.annualIncome).toLocaleString("en-IN")}`, // Hardcode Rs. to be safe
        `State: ${sanitizeForPdf(userData.state?.replace("-", " "))}`,
        `Category: ${sanitizeForPdf(userData.category)}`
    ]

    profileItems.forEach((item, index) => {
        const x = index % 2 === 0 ? 20 : 110
        const y = yPos + Math.floor(index / 2) * 8
        // Double check sanitization just in case
        doc.text(sanitizeForPdf(item), x, y)
        if (index === profileItems.length - 1) yPos = y + 15
    })

    // Eligible Schemes Section
    doc.setFillColor(16, 185, 129) // emerald-500
    doc.rect(20, yPos, 170, 10, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text(`${eligibleSchemes.length} Eligible Schemes Identified`, 25, yPos + 7)

    yPos += 20

    if (eligibleSchemes.length === 0) {
        doc.setTextColor(100, 116, 139)
        doc.setFont("helvetica", "italic")
        doc.text("No eligible schemes found based on your current profile.", 20, yPos)
    } else {
        eligibleSchemes.forEach((result, index) => {
            // Check for page break
            if (yPos > 250) {
                doc.addPage()
                yPos = 30
            }

            const { scheme, eligibility } = result

            // Scheme Title
            doc.setTextColor(30, 41, 59)
            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.text(`${index + 1}. ${sanitizeForPdf(scheme.name)}`, 20, yPos)

            yPos += 6
            doc.setTextColor(79, 70, 229) // indigo-600
            doc.setFontSize(9)
            doc.text(sanitizeForPdf(scheme.ministry), 20, yPos)

            yPos += 8
            doc.setTextColor(51, 65, 85) // slate-700
            doc.setFont("helvetica", "normal")
            doc.setFontSize(10)

            // Benefit
            doc.setFont("helvetica", "bold")
            doc.text("Benefit:", 20, yPos)
            doc.setFont("helvetica", "normal")
            const benefitLines = doc.splitTextToSize(sanitizeForPdf(scheme.benefit), 140)
            doc.text(benefitLines, 45, yPos)

            // Adjust yPos based on benefit lines
            yPos += 5 + (benefitLines.length * 4)

            // Why Eligible
            doc.setFont("helvetica", "bold")
            doc.setTextColor(5, 150, 105) // emerald-600
            doc.text("Why you qualify:", 20, yPos)
            doc.setFont("helvetica", "normal")
            doc.setTextColor(51, 65, 85)

            let reasonY = yPos + 6
            eligibility.passedReasons.slice(0, 3).forEach(reason => {
                // Remove checkmark if present, then sanitize
                const cleanReason = sanitizeForPdf(reason.replace(/✅/g, "").replace(/^ +/, ""))
                doc.text(`- ${cleanReason}`, 25, reasonY)
                reasonY += 5
            })

            yPos = reasonY + 2

            // Documents Required
            doc.setFont("helvetica", "bold")
            doc.text("Key Documents:", 20, yPos)
            doc.setFont("helvetica", "normal")
            const docList = scheme.documents.slice(0, 3).map(d => sanitizeForPdf(d)).join(", ")
            const docLines = doc.splitTextToSize(docList, 130)
            doc.text(docLines, 55, yPos)

            yPos += 10 + (docLines.length * 4)

            // Add a small divider
            doc.setDrawColor(226, 232, 240)
            doc.line(20, yPos - 5, 190, yPos - 5)
        })
    }

    // Footer Disclaimer
    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184)
    const footerY = 285
    doc.text("Disclaimer: This is an AI-generated report for guidance only. Please verify details on official government portals before applying.", 105, footerY, { align: "center" })

    // Save the PDF
    doc.save(fileName)
}

/**
 * Helper to sanitize text for PDF generation
 * Standard PDF fonts only support ASCII/Latin-1, so we need to:
 * 1. Replace common symbols (₹ -> Rs.)
 * 2. Remove emojis and other unsupported unicode
 */
const sanitizeForPdf = (text: string | number | undefined | null): string => {
    if (text === undefined || text === null) return ""
    const str = String(text)

    return str
        .replace(/₹/g, "Rs. ")
        .replace(/\u20B9/g, "Rs. ") // Rupee symbol unicode
        .replace(/[^\x00-\x7F]+/g, "") // Remove non-ASCII characters
        .trim()
}
