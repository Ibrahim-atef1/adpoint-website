"use client"

import dynamic from "next/dynamic"
import { ComponentType } from "react"

// Dynamically import motion components to avoid SSR issues
export const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.div })),
  { ssr: false }
) as ComponentType<any>

export const MotionSpan = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.span })),
  { ssr: false }
) as ComponentType<any>

export const MotionH1 = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.h1 })),
  { ssr: false }
) as ComponentType<any>

export const MotionH2 = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.h2 })),
  { ssr: false }
) as ComponentType<any>

export const MotionH3 = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.h3 })),
  { ssr: false }
) as ComponentType<any>

export const MotionP = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.p })),
  { ssr: false }
) as ComponentType<any>

export const MotionButton = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.button })),
  { ssr: false }
) as ComponentType<any>

// Create a motion object that can be used like motion.div
export const motion = {
  div: MotionDiv,
  span: MotionSpan,
  h1: MotionH1,
  h2: MotionH2,
  h3: MotionH3,
  p: MotionP,
  button: MotionButton,
}

// Re-export motion utilities
export { useMotionValue, useSpring, useTransform, useInView, useScroll } from "framer-motion"
