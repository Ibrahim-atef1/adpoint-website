"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Mail, Phone, MapPin, X, Calendar, Sparkles, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SchedulingForm } from "@/components/scheduling-form"
import { useForm } from "@/contexts/FormContext"
import { useMobileAnimations, mobileAnimationVariants, mobileTransitions } from "@/hooks/use-mobile-animations"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false)
  const { isMobile, staggerDelay } = useMobileAnimations()
  const { setIsFormOpen } = useForm()


  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@adpoint.agency",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 6pm",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Creative Street, Design District",
      description: "New York, NY 10001",
    },
  ]

  return (
    <>
      <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background noise-overlay relative overflow-hidden">
        {/* Mobile floating elements */}
        {isMobile && (
          <>
            <motion.div
              className="absolute top-20 left-8 text-primary/20 md:hidden"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <motion.div
              className="absolute top-40 right-12 text-primary/20 md:hidden"
              animate={{
                y: [8, -8, 8],
                rotate: [0, -3, 0],
                opacity: [0.15, 0.4, 0.15],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Zap className="w-4 h-4" />
            </motion.div>
            <motion.div
              className="absolute bottom-32 left-12 text-primary/20 md:hidden"
              animate={{
                y: [-6, 6, -6],
                rotate: [0, 4, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <Star className="w-3 h-3" />
            </motion.div>
            <motion.div
              className="absolute bottom-20 right-8 text-primary/20 md:hidden"
              animate={{
                y: [5, -5, 5],
                rotate: [0, -2, 0],
                opacity: [0.1, 0.35, 0.1],
              }}
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              <Sparkles className="w-2 h-2" />
            </motion.div>
          </>
        )}

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 text-balance">
              Ready to
              <span className="gradient-red"> Transform?</span>
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex justify-center items-center space-x-2 sm:space-x-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-lg sm:text-xl md:text-2xl text-primary font-semibold tracking-wide">
                  LET'S BUILD SOMETHING EXTRAORDINARY
                </span>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse" />
              </div>
            </div>

            {/* Added gap between text and button */}
            <div className="mt-8 sm:mt-12" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center items-center"
            >
              <motion.div
                className="relative"
                animate={isMobile ? {
                  scale: [1, 1.02, 1],
                } : {}}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Button
                  size="lg"
                  onClick={() => {
                    window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                    setIsSchedulingOpen(true)
                    setIsFormOpen(true)
                  }}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 animate-glow flex items-center gap-2 sm:gap-3 min-h-[44px] w-full sm:w-auto"
                >
                  <motion.div
                    animate={isMobile ? {
                      rotate: [0, 5, 0],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  <span>Schedule a Meeting</span>
                </Button>
                
                {/* Mobile button glow effect */}
                {isMobile && (
                  <motion.div
                    className="absolute inset-0 bg-primary/20 rounded-xl blur-xl -z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Information Cards */}
          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="text-center p-6 sm:p-8 bg-card/50 border border-border/50 rounded-xl hover:border-primary/50 transition-all duration-300 hover-lift backdrop-blur-sm relative overflow-hidden"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={mobileAnimationVariants.fadeInUp}
                transition={{ 
                  ...mobileTransitions.normal, 
                  delay: index * staggerDelay 
                }}
              >
                {/* Mobile floating elements for each card */}
                {isMobile && (
                  <>
                    <motion.div
                      className="absolute top-2 right-2 w-1 h-1 bg-primary/30 rounded-full"
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2 + index * 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    />
                    <motion.div
                      className="absolute bottom-2 left-2 w-1 h-1 bg-primary/20 rounded-full"
                      animate={{
                        opacity: [0.2, 0.6, 0.2],
                        scale: [0.6, 1.4, 0.6],
                      }}
                      transition={{
                        duration: 2.5 + index * 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.4,
                      }}
                    />
                  </>
                )}

                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 relative"
                  animate={isMobile ? {
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, 0],
                  } : {}}
                  transition={{
                    duration: 3 + index * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                >
                  <info.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </motion.div>
                
                <motion.h3 
                  className="font-semibold text-white text-lg sm:text-xl mb-2"
                  animate={isMobile ? {
                    scale: [1, 1.02, 1],
                  } : {}}
                  transition={{
                    duration: 2.5 + index * 0.1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                >
                  {info.title}
                </motion.h3>
                
                <motion.p 
                  className="text-primary font-medium text-base sm:text-lg mb-2"
                  animate={isMobile ? {
                    scale: [1, 1.01, 1],
                    opacity: [0.9, 1, 0.9],
                  } : {}}
                  transition={{
                    duration: 2.8 + index * 0.15,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.25,
                  }}
                >
                  {info.details}
                </motion.p>
                
                <p className="text-xs sm:text-sm text-muted-foreground">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Scheduling Form Modal */}
      <AnimatePresence>
        {isSchedulingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setIsSchedulingOpen(false)
              setIsFormOpen(false)
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsSchedulingOpen(false)
                    setIsFormOpen(false)
                  }}
                  className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
                <SchedulingForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

