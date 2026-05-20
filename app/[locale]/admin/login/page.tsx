import { notFound } from "next/navigation";

import { AdminLoginForm } from "@/components/admin-login-form";
import { PageHeader } from "@/components/page-header";
import { isLocale } from "@/lib/i18n";

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <PageHeader
        title="Connexion Admin"
        subtitle="Accède à l’interface de gestion des médias et du contenu."
        image="/images/adoration1.jpg"
        badge="Administration"
      />
      <div className="mx-auto max-w-md px-6 py-12 lg:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
          <h1 className="font-[var(--font-heading)] text-3xl font-bold text-white">Connexion Admin</h1>
          <p className="mt-3 text-slate-300">
            Informe ton mot de passe sécurisé pour accéder à la console.
          </p>
          <div className="mt-8">
            <AdminLoginForm locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
