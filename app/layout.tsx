import type React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LoadingOverlay } from "@/components/loading-overlay"
import { FloatingCTA } from "@/components/floating-cta"
import CustomCursor from "@/components/custom-cursor"
import { FormProvider } from "@/contexts/FormContext"
import { PreloadCriticalResources, PerformanceMonitor } from "@/components/performance-optimizations"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "AdPoint — Creative Marketing Agency",
  description: "Premium digital marketing agency specializing in creative campaigns, branding, and web development.",
  generator: "Next.js",
  keywords: ["digital marketing", "creative agency", "branding", "web development", "marketing campaigns"],
  authors: [{ name: "AdPoint" }],
  creator: "AdPoint",
  publisher: "AdPoint",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://adpoint.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "AdPoint — Creative Marketing Agency",
    description: "Premium digital marketing agency specializing in creative campaigns, branding, and web development.",
    url: 'https://adpoint.com',
    siteName: 'AdPoint',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AdPoint Creative Marketing Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AdPoint — Creative Marketing Agency",
    description: "Premium digital marketing agency specializing in creative campaigns, branding, and web development.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ef4444",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Ensure page loads from top
              window.addEventListener('load', function() {
                window.scrollTo(0, 0);
              });
              // Also scroll to top on page show (back button, etc.)
              window.addEventListener('pageshow', function() {
                window.scrollTo(0, 0);
              });
              
              // Suppress hydration warnings for browser extensions
              const originalError = console.error;
              console.error = (...args) => {
                if (typeof args[0] === 'string' && args[0].includes('Hydration')) {
                  return;
                }
                originalError.apply(console, args);
              };
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased relative mobile-optimized" suppressHydrationWarning={true}>
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(185,28,28,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(185,28,28,0.06),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(185,28,28,0.04),transparent_50%)]" />
        </div>

        <FormProvider>
          <PreloadCriticalResources />
          <PerformanceMonitor />
          <CustomCursor />
          <div className="relative z-10">
            <LoadingOverlay />
            <Suspense fallback={null}>{children}</Suspense>
          </div>
          <FloatingCTA />
          <Analytics />
        </FormProvider>
      </body>
    </html>
  )
}
