"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, BookOpen, Heart, Award, Star, Globe } from "lucide-react";
import Link from "next/link";

import { NavBar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import type { Dictionary, Locale } from "@/lib/i18n";

const fadeUp: Variants = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };

export function ProphetPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="fixed inset-x-0 top-0 z-50">
        <NavBar locale={locale} dict={dict} />
      </div>

      <PageHeader
        title="Prophète Ithiel Dossou"
        subtitle="Serviteur de Dieu et voix prophétique pour les nations, Fondateur du Centre International de Réveil Cannaan (CIRC)."
        image="/images/prophets.jpg"
        badge="Le Visionnaire"
      />

      <section className="px-6 py-24 lg:px-10 bg-slate-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-4xl relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
            
            {/* Top Image Banner */}
            <div className="relative h-64 sm:h-80 w-full">
              <Image src="/images/predication.jpg" alt="Prédication du prophète" fill className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/10" />
              <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
                  <span className="block h-0.5 w-8 bg-amber-400" /> Biographie
                </span>
                <h2 className="font-[var(--font-heading)] text-3xl font-extrabold text-white sm:text-5xl">
                  Une vie consacrée à l'Éternel
                </h2>
              </div>
            </div>

            <div className="p-8 sm:p-12 lg:p-16">
              {/* FIRST ROW: Maladie image (Left) + Paragraphs 1-2 (Right) */}
              <div className="grid lg:grid-cols-[320px_1fr] gap-12 items-start mb-12">
                {/* Sidebar Image 1 (Left) */}
                <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] border border-slate-100 hidden lg:block">
                  <Image src="/images/prophete_malade.jpg" alt="Témoignage du prophète" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-sm font-semibold text-white">Un témoignage puissant de guérison divine.</p>
                  </div>
                </motion.div>
                
                {/* Text Content 1 (Right) */}
                <div className="space-y-8 text-lg leading-relaxed text-slate-600">
                  <motion.div variants={fadeUp} className="flex gap-4 items-start">
                    <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p>
                        <strong className="text-slate-900">Le Prophète Ithiel Wayisuhu Zannudé Dossou</strong>, serviteur de Dieu et voix prophétique pour les nations, est le Fondateur du Centre International de Réveil Cannaan (CIRC).
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex gap-4 items-start">
                    <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-amber-50 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p>
                        Issu d'une lignée de serviteurs de Dieu, fils du feu Pasteur Pierre Dossou et de la prédicatrice Dorcas Bodjrenou, son parcours est marqué par un témoignage puissant : après plusieurs années de maladie, paralysé et proche de la mort, le Seigneur lui apparaît, le guérit et l'appelle au ministère, le consacrant comme prophète pour les nations.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* SECOND ROW: Text (Left) + Prophète bottom image (Right) */}
              <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
                
                {/* Text Content 2 (Left) */}
                <div className="space-y-8 text-lg leading-relaxed text-slate-600">
                  <motion.div variants={fadeUp} className="flex gap-4 items-start">
                    <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p>
                        Depuis lors, il porte un ministère international de restauration et de transformation, dédié à la formation de leaders appelés à manifester la suprématie du Royaume de Dieu dans les sphères charismatique, économique et politique.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex gap-4 items-start">
                    <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-amber-50 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p>
                        Reconnu pour sa profondeur prophétique, il annonce l'Évangile du Royaume avec autorité à travers les nations, conduisant des campagnes d'évangélisation et des conférences de réveil où Dieu agit puissamment par des signes, des miracles et des prodiges, conduisant des multitudes à Christ.
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Sidebar Image 2 (Right) */}
                <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] border border-slate-100 hidden lg:block">
                  <Image src="/images/prophete_bottom.jpg" alt="Le Prophète Ithiel Dossou" fill className="object-cover" />
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="mt-12 bg-slate-900 rounded-3xl p-8 sm:p-10 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <Star className="h-8 w-8 text-amber-400 mx-auto mb-6" />
                  <p className="text-xl sm:text-2xl font-bold text-white mb-6">
                    "Son cri de cœur : le Réveil des Derniers Temps."
                  </p>
                  <div className="h-px w-24 bg-white/20 mx-auto mb-6" />
                  <p className="text-lg text-blue-100 font-medium italic">
                    Mesdames, Mesdemoiselles et Messieurs, veuillez recevoir avec une ovation à l'Eternel notre Dieu, son serviteur, le prophète ITHIEL DOSSOU !!!!!
                  </p>
                </div>
              </motion.div>

            </div>

            <motion.div variants={fadeUp} className="mt-16 text-center">
              <Link href={`/${locale}#about`} className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 px-8 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all hover:scale-105">
                <ArrowLeft className="h-4 w-4" /> Retour
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </main>
  );
}
