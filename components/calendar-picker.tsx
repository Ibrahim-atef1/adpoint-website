"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

interface CalendarPickerProps {
  selectedDate: string
  onDateSelect: (date: string) => void
  isOpen: boolean
  onClose: () => void
  minDate?: Date
  maxDate?: Date
}

export function CalendarPicker({ 
  selectedDate, 
  onDateSelect, 
  isOpen, 
  onClose, 
  minDate = new Date(),
  maxDate 
}: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [view, setView] = useState<"month" | "year">("month")
  const calendarRef = useRef<HTMLDivElement>(null)

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (date < today) return true
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false
    const selected = new Date(selectedDate)
    return date.toDateString() === selected.toDateString()
  }

  const formatDateValue = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const navigateYear = (direction: "prev" | "next") => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      if (direction === "prev") {
        newMonth.setFullYear(prev.getFullYear() - 1)
      } else {
        newMonth.setFullYear(prev.getFullYear() + 1)
      }
      return newMonth
    })
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = 0; i < 5; i++) {
      years.push(currentYear + i)
    }
    return years
  }

  if (!isOpen) return null

  return (
    <motion.div
      ref={calendarRef}
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 p-4 min-w-[320px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-red-500" />
          <span className="text-white font-semibold">Select Date</span>
        </div>
        
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => view === "month" ? navigateMonth("prev") : navigateYear("prev")}
            className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView(view === "month" ? "year" : "month")}
            className="px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors text-white font-medium min-w-[120px]"
          >
            {view === "month" 
              ? `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`
              : currentMonth.getFullYear()
            }
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => view === "month" ? navigateMonth("next") : navigateYear("next")}
            className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </motion.button>
        </div>
      </div>

      {/* Year View */}
      {view === "year" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="grid grid-cols-2 gap-2"
        >
          {monthNames.map((month, index) => (
            <motion.button
              key={month}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(185, 28, 28, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const newDate = new Date(currentMonth)
                newDate.setMonth(index)
                setCurrentMonth(newDate)
                setView("month")
              }}
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentMonth.getMonth() === index
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              {month}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Month View */}
      {view === "month" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-xs font-medium text-gray-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth).map((date, index) => {
              if (!date) {
                return <div key={index} className="p-2" />
              }

              const isDisabled = isDateDisabled(date)
              const isSelected = isDateSelected(date)
              const isToday = date.toDateString() === new Date().toDateString()

              return (
                <motion.button
                  key={date.toISOString()}
                  whileHover={!isDisabled ? { scale: 1.1 } : {}}
                  whileTap={!isDisabled ? { scale: 0.9 } : {}}
                  onClick={() => {
                    if (!isDisabled) {
                      onDateSelect(formatDateValue(date))
                      onClose()
                    }
                  }}
                  disabled={isDisabled}
                  className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isSelected
                      ? "bg-red-600 text-white shadow-lg"
                      : isToday
                      ? "bg-red-600/20 text-red-400 border border-red-600/30"
                      : isDisabled
                      ? "text-gray-600 cursor-not-allowed"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {date.getDate()}
                  {isToday && !isSelected && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const today = new Date()
            if (!isDateDisabled(today)) {
              onDateSelect(formatDateValue(today))
              onClose()
            }
          }}
          className="flex-1 py-2 px-3 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
        >
          Today
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            if (!isDateDisabled(tomorrow)) {
              onDateSelect(formatDateValue(tomorrow))
              onClose()
            }
          }}
          className="flex-1 py-2 px-3 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
        >
          Tomorrow
        </motion.button>
      </div>
    </motion.div>
  )
}
