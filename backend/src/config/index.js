/**
 * Agrégateur de configuration
 * Exporte toutes les configurations depuis un seul point
 */

const database = require('./database');
const express = require('./express');

module.exports = {
  database,
  express
};
