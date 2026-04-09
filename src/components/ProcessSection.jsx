import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPuzzlePiece, FaCode, FaRocket, FaHandshake, FaChevronRight } from 'react-icons/fa';

const steps = [
  {
    icon: <FaSearch />,
    title: 'Analyse & Conseil',
    desc: 'Audit technique et définition de la roadmap.',
    color: 'from-blue-600 to-cyan-400'
  },
  {
    icon: <FaPuzzlePiece />,
    title: 'Conception',
    desc: 'Architecture logicielle et prototypage UX/UI.',
    color: 'from-purple-600 to-pink-400'
  },
  {
    icon: <FaCode />,
    title: 'Développement',
    desc: 'Sprints agiles et codage haute performance.',
    color: 'from-red-600 to-orange-400'
  },
  {
    icon: <FaRocket />,
    title: 'Déploiement',
    desc: 'Mise en production sécurisée et monitoring.',
    color: 'from-emerald-600 to-teal-400'
  },
  {
    icon: <FaHandshake />,
    title: 'Suivi & Support',
    desc: 'Maintenance évolutive et accompagnement.',
    color: 'from-indigo-600 to-purple-400'
  }
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-[#0a0a0c] relative overflow-hidden" id="process">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-1/2 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic"
          >
            NOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">MÉTHODOLOGIE</span>
          </motion.h2>
          <p className="text-gray-500 mt-4 font-mono text-sm tracking-widest">DU CONCEPT À LA RÉALITÉ DIGITALE</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center group"
            >
              {/* Connector (Desktop) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-6 text-white/10 group-hover:text-red-500 transition-colors">
                  <FaChevronRight size={12} />
                </div>
              )}

              {/* Icon Circle */}
              <div className="relative mb-6">
                <div className={`w-20 h-20 rounded-[2rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-3xl text-white transition-all duration-500 group-hover:rounded-2xl group-hover:border-red-500/50 group-hover:bg-red-500/10`}>
                  <motion.div 
                    whileHover={{ rotate: 360 }} 
                    transition={{ duration: 0.8 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-[10px] font-black border-4 border-[#0a0a0c]">
                  0{idx + 1}
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[180px]">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Line Glow */}
              <motion.div 
                className={`h-1 w-0 bg-gradient-to-r ${step.color} mt-4 rounded-full group-hover:w-full transition-all duration-500`}
              />
            </motion.div>
          ))}
        </div>

        {/* Methodology Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex justify-center"
        >
          <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
              Approche Agile • Sprints bi-hebdomadaires • Transparence totale
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
