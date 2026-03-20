import React, { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 4000,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, newNotification.duration);

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const success = useCallback((message, options = {}) => {
    console.log('✅ SUCCESS:', message);
    // toast.success(message, {
    //   duration: 4000,
    //   style: {
    //     background: '#10b981',
    //     color: '#fff',
    //   },
    //   ...options
    // });
  }, []);

  const error = useCallback((message, options = {}) => {
    console.log('❌ ERROR:', message);
    // toast.error(message, {
    //   duration: 5000,
    //   style: {
    //     background: '#ef4444',
    //     color: '#fff',
    //   },
    //   ...options
    // });
  }, []);

  const warning = useCallback((message, options = {}) => {
    console.log('⚠️ WARNING:', message);
    // toast(message, {
    //   duration: 4000,
    //   icon: '⚠️',
    //   style: {
    //     background: '#f59e0b',
    //     color: '#fff',
    //   },
    //   ...options
    // });
  }, []);

  const info = useCallback((message, options = {}) => {
    console.log('ℹ️ INFO:', message);
    // toast(message, {
    //   duration: 4000,
    //   style: {
    //     background: '#3b82f6',
    //     color: '#fff',
    //   },
    //   ...options
    // });
  }, []);

  const loading = useCallback((message, options = {}) => {
    console.log('⏳ LOADING:', message);
    // return toast.loading(message, {
    //   style: {
    //     background: '#6b7280',
    //     color: '#fff',
    //   },
    //   ...options
    // });
    return null;
  }, []);

  const dismiss = useCallback((toastId) => {
    console.log('🗑️ DISMISS:', toastId);
    // toast.dismiss(toastId);
  }, []);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
    loading,
    dismiss
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
