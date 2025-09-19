"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  baseSize: number
  baseOpacity: number
}

interface MobileOptimizedParticlesProps {
  className?: string
}

export function MobileOptimizedParticles({ className = "" }: MobileOptimizedParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const lastTimeRef = useRef(0)
  const isMobileRef = useRef(false)

  const createParticle = useCallback((): Particle => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.2, // Slower movement on mobile
    vy: (Math.random() - 0.5) * 0.2,
    size: Math.random() * 1 + 0.5, // Smaller particles
    opacity: Math.random() * 0.2 + 0.05, // Lower opacity
    baseSize: Math.random() * 1 + 0.5,
    baseOpacity: Math.random() * 0.2 + 0.05,
  }), [])

  const initParticles = useCallback(() => {
    const isMobile = window.innerWidth < 768
    isMobileRef.current = isMobile
    
    // Reduce particle count on mobile
    const particleCount = isMobile ? 6 : 12
    particlesRef.current = Array.from({ length: particleCount }, createParticle)
  }, [createParticle])

  const updateParticles = useCallback((deltaTime: number) => {
    const isMobile = isMobileRef.current
    
    particlesRef.current.forEach(particle => {
      // Update position with mobile-optimized movement
      particle.x += particle.vx * (isMobile ? 0.5 : 1)
      particle.y += particle.vy * (isMobile ? 0.5 : 1)

      // Wrap around screen
      if (particle.x < 0) particle.x = window.innerWidth
      if (particle.x > window.innerWidth) particle.x = 0
      if (particle.y < 0) particle.y = window.innerHeight
      if (particle.y > window.innerHeight) particle.y = 0

      // Simplified physics for mobile
      if (isMobile) {
        particle.vx *= 0.99
        particle.vy *= 0.99
        particle.opacity = Math.max(particle.baseOpacity * 0.3, particle.opacity * 0.998)
        particle.size = Math.max(particle.baseSize * 0.7, particle.size * 0.999)
      } else {
        // Desktop physics (more complex)
        particle.vx *= 0.985
        particle.vy *= 0.985
        particle.opacity = Math.max(particle.baseOpacity * 0.4, particle.opacity * 0.996)
        particle.size = Math.max(particle.baseSize * 0.8, particle.size * 0.997)
      }
    })
  }, [])

  const renderParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    particlesRef.current.forEach(particle => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      
      // Simplified rendering for mobile
      if (isMobileRef.current) {
        // Simple circle for mobile
        ctx.fillStyle = `rgba(185, 28, 28, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Complex gradient for desktop
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        )
        gradient.addColorStop(0, `rgba(185, 28, 28, ${particle.opacity})`)
        gradient.addColorStop(0.6, `rgba(185, 28, 28, ${particle.opacity * 0.5})`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      }
      
      ctx.restore()
    })
  }, [])

  const animate = useCallback((currentTime: number) => {
    const deltaTime = currentTime - lastTimeRef.current
    
    // Throttle to 30fps on mobile, 60fps on desktop
    const targetFPS = isMobileRef.current ? 30 : 60
    const frameInterval = 1000 / targetFPS
    
    if (deltaTime >= frameInterval) {
      updateParticles(deltaTime)
      
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          renderParticles(ctx)
        }
      }
      
      lastTimeRef.current = currentTime
    }
    
    animationRef.current = requestAnimationFrame(animate)
  }, [updateParticles, renderParticles])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }
  }, [initParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    // Initialize particles
    initParticles()
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate)
    
    // Add resize listener
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [animate, handleResize, initParticles])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      style={{
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
      }}
    />
  )
}
