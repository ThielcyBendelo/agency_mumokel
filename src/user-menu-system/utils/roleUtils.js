// Role utility functions for managing user roles and permissions

export const ROLE_HIERARCHY = {
  guest: 0,
  user: 1,
  manager: 2,
  admin: 3
};

export const ROLE_NAMES = {
  guest: 'Guest',
  user: 'User',
  manager: 'Manager',
  admin: 'Administrator'
};

export const ROLE_COLORS = {
  guest: '#6b7280',
  user: '#10b981',
  manager: '#f59e0b',
  admin: '#ef4444'
};

/**
 * Check if a role has a specific permission
 * @param {string} role - The role name
 * @param {string} permission - The permission to check
 * @returns {boolean} - Whether the role has the permission
 */
export const hasPermission = (role, permission) => {
  const rolePermissions = getRolePermissions(role);
  return rolePermissions.includes(permission);
};

/**
 * Get all permissions for a specific role
 * @param {string} role - The role name
 * @returns {string[]} - Array of permissions
 */
export const getRolePermissions = (role) => {
  const permissions = {
    guest: [
      'view_public_content',
      'register_account'
    ],
    user: [
      'view_public_content',
      'view_own_profile',
      'edit_own_profile',
      'view_own_payments',
      'create_payments',
      'view_own_invoices',
      'download_own_invoices'
    ],
    manager: [
      'view_public_content',
      'view_own_profile',
      'edit_own_profile',
      'view_own_payments',
      'create_payments',
      'view_own_invoices',
      'download_own_invoices',
      'view_team_payments',
      'manage_team_users',
      'view_reports',
      'export_reports'
    ],
    admin: [
      'view_public_content',
      'view_own_profile',
      'edit_own_profile',
      'view_own_payments',
      'create_payments',
      'view_own_invoices',
      'download_own_invoices',
      'view_team_payments',
      'manage_team_users',
      'view_reports',
      'export_reports',
      'manage_all_users',
      'manage_roles',
      'view_system_logs',
      'manage_system_settings',
      'delete_users',
      'view_admin_dashboard'
    ]
  };

  return permissions[role] || [];
};

/**
 * Check if a role can perform an action on another role
 * @param {string} actorRole - The role performing the action
 * @param {string} targetRole - The role being acted upon
 * @returns {boolean} - Whether the action is allowed
 */
export const canActOnRole = (actorRole, targetRole) => {
  const actorLevel = ROLE_HIERARCHY[actorRole] || 0;
  const targetLevel = ROLE_HIERARCHY[targetRole] || 0;
  return actorLevel > targetLevel;
};

/**
 * Get the highest role from a list of roles
 * @param {string[]} roles - Array of role names
 * @returns {string} - The highest role
 */
export const getHighestRole = (roles) => {
  if (!roles || roles.length === 0) return 'guest';

  let highestRole = 'guest';
  let highestLevel = 0;

  roles.forEach(role => {
    const level = ROLE_HIERARCHY[role] || 0;
    if (level > highestLevel) {
      highestLevel = level;
      highestRole = role;
    }
  });

  return highestRole;
};

/**
 * Check if a user has any of the specified roles
 * @param {string[]} userRoles - User's roles
 * @param {string[]} requiredRoles - Required roles
 * @returns {boolean} - Whether user has any required role
 */
export const hasAnyRole = (userRoles, requiredRoles) => {
  if (!userRoles || !requiredRoles) return false;
  return requiredRoles.some(role => userRoles.includes(role));
};

/**
 * Check if a user has all of the specified roles
 * @param {string[]} userRoles - User's roles
 * @param {string[]} requiredRoles - Required roles
 * @returns {boolean} - Whether user has all required roles
 */
export const hasAllRoles = (userRoles, requiredRoles) => {
  if (!userRoles || !requiredRoles) return false;
  return requiredRoles.every(role => userRoles.includes(role));
};

/**
 * Get role display name
 * @param {string} role - The role name
 * @returns {string} - The display name
 */
export const getRoleDisplayName = (role) => {
  return ROLE_NAMES[role] || role;
};

/**
 * Get role color
 * @param {string} role - The role name
 * @returns {string} - The color hex code
 */
export const getRoleColor = (role) => {
  return ROLE_COLORS[role] || ROLE_COLORS.guest;
};

/**
 * Check if a role is administrative
 * @param {string} role - The role name
 * @returns {boolean} - Whether the role is administrative
 */
export const isAdminRole = (role) => {
  return ['admin', 'manager'].includes(role);
};

/**
 * Get all available roles
 * @returns {string[]} - Array of all role names
 */
export const getAllRoles = () => {
  return Object.keys(ROLE_HIERARCHY);
};

/**
 * Get roles that can be assigned by a specific role
 * @param {string} assignerRole - The role doing the assignment
 * @returns {string[]} - Array of assignable roles
 */
export const getAssignableRoles = (assignerRole) => {
  const assignerLevel = ROLE_HIERARCHY[assignerRole] || 0;
  return Object.keys(ROLE_HIERARCHY).filter(role => {
    const roleLevel = ROLE_HIERARCHY[role];
    return roleLevel < assignerLevel;
  });
};

/**
 * Validate role name
 * @param {string} role - The role name to validate
 * @returns {boolean} - Whether the role is valid
 */
export const isValidRole = (role) => {
  return Object.keys(ROLE_HIERARCHY).includes(role);
};

/**
 * Get role description
 * @param {string} role - The role name
 * @returns {string} - The role description
 */
export const getRoleDescription = (role) => {
  const descriptions = {
    guest: 'Limited access, can only view public content',
    user: 'Standard user with access to personal account features',
    manager: 'Can manage team members and view team reports',
    admin: 'Full system access with user and system management capabilities'
  };

  return descriptions[role] || 'Unknown role';
};
