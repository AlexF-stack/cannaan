"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useMotionVariants } from "@/lib/motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image: string;
  badge?: string;
}

export function PageHeader({ title, subtitle, image, badge }: PageHeaderProps) {
  const { fadeUp, fadeIn, reduced } = useMotionVariants();

  return (
    <div className="relative flex h-[48vh] min-h-[360px] items-end overflow-hidden">
      <Image src={image} alt={title} fill sizes="100vw" className="object-cover object-center" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-circ-blue-dark/92 via-circ-blue/55 to-circ-blue-dark/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-circ-navy/50 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 lg:px-10">
        {badge && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: reduced ? 0 : 0.45 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-circ-gold/35 bg-circ-gold/10 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-circ-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-circ-gold-light">{badge}</span>
          </motion.div>
        )}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.08 }}
          className="font-heading text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.16 }}
            className="mt-3 max-w-2xl text-lg font-normal leading-relaxed text-blue-100/95"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
