import dynamic from "next/dynamic"
import { FormProvider } from "@/contexts/FormContext"

// Critical above-the-fold components (load immediately)
const Navigation = dynamic(() => import("@/components/navigation").then(m => m.Navigation), { 
  loading: () => <div className="h-16 bg-black" />
})

const HeroSection = dynamic(() => import("@/components/hero-section").then(m => m.HeroSection), { 
  loading: () => <div className="min-h-screen bg-background" />
})

// Below-the-fold components (lazy load)
const AboutSection = dynamic(() => import("@/components/about-section").then(m => m.AboutSection), {
  loading: () => <div className="min-h-screen bg-background" />
})

const ServicesCarousel = dynamic(() => import("@/components/services-carousel").then(m => m.ServicesCarousel), { 
  loading: () => <div className="min-h-screen bg-black" />
})

const PortfolioSection = dynamic(() => import("@/components/portfolio-section").then(m => m.PortfolioSection), { 
  loading: () => <div className="min-h-screen bg-black" />
})

const ClientShowcase = dynamic(() => import("@/components/client-showcase").then(m => m.ClientShowcase), { 
  loading: () => <div className="min-h-screen bg-background" />
})

const ContactSection = dynamic(() => import("@/components/contact-section").then(m => m.ContactSection), {
  loading: () => <div className="min-h-screen bg-background" />
})

const WorkingCinematicFooter = dynamic(() => import("@/components/working-cinematic-footer").then(m => m.WorkingCinematicFooter), {
  loading: () => <div className="h-32 bg-black" />
})

const ParallaxSection = dynamic(() => import("@/components/parallax-section").then(m => m.ParallaxSection), {
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
          <ParallaxSection offset={30}>
            <AboutSection />
          </ParallaxSection>
        </div>

        <div id="services">
          <ServicesCarousel />
        </div>

        <div id="portfolio">
          <PortfolioSection />
        </div>

        <ClientShowcase />

        <div id="contact">
          <ParallaxSection offset={20}>
            <ContactSection />
          </ParallaxSection>
        </div>

        <WorkingCinematicFooter />
      </main>
    </FormProvider>
  )
}
