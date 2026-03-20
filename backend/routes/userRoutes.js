const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// GET all users (admin/manager only)
router.get('/', auth, role(['Administrateur', 'Manager']), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST create user (admin only)
router.post('/', auth, role(['Administrateur']), async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update user (admin/manager only)
router.put(
  '/:id',
  auth,
  role(['Administrateur', 'Manager']),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// DELETE user (admin only)
router.delete('/:id', auth, role(['Administrateur']), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
