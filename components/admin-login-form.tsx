"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function AdminLoginForm({ locale }: { locale: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);
    if (!response.ok) {
      setError("Mot de passe invalide.");
      return;
    }
    router.push(`/${locale}/admin`);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-4 text-sm text-white outline-none"
        placeholder="Mot de passe admin"
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </Button>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  );
}
