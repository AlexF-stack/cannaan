import type { Metadata } from "next";

import type { Locale } from "@/lib/i18n";
import { pageMeta, type PublicPagePath } from "@/lib/page-meta";
import { getSiteUrl } from "@/lib/site-url";

export function buildPageMetadata({
  locale,
  path,
  noIndex = false,
}: {
  locale: Locale;
  path: PublicPagePath;
  noIndex?: boolean;
}): Metadata {
  const { title, description } = pageMeta[path][locale];
  const siteUrl = getSiteUrl();
  const suffix = path === "" ? "" : path;
  const url = `${siteUrl}/${locale}${suffix}`;
  const ogTitle = `${title} | Canaan`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr${suffix}`,
        en: `${siteUrl}/en${suffix}`,
        "x-default": `${siteUrl}/fr${suffix}`,
      },
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: "Canaan",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [`/api/og?title=${encodeURIComponent(title)}`],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function buildNoIndexMetadata(title: string): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
  };
}
