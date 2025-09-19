"use client"

import { useEffect, useState } from "react"
import { useMobileAnimations } from "@/hooks/use-mobile-animations"

export function DeferredAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const { isMobile, reducedMotion } = useMobileAnimations()

  useEffect(() => {
    // Defer analytics loading based on device capability
    const delay = isMobile ? 3000 : 1000
    
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, delay)

    // Also load on user interaction
    const loadOnInteraction = () => {
      setShouldLoad(true)
      clearTimeout(timer)
    }

    // Load on user interaction
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    events.forEach(event => {
      document.addEventListener(event, loadOnInteraction, { once: true, passive: true })
    })

    return () => {
      clearTimeout(timer)
      events.forEach(event => {
        document.removeEventListener(event, loadOnInteraction)
      })
    }
  }, [isMobile])

  if (!shouldLoad) {
    return null
  }

  // Dynamically import analytics only when needed
  return (
    <div id="deferred-analytics">
      {/* Analytics will be loaded here */}
    </div>
  )
}
