import type React from "react"
import type { Metadata } from "next"
import { Poppins, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CursorEffect } from "@/components/cursor-effect"
import { LoadingOverlay } from "@/components/loading-overlay"
import { FloatingCTA } from "@/components/floating-cta"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "AdPoint — Creative Marketing Agency",
  description: "Premium digital marketing agency specializing in creative campaigns, branding, and web development.",
  generator: "v0.app",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#ef4444",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased relative mobile-optimized">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(185,28,28,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(185,28,28,0.06),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(185,28,28,0.04),transparent_50%)]" />
        </div>

        <div className="relative z-10">
          <LoadingOverlay />
          <Suspense fallback={null}>{children}</Suspense>
        </div>
        <FloatingCTA />
        <Analytics />
      </body>
    </html>
  )
}
