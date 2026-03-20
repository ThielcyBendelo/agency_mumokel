import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { activityService } from '../../services/activityService';
import './user.module.css';

const UserActivityLogModal = ({ user, isOpen, onClose }) => {
  const { hasRole } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    action: '',
    resource: ''
  });

  useEffect(() => {
    if (isOpen && user) {
      loadActivities();
    }
  }, [isOpen, user, page, filters]);

  const loadActivities = async () => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const response = await activityService.getUserActivity(user.id, {
        page,
        limit: 20,
        ...filters
      });

      if (page === 1) {
        setActivities(response.activities);
      } else {
        setActivities(prev => [...prev, ...response.activities]);
      }

      setHasMore(response.activities.length === 20);
    } catch (error) {
      console.error('Failed to load activities:', error);
      setError('Failed to load user activities');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (action) => {
    switch (action.toLowerCase()) {
      case 'login':
        return '🔐';
      case 'logout':
        return '🚪';
      case 'create':
        return '➕';
      case 'update':
        return '✏️';
      case 'delete':
        return '🗑️';
      case 'view':
        return '👁️';
      default:
        return '📝';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'severity-high';
      case 'medium':
        return 'severity-medium';
      case 'low':
        return 'severity-low';
      default:
        return 'severity-default';
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content activity-log-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Activity Log - {user.firstName} {user.lastName}</h3>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {/* Filters */}
          <div className="activity-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label>Start Date:</label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="filter-input"
                />
              </div>
              <div className="filter-group">
                <label>End Date:</label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="filter-input"
                />
              </div>
            </div>
            <div className="filter-row">
              <div className="filter-group">
                <label>Action:</label>
                <select
                  value={filters.action}
                  onChange={(e) => handleFilterChange('action', e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Actions</option>
                  <option value="login">Login</option>
                  <option value="logout">Logout</option>
                  <option value="create">Create</option>
                  <option value="update">Update</option>
                  <option value="delete">Delete</option>
                  <option value="view">View</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Resource:</label>
                <input
                  type="text"
                  value={filters.resource}
                  onChange={(e) => handleFilterChange('resource', e.target.value)}
                  placeholder="e.g., user, payment"
                  className="filter-input"
                />
              </div>
            </div>
          </div>

          {/* Activity List */}
          <div className="activity-list">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {activities.length === 0 && !loading && (
              <div className="no-activities">
                No activities found for this user.
              </div>
            )}

            {activities.map((activity, index) => (
              <div key={activity.id || index} className="activity-item">
                <div className="activity-icon">
                  {getActivityIcon(activity.action)}
                </div>
                <div className="activity-content">
                  <div className="activity-header">
                    <span className="activity-action">{activity.action}</span>
                    <span className={`activity-severity ${getSeverityColor(activity.severity)}`}>
                      {activity.severity}
                    </span>
                    <span className="activity-timestamp">
                      {formatDate(activity.timestamp)}
                    </span>
                  </div>
                  <div className="activity-details">
                    <span className="activity-resource">
                      Resource: {activity.resource}
                      {activity.resourceId && ` (${activity.resourceId})`}
                    </span>
                    {activity.details && Object.keys(activity.details).length > 0 && (
                      <div className="activity-metadata">
                        {Object.entries(activity.details).map(([key, value]) => (
                          <span key={key} className="metadata-item">
                            {key}: {String(value)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {activity.ipAddress && (
                    <div className="activity-meta">
                      IP: {activity.ipAddress}
                      {activity.userAgent && ` • ${activity.userAgent.substring(0, 50)}...`}
                    </div>
                  )}
                </div>
                <div className="activity-status">
                  <span className={`status-indicator ${activity.success ? 'success' : 'failure'}`}>
                    {activity.success ? '✓' : '✗'}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="loading-indicator">
                Loading activities...
              </div>
            )}
          </div>

          {/* Load More */}
          {hasMore && !loading && (
            <div className="load-more">
              <button
                className="btn-secondary"
                onClick={() => setPage(prev => prev + 1)}
              >
                Load More Activities
              </button>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserActivityLogModal;
