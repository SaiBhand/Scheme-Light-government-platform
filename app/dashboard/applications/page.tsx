"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function ApplicationsPage() {
    const { toast } = useToast()

    const applications = [
        {
            id: "APP-2024-001",
            scheme: "PM Kisan Samman Nidhi",
            date: "Feb 28, 2024",
            status: "In Progress",
            step: "District Review",
        },
        {
            id: "APP-2023-089",
            scheme: "Ayushman Bharat Card",
            date: "Dec 15, 2023",
            status: "Approved",
            step: "Card Generated",
        },
        {
            id: "APP-2023-042",
            scheme: "Pre-Matric Scholarship",
            date: "Aug 10, 2023",
            status: "Rejected",
            step: "Document Mismatch",
        },
    ]

    const router = useRouter()

    const handleViewDetails = (id: string, schemeName: string) => {
        router.push(`/dashboard/applications/${id}`)
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
                <p className="text-muted-foreground mt-2">Track the status of your submitted applications.</p>
            </div>

            <div className="grid gap-4">
                {applications.map((app) => (
                    <Card key={app.id}>
                        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-mono text-muted-foreground">{app.id}</span>
                                    <span className="text-xs text-muted-foreground">• {app.date}</span>
                                </div>
                                <h3 className="text-lg font-bold">{app.scheme}</h3>
                                <p className="text-sm text-muted-foreground mt-1">Current Stage: {app.step}</p>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                {app.status === "Approved" && <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>}
                                {app.status === "In Progress" && <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>}
                                {app.status === "Rejected" && <Badge variant="destructive">Rejected</Badge>}

                                <Button variant="outline" size="sm" onClick={() => handleViewDetails(app.id, app.scheme)}>
                                    View Details
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
