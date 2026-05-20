"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { CalendarDays, Globe, HandHeart, HeartHandshake, MapPin, Users, ArrowRight } from "lucide-react";

import { NavBar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import type { Dictionary, Locale } from "@/lib/i18n";

const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.13 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } } };
const fadeLeft: Variants = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" } } };

export function AboutPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="fixed inset-x-0 top-0 z-50">
        <NavBar locale={locale} dict={dict} />
      </div>

      <PageHeader
        title={dict.nav.about}
        subtitle="Découvrez notre histoire, notre vision et notre équipe pastorale."
        image="/images/adoration1.jpg"
        badge="Église Canaan"
      />

      {/* ── QUI SOMMES NOUS & VISIONNAIRES ── */}
      <section className="bg-white px-6 py-24 lg:px-10">
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

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}
              className="relative"
            >
            <div className="absolute -top-5 -left-5 h-full w-full rounded-3xl border-2 border-amber-400/30 rounded-3xl" />
            <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-2xl">
              <Image src="/images/prophets.jpg" alt="Prophète Ithiel & Mykem Dossou" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-top" />
            </div>
            <div className="absolute -bottom-6 right-6 rounded-2xl bg-blue-600 px-6 py-4 text-white shadow-xl">
              <div className="font-[var(--font-heading)] text-3xl font-extrabold">20+</div>
              <div className="text-xs text-blue-200 mt-0.5">Années de ministère</div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
              <span className="block h-0.5 w-8 bg-amber-400" /> Nos Visionnaires
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-[var(--font-heading)] text-4xl font-extrabold text-slate-900 lg:text-5xl">
              Prophète Ithiel <span className="text-blue-500">&amp;</span> Mykem Dossou
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-5 h-1 w-16 bg-amber-400 rounded-full" />
            <motion.p variants={fadeUp} className="mt-6 text-lg leading-relaxed text-slate-600">
              Père fondateur des églises Canaan, le Saint-Esprit l'utilise pour transformer une multitude d'hommes et de femmes en de véritables disciples de Christ.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-lg leading-relaxed text-slate-600">
              Avec une vision claire et un dévouement total, le couple pastoral guide notre communauté vers une relation authentique avec Dieu — impactant nations, familles et sphères d'influence.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Link href={`/${locale}/prophete`} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all hover:scale-105 shadow-md">
                En savoir plus sur le Prophète <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* ── IDENTITE ── */}
      <section id="identite" className="bg-slate-50 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-3 justify-center">
              <span className="block h-0.5 w-8 bg-amber-400" /> Notre Identité
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-[var(--font-heading)] text-4xl font-extrabold text-slate-900">
              Vision, Mission &amp; Valeurs
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="rounded-3xl bg-blue-600 p-8 text-white">
              <Globe className="h-10 w-10 text-blue-200 mb-5" />
              <h3 className="font-[var(--font-heading)] text-2xl font-bold mb-4">{dict.identity.visionTitle}</h3>
              <p className="text-blue-100 text-sm leading-relaxed">{dict.identity.visionText}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl bg-amber-400 p-8">
              <MapPin className="h-10 w-10 text-amber-900 mb-5" />
              <h3 className="font-[var(--font-heading)] text-2xl font-bold mb-4 text-amber-900">{dict.identity.missionTitle}</h3>
              <p className="text-amber-800 text-sm leading-relaxed">{dict.identity.missionText}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl bg-slate-900 p-8 text-white">
              <HandHeart className="h-10 w-10 text-amber-400 mb-5" />
              <h3 className="font-[var(--font-heading)] text-2xl font-bold mb-4">{dict.identity.valuesTitle}</h3>
              <ul className="space-y-3">
                {dict.identity.values.map((v) => (
                  <li key={v} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" /> {v}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMME ── */}
      <section className="bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-12 grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
                <span className="block h-0.5 w-8 bg-amber-400" /> Programme
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-[var(--font-heading)] text-4xl font-extrabold text-slate-900">{dict.events.title}</motion.h2>
            </div>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg">{dict.events.mainDescription}</motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
              {dict.program.items.map((item, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="flex items-start gap-4 rounded-2xl bg-slate-50 border border-slate-100 p-5 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-md transition-all">
                  <div className="h-9 w-9 shrink-0 rounded-xl bg-blue-100 flex items-center justify-center">
                    <CalendarDays className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-2xl bg-blue-600 p-7 text-white">
                <CalendarDays className="h-7 w-7 text-blue-200 mb-4" />
                <h3 className="font-[var(--font-heading)] text-lg font-bold">{dict.events.mainTitle}</h3>
                <p className="mt-1.5 text-blue-100 text-sm">{dict.events.sunday}</p>
                <div className="my-4 h-px bg-white/20" />
                <p className="text-sm text-blue-100">{dict.events.welcome}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-2xl bg-amber-400 p-5">
                <HeartHandshake className="h-6 w-6 text-amber-900 mb-2" />
                <p className="font-bold text-amber-900 text-sm">{dict.events.study}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-2xl bg-slate-800 p-5 text-white">
                <Users className="h-6 w-6 text-slate-400 mb-2" />
                <p className="font-bold text-sm">{dict.events.youth}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
