"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { LOGO_SRC } from "@/lib/brand";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/i18n-pages";

const INTRO_KEY = "canaan_intro_seen";

function readIntroSeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return true;
  }
}

function markIntroSeen(): void {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    // Storage blocked — still dismiss the loader.
  }
}

function subscribeIntro() {
  return () => {};
}

export function SiteLoader() {
  const pathname = usePathname() ?? "";
  const segment = pathname.split("/")[1] ?? "";
  const locale = isLocale(segment) ? segment : defaultLocale;
  const pages = getPageCopy(locale);

  const introSeen = useSyncExternalStore(subscribeIntro, readIntroSeen, () => true);
  const [dismissed, setDismissed] = useState(false);
  const [progress, setProgress] = useState(0);
  const finishedRef = useRef(false);

  const loading = !introSeen && !dismissed;

  const completeLoading = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    markIntroSeen();
    setDismissed(true);
  }, []);

  useEffect(() => {
    if (!loading) return;

    finishedRef.current = false;
    let currentProgress = 0;
    let finishTimeout: ReturnType<typeof setTimeout> | null = null;

    const interval = setInterval(() => {
      currentProgress = Math.min(100, currentProgress + Math.floor(Math.random() * 4) + 1);
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        finishTimeout = setTimeout(completeLoading, 400);
      }
    }, 35);

    const safetyTimeout = setTimeout(completeLoading, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      if (finishTimeout) clearTimeout(finishTimeout);
    };
  }, [loading, completeLoading]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (!loading) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#070b13] via-[#020408] to-black flex flex-col items-center justify-center overflow-hidden px-6"
        onClick={completeLoading}
        role="dialog"
        aria-modal="true"
        aria-label={pages.common.loading}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 160 160" aria-hidden="true">
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-800/30"
                strokeWidth="2.5"
                fill="transparent"
              />
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
                style={{ filter: "drop-shadow(0 0 6px rgba(245, 158, 11, 0.4))" }}
                transition={{ ease: "easeOut" }}
              />
            </svg>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.95, 1.02, 0.95], opacity: 1 }}
              transition={{
                scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                opacity: { duration: 0.8 },
              }}
              className="relative w-28 h-28 flex items-center justify-center bg-slate-900/60 rounded-full backdrop-blur-sm p-4 border border-white/5 shadow-2xl"
            >
              <Image
                src={LOGO_SRC}
                alt="CIRC Canaan Logo"
                width={90}
                height={90}
                className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                priority
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              {pages.loader.tagline}
            </p>
            <p
              aria-hidden="true"
              className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-white font-[var(--font-heading)] mt-1.5 tracking-wider"
            >
              CANNAAN
            </p>
          </motion.div>

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

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            completeLoading();
          }}
          className="absolute bottom-10 right-10 text-white/40 text-xs hover:text-white transition-colors uppercase tracking-[0.2em] z-10 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-sm"
        >
          {pages.loader.skip}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
