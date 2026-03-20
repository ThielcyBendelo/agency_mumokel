const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Service Stripe pour gérer les paiements
 */
class StripeService {
  constructor() {
    this.stripe = stripe;
  }

  /**
   * Créer une intention de paiement
   */
  async createPaymentIntent(amount, currency = 'eur', metadata = {}) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convertir en centimes
        currency: currency.toLowerCase(),
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status
      };
    } catch (error) {
      console.error('Erreur lors de la création du PaymentIntent:', error);
      throw new Error('Impossible de créer l\'intention de paiement');
    }
  }

  /**
   * Confirmer un paiement
   */
  async confirmPayment(paymentIntentId) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId);
      return {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata
      };
    } catch (error) {
      console.error('Erreur lors de la confirmation du paiement:', error);
      throw new Error('Impossible de confirmer le paiement');
    }
  }

  /**
   * Annuler un paiement
   */
  async cancelPayment(paymentIntentId) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.cancel(paymentIntentId);
      return {
        id: paymentIntent.id,
        status: paymentIntent.status,
        canceled: true
      };
    } catch (error) {
      console.error('Erreur lors de l\'annulation du paiement:', error);
      throw new Error('Impossible d\'annuler le paiement');
    }
  }

  /**
   * Récupérer les détails d'un paiement
   */
  async getPaymentDetails(paymentIntentId) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      return {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata,
        created: paymentIntent.created,
        description: paymentIntent.description
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du paiement:', error);
      throw new Error('Impossible de récupérer les détails du paiement');
    }
  }

  /**
   * Créer une session de checkout
   */
  async createCheckoutSession(items, successUrl, cancelUrl, metadata = {}) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map(item => ({
          price_data: {
            currency: item.currency || 'eur',
            product_data: {
              name: item.name,
              description: item.description,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity || 1,
        })),
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata,
      });

      return {
        sessionId: session.id,
        url: session.url,
        paymentStatus: session.payment_status
      };
    } catch (error) {
      console.error('Erreur lors de la création de la session checkout:', error);
      throw new Error('Impossible de créer la session de paiement');
    }
  }

  /**
   * Traiter un webhook Stripe
   */
  async handleWebhook(rawBody, signature) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      return event;
    } catch (error) {
      console.error('Erreur webhook Stripe:', error);
      throw new Error('Webhook invalide');
    }
  }

  /**
   * Créer un produit Stripe
   */
  async createProduct(name, description, price, currency = 'eur') {
    try {
      const product = await this.stripe.products.create({
        name,
        description,
      });

      const priceObj = await this.stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(price * 100),
        currency,
      });

      return {
        productId: product.id,
        priceId: priceObj.id,
        name: product.name,
        price: priceObj.unit_amount / 100,
        currency: priceObj.currency
      };
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
      throw new Error('Impossible de créer le produit');
    }
  }

  /**
   * Récupérer la clé publique Stripe
   */
  getPublishableKey() {
    return process.env.STRIPE_PUBLISHABLE_KEY;
  }
}

module.exports = new StripeService();
