import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormSecurity from '../hooks/useFormSecurity';
import authService from '../services/authService';
import { FcGoogle } from 'react-icons/fc';
import { auth, googleProvider } from '../utils/firebaseConfig';

const SecureRegister = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const formSchema = {
    name: { type: 'text', minLength: 2, maxLength: 50, required: true },
    email: { type: 'text', minLength: 5, maxLength: 254, required: true }, // Changé de 'email' à 'text'
    password: { type: 'password', required: true },
    confirmPassword: { type: 'password', required: true },
  };

  const {
    formData,
    errors,
    touched,
    isLoading,
    handleChange: baseHandleChange,
    handleBlur,
    handleSubmit: handleFormSubmit,
  } = useFormSecurity(formSchema, async (data) => {
    try {
      setApiError('');

      if (data.password !== data.confirmPassword) {
        setApiError('Les mots de passe ne correspondent pas');
        return;
      }

      const resp = await authService.register(data.name, data.email, data.password);

      const user = resp?.user || authService.getCurrentUser();

      // Redirection améliorée vers user-menu-system selon le rôle
      if (user?.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user?.role === 'manager') {
        navigate('/manager-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      setApiError(error.userMessage || error.message || 'Erreur lors de l\'inscription');
    }
  });

  const handleSubmit = (e) => {
    setApiError('');
    handleFormSubmit(e);
  };

  const handleGoogleRegister = async () => {
    try {
      setIsGoogleLoading(true);
      setApiError('');
      const result = await authService.registerWithGoogle();
      const user = result.user;

      // Redirection améliorée vers user-menu-system selon le rôle
      if (user?.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user?.role === 'manager') {
        navigate('/manager-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      setApiError('Erreur lors de l\'inscription Google: ' + error.message);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-200 to-dark-300 px-3 sm:px-4 py-6 sm:py-8">
      <div className="w-full max-w-md bg-dark-300/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700/50">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple to-pink rounded-lg mb-3 sm:mb-4">
            <span className="text-white text-lg sm:text-xl font-bold">✍️</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Créer un compte</h1>
          <p className="text-sm sm:text-base text-gray-400">Rejoignez notre plateforme sécurisée</p>
        </div>

        {/* API Error */}
        {apiError && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-300 text-xs sm:text-sm">🚨 {apiError}</p>
          </div>
        )}

        {/* Google Register Button - Only show if Firebase is configured */}
        {auth && googleProvider ? (
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={isGoogleLoading || isLoading}
            className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base bg-white text-gray-800 font-semibold rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isGoogleLoading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <FcGoogle className="text-xl" />
            )}
            {isGoogleLoading ? 'Connexion...' : 'Continuer avec Google'}
          </button>
        ) : (
          <div className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base bg-gray-100 text-gray-500 font-semibold rounded-lg flex items-center justify-center gap-3 mb-4 border-2 border-dashed border-gray-300">
            <span className="text-lg">🔧</span>
            Connexion Google (Configuration requise)
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-3 text-xs text-gray-400">ou</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
              Nom complet
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Thielcy Bendelo"
                value={formData.name || ''}
                onChange={baseHandleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-dark-100/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                  touched.name && errors.name
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-gray-600/50 focus:ring-purple/50 focus:border-purple/50'
                } disabled:opacity-50`}
              />
              <span className="absolute right-3 top-2.5 sm:top-3 text-base sm:text-lg">👤</span>
            </div>
            {touched.name && errors.name && (
              <p className="text-red-400 text-xs mt-1">⚠️ {errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="bendelothielcy@gmail.com"
                value={formData.email || ''}
                onChange={baseHandleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-dark-100/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                  touched.email && errors.email
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-gray-600/50 focus:ring-purple/50 focus:border-purple/50'
                } disabled:opacity-50`}
              />
              <span className="absolute right-3 top-2.5 sm:top-3 text-base sm:text-lg">✉️</span>
            </div>
            {touched.email && errors.email && (
              <p className="text-red-400 text-xs mt-1">⚠️ {errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-300">
                Mot de passe
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-purple hover:text-pink transition"
              >
                {showPassword ? '👁️ Masquer' : '👁️ Afficher'}
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="bendelo1996$$$$$"
                value={formData.password || ''}
                onChange={baseHandleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-dark-100/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                  touched.password && errors.password
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-gray-600/50 focus:ring-purple/50 focus:border-purple/50'
                } disabled:opacity-50`}
              />
              <span className="absolute right-3 top-2.5 sm:top-3 text-base sm:text-lg">🔒</span>
            </div>



            {touched.password && errors.password && (
              <p className="text-red-400 text-xs mt-1">⚠️ {errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-gray-300">
                Confirmer
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-xs text-purple hover:text-pink transition"
              >
                {showConfirmPassword ? '👁️ Masquer' : '👁️ Afficher'}
              </button>
            </div>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.confirmPassword || ''}
                onChange={baseHandleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-dark-100/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                  touched.confirmPassword && errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-gray-600/50 focus:ring-purple/50 focus:border-purple/50'
                } disabled:opacity-50`}
              />
              <span className="absolute right-3 top-2.5 sm:top-3 text-base sm:text-lg">🔒</span>
            </div>

            {/* Vérifier la correspondance */}
            {formData.confirmPassword && formData.password && (
              <div className={`text-xs mt-1 ${formData.password === formData.confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                {formData.password === formData.confirmPassword ? '✓ Correspondent' : '✗ Ne correspondent pas'}
              </div>
            )}

            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">⚠️ {errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms & Conditions - Compact sur mobile */}
          <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 mt-0.5 rounded border-gray-600 text-purple focus:ring-purple flex-shrink-0"
              required
            />
            <label htmlFor="terms" className="text-xs text-gray-300 leading-relaxed">
              J'accepte les{' '}
              <button type="button" className="text-purple hover:text-pink transition underline">
                conditions
              </button>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.name || !formData.email || !formData.password || !formData.confirmPassword}
            className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base bg-gradient-to-r from-purple to-pink text-white font-semibold rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span> Création...
              </span>
            ) : (
              '✓ Créer un compte'
            )}
          </button>
        </form>

        {/* Security Info - Compact sur mobile */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-xs leading-relaxed">
            🔐 <strong>Protection:</strong>
            <span className="hidden sm:inline">
              <br />• Validation client
              <br />• Hash bcrypt
              <br />• Tokens JWT
              <br />• Rate limiting
              <br />• SSL/TLS
            </span>
            <span className="sm:hidden"> Validation, Hash bcrypt, JWT, Rate limiting, SSL/TLS</span>
          </p>
        </div>

        {/* Login Link */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            Déjà un compte?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-purple hover:text-pink transition font-semibold"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecureRegister;
