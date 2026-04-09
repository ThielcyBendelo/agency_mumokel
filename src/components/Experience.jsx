import { motion } from 'framer-motion';
// On importe tout depuis 'fa' pour la stabilité maximale
import { 
  FaHistory, 
  FaCheckCircle, 
  FaAward, 
  FaGlobe, 
  FaReact, 
  FaAws, 
  FaCloud, 
  FaUsersCog 
} from 'react-icons/fa';

export default function Experience() {
  const experiences = [
    {
      year: '2024',
      title: 'Expansion Internationale',
      desc: 'Déploiement de solutions SaaS pour des clients en Europe et Amérique du Nord.',
      icon: <FaGlobe className="text-blue-400" />
    },
    {
      year: '2023',
      title: 'Expertise Cloud & Sécurité',
      desc: 'Certification de l’équipe sur AWS et Azure. Migration de +20 infrastructures.',
      icon: <FaAward className="text-purple-400" />
    },
    {
      year: '2023',
      title: 'Lancement Muamokel',
      desc: 'Création de l’agence par Ir. Thielcy et Ir. Christian. Focus sur l’innovation en RDC.',
      icon: <FaHistory className="text-red-400" />
    }
  ];

  const stats = [
    { label: 'Projets Livrés', value: '+50' },
    { label: 'Clients Satisfaits', value: '100%' },
    { label: 'Expertises', value: '12+' },
    { label: 'Ingénieurs', value: '10' }
  ];

  return (
    <section id="experience" className="py-24 bg-[#0a0a0c] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs">Notre Parcours</motion.span>
          <motion.h2 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="text-5xl md:text-7xl font-black mt-4 mb-6 tracking-tighter uppercase italic">
            EXPÉRIENCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">& SUCCÈS</span>
          </motion.h2>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {stats.map((stat, idx) => (
            <motion.div key={idx} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: idx * 0.1 }} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 text-center">
              <h3 className="text-4xl md:text-5xl font-black mb-2">{stat.value}</h3>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto mb-32">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500 via-purple-500 to-transparent opacity-20 hidden md:block" />
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} className={`relative flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-[#0a0a0c] -translate-x-1/2 z-10 hidden md:block" />
                <div className="w-full md:w-[45%] p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.06] transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-white/5 text-xl group-hover:scale-110 transition-transform">{exp.icon}</div>
                    <span className="text-3xl font-black text-white/20">{exp.year}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 uppercase group-hover:text-red-500">{exp.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{exp.desc}</p>
                </div>
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- SECTION CERTIFICATIONS --- */}
        <div className="mt-32 border-t border-white/5 pt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white uppercase tracking-tighter italic">
              Nos <span className="text-red-500">Accréditations</span> Officielles
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {/* AWS */}
            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
              <FaAws className="text-5xl text-[#FF9900]" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Solutions Architect</span>
            </motion.div>

            {/* Azure */}
            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
              <FaCloud className="text-5xl text-[#0078D4]" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Azure Expert</span>
            </motion.div>

            {/* React */}
            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
              <FaReact className="text-5xl text-[#61DAFB]" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">React Specialist</span>
            </motion.div>

            {/* Scrum */}
            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
              <FaUsersCog className="text-5xl text-[#512D6D]" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Scrum Master</span>
            </motion.div>
          </div>
        </div>

        {/* Badge méthodologie */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-20 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-600/10 border border-red-500/20 text-red-500">
            <FaCheckCircle />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Agilité • Performance • Sécurité</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
