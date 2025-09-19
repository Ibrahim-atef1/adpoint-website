"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Play, Sparkles } from "lucide-react"
import { useMobileAnimations, mobileAnimationVariants, mobileTransitions } from "@/hooks/use-mobile-animations"
import { ResponsiveImage } from "./responsive-image"

export function MobileHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { isMobile, animationDuration, ease } = useMobileAnimations()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-red-800/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Mobile-optimized floating particles */}
        {isMobile && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-red-400/30 rounded-full"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 4) * 20}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 6 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="initial"
          animate={isLoaded ? "animate" : "initial"}
          variants={mobileAnimationVariants.fadeInUp}
          transition={mobileTransitions.normal}
          className="max-w-4xl mx-auto"
        >
          {/* Main Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight"
            style={{
              fontFamily: 'var(--font-poppins)',
              textShadow: '0 0 30px rgba(239, 68, 68, 0.3)'
            }}
            variants={mobileAnimationVariants.fadeInUp}
            transition={{ ...mobileTransitions.normal, delay: 0.2 }}
          >
            <span className="block">Creative</span>
            <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Marketing
            </span>
            <span className="block">Agency</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={mobileAnimationVariants.fadeInUp}
            transition={{ ...mobileTransitions.normal, delay: 0.4 }}
          >
            Transform your vision into extraordinary digital experiences that captivate and inspire your audience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12"
            variants={mobileAnimationVariants.fadeInUp}
            transition={{ ...mobileTransitions.normal, delay: 0.6 }}
          >
            <motion.button
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 min-h-[56px] flex items-center justify-center space-x-2"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)',
                willChange: 'transform, box-shadow'
              }}
            >
              <span>Get Started</span>
              <Sparkles className="w-5 h-5" />
            </motion.button>

            <motion.button
              className="w-full sm:w-auto border-2 border-white/20 hover:border-red-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 min-h-[56px] flex items-center justify-center space-x-2"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{ willChange: 'transform' }}
            >
              <Play className="w-5 h-5" />
              <span>View Work</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto"
            variants={mobileAnimationVariants.fadeInUp}
            transition={{ ...mobileTransitions.normal, delay: 0.8 }}
          >
            {[
              { number: "50+", label: "Projects" },
              { number: "100%", label: "Satisfaction" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={mobileAnimationVariants.scaleIn}
                transition={{ ...mobileTransitions.normal, delay: 0.8 + index * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.button
            onClick={scrollToNext}
            className="text-white/60 hover:text-white transition-colors p-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
