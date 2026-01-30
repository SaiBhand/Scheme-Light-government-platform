"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  ArrowLeft,
  Bot,
  User,
  Plus,
  Image as ImageIcon,
  Monitor,
  FileText,
  Mic,
  X,
  Paperclip,
  MessageSquare,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Trash2,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/LanguageContext"

interface Message {
  id?: string
  role: "user" | "assistant"
  content: string
  attachments?: { type: "image" | "file"; url: string; name: string }[]
}

interface ChatSession {
  id: string
  title: string
  created_at: string
}

export default function AssistantPage() {
  const router = useRouter()
  const supabase = createClient()
  const { language, setLanguage, t } = useLanguage()

  // State
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [eligibleSchemes, setEligibleSchemes] = useState<any[]>([])
  const [attachments, setAttachments] = useState<{ file: File; preview: string; type: "image" | "file" }[]>([])
  const [isListening, setIsListening] = useState(false)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initial Load
  useEffect(() => {
    loadUserData()
    loadSessions()
  }, [])

  // Auto-scroll logic
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading])

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()
      setUserProfile(profile)

      const { data: logs } = await supabase
        .from("eligibility_logs")
        .select("scheme_name, scheme_id, is_eligible, eligibility_result")
        .eq("user_id", user.id)
        .eq("is_eligible", true)
        .order("created_at", { ascending: false })
        .limit(10)

      setEligibleSchemes(logs || [])
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }

  const loadSessions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from("chat_sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })

      if (data) {
        setSessions(data)
      }
    } catch (error) {
      console.error("Error loading sessions:", error)
    }
  }

  const loadSessionMessages = async (sessionId: string) => {
    try {
      setIsLoading(true)
      setCurrentSessionId(sessionId)

      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true })

      if (data) {
        setMessages(data.map(msg => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          attachments: msg.attachments || []
        })))
      }
      setIsMobileSidebarOpen(false)
    } catch (error) {
      console.error("Error loading messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewChat = () => {
    setCurrentSessionId(null)
    setMessages([])
    setIsMobileSidebarOpen(false)
  }

  const createSessionIfNeeded = async (firstMessage: string) => {
    if (currentSessionId) return currentSessionId

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      // Generate a title
      const title = firstMessage.length > 30 ? firstMessage.substring(0, 30) + "..." : firstMessage

      const { data } = await supabase
        .from("chat_sessions")
        .insert({ user_id: user.id, title: title })
        .select()
        .single()

      if (data) {
        setSessions(prev => [data, ...prev])
        setCurrentSessionId(data.id)
        return data.id
      }
    } catch (error) {
      console.error("Error creating session:", error)
    }
    return null
  }

  const saveMessage = async (sessionId: string, message: Message) => {
    try {
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: message.role,
        content: message.content,
        attachments: message.attachments
      })

      await supabase.from("chat_sessions")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", sessionId)

      loadSessions()
    } catch (error) {
      console.error("Error saving message:", error)
    }
  }

  const deleteSession = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation()
    if (!confirm(t.clearChatConfirm || "Are you sure you want to delete this chat session?")) return

    try {
      const { error } = await supabase
        .from("chat_sessions")
        .delete()
        .eq("id", sessionId)

      if (error) throw error

      setSessions(prev => prev.filter(s => s.id !== sessionId))
      if (currentSessionId === sessionId) {
        handleNewChat()
      }
    } catch (error) {
      console.error("Error deleting session:", error)
      alert("Failed to delete the chat. Please try again.")
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "file") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const preview = URL.createObjectURL(file)
      setAttachments((prev) => [...prev, { file, preview, type }])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput((prev) => prev + (prev ? " " : "") + transcript)
      }
      recognition.start()
    } else {
      alert("Speech recognition is not supported in this browser.")
    }
  }

  const handleScreenshot = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
      const video = document.createElement('video')
      video.srcObject = stream
      await video.play()

      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')?.drawImage(video, 0, 0)

      const dataUrl = canvas.toDataURL('image/png')
      stream.getTracks().forEach(t => t.stop())

      const res = await fetch(dataUrl)
      const blob = await res.blob()
      const file = new File([blob], "screenshot.png", { type: "image/png" })

      setAttachments((prev) => [...prev, { file, preview: dataUrl, type: "image" }])
    } catch (error) {
      console.error("Screenshot error:", error)
    }
  }

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || isLoading) return

    const currentInput = input
    const currentAttachments = attachments.map(a => ({
      type: a.type,
      url: a.preview,
      name: a.file.name
    }))

    setInput("")
    setAttachments([])
    setIsListening(false)
    setIsLoading(true)

    const userMessage: Message = {
      role: "user",
      content: currentInput,
      attachments: currentAttachments
    }
    setMessages((prev) => [...prev, userMessage])

    try {
      const sessionId = await createSessionIfNeeded(currentInput || "Image Attachment")
      if (sessionId) {
        await saveMessage(sessionId, userMessage)
      }

      const apiAttachments = await Promise.all(attachments.map(async (a) => ({
        inlineData: {
          data: (await convertToBase64(a.file)).split(',')[1],
          mimeType: a.file.type
        }
      })))

      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          userProfile,
          eligibleSchemes: eligibleSchemes.map((s) => ({
            name: s.scheme_name,
            id: s.scheme_id,
            result: s.eligibility_result,
          })),
          images: apiAttachments
        }),
      })

      const data = await response.json()

      let assistantContent = "I'm sorry, I encountered an error. Please try again."
      if (data.success) {
        assistantContent = data.response
      } else if (data.message) {
        assistantContent = `Error: ${data.message}`
      } else if (data.error) {
        assistantContent = `Error: ${data.error}`
      }

      const assistantMessage: Message = { role: "assistant", content: assistantContent }

      setMessages((prev) => [...prev, assistantMessage])

      if (sessionId) {
        await saveMessage(sessionId, assistantMessage)
      }

    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 w-full">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between sticky top-0 z-10 bg-inherit">
        <Button onClick={handleNewChat} className="flex-1 justify-start gap-2 shadow-sm" variant="default">
          <Plus className="w-4 h-4" />
          {t.newChat}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          <p className="text-[11px] font-bold text-muted-foreground px-3 mb-2 uppercase tracking-widest opacity-60">{t.recentHistory}</p>
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => loadSessionMessages(session.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  loadSessionMessages(session.id)
                }
              }}
              role="button"
              tabIndex={0}
              className={cn(
                "group relative flex items-center justify-between p-3 rounded-xl text-sm transition-all cursor-pointer outline-none border-2 mb-2",
                currentSessionId === session.id
                  ? "bg-white dark:bg-zinc-800 shadow-md border-primary/40 text-primary font-boldScale active:scale-[0.98]"
                  : "bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
              )}
            >
              <div className="flex items-center gap-3 truncate flex-1 min-w-0 pr-2">
                <MessageSquare className={cn("w-4 h-4 shrink-0 transition-colors", currentSessionId === session.id ? "text-primary" : "opacity-40")} />
                <span className="truncate">{session.title || t.untitledChat}</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSession(e, session.id);
                }}
                className="flex items-center justify-center p-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all shrink-0 z-30 shadow-sm border border-red-100 hover:border-red-600"
                title="Delete this chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {sessions.length === 0 && (
            <div className="text-center py-16 px-4 text-muted-foreground bg-zinc-100/50 dark:bg-zinc-700/10 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 mx-1">
              <Bot className="w-10 h-10 mx-auto mb-3 opacity-10" />
              <p className="text-xs font-medium uppercase tracking-tight opacity-50">{t.noMatchingFound || "No Conversations Yet"}</p>
            </div>
          )}

          {sessions.length > 0 && (
            <div className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800 px-1 pb-6">
              <Button
                variant="destructive"
                size="default"
                className="w-full gap-2 rounded-xl h-12 shadow-xl shadow-red-500/20 hover:shadow-red-500/40 transition-all font-black uppercase text-xs"
                onClick={async () => {
                  if (confirm(t.clearHistoryConfirm || "⚠️ CRITICAL: Delete ALL history? This is permanent!")) {
                    try {
                      const { data: { user } } = await supabase.auth.getUser()
                      if (!user) return
                      await supabase.from("chat_sessions").delete().eq("user_id", user.id)
                      setSessions([])
                      handleNewChat()
                    } catch (e) { console.error(e) }
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
                {t.clearChat}
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-inherit space-y-2">
        <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/20">
          <p className="text-xs text-blue-800 dark:text-blue-300 font-medium mb-1">{t.expertTip}</p>
          <p className="text-[10px] text-blue-600 dark:text-blue-400">
            {t.expertTipNote}
          </p>
        </div>
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            {t.backToDashboard}
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-white dark:bg-zinc-950 overflow-hidden relative">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col h-full shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 transition-all duration-300 ease-in-out will-change-width overflow-hidden",
          isDesktopSidebarOpen ? "w-[320px] translate-x-0" : "w-0 -translate-x-full opacity-0"
        )}
      >
        <div className="w-[320px] h-full flex flex-col">
          <SidebarContent />
        </div>
      </div>

      {/* Main Chat Area */}
      <main className="flex flex-col flex-1 h-full min-w-0">
        <header className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-3 md:p-4 shrink-0 flex items-center justify-between gap-3 z-20">
          <div className="flex items-center gap-3">
            <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-muted-foreground hover:text-foreground -ml-2 transition-transform active:scale-95"
              onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            >
              {isDesktopSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </Button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm leading-none">{t.assistantName}</h1>
                <span className="text-[10px] text-muted-foreground">AI Assistant</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
            {["en", "hi", "mr"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as any)}
                className={cn(
                  "px-2 py-1 text-[10px] font-bold rounded transition-all",
                  language === lang
                    ? "bg-white dark:bg-zinc-800 text-primary shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto w-full relative bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="min-h-full p-4 md:p-8 pb-32 max-w-4xl mx-auto">
            {messages.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-70">
                <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">{t.howCanIHelp}</h2>
                <p className="max-w-md text-muted-foreground">
                  {t.aiGreeting}
                </p>
                <div className="grid grid-cols-2 gap-3 mt-8 max-w-lg w-full">
                  {["Check my eligibility for PM Kisan", "What schemes are for students?", "How to apply for Ration Card?", "Upload income certificate"].map(q => (
                    <button key={q} onClick={() => setInput(q)} className="text-xs p-3 bg-white dark:bg-zinc-800 border hover:border-primary/50 rounded-xl shadow-sm text-left transition-colors">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 mb-6 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}

                <div className={`flex flex-col gap-1 max-w-[85%] md:max-w-[75%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {message.attachments.map((att, i) => (
                        <div key={i} className="rounded-lg overflow-hidden border bg-background shadow-sm">
                          {att.type === 'image' ? (
                            <img src={att.url} alt="Attachment" className="h-32 w-auto object-cover" />
                          ) : (
                            <div className="flex items-center gap-2 p-3 bg-muted/50">
                              <FileText className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium truncate max-w-[150px]">{att.name}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {message.content && (
                    <div
                      className={`relative px-5 py-3.5 shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${message.role === "user"
                        ? "bg-primary text-white rounded-2xl rounded-tr-sm"
                        : "bg-white dark:bg-zinc-800 border text-zinc-800 dark:text-zinc-100 rounded-2xl rounded-tl-sm"
                        }`}
                    >
                      {message.content}
                    </div>
                  )}
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-5 h-5 text-zinc-500" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 justify-start mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-white dark:bg-zinc-800 border rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-center py-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm text-xs text-slate-500 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {t.verifiedGovernmentData}
              </div>
            </div>
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 z-10">
          <div className="max-w-3xl mx-auto w-full">
            {attachments.length > 0 && (
              <div className="flex gap-3 mb-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted">
                {attachments.map((att, i) => (
                  <div key={i} className="relative shrink-0 group">
                    {att.type === 'image' ? (
                      <img src={att.preview} alt="Preview" className="h-16 w-16 object-cover rounded-lg border shadow-sm" />
                    ) : (
                      <div className="h-16 w-16 flex flex-col items-center justify-center bg-muted/50 rounded-lg border p-1">
                        <FileText className="w-5 h-5 mb-1 text-primary" />
                        <span className="text-[9px] truncate w-full text-center font-medium">{att.file.name}</span>
                      </div>
                    )}
                    <button
                      onClick={() => removeAttachment(i)}
                      className="absolute -top-1.5 -right-1.5 bg-destructive text-white rounded-full p-0.5 shadow-md hover:bg-destructive/90 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="relative flex items-end gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-2xl transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-white dark:focus-within:bg-zinc-800 border border-transparent focus-within:border-zinc-200 dark:focus-within:border-zinc-700">
              <div className="flex gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-primary rounded-xl shrink-0 h-10 w-10">
                      <Plus className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                      <ImageIcon className="w-4 h-4 mr-2" /> Photos & Videos
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleScreenshot}>
                      <Monitor className="w-4 h-4 mr-2" /> Take Screenshot
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                      <Paperclip className="w-4 h-4 mr-2" /> Document
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) => handleFileSelect(e, 'image')}
                />
              </div>

              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder={`Message ${t.assistantName}...`}
                className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2 py-3 h-auto max-h-[150px] min-h-[44px] text-base"
                style={{ resize: 'none' }}
              />

              <div className="flex gap-1">
                <Button
                  onClick={startListening}
                  variant="ghost"
                  size="icon"
                  className={`rounded-xl h-10 w-10 shrink-0 ${isListening ? 'bg-red-50 text-red-500 animate-pulse' : 'text-zinc-500 hover:bg-zinc-200/50'}`}
                >
                  <Mic className="w-5 h-5" />
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={isLoading || (!input.trim() && attachments.length === 0)}
                  size="icon"
                  className="rounded-xl h-10 w-10 shrink-0 bg-primary/90 hover:bg-primary shadow-sm"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <p className="text-[10px] text-center text-muted-foreground mt-3">
              {t.aiDisclaimer}
            </p>
          </div>
        </div>
      </main >
    </div >
  )
}
