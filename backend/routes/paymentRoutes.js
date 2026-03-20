const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// GET all payments (auth required)
router.get('/', auth, async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
});

// POST create payment (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update payment (admin/manager only)
router.put(
  '/:id',
  auth,
  role(['Administrateur', 'Manager']),
  async (req, res) => {
    try {
      const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(payment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// DELETE payment (admin only)
router.delete('/:id', auth, role(['Administrateur']), async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
