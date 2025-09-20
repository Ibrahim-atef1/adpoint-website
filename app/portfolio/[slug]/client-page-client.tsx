"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"
import { type ClientData } from "@/lib/client-data"

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

  return (
    <div className="min-h-screen bg-[#131129] text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#131129]/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/#portfolio" 
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Portfolio
          </Link>
          <h1 className="text-xl font-bold">{client.name}</h1>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {client.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={client.heroImage}
              alt={client.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            {client.logo && (
              <div className="w-24 h-24 relative">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-bold font-display">
              {client.name}
            </h1>
          </motion.div>
        </div>
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

      {/* Project Details */}
      {client.images.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-16 text-[#C24533]"
            >
              Project Details
            </motion.h2>
            
            <div className="space-y-20">
              {client.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
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

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={selectedImage}
              alt="Gallery image"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}
