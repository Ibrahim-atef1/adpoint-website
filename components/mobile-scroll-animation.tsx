"use client"

import { useEffect, useRef, useState } from "react"

interface MobileScrollAnimationProps {
  children: React.ReactNode
  animationType?: "fade-in" | "slide-in-left" | "slide-in-right" | "scale-in" | "scroll-animate"
  staggerDelay?: number
  threshold?: number
  className?: string
}

export function MobileScrollAnimation({ 
  children, 
  animationType = "fade-in", 
  staggerDelay = 0,
  threshold = 0.1,
  className = ""
}: MobileScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, staggerDelay * 1000)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, staggerDelay])

  const getAnimationClass = () => {
    const baseClass = `mobile-${animationType}`
    const staggerClass = staggerDelay > 0 ? `mobile-stagger-${Math.min(staggerDelay * 10, 5)}` : ""
    const visibleClass = isVisible ? "visible" : ""
    
    return `${baseClass} ${staggerClass} ${visibleClass} ${className}`.trim()
  }

  return (
    <div 
      ref={ref} 
      className={`${getAnimationClass()} performance-optimized`}
      style={{
        willChange: 'transform, opacity',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  )
}
