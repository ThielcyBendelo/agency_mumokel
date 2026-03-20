 import { useState, useEffect, useCallback } from 'react';
import activityService from '../services/activityService';

export const useActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [activityStats, setActivityStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user activities
  const fetchUserActivities = useCallback(async (userId, filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await activityService.getUserActivity(userId, filters);
      setActivities(response.data || response);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch activities';
      setError(errorMessage);
      console.log('❌ ERROR:', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch recent activities
  const fetchRecentActivities = useCallback(async (limit = 10) => {
    setLoading(true);
    setError(null);

    try {
      const response = await activityService.getRecentActivities({ limit });
      setRecentActivities(response.data || response);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch recent activities';
      setError(errorMessage);
      console.log('❌ ERROR:', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch activity statistics
  const fetchActivityStats = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await activityService.getActivityStats(filters);
      setActivityStats(response.data || response);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch activity statistics';
      setError(errorMessage);
      console.log('❌ ERROR:', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Log custom activity
  const logActivity = useCallback(async (activityData) => {
    try {
      const response = await activityService.logActivity(activityData);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to log activity';
      console.log('❌ ERROR:', errorMessage);
      throw error;
    }
  }, []);

  // Export activities
  const exportActivities = useCallback(async (filters = {}, format = 'json') => {
    try {
      const response = await activityService.exportActivities(filters, format);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to export activities';
      console.log('❌ ERROR:', errorMessage);
      throw error;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Reset state
  const reset = useCallback(() => {
    setActivities([]);
    setRecentActivities([]);
    setActivityStats(null);
    setError(null);
  }, []);

  return {
    // State
    activities,
    recentActivities,
    activityStats,
    loading,
    error,

    // Actions
    fetchUserActivities,
    fetchRecentActivities,
    fetchActivityStats,
    logActivity,
    exportActivities,
    clearError,
    reset
  };
};
