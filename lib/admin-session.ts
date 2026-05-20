import { getAdminCookieName, isValidSessionCookie } from "@/lib/admin-auth";

export function isAuthorizedCookieHeader(cookieHeader = "") {
  const cookies = Object.fromEntries(
    cookieHeader
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const idx = part.indexOf("=");
        const key = idx >= 0 ? part.slice(0, idx) : part;
        const value = idx >= 0 ? part.slice(idx + 1) : "";
        return [key, decodeURIComponent(value)];
      }),
  );

  return isValidSessionCookie(cookies[getAdminCookieName()]);
}
