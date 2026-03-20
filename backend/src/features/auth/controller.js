const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../../../models/User');
const {
  successResponse,
  errorResponse,
  createdResponse,
  validationErrorResponse
} = require('../../utils/response');
const { authLogger } = require('../../utils/logger');
const emailService = require('../../services/emailService');

/**
 * Générer un token JWT
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

/**
 * Générer un token de rafraîchissement
 */
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
  });
};

/**
 * Inscription d'un nouvel utilisateur
 */
const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return errorResponse(res, 'Un utilisateur avec cet email existe déjà', null, 409);
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer l'utilisateur
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'client',
      phone,
      status: 'active'
    });

    await user.save();

    // Générer le token
    const token = generateToken(user._id);

    // Envoyer l'email de bienvenue
    try {
      await emailService.sendWelcomeEmail({
        name: user.name,
        email: user.email
      });
    } catch (emailError) {
      console.warn('Erreur lors de l\'envoi de l\'email de bienvenue:', emailError);
      // Ne pas échouer l'inscription pour autant
    }

    // Logger l'inscription
    authLogger.info(`Nouvel utilisateur inscrit: ${user.email} (rôle: ${user.role})`);

    // Retourner la réponse sans le mot de passe
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      status: user.status,
      createdAt: user.createdAt
    };

    createdResponse(res, 'Utilisateur créé avec succès', {
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    errorResponse(res, 'Erreur lors de la création du compte');
  }
};

/**
 * Connexion d'un utilisateur
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return errorResponse(res, 'Email ou mot de passe incorrect', null, 401);
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 'Email ou mot de passe incorrect', null, 401);
    }

    // Vérifier si le compte est actif
    if (user.status !== 'active') {
      return errorResponse(res, 'Compte désactivé', null, 403);
    }

    // Générer les tokens
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Mettre à jour la dernière connexion
    user.lastLogin = new Date();
    await user.save();

    // Logger la connexion
    authLogger.info(`Connexion réussie: ${user.email}`);

    // Retourner la réponse
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      status: user.status,
      lastLogin: user.lastLogin
    };

    successResponse(res, 'Connexion réussie', {
      user: userResponse,
      token,
      refreshToken
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    errorResponse(res, 'Erreur lors de la connexion');
  }
};

/**
 * Rafraîchir le token
 */
const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return errorResponse(res, 'Token de rafraîchissement requis', null, 401);
    }

    // Vérifier le token de rafraîchissement
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.status !== 'active') {
      return errorResponse(res, 'Token invalide', null, 401);
    }

    // Générer un nouveau token
    const newToken = generateToken(user._id);

    successResponse(res, 'Token rafraîchi avec succès', {
      token: newToken
    });

  } catch (error) {
    console.error('Erreur lors du rafraîchissement du token:', error);
    errorResponse(res, 'Token de rafraîchissement invalide', null, 401);
  }
};

/**
 * Déconnexion
 */
const logout = async (req, res) => {
  try {
    // En mode stateless JWT, la déconnexion côté serveur n'est pas nécessaire
    // Le client doit simplement supprimer le token

    authLogger.info(`Déconnexion: ${req.user?.email || 'utilisateur inconnu'}`);

    successResponse(res, 'Déconnexion réussie');

  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    errorResponse(res, 'Erreur lors de la déconnexion');
  }
};

/**
 * Demande de réinitialisation de mot de passe
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Ne pas révéler si l'email existe ou non pour des raisons de sécurité
      return successResponse(res, 'Si cet email existe, un lien de réinitialisation a été envoyé');
    }

    // Générer un token de réinitialisation
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Envoyer l'email de réinitialisation
    try {
      await emailService.sendPasswordResetEmail({
        name: user.name,
        email: user.email
      }, resetToken);

      authLogger.info(`Email de réinitialisation envoyé: ${user.email}`);

    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email de réinitialisation:', emailError);
      return errorResponse(res, 'Erreur lors de l\'envoi de l\'email de réinitialisation');
    }

    successResponse(res, 'Si cet email existe, un lien de réinitialisation a été envoyé');

  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    errorResponse(res, 'Erreur lors de la demande de réinitialisation');
  }
};

/**
 * Réinitialisation du mot de passe
 */
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Le middleware verifyResetToken a déjà validé le token et ajouté req.resetUser
    const user = req.resetUser;

    // Hasher le nouveau mot de passe
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS));
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Mettre à jour le mot de passe
    user.password = hashedPassword;
    user.passwordChangedAt = new Date();
    await user.save();

    authLogger.info(`Mot de passe réinitialisé: ${user.email}`);

    successResponse(res, 'Mot de passe réinitialisé avec succès');

  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    errorResponse(res, 'Erreur lors de la réinitialisation du mot de passe');
  }
};

/**
 * Changer le mot de passe (utilisateur connecté)
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    // Vérifier l'ancien mot de passe
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return errorResponse(res, 'Mot de passe actuel incorrect', null, 400);
    }

    // Hasher le nouveau mot de passe
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS));
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Mettre à jour le mot de passe
    user.password = hashedPassword;
    user.passwordChangedAt = new Date();
    await user.save();

    authLogger.info(`Mot de passe changé: ${user.email}`);

    successResponse(res, 'Mot de passe changé avec succès');

  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    errorResponse(res, 'Erreur lors du changement de mot de passe');
  }
};

/**
 * Vérifier le token (middleware pour les routes protégées)
 */
const verifyToken = async (req, res) => {
  try {
    // Le middleware authenticate a déjà validé le token
    const user = req.user;

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      status: user.status,
      lastLogin: user.lastLogin
    };

    successResponse(res, 'Token valide', { user: userResponse });

  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    errorResponse(res, 'Token invalide');
  }
};

/**
 * Obtenir le profil de l'utilisateur connecté
 */
const getProfile = async (req, res) => {
  try {
    const user = req.user;

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      status: user.status,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt
    };

    successResponse(res, 'Profil récupéré avec succès', { user: userResponse });

  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    errorResponse(res, 'Erreur lors de la récupération du profil');
  }
};

/**
 * Mettre à jour le profil
 */
const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = req.user;

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (email && email.toLowerCase() !== user.email) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return errorResponse(res, 'Cet email est déjà utilisé', null, 409);
      }
    }

    // Mettre à jour les champs
    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    if (phone !== undefined) user.phone = phone;

    await user.save();

    authLogger.info(`Profil mis à jour: ${user.email}`);

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      status: user.status
    };

    successResponse(res, 'Profil mis à jour avec succès', { user: userResponse });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    errorResponse(res, 'Erreur lors de la mise à jour du profil');
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyToken,
  getProfile,
  updateProfile
};
