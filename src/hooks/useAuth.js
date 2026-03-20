import { useState, useEffect } from 'react';
import authService from '../services/authService';
import roleService from '../services/roleService';

/**
 * Hook personnalisé pour gérer l'authentification
 * Fournit l'état d'authentification et les méthodes associées
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await authService.initialize();
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(authService.isLoggedIn());
        setIsAdmin(roleService.isAdmin());
        setIsModerator(roleService.isModerator());
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Écouter les changements d'authentification
    const interval = setInterval(() => {
      const currentUser = authService.getCurrentUser();
      const loggedIn = authService.isLoggedIn();
      const admin = roleService.isAdmin();
      const moderator = roleService.isModerator();

      // Mettre à jour seulement si changement
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        setUser(currentUser);
      }
      if (loggedIn !== isAuthenticated) {
        setIsAuthenticated(loggedIn);
      }
      if (admin !== isAdmin) {
        setIsAdmin(admin);
      }
      if (moderator !== isModerator) {
        setIsModerator(moderator);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user, isAuthenticated, isAdmin, isModerator]);

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    setUser(result.user);
    setIsAuthenticated(true);
    setIsAdmin(roleService.isAdmin());
    setIsModerator(roleService.isModerator());
    return result;
  };

  const register = async (email, password, name) => {
    const result = await authService.register(email, password, name);
    setUser(result.user);
    setIsAuthenticated(true);
    setIsAdmin(roleService.isAdmin());
    setIsModerator(roleService.isModerator());
    return result;
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      setIsModerator(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    const updatedUser = await authService.updateProfile(profileData);
    setUser(updatedUser);
    return updatedUser;
  };

  const changePassword = async (currentPassword, newPassword) => {
    await authService.changePassword(currentPassword, newPassword);
  };

  return {
    user,
    isAuthenticated,
    isAdmin,
    isModerator,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword
  };
};

export default useAuth;
