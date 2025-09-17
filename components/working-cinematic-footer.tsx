"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useForm } from "@/contexts/FormContext"

export function WorkingCinematicFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const { isFormOpen, isNavigating } = useForm()

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return

      const rect = footerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Check if we've reached the end of the page
      const distanceFromBottom = rect.top - windowHeight
      const isAtEnd = distanceFromBottom <= 0
      
      // Only trigger footer if we're truly at the end AND form is not open AND not navigating
      // Add a small buffer to prevent premature triggering
      const isTrulyAtEnd = distanceFromBottom <= -50 // 50px buffer
      
      if (isTrulyAtEnd && !isFormOpen && !isNavigating) {
        // Start the footer animation
        setIsVisible(true)
        
        // Calculate scroll progress for full screen coverage
        const scrollPastEnd = Math.abs(distanceFromBottom + 50) // Account for buffer
        const maxScroll = windowHeight * 1.5
        const progress = Math.min(scrollPastEnd / maxScroll, 1)
        setScrollProgress(progress)
      } else {
        // Reset when not at the end or form is open
        setIsVisible(false)
        setScrollProgress(0)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isFormOpen, isNavigating])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
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
          className="fixed inset-0 z-50 bg-red-900"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: scrollProgress > 0.05 ? 1 : 0
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Content Container */}
          <motion.div 
            className="h-full flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 md:p-8 lg:p-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: scrollProgress > 0.05 ? 1 : 0,
              y: scrollProgress > 0.05 ? 0 : 20
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Left Side - Logo & Branding */}
            <motion.div 
              className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left mb-6 sm:mb-8 lg:mb-0"
              initial={{ x: -50, opacity: 0 }}
              animate={{ 
                x: scrollProgress > 0.1 ? 0 : -20,
                opacity: scrollProgress > 0.1 ? 1 : 0
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="max-w-lg">
                <Image
                  src="/logo/Transparent Logo.png"
                  alt="AdPoint Logo"
                  width={600}
                  height={240}
                  className="h-24 sm:h-32 lg:h-40 w-auto mx-auto lg:mx-0 mb-6 sm:mb-8"
                />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-100 mb-4 sm:mb-6 leading-tight">
                  Let's Create Something Amazing
                </h2>
                <p className="text-red-200 text-base sm:text-lg leading-relaxed">
                  Transform your vision into extraordinary digital experiences that captivate and inspire your audience.
                </p>
              </div>
            </motion.div>

            {/* Right Side - Navigation & Contact */}
            <motion.div 
              className="flex-1 flex flex-col items-center lg:items-start"
              initial={{ x: 50, opacity: 0 }}
              animate={{ 
                x: scrollProgress > 0.15 ? 0 : 20,
                opacity: scrollProgress > 0.15 ? 1 : 0
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="space-y-6 sm:space-y-8">
                {/* Navigation Links */}
                <nav className="space-y-4 sm:space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: scrollProgress > 0.1 ? 1 : 0,
                      x: scrollProgress > 0.1 ? 0 : 10
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <button 
                      onClick={() => scrollToSection("hero")}
                      className="block text-lg sm:text-xl lg:text-2xl font-medium text-red-100 hover:text-red-300 transition-colors duration-500 min-h-[44px] flex items-center"
                    >
                      Home
                    </button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: scrollProgress > 0.12 ? 1 : 0,
                      x: scrollProgress > 0.12 ? 0 : 10
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <button 
                      onClick={() => scrollToSection("about")}
                      className="block text-lg sm:text-xl lg:text-2xl font-medium text-red-100 hover:text-red-300 transition-colors duration-500 min-h-[44px] flex items-center"
                    >
                      About Us
                    </button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: scrollProgress > 0.14 ? 1 : 0,
                      x: scrollProgress > 0.14 ? 0 : 10
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <button 
                      onClick={() => scrollToSection("services")}
                      className="block text-lg sm:text-xl lg:text-2xl font-medium text-red-100 hover:text-red-300 transition-colors duration-500 min-h-[44px] flex items-center"
                    >
                      Services
                    </button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: scrollProgress > 0.16 ? 1 : 0,
                      x: scrollProgress > 0.16 ? 0 : 10
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <button 
                      onClick={() => scrollToSection("portfolio")}
                      className="block text-lg sm:text-xl lg:text-2xl font-medium text-red-100 hover:text-red-300 transition-colors duration-500 min-h-[44px] flex items-center"
                    >
                      Portfolio
                    </button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: scrollProgress > 0.18 ? 1 : 0,
                      x: scrollProgress > 0.18 ? 0 : 10
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <button 
                      onClick={() => scrollToSection("contact")}
                      className="block text-lg sm:text-xl lg:text-2xl font-medium text-red-100 hover:text-red-300 transition-colors duration-500 min-h-[44px] flex items-center"
                    >
                      Work With Us
                    </button>
                  </motion.div>
                </nav>

                {/* Contact Info */}
                <motion.div 
                  className="pt-8 border-t border-red-300/20"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ 
                    opacity: scrollProgress > 0.2 ? 1 : 0,
                    y: scrollProgress > 0.2 ? 0 : 10
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="space-y-4">
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
                      <span className="text-red-200 text-base">hello@adpoint.com</span>
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
                      <span className="text-red-200 text-base">+1 (555) 123-4567</span>
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
                      <span className="text-red-200 text-base">@adpointstudio</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Back to Top Button */}
                <motion.button
                  onClick={scrollToTop}
                  className="mt-6 sm:mt-10 px-6 sm:px-10 py-3 sm:py-4 bg-red-600 text-red-50 rounded-full font-medium hover:bg-red-500 transition-colors duration-500 text-base sm:text-lg min-h-[44px] w-full sm:w-auto"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ 
                    opacity: scrollProgress > 0.28 ? 1 : 0,
                    y: scrollProgress > 0.28 ? 0 : 10
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  Back to Top
                </motion.button>
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
          </motion.div>
        </motion.div>
      )}
    </>
  )
}