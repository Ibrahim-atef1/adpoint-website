"use client"

import { useEffect } from 'react'

export function ModernJSDetector() {
  useEffect(() => {
    // Detect modern browser features
    const isModern = () => {
      // Check for modern JavaScript features
      const hasES2020 = typeof BigInt !== 'undefined' && 
                       typeof Symbol !== 'undefined' && 
                       typeof globalThis !== 'undefined'
      
      // Check for modern CSS features
      const hasCSSGrid = CSS.supports('display', 'grid')
      const hasFlexbox = CSS.supports('display', 'flex')
      
      // Check for modern Web APIs
      const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined'
      const hasResizeObserver = typeof ResizeObserver !== 'undefined'
      const hasRequestIdleCallback = typeof requestIdleCallback !== 'undefined'
      
      // Check for modern performance APIs
      const hasPerformanceObserver = typeof PerformanceObserver !== 'undefined'
      const hasUserTiming = typeof performance !== 'undefined' && 
                           typeof performance.mark === 'function'
      
      return hasES2020 && hasCSSGrid && hasFlexbox && 
             hasIntersectionObserver && hasResizeObserver && 
             hasRequestIdleCallback && hasPerformanceObserver && hasUserTiming
    }

    // Add modern browser class for CSS optimizations
    if (isModern()) {
      document.documentElement.classList.add('modern-browser')
      
      // Enable modern JavaScript optimizations
      document.documentElement.setAttribute('data-js-version', 'modern')
      
      // Log for debugging
      console.log('🚀 Modern browser detected - enabling optimizations')
    } else {
      document.documentElement.classList.add('legacy-browser')
      document.documentElement.setAttribute('data-js-version', 'legacy')
      
      console.log('⚠️ Legacy browser detected - using fallbacks')
    }
  }, [])

  return null
}
