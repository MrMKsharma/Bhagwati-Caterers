'use client'

import { useState, useEffect } from 'react'
import { Download, X, Smartphone } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState<boolean | null>(null) // Start with null
  const [isIOS, setIsIOS] = useState<boolean | null>(null) // Start with null
  const [isStandalone, setIsStandalone] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    
    // Only run on client side
    if (typeof window === 'undefined') return

    // Check if app is already installed
    const checkIfInstalled = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches
      const isIOSStandalone = (window.navigator as any).standalone === true
      setIsStandalone(standalone || isIOSStandalone)
      setIsInstalled(standalone || isIOSStandalone)
    }

    // Check if device is iOS
    const checkIfIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      const isIOSDevice = /ipad|iphone|ipod/.test(userAgent)
      setIsIOS(isIOSDevice)
    }

    checkIfInstalled()
    checkIfIOS()

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show install prompt after a delay (not immediately)
      setTimeout(() => {
        if (!isInstalled) {
          setShowInstallPrompt(true)
        }
      }, 10000) // Show after 10 seconds
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('PWA was installed')
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [isInstalled])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    } catch (error) {
      console.error('Error during install prompt:', error)
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    // Don't show again for this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('installPromptDismissed', 'true')
    }
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!hasMounted) {
    return null
  }

  // Don't show if still loading, already installed, or dismissed this session
  if (isInstalled === null || isIOS === null || isInstalled || (typeof window !== 'undefined' && sessionStorage.getItem('installPromptDismissed'))) {
    return null
  }

  // iOS install instructions
  if (isIOS && showInstallPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm mx-auto">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <Smartphone className="h-5 w-5 text-orange-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Install App</h3>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Install Bhagwati Caterers app on your iPhone for the best experience!
        </p>
        <div className="text-sm text-gray-700 space-y-2">
          <p>1. Tap the <strong>Share</strong> button ⬆️</p>
          <p>2. Scroll down and tap <strong>"Add to Home Screen"</strong></p>
          <p>3. Tap <strong>"Add"</strong> to install</p>
        </div>
      </div>
    )
  }

  // Android/Chrome install prompt
  if (showInstallPrompt && deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm mx-auto">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <Download className="h-5 w-5 text-orange-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Install App</h3>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Install Bhagwati Caterers for faster access and a better experience!
        </p>
        <div className="flex space-x-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Not Now
          </button>
        </div>
      </div>
    )
  }

  return null
}