"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface PerformanceLazyLoaderProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
}

export function PerformanceLazyLoader({ 
  children, 
  fallback = <div className="min-h-screen bg-background" />,
  rootMargin = "50px",
  threshold = 0.1,
  className = ""
}: PerformanceLazyLoaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLowEnd, setIsLowEnd] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Safe mobile detection without hook
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkDevice = () => {
      const mobile = window.innerWidth < 768
      const lowEnd = mobile && (
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
        ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4) ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      )
      setIsMobile(mobile)
      setIsLowEnd(lowEnd)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice, { passive: true })
    
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
          
          // Unobserve after loading to improve performance
          observer.unobserve(entry.target)
        }
      },
      { 
        rootMargin: isMobile ? "100px" : rootMargin,
        threshold: isLowEnd ? 0.05 : threshold
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [rootMargin, threshold, isMobile, isLowEnd, hasLoaded])

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback}
    </div>
  )
}
