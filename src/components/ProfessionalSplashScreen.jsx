import { useState, useEffect, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfessionalSplashScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const loadingSteps = useMemo(
    () => [
      { label: 'Initialisation...', duration: 800 },
      { label: 'Chargement des ressources...', duration: 1000 },
      { label: "Configuration de l'interface...", duration: 600 },
      { label: 'Optimisation des performances...', duration: 700 },
      { label: 'Finalisation...', duration: 500 },
    ],
    []
  );

  useEffect(() => {
    let progressInterval;
    let stepTimeout;

    const runLoadingSequence = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];

        // Animation de la barre de progression
        progressInterval = setInterval(() => {
          setProgress((prev) => {
            const newProgress =
              prev + 100 / loadingSteps.length / (step.duration / 50);
            if (
              newProgress >=
              (currentStep + 1) * (100 / loadingSteps.length)
            ) {
              clearInterval(progressInterval);
              return (currentStep + 1) * (100 / loadingSteps.length);
            }
            return newProgress;
          });
        }, 50);

        // Passer à l'étape suivante
        stepTimeout = setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
        }, step.duration);
      } else {
        // Finir le chargement
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => {
            onComplete && onComplete();
          }, 800);
        }, 300);
      }
    };

    runLoadingSequence();

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep, onComplete, loadingSteps]);

  const logoVariants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100,
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const textVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const progressVariants = {
    initial: { scaleX: 0 },
    animate: {
      scaleX: progress / 100,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const exitVariants = {
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={exitVariants.exit}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background:
              'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)',
          }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, -40, -20],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Geometric patterns */}
            <div className="absolute inset-0 opacity-10">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100"
                  height="100"
                  fill="url(#grid)"
                  className="text-white"
                />
              </svg>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center max-w-md mx-auto px-6">
            {/* Logo */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate={currentStep >= 2 ? 'pulse' : 'animate'}
              className="mb-8"
            >
              <div className="relative mx-auto w-32 h-32 mb-6">
                {/* Logo Background with Tech Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-full shadow-2xl overflow-hidden">
                  {/* Circuit Pattern Background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <rect x="2" y="2" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-400"/>
                          <circle cx="6" cy="6" r="1" fill="currentColor" className="text-purple-400"/>
                          <circle cx="14" cy="14" r="1" fill="currentColor" className="text-pink-400"/>
                          <line x1="6" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="0.5" className="text-blue-400"/>
                          <line x1="14" y1="6" x2="14" y2="14" stroke="currentColor" strokeWidth="0.5" className="text-purple-400"/>
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#circuit)"/>
                    </svg>
                  </div>
                </div>

                {/* Main Logo Icon */}
                <div className="absolute inset-4 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>

                {/* Animated Border Rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-blue-400/50"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <motion.div
                  className="absolute inset-1 rounded-full border border-purple-400/30"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Floating Tech Elements */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5
                  }}
                />
              </div>
            </motion.div>

            {/* Company Name */}
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-white mb-2">Muamokel.Tech</h1>
              <p className="text-xl text-slate-300 font-light">
                Solutions Digitales Innovantes
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            </motion.div>

            {/* Loading Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mb-8"
            >
              <div className="text-slate-400 text-sm mb-4 min-h-[20px]">
                {currentStep < loadingSteps.length && (
                  <motion.span
                    key={currentStep}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {loadingSteps[currentStep]?.label}
                  </motion.span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left"
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                  style={{ scaleX: progress / 100 }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>

              {/* Progress Percentage */}
              <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                <span>Chargement</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </motion.div>

            {/* Features Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: currentStep >= 3 ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center space-x-8 text-slate-400"
            >
              {[
                { icon: '🎨', label: 'Design' },
                { icon: '⚡', label: 'Performance' },
                { icon: '🚀', label: 'Innovation' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 1.5 + index * 0.2,
                    duration: 0.4,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="text-center"
                >
                  <div className="text-2xl mb-1">{feature.icon}</div>
                  <div className="text-xs">{feature.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Loading Completion */}
          {currentStep >= loadingSteps.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-600"
            >
              <div className="text-center text-white">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="text-6xl mb-4"
                >
                  ✓
                </motion.div>
                <h2 className="text-2xl font-bold">Application Prête !</h2>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
