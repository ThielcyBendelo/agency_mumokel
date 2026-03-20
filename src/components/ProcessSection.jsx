import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPuzzlePiece, FaCode, FaRocket, FaHandshake } from 'react-icons/fa';

const MotionDiv = motion.div;
const MotionH2 = motion.h2;

const steps = [
  {
    icon: FaSearch,
    title: 'Analyse & Conseil',
    description:
      'Compréhension des besoins, audit technique, recommandations personnalisées.'
  },
  {
    icon: FaPuzzlePiece,
    title: 'Conception',
    description:
      'Wireframes, maquettes, architecture technique, validation client.'
  },
  {
    icon: FaCode,
    title: 'Développement',
    description:
      'Développement agile, sprints, tests unitaires et fonctionnels.'
  },
  {
    icon: FaRocket,
    title: 'Déploiement',
    description:
      'Mise en production, configuration serveurs, sécurité et monitoring.'
  },
  {
    icon: FaHandshake,
    title: 'Suivi & Support',
    description:
      'Maintenance, évolutions, support client, formation.'
  }
];

function ProcessSection() {
  return (
    <section
      className="py-16 px-4 bg-gradient-to-b from-white via-blue-50 to-gray-50"
      id="process"
    >
      <div className="w-full">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-6 drop-shadow-lg text-center">
          Processus de travail
        </h2>
        <p className="text-lg text-gray-700 mb-10 text-center">
          Un accompagnement complet, étape par étape, pour garantir la réussite de votre projet digital.<br />
          <span className="text-purple-600 font-semibold">Méthodologie agile, communication continue, validation à chaque étape.</span>
        </p>
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              className="flex flex-col items-center group cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover:shadow-lg ${idx === 0 ? 'bg-blue-200 group-hover:bg-blue-300' : idx === steps.length-1 ? 'bg-green-200 group-hover:bg-green-300' : 'bg-purple-200 group-hover:bg-purple-300'}`}>
                <step.icon className="text-2xl font-bold text-blue-900" />
              </div>
              <h3 className="font-semibold text-lg mb-1 text-blue-800 group-hover:text-blue-600 transition-colors">{step.title}</h3>
              <p className="text-gray-600 text-center text-sm mb-2 group-hover:text-gray-800 transition-colors">{step.description}</p>
              {idx < steps.length - 1 && <span className="text-3xl text-gray-300 group-hover:text-purple-400 transition-colors">→</span>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ProcessSection;
