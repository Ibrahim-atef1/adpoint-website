"use client"

import { useEffect, useState, useRef, useCallback } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  vx: number
  vy: number
  baseSize: number
  baseOpacity: number
}

export function CursorEffect() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const lastUpdateTime = useRef(0)
  const isVisible = useRef(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const updateMousePosition = useCallback((e: MouseEvent) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  useEffect(() => {
    if (isMobile) return

    const initParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 12; i++) { // Reduced from 20 to 12 particles
        const baseSize = Math.random() * 1.5 + 0.6 // Smaller particles
        const baseOpacity = Math.random() * 0.3 + 0.1 // Lower opacity
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: baseSize,
          opacity: baseOpacity,
          vx: (Math.random() - 0.5) * 0.4, // Slower movement
          vy: (Math.random() - 0.5) * 0.4,
          baseSize,
          baseOpacity,
        })
      }
      particlesRef.current = newParticles
      setParticles(newParticles)
    }

    initParticles()

    const animateParticles = (currentTime: number) => {
      if (currentTime - lastUpdateTime.current < 200) { // Further reduced frequency for better performance
        animationFrameRef.current = requestAnimationFrame(animateParticles)
        return
      }
      lastUpdateTime.current = currentTime
      
      // Pause animation when tab is not visible
      if (document.hidden) {
        animationFrameRef.current = requestAnimationFrame(animateParticles)
        return
      }

      const mouseX = mousePositionRef.current.x
      const mouseY = mousePositionRef.current.y

      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i]
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) { // Reduced interaction distance
          const force = (200 - distance) / 200
          const angle = Math.atan2(dy, dx)
          const repulsionForce = force * 0.04 // Reduced force
          const attractionForce = force * 0.01 // Reduced force

          particle.x = (particle.x + particle.vx + window.innerWidth) % window.innerWidth
          particle.y = (particle.y + particle.vy + window.innerHeight) % window.innerHeight
          particle.vx = particle.vx - Math.cos(angle) * repulsionForce + Math.cos(angle + Math.PI) * attractionForce
          particle.vy = particle.vy - Math.sin(angle) * repulsionForce + Math.sin(angle + Math.PI) * attractionForce
          particle.opacity = Math.min(0.9, particle.baseOpacity + force * 0.9)
          particle.size = Math.min(4, particle.baseSize + force * 1.8)
        } else {
          particle.x = (particle.x + particle.vx + window.innerWidth) % window.innerWidth
          particle.y = (particle.y + particle.vy + window.innerHeight) % window.innerHeight
          particle.vx = particle.vx * 0.985
          particle.vy = particle.vy * 0.985
          particle.opacity = Math.max(particle.baseOpacity * 0.4, particle.opacity * 0.996)
          particle.size = Math.max(particle.baseSize * 0.8, particle.size * 0.997)
        }
      }

      setParticles([...particlesRef.current])
      animationFrameRef.current = requestAnimationFrame(animateParticles)
    }

    window.addEventListener("mousemove", updateMousePosition, { passive: true })
    animationFrameRef.current = requestAnimationFrame(animateParticles)

    const handleResize = () => {
      initParticles()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isMobile, updateMousePosition])

  if (isMobile) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(185,28,28,${particle.opacity}) 0%, rgba(185,28,28,${particle.opacity * 0.5}) 60%, transparent 100%)`,
            filter: `blur(${Math.max(1, particle.size * 0.5)}px)`,
            boxShadow: `0 0 ${particle.size * 4}px rgba(185,28,28,${particle.opacity * 0.8}), 0 0 ${particle.size * 8}px rgba(185,28,28,${particle.opacity * 0.4})`,
          }}
        />
      ))}
    </div>
  )
}
