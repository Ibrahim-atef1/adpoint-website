"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  offset?: number
}

export function ParallaxSection({ children, offset = 50 }: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Reduce parallax effect on mobile for better performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const adjustedOffset = isMobile ? offset * 0.3 : offset
  const y = useTransform(scrollYProgress, [0, 1], [adjustedOffset, -adjustedOffset])

  return (
    <motion.div ref={ref} style={{ y }} className={isMobile ? 'parallax-mobile' : ''}>
      {children}
    </motion.div>
  )
}
