'use client'

import { useState, useEffect } from 'react'
import { WifiOff, Wifi, Clock } from 'lucide-react'

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null) // Start with null to avoid hydration mismatch
  const [showIndicator, setShowIndicator] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    
    // Only run on client side
    if (typeof window === 'undefined') return

    // Check initial online status
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true)
      setShowIndicator(true)
      // Hide success indicator after 3 seconds
      setTimeout(() => setShowIndicator(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowIndicator(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check for pending submissions
    const checkPendingSubmissions = () => {
      try {
        const stored = localStorage.getItem('bhagwati-caterers-pending-submissions')
        if (stored) {
          const submissions = JSON.parse(stored)
          setPendingCount(submissions.length)
        }
      } catch (error) {
        console.error('Error checking pending submissions:', error)
      }
    }

    // Check initially and then periodically
    checkPendingSubmissions()
    const interval = setInterval(checkPendingSubmissions, 5000)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearInterval(interval)
    }
  }, [])

  // Don&apos;t render until mounted to prevent hydration mismatch
  if (!hasMounted) {
    return null
  }

  // Don&apos;t show if online and no indicator needed, or if still loading
  if (isOnline === null || (isOnline && !showIndicator && pendingCount === 0)) {
    return null
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      {!isOnline ? (
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">You&apos;re offline</span>
          {pendingCount > 0 && (
            <div className="flex items-center space-x-1 bg-red-600 px-2 py-1 rounded text-xs">
              <Clock className="h-3 w-3" />
              <span>{pendingCount} pending</span>
            </div>
          )}
        </div>
      ) : showIndicator ? (
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <Wifi className="h-4 w-4" />
          <span className="text-sm font-medium">Back online</span>
          {pendingCount > 0 && (
            <div className="flex items-center space-x-1 bg-green-600 px-2 py-1 rounded text-xs">
              <Clock className="h-3 w-3" />
              <span>Syncing {pendingCount}...</span>
            </div>
          )}
        </div>
      ) : pendingCount > 0 ? (
        <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">{pendingCount} forms pending sync</span>
        </div>
      ) : null}
    </div>
  )
}