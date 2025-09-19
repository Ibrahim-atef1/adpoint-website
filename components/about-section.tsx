"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Target, Lightbulb, Users, TrendingUp, Sparkles, Zap } from "lucide-react"
import { MobileScrollAnimation } from "@/components/mobile-scroll-animation"
// FadeUp component replaced with motion.div

export function AboutSection() {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const stats = [
    { icon: Target, label: "Projects Completed", value: "500+" },
    { icon: Users, label: "Happy Clients", value: "200+" },
    { icon: TrendingUp, label: "Growth Average", value: "150%" },
    { icon: Lightbulb, label: "Years Experience", value: "8+" },
  ]

  return (
    <section ref={ref} id="about" className="about-section pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <motion.div className="absolute inset-0 opacity-5" style={{ y }}>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Mobile floating elements */}
      {isMobile && (
        <>
          <motion.div
            className="absolute top-16 right-8 text-primary/20 md:hidden"
            animate={{
              y: [-8, 8, -8],
              rotate: [0, 5, 0],
              opacity: [0.2, 0.4, 0.2],
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
              y: [8, -8, 8],
              rotate: [0, -3, 0],
              opacity: [0.2, 0.4, 0.2],
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
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            <Sparkles className="w-3 h-3" />
          </motion.div>
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="about-content grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="magnetic space-y-8 sm:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-6 sm:space-y-8">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-balance">
                  Digital
                  <span className="gradient-red"> Storytellers</span>
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  <p className="text-lg sm:text-xl md:text-2xl text-primary font-semibold tracking-wide">
                    CRAFTING VISIONS INTO REALITY
                  </p>
                  <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-red-700 rounded-full" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  From bold branding initiatives to cutting-edge digital campaigns, we combine creativity with
                  data-driven insights to deliver solutions that not only look stunning but perform exceptionally.
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {["Strategy", "Creativity", "Results"].map((tag, index) => (
                    <div
                      key={tag}
                      className="bg-card border border-border rounded-xl px-4 sm:px-6 py-2 sm:py-3 hover:border-primary/50 transition-all duration-300"
                    >
                      <span className="text-primary font-semibold text-sm sm:text-base">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="magnetic"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <MobileScrollAnimation
                  key={stat.label}
                  animationType="scale-in"
                  staggerDelay={index * 0.1}
                  className="bg-card border border-border rounded-xl p-4 sm:p-6 lg:p-8 text-center hover:border-primary/50 transition-all duration-500 group relative overflow-hidden"
                >
                  {/* Mobile glow effect */}
                  {isMobile && (
                    <motion.div
                      className="absolute inset-0 bg-primary/5 rounded-xl"
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 3 + index * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    />
                  )}
                  
                  <div className="flex justify-center mb-4 sm:mb-6 relative z-10">
                    <motion.div 
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center"
                      animate={isMobile ? {
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, 0],
                      } : {}}
                      transition={{
                        duration: 2 + index * 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.1,
                      }}
                    >
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </motion.div>
                  </div>
                  <div className="space-y-2 sm:space-y-3 relative z-10">
                    <motion.div 
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
                      animate={isMobile ? {
                        scale: [1, 1.02, 1],
                      } : {}}
                      transition={{
                        duration: 2.5 + index * 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.15,
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                  
                  {/* Mobile corner accent */}
                  {isMobile && (
                    <motion.div
                      className="absolute top-2 right-2 w-2 h-2 bg-primary/30 rounded-full"
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    />
                  )}
                </MobileScrollAnimation>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
