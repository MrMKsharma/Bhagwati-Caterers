// Re-export all types from different modules for easy importing
// Note: Some types may have conflicts, so we'll export them selectively

// Export all API types
export * from './api';

// Export component types (avoiding conflicts)
export type {
  BaseProps,
  LayoutProps,
  NavigationProps,
  NavigationItem,
  ModalProps,
  DialogProps,
  FormFieldProps,
  InputProps,
  TextAreaProps,
  SelectProps,
  SelectOption,
  ButtonProps,
  CardProps,
  TableProps,
  TableColumn,
  PaginationProps,
  LoadingSpinnerProps,
  ErrorMessageProps,
  ToastProps,
  ImageProps,
  GalleryProps,
  GalleryImage,
  SearchProps,
  FilterProps,
  Filter,
  ComponentFilterOption,
  BreadcrumbProps,
  TabsProps,
  Tab,
  AccordionProps,
  AccordionItem,
  ThemeProviderProps,
  AuthProviderProps,
  HeaderProps,
  FooterProps,
  FooterSection,
  FooterLink,
  SocialLink,
  AdminSidebarProps,
  StatsCardProps,
  DataTableProps,
  FormProps,
  FieldGroupProps,
  VideoPlayerProps,
  AudioPlayerProps
} from './components';

// Export form types (avoiding conflicts with API types)
export type {
  BaseFormData,
  ValidationRule,
  FieldValidation,
  ValidationErrors,
  FormState,
  FormActions,
  UseFormReturn,
  FormFieldRegistration,
  LoginFormData,
  RegisterFormData,
  PasswordResetFormData,
  ChangePasswordFormData,
  ProfileFormData,
  MenuItemFormData,
  PackageFormData,
  GalleryImageFormData,
  UserFormData,
  TestimonialAdminFormData,
  FormFieldType,
  FormField,
  FormFieldOption,
  FormSection,
  FormSchema,
  FormSubmitEvent,
  FormChangeEvent,
  FormFocusEvent,
  FormKeyEvent,
  FormChangeHandler,
  FormFieldChangeHandler,
  FormValidationHandler,
  FormContextValue,
  FormStep,
  MultiStepFormState,
  MultiStepFormActions,
  UseMultiStepFormReturn,
  FormWizardStep,
  FormWizardProps,
  DynamicFormField,
  FormFieldCondition,
  DynamicFormSchema,
  FormBuilderField,
  FormBuilderSection,
  FormBuilderSchema
} from './forms';

// Common utility types
export type Nullable<T> = T | null;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Status and state types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated?: Date;
};

// Common ID types
export type ID = string | number;
export type UUID = string;

// Date and time types
export type DateString = string; // ISO date string
export type TimeString = string; // ISO time string
export type DateTimeString = string; // ISO datetime string

// File and media types
export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface ImageInfo extends FileInfo {
  width: number;
  height: number;
  aspectRatio: number;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// API response wrapper types
export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
  meta?: Record<string, unknown>;
}

export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: Record<string, unknown>;
}

export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// Search and filter types
export interface SearchParams {
  query?: string;
  filters?: Record<string, unknown>;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'date' | 'boolean';
  options?: FilterOption[];
  min?: number;
  max?: number;
}

// Theme and styling types
export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'orange' | 'blue' | 'green' | 'red' | 'purple' | 'gray';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

// Layout types
export type LayoutType = 'default' | 'centered' | 'sidebar' | 'full-width';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Permission and role types
export type Role = 'admin' | 'manager' | 'staff' | 'user';
export type Permission = string;
export type Resource = string;
export type Action = 'create' | 'read' | 'update' | 'delete' | 'manage';

export interface RolePermissions {
  role: Role;
  permissions: Permission[];
  resources: Record<Resource, Action[]>;
}

// Event types
export interface CustomEvent<T = unknown> {
  type: string;
  data: T;
  timestamp: Date;
  source?: string;
}

export type EventHandler<T = unknown> = (event: CustomEvent<T>) => void;
export type EventListener<T = unknown> = {
  type: string;
  handler: EventHandler<T>;
};

// Configuration types
export interface AppConfig {
  name: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: Record<string, boolean>;
  theme: {
    mode: ThemeMode;
    colorScheme: ColorScheme;
  };
}

// Analytics and tracking types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
}

export interface PageView {
  path: string;
  title: string;
  referrer?: string;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
}

// Error types
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  details?: Record<string, unknown>;
  timestamp: Date;
}

export interface ValidationError extends AppError {
  field: string;
  value: unknown;
  constraint: string;
}

// Cache types
export interface CacheEntry<T = unknown> {
  key: string;
  value: T;
  expiresAt: Date;
  createdAt: Date;
}

export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number;
  strategy?: 'lru' | 'fifo' | 'lifo';
}

// WebSocket types
export interface WebSocketMessage<T = unknown> {
  type: string;
  data: T;
  id?: string;
  timestamp: Date;
}

export type WebSocketEventType = 'open' | 'close' | 'error' | 'message';
export type WebSocketHandler = (event: Event | MessageEvent | CloseEvent) => void;

// Geolocation types
export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  formatted?: string;
}

export interface Location {
  coordinates: Coordinates;
  address?: Address;
  timestamp: Date;
}

// Device and browser types
export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  os: string;
  browser: string;
  version: string;
  userAgent: string;
}

export interface BrowserCapabilities {
  webp: boolean;
  avif: boolean;
  serviceWorker: boolean;
  pushNotifications: boolean;
  geolocation: boolean;
  camera: boolean;
  microphone: boolean;
}

// Notification types
export interface NotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  data?: Record<string, unknown>;
  actions?: NotificationAction[];
  silent?: boolean;
  requireInteraction?: boolean;
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

// Internationalization types
export type Locale = string;
export type TranslationKey = string;
export type TranslationValues = Record<string, string | number>;

export interface Translation {
  key: TranslationKey;
  value: string;
  locale: Locale;
  namespace?: string;
}

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  timeFormat: string;
  currency: string;
}

// SEO and meta types
export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

export interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  url: string;
  type: 'website' | 'article' | 'product';
  siteName: string;
  locale: string;
}

export interface TwitterCardData {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  title: string;
  description: string;
  image: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

// Performance types
export interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export interface ResourceTiming {
  name: string;
  duration: number;
  size: number;
  type: 'script' | 'stylesheet' | 'image' | 'font' | 'other';
}