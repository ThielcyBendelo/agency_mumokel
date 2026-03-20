import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../hooks/useUser';
import { useActivityLog } from '../../hooks/useActivityLog';
import UserProfileCard from './UserProfileCard';
import UserActivityLogModal from './UserActivityLogModal';
import './user.module.css';

const UserDashboard = () => {
  const { user, hasRole } = useAuth();
  const { userStats, loading: userLoading } = useUser();
  const { recentActivities, loading: activityLoading } = useActivityLog();
  const [showActivityModal, setShowActivityModal] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>{getGreeting()}, {user?.firstName}!</h1>
          <p className="welcome-date">Today is {formatDate(new Date())}</p>
        </div>
        <div className="user-quick-actions">
          <button
            className="btn-primary"
            onClick={() => setShowActivityModal(true)}
          >
            View Activity Log
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* User Profile Section */}
        <div className="dashboard-section">
          <h2>My Profile</h2>
          <UserProfileCard
            user={user}
            onEdit={() => {/* Handle edit */}}
          />
        </div>

        {/* Stats Section */}
        {hasRole('admin') && (
          <div className="dashboard-section">
            <h2>System Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>{userStats?.totalUsers || 0}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>{userStats?.activeUsers || 0}</h3>
                  <p>Active Users</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🔐</div>
                <div className="stat-content">
                  <h3>{userStats?.totalRoles || 0}</h3>
                  <p>Roles Defined</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-content">
                  <h3>{recentActivities?.length || 0}</h3>
                  <p>Recent Activities</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity Section */}
        <div className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-preview">
            {activityLoading ? (
              <div className="loading">Loading activities...</div>
            ) : recentActivities?.length > 0 ? (
              <div className="activity-list">
                {recentActivities.slice(0, 5).map((activity, index) => (
                  <div key={activity.id || index} className="activity-item">
                    <div className="activity-icon">
                      {activity.action === 'login' ? '🔐' :
                       activity.action === 'logout' ? '🚪' :
                       activity.action === 'create' ? '➕' :
                       activity.action === 'update' ? '✏️' :
                       activity.action === 'delete' ? '🗑️' : '📝'}
                    </div>
                    <div className="activity-content">
                      <div className="activity-action">{activity.action}</div>
                      <div className="activity-resource">{activity.resource}</div>
                      <div className="activity-time">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  className="btn-link"
                  onClick={() => setShowActivityModal(true)}
                >
                  View All Activities →
                </button>
              </div>
            ) : (
              <div className="no-activity">
                <p>No recent activity found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions-grid">
            <button className="action-card">
              <div className="action-icon">👤</div>
              <div className="action-content">
                <h4>Update Profile</h4>
                <p>Edit your personal information</p>
              </div>
            </button>

            <button className="action-card">
              <div className="action-icon">🔒</div>
              <div className="action-content">
                <h4>Change Password</h4>
                <p>Update your account security</p>
              </div>
            </button>

            <button className="action-card">
              <div className="action-icon">⚙️</div>
              <div className="action-content">
                <h4>Settings</h4>
                <p>Configure your preferences</p>
              </div>
            </button>

            {hasRole('admin') && (
              <button className="action-card">
                <div className="action-icon">👥</div>
                <div className="action-content">
                  <h4>User Management</h4>
                  <p>Manage system users</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Activity Log Modal */}
      <UserActivityLogModal
        user={user}
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
      />
    </div>
  );
};

export default UserDashboard;
