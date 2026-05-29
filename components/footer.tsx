"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe, PlayCircle, Heart } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: `/${locale}#about`, label: dict.nav.about },
    { href: `/${locale}/ministries`, label: dict.nav.ministries },
    { href: `/${locale}/media`, label: "Médiathèque" },
    { href: `/${locale}/evenements`, label: "Événements & Direct" },
    { href: `/${locale}/don`, label: dict.nav.donate || "Faire un Don" },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 text-slate-200 px-6 py-16 lg:px-10 border-t border-slate-800">
      {/* Halos de lumière de fond subtils */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col gap-6">
            <Link href={`/${locale}`} className="flex items-center gap-3 w-fit group">
              <div className="relative h-12 w-auto bg-slate-900/50 rounded-lg p-1.5 border border-white/5 shadow-md">
                <Image
                  src="/images/canaan_logo_1779631751389.png"
                  alt="CIRC Cannaan"
                  width={120}
                  height={42}
                  className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  Centre International
                </span>
                <span className="text-md font-black text-amber-400 tracking-wide font-[var(--font-heading)]">
                  Canaan
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {dict.footer.churchTagline}
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.youtube.com/@circ-canaan-officiel"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-slate-800/80 border border-white/5 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <PlayCircle className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-slate-800/80 border border-white/5 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h4 className="font-bold text-amber-400 mb-6 uppercase tracking-wider text-sm">
              {dict.footer.quickLinks}
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-blue-500/40 group-hover:bg-amber-400 transition-colors shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-amber-400 mb-6 uppercase tracking-wider text-sm">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Téléphone</span>
                  <a href="tel:+2290166734734" className="text-slate-300 hover:text-amber-400 transition-colors">
                    +229 01 66 73 47 34
                  </a>
                  <a href="tel:+2290167522228" className="text-slate-300 hover:text-amber-400 transition-colors">
                    +229 01 67 52 22 28
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Email</span>
                  <a href="mailto:contact@canaan.church" className="text-slate-300 hover:text-amber-400 transition-colors">
                    contact@canaan.church
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Localisation & Horaires */}
          <div>
            <h4 className="font-bold text-amber-400 mb-6 uppercase tracking-wider text-sm">
              {dict.footer.findUs}
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Adresse</span>
                  <span className="text-slate-300 leading-relaxed">
                    {dict.footer.mapText}
                  </span>
                </div>
              </div>
              
              <div className="rounded-xl bg-white/5 border border-white/5 p-4 mt-2">
                <p className="text-xs font-semibold text-slate-300 mb-1">Culte Principal :</p>
                <p className="text-xs text-amber-400 font-bold">{dict.events.sunday}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Ligne inférieure */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Église Canaan. Tous droits réservés.</p>
          <p className="flex items-center gap-1.5">
            Bâtir pour régner dans les nations
            <Heart className="h-3.5 w-3.5 text-amber-500 fill-amber-500 animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
}
