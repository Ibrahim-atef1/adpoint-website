"use client"

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroAnimation() {
  useEffect(() => {
      // Wait for hydration to complete and ensure DOM is ready
      const timer = setTimeout(() => {
        // Additional check to ensure hydration is complete
        if (typeof window === 'undefined') return;
        
        const heroElement = document.querySelector(".hero-section");
        const nextElement = document.querySelector(".next-section");

        console.log("HeroAnimation: Checking elements...", { heroElement, nextElement });

        if (!heroElement || !nextElement) {
          console.warn("HeroAnimation: Required elements not found", {
            heroElement: !!heroElement,
            nextElement: !!nextElement
          });
          return;
        }

        // Ensure elements are fully rendered
        if (!(heroElement as HTMLElement).offsetParent || !(nextElement as HTMLElement).offsetParent) {
          console.warn("HeroAnimation: Elements not fully rendered, retrying...");
          setTimeout(() => {
            // Retry after a short delay
            const retryTimer = setTimeout(() => {
              // Re-run the animation setup
              window.location.reload();
            }, 100);
            return () => clearTimeout(retryTimer);
          }, 100);
          return;
        }

        console.log("HeroAnimation: Initializing animations...");

      const ctx = gsap.context(() => {
        // Set initial states for smooth start
        gsap.set(".hero-section", {
          scale: 1,
          opacity: 1,
          transformOrigin: "center center"
        });

        // Don't set initial state for about section to prevent hydration errors
        // Let CSS handle the initial state

        // Create a powerful timeline for the hero transition
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "+=450vh", // 50% more scrolling - even longer duration
            scrub: 0.03, // Even slower scrubbing for ultra-smooth animation
            pin: true, // Pin the hero section
            anticipatePin: 1,
            id: "hero-animation", // Add ID for reference
            onUpdate: (self) => {
              console.log("Hero scroll progress:", self.progress);
              // When hero animation completes, refresh ScrollTrigger
              if (self.progress === 1) {
                console.log("Hero animation completed, releasing pin");
                ScrollTrigger.refresh();
              }
            }
          },
        });

        // Phase 1: Hero section starts transforming very slowly (0-60%)
        tl.to(".hero-section", {
          scale: 0.9, // Very gentle scaling - keep elements larger longer
          opacity: 0.8, // Gentle opacity
          y: -15, // Subtle vertical movement
          transformOrigin: "center center",
          ease: "power2.out",
          duration: 0.6
        });

        // Phase 2: Hero section continues transforming slowly (60-85%)
        tl.to(".hero-section", {
          scale: 0.7, // More dramatic scaling but still visible
          opacity: 0.5, // More dramatic opacity
          y: -30, // More vertical movement
          ease: "power2.inOut",
          duration: 0.25
        });

        // Phase 3: Hero section continues minimizing (85-95%)
        tl.to(".hero-section", {
          scale: 0.4, // Smaller but still visible
          opacity: 0.2, // Very low opacity
          y: -45, // More vertical movement
          ease: "power2.inOut",
          duration: 0.1
        });

        // Phase 4: Hero section disappears completely (95-100%)
        tl.to(".hero-section", {
          scale: 0.1, // Almost invisible but gorgeous
          opacity: 0, // Completely invisible
          y: -60, // Final vertical movement
          ease: "power2.in",
          duration: 0.05
        });

        // Phase 4: About section appears when hero is mostly gone (90%)
        tl.to(".next-section", 
          { 
            opacity: 1, // Become fully visible
            y: 0, // Stay in position
            scale: 1, // No scaling
            ease: "power2.out",
            duration: 0.3
          },
          "-=0.1" // Start slightly before hero completely disappears
        );

        // Add powerful parallax effects to background elements
        gsap.to(".hero-section .absolute", {
          y: -150, // More dramatic parallax
          scale: 1.1, // Add scale effect
          rotation: 2, // Add subtle rotation
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 0.8
          }
        });

        // Add floating particles animation
        gsap.to(".hero-section .absolute div", {
          y: -80,
          scale: 1.2,
          opacity: 0.8,
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });

        // Add text content animation
        gsap.to(".hero-section h1", {
          scale: 0.8,
          y: -30,
          opacity: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });

        // Add button animation
        gsap.to(".hero-section button", {
          scale: 0.9,
          y: -20,
          opacity: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });

        // Remove old about section animations - now handled in timeline above

        console.log("HeroAnimation: Powerful animations with smooth easing initialized successfully");

      });

      return () => ctx.revert();
    }, 1000); // Increased delay to ensure hydration is complete

    return () => clearTimeout(timer);
  }, []);

  return null;
}
