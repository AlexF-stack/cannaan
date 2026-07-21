"use client";

import { usePathname } from "next/navigation";

import { defaultLocale, dictionary, isLocale, type Dictionary, type Locale } from "@/lib/i18n";
import { getPageCopy, type PageCopy } from "@/lib/i18n-pages";

export function useLocaleContext(): { locale: Locale; dict: Dictionary; pages: PageCopy } {
  const pathname = usePathname() ?? "";
  const segment = pathname.split("/")[1] ?? "";
  const locale: Locale = isLocale(segment) ? segment : defaultLocale;

  return {
    locale,
    dict: dictionary[locale],
    pages: getPageCopy(locale),
  };
}

export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split("/")[1] ?? "";
  return isLocale(segment) ? segment : defaultLocale;
}

export function swapLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && isLocale(parts[0])) {
    parts[0] = target;
    return `/${parts.join("/")}`;
  }
  return `/${target}`;
}
