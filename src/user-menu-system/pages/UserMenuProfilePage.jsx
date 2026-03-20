import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../../contexts/NotificationsContext';
import Avatar from '../components/common/Avatar';
import Badge from '../components/common/Badge';
import './ProfilePage.module.css';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { addNotification } = useNotifications();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    avatar: null
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        avatar: user.avatar || null
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = new FormData();

      // Add text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'avatar' && formData[key]) {
          updateData.append(key, formData[key]);
        }
      });

      // Add avatar file if changed
      if (formData.avatar && formData.avatar instanceof File) {
        updateData.append('avatar', formData.avatar);
      }

      await updateProfile(updateData);
      addNotification({ message: 'Profile updated successfully', type: 'success' });
      setIsEditing(false);
    } catch (err) {
      addNotification({ message: 'Failed to update profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        avatar: user.avatar || null
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account information and preferences</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar-section">
            <Avatar
              src={formData.avatar instanceof File ? URL.createObjectURL(formData.avatar) : user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              size="xl"
              fallback={`${user.firstName?.[0]}${user.lastName?.[0]}`}
            />
            {isEditing && (
              <div className="avatar-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  id="avatar-input"
                  className="avatar-input"
                />
                <label htmlFor="avatar-input" className="avatar-upload-btn">
                  Change Photo
                </label>
              </div>
            )}
          </div>

          <div className="profile-info">
            <div className="profile-name">
              <h2>{user.firstName} {user.lastName}</h2>
              <div className="profile-roles">
                {user.roles?.map((role, index) => (
                  <Badge key={index} variant="primary">
                    {role.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="profile-status">
              <Badge variant={user.isActive ? 'success' : 'danger'}>
                {user.isActive ? 'Active' : 'Inactive'}
              </Badge>
              <span className="profile-email">{user.email}</span>
            </div>

            <div className="profile-actions">
              {!isEditing ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="profile-details">
          <div className="details-section">
            <h3>Personal Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <span>{user.firstName || 'Not provided'}</span>
                )}
              </div>

              <div className="detail-item">
                <label>Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <span>{user.lastName || 'Not provided'}</span>
                )}
              </div>

              <div className="detail-item">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <span>{user.email}</span>
                )}
              </div>

              <div className="detail-item">
                <label>Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <span>{user.phone || 'Not provided'}</span>
                )}
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3>Bio</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="form-textarea"
                rows="4"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="bio-text">{user.bio || 'No bio provided'}</p>
            )}
          </div>

          <div className="details-section">
            <h3>Account Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Username</label>
                <span>{user.username}</span>
              </div>

              <div className="detail-item">
                <label>Member Since</label>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="detail-item">
                <label>Last Login</label>
                <span>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</span>
              </div>

              <div className="detail-item">
                <label>Account Status</label>
                <Badge variant={user.isActive ? 'success' : 'danger'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
