import { Card } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, FileText, Info } from "lucide-react"

export default function ActivityPage() {
    const activities = [
        {
            id: 1,
            title: "Profile Incomplete",
            desc: "Add your occupation to get better results.",
            time: "2h ago",
            icon: AlertTriangle,
            color: "text-amber-500",
            bg: "bg-amber-50",
        },
        {
            id: 2,
            title: "New Scheme: PM Kisan",
            desc: "You might be eligible based on your location.",
            time: "1d ago",
            icon: CheckCircle,
            color: "text-green-500",
            bg: "bg-green-50",
        },
        {
            id: 3,
            title: "Application Status",
            desc: "Your document verification is pending.",
            time: "2d ago",
            icon: FileText,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            id: 4,
            title: "System Update",
            desc: "Platform maintenance scheduled for tonight.",
            time: "3d ago",
            icon: Info,
            color: "text-slate-500",
            bg: "bg-slate-50",
        },
        {
            id: 5,
            title: "New Feature Alert",
            desc: "Check out the new AI Assistant for help.",
            time: "4d ago",
            icon: Info,
            color: "text-purple-500",
            bg: "bg-purple-50",
        },
        {
            id: 6,
            title: "Document Approved",
            desc: "Your Aadhar card has been verified successfully.",
            time: "5d ago",
            icon: CheckCircle,
            color: "text-green-500",
            bg: "bg-green-50",
        },
    ]

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Activity Log</h1>
            <div className="space-y-4">
                {activities.map((item) => (
                    <Card key={item.id} className="p-4 flex items-start gap-4">
                        <div className={`p-2 rounded-full ${item.bg} ${item.color}`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                            <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
