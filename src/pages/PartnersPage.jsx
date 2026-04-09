import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaAward, FaShieldAlt, FaCheckDouble } from 'react-icons/fa';
import NavbarSecured from '../components/NavbarSecured';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

const partners = [
  { 
    id: 1, 
    name: 'Microsoft', 
    logo: 'https://wikimedia.org', 
    desc: 'Expertise Cloud Azure et solutions Enterprise.' 
  },
  { 
    id: 2, 
    name: 'Google', 
    logo: 'https://wikimedia.org', 
    desc: 'Partenaire Workspace et infrastructures Cloud.' 
  },
  { 
    id: 3, 
    name: 'AWS', 
    logo: 'https://wikimedia.org', 
    desc: 'Architecture Cloud native et scalabilité mondiale.' 
  },
];


const certifications = [
  { id: 1, name: 'ISO 27001', icon: <FaShieldAlt />, desc: 'Standard mondial pour la sécurité de l’information.' },
  { id: 2, name: 'Google Cloud Certified', icon: <FaAward />, desc: 'Certification experte en ingénierie Cloud.' },
  { id: 3, name: 'React Professional', icon: <FaCheckDouble />, desc: 'Maîtrise avancée des architectures frontend.' },
];

export default function PartnersPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white">
      <NavbarSecured />

      <div className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        {/* Header Agence Look */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs"
          >
            Confiance & Expertise
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black mt-4 mb-6 tracking-tighter uppercase italic"
          >
            PARTENAIRES <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">& LABELS</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Nous collaborons avec les leaders mondiaux pour garantir à nos clients des solutions à la pointe de l'innovation.
          </p>
        </div>

        {/* SECTION PARTENAIRES */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-white/10 flex-1"></div>
            <h2 className="text-xl font-bold uppercase italic tracking-widest flex items-center gap-3">
              <FaHandshake className="text-red-500" /> Écosystème Global
            </h2>
            <div className="w-12 h-px bg-white/10 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, idx) => (
              <motion.div
                key={partner.id}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 flex flex-col items-center text-center group transition-all hover:bg-white/[0.05] hover:border-red-500/30"
              >
                <div className="h-16 mb-8 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full w-auto grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-tighter">{partner.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{partner.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION CERTIFICATIONS */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-white/10 flex-1"></div>
            <h2 className="text-xl font-bold uppercase italic tracking-widest flex items-center gap-3">
              <FaAward className="text-red-500" /> Standards & Qualité
            </h2>
            <div className="w-12 h-px bg-white/10 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-start gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 text-2xl shrink-0">
                  {cert.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 tracking-tight uppercase">{cert.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-white/5 pt-10">
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
}
