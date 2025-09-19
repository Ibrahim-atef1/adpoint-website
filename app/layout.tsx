import type React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LoadingOverlay } from "@/components/loading-overlay"
import { FloatingCTA } from "@/components/floating-cta"
import { FormProvider } from "@/contexts/FormContext"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { MobilePerformanceSummary } from "@/components/mobile-performance-summary"
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
  generator: "v0.app",
  robots: "index, follow",
  openGraph: {
    title: "AdPoint — Creative Marketing Agency",
    description: "Premium digital marketing agency specializing in creative campaigns, branding, and web development.",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ef4444",
  userScalable: true,
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <head>
        {/* Resource hints for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/logo/Transparent Logo.png" as="image" type="image/png" />
        
        {/* Performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ef4444" />
        <meta name="color-scheme" content="dark" />
        
        {/* Critical inline script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Critical path optimization - defer non-essential scripts
              (function() {
                // Suppress hydration warnings for browser extensions
                const originalError = console.error;
                console.error = (...args) => {
                  if (typeof args[0] === 'string' && args[0].includes('Hydration')) {
                    return;
                  }
                  originalError.apply(console, args);
                };
                
                // Defer scroll behavior to avoid blocking render
                if (window.requestIdleCallback) {
                  requestIdleCallback(function() {
                    window.addEventListener('load', function() {
                      window.scrollTo(0, 0);
                    });
                    window.addEventListener('pageshow', function() {
                      window.scrollTo(0, 0);
                    });
                  });
                } else {
                  // Fallback for browsers without requestIdleCallback
                  setTimeout(function() {
                    window.addEventListener('load', function() {
                      window.scrollTo(0, 0);
                    });
                    window.addEventListener('pageshow', function() {
                      window.scrollTo(0, 0);
                    });
                  }, 1);
                }
                
                // High-performance scroll optimization
                let ticking = false;
                function updateScroll() {
                  // Batch scroll updates for better performance
                  ticking = false;
                }
                
                function requestScrollUpdate() {
                  if (!ticking) {
                    requestAnimationFrame(updateScroll);
                    ticking = true;
                  }
                }
                
                // Use passive listeners for better scroll performance
                window.addEventListener('scroll', requestScrollUpdate, { passive: true });
                window.addEventListener('touchmove', requestScrollUpdate, { passive: true });
              })();
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
          <div className="relative z-10">
            <LoadingOverlay />
            <Suspense fallback={null}>{children}</Suspense>
          </div>
          <FloatingCTA />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          {process.env.NODE_ENV === 'development' && (
            <>
              <PerformanceMonitor />
              <MobilePerformanceSummary />
            </>
          )}
        </FormProvider>
      </body>
    </html>
  )
}
