import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRocket, 
  FaMobileAlt, 
  FaPalette, 
  FaShieldAlt, 
  FaTools, 
  FaCloud, 
  FaGraduationCap, 
  FaCheck, 
  FaTimes, 
  FaArrowRight, 
  FaEnvelope,
  FaUser,
  FaPhone,
  FaMoneyBillWave,
  FaHourglassHalf,
  FaCode
} from 'react-icons/fa';

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);


// Fonction pour ouvrir le modal proprement
const openModal = (service) => {
  setSelectedService(service);
  setIsModalOpen(true);
};


  const services = [
    { icon: <FaRocket />, title: 'Développement Web', description: 'Plateformes robustes et scalables utilisant React et Next.js.', price: '1200', benefits: ['SEO technique', 'Vitesse maximale', 'Micro-services'], color: 'from-blue-600 to-cyan-500' },
    { icon: <FaMobileAlt />, title: 'Applications Mobiles', description: 'Expériences natives fluides sur iOS et Android (React Native).', price: '2500', benefits: ['UX 60fps', 'Mode hors-ligne', 'Publication Stores'], color: 'from-emerald-600 to-green-400' },
    { icon: <FaShieldAlt />, title: 'Cybersécurité', description: 'Audit de vulnérabilité et protection de vos actifs critiques.', price: '1500', benefits: ['Pentesting', 'Chiffrement', 'Plan de secours'], color: 'from-red-600 to-orange-500' },
    { icon: <FaCloud />, title: 'Solutions Cloud', description: 'Migration et orchestration sur AWS, Azure ou GCP.', price: '1000', benefits: ['Auto-scaling', 'Réduction coûts', 'Monitoring 24/7'], color: 'from-purple-600 to-indigo-500' },
    { icon: <FaTools />, title: 'Maintenance & Support', description: 'Support technique réactif pour garantir la continuité.', price: '300', benefits: ['Correctifs sécurité', 'Mises à jour', 'Backup'], color: 'from-amber-500 to-orange-400' },
    { icon: <FaPalette />, title: 'Design UI/UX', description: 'Interfaces intuitives centrées utilisateur pour convertir plus.', price: '800', benefits: ['Prototypes', 'Branding', 'Tests usabilité'], color: 'from-pink-600 to-rose-400' },
    { icon: <FaGraduationCap />, title: 'Formation', description: 'Montez en compétence avec nos ingénieurs seniors.', price: '500', benefits: ['Ateliers', 'Audit de code', 'Architecture'], color: 'from-teal-500 to-emerald-400' },
    { icon: <FaEnvelope />, title: 'Conseil & Stratégie', description: 'Définition de votre roadmap technologique.', price: '600', benefits: ['Analyse besoins', 'Choix stack', 'Estimation'], color: 'from-gray-600 to-slate-400' }
  ];

  return (
    <div className="bg-[#0a0a0c] min-h-screen py-24 px-6 relative">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <motion.span className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs">Expertise Technique</motion.span>
        <motion.h1 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6 tracking-tighter uppercase italic">
          Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">Solutions</span>
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {services.map((service, idx) => (
          <motion.div key={idx} whileHover={{ y: -10 }} className="relative group bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex flex-col justify-between transition-all hover:bg-white/[0.05] hover:border-red-500/50">
            <div>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl text-white mb-8 shadow-lg`}>{service.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-500 text-sm mb-6">{service.description}</p>
              <ul className="space-y-3 mb-8">{service.benefits.map((b, i) => (<li key={i} className="flex items-center gap-3 text-xs text-gray-300"><FaCheck className="text-red-500" /> {b}</li>))}</ul>
            </div>
            <div className="pt-6 border-t border-white/5">
              <div className="flex items-baseline gap-1 mb-6"><span className="text-gray-400 text-sm">À partir de</span><span className="text-3xl font-black text-white">{service.price}$</span></div>
              <button 
                onClick={() => { setSelectedService(service); setIsModalOpen(true); }}
                className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all group"
              >
                Commander <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MODAL DE DEVIS --- */}
      <AnimatePresence>
  {isModalOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      {/* Overlay avec flou */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={() => setIsModalOpen(false)} 
        className="absolute inset-0 bg-black/90 backdrop-blur-md" 
      />

      {/* Conteneur du Modal */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0, y: 20 }} 
        className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-xl rounded-[24px] md:rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-full"
      >
        {/* Décoration lumineuse fixe */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Bouton fermer fixe en haut */}
        <button 
          onClick={() => setIsModalOpen(false)} 
          className="absolute right-6 top-6 z-10 text-gray-500 hover:text-white transition-colors bg-black/20 p-2 rounded-full backdrop-blur-md"
        >
          <FaTimes size={20} />
        </button>

        {/* Zone de contenu Scrollable */}
        <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <header className="mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Expertise Technique
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase italic tracking-tighter">
              PROJET : <span className="text-red-500">{selectedService?.title || "SUR MESURE"}</span>
            </h2>
            <p className="text-gray-400 text-sm font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Analyse garantie sous 24h
            </p>
          </header>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                <input type="text" placeholder="Nom complet" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-red-500 transition-all placeholder:text-gray-600" />
              </div>
              <div className="relative group">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                <input type="tel" placeholder="WhatsApp" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-red-500 transition-all placeholder:text-gray-600" />
              </div>
            </div>

            <div className="relative group">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-red-500 transition-colors" />
              <input type="email" placeholder="Email professionnel" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-red-500 transition-all placeholder:text-gray-600" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="relative">
                <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-gray-400 outline-none focus:border-red-500 appearance-none transition-all">
                  <option value="" disabled selected>Budget estimé</option>
                  <option value="small">Moins de 2.000$</option>
                  <option value="medium">2.000$ - 10.000$</option>
                  <option value="large">Plus de 10.000$</option>
                </select>
              </div>
              <div className="relative">
                <FaHourglassHalf className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-gray-400 outline-none focus:border-red-500 appearance-none transition-all">
                  <option value="" disabled selected>Délai souhaité</option>
                  <option value="urgent">Urgent (&lt; 1 mois)</option>
                  <option value="normal">Normal (1-3 mois)</option>
                  <option value="flex">Flexible</option>
                </select>
              </div>
            </div>

            <div className="relative group">
              <FaCode className="absolute left-4 top-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
              <textarea placeholder="Décrivez votre besoin technique..." rows="3" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-red-500 transition-all placeholder:text-gray-600 resize-none"></textarea>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] text-gray-500 italic pb-2">
              <FaShieldAlt className="text-green-500/50" />
              <span>Données cryptées par protocole SSL.</span>
            </div>

            <button className="w-full py-5 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white font-black rounded-xl hover:shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:-translate-y-1 active:scale-[0.98] transition-all uppercase tracking-widest text-[11px]">
              Envoyer la demande technique
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>s
    </div>
  );
}
