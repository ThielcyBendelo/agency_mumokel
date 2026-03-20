import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import roleService from '../services/roleService';

/**
 * Contexte d'authentification pour gérer l'état global de l'utilisateur
 */
const AuthContext = createContext();

/**
 * Hook personnalisé pour utiliser le contexte d'authentification
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

/**
 * Provider d'authentification
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialisation - vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Vérifier la validité du token avec le serveur
          const userData = await authService.verifyToken();
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
            roleService.setCurrentUser(userData);
          } else {
            // Token invalide, nettoyer
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
            roleService.clear();
          }
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'authentification:', error);
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        roleService.clear();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Connexion de l'utilisateur
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);

      if (response.token && response.user) {
        // Stocker le token de manière sécurisée
        localStorage.setItem('token', response.token);

        // Mettre à jour l'état
        setUser(response.user);
        setIsAuthenticated(true);
        roleService.setCurrentUser(response.user);

        return { success: true };
      } else {
        throw new Error('Réponse de connexion invalide');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setUser(null);
      setIsAuthenticated(false);
      roleService.clear();

      return {
        success: false,
        error: error.message || 'Erreur lors de la connexion'
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inscription d'un nouvel utilisateur
   */
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await authService.register(name, email, password);

      if (response.success) {
        return { success: true, message: response.message };
      } else {
        throw new Error(response.error || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return {
        success: false,
        error: error.message || 'Erreur lors de l\'inscription'
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Déconnexion de l'utilisateur
   */
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();

      // Nettoyer le stockage local
      localStorage.removeItem('token');

      // Réinitialiser l'état
      setUser(null);
      setIsAuthenticated(false);
      roleService.clear();

    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Même en cas d'erreur, nettoyer l'état local
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      roleService.clear();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Rafraîchir le token
   */
  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken();
      if (response.token) {
        localStorage.setItem('token', response.token);
        if (response.user) {
          setUser(response.user);
          roleService.setCurrentUser(response.user);
        }
        return { success: true };
      } else {
        throw new Error('Token refresh échoué');
      }
    } catch (error) {
      console.error('Erreur lors du refresh du token:', error);
      // En cas d'échec du refresh, déconnecter l'utilisateur
      await logout();
      return { success: false, error: error.message };
    }
  };

  /**
   * Mettre à jour les informations utilisateur
   */
  const updateUser = (userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }));
    roleService.setCurrentUser({ ...user, ...userData });
  };

  // Valeur du contexte
  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
