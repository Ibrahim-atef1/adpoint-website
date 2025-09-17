"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50)
        ticking = false
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll as EventListener)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-display text-2xl font-bold text-white cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            AdPoint
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => {
                window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                scrollToSection("about")
              }}
              className="text-white hover:text-red-700 transition-colors duration-200 font-medium"
            >
              About Us
            </button>

            <button
              onClick={() => {
                window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                scrollToSection("services")
              }}
              className="text-white hover:text-red-700 transition-colors duration-200 font-medium"
            >
              Services
            </button>

            <button
              onClick={() => {
                window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                scrollToSection("portfolio")
              }}
              className="text-white hover:text-red-700 transition-colors duration-200 font-medium"
            >
              Portfolio
            </button>

            <Button
              onClick={() => {
                window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                scrollToSection("contact")
              }}
              className="bg-red-700 text-white hover:bg-red-800 rounded-lg px-6 py-2 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-700/25"
            >
              Work With Us
            </Button>
          </div>

          <button
            className="md:hidden text-white hover:text-red-700 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                <button
                  onClick={() => {
                    window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                    scrollToSection("about")
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left text-white hover:text-red-700 transition-colors font-medium py-2"
                >
                  About Us
                </button>

                <button
                  onClick={() => {
                    window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                    scrollToSection("services")
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left text-white hover:text-red-700 transition-colors font-medium py-2"
                >
                  Services
                </button>

                <button
                  onClick={() => {
                    window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                    scrollToSection("portfolio")
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left text-white hover:text-red-700 transition-colors font-medium py-2"
                >
                  Portfolio
                </button>

                <Button
                  onClick={() => {
                    window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                    scrollToSection("contact")
                  }}
                  className="w-full bg-red-700 text-white hover:bg-red-800 mt-4"
                >
                  Work With Us
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
