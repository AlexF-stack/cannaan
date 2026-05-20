"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Download, Headphones, Pause, Play, X } from "lucide-react";

import { CountdownTimer } from "@/components/countdown-timer";
import { NavBar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import SummaryEditorModal from "@/components/summary-editor-modal";
import { audioTeachings, type AudioTeaching } from "@/lib/audio";
import type { Dictionary, Locale } from "@/lib/i18n";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const galleryImages = [
  { src: "/images/adoration1.jpg", alt: "Adoration" },
  { src: "/images/adoration2.jpg", alt: "Culte" },
  { src: "/images/peuple.jpg", alt: "Peuple de Dieu" },
  { src: "/images/peuple_2.jpg", alt: "Celebration" },
  { src: "/images/peuple_3.jpg", alt: "Moment de priere" },
  { src: "/images/stade_rempli.jpg", alt: "Croisade" },
  { src: "/images/guerison.jpg", alt: "Guerison" },
  { src: "/images/priere.jpg", alt: "Priere" },
];

export function MediaPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentAudio, setCurrentAudio] = useState<AudioTeaching>(audioTeachings[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [summary, setSummary] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [launchDate, setLaunchDate] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`/api/audio/${currentAudio.id}/summary`);
        const data = (await res.json()) as { summary?: string };
        setSummary(res.ok ? data.summary ?? "" : "");
      } catch {
        setSummary("");
      }
    };

    fetchSummary();
  }, [currentAudio.id]);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((res) => res.json())
      .then((data: { authenticated?: boolean }) => setIsAdmin(Boolean(data.authenticated)))
      .catch(() => setIsAdmin(false));

    fetch("/api/countdown")
      .then((res) => res.json())
      .then((data: { launchDate?: string }) => setLaunchDate(data.launchDate ?? null))
      .catch(() => setLaunchDate(null));
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.play();
    setIsPlaying(true);
  };

  const selectAudio = (podcast: AudioTeaching) => {
    setCurrentAudio(podcast);
    setIsPlaying(false);
  };

  const saveSummary = async (newText: string) => {
    const res = await fetch(`/api/audio/${currentAudio.id}/summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary: newText }),
    });

    if (res.ok) {
      setSummary(newText);
      setIsEditing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="fixed inset-x-0 top-0 z-50">
        <NavBar locale={locale} dict={dict} />
      </div>

      <PageHeader
        title="Mediatheque & Podcasts"
        subtitle="Revivez nos moments forts en images et ecoutez les predications pour nourrir votre foi au quotidien."
        image="/images/adoration1.jpg"
        badge="Ressources"
      />

      <section className="border-b border-slate-100 bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12"
          >
            <motion.span
              variants={fadeUp}
              className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600"
            >
              <span className="block h-0.5 w-8 bg-amber-400" /> Enseignements Audio
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-[var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl"
            >
              Podcasts & Predications
            </motion.h2>
          </motion.div>

          {launchDate && new Date(launchDate) > new Date() ? (
            <div className="mb-6 text-center">
              <CountdownTimer targetDate={launchDate} />
            </div>
          ) : null}

          <div className="grid items-start gap-12 lg:grid-cols-12">
            <motion.div
              key={currentAudio.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 lg:col-span-5"
            >
              <div className="rounded-[2rem] border border-slate-100 bg-slate-50 p-8 shadow-sm">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h4 className="text-2xl font-bold text-slate-900">Resume</h4>
                  {isAdmin ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-slate-900 transition hover:bg-amber-300"
                    >
                      Modifier
                    </button>
                  ) : null}
                </div>
                <p className="whitespace-pre-line text-lg leading-relaxed text-slate-600">
                  {summary || "Aucun resume disponible pour cet enseignement."}
                </p>
              </div>
            </motion.div>

            <div className="space-y-8 lg:col-span-7">
              <motion.div
                key={`player-${currentAudio.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative flex min-h-[400px] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-2xl sm:p-10"
              >
                <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-amber-500/20 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md">
                    <Headphones className="h-7 w-7 text-amber-400" />
                  </div>
                  <div className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-200">
                    {currentAudio.date}
                  </div>
                  <h3 className="mb-3 text-3xl font-bold sm:text-4xl">{currentAudio.title}</h3>
                  <p className="mb-12 text-lg font-medium text-slate-400">{currentAudio.prophet}</p>
                </div>

                <div className="relative z-10 flex items-center gap-6 rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-md">
                  <button
                    onClick={togglePlay}
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/20 transition-all hover:scale-110 hover:bg-amber-300"
                    aria-label={isPlaying ? "Pause" : "Lecture"}
                  >
                    {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="ml-1 h-7 w-7" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full bg-amber-400 transition-all duration-500 ${
                          isPlaying ? "w-1/3 animate-pulse" : "w-0"
                        }`}
                      />
                    </div>
                    <div className="mt-3 flex justify-between text-xs font-bold tracking-tight text-slate-400">
                      <span>{isPlaying ? "LECTURE EN COURS..." : "SELECTIONNE"}</span>
                      <span>00:00 / --:--</span>
                    </div>
                  </div>
                  <a
                    href={currentAudio.src}
                    download
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/5 transition-colors hover:bg-white/10"
                    aria-label="Telecharger"
                  >
                    <Download className="h-5 w-5" />
                  </a>
                </div>

                <audio
                  key={currentAudio.id}
                  ref={audioRef}
                  src={currentAudio.src}
                  onEnded={() => setIsPlaying(false)}
                />
              </motion.div>

              <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
                <h4 className="mb-6 text-xl font-bold text-slate-900">Enseignements recents</h4>
                <div className="space-y-4">
                  {audioTeachings.map((podcast, index) => (
                    <motion.button
                      key={podcast.id}
                      type="button"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => selectAudio(podcast)}
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                        currentAudio.id === podcast.id
                          ? "border-blue-200 bg-blue-50"
                          : "border-transparent bg-white hover:border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all ${
                          currentAudio.id === podcast.id
                            ? "bg-blue-600 text-white"
                            : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                        }`}
                      >
                        <Play className="ml-1 h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          className={`font-bold transition-colors ${
                            currentAudio.id === podcast.id
                              ? "text-blue-700"
                              : "text-slate-900 group-hover:text-blue-600"
                          }`}
                        >
                          {podcast.title}
                        </h4>
                        <div className="mt-1 flex gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <span>{podcast.date}</span>
                          <span>-</span>
                          <span>{podcast.duration}</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                <Link
                  href={`/${locale}/enseignements`}
                  className="mx-auto mt-8 flex w-fit items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  Acceder a toute la bibliotheque <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12 text-center"
          >
            <motion.span
              variants={fadeUp}
              className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600"
            >
              <span className="block h-0.5 w-8 bg-amber-400" /> Galerie
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-[var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl"
            >
              La vie de l'eglise en images
            </motion.h2>
          </motion.div>
          <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
            {galleryImages.map((img, index) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-all hover:shadow-xl"
                onClick={() => setSelectedImage(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={800}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/0 transition-colors duration-300 group-hover:bg-slate-900/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-4 sm:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute right-6 top-6 text-white/50 transition-colors hover:text-white"
              onClick={() => setSelectedImage(null)}
              aria-label="Fermer"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative h-full max-h-[85vh] w-full max-w-6xl overflow-hidden rounded-lg"
              onClick={(event) => event.stopPropagation()}
            >
              <Image src={selectedImage} alt="Galerie" fill className="object-contain" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SummaryEditorModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        currentSummary={summary}
        onSave={saveSummary}
      />
    </main>
  );
}
