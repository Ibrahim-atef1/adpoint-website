"use client"

import React, { useEffect, useRef, useCallback } from "react"

interface ParticleBackgroundProps {
  className?: string
  particleCount?: number
  color?: string
  followCursor?: boolean
}

export function ParticleBackground({ 
  className = "", 
  particleCount = 40, 
  color = "rgba(185, 28, 28, 0.6)",
  followCursor = true 
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Array<{
    x: number
    y: number
    r: number
    dx: number
    dy: number
    opacity: number
    targetOpacity: number
  }>>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const initParticles = useCallback(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    particlesRef.current = []
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        targetOpacity: Math.random() * 0.5 + 0.2
      })
    }
  }, [particleCount])

  const animate = useCallback(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.dx
      particle.y += particle.dy

      // Cursor influence
      if (followCursor && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const mouseX = mouseRef.current.x - rect.left
        const mouseY = mouseRef.current.y - rect.top
        
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.dx += (dx / distance) * force * 0.01
          particle.dy += (dy / distance) * force * 0.01
        }
      }

      // Boundary collision
      if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x))
      particle.y = Math.max(0, Math.min(canvas.height, particle.y))

      // Fade opacity
      particle.opacity += (particle.targetOpacity - particle.opacity) * 0.02

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
      ctx.fillStyle = color.replace(/[\d.]+\)$/g, `${particle.opacity})`)
      ctx.fill()

      // Add subtle glow
      ctx.shadowColor = color
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.r * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = color.replace(/[\d.]+\)$/g, `${particle.opacity * 0.3})`)
      ctx.fill()
      ctx.shadowBlur = 0
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [color, followCursor])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleResize = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    
    canvas.width = rect.width
    canvas.height = rect.height
    
    // Reinitialize particles with new dimensions
    initParticles()
  }, [initParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // Set initial canvas size
    const rect = container.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Initialize particles
    initParticles()

    // Start animation
    animate()

    // Add event listeners
    if (followCursor) {
      window.addEventListener("mousemove", handleMouseMove)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (followCursor) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [animate, handleMouseMove, handleResize, initParticles, followCursor])

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          pointerEvents: "none",
          willChange: "transform"
        }}
      />
    </div>
  )
}
