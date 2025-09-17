import dynamic from "next/dynamic"

// Optimized dynamic imports with better loading strategies
const Navigation = dynamic(() => import("@/components/navigation").then(m => m.Navigation), { 
  ssr: false,
  loading: () => <div className="h-16" />
})
const ScrollProgress = dynamic(() => import("@/components/scroll-progress").then(m => m.ScrollProgress), { 
  ssr: false 
})
const HeroSection = dynamic(() => import("@/components/hero-section").then(m => m.HeroSection), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-background" />
})
const AboutSection = dynamic(() => import("@/components/about-section").then(m => m.AboutSection), {
  loading: () => <div className="min-h-screen bg-background" />
})
const ServicesCarousel = dynamic(() => import("@/components/services-carousel").then(m => m.ServicesCarousel), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-background" />
})
const PortfolioSection = dynamic(() => import("@/components/portfolio-section").then(m => m.PortfolioSection), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-background" />
})
const ClientShowcase = dynamic(() => import("@/components/client-showcase").then(m => m.ClientShowcase), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-background" />
})
const ContactSection = dynamic(() => import("@/components/contact-section").then(m => m.ContactSection), {
  loading: () => <div className="min-h-screen bg-background" />
})
const Footer = dynamic(() => import("@/components/footer").then(m => m.Footer), {
  loading: () => <div className="h-32 bg-black" />
})
const ParallaxSection = dynamic(() => import("@/components/parallax-section").then(m => m.ParallaxSection), {
  loading: () => <div className="min-h-screen bg-background" />
})
const BetweenSections = dynamic(() => import("@/components/between-sections").then(m => m.BetweenSections), {
  loading: () => <div className="py-24 bg-background" />
})

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ScrollProgress />

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

      <BetweenSections />

      <div id="portfolio">
        <ParallaxSection offset={40}>
          <PortfolioSection />
        </ParallaxSection>
      </div>

              <ClientShowcase />

      <div id="contact">
        <ParallaxSection offset={20}>
          <ContactSection />
        </ParallaxSection>
      </div>

      <Footer />
    </main>
  )
}
