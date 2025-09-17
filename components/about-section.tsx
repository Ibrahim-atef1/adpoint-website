"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Target, Lightbulb, Users, TrendingUp } from "lucide-react"
// FadeUp component replaced with motion.div

export function AboutSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const stats = [
    { icon: Target, label: "Projects Completed", value: "500+" },
    { icon: Users, label: "Happy Clients", value: "200+" },
    { icon: TrendingUp, label: "Growth Average", value: "150%" },
    { icon: Lightbulb, label: "Years Experience", value: "8+" },
  ]

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <motion.div className="absolute inset-0 opacity-5" style={{ y }}>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-8">
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white text-balance">
                  Digital
                  <span className="gradient-red"> Storytellers</span>
                </h2>

                <div className="space-y-4">
                  <p className="text-2xl text-primary font-semibold tracking-wide">
                    CRAFTING VISIONS INTO REALITY
                  </p>
                  <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-700 rounded-full" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  From bold branding initiatives to cutting-edge digital campaigns, we combine creativity with
                  data-driven insights to deliver solutions that not only look stunning but perform exceptionally.
                </p>

                <div className="flex flex-wrap gap-4">
                  {["Strategy", "Creativity", "Results"].map((tag, index) => (
                    <div
                      key={tag}
                      className="bg-card border border-border rounded-xl px-6 py-3 hover:border-primary/50 transition-all duration-300"
                    >
                      <span className="text-primary font-semibold">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/50 transition-all duration-500 group"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-4xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
