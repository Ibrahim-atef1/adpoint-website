"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Palette, Globe, Megaphone, BarChart3, Camera, Code, Sparkles } from "lucide-react"
import { useMobileAnimations, mobileAnimationVariants, mobileTransitions } from "@/hooks/use-mobile-animations"

interface ServiceCardProps {
  title: string
  icon: React.ReactNode
  color: string
  description: string
  index: number
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, color, description, index }) => {
  const [isInView, setIsInView] = useState(false)
  const [isTapped, setIsTapped] = useState(false)
  const { isMobile, animationDuration, staggerDelay } = useMobileAnimations()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 }
    )

    const card = document.getElementById(`service-card-${index}`)
    if (card) {
      observer.observe(card)
    }

    return () => {
      if (card) {
        observer.unobserve(card)
      }
    }
  }, [index])

  const shouldShowDescription = isMobile ? (isInView || isTapped) : isInView

  return (
    <motion.div
      id={`service-card-${index}`}
      className="relative w-full bg-black/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 group cursor-pointer min-h-[300px] sm:min-h-[400px]"
      onClick={() => setIsTapped(!isTapped)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        willChange: 'transform, opacity',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Enhanced Glow Effect */}
      <motion.div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at center, ${color}20, transparent 70%)`,
        }}
        animate={{
          scale: shouldShowDescription ? 1.1 : 1,
          opacity: shouldShowDescription ? 1 : 0.4,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />

      {/* Additional Mobile Glow Layer */}
      {isMobile && (
        <motion.div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${color}15, transparent 50%, ${color}10)`,
            boxShadow: `inset 0 0 20px ${color}20`,
          }}
          animate={{
            opacity: isInView ? 0.8 : 0.3,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        />
      )}

      {/* Floating Elements */}
      {isMobile && isInView && (
        <motion.div
          className="absolute top-4 right-4 text-primary/20"
          animate={{
            y: [-2, 2, -2],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
          style={{
            willChange: 'transform, opacity',
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
        {/* Icon */}
        <motion.div 
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-6 relative"
          style={{
            background: `linear-gradient(135deg, ${color}30, ${color}50)`,
            boxShadow: `0 0 30px ${color}60, inset 0 1px 0 rgba(255,255,255,0.3)`,
          }}
          animate={isMobile && isInView ? {
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0],
            boxShadow: [
              `0 0 30px ${color}60, inset 0 1px 0 rgba(255,255,255,0.3)`,
              `0 0 40px ${color}80, inset 0 1px 0 rgba(255,255,255,0.4)`,
              `0 0 30px ${color}60, inset 0 1px 0 rgba(255,255,255,0.3)`
            ],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        >
          <div className="text-2xl sm:text-3xl text-white">
            {icon}
          </div>
        </motion.div>
        
        {/* Title */}
        <motion.h3 
          className="text-xl sm:text-2xl font-bold text-white mb-4"
          animate={isMobile && isInView ? {
            scale: [1, 1.02, 1],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.div 
          className={`transition-all duration-500 ${
            shouldShowDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {description}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function MobileServicesSection() {
  const { isMobile, animationDuration, staggerDelay } = useMobileAnimations()

  const services = [
    { 
      title: "Brand Identity", 
      icon: <Palette className="w-8 h-8 text-red-500" />, 
      color: "#ef4444",
      description: "Create memorable brand identities that resonate with your audience. From logos to complete brand guidelines, we craft visual stories that make your business unforgettable."
    },
    { 
      title: "Web Development", 
      icon: <Globe className="w-8 h-8 text-red-500" />, 
      color: "#ef4444",
      description: "Build fast, responsive websites that convert visitors into customers. Modern web technologies, mobile-first design, and seamless user experiences."
    },
    { 
      title: "Digital Marketing", 
      icon: <Megaphone className="w-8 h-8 text-red-500" />, 
      color: "#ef4444",
      description: "Grow your business with strategic digital marketing campaigns. Social media, content marketing, and paid advertising that delivers real results."
    },
    { 
      title: "SEO & Analytics", 
      icon: <BarChart3 className="w-8 h-8 text-red-500" />, 
      color: "#ef4444",
      description: "Improve your search rankings and track performance with data-driven SEO strategies. Comprehensive analytics and reporting to measure success."
    },
    { 
      title: "Content Creation", 
      icon: <Camera className="w-8 h-8 text-red-500" />, 
      color: "#ef4444",
      description: "Engaging visual content that tells your story. Professional photography, videography, and graphic design that captures attention and drives engagement."
    },
    { 
      title: "Technical Solutions", 
      icon: <Code className="w-8 h-8 text-red-500" />, 
      color: "#ef4444",
      description: "Custom software solutions and technical integrations. From APIs to automation tools, we solve complex technical challenges for your business."
    },
  ]

  return (
    <section className="relative w-full min-h-screen bg-black py-16 sm:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={mobileAnimationVariants.fadeInUp}
          transition={mobileTransitions.normal}
        >
          Our Services
        </motion.h2>
        <motion.p
          className="text-lg text-gray-400 max-w-2xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={mobileAnimationVariants.fadeInUp}
          transition={{ ...mobileTransitions.normal, delay: 0.2 }}
        >
          Comprehensive digital solutions tailored to your business needs
        </motion.p>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={mobileAnimationVariants.fadeInUp}
              transition={{ 
                ...mobileTransitions.normal, 
                delay: index * staggerDelay 
              }}
            >
              <ServiceCard {...service} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
