"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { PlayCircle, MapPin, Clock } from "lucide-react";
import { NavBar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import type { Dictionary, Locale } from "@/lib/i18n";

const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

export function EventsPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="fixed inset-x-0 top-0 z-50">
        <NavBar locale={locale} dict={dict} />
      </div>

      <PageHeader
        title="Direct & Événements"
        subtitle="Rejoignez nos cultes en direct et découvrez nos prochains événements pour grandir ensemble dans la foi."
        image="/images/adoration2.jpg"
        badge="Notre Agenda"
      />

      {/* ── EN DIRECT ── */}
      <section className="bg-slate-50 py-24 px-6 lg:px-10 border-b border-slate-100">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-12 text-center">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Culte en Direct
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-[var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Suivez-nous en temps réel
            </motion.h2>
          </motion.div>

          <motion.a 
            href="https://www.youtube.com/@circ-canaan-officiel"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-5xl relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-video group cursor-pointer border border-slate-800 flex items-center justify-center block"
          >
            {/* Placeholder for YouTube/Facebook Live embed */}
            <div className="absolute inset-0 bg-[url('/images/peuple_2.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-red-600/90 flex items-center justify-center text-white mb-6 shadow-[0_0_40px_rgba(220,38,38,0.5)] group-hover:scale-110 group-hover:bg-red-500 transition-all duration-300">
                <PlayCircle className="h-10 w-10 ml-1" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center px-4">Suivre le culte sur notre chaîne YouTube</h3>
              <p className="text-slate-300 font-medium">@circ-canaan-officiel</p>
            </div>
          </motion.a>
        </div>
      </section>

      {/* ── EVENEMENTS ── */}
      <section className="bg-white py-24 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
              <span className="block h-0.5 w-8 bg-amber-400" /> Agenda
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-[var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Nos prochains événements
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Event 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/40 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/60 transition-all"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image src="/images/event_1.jpg" alt="Événement" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 rounded-xl bg-white/95 backdrop-blur-md px-4 py-2 text-center shadow-lg">
                  <div className="text-xs font-bold uppercase text-blue-600">Août</div>
                  <div className="text-2xl font-black text-slate-900 leading-none mt-1">15</div>
                </div>
              </div>
              <div className="p-8 sm:p-10">
                <h3 className="font-[var(--font-heading)] text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  Conférence de Restauration
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Rejoignez-nous pour un moment puissant de restauration spirituelle avec le Prophète Ithiel Dossou. Une opportunité unique de renouveau.
                </p>
                <div className="flex flex-col gap-3 text-sm font-medium text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span>09:00 - 13:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-500" />
                    <span>Siège Principal, CIRC</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Event 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/40 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/60 transition-all"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image src="/images/event_2.jpg" alt="Événement" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 rounded-xl bg-white/95 backdrop-blur-md px-4 py-2 text-center shadow-lg">
                  <div className="text-xs font-bold uppercase text-blue-600">Sept</div>
                  <div className="text-2xl font-black text-slate-900 leading-none mt-1">02</div>
                </div>
              </div>
              <div className="p-8 sm:p-10">
                <h3 className="font-[var(--font-heading)] text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  Formation des Leaders
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Un séminaire intensif pour tous les responsables et ceux appelés au ministère. Équipez-vous pour l'œuvre de Dieu.
                </p>
                <div className="flex flex-col gap-3 text-sm font-medium text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span>18:30 - 21:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-500" />
                    <span>Auditorium Canaan</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
