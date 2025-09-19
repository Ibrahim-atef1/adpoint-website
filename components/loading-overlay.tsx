"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingOverlay() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const onReady = () => setTimeout(() => setShow(false), 800)
    if (document.readyState === "complete") onReady()
    else window.addEventListener("load", onReady, { once: true })
    const fallback = setTimeout(() => setShow(false), 1500)
    return () => {
      window.removeEventListener("load", onReady)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="text-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-5xl sm:text-6xl md:text-7xl gradient-red tracking-tight"
              style={{ textShadow: "0 0 20px rgba(185,28,28,0.25)" }}
            >
              AdPoint
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground text-sm sm:text-base"
            >
              Marketing Agency
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto w-56 sm:w-64 h-2 rounded-full bg-white/10 overflow-hidden"
            >
              <motion.div
                key="bar"
                initial={{ width: "0%" }}
                animate={{ width: ["0%", "65%", "100%"] }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-primary"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


