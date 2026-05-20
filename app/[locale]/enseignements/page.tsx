import { notFound } from "next/navigation";
import { TeachingsPage } from "@/components/teachings-page";
import { dictionary, isLocale } from "@/lib/i18n";

export default async function TeachingsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = dictionary[locale];

  return <TeachingsPage locale={locale} dict={dict} />;
}
