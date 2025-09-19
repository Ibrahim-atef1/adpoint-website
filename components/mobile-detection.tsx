"use client"

import { useEffect, useState } from 'react'

interface MobileDetectionProps {
  children: (isMobile: boolean) => React.ReactNode
}

export function MobileDetection({ children }: MobileDetectionProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Safety check for SSR
    if (typeof window === 'undefined') {
      setIsLoaded(true)
      return
    }

    try {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
        setIsLoaded(true)
      }

      checkMobile()

      const handleResize = () => {
        setTimeout(checkMobile, 100)
      }

      window.addEventListener('resize', handleResize, { passive: true })

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    } catch (error) {
      console.warn('Mobile detection failed:', error)
      setIsLoaded(true)
    }
  }, [])

  // Show loading state during SSR or initial load
  if (!isLoaded) {
    return <div className="min-h-screen bg-black" />
  }

  return <>{children(isMobile)}</>
}
