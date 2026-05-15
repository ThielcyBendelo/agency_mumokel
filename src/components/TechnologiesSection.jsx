import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaDocker, FaAws, FaShieldAlt, 
  FaJsSquare, FaPython, FaGitAlt 
} from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiExpress, SiNextdotjs, SiTypescript, SiKalilinux, SiVirtualbox  } from 'react-icons/si';


// Petit composant pour l'effet de compteur numérique
const Counter = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut", delay: 0.5 });
    return rounded.onChange((v) => setDisplayValue(v));
  }, [count, value, rounded]);

  return <span>{displayValue}</span>;
};

const technologies = [
  { name: 'React', icon: <FaReact />, color: 'text-[#61DAFB]', level: 'Expert', percentage: 95, desc: 'Interfaces dynamiques' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: 'text-white', level: 'Expert', percentage: 92, desc: 'Performance & SEO' },
  { name: 'Node.js', icon: <FaNodeJs />, color: 'text-[#339933]', level: 'Expert', percentage: 90, desc: 'Backend Scalable' },
  { name: 'TypeScript', icon: <SiTypescript />, color: 'text-[#3178C6]', level: 'Avancé', percentage: 85, desc: 'Code Typé & Sûr' },
  { name: 'MongoDB', icon: <SiMongodb />, color: 'text-[#47A248]', level: 'Avancé', percentage: 88, desc: 'NoSQL Flexible' },
  { name: 'Docker', icon: <FaDocker />, color: 'text-[#2496ED]', level: 'Intermédiaire', percentage: 75, desc: 'Conteneurisation' },
  { name: 'AWS', icon: <FaAws />, color: 'text-[#FF9900]', level: 'Intermédiaire', percentage: 70, desc: 'Infrastructure Cloud' },
  { name: 'CyberSec', icon: <FaShieldAlt />, color: 'text-red-500', level: 'Expert', percentage: 94, desc: 'Sécurité & Audit' },
    { 
    name: 'Kali Linux', 
    icon: <SiKalilinux />, 
    color: 'text-cyan-500', 
    level: 'Expert', 
    percentage: 92, 
    desc: 'Audits de Sécurité & Pentesting' 
  },
  { 
    name: 'VirtualBox', 
    icon: <SiVirtualbox />, 
    color: 'text-sky-500', 
    level: 'Avancé', 
    percentage: 88, 
    desc: 'Virtualisation d’environnements' 
  },
];




 



export default function Technologies() {
  return (
    <section className="py-24 bg-[#0a0a0c] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic"
          >
            NOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">STACK TECH</span>
          </motion.h2>
          <p className="text-gray-500 mt-4 font-mono text-sm tracking-widest uppercase">Ingénierie de pointe & Innovation</p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.05)' }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-[32px] bg-white/[0.02] border border-white/10 flex flex-col items-center text-center transition-all"
            >
              <div className={`text-5xl ${tech.color} mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
                {tech.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
              <p className="text-gray-500 text-xs mb-6 leading-relaxed">{tech.desc}</p>
              
              {/* --- BARRE DE PROGRESSION AVEC COMPTEUR --- */}
              <div className="w-full space-y-2 mb-4">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
                  <span className="text-red-500">{tech.level}</span>
                  <span className="text-gray-400">
                    <Counter value={tech.percentage} />%
                  </span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.percentage}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-red-600 to-purple-500 rounded-full"
                  />
                </div>
              </div>

              <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-red-500 transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Banner défilante */}
        <div className="mt-20 py-10 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
           <FaJsSquare size={30} className="text-white" />
           <FaPython size={30} className="text-white" />
           <FaGitAlt size={30} className="text-white" />
           <SiTailwindcss size={30} className="text-white" />
           <SiExpress size={30} className="text-white" />
        </div>
      </div>
    </section>
  );
}
