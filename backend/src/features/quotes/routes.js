const express = require('express');
const router = express.Router();
const quoteController = require('./controller');
const { authenticate, authorize } = require('../../middlewares/auth');
const { validate, validateParams } = require('../../middlewares/validation');
const { quoteValidation } = require('../../utils/validation');
const { apiLimiter, createLimiter } = require('../../middlewares/rateLimit');

// Appliquer les middlewares globaux
router.use(apiLimiter);

// Routes publiques (si nécessaire)
// Aucune route publique pour les devis

// Toutes les routes suivantes nécessitent une authentification
router.use(authenticate);

// Routes pour les clients (lecture seule)
router.get('/my-quotes',
  quoteController.getQuotes
);

router.get('/:id',
  validateParams({ id: require('joi').string().required() }),
  quoteController.getQuoteById
);

// Routes clients pour accepter/refuser
router.patch('/:id/accept',
  validateParams({ id: require('joi').string().required() }),
  quoteController.acceptQuote
);

router.patch('/:id/reject',
  validateParams({ id: require('joi').string().required() }),
  validate(quoteValidation.updateQuote),
  quoteController.rejectQuote
);

// Routes admin seulement
router.use(authorize('admin')); // Toutes les routes suivantes sont admin-only

router.get('/',
  quoteController.getQuotes
);

router.get('/stats',
  quoteController.getQuoteStats
);

router.post('/',
  createLimiter,
  validate(quoteValidation.createQuote),
  quoteController.createQuote
);

router.put('/:id',
  validateParams({ id: require('joi').string().required() }),
  validate(quoteValidation.updateQuote),
  quoteController.updateQuote
);

router.delete('/:id',
  validateParams({ id: require('joi').string().required() }),
  quoteController.deleteQuote
);

router.post('/:id/send',
  validateParams({ id: require('joi').string().required() }),
  quoteController.sendQuoteByEmail
);

module.exports = router;
