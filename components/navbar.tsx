"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, HandHeart } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHURCH_NAME, getBrand, LOGO_SRC } from "@/lib/brand";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getMainNavLinks } from "@/lib/navigation";
import { swapLocalePath } from "@/lib/use-locale";

export function NavBar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname() ?? "";
  const brand = getBrand(locale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = getMainNavLinks(locale, dict);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            "transition-all duration-500",
            scrolled ? "bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] py-2" : "bg-white/95 backdrop-blur-md py-4"
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">

            {/* Logo + church name */}
            <Link href={`/${locale}`} className="flex items-center gap-4 group">
              <div className="relative h-14 w-auto">
                <Image
                  src={LOGO_SRC}
                  alt={CHURCH_NAME}
                  width={160}
                  height={56}
                  className="h-14 w-auto object-contain"
                  priority
                />
              </div>
              <div className="hidden lg:flex flex-col leading-tight">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  {brand.line1}
                </span>
                <span className="text-xl font-extrabold text-circ-red font-heading leading-tight tracking-tight">
                  {brand.line2}
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-2">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="relative px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-circ-red group"
                >
                  {l.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-circ-gold rounded-full transition-all duration-300 group-hover:w-3/4" />
                </Link>
              ))}
            </nav>

            {/* Right */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold">
                <Link href={swapLocalePath(pathname, "fr")} className={cn("px-1.5 transition-colors", locale === "fr" ? "text-circ-red" : "text-slate-400 hover:text-slate-700")}>FR</Link>
                <span className="text-slate-300">|</span>
                <Link href={swapLocalePath(pathname, "en")} className={cn("px-1.5 transition-colors", locale === "en" ? "text-circ-red" : "text-slate-400 hover:text-slate-700")}>EN</Link>
              </div>
              <Link
                href={`/${locale}/don`}
                className="group relative overflow-hidden rounded-full bg-circ-red px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-circ-red/25 transition-all hover:bg-circ-red-light hover:shadow-circ-red/35"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <HandHeart className="h-4 w-4" />
                  {dict.nav.donate}
                </span>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-50"
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-0 top-[72px] lg:top-[88px] z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl md:hidden shadow-2xl"
          >
            <div className="mx-auto max-w-7xl px-6 py-5 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center rounded-xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-red-50 hover:text-circ-red transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <div className="pt-3 pb-1 mt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <Link href={swapLocalePath(pathname, "fr")} className={cn("transition-colors", locale === "fr" ? "text-circ-red" : "text-slate-400")}>FR</Link>
                  <Link href={swapLocalePath(pathname, "en")} className={cn("transition-colors", locale === "en" ? "text-circ-red" : "text-slate-400")}>EN</Link>
                </div>
                <Link
                  href={`/${locale}/don`}
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-circ-red px-5 py-2 text-sm font-bold text-white shadow-md"
                >
                  {dict.nav.donate}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
