"use client"

import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Send, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState, use } from "react"

const pages = {
    about: {
        title: "About Us",
        content: (
            <div className="space-y-4">
                <p>
                    SchemeLight is a comprehensive government scheme discovery platform designed to bridge the gap between citizens and government benefits.
                </p>
                <p>
                    Our mission is to simplify the complex landscape of government schemes through technology and AI, ensuring that every eligible citizen can access the benefits they are entitled to.
                </p>
                <h3 className="text-xl font-bold mt-6 text-slate-900">Our Vision</h3>
                <p>
                    To create a digitally empowered society where information about government welfare is accessible, transparent, and easy to understand for everyone.
                </p>
            </div>
        )
    },
    contact: {
        title: "Contact Us",
        content: (
            <div className="space-y-4">
                <p>We'd love to hear from you. Reach out to us through any of the following channels:</p>
                <div className="grid gap-4 mt-6">
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-base">General Inquiries</CardTitle></CardHeader>
                        <CardContent><p className="text-sm text-muted-foreground">info@schemelight.gov.in</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-base">Support</CardTitle></CardHeader>
                        <CardContent><p className="text-sm text-muted-foreground">support@schemelight.gov.in</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-base">Address</CardTitle></CardHeader>
                        <CardContent><p className="text-sm text-muted-foreground">123, Digital India Complex, New Delhi - 110001</p></CardContent>
                    </Card>
                </div>
            </div>
        )
    },
    privacy: {
        title: "Privacy Policy",
        content: (
            <div className="space-y-4 text-sm">
                <p>Last updated: January 2025</p>
                <p>At SchemeLight, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
                <h3 className="text-lg font-bold mt-4 text-slate-900">1. Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you create an account, update your profile, or check usage eligibility.</p>
                <h3 className="text-lg font-bold mt-4 text-slate-900">2. How We Use Your Information</h3>
                <p>We use your information to provide personalized scheme recommendations, improve our services, and communicate with you.</p>
                <h3 className="text-lg font-bold mt-4 text-slate-900">3. Data Security</h3>
                <p>We implement industry-standard security measures to protect your data from unauthorized access or disclosure.</p>
            </div>
        )
    },
    terms: {
        title: "Terms of Service",
        content: (
            <div className="space-y-4 text-sm">
                <p>Last updated: January 2025</p>
                <p>Please read these Terms of Service carefully before using SchemeLight.</p>
                <h3 className="text-lg font-bold mt-4 text-slate-900">1. Acceptance of Terms</h3>
                <p>By accessing or using our platform, you agree to be bound by these terms.</p>
                <h3 className="text-lg font-bold mt-4 text-slate-900">2. User Accounts</h3>
                <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
                <h3 className="text-lg font-bold mt-4 text-slate-900">3. Disclaimer</h3>
                <p>SchemeLight is an informational platform. While we strive for accuracy, we are not responsible for errors or omissions in scheme details.</p>
            </div>
        )
    },
    help: {
        title: "Help Center",
        content: (
            <div className="space-y-6">
                <div className="space-y-2">
                    <h3 className="font-bold text-lg">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                        {[
                            { q: "How do I check my eligibility?", a: "Go to the home page and fill out the simple form or use our AI assistant." },
                            { q: "Is this service free?", a: "Yes, SchemeLight is completely free for all citizens." },
                            { q: "How specific are the results?", a: "Our AI matches your profile against 50+ parameters to ensure high accuracy." }
                        ].map((faq, i) => (
                            <div key={i} className="border-b pb-4 last:border-0">
                                <p className="font-medium text-slate-900 mb-1">{faq.q}</p>
                                <p className="text-slate-600 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

import { createClient } from "@/lib/supabase/client"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

function FormPage({ title, type }: { title: string, type: 'feedback' | 'report' }) {
    const [submitted, setSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Form states
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const supabase = createClient()

            // Get current user if logged in
            const { data: { user } } = await supabase.auth.getUser()

            const { error: insertError } = await supabase
                .from('feedback_reports')
                .insert({
                    type,
                    name,
                    email,
                    subject,
                    message,
                    user_id: user?.id || null
                })

            if (insertError) throw insertError

            setSubmitted(true)
        } catch (err) {
            console.error('Error submitting form:', err)
            setError("Failed to submit. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Thank You!</h2>
                <p className="text-slate-600 max-w-md">
                    Your {type === 'feedback' ? 'feedback' : 'report'} has been submitted successfully. We appreciate your input.
                </p>
                <Button asChild className="mt-4"><Link href="/">Return Home</Link></Button>
            </div>
        )
    }

    return (
        <div className="max-w-xl mx-auto">
            <p className="text-slate-600 mb-8">
                {type === 'feedback'
                    ? "We value your feedback. Let us know how we can improve your experience."
                    : "Found a bug or incorrect information? Please let us know so we can fix it."}
            </p>
            <Card>
                <CardHeader>
                    <CardTitle>Submit {title}</CardTitle>
                    <CardDescription>Please provide as much detail as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Name (Optional)</Label>
                                <Input
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Email (Optional)</Label>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Subject</Label>
                            <Input
                                required
                                placeholder="Brief summary"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Message</Label>
                            <Textarea
                                required
                                placeholder={type === 'feedback' ? "Tell us what you think..." : "Describe the issue..."}
                                className="min-h-[150px]"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" /> Submit
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)

    if (slug === 'feedback') return <PageLayout title="Feedback"><FormPage title="Feedback" type="feedback" /></PageLayout>
    if (slug === 'report-issue') return <PageLayout title="Report an Issue"><FormPage title="Report" type="report" /></PageLayout>

    const page = pages[slug as keyof typeof pages]

    if (!page) {
        notFound()
    }

    return (
        <PageLayout title={page.title}>
            <div className="prose pro-slate max-w-none text-slate-600">
                {page.content}
            </div>
        </PageLayout>
    )
}

function PageLayout({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b h-16 flex items-center px-4 sticky top-0 md:static">
                <div className="container mx-auto flex items-center gap-4">
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="font-bold text-lg text-slate-900">{title}</h1>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8 md:py-12">
                {children}
            </main>
        </div>
    )
}
