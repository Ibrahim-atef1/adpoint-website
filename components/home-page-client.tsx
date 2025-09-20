"use client"

import { useRef, memo, Suspense } from "react"
import { motion, useScroll } from "framer-motion"
import dynamicImport from "next/dynamic"
import ScrollTransition from "@/components/scroll-transition"

// Optimized dynamic imports with better loading strategies and preloading
const Navigation = dynamicImport(() => import("@/components/navigation").then(m => m.Navigation), { 
  loading: () => <div className="h-16 bg-black" />,
  ssr: false
})
const HeroSection = dynamicImport(() => import("@/components/hero-section").then(m => m.HeroSection), { 
  loading: () => <div className="min-h-screen bg-background" />
})
const AboutSection = dynamicImport(() => import("@/components/about-section").then(m => m.AboutSection), {
  loading: () => <div className="min-h-screen bg-background" />
})
const ServicesCarousel = dynamicImport(() => import("@/components/services-carousel").then(m => m.ServicesCarousel), { 
  loading: () => <div className="min-h-screen bg-black" />
})
const MotionDesignSection = dynamicImport(() => import("@/components/motion-design-section").then(m => m.MotionDesignSection), { 
  loading: () => <div className="min-h-screen bg-background" />
})
const PortfolioSection = dynamicImport(() => import("@/components/portfolio-section").then(m => m.PortfolioSection), { 
  loading: () => <div className="min-h-screen bg-black" />
})
const ClientShowcase = dynamicImport(() => import("@/components/client-showcase").then(m => m.ClientShowcase), { 
  loading: () => <div className="min-h-screen bg-background" />
})
const ContactSection = dynamicImport(() => import("@/components/contact-section").then(m => m.ContactSection), {
  loading: () => <div className="min-h-screen bg-background" />
})
const WorkingCinematicFooter = dynamicImport(() => import("@/components/working-cinematic-footer").then(m => m.WorkingCinematicFooter), {
  loading: () => <div className="h-32 bg-black" />
})
const ParallaxSection = dynamicImport(() => import("@/components/parallax-section").then(m => m.ParallaxSection), {
  loading: () => <div className="min-h-screen bg-background" />
})

// Progress bar component
function ProgressBar() {
  const progressRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  return (
    <div ref={progressRef} className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[60]">
      <motion.div 
        className="h-full bg-gradient-to-r from-red-500 to-red-600"
        style={{ 
          scaleX: scrollYProgress,
          transformOrigin: "left"
        }}
      />
    </div>
  )
}

export default function HomePageClient() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Progress Bar */}
      <ProgressBar />

      <Suspense fallback={<div className="h-16 bg-black" />}>
        <Navigation />
      </Suspense>
      
      <ScrollTransition />

      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <div id="hero">
          <HeroSection />
        </div>
      </Suspense>

      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <div id="about">
          <ParallaxSection offset={30}>
            <AboutSection />
          </ParallaxSection>
        </div>
      </Suspense>

      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <div id="services">
          <ServicesCarousel />
        </div>
      </Suspense>

      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <div id="motion-design">
          <MotionDesignSection />
        </div>
      </Suspense>

      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <div id="portfolio">
          <PortfolioSection />
        </div>
      </Suspense>

      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <ClientShowcase />
      </Suspense>

      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <div id="contact">
          <ParallaxSection offset={20}>
            <ContactSection />
          </ParallaxSection>
        </div>
      </Suspense>

      <Suspense fallback={<div className="h-32 bg-black" />}>
        <WorkingCinematicFooter />
      </Suspense>
    </main>
  )
}
