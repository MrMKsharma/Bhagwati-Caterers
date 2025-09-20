'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { BreadcrumbStructuredData } from './StructuredData'

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname()
  
  // Generate breadcrumbs from pathname if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bhagwati-caterers.com'
    const pathSegments = pathname.split('/').filter(segment => segment !== '')
    
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', href: '/' }
    ]

    // Map of path segments to readable names
    const pathNameMap: Record<string, string> = {
      'about': 'About Us',
      'services': 'Services',
      'menu': 'Menu',
      'packages': 'Packages', 
      'gallery': 'Gallery',
      'contact': 'Contact Us',
      'admin': 'Admin',
      'users': 'Users',
      'inquiries': 'Inquiries',
      'testimonials': 'Testimonials',
      'analytics': 'Analytics'
    }

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const name = pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
      
      // Don't add admin paths to public breadcrumbs
      if (!pathname.startsWith('/admin') || pathname.startsWith('/admin')) {
        breadcrumbs.push({
          name,
          href: currentPath
        })
      }
    })

    return breadcrumbs
  }

  const breadcrumbItems = generateBreadcrumbs()
  
  // Don't show breadcrumbs on home page or if only home
  if (pathname === '/' || breadcrumbItems.length <= 1) {
    return null
  }

  const structuredDataItems = breadcrumbItems.map(item => ({
    name: item.name,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://bhagwati-caterers.com'}${item.href}`
  }))

  return (
    <>
      <BreadcrumbStructuredData items={structuredDataItems} />
      <nav 
        className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1
            const isFirst = index === 0
            
            return (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" aria-hidden="true" />
                )}
                
                {isLast ? (
                  <span 
                    className="font-medium text-gray-900 flex items-center"
                    aria-current="page"
                  >
                    {isFirst && <Home className="h-4 w-4 mr-1" aria-hidden="true" />}
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-orange-600 transition-colors flex items-center"
                  >
                    {isFirst && <Home className="h-4 w-4 mr-1" aria-hidden="true" />}
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

// Mobile-friendly compact breadcrumb
export function CompactBreadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname()
  const breadcrumbItems = items || []
  
  if (pathname === '/' || breadcrumbItems.length <= 1) {
    return null
  }

  const lastItem = breadcrumbItems[breadcrumbItems.length - 1]
  const secondLastItem = breadcrumbItems[breadcrumbItems.length - 2]

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <Link 
        href="/"
        className="text-gray-500 hover:text-orange-600 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {breadcrumbItems.length > 2 && (
        <>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <span className="text-gray-400">...</span>
        </>
      )}
      
      {secondLastItem && (
        <>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <Link
            href={secondLastItem.href}
            className="text-gray-500 hover:text-orange-600 transition-colors truncate max-w-24"
          >
            {secondLastItem.name}
          </Link>
        </>
      )}
      
      <ChevronRight className="h-3 w-3 text-gray-400" />
      <span className="font-medium text-gray-900 truncate max-w-32">
        {lastItem.name}
      </span>
    </nav>
  )
}