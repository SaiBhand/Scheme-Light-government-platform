"use client"

import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, CheckCircle, AlertTriangle, FileText, Info } from "lucide-react"

import { useRouter } from "next/navigation"

export function NotificationsDropdown() {
    const router = useRouter()
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Profile Incomplete",
            desc: "Add your occupation to get better results.",
            time: "2h ago",
            icon: AlertTriangle,
            color: "text-amber-500",
            bg: "bg-amber-50",
            unread: true,
            href: "/dashboard/settings"
        },
        {
            id: 2,
            title: "New Scheme: PM Kisan",
            desc: "You might be eligible based on your location.",
            time: "1d ago",
            icon: CheckCircle,
            color: "text-green-500",
            bg: "bg-green-50",
            unread: true,
            href: "/scheme/F01"
        },
        {
            id: 3,
            title: "Application Status",
            desc: "Your document verification is pending.",
            time: "2d ago",
            icon: FileText,
            color: "text-blue-500",
            bg: "bg-blue-50",
            unread: false,
            href: "/dashboard/applications"
        },

        {
            id: 5,
            title: "New Feature Alert",
            desc: "Check out the new AI Assistant for help.",
            time: "4d ago",
            icon: Info,
            color: "text-purple-500",
            bg: "bg-purple-50",
            unread: false,
            href: "/assistant"
        },
        {
            id: 6,
            title: "Document Approved",
            desc: "Your Aadhar card has been verified successfully.",
            time: "5d ago",
            icon: CheckCircle,
            color: "text-green-500",
            bg: "bg-green-50",
            unread: false,
            href: "/dashboard/documents"
        }
    ])

    const unreadCount = notifications.filter(n => n.unread).length

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })))
    }

    const handleNotificationClick = (id: number, href: string) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, unread: false } : n
        ))
        if (href && href !== "#") {
            router.push(href)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-zinc-950" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end" forceMount>
                <div className="flex items-center justify-between px-4 py-2">
                    <DropdownMenuLabel className="p-0 font-bold">Notifications</DropdownMenuLabel>
                    {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto px-2 py-0.5 text-xs text-primary hover:text-primary/90">
                            Mark all as read
                        </Button>
                    )}
                </div>
                <DropdownMenuSeparator />
                <ScrollArea className="h-[300px] w-full p-0">
                    {notifications.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground text-sm">
                            No notifications
                        </div>
                    ) : (
                        notifications.map((item) => (
                            <DropdownMenuItem
                                key={item.id}
                                className="cursor-pointer p-3 items-start gap-3 focus:bg-zinc-50 dark:focus:bg-zinc-900"
                                onClick={() => handleNotificationClick(item.id, item.href)}
                            >
                                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${item.bg} ${item.color}`}>
                                    <item.icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className={`text-sm font-medium leading-none ${item.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                        {item.desc}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground/70">
                                        {item.time}
                                    </p>
                                </div>
                                {item.unread && (
                                    <div className="shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                                )}
                            </DropdownMenuItem>
                        ))
                    )}
                </ScrollArea>
                <DropdownMenuSeparator />
                <div className="p-2">
                    <Button
                        variant="outline"
                        className="w-full h-8 text-xs"
                        onClick={() => {
                            setNotifications(notifications.map(n => ({ ...n, unread: false })))
                            router.push("/dashboard/activity")
                        }}
                    >
                        View All Activity
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
