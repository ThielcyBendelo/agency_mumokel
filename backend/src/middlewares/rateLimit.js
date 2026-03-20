const rateLimit = require('express-rate-limit');
const { rateLimitResponse } = require('../utils/response');

/**
 * Limiteur de taux pour les tentatives de connexion
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives par fenêtre
  message: {
    success: false,
    message: 'Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    rateLimitResponse(res, 'Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.');
  }
});

/**
 * Limiteur de taux pour les demandes générales d'API
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes par fenêtre
  message: {
    success: false,
    message: 'Trop de requêtes. Veuillez réessayer dans quelques minutes.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    rateLimitResponse(res, 'Trop de requêtes. Veuillez réessayer dans quelques minutes.');
  }
});

/**
 * Limiteur de taux pour les demandes de création (POST)
 */
const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 20, // 20 créations par heure
  message: {
    success: false,
    message: 'Trop de créations. Veuillez réessayer dans une heure.',
    retryAfter: '1 heure'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    rateLimitResponse(res, 'Trop de créations. Veuillez réessayer dans une heure.');
  }
});

/**
 * Limiteur de taux pour les demandes de contact
 */
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 3, // 3 messages de contact par heure
  message: {
    success: false,
    message: 'Trop de messages de contact. Veuillez réessayer dans une heure.',
    retryAfter: '1 heure'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    rateLimitResponse(res, 'Trop de messages de contact. Veuillez réessayer dans une heure.');
  }
});

/**
 * Limiteur de taux pour les demandes de réinitialisation de mot de passe
 */
const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 3, // 3 demandes par heure
  message: {
    success: false,
    message: 'Trop de demandes de réinitialisation. Veuillez réessayer dans une heure.',
    retryAfter: '1 heure'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    rateLimitResponse(res, 'Trop de demandes de réinitialisation. Veuillez réessayer dans une heure.');
  }
});

/**
 * Limiteur de taux strict pour les administrateurs
 */
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 requêtes par fenêtre pour les admins
  message: {
    success: false,
    message: 'Trop de requêtes administrateur. Veuillez réessayer dans 15 minutes.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    rateLimitResponse(res, 'Trop de requêtes administrateur. Veuillez réessayer dans 15 minutes.');
  }
});

/**
 * Limiteur de taux pour les paiements
 */
const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 10, // 10 tentatives de paiement par heure
  message: {
    success: false,
    message: 'Trop de tentatives de paiement. Veuillez réessayer dans une heure.',
    retryAfter: '1 heure'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    rateLimitResponse(res, 'Trop de tentatives de paiement. Veuillez réessayer dans une heure.');
  }
});

/**
 * Limiteur de taux pour les téléchargements de fichiers
 */
const downloadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 20, // 20 téléchargements par heure
  message: {
    success: false,
    message: 'Trop de téléchargements. Veuillez réessayer dans une heure.',
    retryAfter: '1 heure'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    rateLimitResponse(res, 'Trop de téléchargements. Veuillez réessayer dans une heure.');
  }
});

/**
 * Limiteur de taux basé sur l'IP pour les attaques par déni de service
 */
const ddosProtection = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requêtes par minute
  message: {
    success: false,
    message: 'Trop de requêtes. Veuillez réessayer plus tard.',
    retryAfter: '1 minute'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    rateLimitResponse(res, 'Trop de requêtes. Veuillez réessayer plus tard.');
  },
  skip: (req) => {
    // Ne pas limiter les requêtes de santé
    return req.path === '/health';
  }
});

/**
 * Limiteur de taux personnalisable
 */
const createCustomLimiter = (options = {}) => {
  const defaultOptions = {
    windowMs: 15 * 60 * 1000, // 15 minutes par défaut
    max: 100, // 100 requêtes par défaut
    message: {
      success: false,
      message: 'Trop de requêtes. Veuillez réessayer plus tard.',
      retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      rateLimitResponse(res, options.message?.message || 'Trop de requêtes. Veuillez réessayer plus tard.');
    }
  };

  return rateLimit({ ...defaultOptions, ...options });
};

/**
 * Middleware pour logger les violations de limite de taux
 */
const logRateLimitViolation = (req, res, next) => {
  // Ajouter des informations de logging pour les violations
  if (res.statusCode === 429) {
    console.warn(`Rate limit exceeded for IP: ${req.ip}, Path: ${req.path}, User-Agent: ${req.get('User-Agent')}`);
  }
  next();
};

module.exports = {
  authLimiter,
  apiLimiter,
  createLimiter,
  contactLimiter,
  passwordResetLimiter,
  adminLimiter,
  paymentLimiter,
  downloadLimiter,
  ddosProtection,
  createCustomLimiter,
  logRateLimitViolation
};
