// Application constants and configuration

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
export const API_TIMEOUT = 30000; // 30 seconds

// Authentication
export const TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const USER_KEY = 'user_data';

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  GUEST: 'guest'
};

// User Status
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended'
};

// Activity Types
export const ACTIVITY_TYPES = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  VIEW: 'view',
  EXPORT: 'export'
};

// Pagination
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  MAX_FILES: 5
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255,
  DESCRIPTION_MAX_LENGTH: 1000,
  AMOUNT_MIN: 0.01,
  AMOUNT_MAX: 999999.99
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard',
  MANAGER_DASHBOARD: '/manager/dashboard',
  USER_DASHBOARD: '/user/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  USERS: '/admin/users',
  ACTIVITIES: '/admin/activities'
};

// Themes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

// Languages
export const LANGUAGES = {
  EN: { code: 'en', name: 'English' },
  FR: { code: 'fr', name: 'Français' },
  ES: { code: 'es', name: 'Español' },
  DE: { code: 'de', name: 'Deutsch' }
};

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  ISO: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  DATETIME: 'YYYY-MM-DD HH:mm:ss'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed limit.',
  INVALID_FILE_TYPE: 'File type is not supported.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logout successful!',
  PROFILE_UPDATED: 'Profile updated successfully.',
  SETTINGS_SAVED: 'Settings saved successfully.',
  USER_CREATED: 'User created successfully.',
  USER_UPDATED: 'User updated successfully.',
  USER_DELETED: 'User deleted successfully.',
  DATA_EXPORTED: 'Data exported successfully.'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
  SETTINGS: 'settings'
};

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#2563eb',
  SECONDARY: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#3b82f6',
  LIGHT: '#f3f4f6',
  DARK: '#1f2937'
};

// Table Columns
export const USER_TABLE_COLUMNS = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'lastLogin', label: 'Last Login', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false }
];

export const ACTIVITY_TABLE_COLUMNS = [
  { key: 'timestamp', label: 'Time', sortable: true },
  { key: 'user', label: 'User', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'description', label: 'Description', sortable: false },
  { key: 'ip', label: 'IP Address', sortable: false }
];

// Filter Options
export const USER_FILTERS = {
  ROLE: [
    { value: '', label: 'All Roles' },
    { value: USER_ROLES.ADMIN, label: 'Admin' },
    { value: USER_ROLES.MANAGER, label: 'Manager' },
    { value: USER_ROLES.USER, label: 'User' }
  ],
  STATUS: [
    { value: '', label: 'All Statuses' },
    { value: USER_STATUS.ACTIVE, label: 'Active' },
    { value: USER_STATUS.INACTIVE, label: 'Inactive' },
    { value: USER_STATUS.PENDING, label: 'Pending' },
    { value: USER_STATUS.SUSPENDED, label: 'Suspended' }
  ]
};

export const ACTIVITY_FILTERS = {
  TYPE: [
    { value: '', label: 'All Types' },
    { value: ACTIVITY_TYPES.LOGIN, label: 'Login' },
    { value: ACTIVITY_TYPES.LOGOUT, label: 'Logout' },
    { value: ACTIVITY_TYPES.CREATE, label: 'Create' },
    { value: ACTIVITY_TYPES.UPDATE, label: 'Update' },
    { value: ACTIVITY_TYPES.DELETE, label: 'Delete' }
  ],
  DATE_RANGE: [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ]
};

// Permissions
export const PERMISSIONS = {
  USER_MANAGEMENT: 'user_management',
  ROLE_MANAGEMENT: 'role_management',
  ACTIVITY_LOGGING: 'activity_logging',
  SYSTEM_ADMIN: 'system_admin',
  DATA_EXPORT: 'data_export'
};

// Role Permissions Mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.USER_MANAGEMENT,
    PERMISSIONS.ROLE_MANAGEMENT,
    PERMISSIONS.ACTIVITY_LOGGING,
    PERMISSIONS.SYSTEM_ADMIN,
    PERMISSIONS.DATA_EXPORT
  ],
  [USER_ROLES.MANAGER]: [
    PERMISSIONS.USER_MANAGEMENT,
    PERMISSIONS.ACTIVITY_LOGGING,
    PERMISSIONS.DATA_EXPORT
  ],
  [USER_ROLES.USER]: [
    // Basic user permissions
  ],
  [USER_ROLES.GUEST]: [
    // Guest permissions
  ]
};

// System Settings
export const SYSTEM_SETTINGS = {
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  PASSWORD_RESET_TIMEOUT: 15 * 60 * 1000, // 15 minutes
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  MAINTENANCE_MODE: false
};
