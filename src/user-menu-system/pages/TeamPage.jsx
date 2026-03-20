import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './TeamPage.module.css';

const TeamPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [teamMembers, setTeamMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Mock team data - in a real app, this would come from your backend
  useEffect(() => {
    const mockTeamMembers = [
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@company.com',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=random',
        status: 'active',
        lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        projects: 12,
        tasks: 45
      },
      {
        id: 2,
        name: 'Bob Smith',
        email: 'bob@company.com',
        role: 'manager',
        avatar: 'https://ui-avatars.com/api/?name=Bob+Smith&background=random',
        status: 'active',
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        projects: 8,
        tasks: 32
      },
      {
        id: 3,
        name: 'Carol Davis',
        email: 'carol@company.com',
        role: 'member',
        avatar: 'https://ui-avatars.com/api/?name=Carol+Davis&background=random',
        status: 'away',
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        projects: 5,
        tasks: 18
      },
      {
        id: 4,
        name: 'David Wilson',
        email: 'david@company.com',
        role: 'member',
        avatar: 'https://ui-avatars.com/api/?name=David+Wilson&background=random',
        status: 'offline',
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        projects: 3,
        tasks: 12
      }
    ];

    const mockInvitations = [
      {
        id: 1,
        email: 'eve@company.com',
        role: 'member',
        invitedBy: 'Alice Johnson',
        invitedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        status: 'pending'
      },
      {
        id: 2,
        email: 'frank@company.com',
        role: 'manager',
        invitedBy: 'Bob Smith',
        invitedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        status: 'pending'
      }
    ];

    setTeamMembers(mockTeamMembers);
    setInvitations(mockInvitations);
  }, []);

  const roles = [
    { value: 'all', label: 'All Roles', icon: '👥' },
    { value: 'admin', label: 'Admin', icon: '👑' },
    { value: 'manager', label: 'Manager', icon: '👔' },
    { value: 'member', label: 'Member', icon: '👤' }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return '#ef4444';
      case 'manager': return '#f59e0b';
      case 'member': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'away': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '🟢';
      case 'away': return '🟡';
      case 'offline': return '⚪';
      default: return '⚪';
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = !searchQuery ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleBack = () => {
    navigate('/user-dashboard');
  };

  const handleInviteMember = () => {
    setShowInviteModal(true);
  };

  const handleRemoveMember = (memberId) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(prev => prev.filter(member => member.id !== memberId));
    }
  };

  const handleResendInvitation = (invitationId) => {
    alert('Invitation resent successfully!');
  };

  const handleCancelInvitation = (invitationId) => {
    if (window.confirm('Are you sure you want to cancel this invitation?')) {
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
    }
  };

  return (
    <div className="team-page">
      <div className="team-header">
        <div className="header-content">
          <h1>Team Management</h1>
          <p>Manage your team members, roles, and permissions</p>
        </div>
        <div className="header-actions">
          <button
            className="btn btn-outline back-btn"
            onClick={handleBack}
          >
            ← Back to Dashboard
          </button>
          <button
            className="btn btn-primary"
            onClick={handleInviteMember}
          >
            ➕ Invite Member
          </button>
        </div>
      </div>

      <div className="team-container">
        {/* Team Overview */}
        <div className="team-overview">
          <div className="overview-cards">
            <div className="overview-card">
              <div className="card-icon">👥</div>
              <div className="card-content">
                <h3>{teamMembers.length}</h3>
                <p>Total Members</p>
              </div>
            </div>
            <div className="overview-card">
              <div className="card-icon">📧</div>
              <div className="card-content">
                <h3>{invitations.length}</h3>
                <p>Pending Invites</p>
              </div>
            </div>
            <div className="overview-card">
              <div className="card-icon">🟢</div>
              <div className="card-content">
                <h3>{teamMembers.filter(m => m.status === 'active').length}</h3>
                <p>Active Now</p>
              </div>
            </div>
            <div className="overview-card">
              <div className="card-icon">📊</div>
              <div className="card-content">
                <h3>{teamMembers.reduce((sum, m) => sum + m.projects, 0)}</h3>
                <p>Total Projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="team-members-section">
          <div className="section-header">
            <h2>Team Members</h2>
            <div className="filters">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button className="search-btn">🔍</button>
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="role-filter"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.icon} {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="members-grid">
            {filteredMembers.map(member => (
              <div key={member.id} className="member-card">
                <div className="member-header">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="member-avatar"
                  />
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-email">{member.email}</p>
                  </div>
                  <div className="member-status">
                    <span
                      className="status-indicator"
                      style={{ color: getStatusColor(member.status) }}
                    >
                      {getStatusIcon(member.status)}
                    </span>
                  </div>
                </div>

                <div className="member-details">
                  <div className="member-role">
                    <span
                      className="role-badge"
                      style={{ backgroundColor: getRoleColor(member.role) }}
                    >
                      {roles.find(r => r.value === member.role)?.icon} {member.role}
                    </span>
                  </div>

                  <div className="member-stats">
                    <div className="stat">
                      <span className="stat-value">{member.projects}</span>
                      <span className="stat-label">Projects</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{member.tasks}</span>
                      <span className="stat-label">Tasks</span>
                    </div>
                  </div>

                  <div className="member-activity">
                    <span className="last-active">
                      Last active: {member.lastActive.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="member-actions">
                  <button className="btn btn-outline btn-sm">
                    👁️ View Profile
                  </button>
                  <button className="btn btn-outline btn-sm">
                    ✏️ Edit Role
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Invitations */}
        {invitations.length > 0 && (
          <div className="invitations-section">
            <div className="section-header">
              <h2>Pending Invitations</h2>
            </div>

            <div className="invitations-list">
              {invitations.map(invitation => (
                <div key={invitation.id} className="invitation-card">
                  <div className="invitation-info">
                    <div className="invitation-email">{invitation.email}</div>
                    <div className="invitation-details">
                      Invited as {invitation.role} by {invitation.invitedBy} • {invitation.invitedAt.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="invitation-actions">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleResendInvitation(invitation.id)}
                    >
                      ↻ Resend
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCancelInvitation(invitation.id)}
                    >
                      ✕ Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Invite Modal Placeholder */}
      {showInviteModal && (
        <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Invite Team Member</h3>
              <button
                className="modal-close"
                onClick={() => setShowInviteModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Invite modal functionality would be implemented here.</p>
              <p>In a real application, this would include:</p>
              <ul>
                <li>Email input field</li>
                <li>Role selection dropdown</li>
                <li>Personal message textarea</li>
                <li>Send invitation button</li>
              </ul>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowInviteModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamPage;
