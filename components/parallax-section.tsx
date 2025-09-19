"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState, useEffect, type ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  offset?: number
}

export function ParallaxSection({ children, offset = 50 }: ParallaxSectionProps) {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isInView, setIsInView] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  // Reduce parallax effect on mobile for better performance
  const adjustedOffset = isMobile ? offset * 0.2 : offset
  const y = useTransform(scrollYProgress, [0, 1], [adjustedOffset, -adjustedOffset])
  
  // Mobile-specific animations
  const mobileY = useTransform(scrollYProgress, [0, 1], [0, -10])
  const mobileOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const mobileScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <motion.div 
      ref={ref} 
      style={{ 
        y: isMobile ? mobileY : y,
        opacity: isMobile ? mobileOpacity : 1,
        scale: isMobile ? mobileScale : 1
      }} 
      className={`${isMobile ? 'parallax-mobile' : ''} ${isInView ? 'visible' : ''}`}
      animate={isMobile && isInView ? {
        y: [0, -5, 0],
        scale: [1, 1.01, 1],
      } : {}}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}
