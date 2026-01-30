import { createClient } from "./server"

export async function getSchemesFromDb() {
    try {
        const supabase = await createClient()
        const { data: dbSchemes, error } = await supabase
            .from("schemes")
            .select("*")

        if (error || !dbSchemes) {
            console.error("Error fetching schemes from Supabase:", error)
            return []
        }

        // Map database schemes (snake_case) to Scheme interface (camelCase)
        return dbSchemes.map((s: any) => ({
            ...s,
            targetGroup: s.target_group,
            applicationMode: s.application_mode,
            applyUrl: s.apply_url,
            keyBenefits: s.key_benefits,
            howToApply: s.how_to_apply,
            simplifiedDescription: s.simplified_description,
            offlineAssistance: s.offline_assistance,
            videoTutorialUrl: s.video_tutorial_url,
            lastUpdated: s.last_updated
        }))
    } catch (err) {
        console.error("Fatal error in getSchemesFromDb:", err)
        return []
    }
}
