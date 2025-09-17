"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useForm } from "@/contexts/FormContext"

export function WorkingCinematicFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { isFormOpen, isNavigating } = useForm()

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return

      const rect = footerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Check if we've reached the end of the page
      const distanceFromBottom = rect.top - windowHeight
      const isAtEnd = distanceFromBottom <= 0
      
      // Trigger footer only when we reach the very end of the screen
      const isAtVeryEnd = distanceFromBottom <= 0 // No buffer - only at exact end
      
      if (isAtVeryEnd && !isFormOpen && !isNavigating) {
        // Start the footer animation
        setIsVisible(true)
        
        // Calculate scroll progress for full screen coverage
        const scrollPastEnd = Math.abs(distanceFromBottom) // No buffer adjustment
        const maxScroll = windowHeight * 1.2 // Allow for some scroll past the end
        const progress = Math.min(scrollPastEnd / maxScroll, 1)
        setScrollProgress(progress)
      } else {
        // Reset when not at the end or form is open
        setIsVisible(false)
        setScrollProgress(0)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isFormOpen, isNavigating])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const goToTop = () => {
    console.log('Back to top clicked!') // Debug log
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsVisible(false)
    setScrollProgress(0)
  }

  return (
    <>

      {/* Minimal Footer Trigger */}
      <footer ref={footerRef} className="relative bg-black min-h-[200px]">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-xs text-gray-500">© 2025 AdPoint. All rights reserved.</p>
          </div>
        </div>
      </footer>


      {/* Full Screen Footer Overlay */}
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: scrollProgress > 0.05 ? 1 : 0
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ 
            background: '#131741'
          }}
        >
          {/* Content Container */}
          <motion.div 
            className="h-full flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 md:p-8 lg:p-16 space-y-8 sm:space-y-12 lg:space-y-0 lg:space-x-20 xl:space-x-32"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: scrollProgress > 0.05 ? 1 : 0,
              y: scrollProgress > 0.05 ? 0 : 20
            }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Left Side - Logo & Branding */}
            <motion.div 
              className="w-full lg:w-1/2 lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={{ 
                x: scrollProgress > 0.1 ? 0 : -20,
                opacity: scrollProgress > 0.1 ? 1 : 0
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="max-w-lg lg:max-w-xl">
                <Image
                  src="/logo/Transparent Logo.png"
                  alt="AdPoint Logo"
                  width={600}
                  height={240}
                  className="h-32 sm:h-40 lg:h-48 xl:h-56 w-auto mx-auto lg:mx-0 mb-6 sm:mb-8"
                />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-red-100 mb-4 sm:mb-6 leading-tight">
                  Let's Create Something Amazing
                </h2>
                <p className="text-red-200 text-base sm:text-lg xl:text-xl leading-relaxed">
                  Transform your vision into extraordinary digital experiences that captivate and inspire your audience.
                </p>
              </div>
            </motion.div>

            {/* Right Side - Navigation & Contact */}
            <motion.div 
              className="w-full lg:w-1/2 lg:flex-1 flex flex-col items-end lg:items-end"
              initial={{ x: 50, opacity: 0 }}
              animate={{ 
                x: scrollProgress > 0.15 ? 0 : 20,
                opacity: scrollProgress > 0.15 ? 1 : 0
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="w-auto space-y-6 sm:space-y-8 mt-40 lg:mt-48">
                {/* Navigation Menu Buttons */}
                <div className="w-auto space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: 1,
                      x: 0
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <button 
                      onClick={() => scrollToSection("about")}
                      className="text-white hover:text-red-200 text-lg sm:text-xl font-medium transition-all duration-300 min-h-[44px] flex items-center justify-end hover:scale-105"
                    >
                      About Us
                    </button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: 1,
                      x: 0
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                  >
                    <button 
                      onClick={() => scrollToSection("services")}
                      className="text-white hover:text-red-200 text-lg sm:text-xl font-medium transition-all duration-300 min-h-[44px] flex items-center justify-end hover:scale-105"
                    >
                      Services
                    </button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: 1,
                      x: 0
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                  >
                    <button 
                      onClick={() => scrollToSection("portfolio")}
                      className="text-white hover:text-red-200 text-lg sm:text-xl font-medium transition-all duration-300 min-h-[44px] flex items-center justify-end hover:scale-105"
                    >
                      Portfolio
                    </button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: 1,
                      x: 0
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
                  >
                    <button 
                      onClick={() => scrollToSection("contact")}
                      className="text-white hover:text-red-200 text-lg sm:text-xl font-medium transition-all duration-300 min-h-[44px] flex items-center justify-end hover:scale-105"
                    >
                      Work With Us
                    </button>
                  </motion.div>
                  
                </div>

                {/* Contact Info */}
                <motion.div 
                  className="w-full pt-6 sm:pt-8 lg:pt-12 border-t border-red-300/20"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ 
                    opacity: scrollProgress > 0.2 ? 1 : 0,
                    y: scrollProgress > 0.2 ? 0 : 10
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="space-y-4 lg:space-y-6">
                    <motion.div 
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ 
                        opacity: scrollProgress > 0.22 ? 1 : 0,
                        x: scrollProgress > 0.22 ? 0 : 8
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <span className="text-red-200 text-base lg:text-lg">hello@adpoint.com</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ 
                        opacity: scrollProgress > 0.24 ? 1 : 0,
                        x: scrollProgress > 0.24 ? 0 : 8
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="w-3 h-3 bg-red-300 rounded-full"></div>
                      <span className="text-red-200 text-base lg:text-lg">+1 (555) 123-4567</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ 
                        opacity: scrollProgress > 0.26 ? 1 : 0,
                        x: scrollProgress > 0.26 ? 0 : 8
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <span className="text-red-200 text-base lg:text-lg">@adpointstudio</span>
                    </motion.div>
                  </div>
                </motion.div>

              </div>
            </motion.div>

            {/* Copyright at Bottom */}
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: scrollProgress > 0.3 ? 1 : 0,
                y: scrollProgress > 0.3 ? 0 : 15
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className="text-sm text-red-200 text-center">
                © 2025 AdPoint. All rights reserved.
              </p>
            </motion.div>

            {/* Small Back to Top Button - Bottom Left */}
            <motion.div
              className="absolute bottom-6 left-6 flex flex-col items-center z-10"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ 
                opacity: 1,
                scale: 1,
                y: 0
              }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            >
              <motion.button
                onClick={goToTop}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-2xl hover:shadow-red-500/25 transition-all duration-300 group"
                whileHover={{ 
                  scale: 1.15,
                  y: -2
                }}
                whileTap={{ scale: 0.85 }}
              >
                <motion.svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                  animate={{
                    rotate: isVisible ? (() => {
                      // Button position (bottom left: 24px from left, 24px from bottom)
                      const buttonX = 24
                      const buttonY = window.innerHeight - 24
                      
                      // Calculate angle from button to mouse
                      const deltaX = mousePosition.x - buttonX
                      const deltaY = mousePosition.y - buttonY
                      
                      // Calculate angle in radians, then convert to degrees
                      const angleRad = Math.atan2(deltaY, deltaX)
                      const angleDeg = angleRad * (180 / Math.PI)
                      
                      // Adjust for the arrow pointing up by default (add 90 degrees)
                      return angleDeg + 90
                    })() : 0
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.8
                  }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M5 10l7-7m0 0l7 7m-7-7v18" 
                  />
                </motion.svg>
              </motion.button>
              
              {/* Scroll to Top Text */}
              <motion.p 
                className="text-xs text-red-200 mt-2 text-center font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                Scroll to Top
              </motion.p>
            </motion.div>


          </motion.div>
        </motion.div>
      )}
    </>
  )
}