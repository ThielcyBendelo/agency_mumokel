// ...existing code...

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ajout de la directive CSP frame-ancestors
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
  next();
});

// Exemple de route de connexion utilisateur
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Exemple de vérification (à remplacer par votre logique réelle)
  if (email === 'bendelothielcy@gmail.com' && password === 'bendelo1996$$$$$') {
    // Générer un token fictif et un utilisateur
    const token = 'fake-jwt-token';
    const user = { email, role: 'Administrateur', name: 'Admin' };
    res.json({ token, user });
  } else {
    res.status(401).json({ error: 'Identifiants invalides' });
  }
});

// Remplace par tes identifiants PayPal
const PAYPAL_CLIENT_ID = 'bendelothielcy@gmail.com';
const PAYPAL_SECRET = 'bendelo1996$$$$$';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

app.post('/api/payments', async (req, res) => {
  try {
    const basicAuth = Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`
    ).toString('base64');
    const tokenRes = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) throw new Error('Impossible d’obtenir le token PayPal');

    const { amount, currency, description } = req.body;
    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency || 'USD',
              value: amount || '10.00',
            },
            description: description || 'Paiement',
          },
        ],
      }),
    });
    const orderData = await orderRes.json();
    if (!orderData.id)
      throw new Error('Erreur lors de la création de la commande PayPal');

    const approveLink = orderData.links.find((l) => l.rel === 'approve');
    if (!approveLink) throw new Error('Lien d’approbation PayPal introuvable');
    res.json({ approvalUrl: approveLink.href, orderId: orderData.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend PayPal lancé sur http://localhost:${PORT}`);
});
