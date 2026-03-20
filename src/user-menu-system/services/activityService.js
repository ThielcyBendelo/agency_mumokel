/**
 * Activity Service - Mock implementation for development
 * Handles user activity logging and retrieval
 */

class ActivityService {
  constructor() {
    this.activities = [];
    this.mockActivities = [
      {
        id: 1,
        userId: 1,
        type: 'login',
        description: 'User logged in successfully',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        metadata: { ip: '192.168.1.1', userAgent: 'Chrome/91.0' }
      },
      {
        id: 2,
        userId: 1,
        type: 'view',
        description: 'Viewed dashboard page',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
        metadata: { page: '/dashboard' }
      },
      {
        id: 3,
        userId: 1,
        type: 'edit',
        description: 'Updated profile information',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        metadata: { fields: ['firstName', 'lastName'] }
      },
      {
        id: 4,
        userId: 1,
        type: 'create',
        description: 'Created new project',
        timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
        metadata: { projectId: 123, projectName: 'New Project' }
      }
    ];
  }

  /**
   * Get user activities
   */
  async getUserActivity(userId, filters = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filter activities by user ID
    let userActivities = this.mockActivities.filter(activity => activity.userId === userId);

    // Apply filters
    if (filters.type) {
      userActivities = userActivities.filter(activity => activity.type === filters.type);
    }

    if (filters.limit) {
      userActivities = userActivities.slice(0, filters.limit);
    }

    // Sort by timestamp (newest first)
    userActivities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return {
      data: userActivities,
      total: userActivities.length,
      success: true
    };
  }

  /**
   * Get recent activities
   */
  async getRecentActivities(filters = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let activities = [...this.mockActivities];

    // Apply limit
    const limit = filters.limit || 10;
    activities = activities.slice(0, limit);

    // Sort by timestamp (newest first)
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return {
      data: activities,
      total: activities.length,
      success: true
    };
  }

  /**
   * Get activity statistics
   */
  async getActivityStats(filters = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    const activities = this.mockActivities;

    const stats = {
      totalActivities: activities.length,
      todayActivities: activities.filter(a =>
        new Date(a.timestamp).toDateString() === new Date().toDateString()
      ).length,
      thisWeekActivities: activities.filter(a => {
        const activityDate = new Date(a.timestamp);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return activityDate >= weekAgo;
      }).length,
      activityTypes: {
        login: activities.filter(a => a.type === 'login').length,
        view: activities.filter(a => a.type === 'view').length,
        edit: activities.filter(a => a.type === 'edit').length,
        create: activities.filter(a => a.type === 'create').length,
        delete: activities.filter(a => a.type === 'delete').length
      },
      success: true
    };

    return {
      data: stats,
      success: true
    };
  }

  /**
   * Log a new activity
   */
  async logActivity(activityData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const newActivity = {
      id: Date.now(),
      userId: activityData.userId,
      type: activityData.type,
      description: activityData.description,
      timestamp: new Date().toISOString(),
      metadata: activityData.metadata || {}
    };

    this.activities.push(newActivity);

    return {
      data: newActivity,
      success: true
    };
  }

  /**
   * Export activities
   */
  async exportActivities(filters = {}, format = 'json') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let activities = [...this.mockActivities];

    // Apply filters
    if (filters.userId) {
      activities = activities.filter(activity => activity.userId === filters.userId);
    }

    if (filters.type) {
      activities = activities.filter(activity => activity.type === filters.type);
    }

    if (filters.dateFrom) {
      activities = activities.filter(activity =>
        new Date(activity.timestamp) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      activities = activities.filter(activity =>
        new Date(activity.timestamp) <= new Date(filters.dateTo)
      );
    }

    // Format data based on requested format
    let exportData;
    let filename;
    let mimeType;

    switch (format.toLowerCase()) {
      case 'csv':
        exportData = this.convertToCSV(activities);
        filename = 'activities.csv';
        mimeType = 'text/csv';
        break;
      case 'json':
      default:
        exportData = JSON.stringify(activities, null, 2);
        filename = 'activities.json';
        mimeType = 'application/json';
        break;
    }

    // Create download link (in browser environment)
    if (typeof window !== 'undefined') {
      const blob = new Blob([exportData], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    return {
      data: activities,
      filename,
      format,
      success: true
    };
  }

  /**
   * Convert activities to CSV format
   */
  convertToCSV(activities) {
    if (activities.length === 0) return '';

    const headers = ['ID', 'User ID', 'Type', 'Description', 'Timestamp', 'Metadata'];
    const rows = activities.map(activity => [
      activity.id,
      activity.userId,
      activity.type,
      activity.description,
      activity.timestamp,
      JSON.stringify(activity.metadata)
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    return csvContent;
  }

  /**
   * Clear all activities (for testing)
   */
  clearActivities() {
    this.activities = [];
  }

  /**
   * Get activity by ID
   */
  async getActivityById(activityId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const activity = this.mockActivities.find(a => a.id === activityId);

    if (!activity) {
      throw new Error('Activity not found');
    }

    return {
      data: activity,
      success: true
    };
  }
}

// Export singleton instance
const activityService = new ActivityService();
export default activityService;
