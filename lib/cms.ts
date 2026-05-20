import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { sermons as defaultSermons } from "@/lib/content";
import { defaultLocale, type Locale } from "@/lib/i18n";

type Sermon = { title: string; date: string; speaker: string };
type EventsOverride = {
  mainTitle?: string;
  mainDescription?: string;
  sunday?: string;
  welcome?: string;
  speaker?: string;
  study?: string;
  youth?: string;
};

export type ManagedContent = {
  sermons: Record<Locale, Sermon[]>;
  events: Record<Locale, EventsOverride>;
};

const dataDir = path.join(process.cwd(), "data");
const dataPath = path.join(dataDir, "content.json");
const auditPath = path.join(dataDir, "audit.log");

const defaultContent: ManagedContent = {
  sermons: defaultSermons,
  events: {
    fr: {},
    en: {},
  },
};

export async function readManagedContent(): Promise<ManagedContent> {
  try {
    const raw = await readFile(dataPath, "utf8");
    const parsed = JSON.parse(raw) as ManagedContent;
    return {
      sermons: parsed.sermons ?? defaultContent.sermons,
      events: parsed.events ?? defaultContent.events,
    };
  } catch {
    return defaultContent;
  }
}

export async function writeManagedContent(payload: ManagedContent): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataPath, JSON.stringify(payload, null, 2), "utf8");
}

export async function readLocaleContent(locale: Locale = defaultLocale) {
  const content = await readManagedContent();
  return {
    sermons: content.sermons[locale] ?? defaultContent.sermons[locale],
    eventOverrides: content.events[locale] ?? {},
  };
}

export type AuditEntry = {
  timestamp: string;
  locale: Locale | string;
  sermonsCount: number;
  ip: string;
  userAgent: string;
  action: string;
};

export async function readAuditEntries(limit = 100): Promise<AuditEntry[]> {
  try {
    const raw = await readFile(auditPath, "utf8");
    const lines = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    return lines
      .slice(-limit)
      .reverse()
      .map((line) => JSON.parse(line) as AuditEntry);
  } catch {
    return [];
  }
}
