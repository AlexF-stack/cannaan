import { cookies } from "next/headers";
import Link from "next/link";

import { AdminDashboard } from "@/components/admin-dashboard";
import { AdminToolbar } from "@/components/admin-toolbar";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { getAdminCookieName, isValidSessionCookie } from "@/lib/admin-auth";

interface AdminShellProps {
  locale: string;
}

export default async function AdminShell({ locale }: AdminShellProps) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(getAdminCookieName())?.value;
  const isAuthenticated = isValidSessionCookie(sessionCookie);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <PageHeader
        title="Espace Administrateur"
        subtitle="Gestion sécurisée des médias, annonces et résumés audio."
        image="/images/ministere.jpg"
        badge="Admin" 
      />

      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
        {isAuthenticated ? (
          <div className="space-y-10">
            <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Administration</p>
                  <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">Tableau de bord admin</h1>
                  <p className="mt-2 max-w-2xl text-slate-300">
                    Accède à l’édition du contenu, au countdown et aux derniers résumés audio.
                  </p>
                </div>
                <div>
                  <AdminToolbar locale={locale} />
                </div>
              </div>
            </header>

            <AdminDashboard />
          </div>
        ) : (
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Accès sécurisé</p>
              <h2 className="text-3xl font-extrabold text-white">Connexion requise</h2>
              <p className="text-slate-300">
                Tu dois être connecté pour accéder à la console admin. Utilise ton lien personnel ou le chemin caché.
              </p>
              <Button asChild className="mt-4">
                <Link href={`/${locale}/admin/login`}>Se connecter</Link>
              </Button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
