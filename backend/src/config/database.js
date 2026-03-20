const mongoose = require('mongoose');

/**
 * Connexion à MongoDB
 * Gère la connexion avec retry et logging
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/muamokel',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
    console.log(`📊 Base de données: ${conn.connection.name}`);

    return conn;
  } catch (error) {
    console.error(`❌ Erreur de connexion MongoDB: ${error.message}`);

    // Retry après 5 secondes
    console.log('🔄 Nouvelle tentative dans 5 secondes...');
    setTimeout(connectDB, 5000);
  }
};

// Gestion des événements de connexion
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB déconnecté');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erreur MongoDB:', err);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 Connexion MongoDB fermée (SIGINT)');
  process.exit(0);
});

module.exports = connectDB;
