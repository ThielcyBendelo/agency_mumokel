import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCode, FaCloud, FaMobile, FaRocket, FaChevronRight, FaTerminal } from 'react-icons/fa';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import notificationService from '../services/notificationService';
import AnimatedSection from './AnimatedSection';
import RippleGrid from './RippleGrid';

export default function Hero() {
  const [elementRef] = useIntersectionObserver();

  useEffect(() => {
    const timer = setTimeout(() => notificationService.welcome(), 2000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { icon: FaCode, text: 'Web & Mobile', color: 'from-blue-600 to-cyan-400', delay: 1.1 },
    { icon: FaCloud, text: 'Cloud & DevOps', color: 'from-purple-600 to-pink-500', delay: 1.2 },
    { icon: FaMobile, text: 'Custom Apps', color: 'from-orange-500 to-red-500', delay: 1.3 },
    { icon: FaRocket, text: 'Optimization', color: 'from-green-500 to-emerald-400', delay: 1.4 }
  ];

  return (
    <section
      ref={elementRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-[#050505]"
    >
      {/* 1. Background Layer Dynamique */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <RippleGrid />
        {/* Cercles de lumière (Glow) plus diffus pour un aspect premium */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[150px]" />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto text-center pt-20">
        
        {/* Badge de statut optimisé */}
        <AnimatedSection variant="slideUp" delay={0.2}>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-10 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                Status: System Active
              </span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">
              v2.0.26
            </span>
          </div>
        </AnimatedSection>

        {/* Titre Principal (Typographie massive) */}
        <AnimatedSection variant="slideUp" delay={0.4}>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8 uppercase italic">
            Architecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-500 to-purple-600 animate-gradient-x">
              Digital DNA
            </span>
          </h1>
        </AnimatedSection>

        {/* Description Text (Plus d'espace et de clarté) */}
        <AnimatedSection variant="fadeIn" delay={0.6}>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-gray-400 font-light leading-relaxed mb-12">
            Nous fusionnons la rigueur de l'architecture et la puissance du code pour bâtir des 
            <span className="text-white font-bold"> infrastructures scalables </span> 
            qui redéfinissent les standards de votre industrie.
          </p>
        </AnimatedSection>

        {/* Boutons d'Action (Style Neobrutalisme Soft) */}
        <AnimatedSection variant="fadeIn" delay={0.8}>
          <div className="flex flex-wrap gap-4"> {/* Assurez-vous que la div parente est ouverte */}
  
  {/* Bouton "Start a Project" -> Vers la page Contact ou Devis */}
  <Link to="/contact">
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(220, 38, 38, 0.4)" }}
      whileTap={{ scale: 0.98 }}
      className="px-10 py-5 bg-red-600 text-white font-black rounded-sm flex items-center gap-3 uppercase tracking-widest text-xs transition-all shadow-xl shadow-red-600/20"
    >
      Start a Project <FaChevronRight className="text-[10px]" />
    </motion.button>
  </Link>

  {/* Bouton "Explore Stack" -> Vers la page Offres ou Technologie */}
  <Link to="/offers">
    <motion.button
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.4)' }}
      whileTap={{ scale: 0.98 }}
      className="px-10 py-5 bg-transparent border border-white/10 text-white font-black rounded-sm uppercase tracking-widest text-xs backdrop-blur-md transition-all"
    >
      Explore Stack
    </motion.button>
  </Link>
</div>
        </AnimatedSection>

        {/* Features Grid (Architecture de cartes plus propre) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay }}
              whileHover={{ y: -10, borderColor: 'rgba(255,255,255,0.2)' }}
              className="group p-8 rounded-sm border border-white/5 bg-white/[0.01] backdrop-blur-sm transition-all relative overflow-hidden"
            >
              {/* Effet de brillance au hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`w-14 h-14 mx-auto mb-6 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl shadow-2xl transform group-hover:rotate-12 transition-transform duration-500`}>
                <feature.icon />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                {feature.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Indicateur de Scroll discret */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 text-xs font-mono uppercase tracking-[0.5em]"
      >
        Scroll to discover
      </motion.div>
    </section>
  );
}
