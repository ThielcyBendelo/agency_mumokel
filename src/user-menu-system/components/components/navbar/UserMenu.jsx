import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './UserMenu.module.css';

const UserMenu = ({ onClose }) => {
  const { user, logout, hasRole, hasPermission } = useAuth();
  const navigate = useNavigate();

  const handleMenuItemClick = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const menuItems = [
    {
      label: 'Profile',
      path: '/profile',
      icon: '👤',
      show: true
    },
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: '📊',
      show: true
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: '⚙️',
      show: true
    },
    {
      label: 'Admin Dashboard',
      path: '/admin',
      icon: '🛡️',
      show: hasRole('admin')
    },
    {
      label: 'Manager Dashboard',
      path: '/manager',
      icon: '👔',
      show: hasRole('manager')
    },
    {
      label: 'User Management',
      path: '/admin/users',
      icon: '👥',
      show: hasPermission('users.read')
    },
    {
      label: 'Activity Log',
      path: '/activity',
      icon: '📝',
      show: hasPermission('activity.read')
    }
  ];

  const visibleMenuItems = menuItems.filter(item => item.show);

  return (
    <div className="user-menu">
      <div className="user-menu-header">
        <div className="user-info">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.firstName + ' ' + user?.lastName)}&background=random`}
            alt={user?.firstName}
            className="user-menu-avatar"
          />
          <div className="user-details">
            <div className="user-name">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="user-email">{user?.email}</div>
            <div className="user-role">
              {user?.roles?.[0]?.displayName || 'User'}
            </div>
          </div>
        </div>
      </div>

      <div className="user-menu-body">
        <ul className="user-menu-list">
          {visibleMenuItems.map((item, index) => (
            <li key={index} className="user-menu-item">
              <button
                className="user-menu-button"
                onClick={() => handleMenuItemClick(item.path)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            </li>
          ))}

          <li className="user-menu-divider"></li>

          <li className="user-menu-item">
            <button
              className="user-menu-button user-menu-logout"
              onClick={handleLogout}
            >
              <span className="menu-icon">🚪</span>
              <span className="menu-label">Logout</span>
            </button>
          </li>
        </ul>
      </div>

      <div className="user-menu-footer">
        <div className="user-status">
          <span className={`status-indicator ${user?.status === 'active' ? 'active' : 'inactive'}`}></span>
          <span className="status-text">
            {user?.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>

        {user?.lastLoginAt && (
          <div className="last-login">
            Last login: {new Date(user.lastLoginAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
