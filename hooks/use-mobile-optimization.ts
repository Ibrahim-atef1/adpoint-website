"use client"

import { useState, useEffect, useCallback } from "react"

interface MobileOptimization {
  isMobile: boolean
  isLowEnd: boolean
  reducedMotion: boolean
  particleCount: number
  animationQuality: 'high' | 'medium' | 'low'
  shouldDeferJS: boolean
}

export function useMobileOptimization(): MobileOptimization {
  const [optimization, setOptimization] = useState<MobileOptimization>({
    isMobile: false,
    isLowEnd: false,
    reducedMotion: false,
    particleCount: 12,
    animationQuality: 'high',
    shouldDeferJS: false,
  })

  // Safe fallback for SSR
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isLowEnd: false,
      reducedMotion: false,
      particleCount: 12,
      animationQuality: 'high',
      shouldDeferJS: false,
    }
  }

  const detectDevice = useCallback(() => {
    // Safety check for SSR
    if (typeof window === 'undefined') return
    
    try {
      const isMobile = window.innerWidth < 768
      const isLowEnd = isMobile && (
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) || 
        ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4) ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      )
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Determine particle count based on device capability - more aggressive for mobile
    let particleCount = 12
    if (isMobile && isLowEnd) {
      particleCount = 2
    } else if (isMobile) {
      particleCount = 4
    }
    
    // Determine animation quality
    let animationQuality: 'high' | 'medium' | 'low' = 'high'
    if (isLowEnd) {
      animationQuality = 'low'
    } else if (isMobile) {
      animationQuality = 'medium'
    }
    
    // Determine if JS should be deferred
    const shouldDeferJS = isMobile && isLowEnd

      setOptimization({
        isMobile,
        isLowEnd,
        reducedMotion,
        particleCount,
        animationQuality,
        shouldDeferJS,
      })
    } catch (error) {
      console.warn('Mobile optimization detection failed:', error)
      // Set safe defaults on error
      setOptimization({
        isMobile: false,
        isLowEnd: false,
        reducedMotion: false,
        particleCount: 12,
        animationQuality: 'high',
        shouldDeferJS: false,
      })
    }
  }, [])

  useEffect(() => {
    // Safety check for SSR
    if (typeof window === 'undefined') return
    
    try {
      detectDevice()
      
      const handleResize = () => {
        // Throttle resize detection
        setTimeout(() => {
          try {
            detectDevice()
          } catch (error) {
            console.warn('Resize detection failed:', error)
          }
        }, 100)
      }
      
      window.addEventListener('resize', handleResize, { passive: true })
      
      // Listen for reduced motion preference changes
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      const handleMotionChange = () => {
        try {
          detectDevice()
        } catch (error) {
          console.warn('Motion change detection failed:', error)
        }
      }
      mediaQuery.addEventListener('change', handleMotionChange)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        mediaQuery.removeEventListener('change', handleMotionChange)
      }
    } catch (error) {
      console.warn('Mobile optimization setup failed:', error)
    }
  }, [detectDevice])

  return optimization
}
