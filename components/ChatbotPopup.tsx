"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, X, MessageSquare, Loader2, User, Sparkles, Trash2, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

interface Message {
    role: "user" | "assistant"
    content: string
}

interface ChatbotPopupProps {
    t?: any
}

export function ChatbotPopup({ t }: ChatbotPopupProps) {
    // Default translations if t is not provided (defensive)
    const labels = t || {
        assistantName: "SchemeSathi",
        online: "Online",
        clearChat: "Clear Chat",
        clearChatConfirm: "Clear all messages?",
        chatPlaceholder: "Hi! I can help you find schemes, explain eligibility, or guide you through the process.",
        typeQuestion: "Type your question...",
        thinking: "Thinking...",
        verifiedGovernmentData: "Verified Government Data"
    }

    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const toggleChat = () => setIsOpen(!isOpen)

    useEffect(() => {
        if (messagesEndRef.current) {
            // Small timeout ensures DOM is fully updated before scrolling
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
            }, 100)
        }
    }, [messages, isOpen])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMessage: Message = { role: "user", content: input }
        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            // Use the existing AI assistant API
            const response = await fetch("/api/ai-assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage.content,
                    // We don't send full user profile/schemes here for the simple popup 
                    // to keep it lightweight, or we could add them if available.
                    // For now, let's treat it as a general query or basic assistance.
                    isGuest: true
                }),
            })

            const data = await response.json()

            let assistantContent = "I'm sorry, I'm having trouble connecting right now."
            if (data.success) {
                assistantContent = data.response
            } else if (data.message) {
                assistantContent = data.message
            }

            setMessages(prev => [...prev, { role: "assistant", content: assistantContent }])
        } catch (error) {
            console.error("Chat error:", error)
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="w-[350px] sm:w-[380px] shadow-2xl rounded-2xl overflow-hidden"
                    >
                        <Card className="border-none shadow-none h-[500px] flex flex-col bg-white/95 backdrop-blur-sm dark:bg-zinc-900/95">
                            {/* Header */}
                            <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base">{labels.assistantName}</h3>
                                        <p className="text-xs text-blue-100 flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                            {labels.online}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {messages.length > 0 && (
                                        <button
                                            className="flex items-center justify-center h-9 w-9 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all active:scale-95 z-30"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (confirm(labels.clearChatConfirm)) setMessages([]);
                                            }}
                                            title={labels.clearChat}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={toggleChat}>
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Messages */}
                            <ScrollArea className="flex-1 min-h-0 p-4 bg-slate-50 dark:bg-zinc-950/50">
                                {messages.length === 0 && (
                                    <div className="flex flex-col items-center justify-center h-full text-center p-4 text-muted-foreground space-y-4">
                                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-2">
                                            <Sparkles className="w-8 h-8 text-primary" />
                                        </div>
                                        <p className="text-sm">{labels.chatPlaceholder}</p>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {["Find schemes for farmers", "Scholarships for students", "Pension schemes"].map(q => (
                                                <button
                                                    key={q}
                                                    onClick={() => setInput(q)}
                                                    className="text-xs bg-white dark:bg-zinc-800 border px-3 py-1.5 rounded-full hover:bg-primary/5 transition-colors"
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="space-y-4">
                                    {messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "flex w-full",
                                                msg.role === "user" ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "px-4 py-2.5 rounded-2xl max-w-[85%] text-sm shadow-sm",
                                                    msg.role === "user"
                                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                                        : "bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-bl-none text-slate-800 dark:text-slate-200"
                                                )}
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex w-full justify-start">
                                            <div className="bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                                <span className="text-xs text-muted-foreground">{labels.thinking}</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-center py-2">
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-full shadow-sm text-[10px] text-slate-500 font-medium">
                                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                            {labels.verifiedGovernmentData}
                                        </div>
                                    </div>
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>

                            {/* Input */}
                            <div className="p-3 bg-white dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800 shrink-0">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        handleSend()
                                    }}
                                    className="flex gap-2"
                                >
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={labels.typeQuestion}
                                        className="flex-1 focus-visible:ring-primary/20"
                                        disabled={isLoading}
                                    />
                                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="shrink-0 shadow-sm">
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={toggleChat}
                size="lg"
                className={cn(
                    "h-14 w-14 rounded-full shadow-xl transition-all duration-300 hover:scale-105 z-50",
                    isOpen ? "bg-slate-800 hover:bg-slate-900" : "bg-gradient-to-tr from-primary to-blue-600 hover:shadow-primary/25"
                )}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageSquare className="w-7 h-7" />
                )}
            </Button>
        </div>
    )
}
