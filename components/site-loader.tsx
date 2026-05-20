"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SiteLoader() {
  const [loading, setLoading] = useState(true);

  const completeLoading = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Safety fallback in case video fails to load or play
    const timeout = setTimeout(() => {
      completeLoading();
    }, 8000); // Max 8 seconds loading

    return () => clearTimeout(timeout);
  }, [completeLoading]);

  if (!loading) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center overflow-hidden"
          onClick={completeLoading}
        >
          <video
            src="/images/loading_video.mp4"
            autoPlay
            muted
            playsInline
            onEnded={completeLoading}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/20" />
          
          <button 
            onClick={completeLoading}
            className="absolute bottom-10 right-10 text-white/50 text-sm hover:text-white transition-colors uppercase tracking-widest z-10"
          >
            Passer
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
