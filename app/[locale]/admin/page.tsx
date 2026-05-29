import { notFound } from "next/navigation";

import AdminShell from "@/components/admin-shell";
import { isLocale } from "@/lib/i18n";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <AdminShell locale={locale} />;
}
