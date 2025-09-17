"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Palette, Globe, Megaphone, BarChart3, Camera, Code } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Particle {
  x: number
  y: number
  r: number
  dx: number
  dy: number
  alpha: number
  life: number
}

interface ServiceCardProps {
  title: string
  icon: React.ReactNode
  color: string
  description: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, color, description }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | null>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const createParticle = useCallback((x: number, y: number): Particle => {
    return {
      x,
      y,
      r: Math.random() * 1 + 0.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.4 + 0.3,
      life: Math.random() * 60 + 30,
    }
  }, [])

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    particles.current = []
    for (let i = 0; i < 10; i++) {
      particles.current.push(
        createParticle(Math.random() * canvas.width, Math.random() * canvas.height)
      )
    }
  }, [createParticle])

  const animateParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particles.current.length; i++) {
      const p = particles.current[i]

      // Apply cursor influence
      const dxMouse = mouse.current.x - p.x
      const dyMouse = mouse.current.y - p.y
      const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

      if (distance < 100) {
        p.dx -= (dxMouse / distance) * 0.005
        p.dy -= (dyMouse / distance) * 0.005
      }

      p.x += p.dx
      p.y += p.dy
      p.life -= 1

      // Bounce off walls
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1

      // Fade out
      p.alpha = Math.max(0, p.life / 60)

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(194,69,51, ${p.alpha * 0.4})`
      ctx.fill()

      // Remove dead particles and create new ones
      if (p.life <= 0) {
        particles.current[i] = createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      }
    }

    animationFrameId.current = requestAnimationFrame(animateParticles)
  }, [createParticle])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles(canvas)
    }

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent
      const rect = (canvas as HTMLCanvasElement).getBoundingClientRect()
      mouse.current = {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top,
      }
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove as EventListener)

    handleResize()
    animationFrameId.current = requestAnimationFrame(animateParticles)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove as EventListener)
    }
  }, [animateParticles, initParticles])

  return (
    <div
      className="relative w-[500px] h-[600px] bg-black rounded-3xl overflow-hidden flex-shrink-0
                 transition-all duration-700 ease-out group cursor-pointer mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${Math.sin(Date.now() * 0.001) * 1}deg) rotateY(${Math.cos(Date.now() * 0.001) * 1}deg) scale(1.02)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        boxShadow: isHovered 
          ? `0 30px 60px rgba(194,69,51,0.4), 0 0 80px rgba(194,69,51,0.3)` 
          : '0 15px 30px rgba(0,0,0,0.6)'
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/50" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-12">
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center mb-8 transition-all duration-700"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}40)`,
            transform: isHovered ? 'scale(1.15) rotate(8deg)' : 'scale(1) rotate(0deg)',
            boxShadow: isHovered ? `0 0 40px ${color}60` : 'none'
          }}
        >
          <div className="text-6xl" style={{ color }}>
            {icon}
          </div>
        </div>
        
        <h3 className="text-4xl font-bold text-white text-center font-display mb-4">
          {title}
        </h3>
        
        {/* Description that appears on hover */}
        <div 
          className={`text-lg text-gray-300 text-center leading-relaxed max-w-md transition-all duration-500 ${
            isHovered 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-4'
          }`}
        >
          {description}
        </div>
      </div>
    </div>
  )
}

export function ServicesCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || isMobile) return

    const cards = containerRef.current.querySelectorAll('.card-container')
    const totalCards = cards.length
    const cardWidth = window.innerWidth

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        x: -(cardWidth * (totalCards - 1)),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top center",
          end: () => `+=${cardWidth * totalCards}`,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  const services = [
    {
      title: "Brand Identity",
      icon: <Palette className="w-16 h-16" />,
      color: "#ef4444",
      description: "Complete brand development from logo design to comprehensive brand guidelines that make your business unforgettable and distinctive in the market."
    },
    {
      title: "Web Development",
      icon: <Globe className="w-16 h-16" />,
      color: "#3b82f6",
      description: "Custom websites and web applications built with cutting-edge technology for optimal performance, user experience, and business growth."
    },
    {
      title: "Digital Marketing",
      icon: <Megaphone className="w-16 h-16" />,
      color: "#10b981",
      description: "Data-driven marketing campaigns across all digital channels to maximize your reach, engagement, and conversion rates effectively."
    },
    {
      title: "SEO & Analytics",
      icon: <BarChart3 className="w-16 h-16" />,
      color: "#f59e0b",
      description: "Boost your online visibility and make informed decisions with our expert SEO strategies and comprehensive analytics insights."
    },
    {
      title: "Content Creation",
      icon: <Camera className="w-16 h-16" />,
      color: "#8b5cf6",
      description: "Engaging and high-quality content that tells your story, attracts your audience, and converts visitors into loyal customers."
    },
    {
      title: "Technical Solutions",
      icon: <Code className="w-16 h-16" />,
      color: "#06b6d4",
      description: "Custom software solutions, integrations, and technical consulting to streamline your business operations and boost efficiency."
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full min-h-screen py-20 bg-black"
    >
      {/* Section Headline - Separate from scrollable content */}
      <div className="relative z-20 px-8">
        <h2 className="text-5xl font-bold text-white text-center mb-20 font-display">
          Our Services
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      {isMobile ? (
        <div className="flex flex-col items-center space-y-16 px-8">
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
        </div>
      ) : (
        <div ref={containerRef} className="flex flex-nowrap items-center justify-center">
          {services.map((service, i) => (
            <div key={i} className="card-container flex items-center justify-center w-screen h-screen min-h-screen">
              <ServiceCard {...service} />
                      </div>
          ))}
        </div>
      )}
    </section>
  )
}
