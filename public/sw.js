const CACHE_NAME = 'bhagwati-caterers-v1.0.0'
const OFFLINE_URL = '/offline'

// Assets to cache immediately
const STATIC_CACHE_URLS = [
  '/',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

// Assets that should be cached on first request
const DYNAMIC_CACHE_URLS = [
  '/api/testimonials',
  '/api/gallery',
  '/api/menu-items',
  '/api/packages'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell')
        // Cache each URL individually to avoid failing on missing files
        return Promise.allSettled(
          STATIC_CACHE_URLS.map(url => 
            cache.add(url).catch(error => {
              console.warn('[ServiceWorker] Failed to cache:', url, error)
              return null
            })
          )
        )
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate')
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim()
    })
  )
})

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }

  // Skip admin routes (they need authentication)
  if (url.pathname.startsWith('/admin')) {
    return
  }

  // Skip API routes that need fresh data
  if (url.pathname.startsWith('/api/contact') || 
      url.pathname.startsWith('/api/inquiries') ||
      url.pathname.startsWith('/api/auth')) {
    return
  }

  event.respondWith(
    caches.match(request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          console.log('[ServiceWorker] Serving from cache:', request.url)
          return response
        }

        // Otherwise fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Clone the response
            const responseToCache = response.clone()

            // Cache dynamic content
            if (shouldCache(url.pathname)) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  console.log('[ServiceWorker] Caching new resource:', request.url)
                  cache.put(request, responseToCache)
                })
            }

            return response
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match(OFFLINE_URL)
            }

            // Return cached version or empty response for other requests
            return caches.match(request) || new Response('', { status: 408 })
          })
      })
  )
})

// Helper function to determine if a URL should be cached
function shouldCache(pathname) {
  // Cache main pages
  if (['/', '/about', '/services', '/menu', '/packages', '/gallery', '/contact'].includes(pathname)) {
    return true
  }

  // Cache API responses for static content
  if (DYNAMIC_CACHE_URLS.some(url => pathname.startsWith(url.replace('/api', '/api')))) {
    return true
  }

  // Cache static assets
  if (pathname.startsWith('/_next/static/') || 
      pathname.startsWith('/icons/') || 
      pathname.includes('.css') || 
      pathname.includes('.js')) {
    return true
  }

  return false
}

// Background sync for failed form submissions
self.addEventListener('sync', (event) => {
  console.log('[ServiceWorker] Background sync:', event.tag)
  
  if (event.tag === 'contact-form') {
    event.waitUntil(
      // Handle background sync for contact form submissions
      handleContactFormSync()
    )
  }
})

// Handle contact form background sync
async function handleContactFormSync() {
  try {
    // Get pending submissions from IndexedDB
    const pendingSubmissions = await getPendingSubmissions()
    
    for (const submission of pendingSubmissions) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submission.data)
        })

        if (response.ok) {
          // Remove from pending submissions
          await removePendingSubmission(submission.id)
          console.log('[ServiceWorker] Successfully synced form submission')
        }
      } catch (error) {
        console.log('[ServiceWorker] Failed to sync submission:', error)
      }
    }
  } catch (error) {
    console.log('[ServiceWorker] Background sync failed:', error)
  }
}

// IndexedDB helpers for background sync
async function getPendingSubmissions() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('bhagwati-caterers-db', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['pending-submissions'], 'readonly')
      const store = transaction.objectStore('pending-submissions')
      const getAllRequest = store.getAll()
      
      getAllRequest.onsuccess = () => resolve(getAllRequest.result || [])
      getAllRequest.onerror = () => reject(getAllRequest.error)
    }
    
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('pending-submissions')) {
        db.createObjectStore('pending-submissions', { keyPath: 'id', autoIncrement: true })
      }
    }
  })
}

async function removePendingSubmission(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('bhagwati-caterers-db', 1)
    
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['pending-submissions'], 'readwrite')
      const store = transaction.objectStore('pending-submissions')
      const deleteRequest = store.delete(id)
      
      deleteRequest.onsuccess = () => resolve()
      deleteRequest.onerror = () => reject(deleteRequest.error)
    }
  })
}

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('[ServiceWorker] Push received')
  
  const options = {
    body: event.data?.text() || 'New notification from Bhagwati Caterers',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: 'bhagwati-caterers-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'View Details'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Bhagwati Caterers', options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[ServiceWorker] Notification click received')
  
  event.notification.close()

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})