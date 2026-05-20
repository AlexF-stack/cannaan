"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function AdminToolbar({ locale }: { locale: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push(`/${locale}/admin/login`);
    router.refresh();
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Button variant="outline" asChild className="border-white/20 text-white">
        <Link href={`/${locale}/admin/audit`}>Voir les logs d&apos;audit</Link>
      </Button>
      <Button variant="secondary" onClick={logout}>
        Déconnexion
      </Button>
    </div>
  );
}
