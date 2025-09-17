"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface MotionWrapperProps {
  children: ReactNode
  className?: string
  initial?: any
  animate?: any
  transition?: any
  whileInView?: any
  viewport?: any
  style?: any
}

export function MotionWrapper({ 
  children, 
  className, 
  initial, 
  animate, 
  transition, 
  whileInView, 
  viewport, 
  style 
}: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      whileInView={whileInView}
      viewport={viewport}
      style={style}
    >
      {children}
    </motion.div>
  )
}
