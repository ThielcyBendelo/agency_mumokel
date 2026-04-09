import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaEye, FaCode } from 'react-icons/fa';

const portfolio = [
  {
    id: 1,
    title: 'TechInnov - Agence Digitale',
    image: 'https://unsplash.com',
    category: 'web',
    tags: ['React', 'Next.js', 'Tailwind'],
    desc: 'Refonte complète avec focus sur la performance et le SEO technique.'
  },
  {
    id: 2,
    title: 'EcomAfrica - Marketplace',
    image: 'https://unsplash.com',
    category: 'ecommerce',
    tags: ['Node.js', 'MongoDB', 'Stripe'],
    desc: 'Plateforme sur-mesure avec gestion complexe des stocks et paiements.'
  },
  {
    id: 3,
    title: 'StartupX - App Hybride',
    image: 'https://unsplash.com',
    category: 'mobile',
    tags: ['React Native', 'Firebase'],
    desc: 'Application mobile temps réel avec notifications push intelligentes.'
  },
  {
    id: 4,
    title: 'SecureBank - Fintech',
    image: 'https://unsplash.com',
    category: 'mobile',
    tags: ['Biométrie', 'API Bancaire'],
    desc: 'Haute sécurité et authentification biométrique multi-facteurs.'
  }
];

const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ecommerce', label: 'E-commerce' }
];

export default function PortfolioSection() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' 
    ? portfolio 
    : portfolio.filter(p => p.category === filter);

  return (
    <section className="py-24 bg-[#0a0a0c] text-white overflow-hidden" id="portfolio">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Agence Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs"
            >
              Études de Cas
            </motion.span>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-7xl font-black mt-4 tracking-tighter uppercase italic"
            >
              NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">PROJETS</span>
            </motion.h2>
          </div>

          {/* Filtres Modernes */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${
                  filter === cat.id 
                  ? 'bg-white text-black border-white' 
                  : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'
                }`}
              >
                {cat.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Grille Portfolio */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative h-[400px] rounded-[40px] overflow-hidden bg-gray-900 border border-white/5"
              >
                {/* Image de fond avec Zoom */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                />

                {/* Overlay de contenu */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                  <div className="flex gap-2 mb-4 translate-y-4 group-hover:translate-y-0 transition-transform">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter transition-all group-hover:text-red-500">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm max-w-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {project.desc}
                  </p>

                  
                 {/* Remplacez la section des boutons par celle-ci */}
<div className="flex gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all delay-100">
  <a 
    href={project.link} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-red-500 transition-colors"
  >
    <FaEye /> Voir le projet
  </a>
  
  {project.github && (
    <a 
      href={project.github}
      target="_blank"
      rel="noopener noreferrer" 
      className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-red-500 transition-colors"
    >
      <FaCode /> Code Source
    </a>
  )}
</div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
