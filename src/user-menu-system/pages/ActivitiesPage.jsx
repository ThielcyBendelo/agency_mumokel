import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useActivityLog } from '../hooks/useActivityLog';
import Badge from '../components/common/Badge';
import './ActivitiesPage.module.css';

const ActivitiesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { activities, fetchUserActivities, loading, exportActivities } = useActivityLog();

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    if (user?.id) {
      fetchUserActivities(user.id);
    }
  }, [user]);

  const activityTypes = [
    { value: 'all', label: 'All Activities', icon: '📊' },
    { value: 'login', label: 'Logins', icon: '🔐' },
    { value: 'logout', label: 'Logouts', icon: '🚪' },
    { value: 'view', label: 'Page Views', icon: '👁️' },
    { value: 'edit', label: 'Edits', icon: '✏️' },
    { value: 'create', label: 'Creations', icon: '➕' },
    { value: 'delete', label: 'Deletions', icon: '🗑️' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'type', label: 'By Type' }
  ];

  const filteredActivities = activities
    .filter(activity => {
      const matchesFilter = filter === 'all' || activity.type === filter;
      const matchesSearch = !searchQuery ||
        activity.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.type?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'oldest':
          return new Date(a.timestamp) - new Date(b.timestamp);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = async () => {
    try {
      await exportActivities({ filter, searchQuery }, 'json');
      alert('Activities exported successfully!');
    } catch (error) {
      alert('Failed to export activities. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/user-dashboard');
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'login': return '🔐';
      case 'logout': return '🚪';
      case 'view': return '👁️';
      case 'edit': return '✏️';
      case 'create': return '➕';
      case 'delete': return '🗑️';
      default: return '📝';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'login': return '#10b981';
      case 'logout': return '#ef4444';
      case 'view': return '#3b82f6';
      case 'edit': return '#f59e0b';
      case 'create': return '#8b5cf6';
      case 'delete': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="activities-page">
      <div className="activities-header">
        <div className="header-content">
          <h1>Activity Log</h1>
          <p>Track and monitor all your account activities and interactions</p>
        </div>
        <button
          className="btn btn-outline back-btn"
          onClick={handleBack}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="activities-container">
        {/* Filters and Controls */}
        <div className="activities-controls">
          <div className="control-group">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button className="search-btn">🔍</button>
            </div>
          </div>

          <div className="control-group">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              {activityTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              className="btn btn-secondary export-btn"
              onClick={handleExport}
            >
              📥 Export
            </button>
          </div>
        </div>

        {/* Activities List */}
        <div className="activities-content">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading your activities...</p>
            </div>
          ) : paginatedActivities.length > 0 ? (
            <>
              <div className="activities-summary">
                <p>
                  Showing {paginatedActivities.length} of {filteredActivities.length} activities
                  {filter !== 'all' && ` (${activityTypes.find(t => t.value === filter)?.label})`}
                </p>
              </div>

              <div className="activities-list">
                {paginatedActivities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      <span
                        className="icon-emoji"
                        style={{ backgroundColor: getActivityColor(activity.type) }}
                      >
                        {getActivityIcon(activity.type)}
                      </span>
                    </div>
                    <div className="activity-content">
                      <div className="activity-header">
                        <h4 className="activity-description">
                          {activity.description || 'Activity performed'}
                        </h4>
                        <Badge variant="info" size="sm">
                          {activity.type}
                        </Badge>
                      </div>
                      <div className="activity-meta">
                        <span className="activity-time">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                        {activity.ip && (
                          <span className="activity-ip">IP: {activity.ip}</span>
                        )}
                        {activity.userAgent && (
                          <span className="activity-device">
                            {activity.userAgent.includes('Mobile') ? '📱' : '💻'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="btn btn-outline pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </button>

                  <div className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </div>

                  <button
                    className="btn btn-outline pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <h3>No activities found</h3>
              <p>
                {searchQuery || filter !== 'all'
                  ? 'Try adjusting your search or filters to see more activities.'
                  : 'Your activity log will appear here as you use the platform.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
