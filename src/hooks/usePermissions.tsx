'use client'

import { useSession } from 'next-auth/react'
import { hasPermission, canCreate, canUpdate, canDelete, getUserRole, UserSession } from '@/lib/permissions'

/**
 * Custom hook for role-based permission checking
 */
export function usePermissions() {
  const { data: session } = useSession()
  const userRole = getUserRole(session as UserSession | null)

  return {
    userRole,
    hasPermission: (resource: string, action: 'create' | 'read' | 'update' | 'delete' | 'manage') => {
      if (!userRole) return false
      return hasPermission(userRole, resource, action)
    },
    canCreate: (resource: string) => {
      if (!userRole) return false
      return canCreate(userRole, resource)
    },
    canUpdate: (resource: string) => {
      if (!userRole) return false
      return canUpdate(userRole, resource)
    },
    canDelete: (resource: string) => {
      if (!userRole) return false
      return canDelete(userRole, resource)
    },
    isAdmin: userRole === 'admin',
    isManager: userRole === 'manager',
    isStaff: userRole === 'staff',
  }
}

/**
 * Component to conditionally render content based on permissions
 */
interface PermissionWrapperProps {
  children: React.ReactNode
  resource: string
  action: 'create' | 'read' | 'update' | 'delete' | 'manage'
  fallback?: React.ReactNode
}

export function PermissionWrapper({ 
  children, 
  resource, 
  action, 
  fallback = null 
}: PermissionWrapperProps) {
  const { hasPermission } = usePermissions()
  
  if (!hasPermission(resource, action)) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}

/**
 * Component to show role-based access denied message
 */
export function AccessDenied({ resource }: { resource: string }) {
  const { userRole } = usePermissions()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 text-red-500">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You don&apos;t have permission to access {resource}. Your current role is: <span className="font-semibold">{userRole}</span>
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Please contact an administrator if you believe this is an error.
          </p>
        </div>
      </div>
    </div>
  )
}