const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  client: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['En attente', 'Payé', 'Annulé'], default: 'En attente' },
  date: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
