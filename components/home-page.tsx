"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight, BookOpen, CalendarDays, CirclePlay, CreditCard,
  Globe, HandHeart, HeartHandshake, Landmark, MapPin, Play,
  ShieldCheck, Users, X, Volume2, Headphones, Download, Pause
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

import { NavBar } from "@/components/navbar";
import { ministries, ministryCopy } from "@/lib/content";
import type { Dictionary, Locale } from "@/lib/i18n";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
};

/* Floating orb */
function Orb({ cx, cy, r, color, delay }: { cx: string; cy: string; r: number; color: string; delay: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${color}`}
      style={{ left: cx, top: cy, width: r * 2, height: r * 2, translateX: "-50%", translateY: "-50%" }}
      animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* Word-by-word reveal */
function RevealWords({ text, className }: { text: string; className: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 28, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.55, delay: 0.5 + i * 0.07, ease: "easeOut" }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

function TiltCard({ item, copy }: { item: (typeof ministries)[number]; copy: { title: string; description: string } }) {
  const Icon = item.key === "kids" ? Users : item.key === "youth" ? HeartHandshake : item.key === "couples" ? HandHeart : Globe;

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative h-80 overflow-hidden rounded-2xl shadow-xl cursor-pointer"
    >
      <Image src={item.image} alt={copy.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="mb-3 h-10 w-10 rounded-full bg-amber-400 flex items-center justify-center">
          <Icon className="h-5 w-5 text-slate-900" />
        </div>
        <h3 className="font-[var(--font-heading)] text-xl font-bold text-white">{copy.title}</h3>
        <p className="mt-1 text-sm text-slate-300 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">{copy.description}</p>
      </div>
    </motion.div>
  );
}

// ── Set IS_LIVE to true when a YouTube Live is in progress ──
const IS_LIVE = false;

export function HomePage({
  locale,
  dict,
  sermonsList,
}: {
  locale: Locale;
  dict: Dictionary;
  sermonsList: Array<{ title: string; date: string; speaker: string; url?: string; summary?: string }>;
}) {
  const [realSermons, setRealSermons] = useState<any[]>(sermonsList);
  const [selectedSermon, setSelectedSermon] = useState<any | null>(null);
  
  // Custom audio player state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    fetch("/api/audio/list")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRealSermons(data);
        }
      })
      .catch((err) => console.error("Error fetching real sermons:", err));
  }, []);

  const handleSermonClick = (sermon: any) => {
    setSelectedSermon(sermon);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error("Playback error:", e));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavBar locale={locale} dict={dict} />

      {/* ══════════════════════════════════════════
          HERO — Full-screen cinematic
      ══════════════════════════════════════════ */}
      <section id="live" className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        {/* Background photo */}
        <Image src="/images/peuple_2.jpg" alt="Centre International de Réveil Canaan" fill sizes="100vw" className="object-cover object-center" priority />

        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-950/60 to-slate-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        {/* Ambient light orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Orb cx="15%"  cy="30%"  r={280} color="bg-blue-600/30"  delay={0} />
          <Orb cx="80%"  cy="20%"  r={200} color="bg-amber-400/20" delay={1.5} />
          <Orb cx="60%"  cy="75%"  r={240} color="bg-blue-800/25"  delay={3} />
        </div>

        {/* Diagonal grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-36 pb-20 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              {/* Church name pill */}
              {IS_LIVE && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8 inline-flex items-center gap-3"
                >
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50"
                  />
                  <span className="rounded-full border border-red-400/40 bg-red-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-red-200 backdrop-blur-md">
                    🔴 {dict.hero.badge}
                  </span>
                </motion.div>
              )}

              {/* Church full name */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-amber-400"
              >
                Centre International de Réveil
              </motion.p>

              {/* Main heading - word by word */}
              <h1 className="font-[var(--font-heading)] text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl xl:text-7xl" style={{ perspective: "600px" }}>
                <RevealWords text={dict.hero.title} className="" />
              </h1>

              {/* Divider line */}
              <motion.div
                className="mt-8 h-0.5 bg-gradient-to-r from-amber-400 via-amber-300 to-transparent rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
                style={{ width: "min(420px, 100%)" }}
              />

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-blue-50"
              >
                {dict.hero.subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link
                  href={`/${locale}#about`}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-amber-400 px-8 py-4 text-sm font-bold text-slate-900 shadow-xl shadow-amber-400/30 transition-all hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {dict.hero.primaryCta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-amber-300 transition-transform duration-300 group-hover:translate-x-0" />
                </Link>
                {IS_LIVE ? (
                  <a
                    href="https://www.youtube.com/@circ-canaan-officiel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border border-red-400/40 bg-red-500/20 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-red-500/30"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
                      <CirclePlay className="h-4 w-4" />
                    </span>
                    Rejoindre le Live
                  </a>
                ) : (
                  <Link
                    href={`/${locale}/evenements`}
                    className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/15"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <CirclePlay className="h-4 w-4" />
                    </span>
                    {dict.hero.secondaryCta}
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Right: Stats column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1.5 }}
              className="hidden lg:flex flex-col gap-4"
            >
              {[
                { n: "20+", label: "Ans de ministère", color: "border-amber-400/30 bg-amber-400/10" },
                { n: "500+", label: "Membres actifs",   color: "border-blue-400/30 bg-blue-400/10" },
                { n: "5",   label: "Villes impactées",  color: "border-white/20 bg-white/5" },
              ].map(({ n, label, color }) => (
                <div key={label} className={`rounded-2xl border ${color} px-7 py-5 backdrop-blur-md text-center min-w-[140px]`}>
                  <div className="font-[var(--font-heading)] text-3xl font-extrabold text-white">{n}</div>
                  <div className="mt-1 text-xs font-medium text-blue-200/80">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mt-14 grid grid-cols-3 gap-3 lg:hidden"
          >
            {[["20+", "Ans"], ["500+", "Membres"], ["5", "Villes"]].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-white/15 bg-white/8 px-4 py-4 text-center backdrop-blur-sm">
                <div className="font-[var(--font-heading)] text-2xl font-extrabold text-amber-400">{n}</div>
                <div className="mt-0.5 text-xs text-blue-200/70">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <span className="text-[10px] uppercase tracking-widest text-white/70">Découvrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-6 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5"
          >
            <div className="h-2 w-1 rounded-full bg-amber-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── QUI SOMMES NOUS & VISIONNAIRES ── */}
      <section id="about" className="bg-white py-24 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          
          {/* Qui sommes-nous ? */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }}
            className="mb-20 max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-6">
              <span className="block h-0.5 w-8 bg-amber-400" /> Qui sommes-nous ? <span className="block h-0.5 w-8 bg-amber-400" />
            </div>
            <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-relaxed">
              Le Centre International de Réveil - <span className="text-blue-600">CANAAN</span> est un ministère d'évangélisation et de formation des leaders pour la conquête des nations, créé en <span className="text-amber-500">2003</span> sous l'inspiration divine par <span className="text-blue-600">Ithiel DOSSOU</span>.
            </h2>
          </motion.div>

          {/* Visionnaires Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <div className="absolute -top-4 -left-4 h-full w-full rounded-3xl border-2 border-amber-400/30" />
            <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-2xl">
              <Image src="/images/prophets.jpg" alt="Prophète Ithiel & Mykem Dossou" fill className="object-cover object-top" />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-blue-600 px-6 py-4 text-white shadow-xl">
              <div className="font-[var(--font-heading)] text-3xl font-extrabold">20+</div>
              <div className="text-xs text-blue-200 mt-0.5">ans de ministère</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <span className="section-label">Nos Visionnaires</span>
            <h2 className="font-[var(--font-heading)] text-4xl font-extrabold text-slate-900 lg:text-5xl">
              Prophète Ithiel <span className="text-blue-500">&amp;</span> Mykem Dossou
            </h2>
            <div className="mt-4 h-1 w-16 bg-amber-400 rounded-full" />
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Père fondateur des églises Canaan, le Saint-Esprit l'utilise pour transformer une multitude d'hommes et de femmes en de véritables disciples de Christ.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Avec une vision claire et un dévouement total, le couple pastoral guide notre communauté vers une relation authentique avec Dieu — impactant nations, familles et sphères d'influence.
            </p>
            <Link href={`/${locale}/prophete`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-600 transition-all hover:scale-105">
              En savoir plus sur le Prophète <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMME ── */}
      <section className="bg-slate-50 py-24 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-12 grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <motion.span variants={fadeUp} className="section-label">Programme</motion.span>
              <motion.h2 variants={fadeUp} className="font-[var(--font-heading)] text-4xl font-extrabold text-slate-900">{dict.events.title}</motion.h2>
            </div>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg">{dict.events.mainDescription}</motion.p>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {dict.program.items.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                    <CalendarDays className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-col gap-4">
              <motion.div variants={fadeUp} className="rounded-2xl bg-blue-600 p-8 text-white">
                <CalendarDays className="h-8 w-8 text-blue-200 mb-4" />
                <h3 className="font-[var(--font-heading)] text-xl font-bold">{dict.events.mainTitle}</h3>
                <p className="mt-2 text-blue-100 text-sm">{dict.events.sunday}</p>
                <div className="mt-4 h-px bg-white/20" />
                <p className="mt-4 text-sm text-blue-100">{dict.events.welcome}</p>
              </motion.div>
              <motion.div variants={fadeUp} className="rounded-2xl bg-amber-400 p-6">
                <HeartHandshake className="h-6 w-6 text-amber-900 mb-3" />
                <p className="font-bold text-amber-900">{dict.events.study}</p>
              </motion.div>
              <motion.div variants={fadeUp} className="rounded-2xl bg-slate-900 p-6 text-white">
                <Users className="h-6 w-6 text-slate-400 mb-3" />
                <p className="font-bold">{dict.events.youth}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── IDENTITE ── */}
      <section className="relative overflow-hidden bg-white py-24 px-6 lg:px-10">
        <div className="absolute inset-0 bg-[url('/images/adoration1.jpg')] bg-cover bg-center opacity-5" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.span variants={fadeUp} className="section-label mx-auto">Notre Identité</motion.span>
            <motion.h2 variants={fadeUp} className="font-[var(--font-heading)] text-4xl font-extrabold text-slate-900">Vision, Mission &amp; Valeurs</motion.h2>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, color: "blue", title: dict.identity.visionTitle, text: dict.identity.visionText },
              { icon: MapPin, color: "amber", title: dict.identity.missionTitle, text: dict.identity.missionText },
            ].map(({ icon: Icon, color, title, text }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`rounded-3xl p-8 ${color === "blue" ? "bg-blue-600 text-white" : "bg-amber-400"}`}>
                <Icon className={`h-10 w-10 mb-6 ${color === "blue" ? "text-blue-200" : "text-amber-900"}`} />
                <h3 className={`font-[var(--font-heading)] text-2xl font-bold mb-4 ${color === "amber" ? "text-amber-900" : ""}`}>{title}</h3>
                <p className={`leading-relaxed text-sm ${color === "blue" ? "text-blue-100" : "text-amber-800"}`}>{text}</p>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-3xl bg-slate-900 p-8 text-white">
              <HandHeart className="h-10 w-10 mb-6 text-amber-400" />
              <h3 className="font-[var(--font-heading)] text-2xl font-bold mb-4">{dict.identity.valuesTitle}</h3>
              <ul className="space-y-3">
                {dict.identity.values.map((v) => (
                  <li key={v} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" /> {v}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MINISTERES ── */}
      <section id="ministries" className="bg-slate-50 py-24 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <motion.span variants={fadeUp} className="section-label">Ministères</motion.span>
              <motion.h2 variants={fadeUp} className="font-[var(--font-heading)] text-4xl font-extrabold text-slate-900">{dict.ministries.title}</motion.h2>
            </div>
            <motion.a variants={fadeUp} href={`/${locale}/ministries`} className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all">
              Voir tous les ministères <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: "1000px" }}>
            {ministries.map((item) => (
              <motion.div key={item.key} variants={fadeUp}>
                <TiltCard item={item} copy={ministryCopy[locale][item.key]} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERMONS ── */}
      <section id="resources" className="relative overflow-hidden bg-slate-50 py-24 px-6 lg:px-10">
        <div className="relative z-10 mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeUp} className="section-label">Ressources</motion.span>
            <motion.h2 variants={fadeUp} className="font-[var(--font-heading)] text-4xl font-extrabold text-slate-900 mb-8">Derniers Messages</motion.h2>
            <div className="space-y-4">
              {realSermons.slice(0, 2).map((s, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUp} 
                  onClick={() => handleSermonClick(s)}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-amber-400 flex items-center justify-center group-hover:bg-amber-300 transition-colors">
                    <Play className="h-5 w-5 text-slate-900 fill-slate-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{s.title}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{s.speaker} · {s.date}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-400 transition-colors shrink-0 animate-pulse" />
                </motion.div>
              ))}
            </div>
            <motion.a 
              variants={fadeUp} 
              href={`/${locale}/media`} 
              className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all"
            >
              <BookOpen className="h-4 w-4" /> Toutes les ressources
            </motion.a>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 aspect-[4/3] shadow-2xl">
            <Image src="/images/adoration2.jpg" alt="Adoration Canaan" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ── DON ── */}
      <section className="relative overflow-hidden bg-blue-600 py-24 px-6 lg:px-10">
        <div className="absolute inset-0 bg-[url('/images/adoration1.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-widest text-amber-300 mb-4">{dict.giving.title}</motion.span>
              <motion.h2 variants={fadeUp} className="font-[var(--font-heading)] text-4xl font-extrabold text-white lg:text-5xl">{dict.giving.subtitle}</motion.h2>
              <motion.a variants={fadeUp} href={`/${locale}/don`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 text-sm font-bold text-slate-900 hover:bg-amber-300 transition-all hover:scale-105 shadow-lg">
                {dict.giving.cta} <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
            <div className="grid gap-4">
              {[
                { icon: CreditCard, title: dict.giving.cardTitle, desc: dict.giving.cardDescription },
                { icon: Landmark, title: dict.giving.mobileTitle, desc: dict.giving.mobileDescription },
                { icon: ShieldCheck, title: "100% Sécurisé", desc: "Transactions cryptées et protégées" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-center gap-4 rounded-2xl bg-white/10 backdrop-blur-sm p-5 border border-white/10">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="text-xs text-blue-200 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-slate-50 py-24 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeUp} className="section-label">Contact</motion.span>
            <motion.h2 variants={fadeUp} className="font-[var(--font-heading)] text-4xl font-extrabold text-slate-900">Rejoignez-nous</motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-slate-600">{dict.contact.subtitle}</motion.p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"><MapPin className="h-5 w-5 text-blue-600" /></div>
                <span className="text-slate-700">{dict.footer.mapText}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center"><CalendarDays className="h-5 w-5 text-amber-600" /></div>
                <span className="text-slate-700">{dict.events.sunday}</span>
              </div>
            </div>
            <Link href={`/${locale}/contact`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white hover:bg-blue-700 transition-all hover:scale-105 shadow-lg">
              Nous Contacter <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl">
            <Image src="/images/ministere.jpg" alt="Église Canaan" width={600} height={400} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="font-[var(--font-heading)] text-xl font-bold">Canaan — Cotonou</p>
              <p className="text-sm text-slate-300 mt-1">Bienvenue dans notre famille</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-white px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Image src="/images/logo.png" alt="Canaan" width={140} height={48} className="h-10 w-auto object-contain" />
            <p className="mt-4 text-slate-400 text-sm max-w-xs">{dict.footer.churchTagline}</p>
          </div>
          <div>
            <h4 className="font-bold text-amber-400 mb-4">{dict.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {[dict.nav.about, dict.nav.ministries, dict.nav.resources, dict.nav.contact].map((l) => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-amber-400 mb-4">{dict.footer.findUs}</h4>
            <p className="text-sm text-slate-400 flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" />{dict.footer.mapText}</p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Église Canaan. Tous droits réservés.
        </div>
      </footer>

      {/* Sermon Player Modal */}
      <AnimatePresence>
        {selectedSermon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedSermon(null);
              setIsPlaying(false);
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/90 text-white shadow-2xl backdrop-blur-xl"
            >
              {/* Decorative glows */}
              <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedSermon(null);
                  setIsPlaying(false);
                }}
                className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid md:grid-cols-12 gap-8 p-8 md:p-10">
                {/* Left Side: Summary and Info */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-blue-200">
                      {selectedSermon.date}
                    </span>
                    <h3 className="mt-4 font-[var(--font-heading)] text-2xl font-extrabold sm:text-3xl tracking-tight text-white leading-tight">
                      {selectedSermon.title}
                    </h3>
                    <p className="mt-2 text-md font-medium text-amber-400">
                      {selectedSermon.speaker}
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto max-h-[220px] pr-2 custom-scrollbar">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Résumé du message</h4>
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">
                      {selectedSermon.summary || selectedSermon.content || "Le résumé détaillé de ce message sera disponible prochainement."}
                    </p>
                  </div>
                </div>

                {/* Right Side: Player Interface */}
                <div className="md:col-span-5 flex flex-col justify-between rounded-[2rem] border border-white/5 bg-black/40 p-6 backdrop-blur-md">
                  <div className="flex flex-col items-center text-center py-6">
                    <div className="h-16 w-16 mb-4 flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md shadow-inner animate-pulse">
                      <Headphones className="h-8 w-8 text-amber-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Lecteur Média</span>
                  </div>

                  {selectedSermon.url ? (
                    <div className="space-y-6">
                      {/* Audio Tag */}
                      <audio
                        ref={audioRef}
                        src={selectedSermon.url}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => setIsPlaying(false)}
                      />

                      {/* Playback Controls & Progress Bar */}
                      <div className="space-y-3">
                        <input
                          type="range"
                          min={0}
                          max={duration || 100}
                          value={currentTime}
                          onChange={handleSeek}
                          className="w-full h-1.5 rounded-full bg-white/10 appearance-none cursor-pointer accent-amber-400 focus:outline-none"
                        />
                        <div className="flex justify-between text-xs font-semibold text-slate-400">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>

                      {/* Big Play Button */}
                      <div className="flex items-center justify-center gap-6">
                        <button
                          onClick={handlePlayPause}
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 text-slate-900 shadow-xl shadow-amber-400/20 transition-all hover:scale-105 hover:bg-amber-300 active:scale-95"
                          aria-label={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="ml-1 h-6 w-6 fill-slate-900" />}
                        </button>

                        <a
                          href={selectedSermon.url}
                          download
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:scale-105 hover:bg-white/10 hover:text-white"
                          title="Télécharger l'audio"
                        >
                          <Download className="h-5 w-5" />
                        </a>
                      </div>

                      {/* Volume Slider */}
                      <div className="flex items-center gap-3 pt-2">
                        <Volume2 className="h-4 w-4 text-slate-400 shrink-0" />
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-full h-1 rounded-full bg-white/10 appearance-none cursor-pointer accent-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
                      <p className="text-xs text-amber-200/80">L'enregistrement audio de cette prédication sera téléversé très prochainement. Suivez nos programmes hebdomadaires.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
