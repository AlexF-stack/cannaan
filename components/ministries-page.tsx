"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { Globe, HandHeart, HeartHandshake, Users, ArrowRight } from "lucide-react";
import React from "react";

import { NavBar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { ministries, ministryCopy } from "@/lib/content";
import type { Dictionary, Locale } from "@/lib/i18n";

const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

const ICON_MAP = { kids: Users, youth: HeartHandshake, couples: HandHeart, social: Globe } as const;
const COLOR_MAP = {
  kids:    { bg: "from-blue-600 to-blue-800",    badge: "bg-blue-500" },
  youth:   { bg: "from-amber-500 to-orange-600", badge: "bg-amber-400" },
  couples: { bg: "from-rose-500 to-pink-700",    badge: "bg-rose-400" },
  social:  { bg: "from-emerald-500 to-teal-700", badge: "bg-emerald-400" },
} as const;

function TiltCard3D({ item, copy }: { item: (typeof ministries)[number]; copy: { title: string; description: string } }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });
  const rotX = useTransform(sy, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotY = useTransform(sx, [-0.5, 0.5], ["-10deg", "10deg"]);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  const Icon = ICON_MAP[item.key];
  const colors = COLOR_MAP[item.key];

  return (
    <motion.div
      onMouseMove={move} onMouseLeave={reset}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="group relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer transition-shadow"
    >
      {/* Background image */}
      <Image src={item.image} alt={copy.title} fill sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${colors.bg} opacity-80 group-hover:opacity-90 transition-opacity`} />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-7" style={{ transform: "translateZ(50px)" }}>
        <div className={`mb-4 h-12 w-12 rounded-2xl ${colors.badge} flex items-center justify-center shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="font-[var(--font-heading)] text-2xl font-bold text-white">{copy.title}</h3>
        <p className="mt-2 text-sm text-white/80 leading-relaxed opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          {copy.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white opacity-0 translate-y-2 transition-all duration-500 delay-75 group-hover:opacity-100 group-hover:translate-y-0">
          En savoir plus <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}

export function MinistriesPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="fixed inset-x-0 top-0 z-50">
        <NavBar locale={locale} dict={dict} />
      </div>

      <PageHeader
        title={dict.nav.ministries}
        subtitle={dict.ministries.title}
        image="/images/adoration2.jpg"
        badge="Communauté"
      />

      {/* Grid */}
      <section className="bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-14 text-center">
            <motion.span variants={fadeUp} className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
              <span className="h-0.5 w-8 bg-amber-400 block" /> Nos Ministères
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-[var(--font-heading)] text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Une place pour chacun
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-xl mx-auto text-slate-600 text-lg">
              Quelle que soit votre saison de vie, il y a un ministère fait pour vous à Canaan.
            </motion.p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: "1200px" }}>
            {ministries.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              >
                <TiltCard3D item={item} copy={ministryCopy[locale][item.key]} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-slate-50 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-blue-600 p-10 text-center text-white shadow-2xl"
          >
            <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-blue-500/40 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-amber-400/20 blur-2xl" />
            <div className="relative z-10">
              <h2 className="font-[var(--font-heading)] text-3xl font-extrabold sm:text-4xl">
                Prêt à vous impliquer ?
              </h2>
              <p className="mt-4 text-blue-100 max-w-lg mx-auto">
                Rejoignez un ministère, rencontrez notre équipe et commencez votre aventure à Canaan.
              </p>
              <a href={`/${locale}/contact`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 text-sm font-bold text-slate-900 hover:bg-amber-300 transition-all hover:scale-105 shadow-lg">
                Nous Contacter <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
