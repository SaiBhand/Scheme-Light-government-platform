import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SchemeLight - Government Scheme Eligibility Platform",
  description:
    "AI-based Government Scheme Eligibility and Guidance Platform for Indian citizens. Find schemes, check eligibility, and get clear application guidance.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

import { LanguageProvider } from "@/components/LanguageContext"
import { EligibilityProvider } from "@/components/EligibilityContext"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <EligibilityProvider>
            {children}
          </EligibilityProvider>
        </LanguageProvider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
