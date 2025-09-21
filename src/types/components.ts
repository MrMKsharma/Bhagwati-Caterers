import { ReactNode } from 'react';
import { CustomSession } from './api';

// Base component props that many components extend
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

// Layout component props
export interface LayoutProps extends BaseProps {
  title?: string;
  description?: string;
}

// Navigation component props
export interface NavigationProps {
  items: NavigationItem[];
  currentPath?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: ReactNode;
  badge?: string | number;
}

// Modal and Dialog props
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface DialogProps extends ModalProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'info' | 'warning' | 'error' | 'success';
}

// Form component props
export interface FormFieldProps extends BaseProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export interface InputProps extends FormFieldProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'date' | 'time';
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export interface TextAreaProps extends FormFieldProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  maxLength?: number;
}

export interface SelectProps extends FormFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  multiple?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Button component props
export interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// Card component props
export interface CardProps extends BaseProps {
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  actions?: ReactNode;
  hover?: boolean;
}

// Table component props
export interface TableProps<T = Record<string, unknown>> extends BaseProps {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  title: string;
  render?: (value: unknown, row: T) => ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

// Pagination component props
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
}

// Loading and Error component props
export interface LoadingSpinnerProps extends BaseProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export interface ErrorMessageProps extends BaseProps {
  message: string;
  title?: string;
  onRetry?: () => void;
  retryText?: string;
}

// Toast/Notification props
export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

// Image component props
export interface ImageProps extends BaseProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// Gallery component props
export interface GalleryProps extends BaseProps {
  images: GalleryImage[];
  columns?: number;
  spacing?: number;
  onImageClick?: (image: GalleryImage, index: number) => void;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  thumbnail?: string;
}

// Search component props
export interface SearchProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

// Filter component props
export interface FilterProps extends BaseProps {
  filters: Filter[];
  activeFilters: Record<string, unknown>;
  onFilterChange: (key: string, value: unknown) => void;
  onClearFilters: () => void;
}

export interface Filter {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'date' | 'checkbox';
  options?: ComponentFilterOption[];
  min?: number;
  max?: number;
}

export interface ComponentFilterOption {
  value: string;
  label: string;
  count?: number;
}

// Breadcrumb component props
export interface BreadcrumbProps extends BaseProps {
  items: Array<{
    label: string;
    href?: string;
    current?: boolean;
  }>;
  separator?: ReactNode;
}

// Tabs component props
export interface TabsProps extends BaseProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
}

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

// Accordion component props
export interface AccordionProps extends BaseProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

// Provider component props
export interface ThemeProviderProps extends BaseProps {
  theme?: 'light' | 'dark' | 'system';
  defaultTheme?: 'light' | 'dark';
}

export interface AuthProviderProps extends BaseProps {
  session?: CustomSession | null;
}

// Layout specific props
export interface HeaderProps extends BaseProps {
  logo?: ReactNode;
  navigation?: NavigationItem[];
  actions?: ReactNode;
  sticky?: boolean;
}

export interface FooterProps extends BaseProps {
  links?: FooterSection[];
  copyright?: string;
  socialLinks?: SocialLink[];
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: ReactNode;
}

// Admin specific component props
export interface AdminSidebarProps extends BaseProps {
  navigation: NavigationItem[];
  currentPath: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

export interface StatsCardProps extends BaseProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon?: ReactNode;
  color?: string;
}

export interface DataTableProps<T = Record<string, unknown>> extends TableProps<T> {
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  onSearch?: (query: string) => void;
  onFilter?: (filters: Record<string, unknown>) => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
}

// Form specific component props
export interface FormProps extends BaseProps {
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  validationSchema?: unknown;
  initialValues?: Record<string, unknown>;
}

export interface FieldGroupProps extends BaseProps {
  title?: string;
  description?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

// Media component props
export interface VideoPlayerProps extends BaseProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export interface AudioPlayerProps extends BaseProps {
  src: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}