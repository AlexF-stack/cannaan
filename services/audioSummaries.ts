import { readJsonFile, readTextFile, writeJsonFile } from "@/lib/storage";

const SUMMARIES_KEY = "data/audio_summaries.json";
const LEGACY_KEY = "data/audioSummaries.json";

async function readSummaries(): Promise<Record<string, string>> {
  let data = await readJsonFile<Record<string, string>>(SUMMARIES_KEY, {});
  if (Object.keys(data).length === 0) {
    const legacy = await readJsonFile<Record<string, string>>(LEGACY_KEY, {});
    if (Object.keys(legacy).length > 0) {
      data = legacy;
    }
  }
  return data;
}

/** Get summary for a given audio ID */
export async function getSummary(id: string): Promise<string> {
  const data = await readSummaries();
  return data[id] ?? "";
}

/** Update (or create) summary for a given audio ID */
export async function updateSummary(id: string, text: string): Promise<void> {
  const data = await readSummaries();
  data[id] = text;
  await writeJsonFile(SUMMARIES_KEY, data);
}

/** Read raw summaries file (for migration/debug) */
export async function readAllSummaries(): Promise<Record<string, string>> {
  return readSummaries();
}

export async function summariesFileExists(): Promise<boolean> {
  const raw = await readTextFile(SUMMARIES_KEY);
  if (raw) return true;
  return Boolean(await readTextFile(LEGACY_KEY));
}
