"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ResponsiveImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  mobileWidth?: number
  mobileHeight?: number
}

export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 85,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  mobileWidth,
  mobileHeight
}: ResponsiveImageProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Generate responsive srcset with WebP and AVIF formats
  const generateSrcSet = (baseSrc: string, baseWidth: number, baseHeight: number) => {
    const formats = ['avif', 'webp']
    const densities = [1, 2, 3]
    const breakpoints = [320, 640, 768, 1024, 1280, 1536]
    
    let srcSet = ''
    
    formats.forEach(format => {
      densities.forEach(density => {
        breakpoints.forEach(breakpoint => {
          const scaledWidth = Math.min(breakpoint * density, baseWidth * density)
          const scaledHeight = Math.round((scaledWidth * baseHeight) / baseWidth)
          
          if (scaledWidth <= baseWidth * 3) { // Don't exceed 3x density
            const formatSrc = baseSrc.replace(/\.(jpg|jpeg|png)$/i, `.${format}`)
            srcSet += `${formatSrc}?w=${scaledWidth}&h=${scaledHeight}&q=${quality} ${scaledWidth}w, `
          }
        })
      })
    })
    
    return srcSet.slice(0, -2) // Remove trailing comma and space
  }

  const actualWidth = isMobile && mobileWidth ? mobileWidth : width
  const actualHeight = isMobile && mobileHeight ? mobileHeight : height

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={actualWidth}
        height={actualHeight}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority={priority}
        quality={quality}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover'
        }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            width: '100%',
            height: `${(actualHeight / actualWidth) * 100}%`
          }}
        />
      )}
    </div>
  )
}
