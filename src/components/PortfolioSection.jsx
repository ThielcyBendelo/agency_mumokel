import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { FaExternalLinkAlt, FaGithub, FaEye, FaFilter } from 'react-icons/fa';

const portfolio = [
  {
    id: 1,
    title: 'TechInnov - Site Vitrine',
    titleEn: 'TechInnov - Showcase Website',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Refonte complète du site vitrine pour TechInnov avec design moderne, SEO optimisé et sécurité renforcée.',
    descriptionEn: 'Complete redesign of the showcase website for TechInnov with modern design, optimized SEO and enhanced security.',
    tags: ['React', 'SEO', 'UI/UX', 'Performance'],
    category: 'web',
    technologies: ['React', 'Tailwind CSS', 'Next.js', 'Vercel'],
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: 2,
    title: 'EcomAfrica - E-commerce',
    titleEn: 'EcomAfrica - E-commerce Platform',
    image: '/images/projet2.png',
    description: "Développement d'une plateforme e-commerce sur-mesure avec paiement sécurisé et gestion des stocks.",
    descriptionEn: 'Development of a custom e-commerce platform with secure payment and inventory management.',
    tags: ['E-commerce', 'Sécurité', 'Node.js', 'MongoDB'],
    category: 'ecommerce',
    technologies: ['Node.js', 'MongoDB', 'Stripe', 'React'],
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: 3,
    title: 'StartupX - App Mobile',
    titleEn: 'StartupX - Mobile App',
    image: '/images/projet3.jpg',
    description: 'Application mobile hybride pour StartupX avec notifications push et design responsive.',
    descriptionEn: 'Hybrid mobile application for StartupX with push notifications and responsive design.',
    tags: ['Mobile', 'React Native', 'UX', 'Firebase'],
    category: 'mobile',
    technologies: ['React Native', 'Firebase', 'Expo', 'Node.js'],
    link: '#',
    github: '#',
    featured: false
  },
  {
    id: 4,
    title: 'DataFlow - Dashboard Analytics',
    titleEn: 'DataFlow - Analytics Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Tableau de bord analytique en temps réel avec visualisations avancées et rapports automatisés.',
    descriptionEn: 'Real-time analytics dashboard with advanced visualizations and automated reports.',
    tags: ['Dashboard', 'Analytics', 'D3.js', 'API'],
    category: 'web',
    technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    link: '#',
    github: '#',
    featured: false
  },
  {
    id: 5,
    title: 'SecureBank - Application Bancaire',
    titleEn: 'SecureBank - Banking App',
    image: '/images/projet5.webp',
    description: 'Application bancaire sécurisée avec authentification biométrique et transactions en temps réel.',
    descriptionEn: 'Secure banking application with biometric authentication and real-time transactions.',
    tags: ['Sécurité', 'Fintech', 'API', 'Mobile'],
    category: 'mobile',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'JWT'],
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: 6,
    title: 'EduLearn - Plateforme E-learning',
    titleEn: 'EduLearn - E-learning Platform',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    description: 'Plateforme de formation en ligne avec cours interactifs, quiz et suivi de progression.',
    descriptionEn: 'Online learning platform with interactive courses, quizzes and progress tracking.',
    tags: ['E-learning', 'Video', 'Progression', 'API'],
    category: 'web',
    technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
    link: '#',
    github: '#',
    featured: false
  }
];

const categories = [
  { id: 'all', label: 'Tous', labelEn: 'All', icon: '🎯' },
  { id: 'web', label: 'Web', labelEn: 'Web', icon: '🌐' },
  { id: 'mobile', label: 'Mobile', labelEn: 'Mobile', icon: '📱' },
  { id: 'ecommerce', label: 'E-commerce', labelEn: 'E-commerce', icon: '🛒' }
];

function PortfolioSection() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = selectedCategory === 'all'
    ? portfolio
    : portfolio.filter(project => project.category === selectedCategory);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden" id="portfolio">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <AnimatedSection variant="fadeIn" delay={0.2}>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6 border border-purple-200/50"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl">💼</span>
              <span className="text-sm font-semibold text-gray-700">
                {isEnglish ? 'Our Work' : 'Nos Réalisations'}
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                {isEnglish ? 'Portfolio' : 'Portfolio'}
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {isEnglish
                ? 'Discover our latest projects and see how we transform ideas into digital success stories.'
                : 'Découvrez nos derniers projets et voyez comment nous transformons les idées en succès digitaux.'
              }
            </p>

            {/* Language Toggle */}
            <motion.button
              onClick={() => setIsEnglish(!isEnglish)}
              className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 text-sm font-medium mb-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEnglish ? '🇫🇷 Français' : '🇺🇸 English'}
            </motion.button>
          </div>
        </AnimatedSection>

        {/* Filter Categories */}
        <AnimatedSection variant="slideUp" delay={0.4}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{category.icon}</span>
                {isEnglish ? category.labelEn : category.label}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <AnimatedSection
                key={project.id}
                variant="scaleIn"
                delay={0.1 * idx}
              >
                <motion.div
                  layout
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 group cursor-pointer ${
                    project.featured ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50' : 'border-gray-100'
                  }`}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      ⭐ {isEnglish ? 'Featured' : 'Vedette'}
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={isEnglish ? project.titleEn : project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.link, '_blank');
                        }}
                      >
                        <FaExternalLinkAlt className="text-lg" />
                      </motion.button>
                      <motion.button
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                      >
                        <FaGithub className="text-lg" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                      {isEnglish ? project.titleEn : project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {isEnglish ? project.descriptionEn : project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* View Project Button */}
                    <motion.button
                      className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaEye className="text-sm" />
                      {isEnglish ? 'View Project' : 'Voir le Projet'}
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={selectedProject.image}
                    alt={isEnglish ? selectedProject.titleEn : selectedProject.title}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {isEnglish ? selectedProject.titleEn : selectedProject.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {isEnglish ? selectedProject.descriptionEn : selectedProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(selectedProject.link, '_blank')}
                    >
                      <FaExternalLinkAlt />
                      {isEnglish ? 'View Live' : 'Voir en Ligne'}
                    </motion.button>
                    <motion.button
                      className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(selectedProject.github, '_blank')}
                    >
                      <FaGithub />
                      GitHub
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default PortfolioSection;
