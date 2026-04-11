import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { init, send } from '@emailjs/browser';
import { 
  FaEnvelope, 
  FaLinkedin, 
  FaGithub, 
  FaInstagram, 
  FaWhatsapp, 
  FaPaperPlane, 
  FaMapMarkerAlt,
  FaSpinner 
} from 'react-icons/fa';

// VÉRIFIEZ BIEN QUE CE CHEMIN EST CORRECT (../hooks/useFormSecurity)
import useFormSecurity from '../hooks/useFormSecurity';
import notificationService from '../services/notificationService';
import analyticsService from '../services/analyticsService';
import messagingService from '../dashboard/services/messagingService';

export default function Contact() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialisation d'EmailJS au montage du composant
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      init(publicKey);
    }
  }, []);

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const { formData, handleSubmit, handleChange } = useFormSecurity(
    {
      name: { type: 'text', minLength: 2, required: true },
      email: { type: 'email', required: true },
      message: { type: 'text', minLength: 10, required: true },
    },
    async (data) => {
      setIsSubmitting(true);
      const loadingToast = notificationService.loading('Transmission du signal...');
      
      try {
        await send(
          EMAILJS_SERVICE_ID, 
          EMAILJS_TEMPLATE_ID, 
          {
            from_name: data.name,
            from_email: data.email,
            message: data.message,
            reply_to: data.email,
          },
          EMAILJS_PUBLIC_KEY
        );

        notificationService.dismiss(loadingToast);
        notificationService.success('Message reçu ! On revient vers vous très vite.');
        setStatus({ type: 'success', message: 'Envoyé !' });
      } catch (err) {
        console.error("Erreur EmailJS:", err);
        notificationService.dismiss(loadingToast);
        // Solution de secours si l'API échoue
        window.location.href = `mailto:servicebanamokeli@://gmail.com de ${data.name}&body=${data.message}`;
      } finally {
        setIsSubmitting(false);
      }
    }
  );

  return (
    <section id="contact" className="py-24 bg-[#0a0a0c] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-20">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs">Prêt pour la suite ?</motion.span>
          <motion.h2 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="text-5xl md:text-7xl font-black mt-4 tracking-tighter uppercase italic">
            LANCEZ VOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">PROJET</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Email</p>
                  <p className="text-lg font-bold">servicebanamokeli@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <FaWhatsapp />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">WhatsApp</p>
                  <p className="text-lg font-bold">+243 829 054 350</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Bureaux</p>
                  <p className="text-lg font-bold">Kinshasa, RDC</p>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5">
              <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-black">Suivez-nous</p>
              <div className="flex gap-4">
                {[FaLinkedin, FaGithub, FaInstagram].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Icon />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4">Nom Complet</label>
                  <input 
                    name="name" 
                    value={formData.name || ''} // Le "|| ''" corrige l'erreur Uncontrolled input
                    onChange={handleChange} required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 transition-colors text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4">Email Pro</label>
                  <input 
                    name="email" 
                    value={formData.email || ''} 
                    onChange={handleChange} required
                    placeholder="john@startup.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 transition-colors text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4">Votre Message</label>
                <textarea 
                  name="message" 
                  value={formData.message || ''} 
                  onChange={handleChange} required
                  placeholder="Décrivez votre projet en quelques mots..."
                  rows="6"
                  className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 outline-none focus:border-red-500 transition-colors text-white"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`group w-full py-5 font-black rounded-full flex items-center justify-center gap-3 transition-all uppercase tracking-tighter ${
                  isSubmitting ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-white text-black hover:bg-red-600 hover:text-white'
                }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le Briefing'} 
                {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
