import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { Session } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { UserRole, hasPermission } from './permissions'
import { PermissionCheckResult, ApiRouteHandler, ProtectedApiRouteHandler, ApiErrorResponse } from '@/types/api'

interface ExtendedSession extends Session {
  user: {
    id: string
    email: string
    name?: string
    role: UserRole
  }
}

/**
 * Check if user is authenticated and has required permission
 */
export async function checkPermission(
  request: Request,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete' | 'manage'
): Promise<PermissionCheckResult> {
  try {
    const session = await getServerSession(authOptions) as ExtendedSession | null
    
    if (!session || !session.user) {
      return {
        authorized: false,
        response: NextResponse.json(
          { error: 'Unauthorized - Authentication required' },
          { status: 401 }
        ) as NextResponse<ApiErrorResponse>
      }
    }

    const userRole = session.user.role
    
    if (!userRole) {
      return {
        authorized: false,
        response: NextResponse.json(
          { error: 'Unauthorized - Invalid user role' },
          { status: 403 }
        ) as NextResponse<ApiErrorResponse>
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
        ) as NextResponse<ApiErrorResponse>
      }
    }

    return {
      authorized: true,
      session: session as {
        user: {
          id: string;
          email: string;
          name?: string;
          role: string;
        };
      },
      userRole
    }
  } catch (error: unknown) {
    console.error('Permission check error:', error)
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Internal server error during permission check' },
        { status: 500 }
      ) as NextResponse<ApiErrorResponse>
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
  return function (handler: ProtectedApiRouteHandler): ApiRouteHandler {
    return async function (request: Request, context?: { params?: Record<string, string> }) {
      const permissionCheck = await checkPermission(request, resource, action)
      
      if (!permissionCheck.authorized) {
        return permissionCheck.response!
      }
      
      // Add session and userRole to request context for handler use
      return handler(request, {
        ...context,
        session: permissionCheck.session!,
        userRole: permissionCheck.userRole!
      })
    }
  }
}

/**
 * Get user session server-side
 */
export async function getAuthenticatedUser(): Promise<{
  user: {
    id: string;
    email: string;
    name?: string;
  };
  role: UserRole;
} | null> {
  const session = await getServerSession(authOptions) as ExtendedSession | null
  return session?.user ? {
    user: { id: session.user.id, email: session.user.email, name: session.user.name },
    role: session.user.role
  } : null
}