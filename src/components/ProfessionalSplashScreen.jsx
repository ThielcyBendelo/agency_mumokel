import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. IMPORTATION DU LOGO : Remplacez './logo.png' par le chemin réel de votre image
import logoImage from "../assets/logoM.png";
// Assurez-vous que ce chemin est correct

export default function ProfessionalSplashScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const loadingSteps = useMemo(
    () => [
      { label: 'Initialisation des plans...', duration: 800 },
      { label: 'Chargement des textures...', duration: 1000 },
      { label: "Configuration de la scène...", duration: 600 },
      { label: 'Optimisation du rendu...', duration: 700 },
      { label: 'Bienvenue dans l’agence...', duration: 500 },
    ],
    []
  );

  useEffect(() => {
    let progressInterval;
    let stepTimeout;

    if (currentStep < loadingSteps.length) {
      const step = loadingSteps[currentStep];
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const nextVal = prev + (100 / loadingSteps.length) / (step.duration / 50);
          return Math.min(nextVal, (currentStep + 1) * (100 / loadingSteps.length));
        });
      }, 50);

      stepTimeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, step.duration);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => onComplete && onComplete(), 800);
      }, 300);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep, loadingSteps, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          {/* Grille d'architecte fixe */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
          />

          <div className="relative z-10 flex flex-col items-center">
            
            {/* LOGO TOTALEMENT FIXE */}
            <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
              {/* Cercle de chargement animé */}
              <svg className="absolute w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="85" fill="none" stroke="#f1f5f9" strokeWidth="2" />
                <motion.circle
                  cx="50%" cy="50%" r="85"
                  fill="none" stroke="#E11D48" // Rouge assorti à votre logo
                  strokeWidth="2"
                  strokeDasharray="534"
                  animate={{ strokeDashoffset: 534 - (534 * progress) / 100 }}
                  transition={{ ease: "linear" }}
                />
              </svg>

              {/* L'IMAGE DU LOGO (Sans animation Framer Motion) */}
              <img 
                src={logoImage} 
                alt="Logo Agence" 
                className="w-32 h-32 object-contain"
                style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))" }}
              />
            </div>

            {/* Texte et Barre de progression */}
            <div className="text-center w-64">
              <p className="text-slate-400 font-light tracking-[0.3em] uppercase text-[10px] mb-4 h-4">
                {loadingSteps[currentStep]?.label}
              </p>
              
              <div className="h-[1px] w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-slate-900"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
