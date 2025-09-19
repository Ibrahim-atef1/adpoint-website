"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useMobileAnimations, mobileAnimationVariants, mobileTransitions } from "@/hooks/use-mobile-animations"
import { Sparkles, Zap, Star } from "lucide-react"
// FadeUp component replaced with motion.div

const clients = [
  { name: "TechFlow", logo: "TF", category: "Technology" },
  { name: "EcoVibe", logo: "EV", category: "E-commerce" },
  { name: "Artisan Coffee", logo: "AC", category: "Food & Beverage" },
  { name: "FinanceForward", logo: "FF", category: "Fintech" },
  { name: "Wellness Retreat", logo: "WR", category: "Health & Wellness" },
  { name: "Creative Studio", logo: "CS", category: "Design" },
  { name: "StartupHub", logo: "SH", category: "Innovation" },
  { name: "Green Energy", logo: "GE", category: "Sustainability" },
  { name: "Digital Agency", logo: "DA", category: "Marketing" },
  { name: "Fashion Forward", logo: "FF", category: "Fashion" },
  { name: "Real Estate Pro", logo: "RE", category: "Real Estate" },
  { name: "HealthTech", logo: "HT", category: "Healthcare" },
]

export function ClientShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { isMobile, staggerDelay } = useMobileAnimations()

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-600/5 rounded-full blur-3xl" />
      </div>

      {/* Mobile floating elements */}
      {isMobile && (
        <>
          <motion.div
            className="absolute top-16 right-8 text-primary/20 md:hidden"
            animate={{
              y: [-8, 8, -8],
              rotate: [0, 5, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          <motion.div
            className="absolute top-32 left-6 text-primary/20 md:hidden"
            animate={{
              y: [6, -6, 6],
              rotate: [0, -3, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Zap className="w-4 h-4" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 right-12 text-primary/20 md:hidden"
            animate={{
              y: [-6, 6, -6],
              rotate: [0, 4, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            <Star className="w-3 h-3" />
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-8 text-primary/20 md:hidden"
            animate={{
              y: [4, -4, 4],
              rotate: [0, -2, 0],
              opacity: [0.1, 0.35, 0.1],
            }}
            transition={{
              duration: 3.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <Sparkles className="w-2 h-2" />
          </motion.div>
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 text-balance">
              Trusted by
              <span className="gradient-red"> Leaders</span>
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex justify-center items-center space-x-2 sm:space-x-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-lg sm:text-xl md:text-2xl text-primary font-semibold tracking-wide">
                  BRANDS THAT SHAPE THE FUTURE
                </span>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse" />
              </div>
              
              <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-red-600 to-red-700 rounded-full mx-auto" />
            </div>
          </div>
        </motion.div>

        {/* Client Logos Carousel */}
        <div ref={ref} className="relative overflow-hidden">
          <motion.div
            className="flex space-x-6 sm:space-x-8 md:space-x-12 items-center"
            animate={isInView ? { x: [0, -1920] } : {}}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {/* First set of clients */}
            {clients.map((client, index) => (
              <motion.div
                key={`first-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="flex-shrink-0 group cursor-pointer relative"
              >
                <div className="bg-gray-900/50 hover:bg-gray-800/80 border border-gray-800 hover:border-red-600/50 rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 min-w-[150px] sm:min-w-[180px] md:min-w-[200px] text-center relative overflow-hidden">
                  {/* Mobile floating elements for each card */}
                  {isMobile && (
                    <>
                      <motion.div
                        className="absolute top-2 right-2 w-1 h-1 bg-primary/30 rounded-full"
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 2 + index * 0.2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: index * 0.3,
                        }}
                      />
                      <motion.div
                        className="absolute bottom-2 left-2 w-1 h-1 bg-primary/20 rounded-full"
                        animate={{
                          opacity: [0.2, 0.6, 0.2],
                          scale: [0.6, 1.4, 0.6],
                        }}
                        transition={{
                          duration: 2.5 + index * 0.15,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: index * 0.4,
                        }}
                      />
                    </>
                  )}

                  <motion.div 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 relative"
                    animate={isMobile ? {
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, 0],
                    } : {}}
                    transition={{
                      duration: 2.8 + index * 0.1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <span className="text-white font-bold text-sm sm:text-base md:text-xl">{client.logo}</span>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-white font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 group-hover:text-red-400 transition-colors"
                    animate={isMobile ? {
                      scale: [1, 1.02, 1],
                    } : {}}
                    transition={{
                      duration: 2.5 + index * 0.08,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: index * 0.25,
                    }}
                  >
                    {client.name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors"
                    animate={isMobile ? {
                      opacity: [0.8, 1, 0.8],
                    } : {}}
                    transition={{
                      duration: 2.2 + index * 0.05,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                  >
                    {client.category}
                  </motion.p>
                </div>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {clients.map((client, index) => (
              <motion.div
                key={`second-${index}`}
                whileHover={{ scale: 1.1, y: -10 }}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="bg-gray-900/50 hover:bg-gray-800/80 border border-gray-800 hover:border-red-600/50 rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 min-w-[150px] sm:min-w-[180px] md:min-w-[200px] text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm sm:text-base md:text-xl">{client.logo}</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 group-hover:text-red-400 transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors">
                    {client.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-20">
            {[
              { number: "500+", label: "Projects Delivered" },
              { number: "200+", label: "Happy Clients" },
              { number: "150%", label: "Average Growth" },
              { number: "8+", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={mobileAnimationVariants.scaleIn}
                transition={{ 
                  ...mobileTransitions.normal, 
                  delay: index * staggerDelay 
                }}
              >
                <div className="bg-gray-900/30 hover:bg-gray-800/50 border border-gray-800 hover:border-red-600/30 rounded-xl p-4 sm:p-6 transition-all duration-300 group-hover:scale-105">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:text-red-400 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
