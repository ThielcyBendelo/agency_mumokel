const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { unauthorizedResponse, forbiddenResponse } = require('../utils/response');
const { authLogger } = require('../utils/logger');

/**
 * Middleware d'authentification JWT
 */
const authenticate = async (req, res, next) => {
  try {
    // Récupérer le token depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : req.cookies?.token;

    if (!token) {
      return unauthorizedResponse(res, 'Token d\'authentification manquant');
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Récupérer l'utilisateur depuis la base de données
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return unauthorizedResponse(res, 'Utilisateur non trouvé');
    }

    // Vérifier si l'utilisateur est actif
    if (user.status !== 'active') {
      return forbiddenResponse(res, 'Compte désactivé');
    }

    // Ajouter l'utilisateur à la requête
    req.user = user;
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return unauthorizedResponse(res, 'Token invalide');
    }
    if (error.name === 'TokenExpiredError') {
      return unauthorizedResponse(res, 'Token expiré');
    }

    console.error('Erreur d\'authentification:', error);
    return unauthorizedResponse(res, 'Erreur d\'authentification');
  }
};

/**
 * Middleware d'autorisation par rôle
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return unauthorizedResponse(res, 'Authentification requise');
    }

    if (!roles.includes(req.user.role)) {
      return forbiddenResponse(res, 'Permissions insuffisantes');
    }

    next();
  };
};

/**
 * Middleware pour vérifier si l'utilisateur est propriétaire de la ressource
 */
const isOwner = (resourceField = 'userId') => {
  return (req, res, next) => {
    if (!req.user) {
      return unauthorizedResponse(res, 'Authentification requise');
    }

    const resourceId = req.params.id || req.body[resourceField];

    // Les administrateurs peuvent accéder à toutes les ressources
    if (req.user.role === 'admin') {
      return next();
    }

    // Vérifier si l'utilisateur est propriétaire
    if (req.user._id.toString() !== resourceId) {
      return forbiddenResponse(res, 'Accès non autorisé à cette ressource');
    }

    next();
  };
};

/**
 * Middleware pour vérifier si l'utilisateur peut accéder à une ressource client
 */
const canAccessClient = async (req, res, next) => {
  try {
    if (!req.user) {
      return unauthorizedResponse(res, 'Authentification requise');
    }

    // Les administrateurs et managers peuvent accéder à tous les clients
    if (['admin', 'manager'].includes(req.user.role)) {
      return next();
    }

    // Les clients ne peuvent accéder qu'à leurs propres données
    const clientId = req.params.id;
    if (req.user._id.toString() === clientId) {
      return next();
    }

    return forbiddenResponse(res, 'Accès non autorisé au client');

  } catch (error) {
    console.error('Erreur dans canAccessClient:', error);
    return forbiddenResponse(res, 'Erreur d\'autorisation');
  }
};

/**
 * Middleware pour vérifier si l'utilisateur peut accéder à un projet
 */
const canAccessProject = async (req, res, next) => {
  try {
    if (!req.user) {
      return unauthorizedResponse(res, 'Authentification requise');
    }

    const Project = require('../../models/Project');
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }

    // Les administrateurs et managers peuvent accéder à tous les projets
    if (['admin', 'manager'].includes(req.user.role)) {
      req.project = project;
      return next();
    }

    // Les utilisateurs assignés au projet peuvent y accéder
    const isAssigned = project.assignedTo.some(userId =>
      userId.toString() === req.user._id.toString()
    );

    if (isAssigned) {
      req.project = project;
      return next();
    }

    return forbiddenResponse(res, 'Accès non autorisé au projet');

  } catch (error) {
    console.error('Erreur dans canAccessProject:', error);
    return forbiddenResponse(res, 'Erreur d\'autorisation');
  }
};

/**
 * Middleware optionnel d'authentification (n'échoue pas si pas de token)
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : req.cookies?.token;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');

      if (user && user.status === 'active') {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Ne pas échouer, continuer sans authentification
    next();
  }
};

/**
 * Middleware pour logger les tentatives d'accès non autorisées
 */
const logUnauthorizedAccess = (req, res, next) => {
  // Stocker l'IP et les informations de la requête pour le logging
  req.accessLog = {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date()
  };

  next();
};

/**
 * Middleware pour vérifier le token de réinitialisation de mot de passe
 */
const verifyResetToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token de réinitialisation requis'
      });
    }

    // Vérifier le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Récupérer l'utilisateur
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Token invalide'
      });
    }

    req.resetUser = user;
    next();

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Token de réinitialisation invalide ou expiré'
    });
  }
};

module.exports = {
  authenticate,
  authorize,
  isOwner,
  canAccessClient,
  canAccessProject,
  optionalAuth,
  logUnauthorizedAccess,
  verifyResetToken
};
