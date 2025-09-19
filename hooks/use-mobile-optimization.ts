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

  const detectDevice = useCallback(() => {
    const isMobile = window.innerWidth < 768
    const isLowEnd = isMobile && (
      navigator.hardwareConcurrency <= 2 || 
      navigator.deviceMemory <= 4 ||
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
  }, [])

  useEffect(() => {
    detectDevice()
    
    const handleResize = () => {
      // Throttle resize detection
      setTimeout(detectDevice, 100)
    }
    
    window.addEventListener('resize', handleResize, { passive: true })
    
    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = () => detectDevice()
    mediaQuery.addEventListener('change', handleMotionChange)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [detectDevice])

  return optimization
}
