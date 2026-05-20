import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  website: z.string().optional(),
  submittedAt: z.number().int().positive().optional(),
  "cf-turnstile-response": z.string().optional(),
});

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    realIp ||
    "unknown";

  const limiter = rateLimit({
    key: `contact:${ip}`,
    limit: 3,
    windowMs: 60 * 60 * 1000,
  });

  if (!limiter.success) {
    const retryAfter = Math.max(1, Math.ceil((limiter.resetAt - Date.now()) / 1000));
    return NextResponse.json(
      { error: "Too many requests. Please retry later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": "3",
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  const payload = schema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const body = payload.data;
  const now = Date.now();
  const minFillDelayMs = 2500;

  // Honeypot: real users never fill this hidden field.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Basic bot heuristic: reject ultra-fast submissions.
  if (body.submittedAt && now - body.submittedAt < minFillDelayMs) {
    return NextResponse.json({ error: "Form submitted too quickly" }, { status: 400 });
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const turnstileToken = body["cf-turnstile-response"];
    if (!turnstileToken) {
      return NextResponse.json({ error: "Turnstile token missing" }, { status: 400 });
    }
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: turnstileToken,
        remoteip: ip,
      }),
    });
    const verification = (await verify.json()) as { success?: boolean };
    if (!verification.success) {
      return NextResponse.json({ error: "Turnstile verification failed" }, { status: 400 });
    }
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_TO_EMAIL;
  const contactFrom = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (resendApiKey && contactTo) {
    const resend = new Resend(resendApiKey);
    const result = await resend.emails.send({
      from: contactFrom,
      to: contactTo,
      subject: `Nouveau message Canaan - ${body.name}`,
      replyTo: body.email,
      text: `${body.name} (${body.email})\n\n${body.message}`,
    });

    if (result.error) {
      return NextResponse.json({ error: "Unable to send email" }, { status: 502 });
    }
  }

  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
  if (formspreeEndpoint) {
    const forward = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!forward.ok) {
      return NextResponse.json({ error: "Unable to forward form" }, { status: 502 });
    }
  }

  return NextResponse.json(
    { ok: true },
    {
      headers: {
        "X-RateLimit-Limit": "3",
        "X-RateLimit-Remaining": String(limiter.remaining),
      },
    },
  );
}
