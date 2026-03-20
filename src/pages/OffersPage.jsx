import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaStar, FaCode, FaMobile, FaCloud, FaShieldAlt, FaRocket, FaCog, FaTimes, FaEnvelope, FaClock, FaUsers, FaGlobe, FaDatabase, FaBrain, FaChartLine, FaLock, FaServer, FaTools as FaWrench } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const OffersPage = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const offers = [
    {
      id: 1,
      title: 'Pack Starter',
      subtitle: 'Idéal pour débuter',
      price: '299€',
      originalPrice: '399€',
      savings: '25%',
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      shadowColor: 'shadow-blue-500/25',
      hoverShadow: 'hover:shadow-blue-500/40',
      icon: <FaCode className="w-8 h-8" />,
      duration: '2-4 semaines',
      category: 'Web Development',
      features: [
        { text: 'Site web responsive (5 pages)', icon: <FaGlobe className="w-4 h-4" /> },
        { text: 'Design moderne et professionnel', icon: <FaRocket className="w-4 h-4" /> },
        { text: 'Optimisation SEO de base', icon: <FaChartLine className="w-4 h-4" /> },
        { text: 'Support technique 1 mois', icon: <FaUsers className="w-4 h-4" /> },
        { text: 'Formation à l\'administration', icon: <FaWrench className="w-4 h-4" /> },
      ],
      benefits: [
        'Hébergement offert 1 mois',
        'Domaine .com offert',
        'SSL gratuit',
        'Analytics de base',
        'Sauvegarde automatique'
      ],
      popular: false,
    },
    {
      id: 2,
      title: 'Pack Business',
      subtitle: 'Pour les entreprises en croissance',
      price: '599€',
      originalPrice: '799€',
      savings: '25%',
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      shadowColor: 'shadow-green-500/25',
      hoverShadow: 'hover:shadow-green-500/40',
      icon: <FaMobile className="w-8 h-8" />,
      duration: '4-6 semaines',
      category: 'Business Solutions',
      features: [
        { text: 'Site web responsive (10 pages)', icon: <FaGlobe className="w-4 h-4" /> },
        { text: 'Design premium personnalisé', icon: <FaRocket className="w-4 h-4" /> },
        { text: 'Optimisation SEO avancée', icon: <FaChartLine className="w-4 h-4" /> },
        { text: 'Intégration e-commerce', icon: <FaDatabase className="w-4 h-4" /> },
        { text: 'Support technique 3 mois', icon: <FaUsers className="w-4 h-4" /> },
        { text: 'Formation complète', icon: <FaWrench className="w-4 h-4" /> },
        { text: 'Maintenance mensuelle', icon: <FaClock className="w-4 h-4" /> },
      ],
      benefits: [
        'Hébergement offert 3 mois',
        'Domaine offert',
        'SSL premium',
        'Google Analytics Pro',
        'Sauvegarde cloud',
        'Certificat de conformité'
      ],
      popular: true,
    },
    {
      id: 3,
      title: 'Pack Enterprise',
      subtitle: 'Solution complète pour grandes entreprises',
      price: '999€',
      originalPrice: '1299€',
      savings: '23%',
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      shadowColor: 'shadow-purple-500/25',
      hoverShadow: 'hover:shadow-purple-500/40',
      icon: <FaCloud className="w-8 h-8" />,
      duration: '6-8 semaines',
      category: 'Enterprise Solutions',
      features: [
        { text: 'Site web responsive (pages illimitées)', icon: <FaGlobe className="w-4 h-4" /> },
        { text: 'Design sur mesure premium', icon: <FaRocket className="w-4 h-4" /> },
        { text: 'Optimisation SEO complète', icon: <FaChartLine className="w-4 h-4" /> },
        { text: 'Intégration e-commerce avancée', icon: <FaDatabase className="w-4 h-4" /> },
        { text: 'Support technique 6 mois', icon: <FaUsers className="w-4 h-4" /> },
        { text: 'Formation équipe complète', icon: <FaWrench className="w-4 h-4" /> },
        { text: 'Maintenance mensuelle', icon: <FaClock className="w-4 h-4" /> },
        { text: 'Analytics et reporting', icon: <FaBrain className="w-4 h-4" /> },
        { text: 'API personnalisées', icon: <FaServer className="w-4 h-4" /> },
      ],
      benefits: [
        'Hébergement offert 6 mois',
        'Domaine premium offert',
        'SSL entreprise',
        'Suite Analytics complète',
        'Sauvegarde entreprise',
        'Support prioritaire 24/7',
        'Audit de performance',
        'Formation équipe illimitée'
      ],
      popular: false,
    },
    {
      id: 4,
      title: 'Pack Sécurité',
      subtitle: 'Protection maximale de vos données',
      price: '800€',
      originalPrice: '1000€',
      savings: '20%',
      color: 'from-red-500 to-orange-500',
      bgGradient: 'from-red-500/10 to-orange-500/10',
      shadowColor: 'shadow-red-500/25',
      hoverShadow: 'hover:shadow-red-500/40',
      icon: <FaShieldAlt className="w-8 h-8" />,
      duration: '3-5 semaines',
      category: 'Security Solutions',
      features: [
        { text: 'Audit de sécurité complet', icon: <FaLock className="w-4 h-4" /> },
        { text: 'Mise en place HTTPS/SSL', icon: <FaShieldAlt className="w-4 h-4" /> },
        { text: 'Protection contre les attaques', icon: <FaWrench className="w-4 h-4" /> },
        { text: 'Sauvegarde automatique', icon: <FaDatabase className="w-4 h-4" /> },
        { text: 'Monitoring 24/7', icon: <FaClock className="w-4 h-4" /> },
        { text: 'Formation cybersécurité', icon: <FaUsers className="w-4 h-4" /> },
        { text: 'Support sécurité 6 mois', icon: <FaRocket className="w-4 h-4" /> },
      ],
      benefits: [
        'Certificat SSL offert',
        'Firewall avancé',
        'Protection DDoS',
        'Sauvegarde chiffrée',
        'Rapports de sécurité mensuels',
        'Formation équipe sécurité',
        'Support d\'urgence 24/7'
      ],
      popular: false,
    },
    {
      id: 5,
      title: 'Pack Développement',
      subtitle: 'Applications web sur mesure',
      price: '1500€',
      originalPrice: '1800€',
      savings: '17%',
      color: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-500/10 to-blue-500/10',
      shadowColor: 'shadow-indigo-500/25',
      hoverShadow: 'hover:shadow-indigo-500/40',
      icon: <FaCog className="w-8 h-8" />,
      duration: '8-12 semaines',
      category: 'Custom Development',
      features: [
        { text: 'Application web sur mesure', icon: <FaCode className="w-4 h-4" /> },
        { text: 'API RESTful complète', icon: <FaServer className="w-4 h-4" /> },
        { text: 'Base de données optimisée', icon: <FaDatabase className="w-4 h-4" /> },
        { text: 'Tests automatisés', icon: <FaWrench className="w-4 h-4" /> },
        { text: 'CI/CD pipeline', icon: <FaRocket className="w-4 h-4" /> },
        { text: 'Documentation technique', icon: <FaChartLine className="w-4 h-4" /> },
        { text: 'Support développement 6 mois', icon: <FaUsers className="w-4 h-4" /> },
      ],
      benefits: [
        'Architecture scalable',
        'Tests unitaires et intégration',
        'Documentation API complète',
        'Environnement de staging',
        'Support technique prioritaire',
        'Formation développeur',
        'Maintenance évolutive'
      ],
      popular: false,
    },
    {
      id: 6,
      title: 'Pack Innovation',
      subtitle: 'Solutions IA et technologies avancées',
      price: '2000€',
      originalPrice: '2500€',
      savings: '20%',
      color: 'from-teal-500 to-cyan-500',
      bgGradient: 'from-teal-500/10 to-cyan-500/10',
      shadowColor: 'shadow-teal-500/25',
      hoverShadow: 'hover:shadow-teal-500/40',
      icon: <FaRocket className="w-8 h-8" />,
      duration: '12-16 semaines',
      category: 'AI & Innovation',
      features: [
        { text: 'Solution IA/ML intégrée', icon: <FaBrain className="w-4 h-4" /> },
        { text: 'Architecture microservices', icon: <FaServer className="w-4 h-4" /> },
        { text: 'Intégration cloud avancée', icon: <FaCloud className="w-4 h-4" /> },
        { text: 'Analytics prédictifs', icon: <FaChartLine className="w-4 h-4" /> },
        { text: 'Interface utilisateur premium', icon: <FaRocket className="w-4 h-4" /> },
        { text: 'Performance optimisée', icon: <FaWrench className="w-4 h-4" /> },
        { text: 'Support innovation 12 mois', icon: <FaUsers className="w-4 h-4" /> },
      ],
      benefits: [
        'Modèles IA pré-entraînés',
        'Dashboard analytics avancé',
        'API d\'intégration',
        'Support IA/ML dédié',
        'Formation équipe innovation',
        'Mises à jour technologiques',
        'Accompagnement transformation digitale'
      ],
      popular: false,
    },
  ];

  const handlePackageClick = (offer) => {
    setSelectedPackage(offer);
    setFormData(prev => ({
      ...prev,
      projectType: offer.title
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
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Non spécifié',
        phone: formData.phone || 'Non spécifié',
        service: selectedPackage.title,
        service_category: selectedPackage.category,
        budget: formData.budget || 'Non spécifié',
        timeline: formData.timeline || 'Non spécifié',
        project_details: formData.message,
        offer_details: `Prix: ${selectedPackage.price} (Économisez ${selectedPackage.savings})\nDurée: ${selectedPackage.duration}\nFonctionnalités: ${selectedPackage.features.map(f => f.text).join(', ')}\nAvantages: ${selectedPackage.benefits.join(', ')}`,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Enhanced Navbar with Dark Theme */}
      <nav className="bg-slate-800/95 backdrop-blur-lg shadow-2xl sticky top-0 z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
              >
                <FaRocket className="text-xl text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Muamokel Services
              </span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-slate-300 hover:text-blue-400 transition-all duration-300 hover:scale-105">Accueil</Link>
              <Link to="/services" className="text-slate-300 hover:text-blue-400 transition-all duration-300 hover:scale-105">Services</Link>
              <Link to="/offers" className="text-blue-400 font-semibold border-b-2 border-blue-400 pb-1">Offres</Link>
              <Link to="/contact" className="text-slate-300 hover:text-blue-400 transition-all duration-300 hover:scale-105">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header with Dark Theme */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6"
            >
              <FaRocket className="text-4xl text-blue-400" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
              Nos Offres Premium
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Découvrez nos packs exclusifs conçus pour propulser votre entreprise vers l'excellence digitale.
              Chaque offre est une solution complète et personnalisée.
            </p>
          </motion.div>

          {/* Enhanced Offers Grid with Dark Theme */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className={`group relative ${offer.bgGradient} backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden ${offer.shadowColor} ${offer.hoverShadow} transition-all duration-500 ${offer.popular ? 'ring-2 ring-green-400/50 scale-105' : ''}`}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_70%)] animate-pulse" />
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(255,255,255,0.05),transparent)] animate-spin" style={{animationDuration: '25s'}} />
                </div>

                {/* Floating Particles */}
                <div className="absolute top-6 right-6 w-3 h-3 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
                <div className="absolute top-12 right-12 w-2 h-2 bg-white/15 rounded-full animate-bounce" style={{animationDelay: '0.7s'}} />
                <div className="absolute bottom-8 left-8 w-2.5 h-2.5 bg-white/18 rounded-full animate-bounce" style={{animationDelay: '1.4s'}} />

                {offer.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-2xl">
                      <FaStar className="w-4 h-4 animate-pulse" />
                      Plus Populaire
                      <FaStar className="w-4 h-4 animate-pulse" />
                    </div>
                  </motion.div>
                )}

                <div className="relative p-8">
                  {/* Enhanced Header Section */}
                  <div className="text-center mb-8">
                    <motion.div
                      className={`inline-flex p-6 rounded-3xl bg-gradient-to-br ${offer.color} text-white mb-6 shadow-2xl relative overflow-hidden`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      <div className="relative z-10">
                        {offer.icon}
                      </div>
                    </motion.div>

                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {offer.title}
                    </h3>
                    <p className="text-slate-400 text-lg mb-6">{offer.subtitle}</p>

                    {/* Enhanced Pricing Section */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-slate-600/30">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                          {offer.price}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-lg text-slate-400 line-through">{offer.originalPrice}</span>
                          <span className="text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-semibold">
                            -{offer.savings}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-slate-300">
                        <FaClock className="w-4 h-4" />
                        <span className="text-sm">{offer.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Features Section */}
                  <div className="mb-8">
                    <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                      <FaCheck className="w-5 h-5 text-green-400" />
                      Fonctionnalités Incluses
                    </h4>
                    <motion.ul
                      className="space-y-4"
                      initial="hidden"
                      whileHover="visible"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.1
                          }
                        }
                      }}
                    >
                      {offer.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-start gap-3 text-slate-300 group-hover:text-slate-200 transition-colors duration-300"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                        >
                          <motion.div
                            className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                            whileHover={{ scale: 1.3, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            {feature.icon}
                          </motion.div>
                          <span className="leading-relaxed">{feature.text}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  {/* Enhanced Benefits Section */}
                  <div className="mb-8 p-4 bg-slate-800/30 rounded-2xl border border-slate-600/20">
                    <h5 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <FaStar className="w-4 h-4 text-yellow-400" />
                      Avantages Exclusifs
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {offer.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced CTA Button */}
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePackageClick(offer)}
                    className={`w-full py-4 px-8 bg-gradient-to-r ${offer.color} text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden group/btn`}
                  >
                    {/* Button Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />

                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaEnvelope className="w-5 h-5 relative z-10" />
                    </motion.div>
                    <span className="relative z-10 text-lg">Demander un Devis</span>

                    {/* Ripple Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center bg-white rounded-2xl shadow-xl p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Besoin d'une solution sur mesure ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour discuter de votre projet spécifique. Nous créons des solutions
              personnalisées adaptées à vos besoins uniques.
            </p>
            {/* CORRECTION 3 */}
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Nous contacter
            </motion.button>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <FAQSection />
          </motion.div>

          {/* Professional Quote Modal */}
          <AnimatePresence>
            {isModalOpen && selectedPackage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-slate-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-700/50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-8 border-b border-slate-600/50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className={`p-4 rounded-2xl bg-gradient-to-br ${selectedPackage.color} text-white shadow-xl`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {selectedPackage.icon}
                        </motion.div>
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-2">{selectedPackage.title}</h2>
                          <p className="text-slate-300 text-lg">{selectedPackage.subtitle}</p>
                          <div className="flex items-center gap-4 mt-4">
                            <div className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                              {selectedPackage.price}
                            </div>
                            <div className="text-slate-400 line-through">{selectedPackage.originalPrice}</div>
                            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                              -{selectedPackage.savings}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-xl"
                      >
                        <FaTimes className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="flex max-h-[60vh] overflow-hidden">
                    {/* Left Side - Offer Details */}
                    <div className="flex-1 p-8 border-r border-slate-700/50 overflow-y-auto">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <FaCheck className="w-5 h-5 text-green-400" />
                        Détails de l'Offre
                      </h3>

                      {/* Features */}
                      <div className="mb-8">
                        <h4 className="text-white font-semibold mb-4">Fonctionnalités Incluses :</h4>
                        <div className="space-y-3">
                          {selectedPackage.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-slate-300">
                              <div className="w-5 h-5 bg-green-400/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                                {feature.icon}
                              </div>
                              <span>{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="mb-8">
                        <h4 className="text-white font-semibold mb-4">Avantages Exclusifs :</h4>
                        <div className="space-y-2">
                          {selectedPackage.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-slate-400 text-sm">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Duration & Category */}
                      <div className="bg-slate-700/30 rounded-2xl p-4 border border-slate-600/20">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-slate-300">
                            <FaClock className="w-4 h-4" />
                            <span>Durée: {selectedPackage.duration}</span>
                          </div>
                          <div className="text-slate-400">
                            Catégorie: {selectedPackage.category}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Quote Form */}
                    <div className="w-96 p-8 bg-slate-700/20 overflow-y-auto">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <FaEnvelope className="w-5 h-5 text-blue-400" />
                        Demander un Devis
                      </h3>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Nom complet *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Votre nom complet"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="votre@email.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Entreprise
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Nom de votre entreprise"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="+33 6 XX XX XX XX"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Budget souhaité
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="">Sélectionner un budget</option>
                            <option value="Moins de 1000€">Moins de 1000€</option>
                            <option value="1000€ - 5000€">1000€ - 5000€</option>
                            <option value="5000€ - 15000€">5000€ - 15000€</option>
                            <option value="Plus de 15000€">Plus de 15000€</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Délai souhaité
                          </label>
                          <select
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="">Sélectionner un délai</option>
                            <option value="Urgent (1-2 semaines)">Urgent (1-2 semaines)</option>
                            <option value="Normal (1-2 mois)">Normal (1-2 mois)</option>
                            <option value="Flexible (3+ mois)">Flexible (3+ mois)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Détails supplémentaires
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                            placeholder="Décrivez vos besoins spécifiques, objectifs, ou toute information complémentaire..."
                          />
                        </div>

                        {/* Modal Footer */}
                        <div className="flex gap-3 pt-6 border-t border-slate-600/50">
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-3 px-6 bg-slate-600 text-slate-300 rounded-xl hover:bg-slate-500 transition-all font-medium"
                          >
                            Annuler
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
