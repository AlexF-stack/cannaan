import { notFound } from "next/navigation";
import type { Metadata } from "next";

import AdminShell from "@/components/admin-shell";
import { buildNoIndexMetadata } from "@/lib/metadata";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return buildNoIndexMetadata("Administration sécurisée");
}

export default async function SecureAdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <AdminShell locale={locale} />;
}
