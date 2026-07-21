import { createHash, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "canaan_admin_session";
const DEV_FALLBACK_SECRET = "dev-only-insecure-secret";

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (secret && secret.length >= 16) return secret;
  if (process.env.NODE_ENV === "production") return null;
  return DEV_FALLBACK_SECRET;
}

export function isAdminConfigured() {
  const password = process.env.ADMIN_PASSWORD?.trim() ?? "";
  const secret = getSessionSecret();
  if (process.env.NODE_ENV === "production") {
    return password.length >= 8 && Boolean(secret && secret !== DEV_FALLBACK_SECRET);
  }
  return password.length > 0 && Boolean(secret);
}

export function createSessionValue() {
  const secret = getSessionSecret();
  const password = process.env.ADMIN_PASSWORD?.trim() ?? "";
  if (!secret || !password) return "";
  return digest(`${password}:${secret}`);
}

export function isValidAdminPassword(candidate: string) {
  if (!isAdminConfigured()) return false;
  const password = process.env.ADMIN_PASSWORD?.trim() ?? "";
  if (!password || !candidate) return false;
  if (password.length !== candidate.length) return false;
  return timingSafeEqual(Buffer.from(password), Buffer.from(candidate));
}

export function isValidSessionCookie(cookieValue?: string) {
  if (!isAdminConfigured() || !cookieValue) return false;
  const expected = createSessionValue();
  if (!expected || cookieValue.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(cookieValue), Buffer.from(expected));
}
