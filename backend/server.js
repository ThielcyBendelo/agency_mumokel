require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');

const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Fonction d'initialisation de l'utilisateur administrateur
 * Crée automatiquement l'admin si il n'existe pas
 */
async function initializeAdminUser() {
  try {
    const adminEmail = 'bendelothielcy@gmail.com';
    const adminPassword = 'benndelo1996$$$$$';
    const adminName = 'Administrateur Système';

    // Vérifier si l'admin existe déjà
    const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });

    if (!existingAdmin) {
      // Hash du mot de passe administrateur
      const hashedPassword = await bcrypt.hash(adminPassword, 12);

      // Créer l'utilisateur administrateur
      const adminUser = new User({
        name: adminName,
        email: adminEmail.toLowerCase(),
        password: hashedPassword,
        role: 'admin',
        loginAttempts: 0,
        lockUntil: null,
        createdAt: new Date(),
      });

      await adminUser.save();

      console.log('🔐 [ADMIN INIT] Utilisateur administrateur créé avec succès');
      console.log(`   📧 Email: ${adminEmail}`);
      console.log(`   👤 Nom: ${adminName}`);
      console.log(`   🔑 Rôle: admin`);
      console.log(`   ✅ Accès complet à toutes les pages`);
    } else {
      console.log('🔐 [ADMIN INIT] Utilisateur administrateur déjà existant');
    }
  } catch (error) {
    console.error('❌ [ADMIN INIT] Erreur lors de l\'initialisation de l\'admin:', error);
  }
}

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('API Backend Node.js/Express opérationnel');
});

// Middleware de gestion d'erreurs global
app.use((err, req, res, next) => {
  console.error('Erreur API:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Erreur serveur',
    details: err.details || undefined,
  });
});

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('✅ Connexion MongoDB réussie');

    // Initialiser l'utilisateur administrateur
    await initializeAdminUser();

    app.listen(PORT, () => {
      console.log(`🚀 Serveur backend démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('⚠️ Connexion MongoDB échouée, fallback en mémoire');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur backend (mode mémoire) sur le port ${PORT}`);
    });
  });
