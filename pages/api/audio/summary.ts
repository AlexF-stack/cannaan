import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

import { requireAdminApi } from "@/lib/api-auth";

export const config = {
  api: {
    bodyParser: true,
  },
};

type AudioSummaryEntry = {
  audioId: string;
  content?: string;
  summary?: string;
  title?: string;
  speaker?: string;
  date?: string;
  createdAt?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAdminApi(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { audioId, content, summary, title, speaker, date } = req.body as {
    audioId?: string;
    content?: string;
    summary?: string;
    title?: string;
    speaker?: string;
    date?: string;
  };

  const actualContent = content ?? summary;

  if (!audioId || typeof actualContent !== "string" || actualContent.length > 20_000) {
    return res.status(400).json({ error: "Missing audioId or invalid summary content" });
  }

  if (!/^[a-zA-Z0-9._-]+$/.test(audioId)) {
    return res.status(400).json({ error: "Invalid audioId" });
  }

  const manifestPath = path.join(process.cwd(), "data", "audio_summaries.json");
  let manifest: AudioSummaryEntry[] = [];

  try {
    const raw = await fs.promises.readFile(manifestPath, "utf-8");
    manifest = JSON.parse(raw) as AudioSummaryEntry[];
  } catch {
    manifest = [];
  }

  const existing = manifest.find((item) => item.audioId === audioId);
  if (existing) {
    existing.content = actualContent;
    if (title) existing.title = title.slice(0, 200);
    if (speaker) existing.speaker = speaker.slice(0, 120);
    if (date) existing.date = date.slice(0, 80);
  } else {
    manifest.push({
      audioId,
      content: actualContent,
      title: (title ?? "Message Audio").slice(0, 200),
      speaker: (speaker ?? "Prophète Ithiel Dossou").slice(0, 120),
      date:
        date ??
        new Date().toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      createdAt: new Date().toISOString(),
    });
  }

  await fs.promises.mkdir(path.dirname(manifestPath), { recursive: true });
  await fs.promises.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  res.status(200).json({ success: true });
}
