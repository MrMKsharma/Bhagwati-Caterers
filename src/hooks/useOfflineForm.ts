'use client'

import { useState, useEffect } from 'react'

interface FormData {
  [key: string]: any
}

interface PendingSubmission {
  id: string
  data: FormData
  timestamp: number
  url: string
  method: string
}

export function useOfflineForm() {
  const [isOnline, setIsOnline] = useState(true)
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingSubmission[]>([])

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true)
      processPendingSubmissions()
    }
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Load pending submissions from localStorage
    loadPendingSubmissions()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const loadPendingSubmissions = () => {
    try {
      const stored = localStorage.getItem('bhagwati-caterers-pending-submissions')
      if (stored) {
        setPendingSubmissions(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading pending submissions:', error)
    }
  }

  const savePendingSubmissions = (submissions: PendingSubmission[]) => {
    try {
      localStorage.setItem('bhagwati-caterers-pending-submissions', JSON.stringify(submissions))
      setPendingSubmissions(submissions)
    } catch (error) {
      console.error('Error saving pending submissions:', error)
    }
  }

  const addPendingSubmission = (data: FormData, url: string, method: string = 'POST') => {
    const submission: PendingSubmission = {
      id: Date.now().toString(),
      data,
      timestamp: Date.now(),
      url,
      method
    }

    const updated = [...pendingSubmissions, submission]
    savePendingSubmissions(updated)

    // Register background sync if supported
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then((registration) => {
        return (registration as any).sync.register('contact-form')
      }).catch((error) => {
        console.error('Background sync registration failed:', error)
      })
    }
  }

  const removePendingSubmission = (id: string) => {
    const updated = pendingSubmissions.filter(sub => sub.id !== id)
    savePendingSubmissions(updated)
  }

  const processPendingSubmissions = async () => {
    if (!isOnline || pendingSubmissions.length === 0) return

    for (const submission of pendingSubmissions) {
      try {
        const response = await fetch(submission.url, {
          method: submission.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submission.data)
        })

        if (response.ok) {
          removePendingSubmission(submission.id)
        } else {
          console.error('Failed to submit pending form:', response.statusText)
        }
      } catch (error) {
        console.error('Error processing pending submission:', error)
      }
    }
  }

  return {
    isOnline,
    pendingSubmissions,
    addPendingSubmission,
    removePendingSubmission,
    processPendingSubmissions
  }
}