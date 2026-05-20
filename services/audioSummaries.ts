import fs from 'fs';
import path from 'path';

const summariesPath = path.join(process.cwd(), 'data', 'audioSummaries.json');

/** Ensure the JSON file exists */
function ensureFile() {
  if (!fs.existsSync(summariesPath)) {
    fs.mkdirSync(path.dirname(summariesPath), { recursive: true });
    fs.writeFileSync(summariesPath, JSON.stringify({}), 'utf8');
  }
}

/** Get summary for a given audio ID */
export function getSummary(id: string): string {
  ensureFile();
  const data = JSON.parse(fs.readFileSync(summariesPath, 'utf8')) as Record<string, string>;
  return data[id] ?? '';
}

/** Update (or create) summary for a given audio ID */
export function updateSummary(id: string, text: string): void {
  ensureFile();
  const data = JSON.parse(fs.readFileSync(summariesPath, 'utf8')) as Record<string, string>;
  data[id] = text;
  fs.writeFileSync(summariesPath, JSON.stringify(data, null, 2), 'utf8');
}
