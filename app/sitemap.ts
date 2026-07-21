import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { publicPagePaths } from "@/lib/page-meta";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return locales.flatMap((locale) =>
    publicPagePaths.map((path) => {
      const suffix = path === "" ? "" : path;
      const priority =
        path === "" ? 1 : path === "/contact" || path === "/don" ? 0.8 : 0.85;

      return {
        url: `${baseUrl}/${locale}${suffix}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority,
      };
    }),
  );
}
