import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, FaClock, FaBriefcase, FaSearch, FaUpload, 
  FaCheckCircle, FaChevronRight, FaCode, FaServer, 
  FaDatabase, FaLaptopCode, FaTerminal, FaShieldAlt 
} from 'react-icons/fa';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';

const jobs = [
  {
    id: 1,
    title: 'Développeur Fullstack Senior (React/Node)',
    location: 'Kinshasa / Hybride',
    type: 'CDI',
    salary: ' $ - $',
    category: 'Ingénierie',
    icon: <FaCode className="text-red-600" />,
    description: 'Conception et déploiement d’architectures web scalables. Leadership technique sur des projets SaaS complexes.',
    requirements: ['Mastery of React & Node.js', 'Architecture Microservices', ' ans exp.'],
    tags: ['React', 'Node', 'Cloud']
  },
  {
    id: 2,
    title: 'Ingénieur Cloud & DevOps',
    location: 'Kinshasa / Remote',
    type: 'CDI',
    salary: '$ - $',
    category: 'Infrastructure',
    icon: <FaServer className="text-slate-800" />,
    description: 'Automatisation des infrastructures (IaC) et optimisation des pipelines CI/CD sous environnements AWS/Azure.',
    requirements: ['Terraform / Kubernetes', 'Expertise AWS', 'Sécurité Cloud'],
    tags: ['DevOps', 'AWS', 'Kubernetes']
  },
  {
    id: 3,
    title: 'Data Architect / Scientist',
    location: 'Kinshasa / Agence',
    type: 'CDI',
    salary: ' $ - $',
    category: 'Data',
    icon: <FaDatabase className="text-red-600" />,
    description: 'Modélisation de flux de données complexes et mise en place de stratégies d’intelligence artificielle prédictive.',
    requirements: ['Python / R', 'SQL / NoSQL Expert', 'Modélisation ML'],
    tags: ['Data', 'IA', 'SQL']
  }
];

const categories = ['Tous', 'Ingénierie', 'Infrastructure', 'Data', 'Cyber'];

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = activeCategory === 'Tous' || job.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, activeCategory]);

  const handleApply = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Candidature transmise avec succès à notre équipe technique.');
      setIsSubmitting(false);
      setSelectedJob(null);
    }, 2000);
  };

  return (
    <div className="bg-[#FCFCFC] min-h-screen font-sans">
      <NavbarSecured />

      {/* Hero Section IT Premium */}
      <section className="relative py-24 bg-white border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-red-600 font-bold tracking-[0.4em] uppercase text-xs block mb-4">
            Build the Future / Code with Us
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-light text-slate-900 mb-8 tracking-tighter">
            Développez des solutions <br/><span className="font-bold italic text-red-600">sans limites.</span>
          </motion.h1>
          
          <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-full p-2 flex items-center border border-gray-100">
            <FaSearch className="ml-6 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher une techno (React, DevOps, Data...)"
              className="w-full px-6 py-3 outline-none text-slate-600 bg-transparent text-sm uppercase tracking-widest"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-slate-900 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 transition-all">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Liste des Offres Techniques */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold border transition-all ${
                activeCategory === cat ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-400 border-gray-100 hover:border-red-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredJobs.map((job) => (
              <motion.div
                layout
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-gray-100 p-8 rounded-sm hover:shadow-2xl transition-all group flex flex-col md:flex-row gap-6 relative"
                onClick={() => setSelectedJob(job)}
              >
                <div className="w-16 h-16 bg-slate-50 flex items-center justify-center rounded-sm text-2xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-500">
                  {job.icon}
                </div>
                
                <div className="flex-grow cursor-pointer">
                  <span className="text-[10px] text-red-600 font-bold uppercase tracking-widest">{job.category}</span>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 mt-1 uppercase tracking-tight">{job.title}</h2>
                  <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 mb-6 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-2 border-r pr-4"><FaMapMarkerAlt/> {job.location}</span>
                    <span className="flex items-center gap-2 border-r pr-4"><FaClock/> {job.type}</span>
                    <span className="text-slate-900 underline decoration-red-600">{job.salary}</span>
                  </div>
                  <button className="flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] group-hover:text-red-600">
                    Détails du poste <FaChevronRight/>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Modal / Drawer Candidature */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)} className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" />
            
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="relative w-full max-w-2xl bg-white h-screen shadow-2xl p-10 overflow-y-auto"
            >
              <button onClick={() => setSelectedJob(null)} className="absolute top-10 right-10 text-3xl font-light hover:text-red-600 transition-colors">&times;</button>
              
              <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{selectedJob.title}</h2>
              <span className="bg-red-600 text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest mb-10 inline-block">{selectedJob.category}</span>

              <div className="space-y-10 mb-12">
                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 border-b pb-2">Mission technique</h3>
                  <p className="text-slate-600 leading-relaxed font-light text-lg">{selectedJob.description}</p>
                </section>

                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 border-b pb-2">Stack & Prérequis</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.requirements.map(req => (
                      <span key={req} className="bg-slate-100 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-700">
                        {req}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <form onSubmit={handleApply} className="bg-slate-50 p-8 space-y-4 border-t-2 border-red-600">
                <p className="text-[10px] font-bold text-center uppercase tracking-widest mb-4">Postuler en 1 minute</p>
                <input required type="text" placeholder="NOM COMPLET" className="w-full p-4 text-[10px] tracking-widest border border-gray-200 outline-none focus:border-slate-900 bg-white" />
                <input required type="email" placeholder="EMAIL PROFESSIONNEL" className="w-full p-4 text-[10px] tracking-widest border border-gray-200 outline-none focus:border-slate-900 bg-white" />
                
                <div className="border-2 border-dashed border-gray-200 p-8 text-center bg-white hover:border-red-600 transition-colors relative group">
                  <FaUpload className="mx-auto mb-2 text-gray-300 group-hover:text-red-600" />
                  <p className="text-[10px] tracking-widest text-slate-400 uppercase">Joindre CV (PDF)</p>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>

                <button disabled={isSubmitting} className="w-full bg-slate-900 text-white py-5 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-red-600 transition-all">
                  {isSubmitting ? 'Sending...' : 'Soumettre ma candidature'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
