import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { HomePage } from "@/components/home-page";
import { buildPageMetadata } from "@/lib/metadata";
import { defaultLocale, dictionary, isLocale } from "@/lib/i18n";
import { readLocaleContent } from "@/lib/cms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata({ locale, path: "" });
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { sermons, eventOverrides } = await readLocaleContent(locale);
  const dict = {
    ...dictionary[locale],
    events: {
      ...dictionary[locale].events,
      ...eventOverrides,
    },
  };
  return <HomePage locale={locale ?? defaultLocale} dict={dict} sermonsList={sermons} />;
}
