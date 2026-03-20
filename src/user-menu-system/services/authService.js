import api from './api';

class AuthService {
  // Login user
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  }

  // Register user
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }

  // Logout user
  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Refresh token
  async refreshToken() {
    const response = await api.post('/auth/refresh');
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  }

  // Get current user profile
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  }

  // Update user profile
  async updateProfile(userData) {
    const response = await api.put('/auth/profile', userData);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  }

  // Change password
  async changePassword(passwordData) {
    const response = await api.post('/auth/change-password', passwordData);
    return response.data;
  }

  // Verify email
  async verifyEmail(token) {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  }

  // Get user sessions
  async getSessions() {
    const response = await api.get('/auth/sessions');
    return response.data;
  }

  // Revoke session
  async revokeSession(sessionId) {
    const response = await api.delete(`/auth/sessions/${sessionId}`);
    return response.data;
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      // Basic token validation (you might want to decode and check expiry)
      return true;
    } catch {
      this.logout();
      return false;
    }
  }

  // Get stored user data
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get stored token
  getToken() {
    return localStorage.getItem('token');
  }

  // Check if user has specific role
  hasRole(role) {
    const user = this.getUser();
    if (!user || !user.roles) return false;
    return user.roles.some(userRole => userRole.name === role);
  }

  // Check if user has any of the specified roles
  hasAnyRole(roles) {
    return roles.some(role => this.hasRole(role));
  }

  // Get user display name
  getDisplayName() {
    const user = this.getUser();
    if (!user) return 'User';
    return user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.username || user.email || 'User';
  }

  // Get user avatar URL
  getAvatarUrl() {
    const user = this.getUser();
    return user?.avatar || '/default-avatar.png';
  }
}

export default new AuthService();
