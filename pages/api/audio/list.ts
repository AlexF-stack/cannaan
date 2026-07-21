import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";

type AudioSummaryItem = {
  audioId: string;
  content?: string;
  summary?: string;
  title?: string;
  speaker?: string;
  date?: string;
  createdAt?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const summariesPath = path.join(process.cwd(), "data", "audio_summaries.json");

  try {
    const raw = await fs.readFile(summariesPath, "utf-8");
    const summaries = JSON.parse(raw) as AudioSummaryItem[];
    const list = summaries.map((item) => ({
      audioId: item.audioId,
      url: `/uploads/audio/${item.audioId}`,
      summary: item.content ?? item.summary ?? "",
      title: item.title ?? "Message sans titre",
      speaker: item.speaker ?? "Orateur inconnu",
      date:
        item.date ??
        (item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "Date inconnue"),
    }));
    res.status(200).json(list);
  } catch {
    res.status(200).json([]);
  }
}
