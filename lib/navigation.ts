import type { Dictionary, Locale } from "@/lib/i18n";

export type NavLink = { href: string; label: string };

export function getMainNavLinks(locale: Locale, dict: Dictionary): NavLink[] {
  return [
    { href: `/${locale}#about`, label: dict.nav.about },
    { href: `/${locale}/ministries`, label: dict.nav.ministries },
    { href: `/${locale}/evenements`, label: dict.nav.events },
    { href: `/${locale}/media`, label: dict.nav.media },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];
}

export function getFooterLinks(locale: Locale, dict: Dictionary): NavLink[] {
  return [
    ...getMainNavLinks(locale, dict),
    { href: `/${locale}/don`, label: dict.nav.donate },
  ];
}
