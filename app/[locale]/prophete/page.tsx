import { notFound } from "next/navigation";
import { ProphetPage } from "@/components/prophet-page";
import { dictionary, isLocale } from "@/lib/i18n";

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
