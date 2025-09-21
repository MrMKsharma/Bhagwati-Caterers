/**
 * Role-Based Access Control (RBAC) System
 * Defines permissions for different user roles in the admin system
 */

export type UserRole = 'admin' | 'manager' | 'staff'

export interface Permission {
  resource: string
  action: 'create' | 'read' | 'update' | 'delete' | 'manage'
}

export interface RolePermissions {
  [key: string]: Permission[]
}

// Define permissions for each role
export const ROLE_PERMISSIONS: RolePermissions = {
  admin: [
    // Full access to everything
    { resource: 'users', action: 'manage' },
    { resource: 'dashboard', action: 'read' },
    { resource: 'analytics', action: 'read' },
    { resource: 'inquiries', action: 'manage' },
    { resource: 'menu-items', action: 'manage' },
    { resource: 'packages', action: 'manage' },
    { resource: 'testimonials', action: 'manage' },
    { resource: 'gallery', action: 'manage' },
  ],
  manager: [
    // Content management and customer interaction
    { resource: 'dashboard', action: 'read' },
    { resource: 'analytics', action: 'read' },
    { resource: 'inquiries', action: 'manage' },
    { resource: 'menu-items', action: 'manage' },
    { resource: 'packages', action: 'manage' },
    { resource: 'testimonials', action: 'manage' },
    { resource: 'gallery', action: 'manage' },
  ],
  staff: [
    // Read-only access to most features
    { resource: 'dashboard', action: 'read' },
    { resource: 'inquiries', action: 'read' },
    { resource: 'menu-items', action: 'read' },
    { resource: 'packages', action: 'read' },
    { resource: 'testimonials', action: 'read' },
    { resource: 'gallery', action: 'read' },
  ],
}

// Navigation items with their required permissions
export interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  requiredPermission: {
    resource: string
    action: 'create' | 'read' | 'update' | 'delete' | 'manage'
  }
}

export interface SessionUser {
  id?: string;
  email?: string;
  name?: string | null;
  role?: 'admin' | 'manager' | 'staff';
}

export interface UserSession {
  user?: SessionUser;
}

/**
 * Check if a user role has permission for a specific resource and action
 */
export function hasPermission(
  userRole: UserRole,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete' | 'manage'
): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || []
  
  return rolePermissions.some(permission => {
    return permission.resource === resource && 
           (permission.action === 'manage' || permission.action === action)
  })
}

/**
 * Check if a user role can access a specific page/feature
 */
export function canAccessPage(userRole: UserRole, resource: string): boolean {
  return hasPermission(userRole, resource, 'read')
}

/**
 * Check if a user role can create items in a resource
 */
export function canCreate(userRole: UserRole, resource: string): boolean {
  return hasPermission(userRole, resource, 'create') || hasPermission(userRole, resource, 'manage')
}

/**
 * Check if a user role can update items in a resource
 */
export function canUpdate(userRole: UserRole, resource: string): boolean {
  return hasPermission(userRole, resource, 'update') || hasPermission(userRole, resource, 'manage')
}

/**
 * Check if a user role can delete items in a resource
 */
export function canDelete(userRole: UserRole, resource: string): boolean {
  return hasPermission(userRole, resource, 'delete') || hasPermission(userRole, resource, 'manage')
}

/**
 * Get filtered navigation items based on user role
 */
export function getFilteredNavItems(userRole: UserRole, navItems: NavItem[]): NavItem[] {
  return navItems.filter(item => 
    hasPermission(userRole, item.requiredPermission.resource, item.requiredPermission.action)
  )
}

/**
 * Role descriptions for UI display
 */
export const ROLE_DESCRIPTIONS = {
  admin: {
    name: 'Administrator',
    description: 'Full system access including user management',
    color: 'red'
  },
  manager: {
    name: 'Manager',
    description: 'Manage content, inquiries, and business operations',
    color: 'blue'
  },
  staff: {
    name: 'Staff',
    description: 'View reports and basic read-only operations',
    color: 'green'
  }
} as const

/**
 * Get user role from session
 */
export function getUserRole(session: UserSession | { user?: { name?: string | null; email?: string; role?: string } } | null): UserRole | null {
  if (!session?.user?.role) return null
  return session.user.role as UserRole
}

/**
 * Higher-order function to protect API routes
 */
export function requirePermission(
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete' | 'manage'
) {
  return function<T extends (request: Request, context?: { params?: Record<string, string> }) => Promise<Response>>(
    handler: T
  ): (request: Request, context?: { params?: Record<string, string> }) => Promise<Response> {
    return async function(request: Request, context?: { params?: Record<string, string> }): Promise<Response> {
      // This will be used in API route protection
      const { getServerSession } = await import('next-auth/next')
      const session = await getServerSession()
      // TODO: Implement session-based permission checking using resource and action parameters
      // Implementation will be completed in API route updates
      console.log(`Permission check for ${resource}:${action}`, session ? 'authenticated' : 'anonymous')
      return handler(request, context)
    }
  }
}