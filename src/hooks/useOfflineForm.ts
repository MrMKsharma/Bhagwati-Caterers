'use client'

import { useState, useEffect, useCallback } from 'react'
import { OfflineFormData, PendingSubmission } from '@/types/api'

export function useOfflineForm() {
  const [isOnline, setIsOnline] = useState(true)
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingSubmission[]>([])

  const loadPendingSubmissions = useCallback(() => {
    try {
      const stored = localStorage.getItem('bhagwati-caterers-pending-submissions')
      if (stored) {
        setPendingSubmissions(JSON.parse(stored))
      }
    } catch (error: unknown) {
      console.error('Error loading pending submissions:', error)
    }
  }, [])

  const savePendingSubmissions = useCallback((submissions: PendingSubmission[]) => {
    try {
      localStorage.setItem('bhagwati-caterers-pending-submissions', JSON.stringify(submissions))
      setPendingSubmissions(submissions)
    } catch (error: unknown) {
      console.error('Error saving pending submissions:', error)
    }
  }, [])

  const addPendingSubmission = (data: OfflineFormData, url: string, method: string = 'POST') => {
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
        const syncRegistration = registration as ServiceWorkerRegistration & { 
          sync: { register: (tag: string) => Promise<void> } 
        }
        return syncRegistration.sync.register('contact-form')
      }).catch((error: Error) => {
        console.error('Background sync registration failed:', error)
      })
    }
  }

  const removePendingSubmission = useCallback((id: string) => {
    const updated = pendingSubmissions.filter(sub => sub.id !== id)
    savePendingSubmissions(updated)
  }, [pendingSubmissions, savePendingSubmissions])

  const processPendingSubmissions = useCallback(async () => {
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
      } catch (error: unknown) {
        console.error('Error processing pending submission:', error)
      }
    }
  }, [isOnline, pendingSubmissions, removePendingSubmission])

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
  }, [loadPendingSubmissions, processPendingSubmissions])

  return {
    isOnline,
    pendingSubmissions,
    addPendingSubmission,
    removePendingSubmission,
    processPendingSubmissions
  }
}