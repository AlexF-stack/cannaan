import { notFound } from "next/navigation";
import { AboutPage } from "@/components/about-page";
import { dictionary, isLocale } from "@/lib/i18n";
import { readLocaleContent } from "@/lib/cms";

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
