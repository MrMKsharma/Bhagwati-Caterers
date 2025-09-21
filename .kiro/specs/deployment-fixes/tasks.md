# Implementation Plan

- [x] 1. Fix TypeScript `any` types in API routes and utilities









  - Replace all `any` types with proper TypeScript interfaces in API routes
  - Create specific type definitions for request/response objects
  - Fix `any` types in auth-helpers.ts, auth.ts, email.ts, and permissions.ts
  - _Requirements: 2.2, 3.2_

- [x] 2. Fix TypeScript `any` types in React components and hooks





  - Replace `any` types in admin dashboard, gallery, and user management pages
  - Create proper type definitions for component props and state
  - Fix `any` types in useOfflineForm.ts and other custom hooks
  - _Requirements: 2.2, 3.2_

- [x] 3. Fix unescaped JSX entities across all pages





  - Escape apostrophes and quotes in contact, offline, packages, and services pages
  - Replace unescaped entities with proper HTML entities or template literals
  - Fix unescaped entities in InstallPrompt and OfflineIndicator components
  - _Requirements: 1.1, 3.1_

- [x] 4. Convert CommonJS imports to ES6 modules in script files










  - Update all `require()` statements to `import` statements in scripts directory
  - Ensure proper module syntax in setup-postgres.js, test-api-response.js, and other scripts
  - Update file extensions if necessary for ES module compatibility
  - _Requirements: 1.1, 2.1_

- [x] 5. Fix React Hook dependency issues and warnings





  - Add missing dependencies to useEffect hooks in useOfflineForm.ts
  - Fix exhaustive-deps warnings in menu page and other components
  - Ensure proper dependency arrays for all React hooks
  - _Requirements: 3.3, 1.1_

- [x] 6. Remove unused imports and variables systematically









  - Remove unused icon imports from all admin pages and components
  - Clean up unused variables in component files
  - Remove unused function parameters and mark intentionally unused ones
  - _Requirements: 2.3, 1.1_

- [x] 7. Fix accessibility and React-specific issues





  - Add missing alt attributes to all image elements
  - Fix duplicate props in RegionalGraphics component
  - Replace `<img>` tags with Next.js `<Image>` components where appropriate
  - _Requirements: 3.1, 1.4_

- [x] 8. Create comprehensive type definitions file





  - Create shared TypeScript interfaces for common data structures
  - Define proper types for API responses, form data, and component props
  - Export types for reuse across the application
  - _Requirements: 2.2, 3.2_

- [x] 9. Fix Function type usage and unsafe function types





  - Replace generic `Function` type with specific function signatures
  - Define proper parameter and return types for callback functions
  - Update auth-helpers.ts and permissions.ts function type definitions
  - _Requirements: 2.2, 3.2_

- [x] 10. Validate and test all fixes













  - Run ESLint to verify all errors are resolved
  - Execute TypeScript compilation check
  - Test build process to ensure successful deployment
  - Verify all pages load without runtime errors
  - _Requirements: 1.1, 1.2, 1.3, 1.4_