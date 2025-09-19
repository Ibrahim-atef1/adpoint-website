"use client"

import { useEffect } from "react"

export function PerformanceOptimizer() {
  useEffect(() => {
    // Critical performance optimizations
    const optimizePerformance = () => {
      // Preload critical resources
      const preloadCriticalResources = () => {
        const criticalImages = [
          '/logo/Transparent Logo.png'
        ]
        
        criticalImages.forEach(src => {
          const link = document.createElement('link')
          link.rel = 'preload'
          link.href = src
          link.as = 'image'
          document.head.appendChild(link)
        })
      }

      // Optimize images
      const optimizeImages = () => {
        const images = document.querySelectorAll('img')
        images.forEach(img => {
          // Add loading="lazy" to below-the-fold images
          if (img.getBoundingClientRect().top > window.innerHeight) {
            img.loading = 'lazy'
          }
          
          // Add decoding="async" for better performance
          img.decoding = 'async'
        })
      }

      // Defer non-critical scripts
      const deferNonCriticalScripts = () => {
        const scripts = document.querySelectorAll('script[data-defer]')
        scripts.forEach(script => {
          if (script.getAttribute('data-defer') === 'true') {
            script.defer = true
          }
        })
      }

      // Optimize scroll performance
      const optimizeScroll = () => {
        let ticking = false
        
        const updateScroll = () => {
          // Batch scroll updates
          ticking = false
        }
        
        const requestScrollUpdate = () => {
          if (!ticking) {
            requestAnimationFrame(updateScroll)
            ticking = true
          }
        }
        
        window.addEventListener('scroll', requestScrollUpdate, { passive: true })
        window.addEventListener('touchmove', requestScrollUpdate, { passive: true })
      }

      // Optimize animations for mobile
      const optimizeAnimations = () => {
        const isMobile = window.innerWidth < 768
        
        if (isMobile) {
          // Reduce animation complexity on mobile
          document.documentElement.style.setProperty('--animation-duration', '0.3s')
          document.documentElement.style.setProperty('--animation-easing', 'ease-out')
        }
      }

      // Run optimizations
      preloadCriticalResources()
      optimizeImages()
      deferNonCriticalScripts()
      optimizeScroll()
      optimizeAnimations()
    }

    // Run on load
    if (document.readyState === 'complete') {
      optimizePerformance()
    } else {
      window.addEventListener('load', optimizePerformance)
    }

    // Run on resize
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(optimizePerformance, 100)
    }
    
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('load', optimizePerformance)
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return null
}
