const User = require('../../../models/User');
const {
  successResponse,
  errorResponse,
  createdResponse,
  paginatedResponse,
  calculatePagination
} = require('../../utils/response');
const { userLogger } = require('../../utils/logger');

/**
 * Obtenir tous les utilisateurs (Admin seulement)
 */
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const status = req.query.status || '';

    // Construire la requête
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) {
      query.role = role;
    }

    if (status) {
      query.status = status;
    }

    // Pagination
    const skip = (page - 1) * limit;
    const totalUsers = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const pagination = calculatePagination(totalUsers, page, limit);

    userLogger.info(`Liste des utilisateurs récupérée par ${req.user.email}`);

    paginatedResponse(res, 'Utilisateurs récupérés avec succès', users, pagination);

  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    errorResponse(res, 'Erreur lors de la récupération des utilisateurs');
  }
};

/**
 * Obtenir un utilisateur par ID
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return errorResponse(res, 'Utilisateur non trouvé', null, 404);
    }

    // Vérifier les permissions
    if (req.user.role !== 'admin' && req.user._id.toString() !== user._id.toString()) {
      return errorResponse(res, 'Accès non autorisé', null, 403);
    }

    successResponse(res, 'Utilisateur récupéré avec succès', { user });

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    errorResponse(res, 'Erreur lors de la récupération de l\'utilisateur');
  }
};

/**
 * Créer un nouvel utilisateur (Admin seulement)
 */
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, company } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return errorResponse(res, 'Un utilisateur avec cet email existe déjà', null, 409);
    }

    // Créer l'utilisateur
    const user = new User({
      name,
      email: email.toLowerCase(),
      password, // Sera hashé par le middleware pre-save
      role: role || 'client',
      phone,
      company,
      status: 'active'
    });

    await user.save();

    // Retourner la réponse sans le mot de passe
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      company: user.company,
      status: user.status,
      createdAt: user.createdAt
    };

    userLogger.info(`Nouvel utilisateur créé: ${user.email} par ${req.user.email}`);

    createdResponse(res, 'Utilisateur créé avec succès', { user: userResponse });

  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    errorResponse(res, 'Erreur lors de la création de l\'utilisateur');
  }
};

/**
 * Mettre à jour un utilisateur
 */
const updateUser = async (req, res) => {
  try {
    const { name, email, role, phone, company, status } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return errorResponse(res, 'Utilisateur non trouvé', null, 404);
    }

    // Vérifier les permissions
    if (req.user.role !== 'admin' && req.user._id.toString() !== userId) {
      return errorResponse(res, 'Accès non autorisé', null, 403);
    }

    // Les utilisateurs non-admin ne peuvent pas changer leur rôle ou statut
    if (req.user.role !== 'admin') {
      if (role && role !== user.role) {
        return errorResponse(res, 'Vous ne pouvez pas changer votre rôle', null, 403);
      }
      if (status && status !== user.status) {
        return errorResponse(res, 'Vous ne pouvez pas changer votre statut', null, 403);
      }
    }

    // Vérifier si l'email est déjà utilisé
    if (email && email.toLowerCase() !== user.email) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return errorResponse(res, 'Cet email est déjà utilisé', null, 409);
      }
    }

    // Mettre à jour les champs
    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    if (role && req.user.role === 'admin') user.role = role;
    if (phone !== undefined) user.phone = phone;
    if (company !== undefined) user.company = company;
    if (status && req.user.role === 'admin') user.status = status;

    await user.save();

    // Retourner la réponse sans le mot de passe
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      company: user.company,
      status: user.status,
      updatedAt: user.updatedAt
    };

    userLogger.info(`Utilisateur mis à jour: ${user.email} par ${req.user.email}`);

    successResponse(res, 'Utilisateur mis à jour avec succès', { user: userResponse });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    errorResponse(res, 'Erreur lors de la mise à jour de l\'utilisateur');
  }
};

/**
 * Supprimer un utilisateur (Admin seulement)
 */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Empêcher la suppression de son propre compte
    if (req.user._id.toString() === userId) {
      return errorResponse(res, 'Vous ne pouvez pas supprimer votre propre compte', null, 400);
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return errorResponse(res, 'Utilisateur non trouvé', null, 404);
    }

    userLogger.info(`Utilisateur supprimé: ${user.email} par ${req.user.email}`);

    successResponse(res, 'Utilisateur supprimé avec succès');

  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    errorResponse(res, 'Erreur lors de la suppression de l\'utilisateur');
  }
};

/**
 * Obtenir les statistiques des utilisateurs (Admin seulement)
 */
const getUserStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
          active: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          inactive: {
            $sum: { $cond: [{ $eq: ['$status', 'inactive'] }, 1, 0] }
          }
        }
      }
    ]);

    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // 30 jours
    });

    const result = {
      total: totalUsers,
      active: activeUsers,
      inactive: totalUsers - activeUsers,
      recent: recentUsers,
      byRole: stats.reduce((acc, stat) => {
        acc[stat._id] = {
          total: stat.count,
          active: stat.active,
          inactive: stat.inactive
        };
        return acc;
      }, {})
    };

    successResponse(res, 'Statistiques récupérées avec succès', { stats: result });

  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    errorResponse(res, 'Erreur lors de la récupération des statistiques');
  }
};

/**
 * Changer le rôle d'un utilisateur (Admin seulement)
 */
const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    if (!['admin', 'manager', 'client'].includes(role)) {
      return errorResponse(res, 'Rôle invalide', null, 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      return errorResponse(res, 'Utilisateur non trouvé', null, 404);
    }

    user.role = role;
    await user.save();

    userLogger.info(`Rôle changé pour ${user.email}: ${role} par ${req.user.email}`);

    successResponse(res, 'Rôle mis à jour avec succès', {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Erreur lors du changement de rôle:', error);
    errorResponse(res, 'Erreur lors du changement de rôle');
  }
};

/**
 * Activer/Désactiver un utilisateur (Admin seulement)
 */
const toggleUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;

    // Empêcher la désactivation de son propre compte
    if (req.user._id.toString() === userId) {
      return errorResponse(res, 'Vous ne pouvez pas désactiver votre propre compte', null, 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      return errorResponse(res, 'Utilisateur non trouvé', null, 404);
    }

    user.status = user.status === 'active' ? 'inactive' : 'active';
    await user.save();

    userLogger.info(`Statut changé pour ${user.email}: ${user.status} par ${req.user.email}`);

    successResponse(res, `Utilisateur ${user.status === 'active' ? 'activé' : 'désactivé'} avec succès`, {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status
      }
    });

  } catch (error) {
    console.error('Erreur lors du changement de statut:', error);
    errorResponse(res, 'Erreur lors du changement de statut');
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
  changeUserRole,
  toggleUserStatus
};
