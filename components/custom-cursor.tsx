"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Only run on client side to prevent hydration issues
    if (typeof window === 'undefined') return
    
    setIsClient(true)
    
    // Check if device is mobile/touch device
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isTouchDevice || isSmallScreen)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isClient || typeof window === 'undefined' || isMobile) return

    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0
    let velocityX = 0
    let velocityY = 0
    
    // Ball is now the cursor
    let ballX = 0
    let ballY = 0

    // Physics constants for outline following
    const friction = 0.15
    const spring = 0.1
    const mass = 0.8
    
    // Ball is now the cursor - outline follows it
    const outlineDelay = 0.1  // Delay for outline following ball
    const outlineLerpFactor = 0.15  // Smooth following of outline

            // Hide default cursor globally
            document.body.style.cursor = 'none'
            
            // Hide cursor on all elements
            const style = document.createElement('style')
            style.setAttribute('data-custom-cursor', 'true')
            style.textContent = `
              * {
                cursor: none !important;
              }
            `
            document.head.appendChild(style)

    let lastMouseX = 0
    let lastMouseY = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      // Ball follows mouse directly (ball is the cursor)
      ballX = mouseX
      ballY = mouseY
      
      lastMouseX = mouseX
      lastMouseY = mouseY
      
      console.log("Mouse position:", { mouseX, mouseY })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Only apply hover effects for buttons
      if (target.matches('button, [role="button"]')) {
        gsap.to(cursor, { 
          scale: 1.5, 
          duration: 0.3, 
          ease: "back.out(1.7)",
          boxShadow: '0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 60px #ff0000'
        })
        gsap.to(follower, { scale: 2, duration: 0.3, ease: "back.out(1.7)" })
        cursor.style.background = '#ff0000'
        follower.style.borderColor = 'rgba(255, 0, 0, 0.8)'
      }
      // No hover effects for other elements
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Only remove hover effects when leaving buttons
      if (target.matches('button, [role="button"]')) {
        gsap.to(cursor, { 
          scale: 1, 
          duration: 0.3,
          boxShadow: 'none'
        })
        gsap.to(follower, { scale: 1, duration: 0.3 })
        cursor.style.background = '#8a0000'
        follower.style.borderColor = '#b91c1c'
      }
      
      // Only hide if leaving the document entirely
      if (target === document.documentElement) {
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 })
        gsap.to(follower, { scale: 0, opacity: 0, duration: 0.3 })
      }
    }

    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.7, duration: 0.1 })
      gsap.to(follower, { scale: 1.5, duration: 0.1 })
    }

    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2, ease: "back.out(1.7)" })
      gsap.to(follower, { scale: 1, duration: 0.2, ease: "back.out(1.7)" })
    }

    // Show cursor immediately
    gsap.set(cursor, { 
      opacity: 1, 
      scale: 1,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    })
    gsap.set(follower, { 
      opacity: 0.8, 
      scale: 1,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    })
    
    console.log("Custom cursor initialized:", { cursor, follower })
    
    // Force visibility with inline styles
    if (cursor) {
      cursor.style.display = 'block'
      cursor.style.visibility = 'visible'
      cursor.style.opacity = '1'
      cursor.style.transform = 'translate(-50%, -50%)'
    }
    if (follower) {
      follower.style.display = 'block'
      follower.style.visibility = 'visible'
      follower.style.opacity = '0.8'
    }
    
    // Initialize ball position at center of screen
    ballX = window.innerWidth / 2
    ballY = window.innerHeight / 2
    
    // Initialize mouse position
    lastMouseX = window.innerWidth / 2
    lastMouseY = window.innerHeight / 2

    // Test: Ball follows mouse directly (no test needed)
    console.log("Ball is now the cursor, outline follows it")

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    // Animation loop with physics
    const animate = () => {
      // Outer circle physics (follows mouse with lag)
      const springForceX = (mouseX - followerX) * spring
      const springForceY = (mouseY - followerY) * spring

      // Apply forces with mass
      velocityX += springForceX / mass
      velocityY += springForceY / mass

      // Apply friction
      velocityX *= (1 - friction)
      velocityY *= (1 - friction)

      // Ball follows mouse directly (immediate)
      // Outline follows ball with delay
      followerX += (ballX - followerX) * outlineLerpFactor
      followerY += (ballY - followerY) * outlineLerpFactor

      // Update ball position (immediate, ball is the cursor)
      gsap.set(cursor, {
        x: ballX,
        y: ballY,
        opacity: 1,
        scale: 1
      })

      // Update outline position (follows ball with delay)
      gsap.to(follower, {
        x: followerX,
        y: followerY,
        duration: outlineDelay,
        ease: "power2.out"
      })
      
      // Debug ball position occasionally
      if (Math.random() < 0.01) {
        console.log("Ball position:", { ballX, ballY, mouseX, mouseY })
      }

      requestAnimationFrame(animate)
    }

    animate()

            // Cleanup
            return () => {
              document.removeEventListener('mousemove', handleMouseMove)
              document.removeEventListener('mousedown', handleMouseDown)
              document.removeEventListener('mouseup', handleMouseUp)
              document.removeEventListener('mouseenter', handleMouseEnter, true)
              document.removeEventListener('mouseleave', handleMouseLeave, true)
              document.body.style.cursor = 'auto'
              
              // Remove the global cursor hiding style
              const existingStyle = document.querySelector('style[data-custom-cursor]')
              if (existingStyle) {
                existingStyle.remove()
              }
            }
  }, [isClient, isMobile])

  if (!isClient || isMobile) return null

  return (
    <>
      {/* Outer circle */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9998]"
        style={{
          transform: 'translate(-50%, -50%)',
          opacity: 0.6,
          scale: 1,
          border: '2px solid #b91c1c',
          background: 'transparent',
          boxShadow: '0 0 15px rgba(185, 28, 28, 0.3)',
          left: 0,
          top: 0
        }}
      />
      
      {/* Inner sphere - positioned independently */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]"
        style={{
          transform: 'translate(-50%, -50%)',
          opacity: 1,
          scale: 1,
            background: '#8a0000',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          left: 0,
          top: 0
        }}
      />
    </>
  )
}
