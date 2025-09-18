"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react"
import { useForm } from "@/contexts/FormContext"

export function HeroSection() {
  const ref = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { setIsNavigating } = useForm()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 20,
          y: (e.clientY - rect.top - rect.height / 2) / 20,
        })
      }
    }

    // Start hero animations immediately on load
    const startHero = () => setHasScrolled(true)

    const heroElement = ref.current
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove, { passive: true })
    }
    // Trigger once after mount
    startHero()
    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove)
      }
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const scrollToAbout = () => {
    setIsNavigating(true)
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      setIsNavigating(false)
    }, 1000)
  }

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
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
              className="absolute top-32 right-12 text-primary/30 md:hidden"
              animate={{
                y: [10, -10, 10],
                rotate: [0, -5, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Zap className="w-5 h-5" />
            </motion.div>
            <motion.div
              className="absolute bottom-40 left-12 text-primary/30 md:hidden"
              animate={{
                y: [-8, 8, -8],
                rotate: [0, 3, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <Sparkles className="w-4 h-4" />
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
          className="space-y-6 sm:space-y-8"
        >
          <motion.h1
            className="font-display font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-balance leading-tight"
            style={{
              transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
            }}
          >
            <motion.span
              initial={{ opacity: 0, rotateX: 90, y: 50 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              className="text-white inline-block"
              style={{ transformOrigin: "center bottom" }}
            >
              Ad
            </motion.span>
            <motion.span
              initial={{ opacity: 0, rotateX: 90, y: 50 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              className="text-white inline-block"
              style={{ transformOrigin: "center bottom" }}
            >
              Point
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
              whileHover={isMobile ? {} : { 
                scale: 1.05,
                y: -2
              }}
              whileTap={isMobile ? { scale: 0.95 } : { scale: 0.98 }}
            >
              <motion.div
                className="relative"
                whileHover={{
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(239, 68, 68, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  size="lg"
                  className={`bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 animate-glow min-h-[44px] w-full sm:w-auto relative overflow-hidden group ${
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
          
          {/* Visual reinforcement - 3D transformation animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={hasScrolled ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: -15 }}
            transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
            className="mt-8 sm:mt-12 flex justify-center"
          >
            <motion.div
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
              animate={{
                rotateY: [0, 5, -5, 0],
                rotateX: [0, 3, -3, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
            >
              {/* 3D transformation visualization */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-2xl border border-red-600/30 backdrop-blur-sm">
                <motion.div
                  className="absolute inset-2 bg-gradient-to-tr from-red-600/40 to-red-800/40 rounded-xl"
                  animate={{
                    rotateZ: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute inset-4 bg-gradient-to-bl from-red-500/60 to-red-700/60 rounded-lg"
                  animate={{
                    rotateZ: [360, 0],
                    scale: [1, 0.9, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute inset-6 bg-gradient-to-tr from-red-400/80 to-red-600/80 rounded-md"
                  animate={{
                    rotateZ: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Floating particles around the 3D element */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-red-500 rounded-full"
                  style={{
                    left: `${20 + (i % 3) * 30}%`,
                    top: `${20 + Math.floor(i / 3) * 30}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1.5, 0.5]
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                />
              ))}
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
