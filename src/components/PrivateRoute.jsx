import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import authService from '../services/authService';

/**
 * Composant de protection des routes privées
 * Redirige vers login si non authentifié
 */
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = authService.isLoggedIn();

  // Afficher le toast dans useEffect pour éviter le warning React
  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning('🔐 Veuillez vous connecter pour accéder à cette page', {
        autoClose: 3000
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
