"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface FormContextType {
  isFormOpen: boolean
  setIsFormOpen: (open: boolean) => void
  isCalendarOpen: boolean
  setIsCalendarOpen: (open: boolean) => void
  isNavigating: boolean
  setIsNavigating: (navigating: boolean) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  return (
    <FormContext.Provider value={{
      isFormOpen,
      setIsFormOpen,
      isCalendarOpen,
      setIsCalendarOpen,
      isNavigating,
      setIsNavigating
    }}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider")
  }
  return context
}
