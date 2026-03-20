const express = require('express');
const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }
  // Ici, vous pouvez ajouter l'envoi d'email, la sauvegarde en base, etc.
  // Pour le test, on répond simplement avec succès.
  res.status(200).json({ success: true, message: 'Message reçu, merci !' });
});

module.exports = router;
