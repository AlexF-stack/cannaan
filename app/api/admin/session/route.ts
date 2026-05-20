import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getAdminCookieName, isValidSessionCookie } from "@/lib/admin-auth";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(getAdminCookieName())?.value;

  return NextResponse.json({
    authenticated: isValidSessionCookie(sessionCookie),
  });
}
