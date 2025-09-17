"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, ChevronDown, Check, X } from "lucide-react"
import { CalendarPicker } from "@/components/calendar-picker"
import { useForm } from "@/contexts/FormContext"
import emailjs from "@emailjs/browser"

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  projectDescription: string
  meetingTime: string
}

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_byrvd5r"
const EMAILJS_TEMPLATE_ID = "template_d1cm4x8"
const EMAILJS_PUBLIC_KEY = "-78FYsgtxIiMaWn8B"

const services = [
  "Branding",
  "Web Development", 
  "Social Media Marketing",
  "SEO",
  "Custom Project"
]

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
]

export function SchedulingForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    projectDescription: "",
    meetingTime: ""
  })

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const { setIsCalendarOpen } = useForm()

  const dropdownRef = useRef<HTMLDivElement>(null)
  const datePickerRef = useRef<HTMLDivElement>(null)
  const timePickerRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false)
        setIsCalendarOpen(false)
      }
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
        setIsTimePickerOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setIsCalendarOpen])

  // Auto-scroll when calendar opens
  useEffect(() => {
    if (isDatePickerOpen) {
      setIsCalendarOpen(true)
      // Scroll to the calendar picker
      setTimeout(() => {
        datePickerRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" 
        })
      }, 100)
    } else {
      setIsCalendarOpen(false)
    }
  }, [isDatePickerOpen, setIsCalendarOpen])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.service) newErrors.service = "Please select a service"
    if (formData.service === "Custom Project" && !formData.projectDescription.trim()) {
      newErrors.projectDescription = "Please describe your custom project"
    }
    if (!formData.meetingTime) newErrors.meetingTime = "Please select a date and time"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setIsError(false)
    setSubmitMessage("")

    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY)

      // Prepare template parameters
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        projectDescription: formData.projectDescription || "N/A",
        meetingTime: formData.meetingTime,
      }

      // Send email
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      )

      if (response.status === 200) {
        setIsSubmitted(true)
        setSubmitMessage("✅ Thank you! Your meeting request has been sent.")
        setIsError(false)
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          projectDescription: "",
          meetingTime: ""
        })
      } else {
        throw new Error("EmailJS returned non-200 status")
      }
    } catch (error) {
      console.error("EmailJS Error:", error)
      setIsError(true)
      setSubmitMessage("❌ Something went wrong, please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl border border-gray-800 shadow-2xl"
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto"
          >
            <Check className="w-8 h-8 text-white" />
          </motion.div>
          
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Meeting Scheduled!</h2>
            <p className="text-gray-300">
              Thank you, {formData.name}! We'll be in touch soon to confirm your {formData.service.toLowerCase()} consultation.
            </p>
          </div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                name: "",
                email: "",
                phone: "",
                service: "",
                projectDescription: "",
                meetingTime: ""
              })
            }}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/25"
          >
            Schedule Another Meeting
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl border border-gray-800 shadow-2xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Schedule Your Consultation</h2>
        <p className="text-gray-300">Let's discuss your project and bring your vision to life</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200 ${
            errors.name ? "border-red-500" : "border-gray-700"
          }`}
          placeholder="Enter your full name"
        />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.name}
            </motion.p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200 ${
            errors.email ? "border-red-500" : "border-gray-700"
          }`}
          placeholder="Enter your email address"
        />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number *
          </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200 ${
            errors.phone ? "border-red-500" : "border-gray-700"
          }`}
          placeholder="Enter your phone number"
        />
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.phone}
            </motion.p>
          )}
        </div>

        {/* Services Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Service *
          </label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200 flex items-center justify-between ${
                errors.service ? "border-red-500" : "border-gray-700"
              }`}
            >
              <span className={formData.service ? "text-white" : "text-gray-400"}>
                {formData.service || "Select a service"}
              </span>
              <div className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden"
                >
                  {services.map((service) => (
                    <motion.button
                      key={service}
                      whileHover={{ backgroundColor: "rgba(185, 28, 28, 0.1)" }}
                      type="button"
                      onClick={() => {
                        handleInputChange("service", service)
                        setIsDropdownOpen(false)
                      }}
                      className="w-full px-4 py-3 text-left text-white hover:bg-red-600/10 transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>{service}</span>
                      {formData.service === service && (
                        <Check className="w-4 h-4 text-red-600" />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {errors.service && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.service}
            </motion.p>
          )}
        </div>

        {/* Custom Project Description */}
        <AnimatePresence>
          {formData.service === "Custom Project" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Description *
              </label>
                <textarea
                value={formData.projectDescription}
                onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200 resize-none ${
                  errors.projectDescription ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="Describe your custom project in detail..."
              />
              {errors.projectDescription && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.projectDescription}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date *
            </label>
            <div className="relative" ref={datePickerRef}>
              <button
                type="button"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200 flex items-center justify-between ${
                  errors.meetingTime ? "border-red-500" : "border-gray-700"
                }`}
              >
                <span className={formData.meetingTime ? "text-white" : "text-gray-400"}>
                  {formData.meetingTime ? formatDate(formData.meetingTime.split(' ')[0]) : "Select a date"}
                </span>
                <Calendar className="w-5 h-5 text-gray-400" />
              </button>

              <CalendarPicker
                selectedDate={formData.meetingTime ? formData.meetingTime.split(' ')[0] : ""}
                onDateSelect={(date) => {
                  const time = formData.meetingTime ? formData.meetingTime.split(' ')[1] : ""
                  handleInputChange("meetingTime", time ? `${date} ${time}` : date)
                  setIsDatePickerOpen(false)
                }}
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                minDate={new Date()}
                maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)} // 90 days from now
              />
            </div>
          </div>

          {/* Time Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Time *
            </label>
            <div className="relative" ref={timePickerRef}>
              <button
                type="button"
                onClick={() => setIsTimePickerOpen(!isTimePickerOpen)}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200 flex items-center justify-between ${
                  errors.meetingTime ? "border-red-500" : "border-gray-700"
                }`}
              >
                <span className={formData.meetingTime ? "text-white" : "text-gray-400"}>
                  {formData.meetingTime ? formData.meetingTime.split(' ')[1] || "Select a time" : "Select a time"}
                </span>
                <Clock className="w-5 h-5 text-gray-400" />
              </button>

              <AnimatePresence>
                {isTimePickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 p-4 max-h-64 overflow-y-auto"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ backgroundColor: "rgba(185, 28, 28, 0.1)" }}
                          type="button"
                          onClick={() => {
                            const date = formData.meetingTime ? formData.meetingTime.split(' ')[0] : ""
                            handleInputChange("meetingTime", date ? `${date} ${time}` : time)
                            setIsTimePickerOpen(false)
                          }}
                          className={`px-3 py-2 text-sm rounded transition-colors duration-200 ${
                            formData.meetingTime?.includes(time)
                              ? "bg-red-600 text-white"
                              : "text-gray-300 hover:bg-red-600/10"
                          }`}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Meeting Time Error */}
        {errors.meetingTime && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-1"
          >
            {errors.meetingTime}
          </motion.p>
        )}

        {/* Success/Error Message */}
        {submitMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg text-center font-medium ${
              isError 
                ? "bg-red-900/20 border border-red-500/30 text-red-400" 
                : "bg-green-900/20 border border-green-500/30 text-green-400"
            }`}
          >
            {submitMessage}
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Scheduling...</span>
            </div>
          ) : (
            "Schedule Consultation"
          )}
        </button>
      </form>
    </motion.div>
  )
}
