"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollTransition() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !isClient) return

    // Wait for DOM to be ready and hydration to complete
    const timer = setTimeout(() => {
      const heroElement = document.querySelector('.hero-section') as HTMLElement
      const aboutElement = document.querySelector('.about-section') as HTMLElement

      if (!heroElement || !aboutElement) {
        console.warn('ScrollTransition: Required elements not found')
        return
      }

      // Create a context for cleanup
      const ctx = gsap.context(() => {
        // Don't set initial states - let CSS handle them to prevent hydration issues

        // Simple hero fade out animation - slowed down by 50%
        gsap.to(heroElement, {
          scale: 0.8,
          opacity: 0,
          y: -50,
          duration: 2, // Doubled from 1 to 2 seconds
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroElement,
            start: "top top",
            end: "+=100vh", // Doubled from 50vh to 100vh for slower scroll
            scrub: 2, // Doubled from 1 to 2 for slower animation
            pin: true
          }
        })

        // Simple about section fade in animation
        gsap.fromTo(aboutElement, 
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: aboutElement,
              start: "top 80%",
              end: "top 50%",
              scrub: 1
            }
          }
        )

        // Simple about section content animation
        const aboutElements = aboutElement.querySelectorAll('.about-content > *')
        gsap.fromTo(aboutElements,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: aboutElement,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )

        // Simple hero text fade
        const heroText = heroElement.querySelectorAll('h1, p, button')
        gsap.fromTo(heroText,
          {
            opacity: 1,
            y: 0
          },
          {
            opacity: 0,
            y: -20,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.in",
            scrollTrigger: {
              trigger: heroElement,
              start: "top top",
              end: "50% top",
              scrub: 1
            }
          }
        )

        // Simple background animation
        const heroBackground = heroElement.querySelector('.hero-bg')
        if (heroBackground) {
          gsap.to(heroBackground, {
            scale: 1.1,
            opacity: 0.3,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heroElement,
              start: "top top",
              end: "bottom top",
              scrub: 1
            }
          })
        }

        console.log("ScrollTransition: Simplified GSAP animations initialized successfully")

        // Refresh ScrollTrigger to ensure all sections work together
        setTimeout(() => {
          ScrollTrigger.refresh()
          console.log("ScrollTransition: Global ScrollTrigger refreshed")
        }, 300)

      })

      return () => ctx.revert()
    }, 1000)

    return () => clearTimeout(timer)
  }, [isClient])

  return null
}
