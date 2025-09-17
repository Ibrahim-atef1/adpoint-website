"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useMotionValue, useSpring, useTransform } from "framer-motion"

interface UseHorizontalScrollOptions {
  totalSlides: number
  slideWidth: number
  onSlideChange?: (index: number) => void
}

export function useHorizontalScroll({ totalSlides, slideWidth, onSlideChange }: UseHorizontalScrollOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  
  // Motion values for smooth horizontal scrolling
  const scrollX = useMotionValue(0)
  const velocity = useMotionValue(0)
  
  // Smooth spring animation with momentum
  const smoothX = useSpring(scrollX, {
    stiffness: 100,
    damping: 30,
    mass: 1,
    restDelta: 0.01
  })
  
  // Transform for horizontal movement
  const translateX = useTransform(smoothX, (value) => -value)
  
  // Refs for performance
  const lastTime = useRef(0)
  const isDragging = useRef(false)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const momentum = useRef(0)
  const lastVelocity = useRef(0)
  const frozenScrollY = useRef(0)
  
  // Freeze/unfreeze screen scroll
  const freezeScreen = useCallback(() => {
    frozenScrollY.current = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${frozenScrollY.current}px`
    document.body.style.width = '100%'
    console.log('Screen frozen at:', frozenScrollY.current)
  }, [])

  const unfreezeScreen = useCallback(() => {
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    window.scrollTo(0, frozenScrollY.current)
    console.log('Screen unfrozen, restored to:', frozenScrollY.current)
  }, [])

  // Update current slide based on scrollX
  useEffect(() => {
    const unsubscribe = scrollX.on("change", (latest) => {
      const newSlide = Math.round(latest / slideWidth)
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide)
        onSlideChange?.(newSlide)
      }
    })
    return () => unsubscribe()
  }, [scrollX, slideWidth, currentSlide, onSlideChange])

  // Handle wheel scrolling
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isActive || !containerRef.current) return
    
    e.preventDefault()
    e.stopPropagation()
    
    const deltaX = e.deltaX
    const deltaY = e.deltaY
    
    // Check if user is trying to scroll vertically (disengage)
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
      console.log('Vertical scroll detected, disengaging')
      setIsActive(false)
      unfreezeScreen()
      return
    }
    
    // Use deltaY as horizontal scroll when deltaX is 0 (trackpads)
    const horizontalDelta = deltaX !== 0 ? deltaX : deltaY
    
    if (Math.abs(horizontalDelta) > 0) {
      const currentX = scrollX.get()
      const newX = Math.max(0, Math.min(currentX + horizontalDelta * 0.8, (totalSlides - 1) * slideWidth))
      
      console.log('Horizontal scroll:', { deltaX, deltaY, horizontalDelta, currentX, newX })
      
      scrollX.set(newX)
      setIsScrolling(true)
      
      // Calculate velocity for momentum
      const now = performance.now()
      const deltaTime = now - lastTime.current
      if (deltaTime > 0) {
        const currentVelocity = horizontalDelta / deltaTime
        velocity.set(currentVelocity)
        lastVelocity.current = currentVelocity
      }
      lastTime.current = now
      
      // Reset scrolling state after a delay
      setTimeout(() => setIsScrolling(false), 150)
    }
  }, [isActive, scrollX, totalSlides, slideWidth, velocity, unfreezeScreen])

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!isActive) return
    e.preventDefault()
    isDragging.current = true
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    momentum.current = 0
  }, [isActive])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isActive || !isDragging.current) return
    e.preventDefault()
    
    const touch = e.touches[0]
    const deltaX = touchStartX.current - touch.clientX
    const deltaY = touchStartY.current - touch.clientY
    
    // Only handle horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      const currentX = scrollX.get()
      const newX = Math.max(0, Math.min(currentX + deltaX * 1.2, (totalSlides - 1) * slideWidth))
      scrollX.set(newX)
      
      // Calculate momentum
      const now = performance.now()
      const deltaTime = now - lastTime.current
      if (deltaTime > 0) {
        momentum.current = deltaX / deltaTime
      }
      lastTime.current = now
    }
  }, [isActive, scrollX, totalSlides, slideWidth])

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return
    
    isDragging.current = false
    
    // Apply momentum
    if (Math.abs(momentum.current) > 0.1) {
      const currentX = scrollX.get()
      const momentumDistance = momentum.current * 200
      const newX = Math.max(0, Math.min(currentX + momentumDistance, (totalSlides - 1) * slideWidth))
      scrollX.set(newX)
    }
    
    momentum.current = 0
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isActive) return
    e.preventDefault()
    
    const currentX = scrollX.get()
    let newX = currentX
    
    switch (e.key) {
      case 'ArrowLeft':
        newX = Math.max(0, currentX - slideWidth)
        break
      case 'ArrowRight':
        newX = Math.min((totalSlides - 1) * slideWidth, currentX + slideWidth)
        break
      case 'Home':
        newX = 0
        break
      case 'End':
        newX = (totalSlides - 1) * slideWidth
        break
      case 'Escape':
        setIsActive(false)
        unfreezeScreen()
        return
      default:
        return
    }
    
    if (newX !== currentX) {
      scrollX.set(newX)
    }
  }, [isActive, scrollX, totalSlides, slideWidth, unfreezeScreen])

  // Intersection observer for activation
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Section entered viewport, activating horizontal scroll')
            setIsActive(true)
            freezeScreen()
          } else {
            console.log('Section left viewport, deactivating horizontal scroll')
            setIsActive(false)
            unfreezeScreen()
          }
        })
      },
      {
        threshold: 0.6, // Trigger when 60% of section is visible
        rootMargin: '0px'
      }
    )
    
    observer.observe(container)
    
    return () => {
      observer.disconnect()
      unfreezeScreen()
    }
  }, [freezeScreen, unfreezeScreen])

  // Event listeners
  useEffect(() => {
    if (!isActive) return
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive, handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, handleKeyDown])

  return {
    containerRef,
    currentSlide,
    translateX: smoothX,
    isActive,
    isScrolling
  }
}