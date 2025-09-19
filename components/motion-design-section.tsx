"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Sparkles, Zap, Target, Rocket, Lightbulb, Code, Palette, Layers } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function MotionDesignSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !isClient) return

    const sectionElement = sectionRef.current
    if (!sectionElement) return

    // Wait for DOM to be ready
    const timer = setTimeout(() => {

    const ctx = gsap.context(() => {
      // Animate floating particles
      const particles = sectionElement.querySelectorAll('.floating-particle')
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: -100,
          x: gsap.utils.random(-50, 50),
          rotation: gsap.utils.random(-180, 180),
          scale: gsap.utils.random(0.5, 1.5),
          duration: gsap.utils.random(3, 6),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.5
        })
      })

      // Animate process steps
      const steps = sectionElement.querySelectorAll('.process-step')
      steps.forEach((step, index) => {
        gsap.fromTo(step,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotationX: 45
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          }
        )
      })

      // Animate icons with rotation and scale
      const icons = sectionElement.querySelectorAll('.animated-icon')
      icons.forEach((icon, index) => {
        gsap.to(icon, {
          rotation: 360,
          scale: 1.2,
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.3
        })
      })

      // Animate background elements
      const bgElements = sectionElement.querySelectorAll('.bg-element')
      bgElements.forEach((element, index) => {
        gsap.to(element, {
          y: -50,
          x: gsap.utils.random(-30, 30),
          rotation: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(4, 8),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 1
        })
      })

      // Animate text elements with stagger
      const textElements = sectionElement.querySelectorAll('.animated-text')
      gsap.fromTo(textElements,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionElement,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Create magnetic effect for cards
      const cards = sectionElement.querySelectorAll('.magnetic-card')
      cards.forEach(card => {
        const el = card as HTMLElement
        
        const handleMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          
          gsap.to(el, {
            x: x * 0.1,
            y: y * 0.1,
            rotationY: x * 0.05,
            rotationX: -y * 0.05,
            duration: 0.3,
            ease: "power2.out"
          })
        }
        
        const handleMouseLeave = () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          })
        }

        el.addEventListener('mousemove', handleMouseMove)
        el.addEventListener('mouseleave', handleMouseLeave)
      })


      console.log("MotionDesignSection: Dynamic animations initialized successfully")

      // Refresh ScrollTrigger to ensure proper coordination with other sections
      setTimeout(() => {
        ScrollTrigger.refresh()
        console.log("MotionDesignSection: ScrollTrigger refreshed")
      }, 200)

    }, sectionElement)

    return () => ctx.revert()
    }, 500)

    return () => clearTimeout(timer)
  }, [isClient])

  const processSteps = [
    {
      icon: Lightbulb,
      title: "Ideation",
      description: "We brainstorm innovative concepts that push creative boundaries",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Palette,
      title: "Design",
      description: "Crafting visually stunning interfaces with pixel-perfect precision",
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: Code,
      title: "Development",
      description: "Bringing designs to life with cutting-edge technology",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Rocket,
      title: "Launch",
      description: "Deploying solutions that exceed expectations",
      color: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="motion-design" 
      className="relative min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated background elements - only render on client */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-element absolute w-32 h-32 bg-primary/5 rounded-full blur-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      )}


      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="animated-text text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Creative
            <span className="gradient-red"> Process</span>
          </h2>
          <p className="animated-text text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience our dynamic workflow that transforms ideas into extraordinary digital experiences
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="process-step magnetic-card group relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 h-full relative overflow-hidden">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                    <step.icon className="animated-icon w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
}
