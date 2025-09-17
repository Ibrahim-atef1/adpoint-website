"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function BetweenSections() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <section className="relative py-24 sm:py-28 lg:py-32 overflow-hidden">
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(185,28,28,0.08),transparent_60%)]" />
      </motion.div>
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ opacity, y }}
      >
        <div className="space-y-8">
          <h3 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight">
            STRATEGY
            <br />
            <span className="gradient-red">DESIGN</span>
            <br />
            GROWTH
          </h3>
          
          <div className="flex justify-center items-center space-x-8">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-red-600 rounded-full" />
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-red-600 rounded-full" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}


