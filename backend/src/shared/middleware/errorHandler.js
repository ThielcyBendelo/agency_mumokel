/**
 * Middleware de gestion d'erreurs global
 * Capture toutes les erreurs et renvoie une réponse formatée
 */
const errorHandler = (err, req, res, next) => {
  // Log l'erreur
  console.error('❌ Erreur capturée:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method
  });
  
  // Déterminer le code de statut
  const statusCode = err.statusCode || err.status || 500;
  
  // Préparer la réponse
  const response = {
    success: false,
    error: err.message || 'Erreur serveur interne',
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err.details
    })
  };
  
  // Envoyer la réponse
  res.status(statusCode).json(response);
};

/**
 * Middleware pour les routes non trouvées
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route non trouvée: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFoundHandler
};
