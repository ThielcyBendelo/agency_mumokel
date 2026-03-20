const stripeService = require('../../services/stripeService');
const paypalService = require('../../services/paypalService');
const Payment = require('../../../models/Payment');
const User = require('../../../models/User');
const {
  successResponse,
  errorResponse,
  createdResponse,
  paginatedResponse,
  calculatePagination
} = require('../../utils/response');
const { paymentLogger } = require('../../utils/logger');
const emailService = require('../../services/emailService');

/**
 * Créer une intention de paiement Stripe
 */
const createStripePaymentIntent = async (req, res) => {
  try {
    const { amount, currency, description, metadata } = req.body;

    const paymentIntent = await stripeService.createPaymentIntent(
      amount,
      currency,
      {
        userId: req.user._id.toString(),
        ...metadata
      }
    );

    // Enregistrer le paiement en base
    const payment = new Payment({
      user: req.user._id,
      amount: amount,
      currency: currency || 'eur',
      description,
      paymentMethod: 'stripe',
      paymentIntentId: paymentIntent.paymentIntentId,
      status: 'pending',
      metadata: {
        userId: req.user._id.toString(),
        ...metadata
      }
    });

    await payment.save();

    paymentLogger.info(`Intention de paiement créée: ${paymentIntent.paymentIntentId} pour ${req.user.email}`);

    successResponse(res, 'Intention de paiement créée avec succès', {
      clientSecret: paymentIntent.clientSecret,
      paymentIntentId: paymentIntent.paymentIntentId,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    });

  } catch (error) {
    console.error('Erreur lors de la création du PaymentIntent:', error);
    errorResponse(res, 'Erreur lors de la création du paiement');
  }
};

/**
 * Confirmer un paiement Stripe
 */
const confirmStripePayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const payment = await Payment.findOne({
      paymentIntentId,
      user: req.user._id
    });

    if (!payment) {
      return errorResponse(res, 'Paiement non trouvé', null, 404);
    }

    const result = await stripeService.confirmPayment(paymentIntentId);

    // Mettre à jour le paiement
    payment.status = result.status;
    payment.completedAt = new Date();
    payment.transactionId = result.id;
    await payment.save();

    // Envoyer l'email de confirmation
    try {
      await emailService.sendPaymentConfirmation({
        clientName: req.user.name,
        clientEmail: req.user.email,
        paymentId: payment._id,
        amount: payment.amount,
        currency: payment.currency,
        service: payment.description,
        transactionId: payment.transactionId,
        paymentMethod: 'Stripe'
      });
    } catch (emailError) {
      console.warn('Erreur lors de l\'envoi de l\'email de confirmation:', emailError);
    }

    paymentLogger.info(`Paiement confirmé: ${paymentIntentId} pour ${req.user.email}`);

    successResponse(res, 'Paiement confirmé avec succès', {
      paymentId: payment._id,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency,
      transactionId: payment.transactionId
    });

  } catch (error) {
    console.error('Erreur lors de la confirmation du paiement:', error);
    errorResponse(res, 'Erreur lors de la confirmation du paiement');
  }
};

/**
 * Créer une session de checkout Stripe
 */
const createStripeCheckoutSession = async (req, res) => {
  try {
    const { items, successUrl, cancelUrl, metadata } = req.body;

    const session = await stripeService.createCheckoutSession(
      items,
      successUrl,
      cancelUrl,
      {
        userId: req.user._id.toString(),
        ...metadata
      }
    );

    paymentLogger.info(`Session checkout créée: ${session.sessionId} pour ${req.user.email}`);

    successResponse(res, 'Session de paiement créée avec succès', {
      sessionId: session.sessionId,
      url: session.url
    });

  } catch (error) {
    console.error('Erreur lors de la création de la session checkout:', error);
    errorResponse(res, 'Erreur lors de la création de la session de paiement');
  }
};

/**
 * Traiter un webhook Stripe
 */
const handleStripeWebhook = async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const rawBody = req.body;

    const event = await stripeService.handleWebhook(rawBody, sig);

    // Traiter l'événement selon son type
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;
      default:
        console.log(`Événement non traité: ${event.type}`);
    }

    res.json({ received: true });

  } catch (error) {
    console.error('Erreur webhook Stripe:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

/**
 * Gérer le succès d'un PaymentIntent
 */
const handlePaymentIntentSucceeded = async (paymentIntent) => {
  try {
    const payment = await Payment.findOneAndUpdate(
      { paymentIntentId: paymentIntent.id },
      {
        status: 'completed',
        completedAt: new Date(),
        transactionId: paymentIntent.id
      },
      { new: true }
    ).populate('user');

    if (payment && payment.user) {
      // Envoyer l'email de confirmation
      try {
        await emailService.sendPaymentConfirmation({
          clientName: payment.user.name,
          clientEmail: payment.user.email,
          paymentId: payment._id,
          amount: payment.amount,
          currency: payment.currency,
          service: payment.description,
          transactionId: payment.transactionId,
          paymentMethod: 'Stripe'
        });
      } catch (emailError) {
        console.warn('Erreur lors de l\'envoi de l\'email de confirmation:', emailError);
      }

      paymentLogger.info(`Paiement réussi traité: ${paymentIntent.id}`);
    }
  } catch (error) {
    console.error('Erreur lors du traitement du paiement réussi:', error);
  }
};

/**
 * Gérer l'échec d'un PaymentIntent
 */
const handlePaymentIntentFailed = async (paymentIntent) => {
  try {
    await Payment.findOneAndUpdate(
      { paymentIntentId: paymentIntent.id },
      {
        status: 'failed',
        completedAt: new Date()
      }
    );

    paymentLogger.warn(`Paiement échoué: ${paymentIntent.id}`);
  } catch (error) {
    console.error('Erreur lors du traitement du paiement échoué:', error);
  }
};

/**
 * Obtenir les paiements de l'utilisateur
 */
const getUserPayments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    const query = { user: req.user._id };
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const totalPayments = await Payment.countDocuments(query);
    const payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const pagination = calculatePagination(totalPayments, page, limit);

    successResponse(res, 'Paiements récupérés avec succès', {
      payments,
      pagination
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des paiements:', error);
    errorResponse(res, 'Erreur lors de la récupération des paiements');
  }
};

/**
 * Obtenir tous les paiements (Admin seulement)
 */
const getAllPayments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const paymentMethod = req.query.paymentMethod;

    const query = {};
    if (status) query.status = status;
    if (paymentMethod) query.paymentMethod = paymentMethod;

    const skip = (page - 1) * limit;
    const totalPayments = await Payment.countDocuments(query);
    const payments = await Payment.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const pagination = calculatePagination(totalPayments, page, limit);

    successResponse(res, 'Paiements récupérés avec succès', {
      payments,
      pagination
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des paiements:', error);
    errorResponse(res, 'Erreur lors de la récupération des paiements');
  }
};

/**
 * Obtenir les statistiques de paiement (Admin seulement)
 */
const getPaymentStats = async (req, res) => {
  try {
    const stats = await Payment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const monthlyRevenue = await Payment.aggregate([
      {
        $match: {
          status: 'completed',
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
      },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const result = {
      byStatus: stats.reduce((acc, stat) => {
        acc[stat._id] = {
          count: stat.count,
          totalAmount: stat.totalAmount || 0
        };
        return acc;
      }, {}),
      totalRevenue: totalRevenue[0]?.total || 0,
      monthlyRevenue: monthlyRevenue[0]?.total || 0
    };

    successResponse(res, 'Statistiques récupérées avec succès', { stats: result });

  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    errorResponse(res, 'Erreur lors de la récupération des statistiques');
  }
};

/**
 * Obtenir les détails d'un paiement
 */
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('user', 'name email');

    if (!payment) {
      return errorResponse(res, 'Paiement non trouvé', null, 404);
    }

    // Vérifier les permissions
    if (req.user.role !== 'admin' && payment.user._id.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Accès non autorisé', null, 403);
    }

    successResponse(res, 'Paiement récupéré avec succès', { payment });

  } catch (error) {
    console.error('Erreur lors de la récupération du paiement:', error);
    errorResponse(res, 'Erreur lors de la récupération du paiement');
  }
};

module.exports = {
  createStripePaymentIntent,
  confirmStripePayment,
  createStripeCheckoutSession,
  handleStripeWebhook,
  getUserPayments,
  getAllPayments,
  getPaymentStats,
  getPaymentById
};
