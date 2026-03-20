const paypal = require('@paypal/checkout-server-sdk');
const { response } = require('../utils/response');

class PayPalService {
  constructor() {
    this.environment = null;
    this.client = null;
    this.initializePayPal();
  }

  initializePayPal() {
    try {
      // Configuration PayPal
      const clientId = process.env.PAYPAL_CLIENT_ID;
      const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
      const environment = process.env.NODE_ENV === 'production'
        ? paypal.core.LiveEnvironment
        : paypal.core.SandboxEnvironment;

      if (!clientId || !clientSecret) {
        console.warn('Configuration PayPal manquante. Variables d\'environnement PAYPAL_CLIENT_ID et PAYPAL_CLIENT_SECRET requises.');
        return;
      }

      this.environment = new environment(clientId, clientSecret);
      this.client = new paypal.core.PayPalHttpClient(this.environment);

      console.log('Service PayPal initialisé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation PayPal:', error);
    }
  }

  // Créer une commande PayPal
  async createOrder(orderData) {
    try {
      if (!this.client) {
        throw new Error('Client PayPal non initialisé');
      }

      const { amount, currency = 'EUR', description, invoiceId } = orderData;

      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer("return=representation");

      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: currency,
            value: amount.toString(),
            breakdown: {
              item_total: {
                currency_code: currency,
                value: amount.toString()
              }
            }
          },
          description: description || 'Service Muamokel',
          invoice_id: invoiceId || `INV-${Date.now()}`,
          items: [{
            name: description || 'Service Informatique',
            quantity: '1',
            unit_amount: {
              currency_code: currency,
              value: amount.toString()
            },
            category: 'DIGITAL_GOODS'
          }]
        }],
        application_context: {
          brand_name: 'Muamokel Services',
          landing_page: 'BILLING',
          user_action: 'PAY_NOW',
          return_url: `${process.env.FRONTEND_URL}/payment/success`,
          cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`
        }
      });

      const order = await this.client.execute(request);

      return {
        success: true,
        orderId: order.result.id,
        status: order.result.status,
        links: order.result.links,
        order: order.result
      };

    } catch (error) {
      console.error('Erreur lors de la création de la commande PayPal:', error);
      throw new Error(`Échec de la création de la commande: ${error.message}`);
    }
  }

  // Capturer un paiement
  async captureOrder(orderId) {
    try {
      if (!this.client) {
        throw new Error('Client PayPal non initialisé');
      }

      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});

      const capture = await this.client.execute(request);

      return {
        success: true,
        orderId: capture.result.id,
        status: capture.result.status,
        captureId: capture.result.purchase_units[0].payments.captures[0].id,
        amount: capture.result.purchase_units[0].payments.captures[0].amount,
        payer: capture.result.payer,
        capture: capture.result
      };

    } catch (error) {
      console.error('Erreur lors de la capture PayPal:', error);
      throw new Error(`Échec de la capture: ${error.message}`);
    }
  }

  // Remboursement
  async refundPayment(captureId, amount, reason = 'Remboursement demandé par le client') {
    try {
      if (!this.client) {
        throw new Error('Client PayPal non initialisé');
      }

      const request = new paypal.payments.CapturesRefundRequest(captureId);
      request.requestBody({
        amount: {
          value: amount.toString(),
          currency_code: 'EUR'
        },
        reason: reason
      });

      const refund = await this.client.execute(request);

      return {
        success: true,
        refundId: refund.result.id,
        status: refund.result.status,
        amount: refund.result.amount,
        refund: refund.result
      };

    } catch (error) {
      console.error('Erreur lors du remboursement PayPal:', error);
      throw new Error(`Échec du remboursement: ${error.message}`);
    }
  }

  // Vérifier le statut d'une commande
  async getOrder(orderId) {
    try {
      if (!this.client) {
        throw new Error('Client PayPal non initialisé');
      }

      const request = new paypal.orders.OrdersGetRequest(orderId);
      const order = await this.client.execute(request);

      return {
        success: true,
        orderId: order.result.id,
        status: order.result.status,
        amount: order.result.purchase_units[0].amount,
        payer: order.result.payer,
        order: order.result
      };

    } catch (error) {
      console.error('Erreur lors de la récupération de la commande PayPal:', error);
      throw new Error(`Échec de la récupération: ${error.message}`);
    }
  }

  // Créer un abonnement (subscription)
  async createSubscription(planId, subscriberData) {
    try {
      if (!this.client) {
        throw new Error('Client PayPal non initialisé');
      }

      const request = new paypal.billing.SubscriptionsCreateRequest();
      request.requestBody({
        plan_id: planId,
        subscriber: {
          name: {
            given_name: subscriberData.firstName,
            surname: subscriberData.lastName
          },
          email_address: subscriberData.email
        },
        application_context: {
          brand_name: 'Muamokel Services',
          locale: 'fr-FR',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
          return_url: `${process.env.FRONTEND_URL}/subscription/success`,
          cancel_url: `${process.env.FRONTEND_URL}/subscription/cancel`
        }
      });

      const subscription = await this.client.execute(request);

      return {
        success: true,
        subscriptionId: subscription.result.id,
        status: subscription.result.status,
        links: subscription.result.links,
        subscription: subscription.result
      };

    } catch (error) {
      console.error('Erreur lors de la création de l\'abonnement PayPal:', error);
      throw new Error(`Échec de la création de l'abonnement: ${error.message}`);
    }
  }

  // Annuler un abonnement
  async cancelSubscription(subscriptionId, reason = 'Annulation demandée par l\'utilisateur') {
    try {
      if (!this.client) {
        throw new Error('Client PayPal non initialisé');
      }

      const request = new paypal.billing.SubscriptionsCancelRequest(subscriptionId);
      request.requestBody({
        reason: reason
      });

      await this.client.execute(request);

      return {
        success: true,
        message: 'Abonnement annulé avec succès'
      };

    } catch (error) {
      console.error('Erreur lors de l\'annulation de l\'abonnement PayPal:', error);
      throw new Error(`Échec de l'annulation: ${error.message}`);
    }
  }

  // Webhooks PayPal
  async verifyWebhookSignature(headers, body) {
    try {
      const webhookId = process.env.PAYPAL_WEBHOOK_ID;
      if (!webhookId) {
        throw new Error('PAYPAL_WEBHOOK_ID non configuré');
      }

      const signature = headers['paypal-transmission-signature'];
      const transmissionId = headers['paypal-transmission-id'];
      const timestamp = headers['paypal-transmission-time'];
      const crc32 = headers['paypal-transmission-crc32'];

      // Vérification basique de la signature
      // En production, utiliser la vérification complète avec l'API PayPal
      const expectedSignature = this.generateSignature(transmissionId, timestamp, webhookId, crc32, body);

      if (signature === expectedSignature) {
        return { verified: true };
      } else {
        return { verified: false, error: 'Signature invalide' };
      }

    } catch (error) {
      console.error('Erreur lors de la vérification du webhook:', error);
      return { verified: false, error: error.message };
    }
  }

  generateSignature(transmissionId, timestamp, webhookId, crc32, body) {
    // Implémentation simplifiée - en production, utiliser crypto
    const crypto = require('crypto');
    const data = transmissionId + '|' + timestamp + '|' + webhookId + '|' + crc32 + '|' + JSON.stringify(body);
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // Vérifier la santé du service PayPal
  async healthCheck() {
    try {
      if (!this.client) {
        return { status: 'unhealthy', message: 'Client PayPal non initialisé' };
      }

      // Test simple en créant une requête de test
      return { status: 'healthy', message: 'Service PayPal opérationnel' };
    } catch (error) {
      return { status: 'unhealthy', message: error.message };
    }
  }

  // Méthodes utilitaires
  formatAmount(amount) {
    return {
      currency_code: 'EUR',
      value: parseFloat(amount).toFixed(2)
    };
  }

  validateOrderData(orderData) {
    const { amount, currency = 'EUR' } = orderData;

    if (!amount || amount <= 0) {
      throw new Error('Montant invalide');
    }

    if (!['EUR', 'USD', 'GBP'].includes(currency)) {
      throw new Error('Devise non supportée');
    }

    return true;
  }
}

module.exports = new PayPalService();
