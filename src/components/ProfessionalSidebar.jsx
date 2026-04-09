import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaCode, FaRocket, FaUsers, FaStar, FaEnvelope, FaHeadset, 
  FaTachometerAlt, FaUserCog, FaCreditCard, FaBuilding, 
  FaTimes, FaSearch, FaChevronRight, FaProjectDiagram 
} from 'react-icons/fa';

export default function ProfessionalSidebar({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Organisation par sections pour plus de clarté
  const menuSections = [
    {
      title: "Agence",
      items: [
        { id: 'skills', label: 'Compétences', path: '/skills', icon: FaCode, color: 'from-blue-500 to-cyan-500' },
        { id: 'projects', label: 'Projets', path: '/projects', icon: FaProjectDiagram, color: 'from-green-500 to-emerald-500' },
        { id: 'team', label: 'Équipe', path: '/team', icon: FaUsers, color: 'from-orange-500 to-red-500' },
      ]
    },
    {
      title: "Services & Support",
      items: [
        { id: 'offers', label: 'Nos Offres', path: '/services', icon: FaRocket, color: 'from-purple-500 to-pink-500' },
        { id: 'contact', label: 'Contact', path: '/contact', icon: FaEnvelope, color: 'from-red-500 to-pink-500' },
        { id: 'support', label: 'Assistance', path: '/support', icon: FaHeadset, color: 'from-gray-400 to-slate-400' },
      ]
    },
    {
      title: "Administration",
      items: [
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt, color: 'from-emerald-500 to-teal-500' },
        { id: 'admin', label: 'Gestion Client', path: '/admin', icon: FaBuilding, color: 'from-cyan-500 to-blue-500' },
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay sombre */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[350px] bg-[#0d0d0f]/95 border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header de la Sidebar */}
            <div className="p-6 flex items-center justify-between border-b border-white/5">
              <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">Navigation</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                <FaTimes size={20} />
              </button>
            </div>

            {/* Barre de Recherche */}
            <div className="p-4">
              <div className="relative group">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Chercher une section..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-red-500/50 transition-all"
                />
              </div>
            </div>

            {/* Liste des items */}
            <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
              {menuSections.map((section, sIdx) => (
                <div key={sIdx} className="mb-6">
                  <p className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">{section.title}</p>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <motion.button
                          key={item.id}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { navigate(item.path); onClose(); }}
                          className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${
                            isActive ? 'bg-white/10 border border-white/10' : 'hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                            <item.icon size={18} />
                          </div>
                          <div className="flex-1 text-left">
                            <p className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{item.label}</p>
                          </div>
                          <FaChevronRight size={10} className={`transition-transform ${isActive ? 'text-red-500' : 'text-gray-600 group-hover:text-white'}`} />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer de la Sidebar */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold">M</div>
                <div>
                  <p className="text-sm font-bold text-white uppercase italic">Muamokel Agency</p>
                  <p className="text-[10px] text-gray-500">v2.0.4 - Kinshasa, RDC</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
