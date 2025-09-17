"use client"

import React from "react"
import { motion, useTransform } from "framer-motion"
import { Palette, Globe, Megaphone, BarChart3, Camera, Code } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FadeUp } from "./fade-up"
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll"

export function ServicesCarousel() {
  const services = [
    {
      icon: Palette,
      title: "Brand Identity",
      description:
        "Complete brand development from logo design to comprehensive brand guidelines that make your business unforgettable.",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
    },
    {
      icon: Globe,
      title: "Web Development",
      description:
        "Custom websites and web applications built with cutting-edge technology for optimal performance and user experience.",
      features: ["Custom Development", "E-commerce", "CMS Integration", "Mobile Responsive"],
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description:
        "Data-driven marketing campaigns across all digital channels to maximize your reach and conversion rates.",
      features: ["SEO & SEM", "Social Media", "Content Marketing", "Email Campaigns"],
    },
    {
      icon: BarChart3,
      title: "SEO & Analytics",
      description:
        "Boost your online visibility and make informed decisions with our expert SEO strategies and in-depth analytics.",
      features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Performance Tracking"],
    },
    {
      icon: Camera,
      title: "Content Creation",
      description:
        "Engaging and high-quality content that tells your story, attracts your audience, and converts visitors into customers.",
      features: ["Copywriting", "Photography", "Videography", "Animation"],
    },
    {
      icon: Code,
      title: "Technical Solutions",
      description:
        "Custom software solutions, integrations, and technical consulting to streamline your business operations.",
      features: ["Custom Software", "API Integration", "Automation", "Technical Consulting"],
    },
  ]

  const { containerRef, currentSlide, translateX, isActive, isScrolling } = useHorizontalScroll({
    totalSlides: services.length,
    slideWidth: 344, // 320 card + ~24 gap
  })

  // Transform for horizontal movement
  const trackX = useTransform(translateX, (value) => -value - 172)

  return (
    <section className="relative bg-background overflow-hidden min-h-[100svh] flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(185,28,28,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <FadeUp className="text-center mb-20">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 text-balance">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We offer a comprehensive suite of digital marketing and creative services designed to elevate your brand and
            drive measurable results.
          </p>
          {isActive && (
            <div className="mt-6 flex items-center justify-center space-x-2 text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium">Screen frozen - Scroll horizontally to explore services</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>
          )}
        </FadeUp>

        {/* Progress Indicator */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border/30 -translate-y-1/2" />
          <motion.div
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary -translate-y-1/2"
            style={{
              width: `${((currentSlide + 1) / services.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Horizontal Scroll Container */}
        <div ref={containerRef} className="relative h-[62vh] overflow-hidden py-8">
          <motion.div
            className="flex gap-6 absolute top-1/2 left-1/2 w-max -translate-y-1/2"
            style={{ 
              x: trackX,
              willChange: "transform"
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
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
                  willChange: "transform, opacity",
                  transformStyle: "preserve-3d"
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
                  <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 hover:border-red-600/50 group h-[480px] transition-all duration-500 hover:shadow-2xl hover:shadow-red-600/20 backdrop-blur-sm relative overflow-hidden">
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
                      className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ 
                        x: "100%",
                        transition: {
                          duration: 1.5,
                          ease: "easeInOut"
                        }
                      }}
                    />

                    <CardContent className="p-5 space-y-4 h-full flex flex-col relative z-10">
                    {/* Icon */}
                      <motion.div 
                        className="flex justify-center"
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                          }
                        }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-xl flex items-center justify-center group-hover:from-red-600/30 group-hover:to-red-700/30 transition-all duration-500 backdrop-blur-sm border border-red-600/20">
                          <motion.div
                            whileHover={{
                              scale: 1.2,
                              transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 10
                              }
                            }}
                          >
                            <service.icon className="w-8 h-8 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
                          </motion.div>
                      </div>
                      </motion.div>

                    {/* Content */}
                      <motion.div 
                        className="text-center space-y-3 flex-grow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <motion.h3 
                          className="font-display text-2xl font-bold text-white group-hover:text-red-300 transition-colors duration-300"
                          whileHover={{
                            scale: 1.05,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 15
                            }
                          }}
                        >
                          {service.title}
                        </motion.h3>
                        <motion.p 
                          className="text-muted-foreground leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {service.description}
                        </motion.p>
                      </motion.div>

                    {/* Features */}
                      <motion.div 
                        className="space-y-2.5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                      {service.features.map((feature, featureIndex) => (
                          <motion.div 
                            key={featureIndex} 
                            className="flex items-center space-x-3 group-hover:text-gray-200 transition-colors duration-300"
                            whileHover={{
                              x: 5,
                              transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 15
                              }
                            }}
                          >
                            <motion.div 
                              className="w-2 h-2 bg-red-500 rounded-full group-hover:bg-red-400 transition-colors duration-300"
                              whileHover={{
                                scale: 1.5,
                                transition: {
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 10
                                }
                              }}
                            />
                            <span className="text-sm text-gray-300 font-medium group-hover:text-gray-200 transition-colors duration-300">{feature}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                  </CardContent>
                </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <FadeUp delay={0.4} className="text-center mt-8">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
          >
            Explore All Services
          </Button>
        </FadeUp>
      </div>
    </section>
  )
}