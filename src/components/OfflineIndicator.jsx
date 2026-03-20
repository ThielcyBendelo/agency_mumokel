import React from 'react';
import { useOffline } from '../hooks/useOffline';
import { motion, AnimatePresence } from 'framer-motion';

const OfflineIndicator = () => {
  const { isOnline, connectionType } = useOffline();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 shadow-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              Hors ligne - Certaines fonctionnalités peuvent être limitées
            </span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineIndicator;
