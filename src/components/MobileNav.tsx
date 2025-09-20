'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { name: 'मुख्यपृष्ठ', href: '/' },
  { name: 'आमच्याबद्दल', href: '/about' },
  { name: 'सेवा', href: '/services' },
  { name: 'मेनू', href: '/menu' },
  { name: 'पॅकेज', href: '/packages' },
  { name: 'गॅलरी', href: '/gallery' },
  { name: 'संपर्क', href: '/contact' },
]

function MobileNavOverlay({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Close menu when route changes
    onClose()
  }, [pathname, onClose])

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl transform transition-transform safe-area-inset-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 safe-area-inset-top bg-gradient-to-r from-orange-500 to-amber-500 text-white">
            <h2 className="text-lg font-semibold">मेनू</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 haptic-light"
              aria-label="मेनू बंद करा"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 haptic-light transform hover:translate-x-2 ${
                    isActive
                      ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200 safe-area-inset-bottom bg-gray-50">
            <div className="text-center text-sm text-gray-500">
              भगवती केटरर्स
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 haptic-light"
        aria-label="मेनू उघडा"
      >
        <Menu className="h-6 w-6" />
      </button>
      
      <MobileNavOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}