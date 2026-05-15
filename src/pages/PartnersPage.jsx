import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaAward, FaShieldAlt, FaCheckDouble, FaGithub, FaReact, FaDocker, FaLinux, FaNetworkWired, FaWindows, FaGoogle, FaAws  } from 'react-icons/fa';
import { SiVercel,  SiMongodb } from 'react-icons/si'; 
import NavbarSecured from '../components/NavbarSecured';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const partners = [
  { 
    id: 1, 
    name: 'Microsoft Partner', 
    icon: <FaWindows className="text-sky-400 text-4xl" />, 
    desc: 'Intégration d’architectures cloud hybrides Azure, déploiement d’infrastructures complexes et services managés Enterprise.' 
  },
  { 
    id: 2, 
    name: 'Google Cloud Partner', 
    icon: <FaGoogle className="text-red-400 text-4xl" />, // Vous pouvez aussi utiliser text-white selon votre charte
    desc: 'Expertise avancée Google Cloud Platform (GCP), solutions d’Intelligence Artificielle (Vertex AI) et migration de données sécurisées.'
  },
  { 
    id: 3, 
    name: 'AWS Partner', 
    icon: <FaAws className="text-amber-500 text-5xl" />, 
    desc: 'Conception d’architectures serverless cloud-natives, scalabilité mondiale automatisée et haute disponibilité des applications.' 
  },
  { 
    id: 4, 
    name: 'Docker Verified Partner', 
    icon: <FaDocker className="text-blue-400 text-5xl" />, 
    desc: 'Conteneurisation d’applications d’entreprise, standardisation des environnements de développement et accélération des cycles de livraison.' 
  },
  { 
    id: 5, 
    name: 'GitHub Technology Partner', 
    icon: <FaGithub className="text-purple-400 text-5xl" />, 
    desc: 'Gestion avancée du cycle de vie du code, automatisation des workflows CI/CD via GitHub Actions et audits de sécurité du code source.' 
  },
  { 
    id: 6, 
    name: 'Vercel Deployment Partner', 
    icon: <SiVercel className="text-white text-4xl" />, 
    desc: 'Hébergement d’applications web ultra-performantes, architectures Jamstack, serveurs Edge mondiaux et optimisations SEO natives.' 
  },
  { id: 7, name: 'MongoDB Partner', 
    icon: <SiMongodb className="text-emerald-500 text-4xl" />,
   desc: 'Bases de données distribuées Scalables.' },
];

const certifications = [
  { 
    id: 1, 
    name: 'ISO/IEC 27001', 
    icon: <FaShieldAlt className="text-emerald-400 text-2xl" />, 
    desc: 'Garantie d’un Système de Management de la Sécurité de l’Information (SMSI) robuste pour la protection absolue des données clients.'
  },
  { 
    id: 2, 
    name: 'Google Cloud Professional', 
    icon: <FaAward className="text-amber-400 text-2xl" />, 
    desc: 'Validation officielle de nos compétences en ingénierie d’infrastructures, DevOps et déploiement d’applications conteneurisées.'
  },
  { 
    id: 3, 
    name: 'React Advanced Architecture', 
    icon: <FaReact className="text-cyan-400 text-2xl" />, 
    desc: 'Certification attestant la maîtrise avancée des frameworks frontend modernes, optimisation des performances et architectures SPA/SSR.' 
  },
  { 
    id: 4, 
    name: 'Red Hat Certified Engineer (RHCE)', 
    icon: <FaLinux className="text-red-500 text-2xl" />, 
    desc: 'Validation de l’expertise avancée en administration et automatisation des systèmes Linux d’entreprise avec Ansible.' 
  },
  { 
    id: 5, 
    name: 'Cisco CCNA Security', 
    icon: <FaNetworkWired className="text-blue-400 text-2xl" />, 
    desc: 'Certification professionnelle en ingénierie, sécurisation, routage et commutation des infrastructures réseaux d’entreprise.' 
  },
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 flex flex-col items-center text-center group transition-all hover:bg-white/[0.05] hover:border-red-500/30 select-none"
              >
                {/* Zone de l'icône modifiée pour Font Awesome */}
                <div className="h-16 mb-8 flex items-center justify-center text-center transition-all duration-500 grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100">
                  {partner.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 uppercase tracking-tighter text-white">
                  {partner.name}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed">
                  {partner.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div> {/* AJOUTÉ : Ferme proprement la div de la SECTION PARTENAIRES */}

        {/* SECTION CERTIFICATIONS */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-white/10 flex-1"></div>
            <h2 className="text-xl font-bold uppercase italic tracking-widest flex items-center gap-3">
              <FaAward className="text-red-500" /> Standards & Qualité
            </h2>
            <div className="w-12 h-px bg-white/10 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <h3 className="text-lg font-bold mb-2 tracking-tight uppercase text-white">{cert.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div> {/* Ferme le conteneur principal centré qui englobe les deux sections */}

      <div className="mt-20 border-t border-white/5 pt-10">
        <FAQ />
      </div>
      
      <Footer />
    </div>
  );
}
