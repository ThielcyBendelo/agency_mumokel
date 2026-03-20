const emailService = require('../../services/emailService');
const {
  successResponse,
  errorResponse,
  createdResponse
} = require('../../utils/response');
const { contactLogger } = require('../../utils/logger');

/**
 * Envoyer un message de contact
 */
const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message, phone, company } = req.body;

    // Envoyer l'email de contact
    await emailService.sendContactEmail({
      name,
      email,
      subject,
      message,
      phone,
      company
    });

    // Logger le message de contact
    contactLogger.info(`Message de contact envoyé par ${name} (${email}): ${subject}`);

    successResponse(res, 'Message envoyé avec succès. Nous vous répondrons dans les plus brefs délais.');

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message de contact:', error);
    errorResponse(res, 'Erreur lors de l\'envoi du message. Veuillez réessayer.');
  }
};

/**
 * Envoyer une demande de devis
 */
const sendQuoteRequest = async (req, res) => {
  try {
    const { name, email, company, projectType, budget, timeline, description, phone } = req.body;

    // Créer le contenu du message
    const subject = `Demande de devis - ${projectType}`;
    const message = `
Nouvelle demande de devis reçue :

Client: ${name}
Email: ${email}
Entreprise: ${company || 'N/A'}
Téléphone: ${phone || 'N/A'}

Type de projet: ${projectType}
Budget estimé: ${budget || 'N/A'}
Délai souhaité: ${timeline || 'N/A'}

Description du projet:
${description}

Cordialement,
L'équipe Muamokel Services
    `.trim();

    // Envoyer l'email
    await emailService.sendContactEmail({
      name,
      email,
      subject,
      message,
      phone,
      company
    });

    // Logger la demande de devis
    contactLogger.info(`Demande de devis envoyée par ${name} (${email}) pour ${projectType}`);

    successResponse(res, 'Demande de devis envoyée avec succès. Nous vous contacterons bientôt.');

  } catch (error) {
    console.error('Erreur lors de l\'envoi de la demande de devis:', error);
    errorResponse(res, 'Erreur lors de l\'envoi de la demande. Veuillez réessayer.');
  }
};

/**
 * Envoyer une demande de rappel
 */
const requestCallback = async (req, res) => {
  try {
    const { name, email, phone, preferredTime, subject } = req.body;

    const message = `
Demande de rappel téléphonique :

Nom: ${name}
Email: ${email}
Téléphone: ${phone}
Heure préférée: ${preferredTime || 'N/A'}
Sujet: ${subject || 'Consultation générale'}

Veuillez contacter ce prospect dans les plus brefs délais.
    `.trim();

    // Envoyer l'email
    await emailService.sendContactEmail({
      name,
      email,
      subject: `RAPPEL DEMANDÉ - ${name}`,
      message,
      phone
    });

    // Logger la demande de rappel
    contactLogger.info(`Demande de rappel demandée par ${name} (${email}) - ${phone}`);

    successResponse(res, 'Demande de rappel enregistrée. Nous vous contacterons bientôt.');

  } catch (error) {
    console.error('Erreur lors de l\'envoi de la demande de rappel:', error);
    errorResponse(res, 'Erreur lors de l\'envoi de la demande. Veuillez réessayer.');
  }
};

/**
 * Souscrire à la newsletter
 */
const subscribeNewsletter = async (req, res) => {
  try {
    const { email, name } = req.body;

    const message = `
Nouvelle inscription à la newsletter :

Nom: ${name || 'N/A'}
Email: ${email}

Bienvenue dans notre communauté !
    `.trim();

    // Envoyer l'email de confirmation
    await emailService.sendContactEmail({
      name: name || 'Newsletter Subscriber',
      email,
      subject: 'Nouvelle inscription à la newsletter',
      message
    });

    // Logger l'inscription
    contactLogger.info(`Inscription newsletter: ${email}`);

    successResponse(res, 'Inscription à la newsletter confirmée. Bienvenue !');

  } catch (error) {
    console.error('Erreur lors de l\'inscription à la newsletter:', error);
    errorResponse(res, 'Erreur lors de l\'inscription. Veuillez réessayer.');
  }
};

/**
 * Signaler un problème technique
 */
const reportIssue = async (req, res) => {
  try {
    const { name, email, issueType, description, url, browser, priority } = req.body;

    const message = `
Signalement de problème technique :

De: ${name} (${email})

Type de problème: ${issueType}
Priorité: ${priority || 'normal'}
URL: ${url || 'N/A'}
Navigateur: ${browser || 'N/A'}

Description:
${description}

Veuillez traiter ce signalement selon la priorité indiquée.
    `.trim();

    // Envoyer l'email
    await emailService.sendContactEmail({
      name,
      email,
      subject: `[${priority?.toUpperCase() || 'NORMAL'}] Signalement technique - ${issueType}`,
      message
    });

    // Logger le signalement
    contactLogger.warn(`Signalement technique de ${name} (${email}): ${issueType}`);

    successResponse(res, 'Signalement envoyé avec succès. Merci pour votre retour.');

  } catch (error) {
    console.error('Erreur lors de l\'envoi du signalement:', error);
    errorResponse(res, 'Erreur lors de l\'envoi du signalement. Veuillez réessayer.');
  }
};

/**
 * Demande de partenariat
 */
const requestPartnership = async (req, res) => {
  try {
    const { name, email, company, partnershipType, description, website } = req.body;

    const message = `
Demande de partenariat :

Entreprise: ${company}
Contact: ${name}
Email: ${email}
Site web: ${website || 'N/A'}

Type de partenariat: ${partnershipType}

Description:
${description}

Veuillez évaluer cette opportunité de partenariat.
    `.trim();

    // Envoyer l'email
    await emailService.sendContactEmail({
      name,
      email,
      subject: `Demande de partenariat - ${company}`,
      message,
      company
    });

    // Logger la demande de partenariat
    contactLogger.info(`Demande de partenariat de ${company} (${email})`);

    successResponse(res, 'Demande de partenariat envoyée avec succès. Nous vous contacterons bientôt.');

  } catch (error) {
    console.error('Erreur lors de l\'envoi de la demande de partenariat:', error);
    errorResponse(res, 'Erreur lors de l\'envoi de la demande. Veuillez réessayer.');
  }
};

module.exports = {
  sendContactMessage,
  sendQuoteRequest,
  requestCallback,
  subscribeNewsletter,
  reportIssue,
  requestPartnership
};
