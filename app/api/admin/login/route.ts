import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createSessionValue,
  getAdminCookieName,
  isValidAdminPassword,
} from "@/lib/admin-auth";

const schema = z.object({
  password: z.string().min(1),
});

export async function POST(request: Request) {
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
