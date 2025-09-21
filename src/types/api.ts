import { NextResponse } from 'next/server'

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Standard API Error Response
export interface ApiErrorResponse {
  error: string;
  code?: string;
  details?: Record<string, unknown>;
}

// Gallery Types
export interface GalleryItem {
  id: string;
  url: string;
  alt: string;
  category?: string;
  title?: string;
  description?: string;
}

// User Types
export interface UserWithRole {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Form Data Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Analytics Types
export interface AnalyticsData {
  totalUsers: number;
  totalInquiries: number;
  totalPackages: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
}

// Menu Item Types
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  category: string;
  image?: string;
  isVegetarian?: boolean;
  spiceLevel?: number;
}

// Package Types
export interface Package {
  id: string;
  name: string;
  englishName?: string;
  description: string;
  englishDescription?: string;
  price?: number;
  pricePerPerson: number;
  minGuests: number;
  maxGuests?: number;
  items: string;
  features?: string[];
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  popular?: boolean;
  icon?: string;
  color?: string;
}

// Extended Package interface for display purposes
export interface DisplayPackage extends Package {
  popular: boolean;
  icon: string;
  color: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  message: string;
  rating?: number;
  image?: string;
  createdAt: Date;
}

// Request/Response Types for specific endpoints
export interface CreateGalleryItemRequest {
  url: string;
  alt: string;
  category?: string;
  title?: string;
  description?: string;
}

// Inquiry Types
export interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  guestCount?: string;
  message: string;
  budget?: string;
  venue?: string;
}

export type CreateInquiryRequest = InquiryFormData

export interface InquiryResponse {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  eventType?: string | null;
  eventDate?: Date | null;
  guestCount?: number | null;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Gallery Types Extended
export interface CreateGalleryImageRequest {
  title?: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  category: string;
  subcategory?: string;
  tags?: string[];
  altText?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  sortOrder?: number | string;
  fileSize?: number | string;
  dimensions?: string;
}

export interface GalleryImageResponse {
  id: string;
  title?: string | null;
  description?: string | null;
  imageUrl: string;
  thumbnailUrl?: string | null;
  category: string;
  subcategory?: string | null;
  tags?: string | null;
  altText?: string | null;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder?: number | null;
  uploadedBy?: string | null;
  fileSize?: number | null;
  dimensions?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// User Management Types
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'staff';
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'admin' | 'manager' | 'staff';
}

export interface UserResponse {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics Types Extended
export interface AnalyticsOverview {
  totalInquiries: number;
  recentInquiries: number;
  weeklyInquiries: number;
  totalTestimonials: number;
  totalGalleryImages: number;
  totalMenuItems: number;
  totalPackages: number;
  conversionRate: number;
  responseRate: number;
  avgGuestCount: number;
}

export interface InquiryStatusCount {
  status: string;
  count: number;
}

export interface EventTypeCount {
  eventType: string | null;
  count: number;
}

export interface MonthlyTrend {
  month: string;
  count: number;
}

export interface PopularEvent {
  eventType: string | null;
  count: number;
  avgGuests: number;
}

export interface RecentActivity {
  id: string;
  name: string;
  eventType?: string | null;
  status: string;
  createdAt: Date;
}

export interface AnalyticsResponse {
  overview: AnalyticsOverview;
  inquiryStatusCounts: InquiryStatusCount[];
  eventTypeCounts: EventTypeCount[];
  monthlyTrends: MonthlyTrend[];
  popularEvents: PopularEvent[];
  recentActivity: RecentActivity[];
}

export interface CreateMenuItemRequest {
  name: string;
  description?: string;
  price?: number;
  category: string;
  image?: string;
  isVegetarian?: boolean;
  spiceLevel?: number;
}

export interface CreateTestimonialRequest {
  name: string;
  rating: string | number;
  comment: string;
  imageUrl?: string;
}

// Error Types
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth Types
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'manager' | 'staff';
  permissions?: string[];
}

// Session Types for NextAuth
export interface CustomSession {
  user: {
    id: string;
    email: string;
    name?: string | null;
    role: string;
  };
  expires: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  token?: string;
  expiresAt?: Date;
}

// Permission Check Types
export interface PermissionCheckResult {
  authorized: boolean;
  response?: NextResponse<ApiErrorResponse>;
  session?: {
    user: {
      id: string;
      email: string;
      name?: string;
      role: string;
    };
  };
  userRole?: 'admin' | 'manager' | 'staff';
}

// Handler Context Types
export interface ApiRouteContext {
  params?: Record<string, string>;
  session?: {
    user: {
      id: string;
      email: string;
      name?: string;
      role: string;
    };
  };
  userRole?: 'admin' | 'manager' | 'staff';
}

// API Route Handler Types
export type ApiRouteHandler = (
  request: Request,
  context?: ApiRouteContext
) => Promise<Response>;

export type ProtectedApiRouteHandler = (
  request: Request,
  context: ApiRouteContext & {
    session: NonNullable<ApiRouteContext['session']>;
    userRole: NonNullable<ApiRouteContext['userRole']>;
  }
) => Promise<Response>;

// React Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Form Event Handler Types
export type FormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
export type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type TextAreaChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type SelectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => void;
export type ButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

// Generic Form Data Type
export interface GenericFormData {
  [key: string]: string | number | boolean | undefined | null;
}

// Offline Form Types
export type OfflineFormData = GenericFormData

export interface PendingSubmission {
  id: string;
  data: OfflineFormData;
  timestamp: number;
  url: string;
  method: string;
}

export interface OfflineFormHookReturn {
  isOnline: boolean;
  pendingSubmissions: PendingSubmission[];
  addPendingSubmission: (data: OfflineFormData, url: string, method?: string) => void;
  removePendingSubmission: (id: string) => void;
  processPendingSubmissions: () => Promise<void>;
}

// Dashboard Stats Types
export interface DashboardStats {
  totalInquiries: number;
  newInquiries: number;
  totalMenuItems: number;
  totalPackages: number;
  recentInquiries: RecentInquiry[];
}

export interface RecentInquiry {
  id: string;
  name: string;
  eventType: string;
  createdAt: string;
  status: string;
}

// Testimonial Form Types
export interface TestimonialFormData {
  name: string;
  comment: string;
  imageUrl: string;
  rating: number;
}

// Contact Form Extended Types
export interface ExtendedContactFormData extends ContactFormData {
  eventType?: string;
  eventDate?: string;
  guestCount?: string;
  budget?: string;
  venue?: string;
}

// Gallery Filter Types
export type GalleryCategory = 'all' | 'wedding' | 'corporate' | 'birthday' | 'festival' | 'other';

// Menu Category Types
export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

// SEO Types
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  siteName?: string;
  locale?: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

// Structured Data Types
export interface BusinessStructuredData {
  type?: 'business' | 'restaurant' | 'service';
}

export interface ServiceStructuredData {
  services?: Array<{
    name: string;
    description: string;
    price?: string;
  }>;
}

export interface MenuStructuredData {
  menuItems?: Array<{
    name: string;
    description: string;
    price?: number;
    category: string;
  }>;
}

export interface ReviewStructuredData {
  reviews?: Array<{
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export interface BreadcrumbStructuredData {
  items: Array<{
    name: string;
    url: string;
  }>;
}

// Component Specific Props Types
export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface WhatsAppIconProps {
  className?: string;
  size?: number;
}

export interface ClientOnlyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface ProvidersProps {
  children: React.ReactNode;
  session?: CustomSession | null;
}

export interface AdminLayoutProps {
  children: React.ReactNode;
}

export interface PermissionWrapperProps {
  children: React.ReactNode;
  resource: string;
  action?: string;
  fallback?: React.ReactNode;
}

// Install Prompt Types
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Service Worker Types
export interface ServiceWorkerRegistrationWithSync extends ServiceWorkerRegistration {
  sync: {
    register: (tag: string) => Promise<void>;
  };
}

// Email Template Types
export interface EmailTemplateData {
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  guestCount?: string;
  message: string;
  budget?: string;
  venue?: string;
}

// Error Boundary Types
export interface ErrorInfo {
  componentStack: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Loading States
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Database Model Types (matching Prisma schema)
export interface DatabaseUser {
  id: string;
  email: string;
  name: string | null;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  eventType: string | null;
  eventDate: Date | null;
  guestCount: number | null;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseGalleryImage {
  id: string;
  title: string | null;
  description: string | null;
  imageUrl: string;
  thumbnailUrl: string | null;
  category: string;
  subcategory: string | null;
  tags: string | null;
  altText: string | null;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number | null;
  uploadedBy: string | null;
  fileSize: number | null;
  dimensions: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseMenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  category: string;
  image: string | null;
  isVegetarian: boolean | null;
  spiceLevel: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseTestimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  imageUrl: string | null;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}