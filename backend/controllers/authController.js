const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configuration sécurisée depuis les variables d'environnement
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;
const MAX_LOGIN_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5;
const LOCK_TIME = parseInt(process.env.LOCK_TIME) || 2 * 60 * 60 * 1000; // 2 heures en millisecondes

/**
 * Fonction de validation des mots de passe forts
 */
function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return { valid: false, message: `Le mot de passe doit contenir au moins ${minLength} caractères.` };
  }

  if (!hasUpperCase) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins une lettre majuscule.' };
  }

  if (!hasLowerCase) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins une lettre minuscule.' };
  }

  if (!hasNumbers) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins un chiffre.' };
  }

  if (!hasSpecialChar) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins un caractère spécial.' };
  }

  return { valid: true };
}

/**
 * Fonction pour vérifier si un compte est verrouillé
 */
function isLocked(user) {
  return !!(user.lockUntil && user.lockUntil > Date.now());
}

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation des champs requis
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Format d\'email invalide.' });
    }

    // Validation du mot de passe fort (sauf pour l'admin)
    const isAdminEmail = email.toLowerCase().trim() === 'bendelothielcy@gmail.com';
    if (!isAdminEmail) {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        return res.status(400).json({ error: passwordValidation.message });
      }
    }

    // Vérification si l'email existe déjà
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email déjà utilisé.' });
    }

    // Hash du mot de passe avec configuration sécurisée
    const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    // Gestion automatique des rôles lors de l'inscription
    let assignedRole = 'Utilisateur'; // Rôle par défaut

    // Attribution automatique du rôle administrateur pour l'email spécifié
    if (email.toLowerCase().trim() === 'bendelothielcy@gmail.com') {
      assignedRole = 'admin';
      console.log(`[AUDIT] Attribution automatique du rôle administrateur à: ${email} - ${new Date().toISOString()}`);
    }

    // Si un rôle est spécifié dans la requête, le valider (seulement pour les admins existants)
    if (role && role !== 'Utilisateur') {
      // Pour l'instant, seuls les utilisateurs peuvent s'inscrire avec le rôle par défaut
      // Les rôles spéciaux sont attribués automatiquement ou par un admin existant
      console.log(`[AUDIT] Tentative d'inscription avec rôle personnalisé ignorée: ${email} - rôle demandé: ${role} - ${new Date().toISOString()}`);
    }

    // Création de l'utilisateur avec le rôle assigné
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hash,
      role: assignedRole,
      loginAttempts: 0,
      lockUntil: null,
    });

    await user.save();

    // Log d'audit
    console.log(`[AUDIT] Nouvel utilisateur enregistré: ${email} - ${new Date().toISOString()}`);

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès.'
    });
  } catch (err) {
    console.error('Erreur lors de l\'inscription:', err);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation des champs
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis.' });
    }

    // Recherche de l'utilisateur
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log(`[AUDIT] Tentative de connexion avec email inexistant: ${email} - ${new Date().toISOString()}`);
      return res.status(400).json({ error: 'Email ou mot de passe incorrect.' });
    }

    // Vérification si le compte est verrouillé
    if (isLocked(user)) {
      console.log(`[AUDIT] Tentative de connexion sur compte verrouillé: ${email} - ${new Date().toISOString()}`);
      return res.status(423).json({
        error: 'Compte temporairement verrouillé en raison de trop nombreuses tentatives.',
        retryAfter: Math.ceil((user.lockUntil - Date.now()) / 1000 / 60) // minutes
      });
    }

    // Vérification du mot de passe
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      // Incrémentation des tentatives échouées
      user.loginAttempts += 1;

      // Verrouillage du compte si trop de tentatives
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = Date.now() + LOCK_TIME;
        console.log(`[AUDIT] Compte verrouillé après ${MAX_LOGIN_ATTEMPTS} tentatives: ${email} - ${new Date().toISOString()}`);
      }

      await user.save();
      console.log(`[AUDIT] Mot de passe incorrect pour ${email} - Tentative ${user.loginAttempts}/${MAX_LOGIN_ATTEMPTS} - ${new Date().toISOString()}`);
      return res.status(400).json({ error: 'Email ou mot de passe incorrect.' });
    }

    // Connexion réussie - reset des tentatives
    user.loginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    // Génération du token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    console.log(`[AUDIT] Connexion réussie: ${email} - ${new Date().toISOString()}`);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

exports.me = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token manquant.' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user)
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: 'Token invalide.' });
  }
};

exports.logout = async (req, res) => {
  // Pour JWT, le logout côté serveur n'est pas nécessaire,
  // le client supprime simplement le token
  res.json({ success: true, message: 'Déconnexion réussie.' });
};

exports.refresh = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token manquant.' });
    }

    // Vérification du token existant
    const decoded = jwt.verify(token, JWT_SECRET);

    // Vérification que l'utilisateur existe toujours
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log(`[AUDIT] Tentative de refresh avec utilisateur inexistant: ${decoded.id} - ${new Date().toISOString()}`);
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    // Vérification que le compte n'est pas verrouillé
    if (isLocked(user)) {
      console.log(`[AUDIT] Tentative de refresh sur compte verrouillé: ${user.email} - ${new Date().toISOString()}`);
      return res.status(423).json({ error: 'Compte verrouillé.' });
    }

    // Génération d'un nouveau token
    const newToken = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Mise à jour de la dernière activité
    user.lastLogin = new Date();
    await user.save();

    console.log(`[AUDIT] Token refresh réussi: ${user.email} - ${new Date().toISOString()}`);

    res.json({
      token: newToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.log(`[AUDIT] Tentative de refresh avec token expiré - ${new Date().toISOString()}`);
      return res.status(401).json({ error: 'Token expiré. Veuillez vous reconnecter.' });
    }

    console.error('Erreur lors du refresh du token:', err);
    res.status(401).json({ error: 'Token invalide.' });
  }
};

// ==================== GOOGLE AUTHENTICATION ====================

/**
 * Configuration de Passport Google Strategy
 */
const configureGoogleStrategy = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Recherche d'un utilisateur existant avec cet email Google
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        // Si l'utilisateur existe mais n'a pas de googleId, le lier
        if (!user.googleId) {
          user.googleId = profile.id;
          user.googleProfile = profile;
          user.authProvider = 'google';
          await user.save();
          console.log(`[GOOGLE] Compte existant lié à Google: ${user.email} - ${new Date().toISOString()}`);
        }
      } else {
        // Création d'un nouvel utilisateur Google
        let assignedRole = 'Utilisateur'; // Rôle par défaut

        // Attribution automatique du rôle administrateur pour l'email spécifié
        if (profile.emails[0].value.toLowerCase().trim() === 'bendelothielcy@gmail.com') {
          assignedRole = 'admin';
          console.log(`[GOOGLE] Attribution automatique du rôle administrateur à: ${profile.emails[0].value} - ${new Date().toISOString()}`);
        }

        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          googleProfile: profile,
          authProvider: 'google',
          role: assignedRole,
          loginAttempts: 0,
          lockUntil: null,
        });

        await user.save();
        console.log(`[GOOGLE] Nouvel utilisateur Google créé: ${user.email} - ${new Date().toISOString()}`);
      }

      return done(null, user);
    } catch (error) {
      console.error('[GOOGLE] Erreur lors de l\'authentification Google:', error);
      return done(error, null);
    }
  }));

  // Sérialisation pour les sessions
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

/**
 * Initialisation de Google Auth
 */
exports.initializeGoogleAuth = () => {
  configureGoogleStrategy();
};

/**
 * Démarrage de l'authentification Google
 */
exports.googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

/**
 * Callback de l'authentification Google
 */
exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, async (err, user) => {
    if (err) {
      console.error('[GOOGLE] Erreur callback:', err);
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5174'}/login?error=google_auth_failed`);
    }

    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5174'}/login?error=google_auth_failed`);
    }

    try {
      // Génération du token JWT
      const token = jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Mise à jour de la dernière connexion
      user.lastLogin = new Date();
      await user.save();

      console.log(`[GOOGLE] Connexion réussie: ${user.email} - ${new Date().toISOString()}`);

      // Redirection vers le frontend avec le token
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5174'}/login?token=${token}&provider=google`);
    } catch (error) {
      console.error('[GOOGLE] Erreur lors de la génération du token:', error);
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5174'}/login?error=token_generation_failed`);
    }
  })(req, res, next);
};

/**
 * Connexion Google côté client (pour les boutons de connexion)
 */
exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'Token Google manquant.' });
    }

    // Ici, vous pouvez vérifier le token Google avec la Google API
    // Pour simplifier, nous allons créer/mettre à jour l'utilisateur basé sur les informations

    // Note: Dans un environnement de production, validez toujours le token avec Google
    // Pour le développement, nous allons simuler cette validation

    res.json({
      success: true,
      message: 'Utilisez plutôt l\'authentification via le navigateur pour Google OAuth.',
      redirectUrl: `${process.env.FRONTEND_URL || 'http://localhost:5174'}/api/auth/google`
    });
  } catch (error) {
    console.error('[GOOGLE] Erreur lors de la connexion Google:', error);
    res.status(500).json({ error: 'Erreur lors de l\'authentification Google.' });
  }
};
