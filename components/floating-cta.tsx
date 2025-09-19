"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, X } from "lucide-react"
import { SchedulingForm } from "@/components/scheduling-form"
import { useForm } from "@/contexts/FormContext"

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { isFormOpen, setIsFormOpen } = useForm()

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          setScrollY(currentScrollY)
          
          // Show floating CTA immediately on mobile, after 400px on desktop
          const isMobile = window.innerWidth < 768
          setIsVisible(isMobile || currentScrollY > 400)
          ticking = false
        })
        ticking = true
      }
    }

    // Check initial state
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      setIsVisible(true)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = () => {
    window.dispatchEvent(new Event("adpoint:bypass-hijack"))
    setIsFormOpen(true)
  }

  return (
    <>
      {/* Debug Info */}
      {isVisible && (
        <div className="fixed top-4 right-4 bg-green-600 text-white p-2 text-xs z-50 rounded">
          FLOATING CTA IS VISIBLE!
        </div>
      )}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3 
            }}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40"
            style={{
              transform: `translateY(${Math.sin(scrollY * 0.01) * 5}px)`,
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
              className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-3 sm:p-4 rounded-full shadow-2xl shadow-red-600/25 transition-all duration-300 hover:shadow-red-600/40 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              
              {/* Pulse ring effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap backdrop-blur-sm border border-gray-700"
              >
                Schedule a Meeting
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/90 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scheduling Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
                <SchedulingForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
