"use client";

import { useEffect } from "react";

import { useLocaleContext } from "@/lib/use-locale";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { pages } = useLocaleContext();
  const t = pages.errors;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <h1 className="font-[var(--font-heading)] text-3xl font-bold">{t.errorTitle}</h1>
      <p className="mt-3 max-w-md text-slate-400">{t.errorDesc}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        {t.errorCta}
      </button>
    </main>
  );
}
