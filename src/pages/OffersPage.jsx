import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheck, FaRocket, FaShieldAlt, FaCode, FaCloud, FaCog, 
  FaTimes, FaPaperPlane, FaChartLine, FaBrain, FaDatabase, 
  FaNodeJs, FaReact, FaAws, FaDocker, FaPython, FaGitAlt,
  FaSearch, FaLightbulb, FaPlayCircle, FaQuoteLeft, FaTrophy, FaUserCheck
} from 'react-icons/fa';
// CORRECTION DU CHEMIN ICI
import { SiTypescript, SiTailwindcss, SiPostgresql, SiKubernetes } from 'react-icons/si';

import NavbarSecured from '../components/NavbarSecured';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const OffersPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stack = [
    { name: 'React', icon: <FaReact className="text-[#61DAFB]" /> },
    { name: 'Node.js', icon: <FaNodeJs className="text-[#339933]" /> },
    { name: 'AWS', icon: <FaAws className="text-[#FF9900]" /> },
    { name: 'TypeScript', icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: 'Docker', icon: <FaDocker className="text-[#2496ED]" /> },
    { name: 'Python', icon: <FaPython className="text-[#3776AB]" /> },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#4169E1]" /> },
    { name: 'Kubernetes', icon: <SiKubernetes className="text-[#326CE5]" /> },
    { name: 'Tailwind', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: 'Git', icon: <FaGitAlt className="text-[#F05032]" /> },
  ];

  const workflow = [
    { step: '01', title: 'Analyse', desc: 'Audit de vos besoins et définition du cahier des charges technique.', icon: <FaSearch /> },
    { step: '02', title: 'Conception', desc: 'Architecture système et design UI/UX haute fidélité.', icon: <FaLightbulb /> },
    { step: '03', title: 'Développement', desc: 'Codage agile avec revues de code et tests unitaires continus.', icon: <FaCode /> },
    { step: '04', title: 'Déploiement', desc: 'Mise en production sécurisée sur infrastructure cloud scalable.', icon: <FaPlayCircle /> },
  ];

  const testimonials = [
    { name: "Marc Lefebvre", role: "CEO TechStart", content: "Une expertise technique incroyable. Notre application a été livrée en un temps record avec une qualité de code irréprochable." },
    { name: "Sophie Durant", role: "Product Manager", content: "Le pack Innovation a transformé notre business grâce à l'IA. L'équipe est passionnée et très réactive." },
    { name: "Jean Morel", role: "Fondateur EcoWeb", content: "Pack Sécurité indispensable. Ils ont identifié des failles que nous n'avions jamais soupçonnées. Je recommande." },
  ];

  const offers = [
    { id: 1, title: 'Pack Starter', subtitle: 'Idéal pour débuter', price: '600$', originalPrice: '800$', color: 'from-blue-500 to-cyan-500', icon: <FaCode />, features: ['Site Web (5 pages)', 'SEO de base', 'Hébergement 1 mois', 'SSL Gratuit', 'Formation admin'], popular: false },
    { id: 2, title: 'Pack Business', subtitle: 'Pour les entreprises en croissance', price: '1000$', originalPrice: '1200$', color: 'from-green-500 to-emerald-500', icon: <FaChartLine />, features: ['10 pages premium', 'E-commerce intégré', 'Support 3 mois', 'SEO Avancé', 'Maintenance'], popular: true },
    { id: 3, title: 'Pack Enterprise', subtitle: 'Solution complète grands comptes', price: '1200$', originalPrice: '1500$', color: 'from-purple-500 to-pink-500', icon: <FaCloud />, features: ['Pages illimitées', 'API personnalisées', 'Support 24/7', 'Audit performance', 'Cloud dédié'], popular: false },
    { id: 4, title: 'Pack Sécurité', subtitle: 'Protection maximale des données', price: '800$', originalPrice: '1000$', color: 'from-red-500 to-orange-500', icon: <FaShieldAlt />, features: ['Audit de sécurité', 'Protection DDoS', 'Firewall avancé', 'Monitoring 24/7', 'Sauvegarde chiffrée'], popular: false },
    { id: 5, title: 'Pack Développement', subtitle: 'Applications sur mesure', price: '2000$', originalPrice: '2500$', color: 'from-indigo-500 to-blue-500', icon: <FaCog />, features: ['App Web sur mesure', 'Architecture scalable', 'CI/CD Pipeline', 'Documentation technique', 'Tests auto'], popular: false },
    { id: 6, title: 'Pack Innovation', subtitle: 'IA et technologies avancées', price: '2500$', originalPrice: '3000€', color: 'from-yellow-500 to-red-500', icon: <FaBrain />, features: ['Intégration IA', 'Machine Learning', 'Big Data Analytics', 'Automatisation process', 'R&D dédiée'], popular: false }
  ];

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white font-sans">
      <NavbarSecured />

      <div className="pt-32 pb-20 px-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-12">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs">Tarification Transparente</motion.span>
          <motion.h1 initial={{ y: 20 }} animate={{ y: 0 }} className="text-5xl md:text-7xl font-black mt-4 mb-6 tracking-tighter uppercase italic text-white">
            NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">OFFRES</span>
          </motion.h1>
        </div>

        {/* Stack Animation */}
        <div className="max-w-7xl mx-auto mb-24 overflow-hidden py-10 relative">
          <motion.div className="flex gap-12 items-center" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} style={{ width: "fit-content" }}>
            {[...stack, ...stack].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl whitespace-nowrap">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-mono text-sm tracking-widest uppercase">{item.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Grille des Offres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {offers.map((offer) => (
            <motion.div key={offer.id} whileHover={{ y: -10 }} className={`relative p-px bg-gradient-to-b ${offer.popular ? 'from-red-500 to-purple-600' : 'from-white/10 to-transparent'} rounded-[2.5rem]`}>
              <div className="bg-[#111] h-full rounded-[2.4rem] p-8 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${offer.color} flex items-center justify-center text-2xl mb-8 shadow-lg text-white`}>{offer.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 uppercase italic">{offer.title}</h3>
                  <div className="flex items-baseline gap-2 mb-8 text-white">
                    <span className="text-4xl font-black">{offer.price}</span>
                    <span className="text-gray-600 line-through text-sm">{offer.originalPrice}</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {offer.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-400 font-light">
                        <FaCheck className="text-red-500 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => { setSelectedPackage(offer); setIsModalOpen(true); }} className={`w-full py-4 rounded-2xl font-black uppercase text-xs transition-all ${offer.popular ? 'bg-red-600' : 'bg-white/5 border border-white/10'}`}>Choisir ce pack</button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BARRE DE GARANTIE */}
        <div className="max-w-7xl mx-auto mb-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-white/5 border border-white/10 rounded-[3rem] p-12 backdrop-blur-xl">
            <div className="flex flex-col items-center">
                <FaShieldAlt className="text-red-500 text-4xl mb-4" />
                <h4 className="text-xl font-bold uppercase italic text-white">Garantie 100%</h4>
                <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Satisfait ou remboursé sous 30 jours</p>
            </div>
            <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0">
                <FaTrophy className="text-purple-500 text-4xl mb-4" />
                <h4 className="text-xl font-bold uppercase italic text-white">+500 Projets</h4>
                <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-light">Déployés avec succès</p>
            </div>
            <div className="flex flex-col items-center">
                <FaUserCheck className="text-blue-500 text-4xl mb-4" />
                <h4 className="text-xl font-bold uppercase italic text-white">Support 24/7</h4>
                <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-light">Une équipe dédiée à votre succès</p>
            </div>
        </div>

        {/* Workflow */}
        <div className="max-w-7xl mx-auto mb-40">
          <div className="text-center mb-16"><h2 className="text-3xl font-black uppercase italic tracking-widest text-white">NOTRE <span className="text-red-500">PROCESSUS</span></h2></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {workflow.map((item, index) => (
              <div key={index} className="relative p-8 bg-white/5 border border-white/10 rounded-[2rem] group hover:bg-white/[0.07] transition-all">
                <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center text-xl mb-6">{item.icon}</div>
                <h4 className="text-lg font-bold mb-3 uppercase text-white">{item.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TÉMOIGNAGES GLASSMORPHISM */}
        <div className="max-w-7xl mx-auto mb-40">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase italic tracking-widest text-white">ILS NOUS <span className="text-red-500">FONT CONFIANCE</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="p-8 bg-white/5 border border-white/20 backdrop-blur-lg rounded-[2.5rem] relative group shadow-xl">
                <FaQuoteLeft className="text-red-600 text-3xl mb-6 opacity-30" />
                <p className="text-gray-300 italic mb-8 text-sm leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-purple-600 flex items-center justify-center font-bold text-xs">{t.name.charAt(0)}</div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-widest text-white">{t.name}</h5>
                    <p className="text-red-500 text-[9px] uppercase font-bold">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <FAQ />
      </div>

      <Footer />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-[#0d0d0f] border border-white/10 w-full max-w-xl rounded-[3rem] p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-3xl font-black uppercase italic mb-6 text-white text-center">Commander : {selectedPackage?.title}</h2>
              <form className="space-y-4">
                <input type="text" placeholder="Nom complet" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 text-white" />
                <input type="email" placeholder="Email professionnel" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 text-white" />
                <textarea placeholder="Décrivez votre besoin technique..." rows="4" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 text-white"></textarea>
                <button className="w-full py-5 bg-red-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs">Lancer mon projet <FaPaperPlane className="inline ml-2" /></button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence> 
    </div>
  );
};

export default OffersPage;
