"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2, Clock, FileText } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ApplicationDetailsPage() {
    const params = useParams()
    const id = params.id as string

    // Mock data - in a real app, fetch based on ID
    const application = {
        id: id,
        scheme: "PM Kisan Samman Nidhi",
        status: "In Progress",
        submittedDate: "Feb 28, 2024",
        timeline: [
            { step: "Application Submitted", date: "Feb 28, 2024", completed: true },
            { step: "Document Verification", date: "Mar 02, 2024", completed: true },
            { step: "District Review", date: "Mar 05, 2024", completed: false, current: true },
            { step: "State Approval", date: "-", completed: false },
        ]
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <Link href="/dashboard/applications">
                    <Button variant="ghost" className="mb-4 pl-0 hover:pl-0 hover:bg-transparent">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Applications
                    </Button>
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{application.scheme}</h1>
                        <p className="text-muted-foreground mt-2">Application ID: {application.id}</p>
                    </div>
                    <Badge className="text-base px-4 py-1 bg-blue-500">In Progress</Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Application Timeline</CardTitle>
                        <CardDescription>Track the progress of your application.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                            {application.timeline.map((item, i) => (
                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${item.completed ? 'bg-green-500 text-white' : item.current ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-300'}`}>
                                        {item.completed ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 shadow">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-slate-900">{item.step}</div>
                                            <time className="font-caveat font-medium text-indigo-500">{item.date}</time>
                                        </div>
                                        <div className="text-slate-500 text-sm">
                                            {item.completed ? "Completed successfully." : item.current ? "Currently under process." : "Pending."}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Application Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">Beneficiary Name</div>
                            <div>Rajesh Kumar</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">Submitted On</div>
                            <div>{application.submittedDate}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">Mobile Number</div>
                            <div>+91 98765 43210</div>
                        </div>

                        <div className="pt-4">
                            <Button className="w-full" variant="outline">
                                <FileText className="w-4 h-4 mr-2" />
                                View Submitted Form
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
