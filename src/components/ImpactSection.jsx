import { motion } from 'framer-motion';
import { FaUsers, FaGlobeAfrica, FaCodeBranch, FaTrophy } from 'react-icons/fa';

export default function ImpactSection() {
  const stats = [
    { icon: <FaUsers />, label: "Partenaires Satisfaits", value: "50", suffix: "+", color: "from-blue-600 to-cyan-500" },
    { icon: <FaCodeBranch />, label: "Lignes de Code", value: "1.2", suffix: "M", color: "from-purple-600 to-pink-500" },
    { icon: <FaGlobeAfrica />, label: "Pays Accompagnés", value: "5", suffix: "+", color: "from-red-600 to-orange-500" },
    { icon: <FaTrophy />, label: "Projets Innovants", value: "100", suffix: "%", color: "from-emerald-600 to-teal-500" },
  ];

  return (
    <section className="py-24 bg-[#0a0a0c] relative overflow-hidden">
      {/* Effet de lumière en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Texte de Gauche */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs">Au-delà du code</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mt-4 mb-8 tracking-tighter uppercase italic leading-none">
              BÂTIR VOTRE <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">SUCCÈS DIGITAL</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Nous ne créons pas seulement des outils. Nous développons des écosystèmes qui génèrent de la valeur réelle pour votre business, en alliant rigueur technique et vision stratégique.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-white text-black font-black rounded-full text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                Notre Vision
              </button>
            </div>
          </motion.div>

          {/* Grille de Stats à Droite */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col items-center text-center group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:rotate-12 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{stat.value}</span>
                  <span className="text-red-500 font-black text-2xl">{stat.suffix}</span>
                </div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
