import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import './user.module.css';

const UserProfileCard = ({
  user,
  onAction,
  showActions = false,
  compact = false
}) => {
  const { user: currentUser } = useAuth();

  // Early return if user is null or undefined
  if (!user) {
    return (
      <div className="user-profile-card">
        <div className="profile-header">
          <div className="profile-info">
            <h3>User not found</h3>
            <p className="profile-email">Unable to load user information</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAction = (action) => {
    if (onAction) {
      onAction(action, user.id);
    }
  };

  const canModifyUser = () => {
    if (!currentUser || !currentUser.roles) return false;
    const userRole = currentUser.roles.some(r => r.name === 'admin' || r.name === 'manager');
    const isSelf = currentUser.id === user.id;
    return userRole && !isSelf;
  };

  if (compact) {
    return (
      <div className="user-profile-card compact">
        <div className="profile-header">
          <Avatar
            src={user.avatar}
            alt={`${user.firstName || ''} ${user.lastName || ''}`}
            size="sm"
            fallback={`${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`}
          />
          <div className="profile-info">
            <h4>{user.firstName || 'Unknown'} {user.lastName || 'User'}</h4>
            <p>{user.email || 'No email'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-card">
      <div className="profile-header">
        <Avatar
          src={user.avatar}
          alt={`${user.firstName || ''} ${user.lastName || ''}`}
          size="lg"
          fallback={`${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`}
        />
        <div className="profile-info">
          <h3>{user.firstName || 'Unknown'} {user.lastName || 'User'}</h3>
          <p className="profile-email">{user.email || 'No email'}</p>
          <div className="profile-roles">
            {user.roles?.map((role, index) => (
              <Badge key={index} variant="primary">
                {role.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-row">
          <span className="detail-label">Status:</span>
          <Badge variant={user.isActive ? 'success' : 'danger'}>
            {user.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        <div className="detail-row">
          <span className="detail-label">Joined:</span>
          <span className="detail-value">
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Last Login:</span>
          <span className="detail-value">
            {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
          </span>
        </div>

        {user.phone && (
          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{user.phone}</span>
          </div>
        )}
      </div>

      {showActions && canModifyUser() && (
        <div className="profile-actions">
          <button
            className="btn btn-secondary"
            onClick={() => handleAction('edit')}
          >
            Edit
          </button>
          <button
            className={`btn ${user.isActive ? 'btn-warning' : 'btn-success'}`}
            onClick={() => handleAction(user.isActive ? 'deactivate' : 'activate')}
          >
            {user.isActive ? 'Deactivate' : 'Activate'}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleAction('delete')}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
