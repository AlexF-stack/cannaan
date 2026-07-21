import type { Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/i18n-pages";

export const CHURCH_NAME = "Centre International de Réveil Cannaan";

export function getBrand(locale: Locale) {
  return getPageCopy(locale).brand;
}
