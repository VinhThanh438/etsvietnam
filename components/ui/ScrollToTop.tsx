'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[99] flex h-12 w-12 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-md text-green-400 shadow-xl shadow-green-500/10 transition-all hover:bg-green-500/20 hover:scale-110 active:scale-95 group"
          aria-label="Cuộn lên đầu trang"
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-green-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <ChevronUp className="relative z-10 h-6 w-6 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
