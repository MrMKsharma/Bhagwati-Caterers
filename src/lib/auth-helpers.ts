import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { UserRole, hasPermission } from './permissions'

/**
 * Check if user is authenticated and has required permission
 */
export async function checkPermission(
  request: Request,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete' | 'manage'
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return {
        authorized: false,
        response: NextResponse.json(
          { error: 'Unauthorized - Authentication required' },
          { status: 401 }
        )
      }
    }

    const userRole = (session.user as any).role as UserRole
    
    if (!userRole) {
      return {
        authorized: false,
        response: NextResponse.json(
          { error: 'Unauthorized - Invalid user role' },
          { status: 403 }
        )
      }
    }

    if (!hasPermission(userRole, resource, action)) {
      return {
        authorized: false,
        response: NextResponse.json(
          { 
            error: `Forbidden - ${userRole} role does not have ${action} permission for ${resource}`,
            requiredPermission: { resource, action },
            userRole
          },
          { status: 403 }
        )
      }
    }

    return {
      authorized: true,
      session,
      userRole
    }
  } catch (error) {
    console.error('Permission check error:', error)
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Internal server error during permission check' },
        { status: 500 }
      )
    }
  }
}

/**
 * Decorator function to protect API routes
 */
export function withPermission(
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete' | 'manage'
) {
  return function (handler: Function) {
    return async function (request: Request, context?: any) {
      const permissionCheck = await checkPermission(request, resource, action)
      
      if (!permissionCheck.authorized) {
        return permissionCheck.response
      }
      
      // Add session and userRole to request context for handler use
      return handler(request, {
        ...context,
        session: permissionCheck.session,
        userRole: permissionCheck.userRole
      })
    }
  }
}

/**
 * Get user session server-side
 */
export async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions)
  return session?.user ? {
    user: session.user,
    role: (session.user as any).role as UserRole
  } : null
}