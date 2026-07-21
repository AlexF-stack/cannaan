import { readJsonFile } from "@/lib/storage";
import { getManifestSummary, setManifestSummary } from "@/lib/audio-manifest";

const LEGACY_RECORD_KEY = "data/audioSummaries.json";

async function readLegacyRecord(id: string): Promise<string> {
  const legacy = await readJsonFile<Record<string, string>>(LEGACY_RECORD_KEY, {});
  return legacy[id] ?? "";
}

/** Get summary for a given audio ID */
export async function getSummary(id: string): Promise<string> {
  const fromManifest = await getManifestSummary(id);
  if (fromManifest) return fromManifest;
  return readLegacyRecord(id);
}

/** Update (or create) summary for a given audio ID */
export async function updateSummary(id: string, text: string): Promise<void> {
  await setManifestSummary(id, text);
}
