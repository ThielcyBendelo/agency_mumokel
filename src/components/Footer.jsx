import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0c] text-gray-400 py-16 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Section Branding (5 colonnes) */}
          <div className="md:col-span-5 space-y-6">
  <Link to="/" className="flex items-center gap-3 group select-none">
    {/* Icône Tech Géométrique */}
    <div className="relative w-10 h-10 bg-slate-900 border border-red-500/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.1)] overflow-hidden transition-all duration-300 group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]">
      {/* Effet de reflet en arrière-plan au survol */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Monogramme épuré */}
      <span className="relative font-bold text-sm tracking-widest text-white group-hover:scale-105 transition-transform duration-300">
        M<span className="text-red-500 font-black">A</span>
      </span>
    </div>

    {/* Texte de marque rééquilibré */}
    <div className="flex flex-col justify-center leading-none">
      <span className="text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-red-400">
        MUAMOKEL
      </span>
      <span className="text-[10px] font-medium tracking-[0.25em] text-slate-400 uppercase mt-0.5">
        DEVELOPPEMENT
      </span>
    </div>
  </Link>

            <p className="text-sm leading-relaxed max-w-sm">
              Ingénierie logicielle de pointe et solutions digitales sur mesure. 
              Nous bâtissons les infrastructures de demain avec une rigueur absolue.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <FaGithub size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Navigation (3 colonnes) */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-white font-black uppercase italic tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-red-500 transition-colors">L'Agence</Link></li>
              <li><Link to="/services" className="hover:text-red-500 transition-colors">Expertises</Link></li>
              <li><Link to="/projects" className="hover:text-red-500 transition-colors">Réalisations</Link></li>
              <li><Link to="/support" className="hover:text-red-500 transition-colors">Centre de Support</Link></li>
            </ul>
          </div>

          {/* Contact Rapide (4 colonnes) */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-white font-black uppercase italic tracking-widest text-xs">Newsletter & Contact</h4>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Restez informé de nos innovations</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="votre@email.com" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-red-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                <FaEnvelope size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Barre de Copyright Basse */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>© {currentYear} MUAMOKEL AGENCY • TOUS DROITS RÉSERVÉS</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all group"
          >
            <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
