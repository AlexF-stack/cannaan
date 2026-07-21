"use client";

import { useLocaleContext } from "@/lib/use-locale";

export function SkipLink() {
  const { pages } = useLocaleContext();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900 focus:shadow-lg"
    >
      {pages.common.skipToContent}
    </a>
  );
}
