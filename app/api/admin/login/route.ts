import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createSessionValue,
  getAdminCookieName,
  isAdminConfigured,
  isValidAdminPassword,
} from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request-ip";

const schema = z.object({
  password: z.string().min(1).max(256),
});

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
  }

  const ip = getRequestIp(request);
  const limiter = rateLimit({
    key: `admin-login:${ip}`,
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!limiter.success) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success || !isValidAdminPassword(parsed.data.password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(getAdminCookieName(), createSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(getAdminCookieName(), "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}
