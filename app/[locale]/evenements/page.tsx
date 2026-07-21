import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EventsPage } from "@/components/events-page";
import { buildPageMetadata } from "@/lib/metadata";
import { dictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata({ locale, path: "/evenements" });
}

export default async function EvenementsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = dictionary[locale];

  return <EventsPage locale={locale} dict={dict} />;
}
