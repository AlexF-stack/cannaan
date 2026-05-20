"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image: string;
  badge?: string;
}

export function PageHeader({ title, subtitle, image, badge }: PageHeaderProps) {
  return (
    <div className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
      <Image src={image} alt={title} fill sizes="100vw" className="object-cover object-center" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">{badge}</span>
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-[var(--font-heading)] text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 max-w-2xl text-lg text-blue-100"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
