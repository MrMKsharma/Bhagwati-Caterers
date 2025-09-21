# Type Definitions

This directory contains comprehensive TypeScript type definitions for the Bhagwati Caterers application.

## File Structure

- **`index.ts`** - Main entry point that re-exports all types for easy importing
- **`api.ts`** - API-related types including request/response interfaces, database models, and authentication types
- **`components.ts`** - React component prop types and UI-related interfaces
- **`forms.ts`** - Form handling types including validation, state management, and form builders

## Usage

### Importing Types

```typescript
// Import all types from the main index
import { ApiResponse, UserWithRole, ContactFormData } from '@/types';

// Or import from specific modules
import { ButtonProps, ModalProps } from '@/types/components';
import { FormState, ValidationRule } from '@/types/forms';
import { GalleryItem, MenuItem } from '@/types/api';
```

### Common Type Categories

#### API Types
- **Response Types**: `ApiResponse<T>`, `PaginatedResponse<T>`, `ApiErrorResponse`
- **Data Models**: `UserWithRole`, `GalleryItem`, `MenuItem`, `Package`, `Testimonial`
- **Form Data**: `ContactFormData`, `InquiryFormData`, `TestimonialFormData`
- **Authentication**: `AuthUser`, `CustomSession`, `PermissionCheckResult`

#### Component Types
- **Base Props**: `BaseProps`, `LayoutProps`
- **Form Components**: `InputProps`, `ButtonProps`, `FormFieldProps`
- **Layout Components**: `ModalProps`, `TableProps`, `PaginationProps`
- **Navigation**: `NavigationProps`, `BreadcrumbProps`

#### Form Types
- **Form State**: `FormState<T>`, `FormActions<T>`, `UseFormReturn<T>`
- **Validation**: `ValidationRule`, `ValidationErrors`, `FieldValidation`
- **Form Fields**: `FormField`, `FormFieldType`, `FormSection`
- **Multi-step Forms**: `FormStep`, `MultiStepFormState<T>`

### Best Practices

1. **Use Generic Types**: Many types are generic to provide better type safety
   ```typescript
   const [state, setState] = useState<FormState<ContactFormData>>(initialState);
   ```

2. **Extend Base Types**: Extend base interfaces for consistency
   ```typescript
   interface MyComponentProps extends BaseProps {
     title: string;
     onAction: () => void;
   }
   ```

3. **Type API Responses**: Always type your API responses
   ```typescript
   const response: ApiResponse<GalleryItem[]> = await fetch('/api/gallery');
   ```

4. **Use Utility Types**: Leverage the provided utility types
   ```typescript
   type PartialUser = Optional<UserWithRole, 'name' | 'createdAt'>;
   type RequiredContact = RequiredFields<ContactFormData, 'name' | 'email'>;
   ```

### Type Safety Guidelines

- Replace all `any` types with specific interfaces
- Use proper generic constraints for reusable components
- Define event handler types explicitly
- Create specific types for component props
- Use union types for controlled values (e.g., `'admin' | 'user'`)

### Database Model Types

Database model types match the Prisma schema and include:
- `DatabaseUser` - User table structure
- `DatabaseInquiry` - Inquiry table structure  
- `DatabaseGalleryImage` - Gallery image table structure
- `DatabaseMenuItem` - Menu item table structure
- `DatabaseTestimonial` - Testimonial table structure

### Form Handling

The form types support various form patterns:
- Simple forms with `FormState<T>` and `FormActions<T>`
- Multi-step forms with `MultiStepFormState<T>`
- Dynamic forms with conditional fields
- Form builders for admin interfaces
- Validation with `ValidationRule` and `FieldValidation`

### Error Handling

Error types include:
- `ApiError` - Standard API error structure
- `ValidationError` - Form validation errors
- `AppError` - Application-level errors
- `ErrorBoundaryState` - React error boundary state

## Contributing

When adding new types:

1. Place them in the appropriate file (`api.ts`, `components.ts`, or `forms.ts`)
2. Export them from the main `index.ts` file
3. Add JSDoc comments for complex types
4. Follow the existing naming conventions
5. Avoid duplicating types across files
6. Test type compilation with `npx tsc --noEmit`

## Type Conflicts

If you encounter type conflicts:

1. Check if the type already exists in another file
2. Use more specific names to avoid conflicts
3. Consider using namespaces for related types
4. Update the main `index.ts` export strategy if needed