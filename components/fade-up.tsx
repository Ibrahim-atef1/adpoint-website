"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface FadeUpProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  distance?: number
  duration?: number
  stagger?: number
}

export function FadeUp({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up",
  distance = 40,
  duration = 0.8,
  stagger = 0
}: FadeUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance, rotateX: 10 }
      case "down":
        return { opacity: 0, y: -distance, rotateX: -10 }
      case "left":
        return { opacity: 0, x: distance, rotateY: 10 }
      case "right":
        return { opacity: 0, x: -distance, rotateY: -10 }
      default:
        return { opacity: 0, y: distance }
    }
  }

  const getAnimateTransform = () => {
    switch (direction) {
      case "up":
        return { opacity: 1, y: 0, rotateX: 0 }
      case "down":
        return { opacity: 1, y: 0, rotateX: 0 }
      case "left":
        return { opacity: 1, x: 0, rotateY: 0 }
      case "right":
        return { opacity: 1, x: 0, rotateY: 0 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialTransform()}
      animate={isInView ? getAnimateTransform() : getInitialTransform()}
      transition={{
        duration,
        delay: delay + stagger,
        ease: [0.21, 0.47, 0.32, 0.98],
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      {children}
    </motion.div>
  )
}
