"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function SiteLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const completeLoading = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Progression naturelle et fluide
    let currentProgress = 0;
    let finishTimeout: ReturnType<typeof setTimeout> | null = null;
    const interval = setInterval(() => {
      // Incrémentation aléatoire pour un effet de chargement réel et dynamique
      const increment = Math.floor(Math.random() * 4) + 1;
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        // Court délai de satisfaction une fois à 100% avant de masquer le loader
        finishTimeout = setTimeout(() => {
          completeLoading();
        }, 500);
        return;
      }
      setProgress(currentProgress);
    }, 45);

    // Sécurité : timeout maximum de 6 secondes
    const safetyTimeout = setTimeout(() => {
      completeLoading();
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      if (finishTimeout) clearTimeout(finishTimeout);
    };
  }, [completeLoading]);

  // Calcul du tracé circulaire de chargement
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (!loading) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#070b13] via-[#020408] to-black flex flex-col items-center justify-center overflow-hidden px-6"
          onClick={completeLoading}
        >
          {/* Éléments de fond lumineux subtils */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Conteneur principal de l'animation */}
          <div className="relative flex flex-col items-center justify-center select-none">
            
            {/* SVG Anneau de progression + Logo */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              
              {/* Cercle de progression SVG */}
              <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 160 160">
                {/* Piste arrière-plan */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-slate-800/30"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                {/* Piste de chargement active */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-amber-400"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(245, 158, 11, 0.4))",
                  }}
                  transition={{ ease: "easeOut" }}
                />
              </svg>

              {/* Logo centré avec animations */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.95, 1.02, 0.95],
                  opacity: 1 
                }}
                transition={{
                  scale: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  },
                  opacity: {
                    duration: 0.8
                  }
                }}
                className="relative w-28 h-28 flex items-center justify-center bg-slate-900/60 rounded-full backdrop-blur-sm p-4 border border-white/5 shadow-2xl"
              >
                <Image
                  src="/images/canaan_logo_1779631751389.png"
                  alt="CIRC Canaan Logo"
                  width={90}
                  height={90}
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                  priority
                />
              </motion.div>
            </div>

            {/* Titre et sous-titre de l'église */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center mt-8"
            >
              <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
                Centre International de Réveil
              </h2>
              <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-white font-[var(--font-heading)] mt-1.5 tracking-wider">
                CANNAAN
              </h1>
            </motion.div>

            {/* Pourcentage de progression de chargement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center gap-2"
            >
              <span className="text-[10px] font-mono tracking-widest text-amber-400/80 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.05)]">
                {progress}%
              </span>
            </motion.div>
          </div>

          {/* Bouton de raccourci pour passer l'animation */}
          <button
            onClick={completeLoading}
            className="absolute bottom-10 right-10 text-white/40 text-xs hover:text-white transition-colors uppercase tracking-[0.2em] z-10 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-sm"
          >
            Passer
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
