/**
 * Agrégateur de routes
 * Exporte toutes les routes depuis un seul point
 */

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const paymentRoutes = require('./paymentRoutes');
const contactRoutes = require('./contactRoutes');

module.exports = {
  authRoutes,
  userRoutes,
  paymentRoutes,
  contactRoutes
};
