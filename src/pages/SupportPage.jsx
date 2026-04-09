import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeadset, FaFilePdf, FaTicketAlt, FaComments, FaCheckCircle, FaPaperPlane, FaArrowRight, FaClock  } from 'react-icons/fa';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';

const guides = [
  { id: 1, title: 'Guide Utilisateur', size: '2.4 MB', type: 'PDF' },
  { id: 2, title: 'FAQ Technique', size: '1.1 MB', type: 'PDF' },
  { id: 3, title: 'Documentation API', size: '5.8 MB', type: 'DOCS' }
];

export default function SupportPage() {
  const [ticket, setTicket] = useState({ nom: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setTicket({ nom: '', email: '', message: '' });
  };

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white">
      <NavbarSecured />

      <div className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        {/* Header Look Agence */}
        <div className="text-center mb-20">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs">Centre d'assistance</motion.span>
          <motion.h1 initial={{ y: 20 }} animate={{ y: 0 }} className="text-5xl md:text-7xl font-black mt-4 mb-6 tracking-tighter uppercase italic">
            SUPPORT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">TECHNIQUE</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Une équipe d'ingénieurs à votre écoute pour garantir la continuité de vos services.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* COLONNE GAUCHE : Chat & Docs (5 colonnes) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Live Chat Card */}
            <motion.div whileHover={{ scale: 1.02 }} className="p-8 rounded-[2.5rem] bg-gradient-to-br from-red-600/20 to-transparent border border-red-500/20 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
                  <FaComments className="text-xl" />
                </div>
                <h2 className="text-2xl font-bold uppercase italic tracking-tighter">Chat en direct</h2>
              </div>
              <p className="text-gray-400 text-sm mb-6">Temps de réponse moyen : <span className="text-white font-bold"> moins de 5 minutes.</span></p>
              <button className="w-full py-4 bg-white text-black font-black rounded-2xl uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2">
                Lancer le chat <FaArrowRight size={12}/>
              </button>
            </motion.div>

            {/* Documentation Section */}
            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-bold mb-6 uppercase italic flex items-center gap-3">
                <FaFilePdf className="text-red-500" /> Ressources
              </h2>
              <div className="space-y-4">
                {guides.map(guide => (
                  <a key={guide.id} href="#" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-transparent hover:border-white/20 hover:bg-white/10 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="text-red-500 opacity-50 group-hover:opacity-100 transition-opacity"><FaFilePdf /></div>
                      <span className="text-sm font-bold text-gray-300 group-hover:text-white">{guide.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">{guide.size}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : Formulaire Ticket (7 colonnes) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[60px] rounded-full -mr-16 -mt-16"></div>
              
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500">
                  <FaTicketAlt />
                </div>
                <h2 className="text-2xl font-bold uppercase italic tracking-tighter">Ouvrir un ticket</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4">Nom complet</label>
                    <input type="text" name="nom" value={ticket.nom} onChange={(e) => setTicket({...ticket, nom: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 transition-colors" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4">Email</label>
                    <input type="email" name="email" value={ticket.email} onChange={(e) => setTicket({...ticket, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 transition-colors" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4">Description du problème</label>
                  <textarea name="message" rows="5" value={ticket.message} onChange={(e) => setTicket({...ticket, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 outline-none focus:border-red-500 transition-colors" required />
                </div>
                
                <button type="submit" className="w-full py-5 bg-white text-black font-black rounded-full flex items-center justify-center gap-3 uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-all shadow-2xl">
                  {sent ? "Ticket Envoyé" : "Soumettre la requête"} <FaPaperPlane className={sent ? "hidden" : "block"} />
                </button>

                <AnimatePresence>
                  {sent && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2 text-green-500 font-bold text-sm mt-4">
                      <FaCheckCircle /> Votre demande a été enregistrée avec succès.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>

{/* --- SECTION HORAIRES & DISPONIBILITÉ --- */}
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-20 max-w-5xl mx-auto"
>
  <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl">
    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
      
      {/* Statut en direct */}
      <div className="flex flex-col items-center md:items-start space-y-4">
        <h3 className="text-2xl font-bold uppercase italic tracking-tighter flex items-center gap-3">
          <FaClock className="text-red-500" /> Disponibilité
        </h3>
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-black text-green-500 uppercase tracking-widest">Équipe en ligne</span>
        </div>
      </div>

      {/* Grille des horaires */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
        <div className="text-center md:text-left">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Lundi - Vendredi</p>
          <p className="text-lg font-bold">08h00 — 18h00</p>
        </div>
        <div className="text-center md:text-left border-x border-white/5 px-8">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Samedi</p>
          <p className="text-lg font-bold">09h00 — 13h00</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Urgences 24/7</p>
          <p className="text-sm text-gray-400">Clients sous contrat Enterprise uniquement</p>
        </div>
      </div>

    </div>
  </div>
  
  {/* Note de bas de page support */}
  <p className="text-center text-gray-600 text-[10px] mt-8 uppercase tracking-[0.3em]">
    Fuseau horaire : Kinshasa, RDC (GMT+1) • Support multilingue : FR / EN
  </p>
</motion.div>


      </div>
      <Footer />
    </div>
  );
}
