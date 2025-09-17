"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

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

interface ProjectCardProps {
  image: string
  title: string
  category: string
  results: string
  description: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  category,
  results,
  description,
}) => {
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
      
      {/* Project Image */}
      <div className="relative w-full h-full">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-all duration-700 ease-out ${
            isHovered ? "grayscale-0 scale-105" : "grayscale scale-100"
          }`}
          sizes="600px"
          priority={false}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {/* Results badge */}
        <div className="absolute top-6 right-6 bg-red-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
          {results}
        </div>
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="text-red-400 text-sm font-medium mb-3 uppercase tracking-wider">
            {category}
          </div>
          <h3 className="text-4xl font-bold text-white font-display mb-4">
            {title}
          </h3>
          
          {/* Description that appears on hover */}
          <div 
            className={`text-lg text-gray-300 leading-relaxed max-w-lg transition-all duration-500 ${
              isHovered 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-4'
            }`}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PortfolioSection() {
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

  const projects = [
    {
      image: "/architecture-firm-logo-with-building-silhouette.jpg",
      title: "Architecture Firm",
      category: "Brand Identity",
      results: "40% Growth",
      description: "A comprehensive brand identity system for a modern architecture firm, featuring clean typography, sophisticated color palette, and memorable logo design that reflects their innovative approach to sustainable building design."
    },
    {
      image: "/coffee-shop-branding-with-warm-colors-and-artisan-.jpg",
      title: "Coffee Shop Brand",
      category: "Visual Design",
      results: "25% Sales Up",
      description: "Warm and inviting brand identity for an artisanal coffee shop, incorporating hand-drawn elements, earthy tones, and authentic storytelling that resonates with coffee enthusiasts and local community members."
    },
    {
      image: "/digital-agency-logo-with-modern-geometric-design.jpg",
      title: "Digital Agency",
      category: "Web Design",
      results: "60% Leads",
      description: "Modern, geometric brand identity for a cutting-edge digital agency, featuring bold typography, dynamic layouts, and a tech-forward aesthetic that positions them as industry leaders in digital innovation."
    },
    {
      image: "/eco-friendly-brand-logo-with-green-leaf-element.jpg",
      title: "Eco Brand",
      category: "Brand Strategy",
      results: "35% Engagement",
      description: "Sustainable brand identity for an eco-friendly company, emphasizing environmental consciousness through organic shapes, green color schemes, and messaging that connects with environmentally conscious consumers."
    },
    {
      image: "/financial-services-logo-with-professional-design.jpg",
      title: "Financial Services",
      category: "Corporate Design",
      results: "50% Trust Score",
      description: "Professional and trustworthy brand identity for a financial services firm, featuring clean lines, conservative color palette, and design elements that convey stability, reliability, and expertise in financial matters."
    },
    {
      image: "/tech-company-logo-with-modern-typography.jpg",
      title: "Tech Startup",
      category: "UI/UX Design",
      results: "80% User Growth",
      description: "Innovative brand identity for a tech startup, combining modern typography, vibrant colors, and futuristic design elements that capture the company's forward-thinking approach and technological expertise."
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full min-h-screen py-20 bg-black"
    >
      {/* Section Headline - Separate from scrollable content */}
      <div className="relative z-20 px-8">
        <h2 className="text-5xl font-bold text-white text-center mb-20 font-display">
          Our Work
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      {isMobile ? (
        <div className="flex flex-col items-center space-y-16 px-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      ) : (
        <div ref={containerRef} className="flex flex-nowrap items-center justify-center">
          {projects.map((project, i) => (
            <div key={i} className="card-container flex items-center justify-center w-screen h-screen min-h-screen">
              <ProjectCard {...project} />
                    </div>
          ))}
        </div>
      )}
    </section>
  )
}
