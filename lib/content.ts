import type { Locale } from "@/lib/i18n";

export const ministries = [
  {
    key: "kids",
    image: "/images/ministere.jpg",
  },
  {
    key: "youth",
    image: "/images/adoration1.jpg",
  },
  {
    key: "couples",
    image: "/images/ministere.jpg",
  },
  {
    key: "social",
    image: "/images/adoration2.jpg",
  },
] as const;

export const ministryCopy: Record<
  Locale,
  Record<(typeof ministries)[number]["key"], { title: string; description: string }>
> = {
  fr: {
    kids: {
      title: "Canaan Kids",
      description: "Un espace sûr et joyeux pour grandir dans la foi dès le plus jeune âge.",
    },
    youth: {
      title: "Impact Jeunes",
      description: "Des rencontres dynamiques pour développer identité, passion et leadership.",
    },
    couples: {
      title: "Couples & Familles",
      description: "Des parcours concrets pour bâtir des relations solides et durables.",
    },
    social: {
      title: "Action Sociale",
      description: "Une foi active au service de la ville par des actions de compassion.",
    },
  },
  en: {
    kids: {
      title: "Canaan Kids",
      description: "A safe and joyful space to grow in faith from an early age.",
    },
    youth: {
      title: "Youth Impact",
      description: "Dynamic gatherings to grow identity, passion, and leadership.",
    },
    couples: {
      title: "Couples & Families",
      description: "Practical pathways to build healthy and lasting relationships.",
    },
    social: {
      title: "Social Outreach",
      description: "A living faith that serves the city through compassionate actions.",
    },
  },
};

export const sermons: Record<Locale, Array<{ title: string; date: string; speaker: string }>> = {
  fr: [
    { title: "Renaître dans la Grâce", date: "07 Avril 2026", speaker: "Pasteur Samuel" },
    { title: "Foi Active, Vie Transformée", date: "31 Mars 2026", speaker: "Pasteur Ruth" },
  ],
  en: [
    { title: "Born Again by Grace", date: "April 07, 2026", speaker: "Pastor Samuel" },
    { title: "Active Faith, Transformed Life", date: "March 31, 2026", speaker: "Pastor Ruth" },
  ],
};
