import dynamicImport from "next/dynamic"
import { FormProvider } from "@/contexts/FormContext"
import { Suspense } from "react"


// Optimized dynamic imports with better loading strategies
const Navigation = dynamicImport(() => import("@/components/navigation").then(m => m.Navigation), { 
  loading: () => <div className="h-16" />
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

export default function HomePage() {
  return (
    <FormProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Navigation />

        <div id="hero">
          <HeroSection />
        </div>

        <div id="about">
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <ParallaxSection offset={30}>
              <AboutSection />
            </ParallaxSection>
          </Suspense>
        </div>

        <div id="services">
          <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <ServicesCarousel />
          </Suspense>
        </div>

        <div id="portfolio">
          <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <PortfolioSection />
          </Suspense>
        </div>

        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <ClientShowcase />
        </Suspense>

        <div id="contact">
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <ParallaxSection offset={20}>
              <ContactSection />
            </ParallaxSection>
          </Suspense>
        </div>

        <Suspense fallback={<div className="h-32 bg-black" />}>
          <WorkingCinematicFooter />
        </Suspense>
      </main>
    </FormProvider>
  )
}
