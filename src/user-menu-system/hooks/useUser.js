import { useState, useEffect, useCallback } from 'react';
import userService from '../services/userService';
import { useNotification } from '../context/NotificationContext';

export const useUser = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { error: showError, success: showSuccess } = useNotification();

  // Get all users (Admin only)
  const fetchUsers = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await userService.getAllUsers(filters);
      setUsers(response.data || response);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch users';
      setError(errorMessage);
      showError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  // Get user by ID
  const fetchUserById = useCallback(async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await userService.getUserById(userId);
      setCurrentUser(response.data || response);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch user';
      setError(errorMessage);
      showError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  // Update user
  const updateUser = useCallback(async (userId, userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await userService.updateUser(userId, userData);

      // Update local state
      setUsers(prev => prev.map(user =>
        user.id === userId ? { ...user, ...userData } : user
      ));

      if (currentUser?.id === userId) {
        setCurrentUser(prev => ({ ...prev, ...userData }));
      }

      showSuccess('User updated successfully');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update user';
      setError(errorMessage);
      showError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [currentUser, showError, showSuccess]);

  // Delete user
  const deleteUser = useCallback(async (userId) => {
    setLoading(true);
    setError(null);

    try {
      await userService.deleteUser(userId);

      // Remove from local state
      setUsers(prev => prev.filter(user => user.id !== userId));

      showSuccess('User deleted successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete user';
      setError(errorMessage);
      showError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  // Assign role to user
  const assignRole = useCallback(async (userId, roleId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await userService.assignRole(userId, roleId);

      // Update local state
      setUsers(prev => prev.map(user =>
        user.id === userId ? response.data || response : user
      ));

      showSuccess('Role assigned successfully');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to assign role';
      setError(errorMessage);
      showError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  // Remove role from user
  const removeRole = useCallback(async (userId, roleId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await userService.removeRole(userId, roleId);

      // Update local state
      setUsers(prev => prev.map(user =>
        user.id === userId ? response.data || response : user
      ));

      showSuccess('Role removed successfully');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to remove role';
      setError(errorMessage);
      showError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  // Get user roles
  const getUserRoles = useCallback(async (userId) => {
    try {
      const response = await userService.getUserRoles(userId);
      return response.data || response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch user roles';
      showError(errorMessage);
      throw error;
    }
  }, [showError]);

  // Get user permissions
  const getUserPermissions = useCallback(async (userId) => {
    try {
      const response = await userService.getUserPermissions(userId);
      return response.data || response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch user permissions';
      showError(errorMessage);
      throw error;
    }
  }, [showError]);

  // Get all available roles
  const getAllRoles = useCallback(async () => {
    try {
      const response = await userService.getAllRoles();
      return response.data || response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch roles';
      showError(errorMessage);
      throw error;
    }
  }, [showError]);

  // Get user statistics
  const fetchUserStats = useCallback(async () => {
    try {
      const response = await userService.getUserStats();
      setUserStats(response.data || response);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch user stats';
      showError(errorMessage);
      throw error;
    }
  }, [showError]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    users,
    currentUser,
    userStats,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser,
    assignRole,
    removeRole,
    getUserRoles,
    getUserPermissions,
    getAllRoles,
    fetchUserStats,
    clearError
  };
};
