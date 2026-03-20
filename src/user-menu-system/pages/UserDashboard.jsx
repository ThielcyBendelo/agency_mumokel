import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useActivityLog } from '../hooks/useActivityLog';
import UserProfileCard from '../components/user/UserProfileCard';
import Badge from '../components/common/Badge';
import './UserDashboard.module.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { activities, fetchUserActivities, loading, exportActivities } = useActivityLog();

  const [stats, setStats] = useState({
    totalActivities: 0,
    todayActivities: 0,
    lastLogin: null,
    accountStatus: 'Active',
    weeklyGrowth: 0,
    completionRate: 0
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadDashboardData();

    // Update time every minute for dynamic greeting
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const loadDashboardData = async () => {
    try {
      if (user?.id) {
        await fetchUserActivities(user.id);
      }

      // Calculate enhanced stats
      const totalActivities = activities.length;
      const todayActivities = activities.filter(a =>
        new Date(a.timestamp).toDateString() === new Date().toDateString()
      ).length;

      const lastLogin = activities
        .filter(a => a.type === 'login')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

      // Calculate weekly growth (mock data for now)
      const weeklyGrowth = Math.floor(Math.random() * 20) + 5;

      // Calculate completion rate (mock data for now)
      const completionRate = Math.floor(Math.random() * 30) + 70;

      setStats({
        totalActivities,
        todayActivities,
        lastLogin: lastLogin ? new Date(lastLogin.timestamp) : null,
        accountStatus: user?.isActive ? 'Active' : 'Inactive',
        weeklyGrowth,
        completionRate
      });
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  const handleExportActivities = async () => {
    try {
      await exportActivities({}, 'json');
      alert('Activities exported successfully! Check your downloads folder.');
    } catch (err) {
      alert('Failed to export activities. Please try again.');
    }
  };

  const handleUpdateProfile = () => {
    navigate('/user-menu/profile');
  };

  const handleAccountSettings = () => {
    navigate('/user-menu/settings');
  };

  const handleCreateNewItem = () => {
    navigate('/user-menu/create');
  };

  const handleViewReports = () => {
    navigate('/user-menu/reports');
  };

  const handleContactSupport = () => {
    window.open('mailto:support@muamokel.com?subject=Support Request', '_blank');
  };

  const handleHelpDocumentation = () => {
    navigate('/user-menu/help');
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await logout();
        navigate('/login');
      } catch (err) {
        console.error('Logout failed:', err);
      }
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "The only way to do great work is to love what you do.",
      "Believe you can and you're halfway there.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "Your time is limited, so don't waste it living someone else's life."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  if (loading) {
    return (
      <div className="user-dashboard">
        <div className="loading-spinner">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.firstName || user?.name || 'User'}!</h1>
        <p>Here's an overview of your account and recent activities.</p>
      </div>

      {/* User Profile Section */}
      <div className="profile-section">
        <UserProfileCard user={user} showActions={false} />
        <div className="profile-actions">
          <button
            className="btn btn-primary"
            onClick={handleUpdateProfile}
          >
            ✏️ Update Profile
          </button>
          <button className="btn btn-secondary">
            ⚙️ Account Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.totalActivities}</h3>
            <p>Total Activities</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{stats.todayActivities}</h3>
            <p>Today's Activities</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🕒</div>
          <div className="stat-content">
            <h3>
              {stats.lastLogin
                ? stats.lastLogin.toLocaleDateString()
                : 'Never'
              }
            </h3>
            <p>Last Login</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            {stats.accountStatus === 'Active' ? '✅' : '❌'}
          </div>
          <div className="stat-content">
            <h3>
              <Badge variant={stats.accountStatus === 'Active' ? 'success' : 'danger'}>
                {stats.accountStatus}
              </Badge>
            </h3>
            <p>Account Status</p>
          </div>
        </div>
      </div>

      {/* Recent Activities with Enhanced Design */}
      <div className="dashboard-section activities-section">
        <div className="section-header">
          <div className="section-title">
            <h2>Recent Activities</h2>
            <p className="section-subtitle">Your latest actions and interactions</p>
          </div>
          <div className="section-actions">
            <button
              className="btn btn-secondary"
              onClick={handleExportActivities}
            >
              📥 Export Data
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate('/user-menu/activities')}
            >
              View All
            </button>
          </div>
        </div>
        <div className="activities-list">
          {activities.length > 0 ? (
            activities.slice(0, 8).map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'login' && '🔐'}
                  {activity.type === 'logout' && '🚪'}
                  {activity.type === 'view' && '👁️'}
                  {activity.type === 'edit' && '✏️'}
                  {activity.type === 'create' && '➕'}
                  {activity.type === 'delete' && '🗑️'}
                  {!['login', 'logout', 'view', 'edit', 'create', 'delete'].includes(activity.type) && '📝'}
                </div>
                <div className="activity-content">
                  <p className="activity-description">{activity.description || 'Activity performed'}</p>
                  <div className="activity-meta">
                    <span className="activity-time">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                    <Badge variant="info" size="sm">{activity.type}</Badge>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <h3>No activities yet</h3>
              <p>Start using the platform to see your activity history here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Quick Actions with Working Links */}
      <div className="dashboard-section quick-actions-section">
        <div className="section-header">
          <div className="section-title">
            <h2>Quick Actions</h2>
            <p className="section-subtitle">Frequently used features and tools</p>
          </div>
        </div>
        <div className="quick-actions-grid">
          <button
            className="action-card primary"
            onClick={handleCreateNewItem}
          >
            <div className="action-icon">📝</div>
            <div className="action-content">
              <h3>Create New Item</h3>
              <p>Add new content or data</p>
            </div>
            <div className="action-arrow">→</div>
          </button>

          <button
            className="action-card success"
            onClick={handleViewReports}
          >
            <div className="action-icon">📊</div>
            <div className="action-content">
              <h3>View Reports</h3>
              <p>Analytics and insights</p>
            </div>
            <div className="action-arrow">→</div>
          </button>

          <button
            className="action-card info"
            onClick={handleContactSupport}
          >
            <div className="action-icon">💬</div>
            <div className="action-content">
              <h3>Contact Support</h3>
              <p>Get help and assistance</p>
            </div>
            <div className="action-arrow">→</div>
          </button>

          <button
            className="action-card warning"
            onClick={handleHelpDocumentation}
          >
            <div className="action-icon">📚</div>
            <div className="action-content">
              <h3>Help & Documentation</h3>
              <p>Learn and get guidance</p>
            </div>
            <div className="action-arrow">→</div>
          </button>

          <button
            className="action-card secondary"
            onClick={() => navigate('/user-menu/notifications')}
          >
            <div className="action-icon">🔔</div>
            <div className="action-content">
              <h3>Notifications</h3>
              <p>Manage your alerts</p>
            </div>
            <div className="action-arrow">→</div>
          </button>

          <button
            className="action-card dark"
            onClick={() => navigate('/user-menu/team')}
          >
            <div className="action-icon">👥</div>
            <div className="action-content">
              <h3>Team Collaboration</h3>
              <p>Work with your team</p>
            </div>
            <div className="action-arrow">→</div>
          </button>
        </div>
      </div>

      {/* Account Summary */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Account Summary</h2>
        </div>
        <div className="account-summary">
          <div className="summary-item">
            <span className="summary-label">Username:</span>
            <span className="summary-value">{user?.username}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Email:</span>
            <span className="summary-value">{user?.email}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Role:</span>
            <div className="role-badges">
              {user?.roles?.map((role, index) => (
                <Badge key={index} variant="primary" size="sm">
                  {role.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="summary-item">
            <span className="summary-label">Member Since:</span>
            <span className="summary-value">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
