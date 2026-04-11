import React, { useState } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar, FaTimes, FaPen } from 'react-icons/fa';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const initialTestimonials = [
  {
    name: 'Alice MBOMBO',
    role: 'CEO',
    company: 'TechVision',
    project: 'Application Mobile',
    date: 'Mars 2024',
    rating: 5,
    text: 'Une expertise technique rare. L\'équipe a su transformer notre idée complexe en une solution fluide et performante.',
  },
  // Ajoute d'autres ici...
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', project: '', text: '', rating: 5 });

  const goToNext = () => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
            Retours <span className="text-purple-500">Expérience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Ce que disent nos partenaires sur la qualité de nos livrables informatiques.</p>
        </div>

        <div className="max-w-4xl mx-auto relative group">
          <AnimatePresence mode="wait">
            <Motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-14 rounded-[40px] shadow-2xl relative"
            >
              <FaQuoteLeft className="text-purple-500/20 text-6xl absolute top-10 left-10" />
              
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-sm" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-10">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonials[currentIndex].name}</h4>
                    <p className="text-purple-400 text-sm font-mono uppercase tracking-widest">
                      {testimonials[currentIndex].project}
                    </p>
                  </div>
                </div>
              </div>
            </Motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-4 mt-10">
            <button onClick={goToPrevious} className="p-4 bg-white/5 hover:bg-purple-600 text-white rounded-2xl transition-all border border-white/10">
              <FaChevronLeft />
            </button>
            <button onClick={() => setShowModal(true)} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all flex items-center gap-3">
              <FaPen /> Laisser un avis
            </button>
            <button onClick={goToNext} className="p-4 bg-white/5 hover:bg-purple-600 text-white rounded-2xl transition-all border border-white/10">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Amélioré */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <Motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-[#0d0d0f] border border-white/10 w-full max-w-lg rounded-[32px] p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
              <button onClick={() => setShowModal(false)} className="absolute right-6 top-6 text-gray-500 hover:text-white transition-colors"><FaTimes /></button>
              <h3 className="text-2xl font-black text-white mb-6 uppercase italic">Votre Témoignage</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Nom complet" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-purple-500 transition-all" />
                <input type="text" placeholder="Projet réalisé" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-purple-500 transition-all" />
                <textarea placeholder="Comment s'est passée votre expérience ?" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-purple-500 transition-all resize-none" />
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-gray-400 outline-none focus:border-purple-500 appearance-none">
                  {[5, 4, 3, 2, 1].map(n => <option key={n} value={n} className="bg-dark-300">{n} Étoiles</option>)}
                </select>
                <button className="w-full py-5 bg-purple-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all">Publier mon avis</button>
              </form>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
