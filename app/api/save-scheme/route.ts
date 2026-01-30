import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }

        const { schemeId, schemeName, action } = await request.json()

        if (action === "save") {
            const { error } = await supabase
                .from("saved_schemes")
                .upsert({
                    user_id: user.id,
                    scheme_id: schemeId,
                    scheme_name: schemeName
                }, { onConflict: "user_id,scheme_id" })

            if (error) {
                console.error("SAVE SCHEME UPSERT ERROR:", error.message)
                throw error
            }
        } else if (action === "unsave") {
            const { error } = await supabase
                .from("saved_schemes")
                .delete()
                .eq("user_id", user.id)
                .eq("scheme_id", schemeId)

            if (error) {
                console.error("SAVE SCHEME DELETE ERROR:", error.message)
                throw error
            }
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error("FATAL POST SAVE SCHEME ERROR:", error.message)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }

        const { data, error } = await supabase
            .from("saved_schemes")
            .select("*")
            .eq("user_id", user.id)

        if (error) {
            console.error("GET SAVED SCHEMES ERROR:", error.message)
            throw error
        }

        return NextResponse.json({ success: true, savedSchemes: data || [] })
    } catch (error: any) {
        console.error("FATAL GET SAVE SCHEME ERROR:", error.message)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
