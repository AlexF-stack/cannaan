import type { Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/i18n-pages";

export const CHURCH_NAME = "Centre International de Réveil Cannaan";

/** Logo officiel rouge — navbar, footer (fond clair ou encadré). */
export const LOGO_SRC = "/images/logo_rouge.jpg";

/** Logo jaune — fonds sombres (loader, hero). */
export const LOGO_ON_DARK_SRC = "/images/logo.png";

/** Variante bleue éclatée (admin, documents). */
export const LOGO_BLUE_SRC = "/images/logo_bleu.jpg";

export function getBrand(locale: Locale) {
  return getPageCopy(locale).brand;
}

export function getLogoSrc(onDark = false) {
  return onDark ? LOGO_ON_DARK_SRC : LOGO_SRC;
}
