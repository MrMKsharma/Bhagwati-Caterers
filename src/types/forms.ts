import { ReactNode } from 'react';

// Base form types
export interface BaseFormData {
  [key: string]: string | number | boolean | undefined | null | string[] | File | File[];
}

// Form validation types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | null;
}

export interface FieldValidation {
  [fieldName: string]: ValidationRule;
}

export interface ValidationErrors {
  [fieldName: string]: string;
}

// Form state types
export interface FormState<T extends BaseFormData = BaseFormData> {
  data: T;
  errors: ValidationErrors;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

export interface FormActions<T extends BaseFormData = BaseFormData> {
  setFieldValue: (field: keyof T, value: T[keyof T]) => void;
  setFieldError: (field: keyof T, error: string) => void;
  setFieldTouched: (field: keyof T, touched: boolean) => void;
  setErrors: (errors: Partial<ValidationErrors>) => void;
  clearErrors: () => void;
  reset: (data?: Partial<T>) => void;
  submit: () => Promise<void>;
  validate: (field?: keyof T) => boolean;
}

// Form hook return type
export interface UseFormReturn<T extends BaseFormData = BaseFormData> {
  state: FormState<T>;
  actions: FormActions<T>;
  register: (field: keyof T) => FormFieldRegistration;
  handleSubmit: (onSubmit: (data: T) => void | Promise<void>) => (event: React.FormEvent) => void;
}

export interface FormFieldRegistration {
  name: string;
  value: string | number | boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  touched: boolean;
}

// Note: ContactFormData, InquiryFormData, and TestimonialFormData are defined in api.ts
// to avoid duplication. Import them from there if needed.

export interface LoginFormData extends BaseFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData extends BaseFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: 'admin' | 'manager' | 'staff';
}

export interface PasswordResetFormData extends BaseFormData {
  email: string;
}

export interface ChangePasswordFormData extends BaseFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ProfileFormData extends BaseFormData {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: File;
}

// Admin form data types
export interface MenuItemFormData extends BaseFormData {
  name: string;
  description?: string;
  price?: number;
  category: string;
  image?: File;
  isVegetarian?: boolean;
  spiceLevel?: number;
}

export interface PackageFormData extends BaseFormData {
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
  image?: File;
  isActive: boolean;
  popular?: boolean;
  icon?: string;
  color?: string;
}

export interface GalleryImageFormData extends BaseFormData {
  title?: string;
  description?: string;
  image: File;
  category: string;
  subcategory?: string;
  tags?: string[];
  altText?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  sortOrder?: number;
}

export interface UserFormData extends BaseFormData {
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'manager' | 'staff';
}

export interface TestimonialAdminFormData extends BaseFormData {
  name: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  isApproved: boolean;
}

// Form field types
export type FormFieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'image'
  | 'range'
  | 'color'
  | 'hidden';

export interface FormField {
  name: string;
  label?: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  options?: FormFieldOption[];
  validation?: ValidationRule;
  description?: string;
  defaultValue?: string | number | boolean | string[];
  multiple?: boolean;
  accept?: string; // for file inputs
  min?: number;
  max?: number;
  step?: number;
  rows?: number; // for textarea
  cols?: number; // for textarea
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  prefix?: string;
  suffix?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
}

export interface FormFieldOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  description?: string;
}

// Form section types
export interface FormSection {
  title?: string;
  description?: string;
  fields: FormField[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
}

export interface FormSchema {
  title?: string;
  description?: string;
  sections: FormSection[];
  submitText?: string;
  cancelText?: string;
  resetText?: string;
  validation?: FieldValidation;
  onSubmit: (data: BaseFormData) => void | Promise<void>;
  onCancel?: () => void;
  onReset?: () => void;
}

// Form event types
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export type FormChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
export type FormFocusEvent = React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
export type FormKeyEvent = React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

// Note: FormSubmitHandler is defined in api.ts to avoid duplication
export type FormChangeHandler = (event: FormChangeEvent) => void;
export type FormFieldChangeHandler = (name: string, value: string | number | boolean | string[]) => void;
export type FormValidationHandler = (data: BaseFormData) => ValidationErrors;

// Form context types
export interface FormContextValue<T extends BaseFormData = BaseFormData> {
  state: FormState<T>;
  actions: FormActions<T>;
  schema?: FormSchema;
}

// Multi-step form types
export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  validation?: FieldValidation;
  optional?: boolean;
}

export interface MultiStepFormState<T extends BaseFormData = BaseFormData> extends FormState<T> {
  currentStep: number;
  completedSteps: number[];
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export interface MultiStepFormActions<T extends BaseFormData = BaseFormData> extends FormActions<T> {
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  completeStep: (step: number) => void;
}

export interface UseMultiStepFormReturn<T extends BaseFormData = BaseFormData> {
  state: MultiStepFormState<T>;
  actions: MultiStepFormActions<T>;
  steps: FormStep[];
  currentStepData: FormStep;
  progress: number;
}

// Form wizard types
export interface FormWizardStep extends FormStep {
  component?: React.ComponentType<Record<string, unknown>>;
  beforeNext?: (data: BaseFormData) => boolean | Promise<boolean>;
  beforePrevious?: (data: BaseFormData) => boolean | Promise<boolean>;
}

export interface FormWizardProps<T extends BaseFormData = BaseFormData> {
  steps: FormWizardStep[];
  initialData?: Partial<T>;
  onComplete: (data: T) => void | Promise<void>;
  onCancel?: () => void;
  validation?: FieldValidation;
  className?: string;
}

// Dynamic form types
export interface DynamicFormField extends FormField {
  conditions?: FormFieldCondition[];
  dependencies?: string[];
}

export interface FormFieldCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'in' | 'not_in';
  value: string | number | boolean | string[];
  action: 'show' | 'hide' | 'enable' | 'disable' | 'require' | 'optional';
}

export interface DynamicFormSchema extends Omit<FormSchema, 'sections'> {
  sections: Array<Omit<FormSection, 'fields'> & { fields: DynamicFormField[] }>;
}

// Form builder types
export interface FormBuilderField {
  id: string;
  type: FormFieldType;
  label: string;
  name: string;
  required: boolean;
  options?: FormFieldOption[];
  validation?: ValidationRule;
  settings?: Record<string, unknown>;
}

export interface FormBuilderSection {
  id: string;
  title: string;
  fields: FormBuilderField[];
}

export interface FormBuilderSchema {
  id: string;
  title: string;
  description?: string;
  sections: FormBuilderSection[];
  settings?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}