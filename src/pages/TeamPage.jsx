import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaCode, FaServer, FaPaintBrush } from 'react-icons/fa';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';

export default function TeamPage() {
  const teamMembers = [
    { 
      id: 1, 
      name: 'Christ ILUNGA', 
      role: 'Ingénieur en réseaux système & Associé', 
      image: '/IrChristian.jpeg', 
      skills: ['Réseaux', 'Administration Système', 'Sécurité'], 
      color: 'from-red-600 to-red-400' 
    },
    { 
      id: 2, 
      name: 'Emmanuel MPUTU', 
      role: 'Ingénieur en maintenance système réseaux & Associé', 
      image: '/IrEmma.jpeg', 
      skills: ['Cloud Computing', 'Maintenance IT', 'Architecture'], 
      color: 'from-blue-600 to-cyan-400' 
    },
    { 
      id: 3, 
      name: 'Merveille SUKA', 
      role: 'UI/UX Designer & Associé', 
      image: '/IrMerveille.jpg', 
      skills: ['Figma', 'UI/UX Design', 'Prototypage'], 
      color: 'from-pink-600 to-purple-400' 
    },
    { 
      id: 4, 
      name: 'Thielcy BENDELO', 
      role: 'Ingénieur Logiciel principal & Associé', 
      image: '/bendelo.jpeg', 
      skills: ['React.js', 'Node.js', 'Architecture Web'], 
      color: 'from-emerald-600 to-teal-400' 
    },
    { 
      id: 5, 
      name: 'Louiscar INGEBA', 
      role: 'Chargé Relation Publique & Associé', 
      image: '/Louisc.jpeg', 
      skills: ['Communication', 'Stratégie Client', 'Marketing Tech'], 
      color: 'from-orange-600 to-amber-400' 
    },
    { 
      id: 8, 
      name: 'Christian ', 
      role: 'Ingénieur en intelligence artificielle et Data science & Associé', 
      image: '/IrZap.jpeg', 
      skills: ['Machine Learning', 'Data Science', 'Python IA'], 
      color: 'from-indigo-600 to-purple-400' 
    },
  ];


  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white">
      <NavbarSecured />
      
      <div className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        {/* Header Look Agence */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs">Le capital humain</span>
          <h1 className="text-5xl md:text-8xl font-black mt-4 mb-6 tracking-tighter uppercase italic">
            NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">EXPERTS</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Une synergie de talents passionnés par la résolution de défis technologiques complexes.
          </p>
        </motion.div>

        {/* Grille de l'équipe style "Bento" */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/10 p-4 transition-all hover:bg-white/[0.05] hover:border-red-500/30">
                
                {/* Image Section avec Glow */}
                <div className="relative aspect-square overflow-hidden rounded-[24px] mb-10">
                  <div className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-0 group-hover:opacity-40 transition-opacity z-10`} />
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Social Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-center gap-3 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                    <SocialBtn icon={<FaLinkedin />} />
                    <SocialBtn icon={<FaGithub />} />
                    <SocialBtn icon={<FaTwitter />} />
                  </div>
                </div>

                {/* Info Section */}
                <div className="px-2">
                  <h3 className="text-2xl font-bold tracking-tight">{member.name}</h3>
                  <p className="text-red-500 font-mono text-xs uppercase tracking-widest mb-4">{member.role}</p>
                  
                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-gray-400 group-hover:text-white group-hover:border-white/20 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function SocialBtn({ icon }) {
  return (
    <button className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
      {icon}
    </button>
  );
}
