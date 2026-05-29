import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

import { isAuthorizedCookieHeader } from "@/lib/admin-session";
import { readManagedContent, writeManagedContent } from "@/lib/cms";
import { isLocale } from "@/lib/i18n";

const sermonSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  speaker: z.string().min(1),
});

const payloadSchema = z.object({
  locale: z.string(),
  sermons: z.array(sermonSchema),
  events: z.object({
    mainTitle: z.string().min(1),
    mainDescription: z.string().min(1),
    sunday: z.string().min(1),
    welcome: z.string().min(1),
    speaker: z.string().min(1),
    study: z.string().min(1),
    youth: z.string().min(1),
  }),
});

async function appendAuditLog(entry: unknown) {
  const dataDir = path.join(process.cwd(), "data");
  const auditPath = path.join(dataDir, "audit.log");
  await mkdir(dataDir, { recursive: true });
  await appendFile(auditPath, `${JSON.stringify(entry)}\n`, "utf8");
}

export async function GET(request: Request) {
  if (!isAuthorizedCookieHeader(request.headers.get("cookie") ?? "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = await readManagedContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!isAuthorizedCookieHeader(request.headers.get("cookie") ?? "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raw = await request.json();
  const parsed = payloadSchema.safeParse(raw);
  if (!parsed.success || !isLocale(parsed.data.locale)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const existing = await readManagedContent();
  const locale = parsed.data.locale;
  existing.sermons[locale] = parsed.data.sermons;
  existing.events[locale] = parsed.data.events;
  await writeManagedContent(existing);
  await appendAuditLog({
    timestamp: new Date().toISOString(),
    locale,
    sermonsCount: parsed.data.sermons.length,
    ip:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown",
    userAgent: request.headers.get("user-agent") ?? "unknown",
    action: "update-content",
  });

  return NextResponse.json({ ok: true });
}
