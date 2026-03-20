import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import RippleGrid from '../components/RippleGrid';

export default function TeamPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Thielcy Bendelo',
      role: 'CEO & Fondateur',
      image: '/IrChrist.jpg',
      description: 'Expert en développement web avec plus de 10 ans d\'expérience. Passionné par l\'innovation et les technologies émergentes.',
      skills: ['Leadership', 'Strategy', 'Innovation'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 2,
      name: 'Emma Muamokel',
      role: 'CTO & Lead Developer',
      image: '/IrEmma.jpg',
      description: 'Architecte logiciel spécialisée en solutions cloud et microservices. Experte en React, Node.js et DevOps.',
      skills: ['React', 'Node.js', 'Cloud'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 3,
      name: 'Merveille Tech',
      role: 'UI/UX Designer',
      image: '/IrMerveille.jpg',
      description: 'Designer créative avec un œil pour les détails. Spécialisée en design d\'interfaces modernes et expériences utilisateur.',
      skills: ['UI Design', 'UX Research', 'Figma'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 4,
      name: 'Christ Innovation',
      role: 'Full Stack Developer',
      image: '/Irbendelo.jpg',
      description: 'Développeur polyvalent maîtrisant le front-end et le back-end. Passionné par les architectures scalables.',
      skills: ['JavaScript', 'Python', 'Docker'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 5,
      name: 'Sarah DevOps',
      role: 'DevOps Engineer',
      image: '/ChargéRP.jpg',
      description: 'Spécialiste en automatisation et déploiement continu. Experte en CI/CD, Kubernetes et monitoring.',
      skills: ['Kubernetes', 'AWS', 'Jenkins'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 6,
      name: 'Alex Mobile',
      role: 'Mobile Developer',
      image: '/logo.png',
      description: 'Développeur mobile cross-platform avec expertise en React Native et Flutter. Passionné par les apps innovantes.',
      skills: ['React Native', 'Flutter', 'iOS'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 7,
      name: 'Lisa Data',
      role: 'Data Scientist',
      image: '/logosite.png',
      description: 'Analyste de données et machine learning. Spécialisée en Python, TensorFlow et analyse prédictive.',
      skills: ['Python', 'TensorFlow', 'SQL'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 8,
      name: 'Marc Security',
      role: 'Cybersecurity Expert',
      image: '/muamokel2.png',
      description: 'Expert en sécurité informatique et protection des données. Certifié en cybersécurité et audit système.',
      skills: ['Penetration Testing', 'OWASP', 'Encryption'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 9,
      name: 'Julie QA',
      role: 'Quality Assurance Lead',
      image: '/logo1.png',
      description: 'Responsable de la qualité logicielle. Experte en tests automatisés et assurance qualité.',
      skills: ['Selenium', 'Jest', 'Cypress'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 10,
      name: 'Pierre Marketing',
      role: 'Digital Marketing Manager',
      image: '/logosites.png',
      description: 'Stratège digital et expert en marketing en ligne. Spécialisé en SEO, SEM et growth hacking.',
      skills: ['SEO', 'Google Ads', 'Analytics'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <NavbarSecured />
      <div className="min-h-screen bg-gradient-to-br from-dark-100 via-dark-200 to-dark-100 pt-24 pb-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-4"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Rencontrez Notre Équipe d'Experts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Des experts passionnés qui transforment vos idées en réalité digitale
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative">
            {/* Main Carousel */}
            <div className="relative h-[600px] md:h-[700px] overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="h-full flex flex-col md:flex-row items-center justify-center gap-8 p-8 bg-gradient-to-br from-dark-200/50 to-dark-300/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl">
                    {/* Photo Section */}
                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="relative w-64 h-64 md:w-80 md:h-80">
                        {/* Animated Border */}
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-xl"
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                        
                        {/* Photo Container */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl group-hover:border-white/30 transition-all duration-300">
                          <img
                            src={teamMembers[currentIndex].image}
                            alt={teamMembers[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Overlay on Hover */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8"
                          >
                            <div className="flex gap-4">
                              {teamMembers[currentIndex].social.linkedin && (
                                <motion.a
                                  href={teamMembers[currentIndex].social.linkedin}
                                  whileHover={{ scale: 1.2, y: -5 }}
                                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                                >
                                  <FaLinkedin className="text-xl" />
                                </motion.a>
                              )}
                              {teamMembers[currentIndex].social.github && (
                                <motion.a
                                  href={teamMembers[currentIndex].social.github}
                                  whileHover={{ scale: 1.2, y: -5 }}
                                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                                >
                                  <FaGithub className="text-xl" />
                                </motion.a>
                              )}
                              {teamMembers[currentIndex].social.twitter && (
                                <motion.a
                                  href={teamMembers[currentIndex].social.twitter}
                                  whileHover={{ scale: 1.2, y: -5 }}
                                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                                >
                                  <FaTwitter className="text-xl" />
                                </motion.a>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Info Section */}
                    <div className="flex-1 text-center md:text-left max-w-xl">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-black text-white mb-2"
                      >
                        {teamMembers[currentIndex].name}
                      </motion.h2>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-purple-400 font-semibold mb-6"
                      >
                        {teamMembers[currentIndex].role}
                      </motion.p>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-300 text-lg leading-relaxed mb-8"
                      >
                        {teamMembers[currentIndex].description}
                      </motion.p>
                      
                      {/* Skills */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap gap-3 justify-center md:justify-start"
                      >
                        {teamMembers[currentIndex].skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30 rounded-full text-sm font-semibold text-purple-300 backdrop-blur-sm"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"
            >
              <FaChevronLeft className="text-2xl" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"
            >
              <FaChevronRight className="text-2xl" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-3 mt-8">
              {teamMembers.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-purple-500 w-8'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Team Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {[
              { number: '10+', label: 'Experts' },
              { number: '50+', label: 'Projets' },
              { number: '30+', label: 'Clients' },
              { number: '5+', label: 'Années' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-dark-200/50 to-dark-300/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-20 max-w-4xl mx-auto px-4"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-black text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Questions Fréquentes
            </motion.h2>

            <div className="space-y-4">
              {[
                {
                  question: "Comment l'équipe collabore-t-elle sur les projets ?",
                  answer: "Notre équipe utilise des méthodologies agiles avec des outils de collaboration modernes comme Slack, Jira et GitHub. Nous organisons des réunions quotidiennes et des revues régulières pour assurer une communication fluide."
                },
                {
                  question: "Quelles sont les spécialités principales de l'équipe ?",
                  answer: "Notre équipe couvre tous les aspects du développement digital : développement web et mobile, design UI/UX, DevOps, cybersécurité, data science et marketing digital. Cette diversité nous permet de proposer des solutions complètes."
                },
                {
                  question: "Comment l'équipe reste-t-elle à jour avec les nouvelles technologies ?",
                  answer: "Nous investissons continuellement dans la formation avec des certifications, conférences et formations en ligne. Chaque membre de l'équipe consacre du temps à l'apprentissage continu et partage ses connaissances avec l'équipe."
                },
                {
                  question: "Quel est le processus de recrutement de nouveaux talents ?",
                  answer: "Nous recherchons des passionnés avec une forte motivation d'apprendre. Le processus inclut des entretiens techniques, des tests pratiques et une évaluation culturelle pour s'assurer du fit avec notre équipe dynamique."
                },
                {
                  question: "Comment l'équipe gère-t-elle la qualité des projets ?",
                  answer: "Nous appliquons des pratiques de qualité rigoureuses avec des tests automatisés, des revues de code systématiques et un processus de QA complet. Notre équipe de QA dédiée assure la qualité avant chaque livraison."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-dark-200/50 to-dark-300/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-lg font-semibold text-white">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-purple-400"
                    >
                      ▼
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4"
                      >
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
