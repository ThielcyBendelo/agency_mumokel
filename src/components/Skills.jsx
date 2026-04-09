import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaCode, FaShieldAlt, FaCloud, FaPalette, 
  FaPlug, FaTools, FaLightbulb, FaCheckCircle, FaQuoteLeft 
} from 'react-icons/fa';

export default function Skills() {
  const expertises = [
    { title: "Web Moderne", tech: "React, Node.js, Next.js", icon: <FaCode />, color: "from-blue-500 to-cyan-400" },
    { title: "Cybersécurité", tech: "Audit & Protection", icon: <FaShieldAlt />, color: "from-red-500 to-orange-400" },
    { title: "Cloud & DevOps", tech: "AWS, Azure, Docker", icon: <FaCloud />, color: "from-purple-500 to-indigo-400" },
    { title: "UI/UX Design", tech: "Expérience Utilisateur", icon: <FaPalette />, color: "from-pink-500 to-rose-400" },
    { title: "Intégration API", tech: "Stripe, PayPal, Custom", icon: <FaPlug />, color: "from-yellow-500 to-amber-400" },
    { title: "Maintenance", tech: "Optimisation & Support", icon: <FaTools />, color: "from-emerald-500 to-teal-400" },
  ];

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <motion.section
        id="skills"
        className="max-w-7xl mx-auto pt-32 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header Agence */}
        <div className="text-center mb-20">
          <motion.span initial={{ y: 20 }} animate={{ y: 0 }} className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs">Expertises Techniques</motion.span>
          <motion.h1 initial={{ y: 20 }} animate={{ y: 0 }} className="text-5xl md:text-7xl font-black mt-4 mb-6 tracking-tighter uppercase italic">
            NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">POUVOIRS</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Solutions d'ingénierie avancées pour propulser votre vision digitale.</p>
        </div>

        {/* Grille Bento des expertises */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {expertises.map((exp, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-red-500/50 transition-all group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${exp.color} flex items-center justify-center text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {exp.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase italic">{exp.title}</h3>
              <p className="text-gray-500 text-sm font-mono">{exp.tech}</p>
            </motion.div>
          ))}
        </div>

        {/* Section Méthodologie & Valeurs (Horizontal) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <div className="p-10 rounded-[3rem] bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/20">
            <h2 className="text-3xl font-black mb-8 uppercase italic flex items-center gap-3">
              <FaLightbulb className="text-red-500" /> Méthodologie
            </h2>
            <ul className="space-y-4">
              {['Transparence Totale', 'Respect des Délais', 'Innovation Continue', 'Agilité Scrum'].map((val) => (
                <li key={val} className="flex items-center gap-3 text-gray-300">
                  <FaCheckCircle className="text-red-500 text-xs" /> {val}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 flex flex-col justify-center">
             <FaQuoteLeft className="text-red-500 text-4xl mb-6 opacity-50" />
             <blockquote className="text-xl italic text-gray-300 leading-relaxed mb-6">
               “Muamokel a transformé notre infrastructure digitale avec un professionnalisme et une rapidité déconcertante.”
             </blockquote>
             <p className="text-sm font-black uppercase tracking-widest text-red-500">— CEO, Startup Kinshasa</p>
          </div>
        </div>

        {/* CTA Final */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-red-600 to-purple-600 p-12 text-center"
        >
          <h2 className="text-4xl font-black mb-4 uppercase italic">Prêt à dominer le marché ?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto text-lg">Votre transformation digitale commence par une simple discussion. Obtenez votre devis gratuit dès aujourd'hui.</p>
          <Link
            to="/contact"
            className="inline-block px-12 py-4 bg-white text-black font-black rounded-full uppercase tracking-tighter hover:bg-black hover:text-white transition-all shadow-2xl"
          >
            Lancer mon projet
          </Link>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
        </motion.div>

      </motion.section>
    </div>
  );
}
