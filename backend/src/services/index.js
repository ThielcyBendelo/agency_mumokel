/**
 * Agrégateur de services
 * Exporte tous les services depuis un seul point
 */

const stripeService = require('./stripeService');
const paypalService = require('./paypalService');
const emailService = require('./emailService');

module.exports = {
  stripeService,
  paypalService,
  emailService
};
