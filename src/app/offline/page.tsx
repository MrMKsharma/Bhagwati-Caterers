'use client'

import { useEffect, useState } from 'react'
import { WifiOff, RefreshCw, Home, Phone } from 'lucide-react'
import Link from 'next/link'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRetry = () => {
    window.location.reload()
  }

  if (isOnline) {
    // Automatically redirect when back online
    window.location.reload()
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <WifiOff className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              You&apos;re Offline
            </h1>
            <p className="text-gray-600 mb-6">
              It looks like you&apos;ve lost your internet connection. Don&apos;t worry, you can still browse some of our content that&apos;s been cached.
            </p>

            <div className="space-y-4">
              <button
                onClick={handleRetry}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </button>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/"
                  className="flex justify-center items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Link>
                <Link
                  href="/contact"
                  className="flex justify-center items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Contact
                </Link>
              </div>
            </div>

            <div className="mt-8 p-4 bg-orange-50 rounded-md">
              <h3 className="text-sm font-medium text-orange-800 mb-2">
                Available Offline:
              </h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Browse our menu items</li>
                <li>• View catering packages</li>
                <li>• Check our services</li>
                <li>• See contact information</li>
              </ul>
            </div>

            <div className="mt-6 text-xs text-gray-500 text-center">
              <p>
                Your form submissions will be saved and sent automatically when you&apos;re back online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}