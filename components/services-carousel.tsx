"use client"

import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Palette, Globe, Megaphone, BarChart3, Camera, Code, Sparkles, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { MobileOptimizedGSAP } from "./mobile-optimized-gsap"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ServiceCardProps {
  title: string
  icon: React.ReactNode
  color: string
  description: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, color, description }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isTapped, setIsTapped] = useState(false)
  const { isMobile, isLowEnd, reducedMotion, animationQuality } = useMobileOptimization()
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(cardRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Mobile-optimized interaction logic
  const shouldShowDescription = isMobile ? (isInView || isTapped) : isHovered
  const shouldShowGlow = isMobile ? (isInView || isTapped) : isHovered
  
  const handleTap = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isMobile) {
      setIsTapped(!isTapped)
    }
  }

  return (
    <motion.div 
      ref={cardRef}
      className="relative w-full max-w-[500px] h-[400px] sm:h-[500px] lg:h-[600px] bg-black rounded-2xl overflow-hidden flex-shrink-0 border border-gray-800 group cursor-pointer performance-optimized"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={isMobile ? handleTap : undefined}
      onClick={isMobile ? handleTap : undefined}
      style={{
        willChange: 'transform, opacity',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        minHeight: isMobile ? '44px' : 'auto', // Ensure touch target size
      }}
      whileHover={!isMobile ? { 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
      whileTap={isMobile ? {
        scale: 0.98,
        transition: { duration: 0.1 }
      } : {}}
      animate={isMobile && isInView && !reducedMotion ? {
        scale: [1, 1.005, 1],
        y: [0, -1, 0],
      } : {}}
      transition={{
        duration: isMobile ? 8 : 3,
        repeat: isMobile && isInView && !reducedMotion ? Number.POSITIVE_INFINITY : 0,
        ease: "easeInOut",
        delay: isMobile && isInView && !reducedMotion ? Math.random() * 3 : 0,
      }}
    >
      {/* Underglow effect - enhanced for mobile */}
      <motion.div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at center, ${color}${isMobile ? '20' : '15'}, transparent 70%)`,
        }}
        animate={{
          scale: shouldShowDescription ? (isMobile ? 1.1 : 1.1) : 1,
          opacity: shouldShowDescription ? (isMobile ? 1 : 1) : (isMobile ? 0.3 : 0),
        }}
        transition={{
          duration: isMobile ? 0.3 : 0.3,
          ease: "easeOut"
        }}
      />

      {/* Additional mobile glow effect */}
      {isMobile && (
        <motion.div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${color}15, transparent 50%, ${color}10)`,
            boxShadow: `inset 0 0 20px ${color}20`,
          }}
          animate={{
            opacity: isInView ? 0.6 : 0.2,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        />
      )}

       {/* Mobile floating elements - ultra-simplified for performance */}
       {isMobile && isInView && !reducedMotion && (
         <motion.div
           className="absolute top-4 right-4 text-primary/15"
           animate={{
             y: [-1, 1, -1],
             opacity: [0.1, 0.2, 0.1],
           }}
           transition={{
             duration: 10,
             repeat: Number.POSITIVE_INFINITY,
             ease: "easeInOut",
             delay: 2,
           }}
           style={{
             willChange: 'transform, opacity',
             transform: 'translate3d(0, 0, 0)',
           }}
         >
           <Sparkles className="w-3 h-3" />
         </motion.div>
       )}

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 sm:p-6 lg:p-8 text-center">
        <motion.div 
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 transition-all duration-1000 relative"
          style={{
            background: `linear-gradient(135deg, ${color}30, ${color}50)`,
            boxShadow: isMobile ? 
              `0 0 30px ${color}60, inset 0 1px 0 rgba(255,255,255,0.3)` :
              `0 0 25px ${color}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
          }}
          animate={isMobile && isInView ? {
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0],
            boxShadow: [
              `0 0 30px ${color}60, inset 0 1px 0 rgba(255,255,255,0.3)`,
              `0 0 40px ${color}80, inset 0 1px 0 rgba(255,255,255,0.4)`,
              `0 0 30px ${color}60, inset 0 1px 0 rgba(255,255,255,0.3)`
            ],
          } : {}}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.3,
          }}
        >
          {/* Animated background ring */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 transition-all duration-1000"
            style={{
              background: `conic-gradient(from 0deg, ${color}40, transparent, ${color}20)`,
              transform: isHovered ? 'rotate(360deg)' : 'rotate(0deg)',
              opacity: isHovered ? 1 : 0
            }}
          />
          
          {/* Floating particles around icon */}
          {isHovered && [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-ping"
              style={{
                background: color,
                left: `${20 + i * 20}%`,
                top: `${20 + i * 20}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
          
          <div 
            className="text-xl sm:text-2xl transition-all duration-1000 relative z-10" 
            style={{ 
              transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
              filter: isHovered ? 'drop-shadow(0 0 8px currentColor)' : 'none'
            }}
          >
            {icon}
          </div>
        </motion.div>
        
        <motion.h3 
          className="text-xl sm:text-2xl font-bold text-white font-display mb-3 sm:mb-4"
          animate={isMobile && isInView ? {
            scale: [1, 1.02, 1],
          } : {}}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          {title}
        </motion.h3>

        {/* Hover Description */}
        <div className={`transition-all duration-1000 ${shouldShowDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ServicesCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile, isLowEnd, reducedMotion } = useMobileOptimization()
  const [hasError, setHasError] = useState(false)

  // Error boundary for mobile
  if (hasError) {
    return (
      <section className="relative w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Services</h2>
          <p className="text-gray-400">Loading services...</p>
        </div>
      </section>
    )
  }

  useEffect(() => {
    try {
      if (!sectionRef.current) return

      const viewportWidth = window.innerWidth
      const isMobileDevice = viewportWidth < 768
      
      if (isMobileDevice || isMobile || reducedMotion) {
        // On mobile, use simplified animations or no animations
        return
      }

      if (!containerRef.current) return

      const cardWidth = 500 + 40 // card width + gap
      const totalCards = 6
      const totalScrollDistance = (totalCards - 1) * cardWidth

      const ctx = gsap.context(() => {
        // Batch DOM operations for better performance
        const centerOffset = (viewportWidth - cardWidth) / 2
        gsap.set(containerRef.current, { 
          x: centerOffset,
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        })

        // Calculate scroll distance to show all cards
        const scrollDistance = totalScrollDistance

        gsap.to(containerRef.current, {
          x: centerOffset - scrollDistance,
          ease: "none",
          force3D: true, // Force GPU acceleration
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            // Optimize refresh rate
            refreshPriority: 0,
            onUpdate: () => {
              // Batch any additional updates
              requestAnimationFrame(() => {
                // Any additional DOM updates here
              })
            }
          },
        })
      }, sectionRef)

      return () => {
        ctx.revert()
      }
    } catch (error) {
      console.warn('Services carousel error:', error)
      setHasError(true)
    }
  }, [isMobile, isLowEnd, reducedMotion])

  const services = [
    { 
      title: "Brand Identity", 
      icon: <Palette className="w-8 h-8 text-red-500" />, 
      color: "#ef4444",
      description: "Create memorable brand identities that resonate with your audience. From logos to complete brand guidelines, we craft visual stories that make your business unforgettable."
    },
    { 
      title: "Web Development", 
      icon: <Globe className="w-8 h-8 text-red-500" />, 
      color: "#ef4444",
      description: "Build fast, responsive websites that convert visitors into customers. Modern web technologies, mobile-first design, and seamless user experiences."
    },
    { 
      title: "Digital Marketing", 
      icon: <Megaphone className="w-8 h-8 text-red-500" />, 
      color: "#ef4444",
      description: "Grow your business with strategic digital marketing campaigns. Social media, content marketing, and paid advertising that delivers real results."
    },
    { 
      title: "SEO & Analytics", 
      icon: <BarChart3 className="w-8 h-8 text-red-500" />, 
      color: "#ef4444",
      description: "Improve your search rankings and track performance with data-driven SEO strategies. Comprehensive analytics and reporting to measure success."
    },
    { 
      title: "Content Creation", 
      icon: <Camera className="w-8 h-8 text-red-500" />, 
      color: "#ef4444",
      description: "Engaging visual content that tells your story. Professional photography, videography, and graphic design that captures attention and drives engagement."
    },
    { 
      title: "Technical Solutions", 
      icon: <Code className="w-8 h-8 text-red-500" />, 
      color: "#ef4444",
      description: "Custom software solutions and technical integrations. From APIs to automation tools, we solve complex technical challenges for your business."
    },
  ]

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-black">
      {/* Mobile floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full md:hidden"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-0 right-0 z-20 px-4">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-white text-center font-display"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          Our Services
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
            {services.map((service, i) => (
              <div key={i} className="px-5">
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical stack */}
        <div className="md:hidden w-full px-4">
          <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
            {services.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
