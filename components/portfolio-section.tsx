"use client"

import React from "react"
import { motion, useTransform } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll"
import { FadeUp } from "./fade-up"

export function PortfolioSection() {
  const projects = [
    {
      title: "TechFlow Solutions",
      category: "Brand Identity & Web Development",
      description:
        "Complete rebrand and website redesign for a leading tech consultancy, resulting in 200% increase in qualified leads.",
      image: "/modern-tech-website-design-with-dark-theme-and-blu.jpg",
      tags: ["Branding", "Web Design", "Development"],
      results: "+200% Leads",
    },
    {
      title: "EcoVibe Marketplace",
      category: "E-commerce & Digital Marketing",
      description:
        "Full-scale e-commerce platform with integrated marketing automation, achieving 150% growth in first quarter.",
      image: "/eco-friendly-marketplace-website-with-green-theme-.jpg",
      tags: ["E-commerce", "Marketing", "SEO"],
      results: "+150% Growth",
    },
    {
      title: "Artisan Coffee Co.",
      category: "Brand Strategy & Content Creation",
      description:
        "Brand positioning and content strategy that transformed a local coffee shop into a regional franchise.",
      image: "/coffee-shop-branding-with-warm-colors-and-artisan-.jpg",
      tags: ["Strategy", "Content", "Photography"],
      results: "5x Locations",
    },
    {
      title: "FinanceForward",
      category: "Web App & UX Design",
      description:
        "Intuitive financial dashboard design that improved user engagement by 300% and reduced support tickets.",
      image: "/financial-dashboard-interface-with-charts-and-mode.jpg",
      tags: ["UX/UI", "Development", "Analytics"],
      results: "+300% Engagement",
    },
    {
      title: "Wellness Retreat",
      category: "Social Media & Influencer Marketing",
      description:
        "Engaging social media campaigns and influencer collaborations that boosted brand awareness by 400%.",
      image: "/wellness-retreat-website-design-with-natural-theme.jpg",
      tags: ["Social Media", "Influencer", "Content"],
      results: "+400% Reach",
    },
    {
      title: "Urban Eats",
      category: "Mobile App Development",
      description:
        "Developed a seamless food delivery mobile app, enhancing user experience and increasing order volume by 250%.",
      image: "/food-delivery-app-interface-with-modern-design-and.jpg",
      tags: ["Mobile App", "UX/UI", "Development"],
      results: "+250% Orders",
    },
    {
      title: "Global Connect",
      category: "SEO & Content Strategy",
      description:
        "Comprehensive SEO audit and content strategy leading to top rankings for competitive keywords and increased organic traffic.",
      image: "/global-connect-website-design-with-world-map-and-d.jpg",
      tags: ["Portfolio", "SEO", "Photography"],
      results: "#1 Rankings",
    },
  ]

  const { containerRef, currentSlide, translateX, isActive, isScrolling } = useHorizontalScroll({
    totalSlides: projects.length,
    slideWidth: 344, // match services for consistent spring
  })

  // Transform for horizontal movement
  const trackX = useTransform(translateX, (value) => -value - 172)

  return (
    <section className="relative bg-black overflow-hidden min-h-[100svh] flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(185,28,28,0.15),transparent_50%)]" />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-red-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-red-700/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-2/3 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <FadeUp className="text-center mb-20">
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 text-balance">
            Our
            <span className="gradient-red"> Work</span>
          </h2>

          <div className="space-y-6">
            <div className="flex justify-center items-center space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-2xl text-primary font-semibold tracking-wide">
                TRANSFORMING BRANDS INTO LEGENDS
              </span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>

            <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-700 rounded-full mx-auto" />
            
            {isActive && (
              <div className="mt-6 flex items-center justify-center space-x-2 text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium">Screen frozen - Scroll horizontally to explore portfolio</span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
            )}
          </div>
        </FadeUp>

        {/* Progress Indicator */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border/30 -translate-y-1/2" />
          <motion.div
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary -translate-y-1/2"
            style={{
              width: `${((currentSlide + 1) / projects.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Horizontal Scroll Container */}
        <div ref={containerRef} className="relative h-[62vh] overflow-hidden py-8">
          <motion.div
            className="flex gap-6 absolute top-1/2 left-1/2 -translate-y-1/2"
            style={{ 
              x: trackX,
              willChange: "transform"
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="flex-shrink-0 w-[320px] group"
                animate={{ 
                  scale: index === currentSlide ? 1.02 : 0.95, 
                  opacity: index === currentSlide ? 1 : 0.4, 
                  y: index === currentSlide ? -4 : 0
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 25, 
                  mass: 1
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity"
                }}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }
                }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-xl"
                  whileHover={{
                    scale: 1.01,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }}
                >
                  <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 hover:border-red-600/50 transition-all duration-500 group overflow-hidden h-[480px] backdrop-blur-sm hover:shadow-2xl hover:shadow-red-600/20 relative">
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ 
                        scale: 1.1,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        }
                      }}
                    />
                    
                    {/* Sweep Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                      initial={{ x: "-100%" }}
                      whileHover={{ 
                        x: "100%",
                        transition: {
                          duration: 2,
                          ease: "easeInOut"
                        }
                      }}
                    />

                    <div className="relative overflow-hidden h-36">
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          transition: {
                            type: "spring",
                            stiffness: 200,
                            damping: 15
                          }
                        }}
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={780}
                          height={320}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 520px, 780px"
                          className="w-full h-36 object-cover transition-all duration-700 group-hover:brightness-110 group-hover:contrast-110"
                          loading={index < 2 ? "eager" : "lazy"}
                          priority={index < 2}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                      </motion.div>
                      
                      {/* Results Badge */}
                      <motion.div 
                        className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-20"
                        whileHover={{
                          scale: 1.1,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 10
                          }
                        }}
                      >
                        {project.results}
                      </motion.div>
                      
                      {/* Project Category Overlay */}
                      <motion.div 
                        className="absolute bottom-4 left-4 right-4 z-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                          }
                        }}
                      >
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-gray-600/50">
                          <p className="text-white text-sm font-medium">{project.category}</p>
                        </div>
                      </motion.div>
                    </div>

                    <CardContent className="p-6 space-y-4 relative z-10">
                      <motion.div 
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <motion.h3 
                          className="font-display text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300"
                          whileHover={{
                            scale: 1.05,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 15
                            }
                          }}
                        >
                          {project.title}
                        </motion.h3>
                        <motion.div 
                          className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-700 rounded-full group-hover:w-16 transition-all duration-500"
                          whileHover={{
                            scaleX: 1.3,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 15
                            }
                          }}
                        />
                      </motion.div>

                      <motion.p 
                        className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300 line-clamp-3"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {project.description}
                      </motion.p>

                      <motion.div 
                        className="flex flex-wrap gap-2 pt-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        {project.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700 group-hover:bg-red-600/20 group-hover:text-red-400 group-hover:border-red-600/50 transition-all duration-300"
                            whileHover={{
                              scale: 1.1,
                              y: -2,
                              transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 15
                              }
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}