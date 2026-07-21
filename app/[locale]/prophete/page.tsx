import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProphetPage } from "@/components/prophet-page";
import { buildPageMetadata } from "@/lib/metadata";
import { dictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata({ locale, path: "/prophete" });
}

export default async function PropheteRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = dictionary[locale];

  return <ProphetPage locale={locale} dict={dict} />;
}
