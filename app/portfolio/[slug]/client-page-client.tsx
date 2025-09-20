"use client"

import React, { useState, useEffect, useRef, Suspense, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { type ClientData } from "@/lib/client-data"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { WorkingCinematicFooter } from "@/components/working-cinematic-footer"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ClientPageClientProps {
  client: ClientData
}

// Helper functions to generate content for each image
function getImageTitle(client: ClientData, index: number): string {
  const titles: { [key: string]: string[] } = {
    'dreams-reality': [
      'Company Profile Design',
      'Website Contact Page',
      'Elegant Homepage Layout',
      'Services Showcase',
      'Business Card Design'
    ],
    'house-of-toast': [
      'Ramadan Instagram Campaign',
      'Restaurant Branding Posts'
    ],
    'palme': [
      'Instagram Brand Campaign',
      'Social Media Ad Design',
      'Website Quick Add Feature',
      'Easy Checkout Process',
      'Fashion Brand Identity'
    ],
    'peefree': [
      'Creative Instagram Posts',
      'Brand Engagement Content',
      'Social Media Strategy',
      'Consumer Goods Marketing',
      'Brand Awareness Campaign'
    ],
    'zenachii': [
      'E-commerce Product Showcase',
      'Fashion Brand Identity',
      'Website Design & Development',
      'Product Photography',
      'Brand Content Creation'
    ]
  }
  
  return titles[client.slug]?.[index] || `Project Image ${index + 1}`
}

function getImageDescription(client: ClientData, index: number): string {
  const descriptions: { [key: string]: string[] } = {
    'dreams-reality': [
      'A comprehensive company profile showcasing Dreams Reality\'s construction expertise and portfolio. The design emphasizes professionalism and trustworthiness, featuring clean layouts and high-quality imagery that highlights their construction projects and finishing work.',
      'The contact page design focuses on accessibility and user experience, providing multiple ways for potential clients to reach out. The layout includes clear contact information, a functional contact form, and location details with an integrated map.',
      'The homepage features an elegant, modern design that immediately communicates the company\'s professionalism. The layout uses strategic white space, compelling imagery, and clear navigation to guide visitors through their services and portfolio.',
      'A dedicated services page that clearly outlines Dreams Reality\'s construction and finishing capabilities. The design uses visual hierarchy and compelling imagery to showcase different service categories and project types.',
      'Professional business card design that reflects the company\'s brand identity. The cards feature clean typography, the company logo, and essential contact information in a sophisticated layout.'
    ],
    'house-of-toast': [
      'A series of Ramadan-themed Instagram posts designed to celebrate the holy month while promoting House of Toast\'s restaurant offerings. The designs incorporate traditional Ramadan elements with modern food photography and engaging typography.',
      'Brand-focused Instagram content that showcases the restaurant\'s unique atmosphere and menu items. The posts use consistent branding, appetizing food photography, and engaging captions to build community and drive foot traffic.'
    ],
    'palme': [
      'A comprehensive Instagram brand campaign for Palmé\'s fashion footwear line. The content showcases the brand\'s Birkenstock-inspired designs with lifestyle photography, emphasizing comfort, style, and the brand\'s target market in Egypt and UAE.',
      'Strategic social media ad design that drives conversions and brand awareness. The ads feature compelling product photography, clear value propositions, and strong calls-to-action optimized for Instagram\'s advertising platform.',
      'The quick add feature streamlines the shopping experience by allowing customers to add items to their cart without leaving the product page. The design focuses on usability and conversion optimization.',
      'A simplified checkout process designed to reduce cart abandonment and improve conversion rates. The interface guides users through payment with clear steps, trust indicators, and multiple payment options.',
      'Complete brand identity development including logo design, color palette, typography, and visual guidelines that establish Palmé as a premium fashion footwear brand in the Middle Eastern market.'
    ],
    'peefree': [
      'Creative Instagram posts designed to boost brand presence and engagement for Peefree\'s consumer goods. The content uses eye-catching visuals, relatable messaging, and strategic hashtags to reach target audiences.',
      'Brand-focused content that highlights product benefits and features through creative storytelling. The posts use lifestyle photography and engaging captions to build brand awareness and customer loyalty.',
      'A comprehensive social media strategy that positions Peefree as a trusted consumer goods brand. The content mix includes product showcases, user-generated content, and educational posts about product benefits.',
      'Marketing content designed to increase brand visibility and market share. The posts use compelling visuals and strategic messaging to differentiate Peefree from competitors in the consumer goods space.',
      'A brand awareness campaign that introduces Peefree to new audiences and reinforces brand recognition among existing customers. The content uses consistent branding and engaging storytelling.'
    ],
    'zenachii': [
      'A comprehensive e-commerce product showcase that highlights Zenachii\'s fashion and lifestyle products. The design emphasizes product quality, lifestyle integration, and brand aesthetics to drive online sales.',
      'Complete brand identity development for Zenachii\'s fashion/lifestyle e-commerce platform. The branding includes logo design, color schemes, typography, and visual guidelines that appeal to the target demographic.',
      'Full website design and development for Zenachii\'s e-commerce platform. The site features responsive design, intuitive navigation, product filtering, and seamless checkout experience optimized for mobile and desktop users.',
      'Professional product photography that showcases Zenachii\'s fashion items in lifestyle contexts. The images emphasize quality, style, and versatility to appeal to fashion-conscious consumers.',
      'Brand content creation including lifestyle photography, product descriptions, and marketing materials that establish Zenachii as a premium fashion and lifestyle brand in the e-commerce space.'
    ]
  }
  
  return descriptions[client.slug]?.[index] || `Detailed description of the project work and design process for this specific deliverable.`
}

function getImageTags(client: ClientData, index: number): string[] {
  const tags: { [key: string]: string[][] } = {
    'dreams-reality': [
      ['Brand Design', 'Company Profile', 'Construction'],
      ['Web Design', 'Contact Page', 'UX/UI'],
      ['Homepage Design', 'Layout', 'Professional'],
      ['Services Page', 'Web Design', 'Portfolio'],
      ['Business Cards', 'Print Design', 'Branding']
    ],
    'house-of-toast': [
      ['Instagram', 'Ramadan', 'Social Media', 'Food'],
      ['Restaurant', 'Branding', 'Social Media', 'Marketing']
    ],
    'palme': [
      ['Instagram', 'Fashion', 'Social Media', 'Branding'],
      ['Social Media Ads', 'Marketing', 'Conversion', 'Fashion'],
      ['E-commerce', 'UX/UI', 'Web Development', 'Shopping'],
      ['Checkout', 'E-commerce', 'UX/UI', 'Conversion'],
      ['Brand Identity', 'Logo Design', 'Fashion', 'Branding']
    ],
    'peefree': [
      ['Instagram', 'Social Media', 'Consumer Goods', 'Marketing'],
      ['Branding', 'Social Media', 'Content', 'Engagement'],
      ['Social Strategy', 'Branding', 'Marketing', 'Content'],
      ['Marketing', 'Brand Awareness', 'Consumer Goods', 'Social Media'],
      ['Brand Campaign', 'Awareness', 'Marketing', 'Social Media']
    ],
    'zenachii': [
      ['E-commerce', 'Product Showcase', 'Fashion', 'Web Design'],
      ['Brand Identity', 'Logo Design', 'Fashion', 'Branding'],
      ['Web Development', 'E-commerce', 'UX/UI', 'Responsive'],
      ['Product Photography', 'Fashion', 'Lifestyle', 'Photography'],
      ['Brand Content', 'Fashion', 'Lifestyle', 'Marketing']
    ]
  }
  
  return tags[client.slug]?.[index] || ['Design', 'Branding', 'Creative']
}

function getVideoTitle(client: ClientData, index: number): string {
  const titles: { [key: string]: string[] } = {
    'dreams-reality': [
      'Website Demo & User Experience'
    ],
    'palme': [
      'Website Walkthrough & Features'
    ],
    'zenachii': [
      'E-commerce Platform Demo'
    ]
  }
  
  return titles[client.slug]?.[index] || `Project Video ${index + 1}`
}

function getVideoDescription(client: ClientData, index: number): string {
  const descriptions: { [key: string]: string[] } = {
    'dreams-reality': [
      'A comprehensive walkthrough of the Dreams Reality website showcasing the user experience, navigation flow, and key features. The video demonstrates how the design effectively communicates the company\'s professionalism and construction expertise while providing an intuitive user journey for potential clients.'
    ],
    'palme': [
      'An in-depth demonstration of Palmé\'s e-commerce website highlighting the shopping experience, product showcase, and conversion-optimized features. The video showcases how the design supports the brand\'s fashion-forward positioning while ensuring a seamless shopping experience for customers in Egypt and UAE.'
    ],
    'zenachii': [
      'A complete tour of Zenachii\'s e-commerce platform demonstrating the user interface, product browsing experience, and checkout process. The video highlights the responsive design, intuitive navigation, and modern e-commerce features that drive conversions and enhance the shopping experience.'
    ]
  }
  
  return descriptions[client.slug]?.[index] || `Detailed walkthrough of the project showcasing key features, user experience, and design elements.`
}

function getVideoTags(client: ClientData, index: number): string[] {
  const tags: { [key: string]: string[][] } = {
    'dreams-reality': [
      ['Website Demo', 'UX/UI', 'User Experience', 'Web Design']
    ],
    'palme': [
      ['E-commerce', 'Website Demo', 'Shopping Experience', 'Fashion']
    ],
    'zenachii': [
      ['E-commerce', 'Platform Demo', 'Web Development', 'Fashion']
    ]
  }
  
  return tags[client.slug]?.[index] || ['Demo', 'Video', 'Showcase']
}

export default function ClientPageClient({ client }: ClientPageClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1])

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: [0.25, 0.46, 0.45, 0.94],
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Gallery items stagger animation
      gsap.fromTo(".gallery-item", 
        { opacity: 0, y: 60, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Parallax effect for images
      gsap.utils.toArray(".parallax-image").forEach((image: any) => {
        gsap.to(image, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        })
      })

      // Text reveal animations
      gsap.fromTo(".reveal-text", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          scrollTrigger: {
            trigger: ".reveal-text",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, containerRef)

    return () => ctx.revert()
  }, [mounted])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % client.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + client.images.length) % client.images.length)
  }


  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Progress Bar */}
      <div ref={progressRef} className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[60]">
        <motion.div 
          className="h-full bg-gradient-to-r from-red-500 to-red-600"
          style={{ 
            scaleX: scrollYProgress,
            transformOrigin: "left"
          }}
        />
      </div>

      {/* Enhanced Header */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Back button */}
          <Link 
            href="/#portfolio" 
              className="group flex items-center gap-1 sm:gap-2 text-gray-300 hover:text-white transition-all duration-300 flex-shrink-0"
            >
              <motion.div
                whileHover={{ x: -3 }}
                transition={{ duration: 0.2 }}
                className="sm:hidden"
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.div>
              <motion.div
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
                className="hidden sm:block"
          >
            <ArrowLeft className="w-5 h-5" />
              </motion.div>
              <span className="text-xs sm:text-sm font-medium">
                <span className="sm:hidden">Back</span>
                <span className="hidden sm:inline">Back to Portfolio</span>
              </span>
            </Link>
            
            {/* Client name - centered with proper spacing */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-center flex-1 mx-2 sm:mx-4 truncate"
            >
              {client.name}
            </motion.h1>

            {/* Gallery link */}
            <Link
              href="#gallery"
              className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors flex-shrink-0 flex items-center"
            >
              <span className="sm:hidden">Gallery</span>
              <span className="hidden sm:inline">View Gallery</span>
          </Link>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax */}
        {client.heroImage && (
          <div className="absolute inset-0">
            <motion.div
              style={{ scale: heroScale, opacity: heroOpacity }}
              className="w-full h-full"
            >
            <Image
              src={client.heroImage}
              alt={client.name}
              fill
                className="object-cover parallax-image"
              priority
            />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.1),transparent_70%)]" />
          </div>
        )}
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center gap-8"
          >
            {client.logo && (
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: [0.68, -0.55, 0.265, 1.55] }}
                className="w-32 h-32 md:w-40 md:h-40 relative"
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full blur-xl" />
              </motion.div>
            )}
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-display bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
            >
              {client.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
            >
              {client.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {getImageTags(client, 0).slice(0, 3).map((tag, index) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Project Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#C24533]">Project Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">{client.description}</p>
              <p className="text-gray-300 text-lg leading-relaxed">{client.whatWeDid}</p>
            </div>
            <div className="relative h-[400px] flex items-center justify-center">
              {/* Animated Visual Effect */}
              <div className="relative w-full h-full">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C24533]/20 via-transparent to-[#C24533]/10 rounded-2xl" />
                
                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#C24533] rounded-full"
                    style={{
                      left: `${20 + (i * 10)}%`,
                      top: `${20 + (i % 3) * 20}%`,
                    }}
                    animate={{
                      y: [-20, 20, -20],
                      x: [-10, 10, -10],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                ))}
                
                {/* Central logo/initial */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {client.logo ? (
                    <div className="w-32 h-32 relative">
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo`}
                        fill
                        className="object-contain opacity-60"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 flex items-center justify-center">
                      <span className="text-6xl font-bold text-[#C24533] opacity-60">
                        {client.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </motion.div>
                
                {/* Rotating rings */}
                <motion.div
                  className="absolute inset-4 border-2 border-[#C24533]/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-8 border border-[#C24533]/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-12 border border-[#C24533]/10 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Pulsing center dot */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#C24533] rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Project Details */}
      {client.images.length > 0 && (
        <section className="py-20 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Creative Process
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Behind the scenes of our design and development approach
              </p>
            </motion.div>
            
            <div className="space-y-32">
              {client.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {getImageTitle(client, index)}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                      {getImageDescription(client, index)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {getImageTags(client, index).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-[#C24533]/20 text-[#C24533] px-3 py-1 rounded-full text-sm font-medium border border-[#C24533]/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div
                      className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
                      onClick={() => setSelectedImage(image)}
                    >
                      <Image
                        src={image}
                        alt={`${client.name} - ${getImageTitle(client, index)}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos */}
      {client.videos.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-16 text-[#C24533]"
            >
              Project Videos
            </motion.h2>
            
            <div className="space-y-16">
              {client.videos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {getVideoTitle(client, index)}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {getVideoDescription(client, index)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {getVideoTags(client, index).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-[#C24533]/20 text-[#C24533] px-3 py-1 rounded-full text-sm font-medium border border-[#C24533]/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
                    <video
                      src={video}
                      controls
                      className="w-full h-full object-cover"
                      poster={client.images[0]}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Gallery Section */}
      {client.images.length > 0 && (
        <section id="gallery" ref={galleryRef} className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Project Gallery
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Explore the creative process and final deliverables
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {client.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="gallery-item group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={image}
                      alt={`${client.name} project image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-semibold text-sm mb-1">
                        {getImageTitle(client, index)}
                      </h3>
                      <p className="text-gray-300 text-xs">
                        {getImageDescription(client, index)}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Video Gallery */}
            {client.videos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-20"
              >
                <h3 className="text-2xl font-bold text-center mb-12 text-white">Video Content</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {client.videos.map((video, index) => (
                    <motion.div
                      key={index}
                      className="gallery-item group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="aspect-video relative">
                        <video
                          src={video}
                          controls
                          className="w-full h-full object-cover"
                          poster={client.images[0]}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Enhanced Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-w-6xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation for multiple images */}
            {client.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                    setSelectedImage(client.images[currentImageIndex])
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                    setSelectedImage(client.images[currentImageIndex])
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image counter */}
            {client.images.length > 1 && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                {currentImageIndex + 1} / {client.images.length}
              </div>
            )}

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Gallery image"
              fill
              className="object-contain"
                priority
            />
          </div>

            {/* Image info */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-white font-semibold text-lg mb-1">
                {getImageTitle(client, currentImageIndex)}
              </h3>
              <p className="text-gray-300 text-sm">
                {getImageDescription(client, currentImageIndex)}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Mobile-specific enhancements */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-30">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 rotate-90" />
          </motion.button>
        </div>
        )}

        {/* Small empty space to give visual cue for footer */}
        <div className="h-16 bg-black" />
        
        {/* Cinematic Footer Animation */}
        <WorkingCinematicFooter />
    </div>
  )
}
