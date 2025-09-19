"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react"
import { useForm } from "@/contexts/FormContext"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hasScrolled, setHasScrolled] = useState(false)
  const { setIsNavigating } = useForm()
  const { isMobile, isLowEnd, reducedMotion, animationQuality } = useMobileOptimization()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    // Skip mouse tracking on mobile for better performance
    if (isMobile) {
      const startHero = () => setHasScrolled(true)
      startHero()
      return
    }

    // Desktop mouse tracking with RAF throttling
    let rafId: number | null = null
    let lastMouseX = 0
    let lastMouseY = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId || reducedMotion) return
      
      rafId = requestAnimationFrame(() => {
        const rect = ref.current?.getBoundingClientRect()
        if (rect) {
          const newX = (e.clientX - rect.left - rect.width / 2) / 20
          const newY = (e.clientY - rect.top - rect.height / 2) / 20
          
          // Only update if position changed significantly
          const threshold = animationQuality === 'low' ? 2 : 0.5
          if (Math.abs(newX - lastMouseX) > threshold || Math.abs(newY - lastMouseY) > threshold) {
            setMousePosition({ x: newX, y: newY })
            lastMouseX = newX
            lastMouseY = newY
          }
        }
        rafId = null
      })
    }

    // Start hero animations immediately on load
    const startHero = () => setHasScrolled(true)

    const heroElement = ref.current
    if (heroElement && !isMobile) {
      heroElement.addEventListener("mousemove", handleMouseMove, { passive: true })
    }
    
    // Trigger once after mount
    startHero()
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [isMobile, reducedMotion, animationQuality])

  const scrollToAbout = () => {
    setIsNavigating(true)
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      setIsNavigating(false)
    }, 1000)
  }

  return (
    <section 
      ref={ref} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay hero-section"
      style={{
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      <div className="absolute inset-0 bg-background" />
      <motion.div
        className="absolute inset-0 animate-gradient will-change-transform"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(194, 69, 51, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(194, 69, 51, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(194, 69, 51, 0.05) 0%, transparent 50%)
          `,
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 80%, rgba(194, 69, 51, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(194, 69, 51, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, rgba(194, 69, 51, 0.05) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 20%, rgba(194, 69, 51, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, rgba(194, 69, 51, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 60% 60%, rgba(194, 69, 51, 0.05) 0%, transparent 50%)`,
            `radial-gradient(circle at 40% 60%, rgba(194, 69, 51, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 60% 40%, rgba(194, 69, 51, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 20% 20%, rgba(194, 69, 51, 0.05) 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="absolute inset-0">
        {/* Desktop particles */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/10 rounded-full hidden md:block"
            style={{
              left: `${30 + i * 40}%`,
              top: `${40 + i * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: 8 + i * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
        
        {/* Mobile enhanced particles */}
        {isMobile && [...Array(8)].map((_, i) => (
          <motion.div
            key={`mobile-${i}`}
            className="absolute w-1 h-1 bg-primary/20 rounded-full md:hidden"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-5, 5, -5],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
        
        {/* Mobile floating icons */}
        {isMobile && (
          <>
            <motion.div
              className="absolute top-20 left-8 text-primary/30 md:hidden"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <motion.div
              className="absolute top-32 right-12 text-primary/20 md:hidden"
              animate={reducedMotion ? {} : {
                y: [5, -5, 5],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{
                willChange: 'transform, opacity',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <Zap className="w-4 h-4" />
            </motion.div>
            <motion.div
              className="absolute bottom-40 left-12 text-primary/20 md:hidden"
              animate={reducedMotion ? {} : {
                y: [-4, 4, -4],
                opacity: [0.1, 0.3, 0.1],
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
          </>
        )}
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={hasScrolled ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
          className="space-y-6 sm:space-y-8 performance-optimized"
          style={{ willChange: 'transform, opacity' }}
        >
          <motion.h1
            className="font-display font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-balance leading-tight performance-optimized hero-title"
            style={{
              transform: isMobile 
                ? 'translate3d(0, 0, 0)' 
                : `translate3d(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px, 0)`,
              willChange: isMobile ? 'auto' : 'transform',
            }}
          >
            <motion.span
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              className="text-white inline-block"
              style={{ transformOrigin: "center bottom" }}
            >
              AdPoint
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={hasScrolled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="flex justify-center items-center space-x-2 sm:space-x-4"
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-lg sm:text-2xl md:text-3xl text-primary font-semibold tracking-wide">
                DIGITAL EXCELLENCE
              </span>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse" />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={hasScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-light tracking-wider"
            >
              DELIVERED
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            className="pt-4"
          >
            <motion.div
              className="relative"
              whileHover={isMobile ? {} : { scale: 1.05 }}
              whileTap={isMobile ? { scale: 0.95 } : {}}
            >
              <Button
                size="lg"
                className={`bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 animate-glow min-h-[44px] w-full sm:w-auto ${
                  isMobile ? 'mobile-button-glow' : ''
                }`}
                onClick={() => {
                  window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                  
                  // Scroll to a position above the contact section to avoid triggering footer
                  const contactElement = document.getElementById("contact")
                  if (contactElement) {
                    const rect = contactElement.getBoundingClientRect()
                    const scrollTop = window.pageYOffset + rect.top - 200 // 200px above contact section
                    
                    window.scrollTo({
                      top: scrollTop,
                      behavior: "smooth"
                    })
                  }
                }}
              >
                <motion.span
                  className="flex items-center space-x-2"
                  animate={isMobile ? {
                    scale: [1, 1.02, 1],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }}
                >
                  <span>Start Your Project</span>
                  {isMobile && (
                    <motion.div
                      animate={{
                        x: [0, 3, 0],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      }}
                    >
                      <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                    </motion.div>
                  )}
                </motion.span>
              </Button>
              
              {/* Mobile button glow effect */}
              {isMobile && (
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-xl blur-xl -z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm font-medium">Scroll to begin</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
