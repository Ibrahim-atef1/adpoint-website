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

interface OptimizedParticlesProps {
  particleCount?: number
  mouseInteraction?: boolean
  className?: string
}

export function OptimizedParticles({ 
  particleCount = 12, 
  mouseInteraction = true,
  className = ""
}: OptimizedParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const lastTimeRef = useRef(0)

  const createParticle = useCallback((): Particle => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 1.5 + 0.6,
    opacity: Math.random() * 0.3 + 0.1,
    baseSize: Math.random() * 1.5 + 0.6,
    baseOpacity: Math.random() * 0.3 + 0.1,
  }), [])

  const initParticles = useCallback(() => {
    particlesRef.current = Array.from({ length: particleCount }, createParticle)
  }, [particleCount, createParticle])

  const updateParticles = useCallback((deltaTime: number) => {
    const mouseX = mouseRef.current.x
    const mouseY = mouseRef.current.y

    particlesRef.current.forEach(particle => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Wrap around screen
      if (particle.x < 0) particle.x = window.innerWidth
      if (particle.x > window.innerWidth) particle.x = 0
      if (particle.y < 0) particle.y = window.innerHeight
      if (particle.y > window.innerHeight) particle.y = 0

      // Mouse interaction
      if (mouseInteraction) {
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) {
          const force = (200 - distance) / 200
          const angle = Math.atan2(dy, dx)
          const repulsionForce = force * 0.04
          const attractionForce = force * 0.01

          particle.vx -= Math.cos(angle) * repulsionForce
          particle.vy -= Math.sin(angle) * repulsionForce
          particle.vx += Math.cos(angle + Math.PI) * attractionForce
          particle.vy += Math.sin(angle + Math.PI) * attractionForce

          particle.opacity = Math.min(0.9, particle.baseOpacity + force * 0.9)
          particle.size = Math.min(4, particle.baseSize + force * 1.8)
        } else {
          particle.vx *= 0.985
          particle.vy *= 0.985
          particle.opacity = Math.max(particle.baseOpacity * 0.4, particle.opacity * 0.996)
          particle.size = Math.max(particle.baseSize * 0.8, particle.size * 0.997)
        }
      } else {
        particle.vx *= 0.985
        particle.vy *= 0.985
        particle.opacity = Math.max(particle.baseOpacity * 0.4, particle.opacity * 0.996)
        particle.size = Math.max(particle.baseSize * 0.8, particle.size * 0.997)
      }
    })
  }, [mouseInteraction])

  const renderParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    particlesRef.current.forEach(particle => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      
      // Create gradient for particle
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
      
      ctx.restore()
    })
  }, [])

  const animate = useCallback((currentTime: number) => {
    const deltaTime = currentTime - lastTimeRef.current
    
    // Throttle to ~60fps
    if (deltaTime >= 16) {
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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

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
    
    // Add event listeners
    if (mouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [animate, handleMouseMove, handleResize, initParticles, mouseInteraction])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      style={{
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
    />
  )
}
