 import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaEuroSign, FaSearch, FaFilter, FaBriefcase, FaUsers, FaHeart, FaRocket, FaShieldAlt, FaCode, FaPalette, FaCloud, FaTools, FaUpload, FaCheck, FaStar, FaQuoteLeft, FaArrowRight, FaBuilding, FaCoffee, FaBalanceScale, FaGraduationCap } from 'react-icons/fa';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';

const jobs = [
  {
    id: 1,
    title: 'Développeur Fullstack Senior',
    location: 'Paris',
    type: 'CDI',
    salary: '45k-65k€',
    experience: '3+ ans',
    icon: <FaCode className="text-blue-500" />,
    description: 'Développement d\'applications web modernes avec React, Node.js et architectures cloud. Participation à la conception d\'APIs REST et GraphQL.',
    requirements: ['React/Node.js', 'Cloud (AWS/Azure)', 'MongoDB/PostgreSQL', 'Git/Docker'],
    benefits: ['Télétravail partiel', 'Formation continue', 'Équipe internationale', 'Projets innovants'],
    tags: ['React', 'Node.js', 'Cloud', 'Fullstack']
  },
  {
    id: 2,
    title: 'Chef de Projet Digital',
    location: 'Lyon',
    type: 'CDI',
    salary: '40k-55k€',
    experience: '2+ ans',
    icon: <FaBriefcase className="text-purple-500" />,
    description: 'Gestion complète de projets digitaux de A à Z. Coordination d\'équipes techniques et créatives, suivi budgétaire et relation client.',
    requirements: ['Gestion de projet', 'Agile/Scrum', 'Outils collaboratifs', 'Anglais courant'],
    benefits: ['Autonomie', 'Évolution rapide', 'Responsabilités', 'Impact visible'],
    tags: ['Management', 'Agile', 'Digital', 'Leadership']
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    location: 'Remote',
    type: 'CDI',
    salary: '35k-50k€',
    experience: '2+ ans',
    icon: <FaPalette className="text-pink-500" />,
    description: 'Conception d\'interfaces utilisateur intuitives et esthétiques. Recherche utilisateur, prototypage et collaboration avec les équipes de développement.',
    requirements: ['Figma/Sketch', 'Design systems', 'Prototypage', 'User Research'],
    benefits: ['Créativité', 'Portfolio visible', 'Outils premium', 'Flexibilité horaire'],
    tags: ['UI/UX', 'Figma', 'Design', 'Prototypage']
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    location: 'Paris',
    type: 'CDI',
    salary: '50k-70k€',
    experience: '3+ ans',
    icon: <FaRocket className="text-green-500" />,
    description: 'Automatisation des déploiements, gestion d\'infrastructures cloud et monitoring des applications. Mise en place de pipelines CI/CD.',
    requirements: ['Docker/Kubernetes', 'AWS/Azure/GCP', 'Terraform', 'Monitoring'],
    benefits: ['Technologies cutting-edge', 'Challenge technique', 'Équipe technique', 'Innovation'],
    tags: ['DevOps', 'Cloud', 'Docker', 'CI/CD']
  },
  {
    id: 5,
    title: 'Consultant Cybersécurité',
    location: 'Lyon',
    type: 'CDI',
    salary: '45k-60k€',
    experience: '2+ ans',
    icon: <FaShieldAlt className="text-red-500" />,
    description: 'Audit de sécurité, mise en conformité RGPD et protection des systèmes d\'information. Conseil et accompagnement clients.',
    requirements: ['Sécurité informatique', 'RGPD', 'OWASP', 'Audit sécurité'],
    benefits: ['Expertise pointue', 'Mission variées', 'Formation certifiante', 'Impact sociétal'],
    tags: ['Sécurité', 'RGPD', 'Audit', 'Conseil']
  },
  {
    id: 6,
    title: 'Data Scientist',
    location: 'Remote',
    type: 'CDI',
    salary: '50k-75k€',
    experience: '3+ ans',
    icon: <FaCloud className="text-indigo-500" />,
    description: 'Analyse de données complexes, création de modèles prédictifs et visualisation de données. Travail sur des projets d\'intelligence artificielle.',
    requirements: ['Python/R', 'Machine Learning', 'SQL', 'Tableaux de bord'],
    benefits: ['Données massives', 'IA/ML', 'Impact business', 'Recherche appliquée'],
    tags: ['Data', 'Python', 'ML', 'Analytics']
  }
];

const testimonials = [
  {
    name: 'Marie Dubois',
    role: 'Développeuse Fullstack',
    image: '/IrEmma.jpg',
    quote: 'L\'environnement de travail est incroyable. J\'ai pu évoluer rapidement et travailler sur des projets passionnants.',
    rating: 5
  },
  {
    name: 'Thomas Martin',
    role: 'Chef de Projet',
    image: '/ChargéRP.jpg',
    quote: 'La culture d\'entreprise favorise l\'innovation et l\'autonomie. Une équipe exceptionnelle !',
    rating: 5
  },
  {
    name: 'Sophie Laurent',
    role: 'UI/UX Designer',
    image: '/IrMerveille.jpg',
    quote: 'Créativité et bien-être au travail vont de pair ici. Je recommande vivement !',
    rating: 5
  }
];

const benefits = [
  { icon: <FaCoffee />, title: 'Café & Snacks', description: 'Pause café offerte, snacks sains' },
  { icon: <FaBalanceScale />, title: 'Équilibre vie pro', description: 'Télétravail flexible, horaires adaptés' },
  { icon: <FaGraduationCap />, title: 'Formation', description: 'Budget formation annuel, certifications' },
  { icon: <FaUsers />, title: 'Équipe', description: 'Team building, événements d\'entreprise' },
  { icon: <FaHeart />, title: 'Bien-être', description: 'Mutuelle premium, sport & santé' },
  { icon: <FaRocket />, title: 'Innovation', description: 'Technologies de pointe, R&D' }
];

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    portfolio: '',
    motivation: '',
    cv: null
  });

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLocation = !selectedLocation || job.location === selectedLocation;
      const matchesType = !selectedType || job.type === selectedType;
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [searchTerm, selectedLocation, selectedType]);

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Candidature envoyée avec succès !');
    setApplicationForm({
      firstName: '', lastName: '', email: '', phone: '', experience: '',
      portfolio: '', motivation: '', cv: null
    });
    setSelectedJob(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setApplicationForm(prev => ({ ...prev, cv: file }));
    } else {
      alert('Le fichier doit être inférieur à 5MB');
    }
  };

  return (
    <>
      <NavbarSecured />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            Rejoignez Notre Équipe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Construisez l'avenir du digital avec nous. Innovez, créez et évoluez dans un environnement stimulant.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <FaUsers className="inline mr-2" />
              +50 Talents
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <FaRocket className="inline mr-2" />
              Innovation
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <FaHeart className="inline mr-2" />
              Bien-être
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un poste..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes les localisations</option>
              <option value="Paris">Paris</option>
              <option value="Lyon">Lyon</option>
              <option value="Remote">Remote</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les types</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
            </select>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Job Listings */}
          <div className="lg:col-span-2 space-y-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-gray-800 mb-8"
            >
              Postes Disponibles ({filteredJobs.length})
            </motion.h2>

            <AnimatePresence>
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 rounded-xl">
                          {job.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <FaMapMarkerAlt /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaClock /> {job.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaEuroSign /> {job.salary}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{job.experience}</div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>📋 {job.requirements.length} compétences</span>
                        <span>🎯 {job.benefits.length} avantages</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        Voir détails
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Application Form */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 sticky top-24"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {selectedJob ? `Postuler - ${selectedJob.title}` : 'Postuler'}
              </h3>

              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                    <input
                      type="text"
                      value={applicationForm.firstName}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      value={applicationForm.lastName}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={applicationForm.email}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={applicationForm.phone}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CV (PDF, max 5MB)</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="cv-upload"
                      required
                    />
                    <label
                      htmlFor="cv-upload"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <FaUpload className="mr-2 text-gray-400" />
                      <span className="text-gray-600">
                        {applicationForm.cv ? applicationForm.cv.name : 'Cliquez pour sélectionner votre CV'}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/GitHub (optionnel)</label>
                  <input
                    type="url"
                    value={applicationForm.portfolio}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, portfolio: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lettre de motivation</label>
                  <textarea
                    value={applicationForm.motivation}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, motivation: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Parlez-nous de votre motivation..."
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaArrowRight />
                  Envoyer ma candidature
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Company Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Pourquoi nous rejoindre ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les avantages qui font de notre entreprise un lieu de travail exceptionnel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl text-blue-500 mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Employee Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Témoignages d'employés</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez ce que nos collaborateurs disent de leur expérience chez nous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 relative"
              >
                <FaQuoteLeft className="text-4xl text-blue-100 absolute top-4 left-4" />
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gray-50 rounded-3xl p-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Questions fréquentes</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Quel est le processus de recrutement ?",
                answer: "Après dépôt de candidature, nous étudions votre profil sous 48h. Si votre candidature correspond, nous organisons un entretien téléphonique, puis un entretien technique et enfin une rencontre avec l'équipe."
              },
              {
                question: "Proposez-vous du télétravail ?",
                answer: "Oui, nous proposons un modèle hybride flexible. Selon les postes, vous pouvez travailler 2-3 jours par semaine depuis chez vous, avec des jours obligatoires en présentiel pour favoriser la cohésion d'équipe."
              },
              {
                question: "Quelles formations proposez-vous ?",
                answer: "Nous investissons dans votre développement avec un budget formation annuel, des certifications techniques, des conférences et un accès à des plateformes d'apprentissage en ligne."
              },
              {
                question: "Comment évolue-t-on dans l'entreprise ?",
                answer: "Nous favorisons l'évolution interne avec des parcours de carrière clairs, des entretiens annuels et des opportunités de mobilité transversale selon vos aspirations et compétences."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <Footer />
    </>
  );
}
