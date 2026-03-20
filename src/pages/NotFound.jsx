import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';


export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page non trouvée
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 max-w-md mx-auto">
            <div className="flex items-center gap-3 text-gray-400">
              <FaSearch className="h-5 w-5" />
              <p className="text-sm">
                Essayez de rechercher ce que vous cherchez ou retournez à l'accueil
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 font-semibold"
          >
            <FaHome className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Retour à l'accueil
          </Link>
          
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-gray-800 text-white border border-gray-700 rounded-xl hover:bg-gray-700 hover:border-purple-500/50 transition-all duration-300 font-semibold"
          >
            <FaArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Page précédente
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12"
        >
          <p className="text-gray-500 text-sm mb-4">Liens rapides :</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/services"
              className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 hover:text-white transition text-sm"
            >
              Services
            </Link>
            <Link
              to="/portfolio"
              className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 hover:text-white transition text-sm"
            >
              Portfolio
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 hover:text-white transition text-sm"
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 hover:text-white transition text-sm"
            >
              À propos
            </Link>
          </div>
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 text-gray-600 text-sm"
        >
          <p>💡 Le saviez-vous ? Le code d'erreur 404 vient du numéro de la salle où se trouvait le premier serveur web au CERN.</p>
        </motion.div>
      </div>
    </div>
  );
}
