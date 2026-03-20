/**
 * Utilitaires pour standardiser les réponses API
 */

/**
 * Réponse de succès standardisée
 */
const successResponse = (res, message, data = null, statusCode = 200) => {
  const response = {
    success: true,
    message,
    timestamp: new Date().toISOString()
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Réponse d'erreur standardisée
 */
const errorResponse = (res, message, errors = null, statusCode = 500) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  if (errors !== null) {
    response.errors = errors;
  }

  // En développement, on peut ajouter plus d'informations
  if (process.env.NODE_ENV === 'development') {
    response.statusCode = statusCode;
  }

  return res.status(statusCode).json(response);
};

/**
 * Réponse de création (201)
 */
const createdResponse = (res, message, data = null) => {
  return successResponse(res, message, data, 201);
};

/**
 * Réponse de succès sans contenu (204)
 */
const noContentResponse = (res) => {
  return res.status(204).send();
};

/**
 * Réponse de données paginées
 */
const paginatedResponse = (res, message, data, pagination) => {
  const response = {
    success: true,
    message,
    data,
    pagination: {
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      totalItems: pagination.totalItems,
      itemsPerPage: pagination.itemsPerPage,
      hasNext: pagination.hasNext,
      hasPrev: pagination.hasPrev
    },
    timestamp: new Date().toISOString()
  };

  return res.status(200).json(response);
};

/**
 * Calculer les informations de pagination
 */
const calculatePagination = (totalItems, currentPage, itemsPerPage) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    currentPage: parseInt(currentPage),
    totalPages,
    totalItems,
    itemsPerPage: parseInt(itemsPerPage),
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
};

/**
 * Réponse de validation d'erreur
 */
const validationErrorResponse = (res, errors) => {
  return errorResponse(res, 'Données de validation invalides', errors, 400);
};

/**
 * Réponse d'authentification requise
 */
const unauthorizedResponse = (res, message = 'Authentification requise') => {
  return errorResponse(res, message, null, 401);
};

/**
 * Réponse d'accès interdit
 */
const forbiddenResponse = (res, message = 'Accès interdit') => {
  return errorResponse(res, message, null, 403);
};

/**
 * Réponse de ressource non trouvée
 */
const notFoundResponse = (res, message = 'Ressource non trouvée') => {
  return errorResponse(res, message, null, 404);
};

/**
 * Réponse de conflit
 */
const conflictResponse = (res, message = 'Conflit de données') => {
  return errorResponse(res, message, null, 409);
};

/**
 * Réponse de taux limite dépassé
 */
const rateLimitResponse = (res, message = 'Trop de requêtes, veuillez réessayer plus tard') => {
  return errorResponse(res, message, null, 429);
};

/**
 * Réponse d'erreur interne du serveur
 */
const serverErrorResponse = (res, message = 'Erreur interne du serveur') => {
  return errorResponse(res, message, null, 500);
};

module.exports = {
  successResponse,
  errorResponse,
  createdResponse,
  noContentResponse,
  paginatedResponse,
  validationErrorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  conflictResponse,
  rateLimitResponse,
  serverErrorResponse,
  calculatePagination
};
