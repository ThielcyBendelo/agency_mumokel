import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaTachometerAlt, FaSignOutAlt, FaChevronDown, FaRocket, FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import notificationService from '../services/notificationService';
import audioService from '../services/audioService';
import analyticsService from '../services/analyticsService';
import { useAuth } from '../contexts/AuthContext';
import UserMenu from './UserMenu';
import ProfessionalSidebar from './ProfessionalSidebar';

export default function NavbarSecured({ onProfessionalMenuClick }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll detection for dynamic navbar behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Log après tous les hooks
  console.log('[NavbarSecured] Render:', { isAuthenticated, user });

  const toggleDropdown = (groupLabel) => {
    setOpenDropdown(openDropdown === groupLabel ? null : groupLabel);
  };

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    audioService.playClick();
    analyticsService.trackEvent('mobile_menu_toggle', {
      isOpen: newState,
      category: 'navigation',
    });
  };



  const handleDashboard = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
      setIsOpen(false);
      setOpenDropdown(null);
      audioService.playNavigate();
      notificationService.info('Redirection vers votre tableau de bord...', {
        autoClose: 2000,
      });
    } else {
      notificationService.warning(
        '🔐 Veuillez vous connecter pour accéder au dashboard',
        {
          autoClose: 3000,
        }
      );
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsOpen(false);
      setOpenDropdown(null);
      notificationService.success('✓ Déconnexion réussie', { autoClose: 2000 });
      navigate('/');
      audioService.playSuccess();
    } catch {
      notificationService.error('Erreur lors de la déconnexion', {
        autoClose: 3000,
      });
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    audioService.playClick();
    analyticsService.trackEvent('theme_toggle', {
      theme: newTheme,
      category: 'user_interface',
    });
    notificationService.info(
      `Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`,
      { autoClose: 2000, icon: newTheme === 'dark' ? '🌙' : '☀️' }
    );
  };

  const handleGetStarted = async () => {
    try {
      // Fermer le menu mobile si ouvert
      setIsOpen(false);
      setOpenDropdown(null);

      // Jouer le son de navigation
      audioService.playNavigate();

      // Analytics tracking
      analyticsService.trackEvent('get_started_click', {
        category: 'user_engagement',
        source: 'navbar',
        authenticated: isAuthenticated,
      });

      // Vérifier si l'utilisateur est déjà connecté
      if (isAuthenticated) {
        // Si connecté, rediriger vers le dashboard existant
        notificationService.info('Vous êtes déjà connecté ! Redirection vers votre tableau de bord...', {
          autoClose: 2000,
        });
        navigate('/dashboard');
        return;
      }

      // Redirection directe vers l'inscription classique
      // Le user-menu-system est maintenant intégré dans l'app principale
      notificationService.info('Redirection vers l\'inscription...', {
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate('/register');
      }, 500);

    } catch (error) {
      console.error('Erreur lors de la redirection Get Started:', error);
      notificationService.error('Une erreur est survenue. Veuillez réessayer.', {
        autoClose: 3000,
      });
    }
  };

  // Navigation items with improved structure
  const navGroups = [
    {
      label: 'Accueil',
      items: [
        {
          href: '/',
          label: 'Accueil',
        },
      ],
    },
    {
      label: 'À propos',
      items: [
        {
          href: '/about',
          label: 'À propos',
        },
      ],
    },
    {
      label: 'Nos services',
      items: [
        {
          href: '/services',
          label: 'Nos services',
        },
      ],
    },
    {
      label: 'Notre équipe',
      items: [
        {
          href: '/team',
          label: 'Notre équipe',
        },
      ],
    },
  ];

  return (
    <>
      <motion.nav
        className="sticky top-0 left-0 right-0 z-50 border-b border-purple-500/20"
        style={{
          background: isScrolled
            ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 50%, rgba(17, 24, 39, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(17, 24, 39, 0.85) 0%, rgba(31, 41, 55, 0.85) 50%, rgba(17, 24, 39, 0.85) 100%)',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(150%)',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(150%)',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 60px rgba(147, 51, 234, 0.1), 0 0 100px rgba(236, 72, 153, 0.05)'
            : '0 4px 20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        }}
        animate={{
          background: isScrolled
            ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 50%, rgba(17, 24, 39, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(17, 24, 39, 0.85) 0%, rgba(31, 41, 55, 0.85) 50%, rgba(17, 24, 39, 0.85) 100%)',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(150%)',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(150%)',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 60px rgba(147, 51, 234, 0.1), 0 0 100px rgba(236, 72, 153, 0.05)'
            : '0 4px 20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 min-h-[64px] items-center w-full">
            {/* Logo à gauche */}
            <div
              className="flex items-center cursor-pointer min-w-[160px] gap-2"
              onClick={() => {
                navigate('/');
                setIsOpen(false);
                setOpenDropdown(null);
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span
                className="text-xl font-bold text-white tracking-wide"
                style={{ fontFamily: 'Antonio, Saira, sans-serif' }}
              >
                Muamokel<span className="text-pink-400">.Tech</span>
              </span>
            </div>

            {/* Liens centrés */}
            <div className="hidden md:flex flex-1 justify-center items-center gap-6" ref={dropdownRef}>
              {navGroups.map((group) => (
                <div
                  key={group.label}
                  className="relative flex items-center h-full"
                >
                  {group.items.length > 1 ? (
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(group.label)}
                        className="flex items-center gap-2 px-4 py-2 text-white font-medium text-sm rounded-lg hover:bg-purple-600/20 transition-all duration-200 group"
                      >
                        {group.label}
                        <motion.div
                          animate={{ rotate: openDropdown === group.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaChevronDown className="h-3 w-3 text-gray-400 group-hover:text-purple-400 transition-colors" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {openDropdown === group.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[220px] bg-gray-800/95 backdrop-blur-md border border-purple-500/30 rounded-xl shadow-2xl z-20"
                          >
                            <div className="p-2">
                              {group.items.map((item, index) => (
                                <motion.div
                                  key={item.href}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <Link
                                    to={item.href}
                                    onClick={() => setOpenDropdown(null)}
                                    className="flex items-center gap-3 px-4 py-3 text-white hover:text-purple-400 hover:bg-purple-600/20 text-sm rounded-lg transition-all duration-200 font-medium group"
                                  >
                                    <span className="text-lg">{item.icon}</span>
                                    <span>{item.label}</span>
                                    <motion.div
                                      className="ml-auto w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                                      initial={{ scale: 0 }}
                                      whileHover={{ scale: 1 }}
                                    />
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={group.items[0].href}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-2 px-4 py-2 text-white bg-purple-600/20 hover:bg-purple-600/40 text-sm rounded-full transition-all duration-200 font-medium border border-purple-500/30 hover:border-purple-500/50"
                    >
                      {group.items[0].label}
                    </Link>
                  )}
                </div>
              ))}

              {isAuthenticated && user?.role === 'admin' && (
                <Link
                  to="/clients"
                  onClick={() => setOpenDropdown(null)}
                  className="flex items-center gap-2 px-4 py-2 text-white hover:text-purple-400 text-sm rounded-lg transition-colors font-medium"
                >
                  <span className="text-lg">👥</span>
                  Clients
                </Link>
              )}
            </div>

            {/* Boutons à droite */}
            <div className="flex items-center gap-2 md:ml-8 min-w-[220px] justify-end">
              {/* Get Started Button */}
              {!isAuthenticated && (
                <motion.button
                  onClick={handleGetStarted}
                  onMouseEnter={() => audioService.playHover()}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/40 transition-all text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Commencer maintenant"
                >
                  <FaRocket className="h-4 w-4" />
                  Get Started
                </motion.button>
              )}

              {/* Dashboard Button (Secure) */}
              {isAuthenticated && (
                <motion.button
                  onClick={handleDashboard}
                  onMouseEnter={() => audioService.playHover()}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/40 transition-all text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Accéder au tableau de bord"
                >
                  <FaTachometerAlt className="h-4 w-4" />
                  Dashboard
                </motion.button>
              )}



              {/* User Menu Professionnel */}
              {isAuthenticated ? (
                <UserMenu
                  user={user}
                  onLogout={handleLogout}
                  isAuthenticated={isAuthenticated}
                />
              ) : null}

              {/* Professional Menu Button */}
              <motion.button
                onClick={() => setIsProfessionalSidebarOpen(!isProfessionalSidebarOpen)}
                onMouseEnter={() => audioService.playHover()}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/40 transition-all text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Menu professionnel"
              >
                <FaBars className="h-4 w-4" />
                Menu Pro
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                onClick={toggleMenu}
                onMouseEnter={() => audioService.playHover()}
                className="flex md:hidden p-2 rounded-lg bg-gray-800/50 text-purple-400 hover:text-pink-400 hover:bg-gray-700/50 transition-all focus:outline-none border border-purple-500/20"
                aria-label="Ouvrir le menu mobile"
                aria-expanded={isOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="material-icons text-2xl"
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? 'close' : 'menu'}
                </motion.span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Menu mobile professionnel avec animation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setIsOpen(false)}
              />

              {/* Menu mobile slide-in */}
              <motion.nav
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 right-0 h-full w-80 max-w-full bg-gray-900/95 backdrop-blur-md shadow-2xl z-50 border-l border-purple-500/30"
                role="navigation"
                aria-label="Menu principal mobile"
              >
                {/* Bouton fermeture */}
                <div className="flex justify-between items-center p-6 border-b border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">M</span>
                    </div>
                    <span className="text-white font-bold">Muamokel.Tech</span>
                  </div>
                  <button
                    className="text-gray-400 hover:text-white text-2xl focus:outline-none p-1 rounded-lg hover:bg-gray-800/50 transition-colors"
                    aria-label="Fermer le menu"
                    onClick={() => setIsOpen(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="px-6 py-6 space-y-6 overflow-y-auto h-full pb-24">
                  {navGroups.map((group, groupIndex) => (
                    <motion.div
                      key={group.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: groupIndex * 0.1 }}
                      className="mb-6"
                    >
                      <div className="font-semibold text-purple-400 text-sm mb-3 uppercase tracking-wide">
                        {group.label}
                      </div>
                      <div className="space-y-1">
                        {group.items.map((item, itemIndex) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (groupIndex * 0.1) + (itemIndex * 0.05) }}
                          >
                            <Link
                              to={item.href}
                              className="flex items-center gap-3 px-4 py-3 text-white hover:text-purple-400 hover:bg-purple-600/20 text-sm rounded-lg transition-all duration-200 font-medium"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="text-lg">{item.icon}</span>
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="border-t border-purple-500/20 pt-6"
                  >
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        <button
                          onClick={handleDashboard}
                          className="w-full text-left px-4 py-3 text-purple-400 hover:bg-purple-600/20 rounded-lg text-sm font-semibold transition-colors flex items-center gap-3"
                        >
                          <FaTachometerAlt className="h-4 w-4" />
                          Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-600/20 rounded-lg text-sm font-semibold transition-colors flex items-center gap-3"
                        >
                          <FaSignOutAlt className="h-4 w-4" />
                          Déconnexion
                        </button>
                      </div>
                    ) : null}
                  </motion.div>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
