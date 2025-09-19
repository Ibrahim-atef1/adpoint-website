"use client"

import { useEffect, useState } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { MobileOptimizedParticles } from "./mobile-optimized-particles"

interface MobileOptimizedLayoutProps {
  children: React.ReactNode
}

export function MobileOptimizedLayout({ children }: MobileOptimizedLayoutProps) {
  const { isMobile, isLowEnd, shouldDeferJS } = useMobileOptimization()
  const [shouldLoadParticles, setShouldLoadParticles] = useState(false)
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false)

  useEffect(() => {
    // Defer non-essential loading on mobile
    if (isMobile) {
      // Load particles after initial render
      const particleTimer = setTimeout(() => {
        setShouldLoadParticles(true)
      }, 1000)

      // Load analytics after user interaction or 3 seconds
      const analyticsTimer = setTimeout(() => {
        setShouldLoadAnalytics(true)
      }, 3000)

      return () => {
        clearTimeout(particleTimer)
        clearTimeout(analyticsTimer)
      }
    } else {
      // Load immediately on desktop
      setShouldLoadParticles(true)
      setShouldLoadAnalytics(true)
    }
  }, [isMobile])

  return (
    <>
      {children}
      
      {/* Conditionally load particles based on device capability */}
      {shouldLoadParticles && (
        <MobileOptimizedParticles 
          className={isLowEnd ? "opacity-50" : ""}
        />
      )}
      
      {/* Defer analytics loading on mobile */}
      {shouldLoadAnalytics && (
        <div id="deferred-analytics" />
      )}
    </>
  )
}
