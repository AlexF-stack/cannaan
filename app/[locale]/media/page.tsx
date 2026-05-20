import { notFound } from "next/navigation";
import { MediaPage } from "@/components/media-page";
import { dictionary, isLocale } from "@/lib/i18n";

export default async function MediaRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = dictionary[locale];

  return <MediaPage locale={locale} dict={dict} />;
}
