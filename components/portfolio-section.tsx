"use client"

import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectCardProps {
  title: string
  category: string
  results: string
  description: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, results, description }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  // On mobile, show description when in view. On desktop, show on hover
  const shouldShowDescription = typeof window !== 'undefined' && window.innerWidth < 768 ? isInView : isHovered

  return (
    <div 
      ref={cardRef}
      className="relative w-full max-w-[500px] h-[400px] sm:h-[500px] lg:h-[600px] bg-black rounded-2xl overflow-hidden flex-shrink-0 border border-gray-800 transition-all duration-1000 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: shouldShowDescription 
          ? '0 0 30px rgba(185, 28, 28, 0.4), 0 0 60px rgba(185, 28, 28, 0.2), 0 0 90px rgba(185, 28, 28, 0.1)' 
          : '0 0 15px rgba(185, 28, 28, 0.2), 0 0 30px rgba(185, 28, 28, 0.1)',
        willChange: 'transform, box-shadow',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {/* Underglow effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle at center, rgba(185, 28, 28, 0.15), transparent 70%)',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 sm:p-6 lg:p-8 text-center">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 transition-all duration-1000 relative ${isHovered ? 'scale-110' : 'scale-100'}`} style={{ 
          boxShadow: `0 0 25px rgba(185, 28, 28, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)`,
          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
        }}>
          {/* Animated background ring */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 transition-all duration-1000"
            style={{
              background: 'conic-gradient(from 0deg, rgba(185, 28, 28, 0.4), transparent, rgba(185, 28, 28, 0.2))',
              transform: isHovered ? 'rotate(360deg)' : 'rotate(0deg)',
              opacity: isHovered ? 1 : 0
            }}
          />
          
          {/* Floating particles around letter */}
          {isHovered && [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-ping"
              style={{
                background: '#ef4444',
                left: `${20 + i * 20}%`,
                top: `${20 + i * 20}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
          
          <span 
            className="text-xl sm:text-2xl font-bold text-white transition-all duration-1000 relative z-10"
            style={{
              transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
              filter: isHovered ? 'drop-shadow(0 0 8px currentColor)' : 'none'
            }}
          >
            {title.charAt(0)}
          </span>
        </div>
        
        <div className="text-red-400 text-xs sm:text-sm font-medium mb-2 uppercase tracking-wider">
          {category}
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-3 sm:mb-4 float">
          {title}
        </h3>
        
        <div className="bg-red-600/20 text-red-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 backdrop-blur-sm border border-red-400/20">
          {results}
        </div>

        {/* Hover Description */}
        <div className={`transition-all duration-1000 ${shouldShowDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return

    const viewportWidth = window.innerWidth
    const isMobile = viewportWidth < 768
    
    if (isMobile) {
      // On mobile, stack cards vertically without horizontal scroll
      return
    }

    const cardWidth = 500 + 40 // card width + gap
    const totalCards = 6
    const totalScrollDistance = (totalCards - 1) * cardWidth

    // Create progress bar
    const progressBar = document.createElement('div')
    progressBar.className = 'fixed top-0 left-0 w-full h-1 bg-gray-800 z-50'
    progressBar.innerHTML = '<div class="h-full bg-red-600 transition-all duration-300 ease-out" style="width: 0%"></div>'
    document.body.appendChild(progressBar)

    const ctx = gsap.context(() => {
      // Center the first card by offsetting the container
      const centerOffset = (viewportWidth - cardWidth) / 2
      gsap.set(containerRef.current, { x: centerOffset })

      // Calculate scroll distance to show all cards
      const scrollDistance = totalScrollDistance

      gsap.to(containerRef.current, {
        x: centerOffset - scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          onUpdate: (self) => {
            const progress = (self.progress * 100).toFixed(1)
            const progressFill = progressBar.querySelector('div') as HTMLElement
            if (progressFill) {
              progressFill.style.width = `${progress}%`
            }
          }
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      if (progressBar.parentNode) {
        progressBar.parentNode.removeChild(progressBar)
      }
    }
  }, [])

  const projects = [
    { 
      title: "Architecture Firm", 
      category: "Brand Identity", 
      results: "40% Growth",
      description: "Complete brand identity redesign for a modern architecture firm. Created a sophisticated visual system that elevated their market presence and increased client inquiries by 40%."
    },
    { 
      title: "Coffee Shop Brand", 
      category: "Visual Design", 
      results: "25% Sales Up",
      description: "Warm, artisanal branding for a local coffee shop. Developed a cohesive visual identity that captured the cozy, authentic atmosphere and boosted sales by 25%."
    },
    { 
      title: "Digital Agency", 
      category: "Web Design", 
      results: "60% Leads",
      description: "Modern, conversion-focused website design for a digital marketing agency. Implemented strategic UX improvements that increased lead generation by 60%."
    },
    { 
      title: "Eco Brand", 
      category: "Brand Strategy", 
      results: "35% Engagement",
      description: "Sustainable brand strategy for an eco-friendly marketplace. Developed messaging and visual identity that resonated with environmentally conscious consumers, increasing engagement by 35%."
    },
    { 
      title: "Financial Services", 
      category: "Corporate Design", 
      results: "50% Trust Score",
      description: "Professional corporate identity for a financial services company. Created a trustworthy, authoritative brand presence that improved customer confidence and trust scores by 50%."
    },
    { 
      title: "Tech Startup", 
      category: "UI/UX Design", 
      results: "80% User Growth",
      description: "Intuitive mobile app design for a tech startup. Focused on user experience and accessibility, resulting in 80% user growth and high user retention rates."
    },
  ]

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-black">
      {/* Header */}
      <div className="absolute top-8 left-0 right-0 z-20 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center font-display">
          Our Work
        </h2>
      </div>

      {/* Cards Container */}
      <div className="relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24">
        {/* Desktop: Horizontal scroll */}
        <div className="hidden md:block w-full h-full">
          <div 
            ref={containerRef} 
            className="flex flex-nowrap items-center"
            style={{ 
              width: 'max-content',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            {projects.map((project, i) => (
              <div key={i} className="px-5">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical stack */}
        <div className="md:hidden w-full px-4">
          <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
            {projects.map((project, i) => (
              <ProjectCard key={i} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
