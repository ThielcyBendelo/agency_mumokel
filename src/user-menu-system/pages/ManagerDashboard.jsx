import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import { useActivityLog } from '../hooks/useActivityLog';
import { useNotification } from '../context/NotificationContext';
import UserProfileCard from '../components/user/UserProfileCard';
import Badge from '../components/common/Badge';
import './ManagerDashboard.module.css';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const { users, userStats, loading: usersLoading, fetchUsers, fetchUserStats } = useUser();
  const { activityStats, loading: activityLoading, fetchActivityStats } = useActivityLog();
  const { success, error } = useNotification();

  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      await Promise.all([
        fetchUsers({ role: 'user' }), // Only fetch regular users
        fetchUserStats(),
        fetchActivityStats()
      ]);
    } catch (err) {
      error('Failed to load dashboard data');
    }
  };

  const handleUserAction = async (action, userId) => {
    try {
      // Implement user actions (activate, deactivate, etc.)
      success(`${action} user successfully`);
      loadDashboardData(); // Refresh data
    } catch (err) {
      error(`Failed to ${action} user`);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    fetchUsers({ ...filters, ...newFilters, role: 'user' });
  };

  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{userStats?.totalUsers || 0}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{userStats?.activeUsers || 0}</h3>
            <p>Active Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{activityStats?.totalActivities || 0}</h3>
            <p>Total Activities</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>{activityStats?.todayActivities || 0}</h3>
            <p>Today's Activities</p>
          </div>
        </div>
      </div>

      <div className="recent-activities">
        <h3>Recent User Activities</h3>
        <div className="activity-list">
          {activityStats?.recentActivities?.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-content">
                <div className="activity-action">{activity.action}</div>
                <div className="activity-details">
                  {activity.user} - {activity.resource}
                </div>
                <div className="activity-time">{activity.timestamp}</div>
              </div>
            </div>
          )) || <p>No recent activities</p>}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="users-management">
      <div className="filters-section">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search users..."
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange({ status: e.target.value })}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="users-grid">
        {users?.filter(u => u.roles?.some(r => r.name === 'user')).map(user => (
          <UserProfileCard
            key={user.id}
            user={user}
            onAction={handleUserAction}
            showActions={true}
          />
        )) || <p>No users found</p>}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="reports-section">
      <div className="report-cards">
        <div className="report-card">
          <h3>User Activity Report</h3>
          <p>View detailed user activity logs and patterns</p>
          <button className="btn btn-primary">Generate Report</button>
        </div>

        <div className="report-card">
          <h3>User Performance Report</h3>
          <p>Analyze user engagement and performance metrics</p>
          <button className="btn btn-primary">Generate Report</button>
        </div>

        <div className="report-card">
          <h3>System Usage Report</h3>
          <p>Monitor system usage and resource consumption</p>
          <button className="btn btn-primary">Generate Report</button>
        </div>
      </div>
    </div>
  );

  if (usersLoading || activityLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="manager-dashboard">
      <div className="dashboard-header">
        <h1>Manager Dashboard</h1>
        <p>Welcome back, {user?.firstName || 'Manager'}!</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'reports' && renderReports()}
      </div>
    </div>
  );
};

export default ManagerDashboard;
