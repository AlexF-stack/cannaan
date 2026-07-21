"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, BookOpen, Heart, Award, Star, Globe } from "lucide-react";
import Link from "next/link";

import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/i18n-pages";

const fadeUp: Variants = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };

export function ProphetPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const p = getPageCopy(locale).prophetPage;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="fixed inset-x-0 top-0 z-50">
        <NavBar locale={locale} dict={dict} />
      </div>

      <PageHeader
        title={p.headerTitle}
        subtitle={p.headerSubtitle}
        image="/images/prophets.jpg"
        badge={p.headerBadge}
      />

      <section className="px-6 py-24 lg:px-10 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
            <div className="relative h-64 sm:h-80 w-full">
              <Image src="/images/predication.jpg" alt={p.predicationAlt} fill className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/10" />
              <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
                  <span className="block h-0.5 w-8 bg-amber-400" /> {p.bioBadge}
                </span>
                <h2 className="font-[var(--font-heading)] text-3xl font-extrabold text-white sm:text-5xl">{p.bioTitle}</h2>
              </div>
            </div>

            <div className="p-8 sm:p-12 lg:p-16">
              <div className="grid lg:grid-cols-[320px_1fr] gap-12 items-start mb-12">
                <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] border border-slate-100 hidden lg:block">
                  <Image src="/images/prophete_malade.jpg" alt={p.testimonyAlt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-sm font-semibold text-white">{p.testimonyCaption}</p>
                  </div>
                </motion.div>

                <div className="space-y-8 text-lg leading-relaxed text-slate-600">
                  <motion.div variants={fadeUp} className="flex gap-4 items-start">
                    <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <p>{p.bioP1}</p>
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex gap-4 items-start">
                    <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-amber-50 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-amber-600" />
                    </div>
                    <p>{p.bioP2}</p>
                  </motion.div>
                </div>
              </div>

              <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
                <div className="space-y-8 text-lg leading-relaxed text-slate-600">
                  <motion.div variants={fadeUp} className="flex gap-4 items-start">
                    <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <p>{p.bioP3}</p>
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex gap-4 items-start">
                    <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-amber-50 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-amber-600" />
                    </div>
                    <p>{p.bioP4}</p>
                  </motion.div>
                </div>

                <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] border border-slate-100 hidden lg:block">
                  <Image src="/images/prophete_bottom.jpg" alt={p.prophetAlt} fill className="object-cover" />
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="mt-12 bg-slate-900 rounded-3xl p-8 sm:p-10 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <Star className="h-8 w-8 text-amber-400 mx-auto mb-6" />
                  <p className="text-xl sm:text-2xl font-bold text-white mb-6">&ldquo;{p.quoteTitle}&rdquo;</p>
                  <div className="h-px w-24 bg-white/20 mx-auto mb-6" />
                  <p className="text-lg text-blue-100 font-medium italic">{p.quoteText}</p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="mt-16 text-center pb-12">
              <Link
                href={`/${locale}#about`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 px-8 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4" /> {p.back}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer locale={locale} dict={dict} />
    </main>
  );
}
