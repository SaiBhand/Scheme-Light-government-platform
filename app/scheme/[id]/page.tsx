"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { schemes, getLocalizedScheme } from "@/lib/schemes-data"
import { useLanguage } from "@/components/LanguageContext"
import { ArrowLeft, ExternalLink, FileText, Printer, Users } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SchemeDetailsPage() {
  const { language, setLanguage, t } = useLanguage()
  const [simplifiedMode, setSimplifiedMode] = useState(false)

  const params = useParams()
  const id = params.id as string

  const router = useRouter()
  const originalScheme = schemes.find((s) => s.id === id)

  if (!originalScheme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Scheme Not Found</h2>
          <p className="mb-4">The scheme you're looking for doesn't exist. ID: {id}</p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </Card>
      </div>
    )
  }

  // Merge original scheme data with translations based on selected language
  const scheme = getLocalizedScheme(originalScheme, language)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white py-4 print:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <span className="text-primary font-bold text-xl">SL</span>
              </div>
              <h1 className="text-2xl font-bold">SchemeLight</h1>
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded transition-colors ${language === "en" ? "bg-white text-primary font-bold" : "text-white hover:bg-white/20"
                    }`}
                >
                  English
                </button>
                <span className="text-white/50">|</span>
                <button
                  onClick={() => setLanguage("hi")}
                  className={`px-3 py-1 rounded transition-colors ${language === "hi" ? "bg-white text-primary font-bold" : "text-white hover:bg-white/20"
                    }`}
                >
                  हिंदी
                </button>
                <span className="text-white/50">|</span>
                <button
                  onClick={() => setLanguage("mr")}
                  className={`px-3 py-1 rounded transition-colors ${language === "mr" ? "bg-white text-primary font-bold" : "text-white hover:bg-white/20"
                    }`}
                >
                  मराठी
                </button>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-2 rounded-lg">
                <Label htmlFor="simplified-detail" className="text-sm">
                  {simplifiedMode ? t.simpleMode : t.normalMode}
                </Label>
                <Switch id="simplified-detail" checked={simplifiedMode} onCheckedChange={setSimplifiedMode} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Scheme Header */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              <div className="text-6xl">{scheme.icon}</div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">{scheme.name}</h1>
                <p className="text-xl text-blue-100 mb-4">{scheme.ministry}</p>
                <p className="text-lg text-blue-200 mb-6">{scheme.targetGroup} Focused Scheme</p>

                <div className="flex flex-wrap gap-3 mb-6">
                  {scheme.status && (
                    <div
                      className={`px-4 py-2 rounded-lg font-bold ${scheme.status === "Open"
                        ? "bg-green-500 text-white"
                        : scheme.status === "Closing Soon"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                        }`}
                    >
                      {scheme.status === "Open" ? "✓ Applications Open" : scheme.status}
                    </div>
                  )}
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                    <span className="text-sm">💰 {scheme.benefit}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                    <span className="text-sm">
                      {scheme.applicationMode === "Online" ? "💻" : scheme.applicationMode === "Offline" ? "🏛️" : "💻🏛️"}{" "}
                      {scheme.applicationMode} Application
                    </span>
                  </div>
                </div>

                <a href={scheme.applyUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8 font-bold">
                    Apply Now on Official Portal
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scheme Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* About This Scheme */}
            <Card className="p-6 bg-blue-50 border-blue-200 border-2">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.aboutScheme}</h2>
              <p className="text-foreground leading-relaxed">
                {simplifiedMode && scheme.simplifiedDescription ? scheme.simplifiedDescription : scheme.description}
              </p>
            </Card>

            {/* Key Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.keyBenefits}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scheme.keyBenefits.map((benefit, index) => (
                  <Card key={index} className="p-4 bg-green-50 border-green-200">
                    <div className="flex items-start gap-3">
                      <div className="text-green-600 text-xl mt-0.5">✓</div>
                      <p className="text-foreground font-medium">{benefit}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Who Can Apply */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.whoCanApply}</h2>
              <div className="space-y-3">
                {scheme.eligibility.minAge && (
                  <Card className="p-4 flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#0B3C5D] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      {scheme.eligibility.minAge}
                    </div>
                    <div>
                      <p className="text-foreground font-medium">{t.ageRequirement}</p>
                      <p className="text-sm text-muted-foreground">
                        {scheme.eligibility.minAge && scheme.eligibility.maxAge
                          ? `${language === "en" ? "Between" : language === "hi" ? "बीच में" : "दरम्यानात"} ${scheme.eligibility.minAge} ${language === "en" ? "and" : language === "hi" ? "और" : "आणि"} ${scheme.eligibility.maxAge} ${language === "en" ? "years" : language === "hi" ? "वर्ष" : "वर्षे"}`
                          : scheme.eligibility.minAge
                            ? `${language === "en" ? "Minimum" : language === "hi" ? "न्यूनतम" : "किमान"} ${scheme.eligibility.minAge} ${language === "en" ? "years" : language === "hi" ? "वर्ष" : "वर्षे"}`
                            : `${language === "en" ? "Maximum" : language === "hi" ? "अधिकतम" : "कमाल"} ${scheme.eligibility.maxAge} ${language === "en" ? "years" : language === "hi" ? "वर्ष" : "वर्षे"}`}
                      </p>
                    </div>
                  </Card>
                )}
                {scheme.eligibility.incomeLimit && (
                  <Card className="p-4 flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#0B3C5D] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      ₹
                    </div>
                    <div>
                      <p className="text-foreground font-medium">{t.incomeLimit}</p>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? "Annual income should not exceed" : "वार्षिक आय से अधिक नहीं होनी चाहिए"} ₹
                        {scheme.eligibility.incomeLimit.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </Card>
                )}
                {scheme.eligibility.categories && !scheme.eligibility.categories.includes("All") && (
                  <Card className="p-4 flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#0B3C5D] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      C
                    </div>
                    <div>
                      <p className="text-foreground font-medium">{t.category}</p>
                      <p className="text-sm text-muted-foreground">{scheme.eligibility.categories.join(", ")}</p>
                    </div>
                  </Card>
                )}
                <Card className="p-4 flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#0B3C5D] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                    T
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{t.targetGroup}</p>
                    <p className="text-sm text-muted-foreground">{scheme.targetGroup}</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Required Documents */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.requiredDocuments}</h2>
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "en"
                    ? "Make sure you have these documents ready before applying:"
                    : "आवेदन करने से पहले सुनिश्चित करें कि आपके पास ये दस्तावेज़ तैयार हैं:"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scheme.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-blue-200">
                      <FileText className="w-5 h-5 text-blue-700 shrink-0" />
                      <span className="text-foreground font-medium text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* How to Apply */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.howToApply}</h2>
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                  <div
                    className={`px-4 py-2 rounded-lg font-bold ${scheme.applicationMode === "Online" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                  >
                    {scheme.applicationMode === "Online" ? `💻 ${t.onlineApplication}` : `🏛️ ${t.offlineApplication}`}
                  </div>
                </div>
                <div className="space-y-4">
                  {scheme.howToApply.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#0B3C5D] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-foreground leading-relaxed pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Video Tutorial Section */}
            {scheme.videoTutorialUrl && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {language === "en"
                    ? "📹 How to Fill the Form - Video Tutorial (Hindi)"
                    : language === "hi"
                      ? "📹 फॉर्म कैसे भरें - वीडियो ट्यूटोरियल (हिंदी)"
                      : "📹 फॉर्म कसा भरावा - व्हिडिओ ट्यूटोरियल (हिंदी)"}
                </h2>
                <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en"
                      ? "Watch this Hindi video tutorial to learn how to fill the application form step-by-step:"
                      : language === "hi"
                        ? "आवेदन फॉर्म को चरण-दर-चरण भरने का तरीका जानने के लिए यह हिंदी वीडियो ट्यूटोरियल देखें:"
                        : "अर्ज फॉर्म चरण-दर-चरण कसा भरायचा हे जाणून घेण्यासाठी हा हिंदी व्हिडिओ ट्यूटोरियल पहा:"}
                  </p>
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={scheme.videoTutorialUrl.replace("watch?v=", "embed/")}
                      title="Form Filling Tutorial"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    {language === "en"
                      ? "💡 Tip: Watch in full screen for better visibility"
                      : language === "hi"
                        ? "💡 सुझाव: बेहतर दृश्यता के लिए पूर्ण स्क्रीन में देखें"
                        : "💡 टीप: चांगल्या दृश्यतेसाठी पूर्ण स्क्रीनमध्ये पहा"}
                  </p>
                </Card>
              </div>
            )}

            {/* Official Government Information */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.officialInfo}</h2>
              <p className="text-foreground mb-4">{t.officialInfoDesc}</p>
              <a href={scheme.applyUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {t.visitOfficial}
                </Button>
              </a>
            </Card>

            {/* Important Note */}
            <Card className="p-6 bg-yellow-50 border-2 border-yellow-300">
              <h3 className="text-lg font-bold text-yellow-900 mb-3">⚠️ {t.importantNote}</h3>
              <p className="text-yellow-800 text-sm leading-relaxed">{t.importantNoteDesc}</p>
            </Card>

            {scheme.offlineAssistance && scheme.offlineAssistance.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">{t.whereToApplyOffline}</h2>
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                    <p className="text-sm text-muted-foreground">{t.offlineAssistanceDesc}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {scheme.offlineAssistance.map((location, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-white p-3 rounded-lg border border-purple-200"
                      >
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">{location}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 print:hidden">
              <Button
                size="lg"
                variant="outline"
                className="flex-1 md:flex-none bg-transparent"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t.backToResults}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 md:flex-none bg-[#FF8C00] hover:bg-[#e67e00] text-white border-[#FF8C00]"
                onClick={() => window.print()}
              >
                <Printer className="w-5 h-5 mr-2" />
                {t.printDetails}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A2E] text-white py-8 mt-12 print:hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-400 mb-2">{t.footerCopyright}</p>
            <p className="text-xs text-gray-500">{t.footerDisclaimer}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
