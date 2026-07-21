import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MinistriesPage } from "@/components/ministries-page";
import { buildPageMetadata } from "@/lib/metadata";
import { dictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata({ locale, path: "/ministries" });
}

export default async function MinistriesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = dictionary[locale];
  return <MinistriesPage locale={locale} dict={dict} />;
}
