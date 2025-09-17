"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Mail, Phone, Instagram } from "lucide-react"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const year = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Footer */}
        <div ref={ref} className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="font-display text-3xl font-bold text-white">
              Ad<span className="text-primary">Point</span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
              <a href="#portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</a>
              <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="https://www.instagram.com/adpoint.eg?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                <Instagram className="w-4 h-4 mr-2" /> Instagram
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" /> <span>advntgepoint@gmail.com</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" /> <span>01152223784</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">© {year} AdPoint</div>
          </motion.div>
        </div>

        {/* No bottom bar in the minimal footer */}
      </div>
    </footer>
  )
}
