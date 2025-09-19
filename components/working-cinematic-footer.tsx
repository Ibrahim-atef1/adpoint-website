"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useForm } from "@/contexts/FormContext"
import { Instagram } from "lucide-react"

export function WorkingCinematicFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { isFormOpen, isNavigating, setIsNavigating } = useForm()

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const isMobile = window.innerWidth < 768
      
      if (isMobile) {
        // For mobile, use a simpler approach based on scroll position
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const documentHeight = document.documentElement.scrollHeight
        const scrollPercentage = (scrollTop + windowHeight) / documentHeight
        
        // Trigger when scrolled to 95% of the page (later)
        const isAtVeryEnd = scrollPercentage >= 0.95
        
        if (isAtVeryEnd && !isFormOpen && !isNavigating) {
          setIsVisible(true)
          setScrollProgress(Math.min((scrollPercentage - 0.9) * 10, 1))
          
          console.log('Mobile footer triggered:', { 
            scrollPercentage, 
            isAtVeryEnd, 
            isVisible: true
          })
        } else {
          setIsVisible(false)
          setScrollProgress(0)
        }
      } else {
        // Desktop logic
        if (!footerRef.current) return

        const rect = footerRef.current.getBoundingClientRect()
        const distanceFromBottom = rect.top - windowHeight
        const isAtVeryEnd = distanceFromBottom <= 0
        
        if (isAtVeryEnd && !isFormOpen && !isNavigating) {
          setIsVisible(true)
          const scrollPastEnd = Math.abs(distanceFromBottom)
          const maxScroll = windowHeight * 1.2
          const progress = Math.min(scrollPastEnd / maxScroll, 1)
          setScrollProgress(progress)
        } else {
          setIsVisible(false)
          setScrollProgress(0)
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isFormOpen, isNavigating])

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "contact") {
      // Prevent footer from triggering when scrolling to contact
      setIsNavigating(true)
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
      // Reset navigation state after scroll completes
      setTimeout(() => {
        setIsNavigating(false)
      }, 1000)
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    }
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


      {/* Debug Info */}
      <div className="fixed top-4 left-4 bg-red-600 text-white p-2 text-xs z-50 rounded">
        isVisible: {isVisible.toString()}, scrollProgress: {scrollProgress.toFixed(2)}
      </div>

      {/* Full Screen Footer Overlay */}
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isVisible ? 1 : 0
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ 
            background: '#131741'
          }}
        >
          {/* Test Content - Always Visible */}
          <div className="fixed top-20 left-4 bg-yellow-600 text-white p-2 text-xs z-50 rounded">
            FOOTER OVERLAY IS RENDERED!
          </div>

          {/* Content Container */}
          <motion.div 
            className="h-full w-full flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 md:p-8 lg:p-16 space-y-8 sm:space-y-10 lg:space-y-0 lg:space-x-20 xl:space-x-32 overflow-y-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1,
              y: 0
            }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Left Side - Logo & Branding */}
            <motion.div 
              className="w-full lg:w-1/2 lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={{ 
                x: 0,
                opacity: 1
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="max-w-lg lg:max-w-xl w-full">
                {/* Test Text */}
                <div className="text-white text-2xl font-bold mb-4">TEST LOGO SECTION</div>
                
                <Image
                  src="/logo/Transparent Logo.png"
                  alt="AdPoint Logo"
                  width={600}
                  height={240}
                  className="h-20 sm:h-24 lg:h-48 xl:h-56 w-auto mx-auto lg:mx-0 mb-4 sm:mb-6 lg:mb-8"
                />
                <h2 className="text-lg sm:text-xl lg:text-4xl xl:text-5xl font-bold text-red-100 mb-3 sm:mb-4 lg:mb-6 leading-tight">
                  Let's Create Something Amazing
                </h2>
                <p className="text-red-200 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                  Transform your vision into extraordinary digital experiences that captivate and inspire your audience.
                </p>
              </div>
            </motion.div>

            {/* Right Side - Navigation & Contact */}
            <motion.div 
              className="w-full lg:w-1/2 lg:flex-1 flex flex-col items-center lg:items-end"
              initial={{ x: 50, opacity: 0 }}
              animate={{ 
                x: 0,
                opacity: 1
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="w-full lg:w-auto space-y-4 sm:space-y-6 lg:space-y-8 mt-4 sm:mt-6 lg:mt-48">
                {/* Test Text */}
                <div className="text-white text-2xl font-bold mb-4">TEST NAVIGATION SECTION</div>
                
                {/* Navigation Menu Buttons */}
                <div className="w-full lg:w-auto space-y-2 sm:space-y-3 lg:space-y-4">
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
                      className="text-white hover:text-red-200 text-base sm:text-lg lg:text-xl font-medium transition-all duration-300 min-h-[48px] px-4 py-3 flex items-center justify-center lg:justify-end hover:scale-105 w-full lg:w-auto rounded-lg hover:bg-white/5"
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
                      className="text-white hover:text-red-200 text-base sm:text-lg lg:text-xl font-medium transition-all duration-300 min-h-[48px] px-4 py-3 flex items-center justify-center lg:justify-end hover:scale-105 w-full lg:w-auto rounded-lg hover:bg-white/5"
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
                      className="text-white hover:text-red-200 text-base sm:text-lg lg:text-xl font-medium transition-all duration-300 min-h-[48px] px-4 py-3 flex items-center justify-center lg:justify-end hover:scale-105 w-full lg:w-auto rounded-lg hover:bg-white/5"
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
                      className="text-white hover:text-red-200 text-base sm:text-lg lg:text-xl font-medium transition-all duration-300 min-h-[48px] px-4 py-3 flex items-center justify-center lg:justify-end hover:scale-105 w-full lg:w-auto rounded-lg hover:bg-white/5"
                    >
                      Work With Us
                    </button>
                  </motion.div>
                  
                </div>

                {/* Instagram Contact */}
                <motion.div 
                  className="w-full pt-4 sm:pt-6 lg:pt-8 border-t border-gray-600/30"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ 
                    opacity: 1,
                    y: 0
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-center lg:justify-end pt-4 sm:pt-6">
                    <a 
                      href="https://www.instagram.com/adpoint.eg/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200 min-h-[48px] px-4 py-2 rounded-lg hover:bg-white/5"
                    >
                      <Instagram className="w-6 h-6 text-red-400" />
                      <span className="text-red-200 text-base lg:text-lg">@adpoint.eg</span>
                    </a>
                  </div>
                </motion.div>

              </div>
            </motion.div>

            {/* Copyright at Bottom */}
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1,
                y: 0
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className="text-sm text-red-200 text-center">
                © 2025 AdPoint. All rights reserved.
              </p>
            </motion.div>

            {/* Small Back to Top Button - Bottom Left */}
            <motion.div
              className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex flex-col items-center z-10"
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
                className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-2xl hover:shadow-red-500/25 transition-all duration-300 group min-h-[48px] min-w-[48px] flex items-center justify-center"
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