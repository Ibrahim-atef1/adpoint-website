import type React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import { LoadingOverlay } from "@/components/loading-overlay"
import { FloatingCTA } from "@/components/floating-cta"
import { FormProvider } from "@/contexts/FormContext"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { MobilePerformanceSummary } from "@/components/mobile-performance-summary"
import { DeferredAnalytics } from "@/components/deferred-analytics"
import { PerformanceOptimizationSummary } from "@/components/performance-optimization-summary"
import { MobilePerformanceBoost } from "@/components/mobile-performance-boost"
import { ErrorBoundary } from "@/components/error-boundary"
import { ModernJSDetector } from "@/components/modern-js-detector"
import { MobileFallback } from "@/components/mobile-fallback"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: false,
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: false,
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
        {/* Optimized resource hints - non-blocking */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        
        {/* Preconnect only for critical resources */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload only critical LCP resources */}
        <link rel="preload" href="/logo/Transparent Logo.png" as="image" type="image/png" />
        
        {/* Mobile performance hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ef4444" />
        <meta name="color-scheme" content="dark" />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold styles */
            .hero-section {
              background: linear-gradient(135deg, rgba(185, 28, 28, 0.1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(185, 28, 28, 0.05) 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .hero-title {
              font-family: 'Poppins', sans-serif;
              font-weight: 700;
              font-size: clamp(2.5rem, 8vw, 8rem);
              line-height: 1.1;
              text-align: center;
              color: white;
            }
            .performance-optimized {
              will-change: transform, opacity;
              transform: translate3d(0, 0, 0);
              backface-visibility: hidden;
            }
            
            /* Mobile-specific critical optimizations */
            @media (max-width: 768px) {
              .hero-section {
                background-attachment: scroll;
                -webkit-transform: translate3d(0,0,0);
                transform: translate3d(0,0,0);
              }
              .hero-title {
                font-size: clamp(2rem, 12vw, 4rem);
                line-height: 1.2;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              .mobile-optimized {
                -webkit-overflow-scrolling: touch;
                overscroll-behavior: contain;
                contain: layout style paint;
              }
              /* Prevent layout shifts */
              .no-layout-shift {
                contain: layout style paint;
                will-change: auto;
              }
              /* Optimize animations for mobile */
              .mobile-performance {
                will-change: transform, opacity;
                transform: translate3d(0, 0, 0);
                backface-visibility: hidden;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
            }
          `
        }} />
        
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
                
                // Mobile-specific optimizations
                if (window.innerWidth < 768) {
                  // Defer non-critical mobile scripts
                  const deferMobileScripts = () => {
                    // Defer analytics and non-critical scripts on mobile
                    setTimeout(() => {
                      if (window.requestIdleCallback) {
                        requestIdleCallback(() => {
                          // Load non-critical mobile scripts here
                        });
                      }
                    }, 2000);
                  };
                  
                  // Defer after initial load
                  if (document.readyState === 'complete') {
                    deferMobileScripts();
                  } else {
                    window.addEventListener('load', deferMobileScripts, { once: true });
                  }
                  
                  // Optimize mobile touch events
                  document.addEventListener('touchstart', function() {}, { passive: true });
                  document.addEventListener('touchmove', function() {}, { passive: true });
                }
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
          <ModernJSDetector />
          <MobileFallback>
            <ErrorBoundary>
              <div className="relative z-10">
                <LoadingOverlay />
                <Suspense fallback={null}>{children}</Suspense>
              </div>
            </ErrorBoundary>
          </MobileFallback>
          <FloatingCTA />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <Suspense fallback={null}>
            <SpeedInsights />
          </Suspense>
          <ErrorBoundary>
            <DeferredAnalytics />
          </ErrorBoundary>
          {process.env.NODE_ENV === 'development' && (
            <>
              <ErrorBoundary>
                <PerformanceMonitor />
              </ErrorBoundary>
              <ErrorBoundary>
                <MobilePerformanceSummary />
              </ErrorBoundary>
              <ErrorBoundary>
                <PerformanceOptimizationSummary />
              </ErrorBoundary>
          <ErrorBoundary>
            <MobilePerformanceBoost />
          </ErrorBoundary>
        </>
      )}
    </FormProvider>
      </body>
    </html>
  )
}
