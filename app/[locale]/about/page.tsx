import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";
import { buildPageMetadata } from "@/lib/metadata";
import { dictionary, isLocale } from "@/lib/i18n";
import { readLocaleContent } from "@/lib/cms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata({ locale, path: "/about" });
}

export default async function AboutRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { eventOverrides } = await readLocaleContent(locale);
  const dict = {
    ...dictionary[locale],
    events: {
      ...dictionary[locale].events,
      ...eventOverrides,
    },
  };
  return <AboutPage locale={locale} dict={dict} />;
}
