import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import { useNotification } from '../../context/NotificationContext';
import { roleUtils } from '../../utils/roleUtils';
import Modal from '../modals/Modal';
import './user.module.css';

const UserSwitchRoleModal = ({ isOpen, onClose, user, onRoleSwitched }) => {
  const { user: currentUser } = useAuth();
  const { updateUser } = useUser();
  const { success, error } = useNotification();

  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableRoles, setAvailableRoles] = useState([]);

  useEffect(() => {
    if (user && isOpen) {
      // Get available roles that can be assigned by current user
      const assignableRoles = roleUtils.getAssignableRoles(currentUser?.roles?.[0]?.name || 'user');
      setAvailableRoles(assignableRoles);
      setSelectedRole(user.roles?.[0]?.name || '');
    }
  }, [user, isOpen, currentUser]);

  const handleRoleChange = async () => {
    if (!selectedRole || selectedRole === user.roles?.[0]?.name) {
      return;
    }

    setLoading(true);
    try {
      await updateUser(user.id, { role: selectedRole });
      success(`Role updated to ${roleUtils.getRoleDisplayName(selectedRole)}`);
      onRoleSwitched?.(user.id, selectedRole);
      onClose();
    } catch (err) {
      error('Failed to update user role');
    } finally {
      setLoading(false);
    }
  };

  const canModifyRole = () => {
    if (!currentUser || !user) return false;
    return roleUtils.canActOnRole(currentUser.roles?.[0]?.name, user.roles?.[0]?.name);
  };

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Switch User Role">
      <div className="role-switch-modal">
        <div className="user-info">
          <Avatar
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            size="md"
            fallback={`${user.firstName?.[0]}${user.lastName?.[0]}`}
          />
          <div className="user-details">
            <h4>{user.firstName} {user.lastName}</h4>
            <p>{user.email}</p>
            <div className="current-roles">
              Current role: <Badge variant="primary">{user.roles?.[0]?.name || 'user'}</Badge>
            </div>
          </div>
        </div>

        {canModifyRole() ? (
          <div className="role-selection">
            <label htmlFor="role-select">Select New Role:</label>
            <select
              id="role-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="role-select"
              disabled={loading}
            >
              {availableRoles.map(role => (
                <option key={role} value={role}>
                  {roleUtils.getRoleDisplayName(role)}
                </option>
              ))}
            </select>

            <div className="role-description">
              <p><strong>{roleUtils.getRoleDisplayName(selectedRole)}:</strong></p>
              <p>{roleUtils.getRoleDescription(selectedRole)}</p>
            </div>
          </div>
        ) : (
          <div className="permission-denied">
            <strong>Insufficient Permissions</strong>
            <p>You don't have permission to change this user's role.</p>
          </div>
        )}

        <div className="warning-message">
          <strong>Warning:</strong> Changing a user's role may affect their access to certain features and data.
          Please ensure this change is appropriate.
        </div>

        <div className="modal-actions">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          {canModifyRole() && (
            <button
              className="btn btn-primary"
              onClick={handleRoleChange}
              disabled={loading || !selectedRole || selectedRole === user.roles?.[0]?.name}
            >
              {loading ? 'Updating...' : 'Update Role'}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UserSwitchRoleModal;
