# Role-Based Access Control (RBAC) Implementation

## Overview

The Elite Caterers admin portal now implements a comprehensive Role-Based Access Control system with three distinct user roles, each with specific permissions and access levels.

## User Roles

### 1. Administrator (admin)
**Full System Access**
- **Permissions**: Complete access to all features
- **Access**: Users Management, Analytics, Inquiries, Menu Items, Packages, Testimonials, Gallery
- **Capabilities**: 
  - Create, read, update, delete all content
  - Manage user accounts and permissions
  - Access all analytics and reports
  - System configuration

### 2. Manager (manager)
**Content Management & Business Operations**
- **Permissions**: Content management and customer interaction
- **Access**: Analytics, Inquiries, Menu Items, Packages, Testimonials, Gallery
- **Restricted**: Cannot access Users Management
- **Capabilities**:
  - Manage all business content
  - Handle customer inquiries and quotations
  - Access analytics and reports
  - Manage testimonials and gallery

### 3. Staff (staff)
**Read-Only Access**
- **Permissions**: View-only access to most features
- **Access**: Dashboard, Inquiries (read), Menu Items (read), Packages (read), Testimonials (read), Gallery (read)
- **Restricted**: Cannot create, edit, or delete content; No access to analytics or user management
- **Capabilities**:
  - View inquiries and customer information
  - Access menu items and packages for reference
  - Read testimonials and gallery content

## Test Accounts

For testing the RBAC system, the following accounts have been created:

### Admin Account
- **Email**: admin@caterers.com
- **Password**: admin123
- **Role**: Administrator
- **Access**: Full system access

### Manager Account
- **Email**: manager@caterers.com
- **Password**: manager123
- **Role**: Manager
- **Access**: Content management without user administration

### Staff Account
- **Email**: staff@caterers.com
- **Password**: staff123
- **Role**: Staff
- **Access**: Read-only access to business content

## Technical Implementation

### Permission System
- **Location**: `/src/lib/permissions.ts`
- **Utilities**: `/src/lib/auth-helpers.ts`
- **Hooks**: `/src/hooks/usePermissions.tsx`

### Key Features
1. **Resource-based permissions**: Each feature is protected by resource and action
2. **Dynamic navigation**: Menu items show/hide based on user permissions
3. **API protection**: All admin API routes include permission checks
4. **UI controls**: Create, edit, delete buttons appear only for authorized users
5. **Access denial pages**: Clear messaging when access is restricted

### Navigation Filtering
The admin sidebar dynamically filters menu items based on the user's role:
- Admins see all navigation items
- Managers see everything except "Users"
- Staff see limited read-only navigation

### API Security
All admin API endpoints now include permission validation:
- User authentication check
- Role-based permission verification
- Detailed error messages for unauthorized access
- Protection against privilege escalation

## Usage Examples

### Checking Permissions in Components
```tsx
import { usePermissions } from '@/hooks/usePermissions'

const { hasPermission, canCreate, canUpdate, canDelete } = usePermissions()

// Check specific permission
if (hasPermission('users', 'create')) {
  // Show create button
}

// Wrapper component
<PermissionWrapper resource="users" action="delete">
  <DeleteButton />
</PermissionWrapper>
```

### API Route Protection
```tsx
import { checkPermission } from '@/lib/auth-helpers'

export async function POST(request: Request) {
  const permissionCheck = await checkPermission(request, 'users', 'create')
  
  if (!permissionCheck.authorized) {
    return permissionCheck.response
  }
  
  // Authorized logic here
}
```

## Security Considerations

1. **Server-side validation**: All permissions are verified on the server
2. **Client-side filtering**: UI elements are hidden but not relied upon for security
3. **Session-based access**: Permissions are checked against the authenticated session
4. **Role consistency**: Database role values match the permission system
5. **Audit trail**: All access attempts are logged for monitoring

## Testing the System

1. **Login with different roles** using the test accounts above
2. **Verify navigation filtering** - different menus for each role
3. **Test feature access** - try accessing restricted pages
4. **Check API responses** - verify proper error messages for unauthorized requests
5. **Validate UI controls** - ensure action buttons appear only for authorized users

The RBAC system provides robust security while maintaining a user-friendly experience appropriate to each user's responsibilities within the organization.