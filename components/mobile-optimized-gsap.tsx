"use client"

import { useEffect, useRef, useState } from "react"

// Dynamic GSAP import to prevent SSR issues
let gsap: any = null
let ScrollTrigger: any = null

if (typeof window !== "undefined") {
  import("gsap").then((gsapModule) => {
    gsap = gsapModule.default
    import("gsap/ScrollTrigger").then((stModule) => {
      ScrollTrigger = stModule.ScrollTrigger
      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger)
      }
    })
  })
}

interface MobileOptimizedGSAPProps {
  children: React.ReactNode
  className?: string
}

export function MobileOptimizedGSAP({ children, className = "" }: MobileOptimizedGSAPProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLowEnd, setIsLowEnd] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [gsapLoaded, setGsapLoaded] = useState(false)

  // Safe mobile detection
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkDevice = () => {
      const mobile = window.innerWidth < 768
      const lowEnd = mobile && (
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
        ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4) ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      )
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      setIsMobile(mobile)
      setIsLowEnd(lowEnd)
      setReducedMotion(motion)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice, { passive: true })
    
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Load GSAP dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const loadGSAP = async () => {
      try {
        const gsapModule = await import("gsap")
        const stModule = await import("gsap/ScrollTrigger")
        
        gsap = gsapModule.default
        ScrollTrigger = stModule.ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)
        setGsapLoaded(true)
      } catch (error) {
        console.warn('Failed to load GSAP:', error)
      }
    }

    loadGSAP()
  }, [])

  useEffect(() => {
    if (!ref.current || reducedMotion || !gsapLoaded || !gsap || !ScrollTrigger) return

    const elements = ref.current.querySelectorAll('[data-gsap-animate]')
    
    // Mobile-optimized GSAP settings
    const mobileSettings = {
      duration: isMobile ? 0.6 : 1.2,
      ease: isMobile ? "power2.out" : "power3.out",
      stagger: isMobile ? 0.1 : 0.2,
      y: isMobile ? 30 : 60,
      opacity: 0.8
    }

    // Create timeline with mobile optimizations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        // Reduce refresh rate on mobile
        refreshPriority: isMobile ? -1 : 0,
        // Use passive listeners
        onUpdate: isMobile ? undefined : undefined,
      }
    })

    // Animate elements with mobile-optimized properties
    elements.forEach((element, index) => {
      const isImage = element.tagName === 'IMG'
      const isText = element.tagName === 'P' || element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3'
      
      // Set initial state
      gsap.set(element, {
        y: mobileSettings.y,
        opacity: 0,
        // Only use transform and opacity for performance
        willChange: 'transform, opacity',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden'
      })

      // Add to timeline with mobile optimizations
      tl.to(element, {
        y: 0,
        opacity: 1,
        duration: mobileSettings.duration,
        ease: mobileSettings.ease,
        delay: index * mobileSettings.stagger,
        // Force GPU acceleration
        force3D: true,
        // Reduce complexity on low-end devices
        scale: isLowEnd ? 1 : (isImage ? 1.02 : 1),
      }, 0)
    })

    // Cleanup
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === ref.current) {
          trigger.kill()
        }
      })
    }
  }, [isMobile, isLowEnd, reducedMotion, gsapLoaded])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Mobile-optimized ScrollTrigger batch
export function createMobileScrollTriggerBatch(triggers: Array<{
  trigger: string | Element
  animation: gsap.core.Timeline
  start?: string
  end?: string
}>) {
  if (typeof window === "undefined") return

  const isMobile = window.innerWidth < 768
  
  triggers.forEach(({ trigger, animation, start = "top 80%", end = "bottom 20%" }) => {
    ScrollTrigger.create({
      trigger,
      start,
      end,
      animation,
      // Mobile optimizations
      refreshPriority: isMobile ? -1 : 0,
      onUpdate: isMobile ? undefined : undefined,
      // Reduce refresh rate
      invalidateOnRefresh: !isMobile,
    })
  })
}
