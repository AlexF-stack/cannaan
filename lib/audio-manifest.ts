import { readJsonFile, writeJsonFile } from "@/lib/storage";

const MANIFEST_KEY = "data/audio_summaries.json";
const LEGACY_RECORD_KEY = "data/audioSummaries.json";

export type AudioManifestEntry = {
  audioId: string;
  content?: string;
  summary?: string;
  title?: string;
  speaker?: string;
  date?: string;
  createdAt?: string;
  url?: string;
};

export type AudioListItem = {
  audioId: string;
  url: string;
  summary: string;
  title: string;
  speaker: string;
  date: string;
};

function defaultDate(locale: string): string {
  return new Date().toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function readAudioManifest(): Promise<AudioManifestEntry[]> {
  const manifest = await readJsonFile<AudioManifestEntry[] | Record<string, string>>(MANIFEST_KEY, []);

  if (Array.isArray(manifest)) {
    return manifest;
  }

  if (manifest && typeof manifest === "object") {
    return Object.entries(manifest).map(([audioId, content]) => ({
      audioId,
      content: typeof content === "string" ? content : "",
      title: "Message sans titre",
      speaker: "Orateur inconnu",
      date: defaultDate("fr"),
    }));
  }

  const legacy = await readJsonFile<Record<string, string>>(LEGACY_RECORD_KEY, {});
  return Object.entries(legacy).map(([audioId, content]) => ({
    audioId,
    content,
    title: "Message sans titre",
    speaker: "Orateur inconnu",
    date: defaultDate("fr"),
  }));
}

export async function writeAudioManifest(entries: AudioManifestEntry[]): Promise<void> {
  await writeJsonFile(MANIFEST_KEY, entries);
}

export async function upsertAudioSummary(input: {
  audioId: string;
  content: string;
  title?: string;
  speaker?: string;
  date?: string;
  locale?: string;
}): Promise<void> {
  const manifest = await readAudioManifest();
  const locale = input.locale ?? "fr";
  const existing = manifest.find((item) => item.audioId === input.audioId);

  if (existing) {
    existing.content = input.content;
    if (input.title) existing.title = input.title.slice(0, 200);
    if (input.speaker) existing.speaker = input.speaker.slice(0, 120);
    if (input.date) existing.date = input.date.slice(0, 80);
  } else {
    manifest.push({
      audioId: input.audioId,
      content: input.content,
      title: (input.title ?? (locale === "en" ? "Audio Message" : "Message Audio")).slice(0, 200),
      speaker: (input.speaker ?? (locale === "en" ? "Prophet Ithiel Dossou" : "Prophète Ithiel Dossou")).slice(0, 120),
      date: input.date ?? defaultDate(locale),
      createdAt: new Date().toISOString(),
    });
  }

  await writeAudioManifest(manifest);
}

export async function listAudioSummaries(locale = "fr"): Promise<AudioListItem[]> {
  const manifest = await readAudioManifest();
  const untitled = locale === "en" ? "Untitled message" : "Message sans titre";
  const unknownSpeaker = locale === "en" ? "Unknown speaker" : "Orateur inconnu";
  const unknownDate = locale === "en" ? "Unknown date" : "Date inconnue";

  return manifest.map((item) => ({
    audioId: item.audioId,
    url: item.url ?? `/uploads/audio/${item.audioId}`,
    summary: item.content ?? item.summary ?? "",
    title: item.title ?? untitled,
    speaker: item.speaker ?? unknownSpeaker,
    date:
      item.date ??
      (item.createdAt
        ? new Date(item.createdAt).toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : unknownDate),
  }));
}

export async function getManifestSummary(audioId: string): Promise<string> {
  const manifest = await readAudioManifest();
  const entry = manifest.find((item) => item.audioId === audioId);
  return entry?.content ?? entry?.summary ?? "";
}

export async function setManifestSummary(audioId: string, text: string): Promise<void> {
  await upsertAudioSummary({ audioId, content: text });
}
