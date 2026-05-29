"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Headphones, Play } from "lucide-react";

import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { audioTeachings } from "@/lib/audio";
import type { Dictionary, Locale } from "@/lib/i18n";

export function TeachingsPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="fixed inset-x-0 top-0 z-50">
        <NavBar locale={locale} dict={dict} />
      </div>

      <PageHeader
        title="Tous les Enseignements"
        subtitle="Explorez notre bibliotheque complete de predications et de moments de revelation."
        image="/images/stade_rempli.jpg"
        badge="Archives"
      />

      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Bibliotheque Audio</h2>
              <p className="mt-2 text-slate-500">
                Retrouvez tous les messages inspires pour votre edification.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Tout", "Predication", "Enseignement", "Combat"].map((cat) => (
                <button
                  key={cat}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium transition-all hover:bg-slate-900 hover:text-white"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {audioTeachings.map((teaching, index) => (
              <motion.div
                key={teaching.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {teaching.category}
                  </span>
                </div>
                <h3 className="mb-2 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                  {teaching.title}
                </h3>
                <p className="mb-6 text-sm text-slate-500">{teaching.prophet}</p>
                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {teaching.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      {teaching.duration}
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/media`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-transform hover:scale-110"
                  >
                    <Play className="ml-0.5 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer locale={locale} dict={dict} />
    </main>
  );
}
