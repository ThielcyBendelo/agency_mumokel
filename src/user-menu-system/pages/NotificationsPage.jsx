import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './NotificationsPage.module.css';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications data - in a real app, this would come from your backend
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'task',
        title: 'Task Completed',
        message: 'Your task "Update user profile" has been completed successfully.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        priority: 'normal',
        actionUrl: '/user-menu/tasks'
      },
      {
        id: 2,
        type: 'project',
        title: 'New Project Assigned',
        message: 'You have been assigned to the "Website Redesign" project.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        priority: 'high',
        actionUrl: '/user-menu/projects'
      },
      {
        id: 3,
        type: 'team',
        title: 'Team Member Joined',
        message: 'Alice Johnson has joined your team.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        read: true,
        priority: 'low',
        actionUrl: '/user-menu/team'
      },
      {
        id: 4,
        type: 'system',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur tonight from 2-4 AM EST.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        priority: 'urgent',
        actionUrl: null
      },
      {
        id: 5,
        type: 'task',
        title: 'Task Due Soon',
        message: 'Your task "Review quarterly reports" is due in 2 days.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: false,
        priority: 'high',
        actionUrl: '/user-menu/tasks'
      },
      {
        id: 6,
        type: 'project',
        title: 'Project Deadline Extended',
        message: 'The deadline for "Mobile App Development" has been extended by 1 week.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        read: true,
        priority: 'normal',
        actionUrl: '/user-menu/projects'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const notificationTypes = [
    { value: 'all', label: 'All Notifications', icon: '🔔' },
    { value: 'unread', label: 'Unread', icon: '🔴' },
    { value: 'task', label: 'Tasks', icon: '✅' },
    { value: 'project', label: 'Projects', icon: '📁' },
    { value: 'team', label: 'Team', icon: '👥' },
    { value: 'system', label: 'System', icon: '⚙️' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'task': return '✅';
      case 'project': return '📁';
      case 'team': return '👥';
      case 'system': return '⚙️';
      default: return '🔔';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'normal': return '#10b981';
      case 'low': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return '🚨';
      case 'high': return '⚠️';
      case 'normal': return 'ℹ️';
      case 'low': return '📝';
      default: return '📝';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const handleDeleteNotification = (notificationId) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const handleBack = () => {
    navigate('/user-dashboard');
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div className="header-content">
          <h1>Notifications</h1>
          <p>Stay updated with your latest activities and important updates</p>
        </div>
        <div className="header-actions">
          <button
            className="btn btn-outline back-btn"
            onClick={handleBack}
          >
            ← Back to Dashboard
          </button>
          {unreadCount > 0 && (
            <button
              className="btn btn-secondary"
              onClick={handleMarkAllAsRead}
            >
              Mark All Read ({unreadCount})
            </button>
          )}
        </div>
      </div>

      <div className="notifications-container">
        {/* Filters */}
        <div className="notifications-filters">
          <div className="filter-tabs">
            {notificationTypes.map(type => (
              <button
                key={type.value}
                className={`filter-tab ${filter === type.value ? 'active' : ''}`}
                onClick={() => setFilter(type.value)}
              >
                <span className="filter-icon">{type.icon}</span>
                <span className="filter-label">{type.label}</span>
                {type.value === 'unread' && unreadCount > 0 && (
                  <span className="filter-count">{unreadCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="notification-icon">
                  <span className="type-icon">
                    {getTypeIcon(notification.type)}
                  </span>
                  {!notification.read && <span className="unread-dot"></span>}
                </div>

                <div className="notification-content">
                  <div className="notification-header">
                    <h4 className="notification-title">{notification.title}</h4>
                    <div className="notification-meta">
                      <span
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(notification.priority) }}
                      >
                        {getPriorityIcon(notification.priority)} {notification.priority}
                      </span>
                      <span className="notification-time">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                </div>

                <div className="notification-actions">
                  {!notification.read && (
                    <button
                      className="action-btn mark-read"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(notification.id);
                      }}
                      title="Mark as read"
                    >
                      ✓
                    </button>
                  )}
                  <button
                    className="action-btn delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNotification(notification.id);
                    }}
                    title="Delete notification"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                {filter === 'unread' ? '✅' : '🔔'}
              </div>
              <h3>
                {filter === 'unread'
                  ? 'No unread notifications'
                  : `No ${filter} notifications`
                }
              </h3>
              <p>
                {filter === 'unread'
                  ? 'You\'re all caught up!'
                  : `You don't have any ${filter} notifications yet.`
                }
              </p>
            </div>
          )}
        </div>

        {/* Notification Preferences */}
        <div className="preferences-section">
          <div className="preferences-header">
            <h3>Notification Preferences</h3>
            <p>Customize how you receive notifications</p>
          </div>

          <div className="preferences-grid">
            <div className="preference-item">
              <div className="preference-info">
                <h4>Email Notifications</h4>
                <p>Receive notifications via email</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="preference-item">
              <div className="preference-info">
                <h4>Push Notifications</h4>
                <p>Receive browser push notifications</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="preference-item">
              <div className="preference-info">
                <h4>Task Reminders</h4>
                <p>Get reminded about upcoming task deadlines</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="preference-item">
              <div className="preference-info">
                <h4>Team Updates</h4>
                <p>Notifications about team member activities</p>
              </div>
              <label className="toggle">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="preferences-actions">
            <button className="btn btn-primary">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
