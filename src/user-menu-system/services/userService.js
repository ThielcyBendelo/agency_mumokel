import api from './api';

class UserService {
  // Get all users (Admin only)
  async getAllUsers(filters = {}) {
    const queryParams = new URLSearchParams();

    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.role) queryParams.append('role', filters.role);
    if (filters.status) queryParams.append('status', filters.status);

    const response = await api.get(`/users?${queryParams}`);
    return response.data;
  }

  // Get user by ID
  async getUserById(userId) {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  }

  // Update user
  async updateUser(userId, userData) {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  }

  // Delete user (Admin only)
  async deleteUser(userId) {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  }

  // Assign role to user (Admin only)
  async assignRole(userId, roleId) {
    const response = await api.post('/users/assign-role', { userId, roleId });
    return response.data;
  }

  // Remove role from user (Admin only)
  async removeRole(userId, roleId) {
    const response = await api.post('/users/remove-role', { userId, roleId });
    return response.data;
  }

  // Get user roles
  async getUserRoles(userId) {
    const response = await api.get(`/users/${userId}/roles`);
    return response.data;
  }

  // Get user permissions
  async getUserPermissions(userId) {
    const response = await api.get(`/users/${userId}/permissions`);
    return response.data;
  }

  // Get all available roles
  async getAllRoles() {
    const response = await api.get('/users/roles/all');
    return response.data;
  }

  // Get user statistics (Admin only)
  async getUserStats() {
    const response = await api.get('/users/stats');
    return response.data;
  }

  // Bulk operations (Admin only)
  async bulkUpdateUsers(userIds, updates) {
    const response = await api.post('/users/bulk-update', { userIds, updates });
    return response.data;
  }

  async bulkDeleteUsers(userIds) {
    const response = await api.post('/users/bulk-delete', { userIds });
    return response.data;
  }

  // User profile operations
  async updateProfile(userData) {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  }

  async changePassword(passwordData) {
    const response = await api.post('/auth/change-password', passwordData);
    return response.data;
  }

  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post('/users/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // User preferences
  async getUserPreferences() {
    const response = await api.get('/users/preferences');
    return response.data;
  }

  async updateUserPreferences(preferences) {
    const response = await api.put('/users/preferences', preferences);
    return response.data;
  }
}

export default new UserService();
