import { notFound } from "next/navigation";
import { MinistriesPage } from "@/components/ministries-page";
import { dictionary, isLocale } from "@/lib/i18n";

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
