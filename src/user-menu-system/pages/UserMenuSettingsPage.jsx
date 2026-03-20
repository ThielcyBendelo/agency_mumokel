import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../context/NotificationContext';
import Badge from '../components/common/Badge';
import './SettingsPage.module.css';

const SettingsPage = () => {
  const { user, updateProfile } = useAuth();
  const { success, error } = useNotification();

  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisibility: 'public',
      activityVisibility: 'friends'
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load user settings from localStorage or API
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: typeof prev[category] === 'object'
        ? { ...prev[category], [key]: value }
        : value
    }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));

      // Optionally save to API
      // await updateProfile({ settings });

      success('Settings saved successfully');
    } catch (err) {
      error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      theme: 'light',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisibility: 'public',
        activityVisibility: 'friends'
      }
    };
    setSettings(defaultSettings);
    localStorage.setItem('userSettings', JSON.stringify(defaultSettings));
    success('Settings reset to default');
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Customize your account preferences and privacy settings</p>
      </div>

      <div className="settings-content">
        {/* Appearance Settings */}
        <div className="settings-section">
          <h2>Appearance</h2>
          <div className="setting-group">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', null, e.target.value)}
              className="setting-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="setting-group">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              value={settings.language}
              onChange={(e) => handleSettingChange('language', null, e.target.value)}
              className="setting-select"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="setting-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
              />
              Email Notifications
            </label>
          </div>

          <div className="setting-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
              />
              Push Notifications
            </label>
          </div>

          <div className="setting-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
              />
              SMS Notifications
            </label>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="settings-section">
          <h2>Privacy</h2>
          <div className="setting-group">
            <label htmlFor="profileVisibility">Profile Visibility</label>
            <select
              id="profileVisibility"
              value={settings.privacy.profileVisibility}
              onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
              className="setting-select"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="setting-group">
            <label htmlFor="activityVisibility">Activity Visibility</label>
            <select
              id="activityVisibility"
              value={settings.privacy.activityVisibility}
              onChange={(e) => handleSettingChange('privacy', 'activityVisibility', e.target.value)}
              className="setting-select"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        {/* Account Information */}
        <div className="settings-section">
          <h2>Account Information</h2>
          <div className="account-info">
            <div className="info-row">
              <span className="info-label">Username:</span>
              <span className="info-value">{user?.username}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Role:</span>
              <div className="role-badges">
                {user?.roles?.map((role, index) => (
                  <Badge key={index} variant="primary">
                    {role.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="info-row">
              <span className="info-label">Member Since:</span>
              <span className="info-value">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="settings-actions">
          <button
            className="btn btn-secondary"
            onClick={handleResetSettings}
          >
            Reset to Default
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSaveSettings}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
