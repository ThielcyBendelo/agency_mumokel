import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaArrowRight } from 'react-icons/fa';

export default function ContactQuickButton() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        delay: 1.5
      }}
    >
      {/* Animated Glow Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Main Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Link
          to="/contact"
          className="group relative flex items-center gap-3 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden"
          style={{
            boxShadow: '0 8px 32px rgba(147, 51, 234, 0.3), 0 4px 16px rgba(59, 130, 246, 0.2)'
          }}
          aria-label="Contact rapide"
        >
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          />

          {/* Icon */}
          <motion.div
            className="relative z-10"
            whileHover={{ rotate: 10 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <FaEnvelope className="text-lg" />
          </motion.div>

          {/* Text */}
          <span className="relative z-10 text-sm md:text-base">Contact rapide</span>

          {/* Arrow */}
          <motion.div
            className="relative z-10"
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <FaArrowRight className="text-sm" />
          </motion.div>

          {/* Pulse Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-blue-400/20"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </Link>
      </motion.div>


    </motion.div>
  );
}
