"use client";

import { useState } from "react";
import Script from "next/script";

import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [formStartedAt] = useState(() => Date.now());
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setStatus("idle");
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
      submittedAt: formStartedAt,
      "cf-turnstile-response": String(formData.get("cf-turnstile-response") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(response.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={onSubmit} className="space-y-6">
      {turnstileSiteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
        </>
      ) : null}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{dict.contact.name}</label>
        <input name="name" required placeholder={dict.contact.name} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{dict.contact.email}</label>
        <input name="email" type="email" required placeholder={dict.contact.email} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{dict.contact.message}</label>
        <textarea name="message" required rows={5} placeholder={dict.contact.message} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400" />
      </div>
      <Button type="submit" disabled={loading} size="lg" className="w-full rounded-xl bg-primary text-white hover:bg-primary/90">{loading ? "..." : dict.contact.submit}</Button>
      {status === "ok" && <p className="text-sm font-medium text-emerald-600 text-center">{dict.contact.success}</p>}
      {status === "error" && <p className="text-sm font-medium text-red-600 text-center">{dict.contact.error}</p>}
    </form>
  );
}
