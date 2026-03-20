// Utility functions for formatting data

// Date formatting functions
export const formatDate = (date, format = 'short') => {
  if (!date) return 'N/A';

  const d = new Date(date);

  switch (format) {
    case 'short':
      return d.toLocaleDateString();
    case 'long':
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    case 'time':
      return d.toLocaleTimeString();
    case 'datetime':
      return d.toLocaleString();
    case 'iso':
      return d.toISOString().split('T')[0];
    default:
      return d.toLocaleDateString();
  }
};

export const formatRelativeTime = (date) => {
  if (!date) return 'N/A';

  const now = new Date();
  const d = new Date(date);
  const diffInSeconds = Math.floor((now - d) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return formatDate(d, 'short');
};

// Number formatting functions
export const formatNumber = (num, options = {}) => {
  if (num === null || num === undefined) return '0';

  const { decimals = 0, currency = false, compact = false } = options;

  if (currency) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals
    }).format(num);
  }

  if (compact) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: decimals
    }).format(num);
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
};

// Text formatting functions
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str, length = 50, suffix = '...') => {
  if (!str || str.length <= length) return str;
  return str.substring(0, length - suffix.length) + suffix;
};

export const slugify = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Array formatting functions
export const formatList = (arr, separator = ', ', lastSeparator = ' and ') => {
  if (!Array.isArray(arr) || arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return arr.join(lastSeparator);

  const allButLast = arr.slice(0, -1).join(separator);
  return `${allButLast}${lastSeparator}${arr[arr.length - 1]}`;
};

// File size formatting
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Phone number formatting
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Format US phone numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  // Format international numbers
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phone;
};

// Email formatting
export const formatEmail = (email) => {
  if (!email) return '';
  return email.toLowerCase().trim();
};

// URL formatting
export const formatUrl = (url) => {
  if (!url) return '';

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }

  return url;
};

// Status formatting
export const formatStatus = (status) => {
  if (!status) return 'Unknown';

  const statusMap = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    suspended: 'Suspended',
    deleted: 'Deleted'
  };

  return statusMap[status.toLowerCase()] || capitalize(status);
};

// Role formatting
export const formatRole = (role) => {
  if (!role) return 'User';

  const roleMap = {
    admin: 'Administrator',
    manager: 'Manager',
    user: 'User',
    guest: 'Guest'
  };

  return roleMap[role.toLowerCase()] || capitalize(role);
};

// Boolean formatting
export const formatBoolean = (value, options = {}) => {
  const { trueText = 'Yes', falseText = 'No' } = options;
  return value ? trueText : falseText;
};

// Percentage formatting
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '0%';
  return `${parseFloat(value).toFixed(decimals)}%`;
};

// Duration formatting
export const formatDuration = (seconds) => {
  if (!seconds || seconds < 0) return '0s';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(' ');
};

// Color formatting
export const formatColor = (color) => {
  if (!color) return '#000000';

  // If it's already a valid hex color, return it
  if (/^#[0-9A-F]{6}$/i.test(color)) return color;

  // Convert named colors to hex (basic mapping)
  const colorMap = {
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    yellow: '#FFFF00',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#808080',
    grey: '#808080'
  };

  return colorMap[color.toLowerCase()] || '#000000';
};
