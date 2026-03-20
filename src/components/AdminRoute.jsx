import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import authService from '../services/authService';
import roleService from '../services/roleService';

/**
 * 🔐 Composant de protection pour routes ADMIN SEULEMENT
 * Vérifie:
 * 1. L'utilisateur est authentifié
 * 2. L'utilisateur a le rôle 'admin'
 * 3. Log l'accès pour audit
 */
const AdminRoute = ({ children }) => {
  const location = useLocation();
  
  // 1. Vérifier l'authentification
  const isAuthenticated = authService.isLoggedIn();
  const isAdmin = roleService.isAdmin();
  
  // Afficher les toasts dans useEffect pour éviter le warning React
  useEffect(() => {
    if (!isAuthenticated) {
      // Log supprimé - seulement le toast
      toast.warning('🔐 Veuillez vous connecter pour accéder à cette page', {
        autoClose: 3000
      });
    } else if (!isAdmin) {
      // Log supprimé - seulement le toast
      toast.error('❌ Accès refusé : Droits administrateur requis', {
        autoClose: 4000
      });
      roleService.logAccess('DENIED_ACCESS', location.pathname);
    } else {
      // Log l'accès réussi (silencieux)
      roleService.logAccess('ACCESSED', location.pathname);
    }
  }, [isAuthenticated, isAdmin, location.pathname]);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
