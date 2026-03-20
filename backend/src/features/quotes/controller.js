const Quote = require('../../../models/Quote');
const Client = require('../../../models/Client');
const Project = require('../../../models/Project');
const {
  successResponse,
  errorResponse,
  createdResponse,
  paginatedResponse,
  calculatePagination
} = require('../../utils/response');
const { quoteLogger } = require('../../utils/logger');
const emailService = require('../../services/emailService');

/**
 * Créer un nouveau devis
 */
const createQuote = async (req, res) => {
  try {
    const { client, project, title, description, items, validUntil, notes, discount } = req.body;

    // Vérifier que le client existe
    const clientExists = await Client.findById(client);
    if (!clientExists) {
      return errorResponse(res, 'Client non trouvé', null, 404);
    }

    // Calculer le total
    let subtotal = 0;
    const processedItems = items.map(item => {
      const itemTotal = item.quantity * item.unitPrice;
      const taxAmount = itemTotal * (item.taxRate / 100);
      const totalWithTax = itemTotal + taxAmount;

      subtotal += totalWithTax;

      return {
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        taxRate: item.taxRate,
        total: totalWithTax
      };
    });

    // Appliquer la remise
    const discountAmount = discount ? (subtotal * discount / 100) : 0;
    const total = subtotal - discountAmount;

    // Créer le devis
    const quote = new Quote({
      client,
      project,
      title,
      description,
      items: processedItems,
      subtotal,
      discount: discountAmount,
      total,
      validUntil,
      notes,
      status: 'draft',
      createdBy: req.user._id
    });

    await quote.save();

    // Peupler les données pour la réponse
    await quote.populate([
      { path: 'client', select: 'name email company phone' },
      { path: 'project', select: 'title status' },
      { path: 'createdBy', select: 'name email' }
    ]);

    quoteLogger.info(`Devis créé: ${quote._id} pour ${clientExists.name} par ${req.user.email}`);

    createdResponse(res, 'Devis créé avec succès', { quote });

  } catch (error) {
    console.error('Erreur lors de la création du devis:', error);
    errorResponse(res, 'Erreur lors de la création du devis');
  }
};

/**
 * Obtenir tous les devis
 */
const getQuotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const client = req.query.client;
    const search = req.query.search;

    // Construire la requête
    const query = {};

    if (status) query.status = status;
    if (client) query.client = client;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Les clients ne voient que leurs propres devis
    if (req.user.role === 'client') {
      query.client = req.user._id;
    }

    const skip = (page - 1) * limit;
    const totalQuotes = await Quote.countDocuments(query);
    const quotes = await Quote.find(query)
      .populate('client', 'name email company')
      .populate('project', 'title status')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const pagination = calculatePagination(totalQuotes, page, limit);

    successResponse(res, 'Devis récupérés avec succès', {
      quotes,
      pagination
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des devis:', error);
    errorResponse(res, 'Erreur lors de la récupération des devis');
  }
};

/**
 * Obtenir un devis par ID
 */
const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('client', 'name email company phone address')
      .populate('project', 'title description status budget')
      .populate('createdBy', 'name email');

    if (!quote) {
      return errorResponse(res, 'Devis non trouvé', null, 404);
    }

    // Vérifier les permissions
    if (req.user.role === 'client' && quote.client._id.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Accès non autorisé', null, 403);
    }

    successResponse(res, 'Devis récupéré avec succès', { quote });

  } catch (error) {
    console.error('Erreur lors de la récupération du devis:', error);
    errorResponse(res, 'Erreur lors de la récupération du devis');
  }
};

/**
 * Mettre à jour un devis
 */
const updateQuote = async (req, res) => {
  try {
    const { title, description, items, validUntil, notes, discount, status } = req.body;
    const quoteId = req.params.id;

    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return errorResponse(res, 'Devis non trouvé', null, 404);
    }

    // Vérifier les permissions
    if (req.user.role === 'client') {
      return errorResponse(res, 'Accès non autorisé', null, 403);
    }

    // Recalculer les totaux si les items ont changé
    if (items) {
      let subtotal = 0;
      const processedItems = items.map(item => {
        const itemTotal = item.quantity * item.unitPrice;
        const taxAmount = itemTotal * (item.taxRate / 100);
        const totalWithTax = itemTotal + taxAmount;
        subtotal += totalWithTax;

        return {
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxRate: item.taxRate,
          total: totalWithTax
        };
      });

      const discountAmount = discount ? (subtotal * discount / 100) : 0;
      const total = subtotal - discountAmount;

      quote.items = processedItems;
      quote.subtotal = subtotal;
      quote.discount = discountAmount;
      quote.total = total;
    }

    // Mettre à jour les autres champs
    if (title) quote.title = title;
    if (description) quote.description = description;
    if (validUntil) quote.validUntil = validUntil;
    if (notes !== undefined) quote.notes = notes;
    if (discount !== undefined && !items) {
      quote.discount = (quote.subtotal * discount / 100);
      quote.total = quote.subtotal - quote.discount;
    }
    if (status) quote.status = status;

    await quote.save();

    // Peupler les données pour la réponse
    await quote.populate([
      { path: 'client', select: 'name email company' },
      { path: 'project', select: 'title status' },
      { path: 'createdBy', select: 'name email' }
    ]);

    quoteLogger.info(`Devis mis à jour: ${quote._id} par ${req.user.email}`);

    successResponse(res, 'Devis mis à jour avec succès', { quote });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du devis:', error);
    errorResponse(res, 'Erreur lors de la mise à jour du devis');
  }
};

/**
 * Supprimer un devis
 */
const deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);

    if (!quote) {
      return errorResponse(res, 'Devis non trouvé', null, 404);
    }

    // Vérifier les permissions
    if (req.user.role === 'client') {
      return errorResponse(res, 'Accès non autorisé', null, 403);
    }

    quoteLogger.info(`Devis supprimé: ${req.params.id} par ${req.user.email}`);

    successResponse(res, 'Devis supprimé avec succès');

  } catch (error) {
    console.error('Erreur lors de la suppression du devis:', error);
    errorResponse(res, 'Erreur lors de la suppression du devis');
  }
};

/**
 * Envoyer un devis par email
 */
const sendQuoteByEmail = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('client', 'name email company')
      .populate('createdBy', 'name email');

    if (!quote) {
      return errorResponse(res, 'Devis non trouvé', null, 404);
    }

    // Vérifier les permissions
    if (req.user.role === 'client') {
      return errorResponse(res, 'Accès non autorisé', null, 403);
    }

    // Mettre à jour le statut
    quote.status = 'sent';
    quote.sentAt = new Date();
    await quote.save();

    // Envoyer l'email (template à créer dans EmailJS)
    try {
      await emailService.sendCustomEmail(
        quote.client.email,
        `Devis - ${quote.title}`,
        'quote_template',
        {
          client_name: quote.client.name,
          quote_title: quote.title,
          quote_total: quote.total.toFixed(2),
          quote_valid_until: quote.validUntil.toLocaleDateString('fr-FR'),
          company_name: 'Muamokel Services',
          contact_email: 'contact@muamokel.com'
        }
      );
    } catch (emailError) {
      console.warn('Erreur lors de l\'envoi du devis par email:', emailError);
      // Ne pas échouer pour autant
    }

    quoteLogger.info(`Devis envoyé par email: ${quote._id} à ${quote.client.email}`);

    successResponse(res, 'Devis envoyé avec succès', { quote });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du devis:', error);
    errorResponse(res, 'Erreur lors de l\'envoi du devis');
  }
};

/**
 * Accepter un devis (par le client)
 */
const acceptQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('client', 'name email')
      .populate('project', 'title');

    if (!quote) {
      return errorResponse(res, 'Devis non trouvé', null, 404);
    }

    // Vérifier que c'est le bon client
    if (quote.client._id.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Accès non autorisé', null, 403);
    }

    // Vérifier que le devis est encore valide
    if (quote.validUntil < new Date()) {
      return errorResponse(res, 'Ce devis a expiré', null, 400);
    }

    quote.status = 'accepted';
    quote.acceptedAt = new Date();
    await quote.save();

    // Créer un projet si nécessaire
    if (!quote.project) {
      const project = new Project({
        title: quote.title,
        description: quote.description,
        client: quote.client._id,
        budget: quote.total,
        status: 'planifie',
        createdBy: quote.createdBy
      });
      await project.save();
      quote.project = project._id;
      await quote.save();
    }

    // Envoyer une notification
    try {
      await emailService.sendAdminNotification({
        type: 'Devis accepté',
        message: `Le devis "${quote.title}" a été accepté par ${quote.client.name}`,
        actionUrl: `/admin/quotes/${quote._id}`,
        priority: 'high'
      });
    } catch (emailError) {
      console.warn('Erreur lors de l\'envoi de la notification:', emailError);
    }

    quoteLogger.info(`Devis accepté: ${quote._id} par ${req.user.email}`);

    successResponse(res, 'Devis accepté avec succès', { quote });

  } catch (error) {
    console.error('Erreur lors de l\'acceptation du devis:', error);
    errorResponse(res, 'Erreur lors de l\'acceptation du devis');
  }
};

/**
 * Refuser un devis (par le client)
 */
const rejectQuote = async (req, res) => {
  try {
    const { reason } = req.body;
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return errorResponse(res, 'Devis non trouvé', null, 404);
    }

    // Vérifier que c'est le bon client
    if (quote.client.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Accès non autorisé', null, 403);
    }

    quote.status = 'rejected';
    quote.rejectedAt = new Date();
    quote.rejectionReason = reason;
    await quote.save();

    quoteLogger.info(`Devis refusé: ${quote._id} par ${req.user.email}`);

    successResponse(res, 'Devis refusé', { quote });

  } catch (error) {
    console.error('Erreur lors du refus du devis:', error);
    errorResponse(res, 'Erreur lors du refus du devis');
  }
};

/**
 * Obtenir les statistiques des devis
 */
const getQuoteStats = async (req, res) => {
  try {
    const stats = await Quote.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalValue: { $sum: '$total' }
        }
      }
    ]);

    const monthlyStats = await Quote.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      byStatus: stats.reduce((acc, stat) => {
        acc[stat._id] = {
          count: stat.count,
          totalValue: stat.totalValue || 0
        };
        return acc;
      }, {}),
      monthly: monthlyStats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {})
    };

    successResponse(res, 'Statistiques récupérées avec succès', { stats: result });

  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    errorResponse(res, 'Erreur lors de la récupération des statistiques');
  }
};

module.exports = {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
  sendQuoteByEmail,
  acceptQuote,
  rejectQuote,
  getQuoteStats
};
