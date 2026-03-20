import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import UserMenu from './UserMenu';
import './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, user, getDisplayName, getAvatarUrl } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const closeUserMenu = () => {
    setShowUserMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <h1 className="brand-title">User Menu System</h1>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <a href="/" className="nav-link">Home</a>
          <a href="/dashboard" className="nav-link">Dashboard</a>
          <a href="/about" className="nav-link">About</a>
        </div>

        {/* User Section */}
        <div className="navbar-user">
          {isAuthenticated ? (
            <div className="user-section">
              <button
                className="user-button"
                onClick={toggleUserMenu}
                aria-label="User menu"
              >
                <img
                  src={getAvatarUrl()}
                  alt={getDisplayName()}
                  className="user-avatar"
                />
                <span className="user-name">{getDisplayName()}</span>
                <svg
                  className={`dropdown-arrow ${showUserMenu ? 'rotated' : ''}`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {showUserMenu && (
                <UserMenu onClose={closeUserMenu} />
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <a href="/login" className="auth-link login-link">Login</a>
              <a href="/register" className="auth-link register-link">Register</a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showUserMenu && (
        <div
          className="navbar-overlay"
          onClick={closeUserMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;
