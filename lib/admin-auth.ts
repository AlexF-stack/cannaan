import { createHash, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "canaan_admin_session";

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function createSessionValue() {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "canaan-default-secret";
  const password = process.env.ADMIN_PASSWORD ?? "";
  return digest(`${password}:${secret}`);
}

export function isValidAdminPassword(candidate: string) {
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (!password || !candidate) return false;
  if (password.length !== candidate.length) return false;
  return timingSafeEqual(Buffer.from(password), Buffer.from(candidate));
}

export function isValidSessionCookie(cookieValue?: string) {
  if (!cookieValue) return false;
  const expected = createSessionValue();
  if (cookieValue.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(cookieValue), Buffer.from(expected));
}
