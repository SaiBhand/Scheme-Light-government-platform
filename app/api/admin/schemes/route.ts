import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from("schemes")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized or server error" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const body = await request.json()

        // Map frontend keys to snake_case for database if necessary, 
        // but I've kept them similar minus the casing consistency.
        // Let's ensure consistency here.
        const dbData = {
            id: body.id || `SCH-${Date.now()}`,
            name: body.name,
            ministry: body.ministry,
            target_group: body.targetGroup,
            benefit: body.benefit,
            icon: body.icon,
            eligibility: body.eligibility,
            documents: body.documents,
            application_mode: body.applicationMode,
            apply_url: body.applyUrl,
            description: body.description,
            key_benefits: body.keyBenefits,
            how_to_apply: body.howToApply,
            status: body.status,
            keywords: body.keywords,
            simplified_description: body.simplifiedDescription,
            offline_assistance: body.offlineAssistance,
            video_tutorial_url: body.videoTutorialUrl,
            last_updated: new Date().toISOString()
        }

        const { data, error } = await supabase
            .from("schemes")
            .upsert(dbData)
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized or server error" }, { status: 500 })
    }
}
