const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Utilisateur', 'admin', 'Manager'], default: 'Utilisateur' },

  // Sécurité - Tentatives de connexion
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },

  // Sécurité - Vérification email (pour futures améliorations)
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String, default: null },
  emailVerificationExpires: { type: Date, default: null },

  // Sécurité - Récupération de mot de passe
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },

  // Audit - Dernière connexion
  lastLogin: { type: Date, default: null },
  lastLoginIP: { type: String, default: null },
}, { timestamps: true });

// Index pour les performances
userSchema.index({ email: 1 });
userSchema.index({ lockUntil: 1 }, { expireAfterSeconds: 0 });

// Méthodes d'instance pour la sécurité
userSchema.methods.incLoginAttempts = function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  return this.updateOne({ $inc: { loginAttempts: 1 } });
};

userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { lockUntil: 1 },
    $set: { loginAttempts: 0 }
  });
};

module.exports = mongoose.model('User', userSchema);
