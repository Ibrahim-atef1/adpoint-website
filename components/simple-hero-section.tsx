"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react"
import { useForm } from "@/contexts/FormContext"

export function SimpleHeroSection() {
  const ref = useRef<HTMLElement>(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { setIsNavigating } = useForm()

  useEffect(() => {
    // Simple start animation
    const timer = setTimeout(() => {
      setHasScrolled(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

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

      {/* Content */}
      <motion.div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
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
              transform: 'translate3d(0, 0, 0)',
              willChange: 'auto',
            }}
          >
            <motion.span
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              style={{ display: "inline-block", willChange: 'transform, opacity' }}
            >
              AdPoint
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              className="text-primary"
              style={{ display: "inline-block", willChange: 'transform, opacity' }}
            >
              Creative Marketing Agency
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={hasScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.8 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-body performance-optimized"
            style={{ willChange: 'transform, opacity' }}
          >
            We craft compelling narratives and digital experiences that elevate brands and drive measurable results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 1 }}
            className="flex justify-center space-x-4 performance-optimized"
            style={{ willChange: 'transform, opacity' }}
          >
            <Button
              onClick={scrollToAbout}
              className="relative group overflow-hidden px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-1 mobile-touch-target"
              style={{ willChange: 'transform, box-shadow' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-white">Learn More</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsNavigating(true)
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                setTimeout(() => {
                  setIsNavigating(false)
                }, 1000)
              }}
              className="relative group overflow-hidden px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-1 mobile-touch-target"
              style={{ willChange: 'transform, box-shadow' }}
            >
              <span className="absolute inset-0 border-2 border-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-red-500 group-hover:text-white transition-colors duration-300">Contact Us</span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={hasScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 cursor-pointer animate-bounce performance-optimized"
        onClick={scrollToAbout}
        style={{ willChange: 'transform, opacity' }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  )
}
