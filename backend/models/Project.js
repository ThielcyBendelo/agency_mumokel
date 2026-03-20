const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['planifie', 'en_cours', 'en_revue', 'termine', 'annule'],
    default: 'planifie'
  },
  priority: {
    type: String,
    enum: ['basse', 'moyenne', 'haute', 'urgente'],
    default: 'moyenne'
  },
  budget: {
    type: Number,
    min: 0
  },
  estimatedHours: {
    type: Number,
    min: 0
  },
  actualHours: {
    type: Number,
    min: 0,
    default: 0
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  deadline: {
    type: Date
  },
  technologies: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['web', 'mobile', 'desktop', 'consulting', 'maintenance'],
    required: true
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  attachments: [{
    filename: String,
    url: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  tasks: [{
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['todo', 'in_progress', 'completed'],
      default: 'todo'
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    estimatedHours: Number,
    actualHours: Number,
    createdAt: {
      type: Date,
      default: Date.now
    },
    completedAt: Date
  }],
  milestones: [{
    title: String,
    description: String,
    dueDate: Date,
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date
  }]
}, {
  timestamps: true
});

// Index pour les performances
projectSchema.index({ client: 1 });
projectSchema.index({ assignedTo: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ priority: 1 });
projectSchema.index({ deadline: 1 });
projectSchema.index({ createdAt: -1 });

// Middleware pour calculer le progrès basé sur les tâches
projectSchema.methods.calculateProgress = function() {
  if (this.tasks.length === 0) return 0;

  const completedTasks = this.tasks.filter(task => task.status === 'completed').length;
  return Math.round((completedTasks / this.tasks.length) * 100);
};

// Méthode pour mettre à jour le progrès
projectSchema.methods.updateProgress = function() {
  this.progress = this.calculateProgress();
  return this.save();
};

// Méthode statique pour obtenir les statistiques
projectSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalBudget: { $sum: '$budget' },
        avgProgress: { $avg: '$progress' }
      }
    }
  ]);

  return stats.reduce((acc, stat) => {
    acc[stat._id] = {
      count: stat.count,
      totalBudget: stat.totalBudget || 0,
      avgProgress: Math.round(stat.avgProgress || 0)
    };
    return acc;
  }, {});
};

module.exports = mongoose.model('Project', projectSchema);
