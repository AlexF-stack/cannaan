import { sermons as defaultSermons } from "@/lib/content";
import { defaultLocale, type Locale } from "@/lib/i18n";
import {
  appendTextFileLocal,
  readAuditEntriesFromLog,
  readJsonFile,
  writeJsonFile,
} from "@/lib/storage";

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

const CONTENT_KEY = "data/content.json";
const AUDIT_KEY = "data/audit.log";

const defaultContent: ManagedContent = {
  sermons: defaultSermons,
  events: {
    fr: {},
    en: {},
  },
};

export async function readManagedContent(): Promise<ManagedContent> {
  const parsed = await readJsonFile<ManagedContent>(CONTENT_KEY, defaultContent);
  return {
    sermons: parsed.sermons ?? defaultContent.sermons,
    events: parsed.events ?? defaultContent.events,
  };
}

export async function writeManagedContent(payload: ManagedContent): Promise<void> {
  await writeJsonFile(CONTENT_KEY, payload);
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
  return readAuditEntriesFromLog(AUDIT_KEY, limit);
}

export async function appendAuditEntry(entry: AuditEntry): Promise<void> {
  await appendTextFileLocal(AUDIT_KEY, `${JSON.stringify(entry)}\n`);
}
