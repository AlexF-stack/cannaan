import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, isLocale } from "@/lib/i18n";

function withSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return withSecurityHeaders(NextResponse.next());
  }

  const firstSegment = pathname.split("/")[1];
  if (isLocale(firstSegment)) {
    return withSecurityHeaders(NextResponse.next());
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return withSecurityHeaders(NextResponse.redirect(url));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
