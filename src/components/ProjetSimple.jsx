import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projets } from '../assets/assets.js';
import { FaGithub, FaCode, FaRocket, FaFilter } from 'react-icons/fa';

export default function ProjetSimple() {
  // 1. Logique de filtrage
  const [filter, setFilter] = useState('Tous');

  // Extraction unique des catégories (ajustez selon vos noms de propriétés dans assets.js)
  // Si vos objets projets n'ont pas de champ 'categorie', ils utiliseront 'Tous'
  const categories = ['Tous', ...new Set(projets.map(p => p.categorie || 'Autres'))];

  const filteredProjets = filter === 'Tous' 
    ? projets 
    : projets.filter(p => p.categorie === filter);

  return (
    <section id="projects" className="py-24 bg-[#0a0a0c] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Agence Look */}
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs"
          >
            Portfolio Industriel
          </motion.span>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black mt-4 mb-6 tracking-tighter uppercase italic"
          >
            RÉALISATIONS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">TECH</span>
          </motion.h2>
        </div>

        {/* --- BARRE DE FILTRAGE --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                filter === cat 
                ? 'bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille de Projets avec Animation de transition */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjets.map((projet, index) => (
              <motion.div
                layout
                key={projet.titre} // Utilisez un ID unique si disponible
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden transition-all hover:bg-white/[0.05] hover:border-red-500/50"
              >
                {/* Image avec Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={projet.image}
                    alt={projet.titre}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
                  
                  {/* Badge Catégorie Dynamique */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 text-red-500">
                    {projet.categorie || 'Projet Pro'}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors uppercase italic tracking-tighter">
                    {projet.titre}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {projet.description}
                  </p>

                  {projet.technologies && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {projet.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] text-gray-300 font-bold rounded-full flex items-center gap-1"
                        >
                          <FaCode className="text-red-500 text-[8px]" /> {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4 pt-4 border-t border-white/5">
                    {projet.lienDemo && (
                      <a
                        href={projet.lienDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black font-black text-xs uppercase rounded-xl hover:bg-red-600 hover:text-white transition-all tracking-tighter"
                      >
                        <FaRocket size={10} /> Live Démo
                      </a>
                    )}
                    {projet.lienGithub && (
                      <a
                        href={projet.lienGithub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white hover:text-black transition-all"
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-10 rounded-[3rem] bg-gradient-to-r from-red-600/10 to-transparent border border-red-500/20 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Vous avez un projet similaire en tête ?</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Nos ingénieurs transforment vos besoins métiers en outils technologiques scalables et sécurisés.</p>
          <button className="px-8 py-4 bg-red-600 text-white font-black rounded-full uppercase text-xs tracking-widest hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all">
            Discutons de votre projet
          </button>
        </motion.div>
      </div>
    </section>
  );
}
