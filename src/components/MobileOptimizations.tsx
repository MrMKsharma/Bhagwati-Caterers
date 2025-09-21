'use client'

import { useEffect, useState } from 'react'

export default function MobileOptimizations() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (!hasMounted) return
    // Disable zoom on double tap for iOS
    let lastTouchEnd = 0
    const handleTouchEnd = (e: TouchEvent) => {
      const now = new Date().getTime()
      if (now - lastTouchEnd <= 300) {
        e.preventDefault()
      }
      lastTouchEnd = now
    }

    // Prevent zoom on form inputs
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    // Add touch event listeners
    document.addEventListener('touchend', handleTouchEnd, { passive: false })
    document.addEventListener('touchstart', handleTouchStart, { passive: false })

    // Disable pull-to-refresh on mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false })

    // Handle viewport height changes (keyboard opening/closing)
    const handleResize = () => {
      // Update CSS custom property for dynamic viewport height
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Set initial value

    // Improve tap targets for better touch interaction
    const style = document.createElement('style')
    style.textContent = `
      /* Improve touch targets */
      button, a, input, select, textarea {
        min-height: 44px;
        min-width: 44px;
      }
      
      /* Prevent text selection on UI elements */
      .no-select {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      /* Smooth scrolling */
      html {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      }
      
      /* Fix iOS zoom on input focus */
      input[type="text"],
      input[type="email"],
      input[type="tel"],
      input[type="number"],
      textarea,
      select {
        font-size: 16px !important;
      }
      
      /* Improve button press feedback */
      button:active, .btn:active {
        transform: scale(0.98);
        transition: transform 0.1s ease;
      }
      
      /* Custom scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #a1a1a1;
      }
      
      /* Fix safe areas for notched devices */
      .safe-area-inset-top {
        padding-top: env(safe-area-inset-top);
      }
      
      .safe-area-inset-bottom {
        padding-bottom: env(safe-area-inset-bottom);
      }
      
      .safe-area-inset-left {
        padding-left: env(safe-area-inset-left);
      }
      
      .safe-area-inset-right {
        padding-right: env(safe-area-inset-right);
      }
      
      /* Dynamic viewport height */
      .min-h-screen-dynamic {
        min-height: 100vh;
        min-height: calc(var(--vh, 1vh) * 100);
      }
      
      /* Loading animations optimized for mobile */
      @keyframes pulse-mobile {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .animate-pulse-mobile {
        animation: pulse-mobile 1.5s ease-in-out infinite;
      }
      
      /* Haptic feedback simulation */
      .haptic-light:active {
        animation: haptic-light 0.1s ease;
      }
      
      @keyframes haptic-light {
        0% { transform: scale(1); }
        50% { transform: scale(0.99); }
        100% { transform: scale(1); }
      }
      
      /* Hide scrollbars on mobile for cleaner look */
      @media (max-width: 768px) {
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      }
      
      /* Improve text readability on mobile */
      @media (max-width: 768px) {
        body {
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
      }
      
      /* Better focus indicators for mobile */
      @media (max-width: 768px) {
        input:focus, select:focus, textarea:focus {
          outline: 2px solid #ea580c;
          outline-offset: 2px;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', handleResize)
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [hasMounted])

  return null // This component doesn&apos;t render anything
}