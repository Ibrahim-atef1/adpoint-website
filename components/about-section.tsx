"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Target, Lightbulb, Users, TrendingUp } from "lucide-react"
// FadeUp component replaced with motion.div

export function AboutSection() {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const stats = [
    { icon: Target, label: "Projects Completed", value: "500+" },
    { icon: Users, label: "Happy Clients", value: "200+" },
    { icon: TrendingUp, label: "Growth Average", value: "150%" },
    { icon: Lightbulb, label: "Years Experience", value: "8+" },
  ]

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll-based visibility detection for mobile
  useEffect(() => {
    if (!mounted || !isMobile) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.getAttribute('data-scroll-id')
          if (elementId) {
            if (entry.isIntersecting) {
              setVisibleElements(prev => new Set([...prev, elementId]))
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    // Observe all elements with data-scroll-id
    const elements = document.querySelectorAll('[data-scroll-id]')
    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
    }
  }, [mounted, isMobile])

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <section ref={ref} id="about" className="about-section pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="about-content grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
            <div className="space-y-8 sm:space-y-12">
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
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  From bold branding initiatives to cutting-edge digital campaigns, we combine creativity with
                  data-driven insights to deliver solutions that not only look stunning but perform exceptionally.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {["Strategy", "Creativity", "Results"].map((tag, index) => (
                    <div
                      key={tag}
                      className="bg-card border border-border rounded-xl px-4 sm:px-6 py-2 sm:py-3 transition-all duration-500"
                    >
                      <span className="text-primary font-semibold text-sm sm:text-base">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="flex justify-center mb-4 sm:mb-6 relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3 relative z-10">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id="about" className="about-section pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <motion.div className="absolute inset-0 opacity-5" style={{ y }}>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      </motion.div>


      <div className="max-w-7xl mx-auto relative z-10">
        <div className="about-content grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="space-y-8 sm:space-y-12">
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
                    <motion.div
                      key={tag}
                      data-scroll-id={`tag-${index}`}
                      className={`bg-card border rounded-xl px-4 sm:px-6 py-2 sm:py-3 transition-all duration-500 ${
                        mounted && isMobile 
                          ? visibleElements.has(`tag-${index}`) 
                            ? 'border-primary/50 bg-primary/5' 
                            : 'border-border'
                          : 'border-border hover:border-primary/50'
                      }`}
                      animate={mounted && isMobile && visibleElements.has(`tag-${index}`) ? {
                        scale: [1, 1.05, 1],
                        y: [0, -2, 0]
                      } : {}}
                      transition={{
                        duration: 1,
                        repeat: mounted && isMobile && visibleElements.has(`tag-${index}`) ? 1 : 0,
                        ease: "easeInOut",
                        delay: index * 0.1
                      }}
                    >
                      <span className="text-primary font-semibold text-sm sm:text-base">{tag}</span>
                    </motion.div>
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
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  data-scroll-id={`stat-${index}`}
                  className={`bg-card border rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-500 group relative overflow-hidden ${
                    mounted && isMobile 
                      ? visibleElements.has(`stat-${index}`) 
                        ? 'border-primary/50 bg-primary/5' 
                        : 'border-border'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  
                  <div className="flex justify-center mb-4 sm:mb-6 relative z-10">
                    <motion.div 
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center"
                      animate={mounted && isMobile && visibleElements.has(`stat-${index}`) ? {
                        scale: [1, 1.1, 1],
                        backgroundColor: ['rgba(185, 28, 28, 0.2)', 'rgba(185, 28, 28, 0.3)', 'rgba(185, 28, 28, 0.2)']
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: mounted && isMobile && visibleElements.has(`stat-${index}`) ? 1 : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </motion.div>
                  </div>
                  <div className="space-y-2 sm:space-y-3 relative z-10">
                    <motion.div 
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
                      animate={mounted && isMobile && visibleElements.has(`stat-${index}`) ? {
                        scale: [1, 1.05, 1],
                        color: ['#ffffff', '#ef4444', '#ffffff']
                      } : {}}
                      transition={{
                        duration: 1.5,
                        repeat: mounted && isMobile && visibleElements.has(`stat-${index}`) ? 1 : 0,
                        ease: "easeInOut",
                        delay: 0.2
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
