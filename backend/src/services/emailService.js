const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;

class EmailService {
  constructor() {
    this.transporter = null;
    this.templates = {};
    this.initializeTransporter();
    this.loadTemplates();
  }

  initializeTransporter() {
    // Configuration pour différents environnements
    const config = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true pour 465, false pour autres ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      // Options supplémentaires pour la sécurité
      tls: {
        ciphers: 'SSLv3'
      }
    };

    this.transporter = nodemailer.createTransporter(config);

    // Vérifier la connexion
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('Erreur de configuration SMTP:', error);
      } else {
        console.log('Serveur SMTP prêt à envoyer des emails');
      }
    });
  }

  async loadTemplates() {
    try {
      // Charger les templates d'emails depuis le système de fichiers
      const templatesDir = path.join(__dirname, '../../templates/emails');

      // Créer le dossier s'il n'existe pas
      try {
        await fs.access(templatesDir);
      } catch {
        await fs.mkdir(templatesDir, { recursive: true });
      }

      // Templates par défaut
      this.templates = {
        welcome: this.getDefaultWelcomeTemplate(),
        quote_request: this.getDefaultQuoteRequestTemplate(),
        payment_confirmation: this.getDefaultPaymentConfirmationTemplate(),
        contact: this.getDefaultContactTemplate()
      };

    } catch (error) {
      console.error('Erreur lors du chargement des templates:', error);
      // Templates par défaut en cas d'erreur
      this.templates = {
        welcome: this.getDefaultWelcomeTemplate(),
        quote_request: this.getDefaultQuoteRequestTemplate(),
        payment_confirmation: this.getDefaultPaymentConfirmationTemplate(),
        contact: this.getDefaultContactTemplate()
      };
    }
  }

  getDefaultWelcomeTemplate() {
    return {
      subject: 'Bienvenue chez Muamokel Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Bienvenue chez Muamokel Services !</h1>
          <p>Merci de vous être inscrit sur notre plateforme.</p>
          <p>Nous sommes ravis de vous compter parmi nos clients.</p>
          <div style="background: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <p><strong>Prochaines étapes :</strong></p>
            <ul>
              <li>Explorez nos services</li>
              <li>Contactez-nous pour vos projets</li>
              <li>Découvrez notre portfolio</li>
            </ul>
          </div>
          <p>Cordialement,<br>L'équipe Muamokel Services</p>
        </div>
      `
    };
  }

  getDefaultQuoteRequestTemplate() {
    return {
      subject: 'Nouvelle demande de devis - {{service}}',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Nouvelle demande de devis</h1>
          <div style="background: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h2>Détails de la demande :</h2>
            <p><strong>Client :</strong> {{name}}</p>
            <p><strong>Email :</strong> {{email}}</p>
            <p><strong>Service :</strong> {{service}}</p>
            <p><strong>Budget :</strong> {{budget}}</p>
            <p><strong>Délai souhaité :</strong> {{timeline}}</p>
            <p><strong>Entreprise :</strong> {{company}}</p>
            <p><strong>Téléphone :</strong> {{phone}}</p>
          </div>
          <div style="background: #ecfdf5; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10b981;">
            <h3>Description du projet :</h3>
            <p>{{project_details}}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Cette demande a été reçue via le formulaire de contact de votre site web.
          </p>
        </div>
      `
    };
  }

  getDefaultPaymentConfirmationTemplate() {
    return {
      subject: 'Confirmation de paiement - Muamokel Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10b981;">Paiement confirmé !</h1>
          <p>Merci pour votre paiement. Votre transaction a été traitée avec succès.</p>
          <div style="background: #f0fdf4; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10b981;">
            <h2>Détails du paiement :</h2>
            <p><strong>Montant :</strong> {{amount}}€</p>
            <p><strong>Référence :</strong> {{reference}}</p>
            <p><strong>Date :</strong> {{date}}</p>
            <p><strong>Service :</strong> {{service}}</p>
          </div>
          <p>Nous allons commencer à travailler sur votre projet dans les plus brefs délais.</p>
          <p>Cordialement,<br>L'équipe Muamokel Services</p>
        </div>
      `
    };
  }

  getDefaultContactTemplate() {
    return {
      subject: 'Nouveau message de contact - {{subject}}',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Nouveau message de contact</h1>
          <div style="background: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <p><strong>De :</strong> {{name}} ({{email}})</p>
            <p><strong>Sujet :</strong> {{subject}}</p>
            <p><strong>Téléphone :</strong> {{phone}}</p>
          </div>
          <div style="background: #ecfdf5; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3>Message :</h3>
            <p>{{message}}</p>
          </div>
        </div>
      `
    };
  }

  async sendEmail(to, templateName, data = {}) {
    try {
      if (!this.transporter) {
        throw new Error('Transporteur email non initialisé');
      }

      const template = this.templates[templateName];
      if (!template) {
        throw new Error(`Template '${templateName}' non trouvé`);
      }

      // Remplacer les variables dans le template
      let subject = template.subject;
      let html = template.html;

      Object.keys(data).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        subject = subject.replace(regex, data[key] || '');
        html = html.replace(regex, data[key] || '');
      });

      const mailOptions = {
        from: `"Muamokel Services" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email envoyé:', info.messageId);

      return {
        success: true,
        messageId: info.messageId,
        response: info.response
      };

    } catch (error) {
      console.error('Erreur lors de l\'envoi d\'email:', error);
      throw new Error(`Échec de l'envoi d'email: ${error.message}`);
    }
  }

  // Méthodes spécifiques pour différents types d'emails
  async sendWelcomeEmail(to, userData) {
    return this.sendEmail(to, 'welcome', userData);
  }

  async sendQuoteRequestEmail(to, quoteData) {
    return this.sendEmail(to, 'quote_request', quoteData);
  }

  async sendPaymentConfirmationEmail(to, paymentData) {
    return this.sendEmail(to, 'payment_confirmation', paymentData);
  }

  async sendContactEmail(to, contactData) {
    return this.sendEmail(to, 'contact', contactData);
  }

  // Méthode pour envoyer des emails en masse (avec limitation)
  async sendBulkEmails(emails, templateName, data) {
    const results = [];
    const delay = 1000; // 1 seconde entre chaque email pour éviter le spam

    for (const email of emails) {
      try {
        const result = await this.sendEmail(email, templateName, data);
        results.push({ email, success: true, ...result });
      } catch (error) {
        results.push({ email, success: false, error: error.message });
      }

      // Attendre avant le prochain email
      if (emails.length > 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    return results;
  }

  // Vérifier la santé du service email
  async healthCheck() {
    try {
      await this.transporter.verify();
      return { status: 'healthy', message: 'Service email opérationnel' };
    } catch (error) {
      return { status: 'unhealthy', message: error.message };
    }
  }
}

module.exports = new EmailService();
