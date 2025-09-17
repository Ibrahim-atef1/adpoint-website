"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
// FadeUp component replaced with motion.div

const clients = [
  { name: "TechFlow", logo: "TF", category: "Technology" },
  { name: "EcoVibe", logo: "EV", category: "E-commerce" },
  { name: "Artisan Coffee", logo: "AC", category: "Food & Beverage" },
  { name: "FinanceForward", logo: "FF", category: "Fintech" },
  { name: "Wellness Retreat", logo: "WR", category: "Health & Wellness" },
  { name: "Creative Studio", logo: "CS", category: "Design" },
  { name: "StartupHub", logo: "SH", category: "Innovation" },
  { name: "Green Energy", logo: "GE", category: "Sustainability" },
  { name: "Digital Agency", logo: "DA", category: "Marketing" },
  { name: "Fashion Forward", logo: "FF", category: "Fashion" },
  { name: "Real Estate Pro", logo: "RE", category: "Real Estate" },
  { name: "HealthTech", logo: "HT", category: "Healthcare" },
]

export function ClientShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 text-balance">
              Trusted by
              <span className="gradient-red"> Leaders</span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex justify-center items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-2xl text-primary font-semibold tracking-wide">
                  BRANDS THAT SHAPE THE FUTURE
                </span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
              
              <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-700 rounded-full mx-auto" />
            </div>
          </div>
        </motion.div>

        {/* Client Logos Carousel */}
        <div ref={ref} className="relative overflow-hidden">
          <motion.div
            className="flex space-x-12 items-center"
            animate={isInView ? { x: [0, -1920] } : {}}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {/* First set of clients */}
            {clients.map((client, index) => (
              <motion.div
                key={`first-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="bg-gray-900/50 hover:bg-gray-800/80 border border-gray-800 hover:border-red-600/50 rounded-2xl p-8 transition-all duration-300 min-w-[200px] text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">{client.logo}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-red-400 transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    {client.category}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {clients.map((client, index) => (
              <motion.div
                key={`second-${index}`}
                whileHover={{ scale: 1.1, y: -10 }}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="bg-gray-900/50 hover:bg-gray-800/80 border border-gray-800 hover:border-red-600/50 rounded-2xl p-8 transition-all duration-300 min-w-[200px] text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">{client.logo}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-red-400 transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    {client.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {[
              { number: "500+", label: "Projects Delivered" },
              { number: "200+", label: "Happy Clients" },
              { number: "150%", label: "Average Growth" },
              { number: "8+", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-gray-900/30 hover:bg-gray-800/50 border border-gray-800 hover:border-red-600/30 rounded-xl p-6 transition-all duration-300 group-hover:scale-105">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
