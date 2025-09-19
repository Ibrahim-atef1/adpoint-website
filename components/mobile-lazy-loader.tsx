"use client"

import { useState, useEffect, useRef, ReactNode } from "react"
import { motion } from "framer-motion"

interface MobileLazyLoaderProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
  mobileThreshold?: number
  mobileRootMargin?: string
}

export function MobileLazyLoader({ 
  children, 
  fallback = <div className="min-h-screen bg-background" />,
  rootMargin = "50px",
  threshold = 0.1,
  className = "",
  mobileThreshold = 0.05,
  mobileRootMargin = "100px"
}: MobileLazyLoaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    
    return () => window.removeEventListener('resize', checkMobile)
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
        rootMargin: isMobile ? mobileRootMargin : rootMargin,
        threshold: isMobile ? mobileThreshold : threshold
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
  }, [rootMargin, threshold, isMobile, mobileThreshold, mobileRootMargin, hasLoaded])

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: isMobile ? 0.1 : 0.2
          }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {fallback}
        </motion.div>
      )}
    </div>
  )
}
