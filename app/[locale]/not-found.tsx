"use client";

import Link from "next/link";

import { useLocaleContext } from "@/lib/use-locale";

export default function LocaleNotFound() {
  const { locale, pages } = useLocaleContext();
  const t = pages.errors;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <p className="text-8xl font-black text-amber-400">404</p>
      <h1 className="mt-4 font-[var(--font-heading)] text-3xl font-bold">{t.notFoundTitle}</h1>
      <p className="mt-3 max-w-md text-slate-400">{t.notFoundDesc}</p>
      <Link
        href={`/${locale}`}
        className="mt-8 rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        {t.notFoundCta}
      </Link>
    </main>
  );
}
