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
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p className="text-gray-400 mb-4">Please wait while we load the content.</p>
        </div>
      </div>
    )
  }

  try {
    return <>{children}</>
  } catch (error) {
    console.warn('Mobile fallback caught error:', error)
    setHasError(true)
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-4">We're working to fix this issue.</p>
          <button
            onClick={() => setHasError(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }
}
