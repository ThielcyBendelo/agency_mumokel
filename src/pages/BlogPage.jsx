import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

const articles = [
  {
    id: 1,
    title: 'Tendances Architecturales IT 2026',
    image: '/images/blog/it2025.jpg',
    summary: 'L’intégration de l’IA dans la conception bioclimatique révolutionne nos agences.',
    date: '15 Avr 2026',
    category: 'Innovation',
    readTime: '5 min',
    content: 'Les technologies cloud, IA et cybersécurité seront au cœur des enjeux de la construction de demain...',
  },
  {
    id: 2,
    title: 'Sécuriser les Données de Projet',
    image: '/images/blog/securite.jpg',
    summary: 'Comment protéger vos plans et maquettes BIM contre les cybermenaces.',
    date: '02 Avr 2026',
    category: 'Sécurité',
    readTime: '3 min',
    content: 'La protection des données est devenue une priorité pour toute agence...',
  }
];

const categories = ['Tous', 'Innovation', 'Sécurité', 'Design', 'Urbanisme'];
const ITEMS_PER_PAGE = 6;

export default function BlogPage() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formStatus, setFormStatus] = useState('');
  
  // SEO Dynamique : Change le titre de l'onglet selon l'article ouvert
  useEffect(() => {
    if (selected) {
      document.title = `${selected.title} | Agence d'Architecture`;
    } else {
      document.title = "Blog & Actualités | Agence d'Architecture";
    }
  }, [selected]);

  const modalContentRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: modalContentRef });
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = activeCategory === 'Tous' || article.category === activeCategory;
      const isSearchActive = searchQuery.length >= 2;
      const matchesSearch = isSearchActive 
        ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) 
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const similarArticles = useMemo(() => {
    if (!selected) return [];
    return articles.filter(a => a.category === selected.category && a.id !== selected.id).slice(0, 2);
  }, [selected]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = encodeURIComponent(`Découvrez cet article d'architecture : ${selected?.title}`);
    const shareLinks = {
      linkedin: `https://linkedin.com{url}`,
      twitter: `https://twitter.com{text}&url=${url}`,
      facebook: `https://facebook.com{url}`
    };
    if (shareLinks[platform]) window.open(shareLinks[platform], '_blank');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Envoi en cours...');
    setTimeout(() => {
      setFormStatus('Merci ! Votre demande concernant cet article a été transmise.');
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans">
      {/* Balises structurées JSON-LD pour Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": selected ? selected.title : "Blog Architecture",
          "image": selected ? selected.image : "/logoM.png",
          "author": { "@type": "Person", "name": "Architecte Principal" }
        })}
      </script>

      <NavbarSecured />
      
      <header className="bg-white border-b border-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl md:text-5xl font-light text-slate-900 mb-4 uppercase tracking-tighter italic">
            Perspectives & <span className="font-bold text-red-600 not-italic">Actualités</span>
          </motion.h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Navigation & Recherche */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            {categories.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-gray-100'}`}>
                {cat}
              </button>
            ))}
          </div>
          <input type="text" placeholder="RECHERCHER (MIN. 2 CARACTÈRES)..."
            className="w-full md:w-64 px-4 py-2 border-b border-gray-200 focus:border-slate-900 outline-none bg-transparent text-[10px] tracking-widest uppercase"
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
        </div>

        {/* Grille d'articles sémantique (Balise <article>) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode='popLayout'>
            {paginatedArticles.map((article) => (
              <motion.article layout key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                className="group cursor-pointer flex flex-col h-full bg-white p-4 shadow-sm border border-transparent hover:border-gray-100 transition-all hover:shadow-xl rounded-sm"
                onClick={() => setSelected(article)}>
                <div className="aspect-[16/10] mb-5 overflow-hidden bg-gray-100 rounded-sm">
                  <motion.img whileHover={{ scale: 1.05 }} src={article.image} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <h2 className="text-lg font-bold mb-3 group-hover:text-red-600 transition-colors uppercase tracking-tight leading-tight">{article.title}</h2>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-grow font-light">{article.summary}</p>
                <div className="flex justify-between items-center text-[9px] text-slate-400 border-t pt-4 tracking-widest uppercase font-bold">
                  <span>{article.date}</span>
                  <span className="text-slate-900 underline underline-offset-4 tracking-[0.2em]">Lire l'étude</span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-sm text-[10px] font-bold transition-all border ${currentPage === i + 1 ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-gray-200'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Modal avec Parallaxe & SEO Title */}
        <AnimatePresence>
          {selected && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => {setSelected(null); setFormStatus('');}} className="absolute inset-0 bg-slate-900/95 backdrop-blur-md" />
              <motion.div ref={modalContentRef} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} 
                className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto relative z-[110] shadow-2xl rounded-sm scroll-smooth">
                
                <div className="sticky top-0 bg-white/90 backdrop-blur-sm px-8 py-4 border-b flex justify-between items-center z-20">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase">{selected.category} — {selected.readTime}</span>
                  <button onClick={() => {setSelected(null); setFormStatus('');}} className="text-3xl font-light hover:text-red-600 transition-colors">&times;</button>
                </div>

                <div className="p-8 md:p-16">
                  <div className="w-full h-[450px] overflow-hidden mb-12 rounded-sm shadow-sm relative bg-slate-100">
                    <motion.img style={{ y: yImage }} src={selected.image} className="absolute inset-0 w-full h-[140%] object-cover" alt={selected.title} />
                  </div>
                  
                  <div className="flex gap-6 mb-8 items-center border-y py-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partager :</span>
                    <button onClick={() => handleShare('linkedin')} className="text-[10px] hover:text-red-600 font-bold uppercase">LinkedIn</button>
                    <button onClick={() => handleShare('twitter')} className="text-[10px] hover:text-red-600 font-bold uppercase">Twitter</button>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-bold mb-10 text-slate-900 leading-tight uppercase tracking-tighter">{selected.title}</h2>
                  <div className="prose prose-slate max-w-none mb-12 text-xl text-slate-600 leading-relaxed font-light">{selected.content}</div>

                  <div className="bg-slate-50 p-8 rounded-sm mb-16 border-l-4 border-red-600">
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Expertise Agence</h3>
                    <p className="text-slate-500 text-sm mb-6 font-light italic">Demander une étude personnalisée concernant : {selected.title}</p>
                    <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input required type="email" placeholder="EMAIL PROFESSIONNEL" className="p-3 text-[10px] tracking-widest border border-gray-200 outline-none focus:border-slate-900 bg-white" />
                      <button type="submit" className="bg-slate-900 text-white p-3 text-[10px] font-bold tracking-widest hover:bg-red-600 transition-colors uppercase">Envoyer</button>
                    </form>
                    {formStatus && <p className="mt-4 text-[10px] font-bold text-red-600 uppercase tracking-widest">{formStatus}</p>}
                  </div>

                  {similarArticles.length > 0 && (
                    <div className="border-t pt-12">
                      <h3 className="text-xs font-bold tracking-[0.4em] uppercase mb-10 text-slate-400 text-center italic">Lectures suggérées</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {similarArticles.map(sim => (
                          <div key={sim.id} className="cursor-pointer group flex gap-6 items-center border p-4 hover:bg-gray-50 transition-all" onClick={() => {setSelected(sim); setFormStatus('');}}>
                            <img src={sim.image} className="w-20 h-20 object-cover grayscale group-hover:grayscale-0 transition-all" alt={sim.title} />
                            <div>
                              <h4 className="font-bold text-xs uppercase leading-tight group-hover:text-red-600 mb-1 transition-colors">{sim.title}</h4>
                              <span className="text-[9px] text-slate-400 uppercase">{sim.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <FAQSection />
      <Footer />
    </div>
  );
}
