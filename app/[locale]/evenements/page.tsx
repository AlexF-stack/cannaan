import { notFound } from "next/navigation";
import { EventsPage } from "@/components/events-page";
import { dictionary, isLocale } from "@/lib/i18n";

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
