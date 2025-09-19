"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor performance metrics
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor frame rate
      let lastTime = performance.now()
      let frameCount = 0
      let fps = 0

      const measureFPS = () => {
        frameCount++
        const currentTime = performance.now()
        
        if (currentTime - lastTime >= 1000) {
          fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
          frameCount = 0
          lastTime = currentTime
          
          // Log performance warnings in development
          if (process.env.NODE_ENV === 'development' && fps < 50) {
            console.warn(`Low FPS detected: ${fps}fps`)
          }
        }
        
        requestAnimationFrame(measureFPS)
      }
      
      // Start FPS monitoring
      requestAnimationFrame(measureFPS)
      
      // Monitor memory usage
      const checkMemory = () => {
        if ('memory' in performance) {
          const memory = (performance as any).memory
          const usedMB = Math.round(memory.usedJSHeapSize / 1048576)
          const totalMB = Math.round(memory.totalJSHeapSize / 1048576)
          
          if (process.env.NODE_ENV === 'development' && usedMB > 100) {
            console.warn(`High memory usage: ${usedMB}MB / ${totalMB}MB`)
          }
        }
      }
      
      // Check memory every 5 seconds
      const memoryInterval = setInterval(checkMemory, 5000)
      
      return () => {
        clearInterval(memoryInterval)
      }
    }
  }, [])

  return null
}
