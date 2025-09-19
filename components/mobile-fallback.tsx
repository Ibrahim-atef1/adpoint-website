"use client"

import { useEffect, useState } from 'react'

interface MobileFallbackProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function MobileFallback({ children, fallback }: MobileFallbackProps) {
  const [isClient, setIsClient] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Show fallback during SSR or if there's an error
  if (!isClient || hasError) {
    return fallback || (
      <div className="min-h-screen bg-black" />
    )
  }

  try {
    return <>{children}</>
  } catch (error) {
    console.warn('Mobile fallback caught error:', error)
    setHasError(true)
    return fallback || (
      <div className="min-h-screen bg-black" />
    )
  }
}
