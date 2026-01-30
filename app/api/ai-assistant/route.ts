/**
 * API Route: /api/ai-assistant
 *
 * SchemeSaathi – AI Assistant for SchemeLight
 * Quota-safe, grounded, production-ready implementation
 */

import { NextRequest, NextResponse } from "next/server";
import { getSchemesFromDb } from "@/lib/supabase/schemes";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure API key exists
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ BEST MODEL FOR FREE TIER
const MODEL_NAME = "models/gemini-flash-lite-latest";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, userProfile, eligibleSchemes, images } = body;

    // Basic validation
    if (!message && (!images || images.length === 0)) {
      return NextResponse.json(
        { success: false, error: "Message or image is required" },
        { status: 400 }
      );
    }

    // Map eligible scheme details (grounding data)
    const activeSchemes = await getSchemesFromDb();
    const eligibleSchemeDetails = (eligibleSchemes || [])
      .map((s: any) => {
        const scheme = activeSchemes.find((sc) => sc.id === s.id);
        if (!scheme) return null;

        return {
          id: scheme.id,
          name: scheme.name,
          benefit: scheme.benefit,
          description:
            scheme.simplifiedDescription || scheme.description,
          documents: scheme.documents,
          howToApply: scheme.howToApply,
          applyUrl: scheme.applyUrl,
        };
      })
      .filter(Boolean);

    // System prompt (STRICT grounding)
    const systemPrompt = `
You are SchemeSaathi, an Expert GovTech AI Assistant for the SchemeLight platform.

USER PROFILE:
${JSON.stringify(userProfile, null, 2)}

ELIGIBLE GOVERNMENT SCHEMES (YOUR ONLY DATA SOURCE):
${JSON.stringify(eligibleSchemeDetails, null, 2)}

STRICT RULES:
1. Answer ONLY using the schemes and data provided above.
2. Do NOT invent schemes, benefits, rules, or amounts.
3. If information is missing, clearly say "I do not have that information."
4. If the question is unrelated, politely redirect to scheme guidance.
5. Tone: Professional, supportive, empathetic towards citizens.
6. GUIDANCE LAYER: Always conclude your response with a clear "### 🚀 Next Steps" section.
7. Under "Next Steps", explicitly list:
   - What documents to collect immediately (from the data).
   - The application mode (Online/Offline).
   - The verified application URL (if available).
8. TRUST INDICATOR: End every response with a single line: "--- \n*Answer generated using verified government data. Updated: 2024-01-10.*"
`;

    // Build message parts
    const parts: any[] = [];

    if (message) {
      parts.push({ text: message });
    }

    if (images && Array.isArray(images)) {
      images.forEach((img: any) => {
        if (img.inlineData) {
          parts.push({ inlineData: img.inlineData });
        }
      });
    }

    // Initialize model
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
    });

    // Start chat
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text:
                "Understood. I will respond strictly using the provided scheme data.",
            },
          ],
        },
      ],
    });

    // Generate response
    const result = await chat.sendMessage(parts);
    const responseText = result.response.text();

    return NextResponse.json({
      success: true,
      response: responseText,
    });
  } catch (error: any) {
    console.error("AI ASSISTANT ERROR:", error);

    // ✅ Handle quota limit cleanly
    if (error?.status === 429) {
      return NextResponse.json(
        {
          success: false,
          error: "AI quota limit reached",
          message:
            "The AI assistant has reached its daily usage limit. Please try again later.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate AI response",
        message:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
