import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUserCog,
  FaCreditCard,
  FaBuilding,
  FaUsers,
  FaFileInvoice,
  FaChartLine,
  FaMoneyBillWave,
  FaProjectDiagram,
  FaEnvelope,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaSearch,
  FaHome
} from 'react-icons/fa';

export default function ModernDesktopSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin',
      icon: FaTachometerAlt,
      color: 'from-blue-500 to-cyan-500',
      description: 'Tableau de bord principal'
    },
    {
      id: 'clients',
      label: 'Clients',
      path: '/admin/clients',
      icon: FaUsers,
      color: 'from-purple-500 to-pink-500',
      description: 'Gestion des clients'
    },
    {
      id: 'projects',
      label: 'Projets',
      path: '/admin/projects',
      icon: FaProjectDiagram,
      color: 'from-green-500 to-emerald-500',
      description: 'Gestion des projets'
    },
    {
      id: 'payments',
      label: 'Paiements',
      path: '/admin/payments',
      icon: FaCreditCard,
      color: 'from-yellow-500 to-orange-500',
      description: 'Historique des paiements'
    },
    {
      id: 'invoices',
      label: 'Factures',
      path: '/admin/invoices',
      icon: FaFileInvoice,
      color: 'from-indigo-500 to-purple-500',
      description: 'Gestion des factures'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/admin/analytics',
      icon: FaChartLine,
      color: 'from-emerald-500 to-teal-500',
      description: 'Tableau de bord analytique en temps réel avec visualisations avancées et rapports automatisés'
    },
    {
      id: 'finance',
      label: 'Finance',
      path: '/admin/finance',
      icon: FaMoneyBillWave,
      color: 'from-cyan-500 to-blue-500',
      description: 'Rapports financiers'
    },
    {
      id: 'messaging',
      label: 'Messages',
      path: '/admin/messaging',
      icon: FaEnvelope,
      color: 'from-pink-500 to-rose-500',
      description: 'Centre de messagerie'
    },
    {
      id: 'profile',
      label: 'Profil',
      path: '/admin/profile',
      icon: FaUser,
      color: 'from-gray-500 to-slate-500',
      description: 'Paramètres du profil'
    }
  ];

  const filteredItems = navigationItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed Right Sidebar - Collapsible Icons */}
      <motion.div
        className="hidden lg:block fixed right-0 top-16 z-40"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, delay: 0.5 }}
      >
        <div className="relative flex">
          {/* Collapsed Icons Bar */}
          <motion.div
            className="flex flex-col items-center py-4 bg-dark-200/90 backdrop-blur-xl border-l border-white/10 shadow-2xl rounded-l-2xl"
            animate={{
              width: isExpanded ? 0 : 60,
              opacity: isExpanded ? 0 : 1
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="space-y-3">
              {navigationItems.slice(0, 8).map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setIsExpanded(true)}
                    className={`group relative w-12 h-12 rounded-xl transition-all duration-300 overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30'
                        : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Hover Background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-400 rounded-r-full"
                        layoutId="activeIndicator"
                      />
                    )}

                    {/* Icon */}
                    <motion.div
                      className={`w-full h-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white`
                          : 'text-gray-300 group-hover:text-white'
                      }`}
                      whileHover={{ rotate: 5 }}
                    >
                      <Icon className="text-lg" />
                    </motion.div>

                    {/* Tooltip */}
                    <motion.div
                      className="absolute right-full mr-3 px-3 py-2 bg-dark-200/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
                      initial={{ x: 10 }}
                      whileHover={{ x: 0 }}
                    >
                      <div className="text-sm font-semibold text-white">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.description}</div>
                      {/* Arrow */}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-dark-200/95 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Expanded Full Sidebar */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="relative"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Animated Background Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-l-2xl blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />

                {/* Sidebar Container */}
                <motion.div
                  className="relative bg-dark-200/90 backdrop-blur-xl border-l border-white/10 rounded-l-2xl p-4 shadow-2xl max-h-[calc(100vh-6rem)] overflow-y-auto w-80"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Header */}
                  <div className="mb-4 pb-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <FaBuilding className="text-white text-sm" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Dashboard Admin</div>
                        <div className="text-xs text-gray-400">Navigation complète</div>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setIsExpanded(false)}
                      className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTimes className="text-sm" />
                    </motion.button>
                  </div>

                  {/* Navigation Items */}
                  <div className="space-y-2">
                    {/* Home Button */}
                    <motion.button
                      onClick={() => handleNavigation('/')}
                      className={`group relative w-full p-3 rounded-xl transition-all duration-300 overflow-hidden ${
                        location.pathname === '/'
                          ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30'
                          : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Hover Background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      />

                      {/* Active Indicator */}
                      {location.pathname === '/' && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-400 rounded-r-full"
                          layoutId="activeIndicator"
                        />
                      )}

                      <div className="relative flex items-center gap-3">
                        {/* Icon */}
                        <motion.div
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            location.pathname === '/'
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                              : 'bg-white/10 text-gray-300 group-hover:bg-white/20 group-hover:text-white'
                          }`}
                          whileHover={{ rotate: 5 }}
                        >
                          <FaHome className="text-sm" />
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 text-left">
                          <div className={`font-semibold text-sm transition-colors ${
                            location.pathname === '/' ? 'text-white' : 'text-gray-300 group-hover:text-white'
                          }`}>
                            Site Principal
                          </div>
                          <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                            Retour au site web
                          </div>
                        </div>

                        {/* Chevron */}
                        <motion.div
                          className={`text-gray-500 group-hover:text-white transition-colors ${
                            location.pathname === '/' ? 'text-purple-400' : ''
                          }`}
                          whileHover={{ x: 3 }}
                        >
                          <FaChevronRight className="text-xs" />
                        </motion.div>
                      </div>

                      {/* Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                      />
                    </motion.button>

                    {filteredItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;

                      return (
                        <motion.button
                          key={item.id}
                          onClick={() => handleNavigation(item.path)}
                          className={`group relative w-full p-3 rounded-xl transition-all duration-300 overflow-hidden ${
                            isActive
                              ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30'
                              : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Hover Background */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                          />

                          {/* Active Indicator */}
                          {isActive && (
                            <motion.div
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-400 rounded-r-full"
                              layoutId="activeIndicator"
                            />
                          )}

                          <div className="relative flex items-center gap-3">
                            {/* Icon */}
                            <motion.div
                              className={`p-2 rounded-lg transition-all duration-300 ${
                                isActive
                                  ? `bg-gradient-to-r ${item.color} text-white`
                                  : 'bg-white/10 text-gray-300 group-hover:bg-white/20 group-hover:text-white'
                              }`}
                              whileHover={{ rotate: 5 }}
                            >
                              <Icon className="text-sm" />
                            </motion.div>

                            {/* Content */}
                            <div className="flex-1 text-left">
                              <div className={`font-semibold text-sm transition-colors ${
                                isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                              }`}>
                                {item.label}
                              </div>
                              <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                {item.description}
                              </div>
                            </div>

                            {/* Chevron */}
                            <motion.div
                              className={`text-gray-500 group-hover:text-white transition-colors ${
                                isActive ? 'text-purple-400' : ''
                              }`}
                              whileHover={{ x: 3 }}
                            >
                              <FaChevronRight className="text-xs" />
                            </motion.div>
                          </div>

                          {/* Shine Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                          />
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Bottom Branding */}
                  <motion.div
                    className="mt-6 pt-4 border-t border-white/10 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="text-xs text-gray-500 mb-1">Powered by</div>
                    <div className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      MUAMOKEL TECH
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-6 z-50 lg:hidden w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg flex items-center justify-center text-white backdrop-blur-sm border border-white/10"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes className="text-lg" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaBars className="text-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Mobile Sidebar */}
            <motion.div
              className="absolute left-0 top-0 h-full w-80 bg-dark-200/95 backdrop-blur-xl border-r border-white/10 shadow-2xl"
              variants={{
                closed: {
                  x: '-100%',
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 40
                  }
                },
                open: {
                  x: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 40
                  }
                }
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <FaBuilding className="text-white text-lg" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">MUAMOKEL</div>
                      <div className="text-sm text-gray-400">Dashboard Admin</div>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTimes />
                  </motion.button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="p-6 border-b border-white/10">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Navigation Items */}
              <div className="p-6 space-y-4">
                {/* Home Button */}
                <motion.button
                  onClick={() => handleNavigation('/')}
                  className={`group w-full p-4 rounded-xl transition-all duration-300 text-left ${
                    location.pathname === '/'
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30'
                      : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                  }`}
                  variants={{
                    closed: {
                      x: -50,
                      opacity: 0
                    },
                    open: {
                      x: 0,
                      opacity: 1
                    }
                  }}
                  initial="closed"
                  animate="open"
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        location.pathname === '/'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                          : 'bg-white/10 text-gray-300 group-hover:bg-white/20 group-hover:text-white'
                      }`}
                      whileHover={{ rotate: 5 }}
                    >
                      <FaHome className="text-xl" />
                    </motion.div>

                    <div className="flex-1">
                      <div className={`font-semibold transition-colors ${
                        location.pathname === '/' ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        Site Principal
                      </div>
                      <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                        Retour au site web
                      </div>
                    </div>

                    <motion.div
                      className={`text-gray-500 group-hover:text-white transition-colors ${
                        location.pathname === '/' ? 'text-blue-400' : ''
                      }`}
                      whileHover={{ x: 3 }}
                    >
                      <FaChevronRight />
                    </motion.div>
                  </div>
                </motion.button>

                {filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigation(item.path)}
                      className={`group w-full p-4 rounded-xl transition-all duration-300 text-left ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30'
                          : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                      }`}
                      variants={{
                        closed: {
                          x: -50,
                          opacity: 0
                        },
                        open: {
                          x: 0,
                          opacity: 1
                        }
                      }}
                      initial="closed"
                      animate="open"
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          className={`p-3 rounded-lg transition-all duration-300 ${
                            isActive
                              ? `bg-gradient-to-r ${item.color} text-white`
                              : 'bg-white/10 text-gray-300 group-hover:bg-white/20 group-hover:text-white'
                          }`}
                          whileHover={{ rotate: 5 }}
                        >
                          <Icon className="text-xl" />
                        </motion.div>

                        <div className="flex-1">
                          <div className={`font-semibold transition-colors ${
                            isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                          }`}>
                            {item.label}
                          </div>
                          <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                            {item.description}
                          </div>
                        </div>

                        <motion.div
                          className={`text-gray-500 group-hover:text-white transition-colors ${
                            isActive ? 'text-blue-400' : ''
                          }`}
                          whileHover={{ x: 3 }}
                        >
                          <FaChevronRight />
                        </motion.div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* User Section */}
              <div className="absolute bottom-24 left-6 right-6">
                <div className="space-y-2">
                  <button className="w-full p-3 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-3 text-left">
                    <FaUser className="text-gray-400" />
                    <span className="text-gray-300">Profil</span>
                  </button>
                  <button className="w-full p-3 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-3 text-left">
                    <FaBell className="text-gray-400" />
                    <span className="text-gray-300">Notifications</span>
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
                  </button>
                  <button className="w-full p-3 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-3 text-left">
                    <FaCog className="text-gray-400" />
                    <span className="text-gray-300">Paramètres</span>
                  </button>
                  <button className="w-full p-3 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-3 text-left text-red-400">
                    <FaSignOutAlt className="text-red-400" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>

              {/* Bottom Branding */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-500 mb-1">Powered by</div>
                  <div className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    MUAMOKEL TECH
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
