"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SchedulingForm } from "@/components/scheduling-form"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false)


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
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-background noise-overlay">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 text-balance">
              Ready to
              <span className="gradient-red"> Transform?</span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex justify-center items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-2xl text-primary font-semibold tracking-wide">
                  LET'S BUILD SOMETHING EXTRAORDINARY
                </span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
              
              <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-700 rounded-full mx-auto" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => {
                  window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                  setIsSchedulingOpen(true)
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl px-12 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 animate-glow flex items-center gap-3"
              >
                <Calendar className="w-6 h-6" />
                Schedule a Meeting
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact Information Cards */}
          <div ref={ref} className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="text-center p-8 bg-card/50 border border-border/50 rounded-xl hover:border-primary/50 transition-all duration-300 hover-lift backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <info.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-white text-xl mb-2">{info.title}</h3>
                <p className="text-primary font-medium text-lg mb-2">{info.details}</p>
                <p className="text-sm text-muted-foreground">{info.description}</p>
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
            onClick={() => setIsSchedulingOpen(false)}
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
                  onClick={() => setIsSchedulingOpen(false)}
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

