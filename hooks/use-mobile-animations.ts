"use client"

import { useState, useEffect } from "react"

interface MobileAnimationConfig {
  isMobile: boolean
  reducedMotion: boolean
  animationDuration: number
  staggerDelay: number
  ease: string
  useGPU: boolean
}

export function useMobileAnimations(): MobileAnimationConfig {
  const [config, setConfig] = useState<MobileAnimationConfig>({
    isMobile: false,
    reducedMotion: false,
    animationDuration: 0.6,
    staggerDelay: 0.1,
    ease: "easeOut",
    useGPU: true
  })

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth < 768
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      // Mobile-optimized animation settings
      const animationDuration = isMobile ? 0.4 : 0.6
      const staggerDelay = isMobile ? 0.05 : 0.1
      const ease = isMobile ? "easeOut" : "easeInOut"
      const useGPU = true // Always use GPU for better performance
      
      setConfig({
        isMobile,
        reducedMotion,
        animationDuration,
        staggerDelay,
        ease,
        useGPU
      })
    }

    checkDevice()
    window.addEventListener('resize', checkDevice, { passive: true })
    
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return config
}

// Mobile-optimized animation variants
export const mobileAnimationVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 }
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 }
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 }
  }
}

// Mobile-optimized transition presets
export const mobileTransitions = {
  fast: { duration: 0.3, ease: "easeOut" },
  normal: { duration: 0.5, ease: "easeOut" },
  slow: { duration: 0.7, ease: "easeOut" },
  spring: { type: "spring", damping: 25, stiffness: 200 },
  bounce: { type: "spring", damping: 15, stiffness: 300 }
}
