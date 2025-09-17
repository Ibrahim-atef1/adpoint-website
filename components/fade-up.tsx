"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface FadeUpProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeUp({ children, className = "", delay = 0 }: FadeUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  )
}
