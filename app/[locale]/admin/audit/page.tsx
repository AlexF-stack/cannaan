import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { getAdminCookieName, isValidSessionCookie } from "@/lib/admin-auth";
import { readAuditEntries } from "@/lib/cms";
import { isLocale } from "@/lib/i18n";

export default async function AdminAuditPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    q?: string;
    localeFilter?: string;
    actionFilter?: string;
    ipFilter?: string;
  }>;
}) {
  const { locale } = await params;
  const {
    page: pageParam,
    q = "",
    localeFilter = "",
    actionFilter = "",
    ipFilter = "",
  } = await searchParams;
  if (!isLocale(locale)) notFound();

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(getAdminCookieName())?.value;
  if (!isValidSessionCookie(sessionCookie)) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-20 text-white sm:px-6 lg:px-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
          <h1 className="font-[var(--font-heading)] text-2xl font-bold">Accès refusé</h1>
          <Button className="mt-4" asChild>
            <Link href={`/${locale}/admin/login`}>Se connecter</Link>
          </Button>
        </div>
      </main>
    );
  }

  const allEntries = await readAuditEntries(500);
  const normalizedQ = q.trim().toLowerCase();

  const filtered = allEntries.filter((entry) => {
    if (localeFilter && entry.locale !== localeFilter) return false;
    if (actionFilter && entry.action !== actionFilter) return false;
    if (ipFilter && entry.ip !== ipFilter) return false;
    if (!normalizedQ) return true;

    const haystack = [
      entry.locale,
      entry.action,
      entry.ip,
      entry.userAgent,
      entry.timestamp,
      String(entry.sermonsCount),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalizedQ);
  });

  const pageSize = 20;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(
    Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1),
    totalPages,
  );
  const start = (currentPage - 1) * pageSize;
  const entries = filtered.slice(start, start + pageSize);

  const availableLocales = Array.from(new Set(allEntries.map((entry) => entry.locale))).sort();
  const availableActions = Array.from(new Set(allEntries.map((entry) => entry.action))).sort();
  const availableIps = Array.from(new Set(allEntries.map((entry) => entry.ip))).sort();

  const buildPageUrl = (targetPage: number) => {
    const paramsObj = new URLSearchParams();
    if (q) paramsObj.set("q", q);
    if (localeFilter) paramsObj.set("localeFilter", localeFilter);
    if (actionFilter) paramsObj.set("actionFilter", actionFilter);
    if (ipFilter) paramsObj.set("ipFilter", ipFilter);
    paramsObj.set("page", String(targetPage));
    return `/${locale}/admin/audit?${paramsObj.toString()}`;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <PageHeader
        title="Logs d’Audit"
        subtitle="Suivi des modifications du contenu et des actions administratives."
        image="/images/ministere.jpg"
        badge="Admin"
      />
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-[var(--font-heading)] text-3xl font-bold text-white">Audit Log</h1>
            <p className="mt-2 text-sm text-slate-300">
              Historique des mises à jour du contenu CMS.
            </p>
          </div>
          <Button variant="outline" asChild className="border-white/20 text-white">
            <Link href={`/${locale}/admin`}>Retour admin</Link>
          </Button>
        </div>

        <form className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2 lg:grid-cols-5">
          <input
            name="q"
            defaultValue={q}
            placeholder="Recherche texte"
            className="h-10 rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white outline-none"
          />
          <select
            name="localeFilter"
            defaultValue={localeFilter}
            className="h-10 rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white outline-none"
          >
            <option value="">Toutes locales</option>
            {availableLocales.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name="actionFilter"
            defaultValue={actionFilter}
            className="h-10 rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white outline-none"
          >
            <option value="">Toutes actions</option>
            {availableActions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name="ipFilter"
            defaultValue={ipFilter}
            className="h-10 rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white outline-none"
          >
            <option value="">Toutes IP</option>
            {availableIps.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <Button type="submit" className="w-full">
              Filtrer
            </Button>
            <Button variant="outline" asChild className="border-white/20 text-white">
              <Link href={`/${locale}/admin/audit`}>Reset</Link>
            </Button>
          </div>
        </form>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left text-white/70">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Locale</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Sermons</th>
                <th className="px-4 py-3">IP</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-white/60" colSpan={5}>
                    Aucun log pour le moment.
                  </td>
                </tr>
              ) : (
                entries.map((entry, index) => (
                  <tr key={`${entry.timestamp}-${index}`} className="border-t border-white/10">
                    <td className="px-4 py-3">{new Date(entry.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-3">{entry.locale}</td>
                    <td className="px-4 py-3">{entry.action}</td>
                    <td className="px-4 py-3">{entry.sermonsCount}</td>
                    <td className="px-4 py-3">{entry.ip}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-white/70">
          <p>
            {filtered.length} entrée(s) - page {currentPage}/{totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-white/20 text-white"
              asChild
              disabled={currentPage <= 1}
            >
              <Link href={buildPageUrl(Math.max(1, currentPage - 1))}>Précédent</Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white"
              asChild
              disabled={currentPage >= totalPages}
            >
              <Link href={buildPageUrl(Math.min(totalPages, currentPage + 1))}>Suivant</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
