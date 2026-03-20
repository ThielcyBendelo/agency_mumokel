import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaCog, 
  FaTachometerAlt, 
  FaSignOutAlt, 
  FaBell,
  FaMoon,
  FaSun,
  FaChevronDown,
  FaCrown,
  FaUserShield
} from 'react-icons/fa';
import notificationService from '../services/notificationService';
import audioService from '../services/audioService';

export default function UserMenu({ user, onLogout, isAuthenticated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [notifications] = useState(3);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    audioService.playClick();
    notificationService.info(
      `Thème ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`,
      { autoClose: 2000 }
    );
  };

  const handleNavigation = (path, label) => {
    navigate(path);
    setIsOpen(false);
    audioService.playNavigate();
    notificationService.info(`Navigation vers ${label}...`, { autoClose: 2000 });
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await onLogout();
  };

  const getRoleBadge = () => {
    if (!user?.role) return null;
    
    const roleConfig = {
      admin: { icon: FaCrown, color: 'from-yellow-400 to-orange-500', label: 'Admin' },
      moderator: { icon: FaUserShield, color: 'from-blue-400 to-cyan-500', label: 'Modérateur' },
      client: { icon: FaUser, color: 'from-purple-400 to-pink-500', label: 'Client' }
    };

    const config = roleConfig[user.role.toLowerCase()] || roleConfig.client;
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${config.color} text-white text-xs font-bold`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </div>
    );
  };

  const getAvatar = () => {
    const initial = user?.email?.[0]?.toUpperCase() || user?.name?.[0]?.toUpperCase() || 'U';
    
    if (user?.photoURL) {
      return (
        <img 
          src={user.photoURL} 
          alt="Avatar" 
          className="w-10 h-10 rounded-full object-cover border-2 border-purple-400"
        />
      );
    }

    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white text-lg font-bold shadow-lg">
        {initial}
      </div>
    );
  };

  if (!isAuthenticated) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          audioService.playClick();
        }}
        onMouseEnter={() => audioService.playHover()}
        className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 hover:scale-105 active:scale-95"
      >
        <div className="relative">
          {getAvatar()}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse" />
        </div>

        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-semibold text-white">
            {user?.name || user?.email?.split('@')[0] || 'Utilisateur'}
          </span>
          <span className="text-xs text-gray-400">
            {user?.email?.substring(0, 20)}...
          </span>
        </div>

        <div
          className="transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <FaChevronDown className="h-4 w-4 text-gray-400" />
        </div>

        {notifications > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
            {notifications}
          </div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="absolute right-0 mt-3 w-80 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
            <div className="relative p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-gray-700/50">
              <div className="flex items-center gap-4">
                {getAvatar()}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">
                    {user?.name || user?.email?.split('@')[0] || 'Utilisateur'}
                  </h3>
                  <p className="text-sm text-gray-400 truncate">{user?.email}</p>
                  <div className="mt-2">{getRoleBadge()}</div>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button
                onClick={() => handleNavigation('/profile', 'Profil')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-xl transition-all duration-200 group hover:translate-x-1"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center group-hover:bg-purple-600/30 transition-colors">
                  <FaUser className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">Mon Profil</p>
                  <p className="text-xs text-gray-500">Gérer vos informations</p>
                </div>
              </button>

              <button
                onClick={() => handleNavigation('/dashboard', 'Dashboard')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-600/20 rounded-xl transition-all duration-200 group hover:translate-x-1"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                  <FaTachometerAlt className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">Dashboard</p>
                  <p className="text-xs text-gray-500">Tableau de bord</p>
                </div>
              </button>

              <button
                onClick={() => handleNavigation('/notifications', 'Notifications')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-yellow-600/20 rounded-xl transition-all duration-200 group hover:translate-x-1"
              >
                <div className="w-10 h-10 rounded-lg bg-yellow-600/20 flex items-center justify-center group-hover:bg-yellow-600/30 transition-colors relative">
                  <FaBell className="h-5 w-5 text-yellow-400" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                      {notifications}
                    </span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">Notifications</p>
                  <p className="text-xs text-gray-500">{notifications} nouvelles</p>
                </div>
              </button>

              <button
                onClick={() => handleNavigation('/settings', 'Paramètres')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-600/20 rounded-xl transition-all duration-200 group hover:translate-x-1"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-600/20 flex items-center justify-center group-hover:bg-gray-600/30 transition-colors">
                  <FaCog className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">Paramètres</p>
                  <p className="text-xs text-gray-500">Configuration</p>
                </div>
              </button>

              <div className="my-2 border-t border-gray-700/50" />

              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-indigo-600/20 rounded-xl transition-all duration-200 group hover:translate-x-1"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center group-hover:bg-indigo-600/30 transition-colors">
                  {theme === 'dark' ? (
                    <FaMoon className="h-5 w-5 text-indigo-400" />
                  ) : (
                    <FaSun className="h-5 w-5 text-yellow-400" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">Thème</p>
                  <p className="text-xs text-gray-500">
                    {theme === 'dark' ? 'Mode sombre' : 'Mode clair'}
                  </p>
                </div>
              </button>

              <div className="my-2 border-t border-gray-700/50" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-600/20 rounded-xl transition-all duration-200 group hover:translate-x-1"
              >
                <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                  <FaSignOutAlt className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">Déconnexion</p>
                  <p className="text-xs text-red-500/70">Se déconnecter du compte</p>
                </div>
              </button>
            </div>

            <div className="p-4 bg-gray-900/50 border-t border-gray-700/50 text-center">
              <p className="text-xs text-gray-500">
                Connecté depuis {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
