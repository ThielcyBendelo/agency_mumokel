import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, FaSignOutAlt, FaRocket, FaBars, FaTimes, FaChevronDown,
  FaHome, FaConciergeBell, FaUsers, FaInfoCircle, FaBriefcase, FaBlog,
  FaHeadset, FaStar, FaHandshake, FaChevronRight
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function NavbarSecured() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // NOUVEAU : État pour le filtre mobile (par défaut sur la première catégorie)
  const [mobileFilter, setMobileFilter] = useState('Agence');

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuCategories = [
    {
      label: 'Agence',
      links: [
        { label: 'Accueil', href: '/', icon: <FaHome /> },
        { label: "L'agence", href: '/about', icon: <FaInfoCircle /> },
        { label: 'Équipe', href: '/team', icon: <FaUsers /> },
        { label: 'Partenaires', href: '/partners', icon: <FaHandshake /> },
      ]
    },
    {
      label: 'Expertise',
      links: [
        { label: 'Services', href: '/services', icon: <FaConciergeBell /> },
        { label: 'Portfolio', href: '/projects', icon: <FaBriefcase /> },
        { label: 'Témoignages', href: '/testimonials', icon: <FaStar /> },
        { label: 'Nos Offres', href: '/offers', icon: <FaRocket /> }
      ]
    },
    {
      label: 'Ressources',
      links: [
        { label: 'Blog', href: '/blog', icon: <FaBlog /> },
        { label: 'Support', href: '/support', icon: <FaHeadset /> },
        { label: 'Carrières', href: '/careers', icon: <FaBriefcase /> },
      ]
    }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'py-3 bg-gray-950/95 backdrop-blur-xl border-b border-white/5' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
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


        {/* DESKTOP MENU (Inchangé) */}
        <div className="hidden lg:flex items-center gap-2">
          {menuCategories.map((cat) => (
            <div key={cat.label} className="relative group" onMouseEnter={() => setActiveDropdown(cat.label)} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="flex items-center gap-2 px-4 py-2 text-xs font-black text-gray-400 hover:text-white uppercase tracking-widest transition-all">
                {cat.label} <FaChevronDown size={10} className={`transition-transform ${activeDropdown === cat.label ? 'rotate-180 text-red-500' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === cat.label && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 w-64 bg-gray-900 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
                    <div className="grid gap-2">
                      {cat.links.map((link) => (
                        <Link key={link.label} to={link.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all group/item">
                          <span className="text-red-500 opacity-50 group-hover/item:opacity-100">{link.icon}</span>
                          <span className="text-sm font-bold">{link.label}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="hidden lg:flex items-center gap-4">
          {!isAuthenticated ? (
            <Link to="/login" className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase rounded-full hover:bg-red-600 hover:text-white transition-all">Démarrer</Link>
          ) : (
            <button onClick={logout} className="text-gray-400 hover:text-red-500 p-2 transition-colors"><FaSignOutAlt size={20} /></button>
          )}
        </div>

        {/* BOUTON MOBILE */}
        <button className="lg:hidden text-white text-2xl p-2" onClick={() => setIsMobileMenuOpen(true)}>
          <FaBars />
        </button>
      </div>

      {/* MENU MOBILE AVEC FILTRES */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen w-full bg-gray-950 z-[999] flex flex-col p-6 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-black text-white italic border-l-4 border-red-600 pl-3 uppercase">Navigation</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white bg-white/10 p-3 rounded-full hover:bg-red-600 transition-colors"><FaTimes /></button>
            </div>

            {/* SYSTÈME DE FILTRES (TABS) */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
              {menuCategories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setMobileFilter(cat.label)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                    mobileFilter === cat.label 
                      ? 'bg-red-600 border-red-600 text-white' 
                      : 'bg-white/5 border-white/10 text-gray-500'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* CONTENU FILTRÉ */}
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileFilter}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 gap-3"
                >
                  {menuCategories.find(c => c.label === mobileFilter)?.links.map((link) => (
                    <Link 
                      key={link.label} 
                      to={link.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-5 rounded-2xl font-bold border transition-all duration-300 ${
                        isActive(link.href)
                          ? 'bg-red-600/10 border-red-600/50 text-white'
                          : 'bg-white/[0.03] border-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-xl ${isActive(link.href) ? 'text-red-500' : 'text-gray-500'}`}>{link.icon}</span>
                        <span className="uppercase tracking-[0.2em] text-[11px] font-black">{link.label}</span>
                      </div>
                      <FaChevronRight className={isActive(link.href) ? 'text-red-500' : 'opacity-10'} />
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-10 pb-6 text-center">
              <Link to="/offers" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-5 bg-red-600 text-white rounded-2xl font-black uppercase flex items-center justify-center gap-3 shadow-lg shadow-red-600/20 text-xs">
                Découvrir nos offres <FaRocket />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
