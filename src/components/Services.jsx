import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaMobileAlt, FaPalette, FaShieldAlt, FaTools, FaCloud, FaGraduationCap, FaEnvelope, FaTimes, FaCheck } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: 'Développement Web',
      description: 'Sites web modernes, performants et responsives. De la landing page au site e-commerce complet.',
      price: 'À partir de 1200$',
      duration: '2-8 semaines',
      benefits: ['Design responsive', 'SEO optimisé', 'Performance maximale', 'Support technique'],
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      shadowColor: 'shadow-blue-500/25',
      hoverShadow: 'hover:shadow-blue-500/40'
    },
    {
      icon: <FaMobileAlt className="w-8 h-8" />,
      title: 'Applications Mobiles',
      description: 'Applications natives iOS/Android ou cross-platform avec React Native et Flutter.',
      price: 'À partir de 2500$',
      duration: '4-12 semaines',
      benefits: ['UI/UX native', 'Performance optimale', 'Publication store', 'Maintenance incluse'],
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      shadowColor: 'shadow-green-500/25',
      hoverShadow: 'hover:shadow-green-500/40'
    },
    {
      icon: <FaPalette className="w-8 h-8" />,
      title: 'Design UI/UX',
      description: 'Interfaces utilisateur intuitives et expériences utilisateur exceptionnelles.',
      price: 'À partir de 800$',
      duration: '1-4 semaines',
      benefits: ['Wireframes & mockups', 'Système de design', 'Prototypage', 'Tests utilisateurs'],
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      shadowColor: 'shadow-purple-500/25',
      hoverShadow: 'hover:shadow-purple-500/40'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: 'Cybersécurité',
      description: 'Protection complète de vos systèmes et données contre les menaces cybernétiques.',
      price: 'À partir de 1500$',
      duration: '1-6 semaines',
      benefits: ['Audit sécurité', 'Protection données', 'Formation équipe', 'Monitoring 24/7'],
      gradient: 'from-red-500 to-orange-500',
      bgGradient: 'from-red-500/20 to-orange-500/20',
      shadowColor: 'shadow-red-500/25',
      hoverShadow: 'hover:shadow-red-500/40'
    },
    {
      icon: <FaTools className="w-8 h-8" />,
      title: 'Maintenance Systèmes',
      description: 'Maintenance préventive et corrective de vos infrastructures informatiques.',
      price: 'À partir de 300$/mois',
      duration: 'Contrat flexible',
      benefits: ['Support technique', 'Mises à jour', 'Sauvegarde', 'Optimisation'],
      gradient: 'from-yellow-500 to-amber-500',
      bgGradient: 'from-yellow-500/20 to-amber-500/20',
      shadowColor: 'shadow-yellow-500/25',
      hoverShadow: 'hover:shadow-yellow-500/40'
    },
    {
      icon: <FaCloud className="w-8 h-8" />,
      title: 'Services Cloud',
      description: 'Migration et gestion d\'infrastructures cloud scalables et sécurisées.',
      price: 'À partir de 1000$',
      duration: '2-6 semaines',
      benefits: ['Migration cloud', 'Auto-scaling', 'Sauvegarde cloud', 'Monitoring'],
      gradient: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-500/20 to-blue-500/20',
      shadowColor: 'shadow-indigo-500/25',
      hoverShadow: 'hover:shadow-indigo-500/40'
    },
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: 'Formation et Accompagnement',
      description: 'Formations personnalisées et accompagnement pour développer vos compétences techniques.',
      price: 'À partir de 500$',
      duration: 'Sessions flexibles',
      benefits: ['Formations sur mesure', 'Accompagnement projet', 'Support technique', 'Certification'],
      gradient: 'from-teal-500 to-green-500',
      bgGradient: 'from-teal-500/20 to-green-500/20',
      shadowColor: 'shadow-teal-500/25',
      hoverShadow: 'hover:shadow-teal-500/40'
    }
  ];

  // Helper pour convertir le titre en clé EmailJS
  function getServiceKey(title) {
    switch (title) {
      case 'Web Development':
        return 'web-development';
      case 'Mobile Applications':
        return 'mobile';
      case 'UI/UX Design':
        return 'design';
      case 'Cybersecurity':
        return 'cybersecurity';
      case 'System Maintenance':
        return 'maintenance';
      case 'Cloud Services':
        return 'cloud';
      case 'Training & Support':
        return 'training';
      default:
        return 'other';
    }
  }

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setFormData(prev => ({
      ...prev,
      projectType: service.title
    }));
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceKey = getServiceKey(selectedService.title);

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Non spécifié',
        phone: formData.phone || 'Non spécifié',
        service: selectedService.title,
        service_key: serviceKey,
        budget: formData.budget || 'Non spécifié',
        timeline: formData.timeline || 'Non spécifié',
        project_details: formData.message,
        to_email: 'contact@muamokel.com'
      };

      await emailjs.send(
        'service_muamokel',
        'template_quote_request',
        templateParams,
        'your_public_key'
      );

      toast.success('Demande de devis envoyée avec succès ! Nous vous contacterons bientôt.');
      setIsModalOpen(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast.error('Erreur lors de l\'envoi de la demande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Nos <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Services</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Découvrez notre gamme complète de services informatiques professionnels.
          Du développement web aux solutions cloud, nous accompagnons votre transformation digitale.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${service.bgGradient} backdrop-blur-lg border border-white/20 ${service.shadowColor} ${service.hoverShadow} hover:border-white/40 transition-all duration-500 transform hover:scale-[1.02] hover:rotate-1 group/card`}>
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_70%)] animate-pulse" />
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(255,255,255,0.1),transparent)] animate-spin" style={{animationDuration: '20s'}} />
              </div>

              {/* Floating Particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
              <div className="absolute top-8 right-8 w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '0.5s'}} />
              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce" style={{animationDelay: '1s'}} />

              <div className="relative p-8">
                {/* Icon with Enhanced Animation */}
                <motion.div
                  className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${service.gradient} text-white mb-6 shadow-2xl relative overflow-hidden`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  <div className="relative z-10">
                    {service.icon}
                  </div>
                </motion.div>

                {/* Title with Gradient Animation */}
                <motion.h3
                  className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 group-hover/card:from-blue-300 group-hover/card:to-purple-300 transition-all duration-500"
                  whileHover={{ scale: 1.05 }}
                >
                  {service.title}
                </motion.h3>

                {/* Description with Fade Effect */}
                <motion.p
                  className="text-gray-300 mb-6 leading-relaxed group-hover/card:text-gray-200 transition-colors duration-300"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {service.description}
                </motion.p>

                {/* Price & Duration with Enhanced Styling */}
                <div className="flex justify-between items-center mb-6 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <motion.div
                    className="text-white font-bold text-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    {service.price}
                  </motion.div>
                  <motion.div
                    className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    {service.duration}
                  </motion.div>
                </div>

                {/* Benefits with Stagger Animation */}
                <div className="mb-8">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <FaCheck className="w-4 h-4 text-green-400" />
                    Inclus :
                  </h4>
                  <motion.ul
                    className="space-y-3"
                    initial="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {service.benefits.map((benefit, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center text-sm text-gray-300 group-hover/card:text-gray-200 transition-colors duration-300"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                      >
                        <motion.div
                          className="w-5 h-5 bg-green-400/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaCheck className="w-3 h-3 text-green-400" />
                        </motion.div>
                        {benefit}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Enhanced CTA Button */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleServiceSelect(service)}
                  className={`w-full py-4 px-6 bg-gradient-to-r ${service.gradient} text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden group/btn`}
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />

                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaEnvelope className="w-5 h-5 relative z-10" />
                  </motion.div>
                  <span className="relative z-10">Demander un devis</span>

                  {/* Ripple Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de devis */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Demande de devis</h2>
                <p className="text-gray-400 mt-1">Service: {selectedService?.title}</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nom de votre entreprise"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+33 6 XX XX XX XX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget estimé
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner un budget</option>
                    <option value="< 5000$">Moins de 5000$</option>
                    <option value="5000$ - 15000$">5000$ - 15000$</option>
                    <option value="15000$ - 30000$">15000€ - 30000$</option>
                    <option value="> 30000$">Plus de 30000$</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Délai souhaité
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner un délai</option>
                    <option value="Urgent (1-2 semaines)">Urgent (1-2 semaines)</option>
                    <option value="Normal (1-2 mois)">Normal (1-2 mois)</option>
                    <option value="Flexible (3+ mois)">Flexible (3+ mois)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Détails du projet *
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Décrivez votre projet, vos besoins spécifiques, vos objectifs..."
                />
              </div>

              {/* Modal Footer */}
              <div className="flex gap-4 pt-6 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-6 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FaEnvelope className="w-5 h-5" />
                      Envoyer la demande
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
