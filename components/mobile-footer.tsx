"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Instagram, Mail, Phone, MapPin, ArrowUp } from "lucide-react"
import Image from "next/image"
import { useMobileAnimations, mobileAnimationVariants, mobileTransitions } from "@/hooks/use-mobile-animations"

export function MobileFooter() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { isMobile, animationDuration } = useMobileAnimations()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight
      
      setScrollProgress(scrollPercent)
      
      // Show footer when scrolled 80% down
      if (scrollPercent > 0.8) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const menuItems = [
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ]

  const contactInfo = [
    { icon: <Phone className="w-5 h-5" />, text: "+1 (555) 123-4567" },
    { icon: <Mail className="w-5 h-5" />, text: "hello@adpoint.com" },
    { icon: <MapPin className="w-5 h-5" />, text: "New York, NY" }
  ]

  return (
    <>
      {/* Mobile Footer Overlay */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-full overflow-y-auto">
              <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                  className="text-center mb-8"
                  initial="initial"
                  animate="animate"
                  variants={mobileAnimationVariants.fadeInUp}
                  transition={mobileTransitions.normal}
                >
                  <Image
                    src="/logo/Transparent Logo.png"
                    alt="AdPoint Logo"
                    width={200}
                    height={80}
                    className="h-16 w-auto mx-auto mb-4"
                  />
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Let's Create Something Amazing
                  </h2>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Transform your vision into extraordinary digital experiences
                  </p>
                </motion.div>

                {/* Navigation */}
                <motion.div
                  className="mb-8"
                  initial="initial"
                  animate="animate"
                  variants={mobileAnimationVariants.fadeInUp}
                  transition={{ ...mobileTransitions.normal, delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        className="text-left text-gray-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
                        onClick={() => scrollToSection(item.id)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        initial="initial"
                        animate="animate"
                        variants={mobileAnimationVariants.fadeInLeft}
                        transition={{ ...mobileTransitions.normal, delay: 0.3 + index * 0.1 }}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  className="mb-8"
                  initial="initial"
                  animate="animate"
                  variants={mobileAnimationVariants.fadeInUp}
                  transition={{ ...mobileTransitions.normal, delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
                  <div className="space-y-3">
                    {contactInfo.map((contact, index) => (
                      <motion.div
                        key={contact.text}
                        className="flex items-center space-x-3 text-gray-400"
                        initial="initial"
                        animate="animate"
                        variants={mobileAnimationVariants.fadeInLeft}
                        transition={{ ...mobileTransitions.normal, delay: 0.5 + index * 0.1 }}
                      >
                        <div className="text-red-400">
                          {contact.icon}
                        </div>
                        <span className="text-sm">{contact.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  className="mb-8"
                  initial="initial"
                  animate="animate"
                  variants={mobileAnimationVariants.fadeInUp}
                  transition={{ ...mobileTransitions.normal, delay: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <motion.a
                      href="https://www.instagram.com/adpoint.eg/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className="w-5 h-5" />
                      <span className="text-sm">@adpoint.eg</span>
                    </motion.a>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  className="text-center mb-8"
                  initial="initial"
                  animate="animate"
                  variants={mobileAnimationVariants.fadeInUp}
                  transition={{ ...mobileTransitions.normal, delay: 0.7 }}
                >
                  <motion.button
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
                    onClick={() => scrollToSection('contact')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started Today
                  </motion.button>
                </motion.div>

                {/* Copyright */}
                <motion.div
                  className="text-center text-gray-500 text-sm"
                  initial="initial"
                  animate="animate"
                  variants={mobileAnimationVariants.fadeInUp}
                  transition={{ ...mobileTransitions.normal, delay: 0.8 }}
                >
                  <p>© 2025 AdPoint. All rights reserved.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrollProgress > 0.3 && (
          <motion.button
            className="fixed bottom-6 right-6 z-40 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
