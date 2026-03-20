import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useEffect } from 'react';
import notificationService from '../services/notificationService';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import RippleGrid from './RippleGrid';
import {
  FaCode,
  FaMobile,
  FaCloud,
  FaRocket,
  FaCheckCircle
} from 'react-icons/fa';

export default function Hero() {
  const [elementRef] = useIntersectionObserver();

  useEffect(() => {
    const timer = setTimeout(() => {
      notificationService.welcome();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { icon: FaCode, text: 'Développement Web & Mobile' },
    { icon: FaCloud, text: 'Solutions Cloud & DevOps' },
    { icon: FaMobile, text: 'Applications Sur Mesure' },
    { icon: FaRocket, text: 'Innovation & Performance' }
  ];

  return (
    <section
      ref={elementRef}
      id="home"
      className="relative min-h-[80vh] flex flex-col justify-start items-center text-center px-4 pt-32 pb-16 overflow-hidden"
    >
      {/* Ripple Grid Background */}
      <div className="absolute inset-0 z-0">
        <RippleGrid />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-100/90 to-dark-100/70 z-10" />

      {/* Particules flottantes animées - Optimized count */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400/60 to-purple-500/60 rounded-full"
            animate={{
              x: [0, Math.random() * 60 - 30],
              y: [0, Math.random() * 60 - 30],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 1.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div
        className="relative z-20 w-full max-w-7xl mx-auto px-4"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >

        {/* Sous-titre - Full Width */}
        <AnimatedSection variant="slideUp" delay={0.4}>
          <motion.h2
            className="text-2xl md:text-4xl font-bold text-gray-300 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Agence de{' '}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Développement Informatique
            </motion.span>
          </motion.h2>
        </AnimatedSection>



        {/* Description - Enhanced Visibility & Animation */}
        <AnimatedSection variant="fadeIn" delay={0.8}>
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {/* Animated Background Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main Description Container */}
            <motion.div
              className="relative bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 30px rgba(59, 130, 246, 0.2)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              initial={{ boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)" }}
              animate={{
                boxShadow: [
                  "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
                  "0 15px 35px -5px rgba(0, 0, 0, 0.35), 0 0 20px rgba(59, 130, 246, 0.1)",
                  "0 10px 30px -5px rgba(0, 0, 0, 0.3)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30"
              />

              {/* Content */}
              <div className="relative z-10 text-center" style={{ display: 'flex', justifyContent: 'start', textAlign: 'center' }}>
                <motion.p
                  className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-4"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.1)",
                      "0 0 20px rgba(255,255,255,0.2)",
                      "0 0 10px rgba(255,255,255,0.1)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Transformez vos idées en{' '}
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-bold"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    solutions digitales innovantes
                  </motion.span>
                </motion.p>

                <motion.p
                  className="text-lg md:text-xl text-slate-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  Nous créons des applications web et mobile sur mesure,
                  des systèmes cloud performants et des expériences utilisateur exceptionnelles.
                </motion.p>


              </div>
            </motion.div>
          </motion.div>
        </AnimatedSection>

        {/* Features Grid - Full Width */}
        <AnimatedSection variant="fadeIn" delay={1.0}>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative bg-dark-200/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 w-full max-w-xs"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 25px rgba(139, 92, 246, 0.2)"
                }}
                initial={{ boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)" }}
                animate={{
                  boxShadow: [
                    "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
                    "0 8px 25px -5px rgba(139, 92, 246, 0.15)",
                    "0 4px 15px -3px rgba(0, 0, 0, 0.1)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <feature.icon className="text-3xl text-purple-400 mb-2 group-hover:text-purple-300 transition-colors" />
                  <p className="text-xs md:text-sm text-gray-300 font-medium">
                    {feature.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>




      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-purple-400 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
