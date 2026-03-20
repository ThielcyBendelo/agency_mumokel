import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Auth Context
const AuthContext = createContext();

// Auth Actions
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  UPDATE_USER: 'UPDATE_USER',
  SET_LOADING: 'SET_LOADING'
};

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        tokens: action.payload.tokens,
        session: action.payload.session,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        tokens: null,
        session: null,
        loading: false,
        error: action.payload
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        tokens: null,
        session: null,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.REFRESH_TOKEN:
      return {
        ...state,
        tokens: action.payload
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

// Initial State
const initialState = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  session: null,
  loading: true,
  error: null
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Configure axios defaults
  useEffect(() => {
    if (state.tokens?.accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.tokens.accessToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.tokens]);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (token) {
          // Try to refresh token or validate current token
          const response = await axios.get('/api/auth/me');
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: {
              user: response.data.user,
              tokens: { accessToken: token, refreshToken },
              session: response.data.session
            }
          });
        } else if (refreshToken) {
          // Try to refresh token
          await refreshToken();
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } finally {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (identifier, password, rememberMe = false) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      const response = await axios.post('/api/auth/login', {
        identifier,
        password,
        rememberMe
      });

      const { user, tokens, session } = response.data;

      // Store tokens
      localStorage.setItem('accessToken', tokens.accessToken);
      if (rememberMe && tokens.refreshToken) {
        localStorage.setItem('refreshToken', tokens.refreshToken);
      }

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user, tokens, session }
      });

      toast.success(`Welcome back, ${user.firstName}!`);

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: errorMessage
      });

      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

    try {
      const response = await axios.post('/api/auth/register', userData);

      toast.success('Registration successful! Please check your email to verify your account.');

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (state.session?.sessionId) {
        await axios.post('/api/auth/logout', {
          sessionId: state.session.sessionId
        });
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    }

    // Clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Clear axios header
    delete axios.defaults.headers.common['Authorization'];

    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    toast.success('Logged out successfully');
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post('/api/auth/refresh', {
        refreshToken
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // Update stored tokens
      localStorage.setItem('accessToken', accessToken);
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }

      dispatch({
        type: AUTH_ACTIONS.REFRESH_TOKEN,
        payload: { accessToken, refreshToken: newRefreshToken }
      });

      return { success: true };
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout user
      await logout();
      return { success: false, error: error.message };
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const response = await axios.put('/api/users/profile', userData);

      dispatch({
        type: AUTH_ACTIONS.UPDATE_USER,
        payload: response.data.user
      });

      toast.success('Profile updated successfully');
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await axios.post('/api/auth/change-password', {
        currentPassword,
        newPassword
      });

      toast.success('Password changed successfully');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password change failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Check if user has permission
  const hasPermission = (permission) => {
    if (!state.user?.permissions) return false;
    return state.user.permissions.includes(permission);
  };

  // Check if user has role
  const hasRole = (role) => {
    if (!state.user?.roles) return false;
    return state.user.roles.some(userRole => userRole.name === role);
  };

  // Check if user has any of the roles
  const hasAnyRole = (roles) => {
    if (!state.user?.roles) return false;
    return roles.some(role => hasRole(role));
  };

  // Get user display name
  const getDisplayName = () => {
    if (!state.user) return '';
    return `${state.user.firstName} ${state.user.lastName}`;
  };

  // Get user avatar URL
  const getAvatarUrl = () => {
    return state.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(getDisplayName())}&background=random`;
  };

  // Context value
  const value = {
    // State
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    tokens: state.tokens,
    session: state.session,
    loading: state.loading,
    error: state.error,

    // Actions
    login,
    register,
    logout,
    refreshToken,
    updateProfile,
    changePassword,

    // Utilities
    hasPermission,
    hasRole,
    hasAnyRole,
    getDisplayName,
    getAvatarUrl
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
