"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex items-center justify-between h-12 sm:h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="cursor-pointer pb-2 sm:pb-4"
            onClick={() => scrollToSection("hero")}
          >
            <Image
              src="/logo/Transparent Logo.png"
              alt="AdPoint Logo"
              width={600}
              height={240}
              className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto"
              priority
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => {
                window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                scrollToSection("about")
              }}
              className="text-white hover:text-red-700 transition-all duration-500 font-medium hover:scale-105"
            >
              About Us
            </button>

            <button
              onClick={() => {
                window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                scrollToSection("services")
              }}
              className="text-white hover:text-red-700 transition-all duration-500 font-medium hover:scale-105"
            >
              Services
            </button>

            <button
              onClick={() => {
                window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                scrollToSection("portfolio")
              }}
              className="text-white hover:text-red-700 transition-all duration-500 font-medium hover:scale-105"
            >
              Portfolio
            </button>

            <Button
              onClick={() => {
                window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                scrollToSection("contact")
              }}
              className="bg-red-700 text-white hover:bg-red-800 rounded-lg px-6 py-2 font-semibold transition-all duration-700 hover:scale-110 hover:shadow-xl hover:shadow-red-700/40"
            >
              Work With Us
            </Button>
          </div>

          <button
            className="md:hidden text-white hover:text-red-700 transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
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
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-2">
                <button
                  onClick={() => {
                    window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                    scrollToSection("about")
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left text-white hover:text-red-700 transition-colors font-medium py-4 min-h-[44px] flex items-center"
                >
                  About Us
                </button>

                <button
                  onClick={() => {
                    window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                    scrollToSection("services")
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left text-white hover:text-red-700 transition-colors font-medium py-4 min-h-[44px] flex items-center"
                >
                  Services
                </button>

                <button
                  onClick={() => {
                    window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                    scrollToSection("portfolio")
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left text-white hover:text-red-700 transition-colors font-medium py-4 min-h-[44px] flex items-center"
                >
                  Portfolio
                </button>

                <Button
                  onClick={() => {
                    window.dispatchEvent(new Event("adpoint:bypass-hijack"))
                    scrollToSection("contact")
                  }}
                  className="w-full bg-red-700 text-white hover:bg-red-800 mt-4 min-h-[44px] text-base"
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
