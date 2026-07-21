"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BookOpen, CalendarDays, CirclePlay, CreditCard,
  Globe, HandHeart, HeartHandshake, Landmark, MapPin, Play,
  ShieldCheck, Users, X, Volume2, Headphones, Download, Pause
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { QuoteStrip } from "@/components/quote-strip";
import { SectionHeading } from "@/components/section-heading";
import { ministries, ministryCopy } from "@/lib/content";
import { getBrand } from "@/lib/brand";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/i18n-pages";
import { useMotionVariants } from "@/lib/motion";

/* Floating orb */
function Orb({ cx, cy, r, color, delay, disabled }: { cx: string; cy: string; r: number; color: string; delay: number; disabled?: boolean }) {
  if (disabled) return null;
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
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
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

type SermonPreview = {
  title: string;
  date: string;
  speaker: string;
  url?: string;
  summary?: string;
  content?: string;
};

export function HomePage({
  locale,
  dict,
  sermonsList,
}: {
  locale: Locale;
  dict: Dictionary;
  sermonsList: SermonPreview[];
}) {
  const hp = getPageCopy(locale).homePage;
  const ap = getPageCopy(locale).aboutPage;
  const pp = getPageCopy(locale).prophetPage;
  const brand = getBrand(locale);
  const common = getPageCopy(locale).common;
  const { reduced } = useMotionVariants();
  const [realSermons, setRealSermons] = useState<SermonPreview[]>(sermonsList);
  const [selectedSermon, setSelectedSermon] = useState<SermonPreview | null>(null);
  
  // Custom audio player state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    fetch(`/api/audio/list?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRealSermons(data);
        }
      })
      .catch((err) => console.error("Error fetching real sermons:", err));
  }, [locale]);

  const handleSermonClick = (sermon: SermonPreview) => {
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
    <main id="main-content" className="min-h-screen bg-white text-slate-900">
      <NavBar locale={locale} dict={dict} />

      {/* ══════════════════════════════════════════
          HERO — Full-screen cinematic
      ══════════════════════════════════════════ */}
      <section id="live" className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        {/* Background photo */}
        <Image src="/images/peuple_2.jpg" alt={hp.heroAlt} fill sizes="100vw" className="object-cover object-center" priority />

        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-circ-navy/88 via-circ-navy/45 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-circ-navy via-transparent to-transparent" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Orb cx="15%" cy="30%" r={280} color="bg-circ-red/15" delay={0} disabled={reduced} />
          <Orb cx="80%" cy="20%" r={200} color="bg-circ-gold/20" delay={1.5} disabled={reduced} />
          <Orb cx="60%" cy="75%" r={240} color="bg-circ-blue-light/15" delay={3} disabled={reduced} />
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
                className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-circ-gold-light"
              >
                {brand.line1}
              </motion.p>

              {/* Main heading - word by word */}
              <h1 className="font-heading text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl xl:text-7xl" style={{ perspective: "600px" }}>
                <RevealWords text={dict.hero.title} className="" />
              </h1>

              {/* Divider line */}
              <motion.div
                className="mt-8 h-0.5 bg-gradient-to-r from-circ-gold via-circ-gold-light to-transparent rounded-full"
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
                <Link href={`/${locale}#about`} className="btn-primary group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    {dict.hero.primaryCta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
                {IS_LIVE ? (
                  <a
                    href="https://www.youtube.com/@circ-canaan-officiel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-circ-red">
                      <CirclePlay className="h-4 w-4" />
                    </span>
                    Rejoindre le Live
                  </a>
                ) : (
                  <Link href={`/${locale}/evenements`} className="btn-secondary">
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
                { n: "20+", label: hp.statsYears, color: "border-circ-gold/30 bg-circ-gold/10" },
                { n: "500+", label: hp.statsMembers, color: "border-circ-blue-light/30 bg-circ-blue-light/10" },
                { n: "5", label: hp.statsCities, color: "border-white/20 bg-white/5" },
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
            {[["20+", hp.statsYears], ["500+", hp.statsMembers], ["5", hp.statsCities]].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-white/15 bg-white/8 px-4 py-4 text-center backdrop-blur-sm">
                <div className="font-heading text-2xl font-extrabold text-circ-gold-light">{n}</div>
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
          <span className="text-[10px] uppercase tracking-widest text-white/70">{hp.discover}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-6 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5"
          >
            <div className="h-2 w-1 rounded-full bg-circ-gold" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── QUI SOMMES NOUS & VISIONNAIRES ── */}
      <section id="about" className="page-section bg-white">
        <div className="page-container">
          <SectionHeading label={ap.whoTitle} title={ap.whoHeading} align="center" className="mb-16 max-w-4xl mx-auto" />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
            <div className="absolute -top-4 -left-4 h-full w-full rounded-3xl border-2 border-circ-gold/30" />
            <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-2xl">
              <Image src="/images/prophets.jpg" alt={ap.prophetsAlt} fill className="object-cover object-top" />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-circ-red px-6 py-4 text-white shadow-xl">
              <div className="font-heading text-3xl font-extrabold">20+</div>
              <div className="text-xs text-blue-200 mt-0.5">{ap.yearsLabel}</div>
            </div>
          </div>
          <div>
            <SectionHeading label={ap.visionariesTitle} title={ap.visionariesNames} subtitle={ap.visionaryP1} />
            <p className="mt-4 text-body-lg">{ap.visionaryP2}</p>
            <Link href={`/${locale}/prophete`} className="mt-8 btn-outline !border-slate-900 !bg-slate-900 !text-white hover:!bg-circ-blue hover:!border-circ-blue">
              {ap.learnMoreProphet} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMME ── */}
      <section className="page-section bg-slate-50">
        <div className="page-container">
          <div className="mb-12 grid lg:grid-cols-2 gap-8 items-end">
            <SectionHeading label={ap.programLabel} title={dict.events.title} />
            <p className="text-body-lg lg:text-right">{dict.events.mainDescription}</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {dict.program.items.map((item, i) => (
                <div
                  key={i}
                  className="surface-card flex items-start gap-4 p-5"
                >
                  <div className="h-9 w-9 shrink-0 rounded-xl bg-circ-blue/10 flex items-center justify-center">
                    <CalendarDays className="h-4 w-4 text-circ-blue" />
                  </div>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-circ-red p-8 text-white">
                <CalendarDays className="h-8 w-8 text-blue-200 mb-4" />
                <h3 className="font-heading text-xl font-bold">{dict.events.mainTitle}</h3>
                <p className="mt-2 text-blue-100 text-sm font-normal">{dict.events.sunday}</p>
                <div className="mt-4 h-px bg-white/20" />
                <p className="mt-4 text-sm text-blue-100 font-normal">{dict.events.welcome}</p>
              </div>
              <div className="rounded-2xl bg-circ-gold p-6">
                <HeartHandshake className="h-6 w-6 text-slate-900 mb-3" />
                <p className="font-bold text-slate-900">{dict.events.study}</p>
              </div>
              <div className="rounded-2xl bg-circ-navy p-6 text-white">
                <Users className="h-6 w-6 text-slate-400 mb-3" />
                <p className="font-bold">{dict.events.youth}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IDENTITE ── */}
      <section className="page-section relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/images/adoration1.jpg')] bg-cover bg-center opacity-[0.04]" />
        <div className="page-container relative">
          <SectionHeading label={hp.identitySection} title={hp.identityTitle} align="center" className="mb-16" />
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, tone: "blue" as const, title: dict.identity.visionTitle, text: dict.identity.visionText },
              { icon: MapPin, tone: "gold" as const, title: dict.identity.missionTitle, text: dict.identity.missionText },
            ].map(({ icon: Icon, tone, title, text }) => (
              <div
                key={title}
                className={`rounded-3xl p-8 ${tone === "blue" ? "bg-circ-red text-white" : "bg-circ-gold"}`}
              >
                <Icon className={`h-10 w-10 mb-6 ${tone === "blue" ? "text-red-200" : "text-slate-900"}`} />
                <h3 className={`font-heading text-2xl font-bold mb-4 ${tone === "gold" ? "text-slate-900" : ""}`}>{title}</h3>
                <p className={`leading-relaxed text-sm font-normal ${tone === "blue" ? "text-red-100" : "text-slate-800"}`}>{text}</p>
              </div>
            ))}
            <div className="rounded-3xl bg-circ-navy p-8 text-white">
              <HandHeart className="h-10 w-10 mb-6 text-circ-gold" />
              <h3 className="font-heading text-2xl font-bold mb-4">{dict.identity.valuesTitle}</h3>
              <ul className="space-y-3">
                {dict.identity.values.map((v) => (
                  <li key={v} className="flex items-center gap-3 text-sm font-normal text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-circ-gold shrink-0" /> {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <QuoteStrip quote={pp.quoteTitle.replace(/^"|"$/g, "")} attribution={pp.quoteText} />

      {/* ── MINISTERES ── */}
      <section id="ministries" className="page-section bg-slate-50">
        <div className="page-container">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading label={hp.ministriesSection} title={dict.ministries.title} />
            <a href={`/${locale}/ministries`} className="inline-flex items-center gap-2 text-sm font-bold text-circ-red hover:gap-3 transition-all shrink-0">
              {hp.viewAllMinistries} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ministries.map((item) => (
              <TiltCard key={item.key} item={item} copy={ministryCopy[locale][item.key]} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERMONS ── */}
      <section id="messages" className="page-section relative overflow-hidden bg-white">
        <div className="page-container relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading label={hp.mediaSection} title={hp.sermonsSection} className="mb-8" />
            <div className="space-y-4">
              {realSermons.slice(0, 2).map((s, i) => (
                <div
                  key={i}
                  onClick={() => handleSermonClick(s)}
                  className="group surface-card flex cursor-pointer items-center gap-4 p-4"
                >
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-circ-gold flex items-center justify-center">
                    <Play className="h-5 w-5 text-slate-900 fill-slate-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{s.title}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{s.speaker} · {s.date}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-circ-gold transition-colors shrink-0" />
                </div>
              ))}
            </div>
            <a href={`/${locale}/media`} className="mt-8 btn-outline">
              <BookOpen className="h-4 w-4" /> {hp.allMessages}
            </a>
          </div>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 aspect-[4/3] shadow-2xl">
            <Image src="/images/adoration2.jpg" alt={hp.worshipAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* ── DON ── */}
      <section className="page-section relative overflow-hidden bg-circ-red">
        <div className="absolute inset-0 bg-[url('/images/adoration1.jpg')] bg-cover bg-center opacity-10" />
        <div className="page-container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-eyebrow mb-4 block text-circ-gold-light">{dict.giving.title}</span>
              <h2 className="font-heading text-4xl font-extrabold text-white lg:text-5xl">{dict.giving.subtitle}</h2>
              <a href={`/${locale}/don`} className="btn-primary mt-8">
                {dict.giving.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-4">
              {[
                { icon: CreditCard, title: dict.giving.cardTitle, desc: dict.giving.cardDescription },
                { icon: Landmark, title: dict.giving.mobileTitle, desc: dict.giving.mobileDescription },
                { icon: ShieldCheck, title: common.secure, desc: hp.secureDesc },
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
      <section id="contact" className="page-section bg-slate-50">
        <div className="page-container grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHeading label={hp.contactLabel} title={hp.joinTitle} subtitle={dict.contact.subtitle} />
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-circ-red/10 flex items-center justify-center"><MapPin className="h-5 w-5 text-circ-red" /></div>
                <span className="text-slate-700">{dict.footer.mapText}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-circ-gold/20 flex items-center justify-center"><CalendarDays className="h-5 w-5 text-circ-gold" /></div>
                <span className="text-slate-700">{dict.events.sunday}</span>
              </div>
            </div>
            <Link href={`/${locale}/contact`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-circ-red px-8 py-3.5 text-sm font-bold text-white hover:bg-circ-red-light transition-colors shadow-lg">
              {hp.joinContact} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl">
            <Image src="/images/ministere.jpg" alt={hp.churchAlt} width={600} height={400} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="font-[var(--font-heading)] text-xl font-bold">{hp.locationTitle}</p>
              <p className="text-sm text-slate-300 mt-1">{hp.welcomeFamily}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer locale={locale} dict={dict} />

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
                aria-label={hp.closeModal}
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
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{hp.sermonModalSummary}</h4>
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">
                      {selectedSermon.summary || selectedSermon.content || hp.sermonSummaryFallback}
                    </p>
                  </div>
                </div>

                {/* Right Side: Player Interface */}
                <div className="md:col-span-5 flex flex-col justify-between rounded-[2rem] border border-white/5 bg-black/40 p-6 backdrop-blur-md">
                  <div className="flex flex-col items-center text-center py-6">
                    <div className="h-16 w-16 mb-4 flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md shadow-inner animate-pulse">
                      <Headphones className="h-8 w-8 text-amber-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">{hp.sermonModalPlayer}</span>
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
                          title={common.downloadAudio}
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
    </main>
  );
}
