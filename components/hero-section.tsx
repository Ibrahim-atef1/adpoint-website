"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react"
import { useForm } from "@/contexts/FormContext"

export function HeroSection() {
  const ref = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hasScrolled, setHasScrolled] = useState(false)
  const { setIsNavigating } = useForm()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
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
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/10 rounded-full"
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
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 animate-glow min-h-[44px] w-full sm:w-auto"
              onClick={() => {
                window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                // Temporarily disable footer to prevent triggering during scroll
                setIsNavigating(true)
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                // Re-enable footer after scroll completes
                setTimeout(() => {
                  setIsNavigating(false)
                }, 1000)
              }}
            >
              Start Your Project
            </Button>
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
