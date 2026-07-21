import type { Locale } from "@/lib/i18n";

type PageMetaEntry = { title: string; description: string };

export const publicPagePaths = [
  "",
  "/about",
  "/ministries",
  "/evenements",
  "/media",
  "/enseignements",
  "/prophete",
  "/don",
  "/contact",
] as const;

export type PublicPagePath = (typeof publicPagePaths)[number];

export const pageMeta: Record<PublicPagePath, Record<Locale, PageMetaEntry>> = {
  "": {
    fr: {
      title: "Accueil",
      description:
        "Bienvenue au Centre International de Réveil Canaan — culte, communauté et enseignements à Agblangandan, Bénin.",
    },
    en: {
      title: "Home",
      description:
        "Welcome to CIRC Canaan — worship, community and teachings in Agblangandan, Benin.",
    },
  },
  "/about": {
    fr: {
      title: "À Propos",
      description: "Découvrez la vision, la mission et les valeurs de l'église Canaan.",
    },
    en: {
      title: "About",
      description: "Discover Canaan church vision, mission and values.",
    },
  },
  "/ministries": {
    fr: {
      title: "Ministères",
      description: "Enfants, jeunes, couples et missions — vivez la communauté Canaan.",
    },
    en: {
      title: "Ministries",
      description: "Kids, youth, couples and missions — experience Canaan community.",
    },
  },
  "/evenements": {
    fr: {
      title: "Événements & Direct",
      description: "Cultes, conférences et retransmissions en direct du CIRC Canaan.",
    },
    en: {
      title: "Events & Live",
      description: "Services, conferences and live streams from CIRC Canaan.",
    },
  },
  "/media": {
    fr: {
      title: "Médiathèque",
      description: "Prédications audio, galerie photos et ressources multimédia.",
    },
    en: {
      title: "Media Library",
      description: "Audio sermons, photo gallery and multimedia resources.",
    },
  },
  "/enseignements": {
    fr: {
      title: "Enseignements",
      description: "Messages et enseignements bibliques du CIRC Canaan.",
    },
    en: {
      title: "Teachings",
      description: "Biblical messages and teachings from CIRC Canaan.",
    },
  },
  "/prophete": {
    fr: {
      title: "Le Prophète",
      description: "Biographie et ministère du Prophète Ithiel Dossou.",
    },
    en: {
      title: "The Prophet",
      description: "Biography and ministry of Prophet Ithiel Dossou.",
    },
  },
  "/don": {
    fr: {
      title: "Faire un Don",
      description: "Soutenez l'œuvre du CIRC Canaan par un don sécurisé.",
    },
    en: {
      title: "Give",
      description: "Support CIRC Canaan ministry through a secure donation.",
    },
  },
  "/contact": {
    fr: {
      title: "Contact",
      description: "Contactez le CIRC Canaan — Auditorium CIRC, Agblangandan, Bénin.",
    },
    en: {
      title: "Contact",
      description: "Contact CIRC Canaan — CIRC Auditorium, Agblangandan, Benin.",
    },
  },
};
