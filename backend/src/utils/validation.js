const Joi = require('joi');

/**
 * Schémas de validation pour les différentes entités
 */

// Validation pour l'authentification
const authValidation = {
  register: Joi.object({
    name: Joi.string().min(2).max(50).required()
      .messages({
        'string.empty': 'Le nom est requis',
        'string.min': 'Le nom doit contenir au moins 2 caractères',
        'string.max': 'Le nom ne peut pas dépasser 50 caractères'
      }),
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Format d\'email invalide',
        'string.empty': 'L\'email est requis'
      }),
    password: Joi.string().min(8).max(128).required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .messages({
        'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
        'string.max': 'Le mot de passe ne peut pas dépasser 128 caractères',
        'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial',
        'string.empty': 'Le mot de passe est requis'
      }),
    role: Joi.string().valid('client', 'admin', 'manager').default('client'),
    phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).optional()
      .messages({
        'string.pattern.base': 'Format de numéro de téléphone invalide'
      })
  }),

  login: Joi.object({
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Format d\'email invalide',
        'string.empty': 'L\'email est requis'
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Le mot de passe est requis'
      })
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).max(128).required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .messages({
        'string.min': 'Le nouveau mot de passe doit contenir au moins 8 caractères',
        'string.pattern.base': 'Le nouveau mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
      })
  }),

  resetPassword: Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string().min(8).max(128).required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required()
  })
};

// Validation pour les utilisateurs
const userValidation = {
  updateProfile: Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).optional(),
    company: Joi.string().max(100).optional(),
    address: Joi.object({
      street: Joi.string().optional(),
      city: Joi.string().optional(),
      postalCode: Joi.string().optional(),
      country: Joi.string().optional()
    }).optional()
  }),

  updateRole: Joi.object({
    role: Joi.string().valid('client', 'admin', 'manager').required(),
    userId: Joi.string().required()
  })
};

// Validation pour les paiements
const paymentValidation = {
  createPayment: Joi.object({
    amount: Joi.number().positive().required()
      .messages({
        'number.positive': 'Le montant doit être positif',
        'number.base': 'Le montant doit être un nombre'
      }),
    currency: Joi.string().valid('EUR', 'USD', 'GBP').default('EUR'),
    description: Joi.string().max(500).optional(),
    metadata: Joi.object().optional(),
    paymentMethod: Joi.string().valid('stripe', 'paypal').default('stripe')
  }),

  processPayment: Joi.object({
    paymentIntentId: Joi.string().required(),
    paymentMethod: Joi.string().valid('stripe', 'paypal').required()
  })
};

// Validation pour les projets
const projectValidation = {
  createProject: Joi.object({
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().min(10).max(2000).required(),
    client: Joi.string().required(), // ObjectId
    category: Joi.string().valid('web', 'mobile', 'desktop', 'consulting', 'maintenance').required(),
    budget: Joi.number().min(0).optional(),
    estimatedHours: Joi.number().min(0).optional(),
    priority: Joi.string().valid('basse', 'moyenne', 'haute', 'urgente').default('moyenne'),
    deadline: Joi.date().greater('now').optional(),
    technologies: Joi.array().items(Joi.string()).optional()
  }),

  updateProject: Joi.object({
    title: Joi.string().min(3).max(200).optional(),
    description: Joi.string().min(10).max(2000).optional(),
    status: Joi.string().valid('planifie', 'en_cours', 'en_revue', 'termine', 'annule').optional(),
    priority: Joi.string().valid('basse', 'moyenne', 'haute', 'urgente').optional(),
    progress: Joi.number().min(0).max(100).optional(),
    deadline: Joi.date().optional(),
    technologies: Joi.array().items(Joi.string()).optional()
  }),

  addTask: Joi.object({
    title: Joi.string().min(1).max(200).required(),
    description: Joi.string().max(1000).optional(),
    estimatedHours: Joi.number().min(0).optional(),
    assignedTo: Joi.string().optional() // ObjectId
  }),

  updateTask: Joi.object({
    status: Joi.string().valid('todo', 'in_progress', 'completed').optional(),
    actualHours: Joi.number().min(0).optional()
  })
};

// Validation pour les devis
const quoteValidation = {
  createQuote: Joi.object({
    client: Joi.string().required(), // ObjectId
    project: Joi.string().optional(), // ObjectId
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().min(10).max(2000).required(),
    items: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        description: Joi.string().optional(),
        quantity: Joi.number().min(1).required(),
        unitPrice: Joi.number().min(0).required(),
        taxRate: Joi.number().min(0).max(100).default(20)
      })
    ).min(1).required(),
    validUntil: Joi.date().greater('now').required(),
    notes: Joi.string().max(1000).optional(),
    discount: Joi.number().min(0).default(0)
  }),

  updateQuote: Joi.object({
    status: Joi.string().valid('draft', 'sent', 'accepted', 'rejected', 'expired').optional(),
    validUntil: Joi.date().greater('now').optional(),
    notes: Joi.string().max(1000).optional(),
    discount: Joi.number().min(0).optional()
  })
};

// Validation pour les clients
const clientValidation = {
  createClient: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).optional(),
    company: Joi.string().max(100).optional(),
    address: Joi.object({
      street: Joi.string().optional(),
      city: Joi.string().optional(),
      postalCode: Joi.string().optional(),
      country: Joi.string().optional()
    }).optional(),
    industry: Joi.string().max(50).optional(),
    website: Joi.string().uri().optional(),
    notes: Joi.string().max(1000).optional()
  }),

  updateClient: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).optional(),
    company: Joi.string().max(100).optional(),
    address: Joi.object({
      street: Joi.string().optional(),
      city: Joi.string().optional(),
      postalCode: Joi.string().optional(),
      country: Joi.string().optional()
    }).optional(),
    industry: Joi.string().max(50).optional(),
    website: Joi.string().uri().optional(),
    status: Joi.string().valid('active', 'inactive', 'prospect').optional(),
    notes: Joi.string().max(1000).optional()
  })
};

// Validation pour le contact
const contactValidation = {
  sendMessage: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().min(5).max(200).required(),
    message: Joi.string().min(10).max(2000).required(),
    phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).optional(),
    company: Joi.string().max(100).optional()
  })
};

/**
 * Middleware de validation
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Données de validation invalides',
        errors
      });
    }

    next();
  };
};

/**
 * Validation des paramètres d'URL
 */
const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Paramètres d\'URL invalides',
        errors
      });
    }

    next();
  };
};

/**
 * Validation des query parameters
 */
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Paramètres de requête invalides',
        errors
      });
    }

    next();
  };
};

module.exports = {
  authValidation,
  userValidation,
  paymentValidation,
  projectValidation,
  quoteValidation,
  clientValidation,
  contactValidation,
  validate,
  validateParams,
  validateQuery
};
