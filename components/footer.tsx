import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, PlayCircle, Heart } from "lucide-react";

import { CHURCH_BRAND, CHURCH_NAME } from "@/lib/brand";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getFooterLinks } from "@/lib/navigation";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const currentYear = new Date().getFullYear();
  const quickLinks = getFooterLinks(locale, dict);

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-16 text-slate-200 lg:px-10">
      <div className="pointer-events-none absolute right-1/4 top-0 h-80 w-80 rounded-full bg-blue-600/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-amber-500/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Identité — alignée sur la navbar */}
          <div className="flex flex-col gap-6">
            <Link href={`/${locale}`} className="group flex w-fit items-center gap-4">
              <div className="relative h-14 w-auto rounded-lg border border-white/5 bg-slate-900/50 p-1.5">
                <Image
                  src="/images/canaan_logo_1779631751389.png"
                  alt={CHURCH_NAME}
                  width={120}
                  height={42}
                  className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
                  sizes="120px"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  {CHURCH_BRAND.line1}
                </span>
                <span className="font-[var(--font-heading)] text-xl font-extrabold tracking-tight text-blue-400">
                  {CHURCH_BRAND.line2}
                </span>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">{dict.footer.churchTagline}</p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.youtube.com/@circ-canaan-officiel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-slate-800/80 text-slate-400 transition-all duration-300 hover:scale-110 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-500"
                aria-label="YouTube — CIRC Cannaan"
              >
                <PlayCircle className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h2 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-400">
              <span className="h-0.5 w-6 rounded-full bg-amber-400" />
              {dict.footer.quickLinks}
            </h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-slate-400 transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-blue-500/40 transition-colors group-hover:bg-amber-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-400">
              <span className="h-0.5 w-6 rounded-full bg-amber-400" />
              {dict.footer.contact}
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {dict.footer.phone}
                  </span>
                  <a href="tel:+2290166734734" className="text-slate-300 transition-colors hover:text-amber-400">
                    +229 01 66 73 47 34
                  </a>
                  <a href="tel:+2290167522228" className="text-slate-300 transition-colors hover:text-amber-400">
                    +229 01 67 52 22 28
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {dict.footer.email}
                  </span>
                  <a
                    href="mailto:contact@canaan.church"
                    className="text-slate-300 transition-colors hover:text-amber-400"
                  >
                    contact@canaan.church
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Localisation */}
          <div>
            <h2 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-400">
              <span className="h-0.5 w-6 rounded-full bg-amber-400" />
              {dict.footer.findUs}
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {dict.footer.address}
                  </span>
                  <span className="leading-relaxed text-slate-300">{dict.footer.mapText}</span>
                </div>
              </div>
              <div className="mt-2 rounded-xl border border-white/5 bg-white/5 p-4">
                <p className="mb-1 text-xs font-semibold text-slate-300">{dict.footer.mainService}</p>
                <p className="text-xs font-bold text-amber-400">{dict.events.sunday}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>
            © {currentYear} {dict.footer.copyright}
          </p>
          <p className="flex items-center gap-1.5">
            {dict.footer.motto}
            <Heart className="h-3.5 w-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}
