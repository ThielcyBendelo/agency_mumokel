const express = require('express');
const router = express.Router();
const userController = require('./controller');
const { authenticate, authorize } = require('../../middlewares/auth');
const { validate, validateParams } = require('../../middlewares/validation');
const { userValidation } = require('../../utils/validation');
const { apiLimiter, createLimiter } = require('../../middlewares/rateLimit');

// Appliquer les middlewares globaux
router.use(apiLimiter);

// Routes publiques (si nécessaire)
// Aucune route publique pour les utilisateurs

// Toutes les routes suivantes nécessitent une authentification
router.use(authenticate);

// Routes pour les utilisateurs connectés
router.get('/profile', userController.getUserById); // Profil de l'utilisateur connecté
router.put('/profile',
  validate(userValidation.updateProfile),
  userController.updateUser
);

// Routes admin seulement
router.use(authorize('admin')); // Toutes les routes suivantes sont admin-only

router.get('/',
  userController.getUsers
);

router.get('/stats',
  userController.getUserStats
);

router.post('/',
  createLimiter,
  validate(userValidation.createUser),
  userController.createUser
);

router.get('/:id',
  validateParams({ id: require('joi').string().required() }),
  userController.getUserById
);

router.put('/:id',
  validateParams({ id: require('joi').string().required() }),
  validate(userValidation.updateProfile),
  userController.updateUser
);

router.patch('/:id/role',
  validateParams({ id: require('joi').string().required() }),
  validate(userValidation.updateRole),
  userController.changeUserRole
);

router.patch('/:id/status',
  validateParams({ id: require('joi').string().required() }),
  userController.toggleUserStatus
);

router.delete('/:id',
  validateParams({ id: require('joi').string().required() }),
  userController.deleteUser
);

module.exports = router;
