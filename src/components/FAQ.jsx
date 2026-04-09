import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

const faqData = [
  {
    question: 'Quels types de projets réalisez-vous ?',
    answer: 'Nous concevons des écosystèmes complets : sites web haute performance, applications mobiles natives, solutions Cloud scalables et audits de cybersécurité.',
  },
  {
    question: 'Comment obtenir un devis pour mon projet ?',
    answer: 'Il vous suffit de remplir notre formulaire de contact ou de choisir un pack dans la section "Offres". Un ingénieur vous recontactera sous 24h pour une analyse gratuite.',
  },
  {
    question: 'Quelle est votre méthodologie de travail ?',
    answer: 'Nous utilisons la méthode Agile (Scrum). Vous suivez l’avancement en temps réel via des sprints bi-hebdomadaires et des environnements de test dédiés.',
  },
  {
    question: 'Assurez-vous la maintenance après livraison ?',
    answer: "Absolument. Nous proposons des contrats de maintenance préventive et corrective pour garantir que votre solution reste performante et sécurisée 24/7.",
  },
  {
    question: "Accompagnez-vous les startups en RDC ?",
    answer: 'Oui, Muamokel Agency est fière de soutenir l’innovation locale en proposant des tarifs adaptés et un accompagnement stratégique aux startups prometteuses.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-[#0a0a0c] text-white" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs"
          >
            Aide & Support
          </motion.span>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black mt-4 mb-6 tracking-tighter uppercase italic"
          >
            QUESTIONS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">FRÉQUENTES</span>
          </motion.h2>
        </div>

        {/* Accordion Logic */}
        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={false}
              className={`rounded-[2rem] border transition-all duration-300 ${
                openIndex === idx ? 'bg-white/5 border-red-500/30' : 'bg-white/[0.02] border-white/10'
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <div className="flex items-center gap-4">
                  <FaQuestionCircle className={`transition-colors ${openIndex === idx ? 'text-red-500' : 'text-gray-600'}`} />
                  <span className="font-bold text-lg md:text-xl tracking-tight group-hover:text-red-500">
                    {item.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  className="text-gray-500"
                >
                  <FaChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-8 text-gray-400 leading-relaxed text-base md:text-lg border-t border-white/5 pt-6">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Footer Support */}
        <motion.p 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          className="text-center text-gray-600 text-sm mt-12"
        >
          Vous ne trouvez pas votre réponse ? <a href="/contact" className="text-red-500 font-bold hover:underline">Contactez nos ingénieurs</a>.
        </motion.p>
      </div>
    </section>
  );
}
