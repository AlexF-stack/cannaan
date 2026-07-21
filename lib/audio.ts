import type { Locale } from "@/lib/i18n";

export type AudioTeaching = {
  id: string;
  title: string;
  prophet: string;
  date: string;
  duration: string;
  category: string;
  src: string;
};

const AUDIO_BASE = process.env.NEXT_PUBLIC_AUDIO_BASE_URL?.replace(/\/$/, "") ?? "";

/** Préfixe CDN optionnel + normalisation des extensions audio. */
export function resolveAudioSrc(relativePath: string) {
  if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
    return relativePath;
  }
  const normalized = relativePath.replace(/\.mp3\.mpeg$/i, ".mp3");
  return AUDIO_BASE ? `${AUDIO_BASE}${normalized}` : normalized;
}

type AudioEntry = {
  id: string;
  src: string;
  fr: Omit<AudioTeaching, "id" | "src">;
  en: Omit<AudioTeaching, "id" | "src">;
};

const audioCatalog: AudioEntry[] = [
  {
    id: "canaan-50-jours-ithiel-08-mai-2026",
    src: resolveAudioSrc("/audio/CANAAN 50 Jours Prédication Ithiel 08 Mai 2026.mp3"),
    fr: {
      title: "50 Jours - Prédication Ithiel",
      prophet: "Prophète Ithiel Dossou",
      date: "08 Mai 2026",
      duration: "Audio",
      category: "Prédication",
    },
    en: {
      title: "50 Days - Ithiel Sermon",
      prophet: "Prophet Ithiel Dossou",
      date: "May 8, 2026",
      duration: "Audio",
      category: "Preaching",
    },
  },
  {
    id: "canaan-prophete-ithiel-03-mai-2026",
    src: resolveAudioSrc("/audio/CANAAN Prédication Prophète Ithiel 03 Mai 2026.mp3"),
    fr: {
      title: "Prédication Prophète Ithiel",
      prophet: "Prophète Ithiel Dossou",
      date: "03 Mai 2026",
      duration: "Audio",
      category: "Prédication",
    },
    en: {
      title: "Prophet Ithiel Sermon",
      prophet: "Prophet Ithiel Dossou",
      date: "May 3, 2026",
      duration: "Audio",
      category: "Preaching",
    },
  },
  {
    id: "canaan-k-klistime-19-avril-2026",
    src: resolveAudioSrc("/audio/CANAAN Prédication K.Klistimé 19 Avril 2026.mp3"),
    fr: {
      title: "Prédication K. Klistime",
      prophet: "K. Klistime",
      date: "19 Avril 2026",
      duration: "Audio",
      category: "Prédication",
    },
    en: {
      title: "K. Klistime Sermon",
      prophet: "K. Klistime",
      date: "April 19, 2026",
      duration: "Audio",
      category: "Preaching",
    },
  },
  {
    id: "canaan-50-jours-k-klistime-14-avril-2026",
    src: resolveAudioSrc("/audio/CANAAN 50 Jours Prédication K.Klistimé 14 Avril 2026.mp3"),
    fr: {
      title: "50 Jours - Prédication K. Klistime",
      prophet: "K. Klistime",
      date: "14 Avril 2026",
      duration: "Audio",
      category: "Prédication",
    },
    en: {
      title: "50 Days - K. Klistime Sermon",
      prophet: "K. Klistime",
      date: "April 14, 2026",
      duration: "Audio",
      category: "Preaching",
    },
  },
  {
    id: "canaan-50-jours-k-klistime-13-avril-2026",
    src: resolveAudioSrc("/audio/CANAAN 50 Jours Prédication K.Klistimé 13 Avril 2026.mp3"),
    fr: {
      title: "50 Jours - Prédication K. Klistime",
      prophet: "K. Klistime",
      date: "13 Avril 2026",
      duration: "Audio",
      category: "Prédication",
    },
    en: {
      title: "50 Days - K. Klistime Sermon",
      prophet: "K. Klistime",
      date: "April 13, 2026",
      duration: "Audio",
      category: "Preaching",
    },
  },
];

export function getAudioTeachings(locale: Locale = "fr"): AudioTeaching[] {
  return audioCatalog.map((entry) => ({
    id: entry.id,
    src: entry.src,
    ...entry[locale],
  }));
}

/** @deprecated Use getAudioTeachings(locale) */
export const audioTeachings = getAudioTeachings("fr");
