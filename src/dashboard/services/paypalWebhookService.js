/**
 * Service pour gérer les Webhooks PayPal
 */
const paypalWebhookService = {
  /**
   * Analyse et traite la notification reçue de PayPal
   * @param {Object} data - Le corps de la requête (JSON) envoyé par PayPal
   */
  handleWebhook: (data) => {
    try {
      const eventType = data.event_type;
      console.log(`📩 Webhook PayPal reçu : ${eventType}`);

      switch (eventType) {
        case 'PAYMENT.CAPTURE.COMPLETED':
          console.log('✅ Paiement complété avec succès !');
          // Ajoutez ici votre logique (ex: mettre à jour la base de données)
          break;

        case 'PAYMENT.CAPTURE.DENIED':
          console.warn('❌ Paiement refusé.');
          break;

        case 'BILLING.SUBSCRIPTION.CANCELLED':
          console.log('📅 Abonnement annulé.');
          break;

        default:
          console.log(`ℹ️ Événement non géré : ${eventType}`);
      }

      return { success: true, event: eventType };
    } catch (error) {
      console.error('⚠️ Erreur lors du traitement du Webhook:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Vérifie si l'ID de transaction est valide (exemple de fonction utilitaire)
   */
  validateTransaction: (transactionId) => {
    return !!transactionId && transactionId.length > 5;
  }
};

// Très important pour que l'import dans main.jsx fonctionne !
export default paypalWebhookService;
