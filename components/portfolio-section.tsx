"use client"

import React, { useEffect, useRef, useState, memo, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Sparkles, Zap, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getAllClients, type ClientData } from "@/lib/client-data"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectCardProps {
  client: ClientData
}

const ProjectCard: React.FC<ProjectCardProps> = ({ client }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

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
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // On mobile, show description when in view. On desktop, show on hover
  const shouldShowDescription = isClient && isMobile ? isInView : isHovered

  return (
    <Link href={`/portfolio/${client.slug}`}>
    <motion.div 
      ref={cardRef}
      className="relative w-full md:w-[500px] h-[400px] sm:h-[500px] lg:h-[600px] bg-black rounded-2xl overflow-hidden flex-shrink-0 border border-gray-800 transition-all duration-1000 group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: shouldShowDescription 
            ? '0 0 30px rgba(185, 28, 28, 0.4), 0 0 60px rgba(185, 28, 28, 0.2), 0 0 90px rgba(185, 28, 28, 0.1)' 
            : '0 0 15px rgba(185, 28, 28, 0.2), 0 0 30px rgba(185, 28, 28, 0.1)',
          willChange: 'transform, box-shadow',
          transform: 'translate3d(0, 0, 0)'
        }}
        // Mobile latching animations removed
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

      {/* Mobile floating elements removed */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 sm:p-6 lg:p-8 text-center">
        {/* Logo or Initial */}
        <motion.div 
          className={`w-26 h-26 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center mb-4 sm:mb-6 transition-all duration-1000 relative p-2 bg-white/5 rounded-full ${shouldShowDescription ? 'scale-110' : 'scale-100'}`}
          style={{
            transform: shouldShowDescription ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          {client.logo ? (
            <div className="relative z-10 w-full h-full">
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                fill
                className={`object-contain ${
                  client.name === 'Zenachii' 
                    ? 'brightness-0 invert' // Make zenachii logo white
                    : shouldShowDescription ? 'opacity-100 brightness-100' : 'opacity-50 brightness-[56.25]'
                }`}
              />
            </div>
          ) : (
            <span 
              className={`text-7xl sm:text-8xl md:text-9xl font-bold text-white relative z-10 ${
                shouldShowDescription ? 'opacity-100 brightness-100' : 'opacity-50 brightness-[56.25]'
              }`}
              style={{
                transform: shouldShowDescription ? 'scale(1.1)' : 'scale(1)',
                filter: shouldShowDescription ? 'drop-shadow(0 0 8px currentColor)' : 'none'
              }}
            >
              {client.name.charAt(0)}
            </span>
          )}
        </motion.div>
        
        <h3 
          className="text-xl sm:text-2xl font-bold text-white font-display mb-3 sm:mb-4"
        >
          {client.name}
        </h3>

        {/* Hover Description */}
        <div 
          className={`transition-all duration-1000 ${shouldShowDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          suppressHydrationWarning
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm mb-3">
              {client.description}
            </p>
            <div className="bg-red-600/20 text-red-400 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border border-red-400/20">
              View Project
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
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
    const totalCards = clients.length
    const totalScrollDistance = (totalCards - 1) * cardWidth

    // Add a small delay to ensure other ScrollTriggers are initialized first
    const timer = setTimeout(() => {
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
            id: "portfolio-scroll", // Add unique ID
            onUpdate: (self) => {
              console.log("Portfolio scroll progress:", self.progress)
            }
          },
        })

        // Refresh ScrollTrigger after a short delay to ensure proper initialization
        setTimeout(() => {
          ScrollTrigger.refresh()
          console.log("Portfolio ScrollTrigger refreshed")
        }, 100)
      }, sectionRef)

      return () => {
        ctx.revert()
      }
    }, 500) // Delay to ensure other components are loaded

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const clients = getAllClients()

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-black">
      {/* Mobile floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/15 rounded-full md:hidden"
            style={{
              left: `${5 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [-25, 25, -25],
              x: [-15, 15, -15],
              opacity: [0.1, 0.5, 0.1],
              scale: [0.3, 1.8, 0.3],
            }}
            transition={{
              duration: 10 + i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-0 right-0 z-20 px-4">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-white text-center font-display"
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          Our Work
        </motion.h2>
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
            {clients.map((client, i) => (
              <div key={i} className="px-5">
                <ProjectCard client={client} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical stack */}
        <div className="md:hidden w-full px-4">
          <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
            {clients.map((client, i) => (
              <ProjectCard key={i} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
