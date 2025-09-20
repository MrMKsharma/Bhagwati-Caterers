'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  MessageSquare, 
  Image, 
  Menu as MenuIcon, 
  LogOut,
  ChefHat,
  Star,
  BarChart3,
  FileText
} from 'lucide-react'
import { usePermissions } from '@/hooks/usePermissions'
import { NavItem, getFilteredNavItems, ROLE_DESCRIPTIONS } from '@/lib/permissions'
import { Providers } from '@/components/Providers'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const { userRole } = usePermissions()
  
  // Always call useEffect to maintain hook order
  useEffect(() => {
    // Only redirect if not on login page
    if (pathname !== '/admin/login') {
      if (status === 'loading') return // Still loading
      if (!session) {
        router.push('/admin/login')
      }
    }
  }, [session, status, router, pathname])
  
  // If this is the login page, render without admin layout
  if (pathname === '/admin/login') {
    return (
      <Providers>
        <div className="min-h-screen bg-gray-100">
          {children}
        </div>
      </Providers>
    )
  }

  if (status === 'loading') {
    return (
      <Providers>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </Providers>
    )
  }

  if (!session) {
    return null
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' })
  }
  
  const allNavItems: NavItem[] = [
    { 
      name: 'Dashboard', 
      href: '/admin/dashboard', 
      icon: LayoutDashboard,
      requiredPermission: { resource: 'dashboard', action: 'read' }
    },
    { 
      name: 'Analytics', 
      href: '/admin/analytics', 
      icon: BarChart3,
      requiredPermission: { resource: 'analytics', action: 'read' }
    },
    { 
      name: 'Inquiries', 
      href: '/admin/inquiries', 
      icon: MessageSquare,
      requiredPermission: { resource: 'inquiries', action: 'read' }
    },
    { 
      name: 'Menu Items', 
      href: '/admin/menu-items', 
      icon: ChefHat,
      requiredPermission: { resource: 'menu-items', action: 'read' }
    },
    { 
      name: 'Packages', 
      href: '/admin/packages', 
      icon: Package,
      requiredPermission: { resource: 'packages', action: 'read' }
    },
    { 
      name: 'Testimonials', 
      href: '/admin/testimonials', 
      icon: Star,
      requiredPermission: { resource: 'testimonials', action: 'read' }
    },
    { 
      name: 'Gallery', 
      href: '/admin/gallery', 
      icon: Image,
      requiredPermission: { resource: 'gallery', action: 'read' }
    },
    { 
      name: 'Users', 
      href: '/admin/users', 
      icon: Users,
      requiredPermission: { resource: 'users', action: 'read' }
    },
  ]
  
  const navItems = userRole ? getFilteredNavItems(userRole, allNavItems) : []

  return (
    // Create a completely separate layout for admin pages without the main site navigation
    <Providers>
      <div className="min-h-screen bg-gray-100">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-bold text-orange-600">Bhagwati Caterers Admin</h1>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-700">
                    Welcome, {session.user?.name || session.user?.email}
                  </div>
                  {userRole && (
                    <div className="text-xs text-gray-500">
                      Role: <span className={`font-medium text-${ROLE_DESCRIPTIONS[userRole].color}-600`}>
                        {ROLE_DESCRIPTIONS[userRole].name}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-sm min-h-screen">
            <nav className="mt-5 px-2">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive 
                          ? 'bg-orange-100 text-orange-700 border-r-2 border-orange-500' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`mr-3 h-5 w-5 ${
                        isActive 
                          ? 'text-orange-500' 
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`} />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <main className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </Providers>
  )
}