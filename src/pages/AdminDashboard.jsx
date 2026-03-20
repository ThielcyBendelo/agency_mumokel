import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfessionalSidebar from '../components/ProfessionalSidebar';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import { FaUser, FaUsers, FaShieldAlt, FaCog, FaBell, FaChartLine, FaServer, FaClock } from 'react-icons/fa';

export default function AdminDashboard() {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [currentUser, setCurrentUser] = useState({
    name: 'Admin User',
    email: 'admin@muamokel.com',
    role: 'Administrator',
    avatar: '/api/placeholder/150/150',
    permissions: ['read', 'write', 'delete', 'admin']
  });

  const [teamMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Developer', status: 'active', lastActive: '2 hours ago' },
    { id: 2, name: 'Jane Smith', role: 'Designer', status: 'active', lastActive: '1 hour ago' },
    { id: 3, name: 'Bob Johnson', role: 'Manager', status: 'inactive', lastActive: '1 day ago' }
  ]);

  const stats = [
    { title: 'Total Users', value: '1,234', icon: FaUsers, color: 'blue' },
    { title: 'Active Projects', value: '56', icon: FaChartLine, color: 'green' },
    { title: 'System Health', value: '98%', icon: FaServer, color: 'purple' },
    { title: 'Pending Tasks', value: '23', icon: FaClock, color: 'orange' }
  ];

  const recentActivities = [
    { action: 'User login', user: 'john.doe', time: '2 minutes ago', type: 'auth' },
    { action: 'Project created', user: 'jane.smith', time: '15 minutes ago', type: 'project' },
    { action: 'Permission updated', user: 'admin', time: '1 hour ago', type: 'security' },
    { action: 'System backup', user: 'system', time: '2 hours ago', type: 'system' }
  ];

  const alerts = [
    { type: 'warning', message: 'High CPU usage detected', time: '5 minutes ago' },
    { type: 'info', message: 'New user registration', time: '10 minutes ago' },
    { type: 'error', message: 'Failed login attempt', time: '1 hour ago' }
  ];

  return (
    <>
      <ProfessionalSidebar />

      <div className="min-h-screen grid grid-cols-[1fr] grid-rows-[auto_1fr_auto] gap-0"
           style={{
             gridTemplateAreas: `
               "header"
               "main"
               "footer"
             `
           }}>

        <motion.header
          className="sticky top-0 z-50"
          style={{ gridArea: 'header' }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <NavbarSecured />
        </motion.header>

        <main className="relative overflow-hidden"
              style={{
                gridArea: 'main',
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gridTemplateRows: 'repeat(6, auto)',
                gridTemplateAreas: `
                  "profile profile profile profile stats stats stats stats alerts alerts alerts alerts"
                  "team team team team team team team team activities activities activities activities"
                  "permissions permissions permissions permissions permissions permissions system system system system system system"
                  "maintenance maintenance maintenance maintenance maintenance maintenance maintenance maintenance maintenance maintenance maintenance maintenance"
                  "logs logs logs logs logs logs logs logs logs logs logs logs"
                  "footer footer footer footer footer footer footer footer footer footer footer footer"
                `,
                gap: '1rem',
                padding: '2rem'
              }}>

          {/* Profile Section */}
          <motion.section
            style={{ gridArea: 'profile' }}
            className="bg-dark-200/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4">
              <img src={currentUser.avatar} alt="Profile" className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="text-xl font-bold text-white">{currentUser.name}</h3>
                <p className="text-gray-400">{currentUser.email}</p>
                <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {currentUser.role}
                </span>
              </div>
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            style={{ gridArea: 'stats' }}
            className="bg-dark-200/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className={`text-2xl text-${stat.color}-400 mb-2`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.title}</div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Alerts Section */}
          <motion.section
            style={{ gridArea: 'alerts' }}
            className="bg-dark-200/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Alerts</h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  alert.type === 'warning' ? 'bg-yellow-500/20 border border-yellow-500/50' :
                  alert.type === 'error' ? 'bg-red-500/20 border border-red-500/50' :
                  'bg-blue-500/20 border border-blue-500/50'
                }`}>
                  <p className="text-sm text-white">{alert.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Team Management Section */}
          <motion.section
            style={{ gridArea: 'team' }}
            className="bg-dark-200/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Team Management</h3>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-dark-300/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FaUser className="text-purple-400" />
                    <div>
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-gray-400 text-sm">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      member.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'
                    }`}>
                      {member.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{member.lastActive}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Recent Activities Section */}
          <motion.section
            style={{ gridArea: 'activities' }}
            className="bg-dark-200/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Recent Activities</h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-dark-300/50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'auth' ? 'bg-blue-400' :
                    activity.type === 'project' ? 'bg-green-400' :
                    activity.type === 'security' ? 'bg-red-400' : 'bg-purple-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-xs">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Permissions & Roles Section */}
          <motion.section
            style={{ gridArea: 'permissions' }}
            className="bg-dark-200/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Permissions & Roles</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-300 border border-purple-500/50 rounded-lg text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="admin">Administrator</option>
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {currentUser.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FaShieldAlt className="text-green-400 text-sm" />
                    <span className="text-sm text-gray-300 capitalize">{permission}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* System Status Section */}
          <motion.section
            style={{ gridArea: 'system' }}
            className="bg-dark-200/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Database</span>
                <span className="text-green-400">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">API Services</span>
                <span className="text-green-400">Running</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">File Storage</span>
                <span className="text-yellow-400">Maintenance</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email Service</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </motion.section>

          {/* Maintenance Section */}
          <motion.section
            style={{ gridArea: 'maintenance' }}
            className="bg-dark-200/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Maintenance</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors">
                <FaCog className="inline mr-2" />
                System Update
              </button>
              <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-colors">
                <FaServer className="inline mr-2" />
                Backup Data
              </button>
              <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors">
                <FaChartLine className="inline mr-2" />
                Generate Report
              </button>
              <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors">
                <FaBell className="inline mr-2" />
                Clear Cache
              </button>
            </div>
          </motion.section>

          {/* Logs Section */}
          <motion.section
            style={{ gridArea: 'logs' }}
            className="bg-dark-200/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">System Logs</h3>
            <div className="bg-dark-300/50 rounded-lg p-4 font-mono text-sm text-gray-300 max-h-32 overflow-y-auto">
              <div>[INFO] Server started successfully</div>
              <div>[WARN] High memory usage detected</div>
              <div>[INFO] User authentication successful</div>
              <div>[ERROR] Database connection timeout</div>
              <div>[INFO] Backup completed</div>
            </div>
          </motion.section>

        </main>

        <Footer />

      </div>
    </>
  );
}
