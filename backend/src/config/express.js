const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

/**
 * Configuration Express
 * Configure tous les middleware nécessaires
 */
const configureExpress = (app) => {
  // CORS - Autoriser les requêtes du frontend
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  // Body parsing - Analyser JSON et URL-encoded
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  
  // Logging - Afficher les requêtes en développement
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }
  
  // Headers de sécurité basiques
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
  
  console.log('⚙️ Express configuré');
  
  return app;
};

module.exports = configureExpress;
