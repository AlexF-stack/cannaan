import type { NextApiRequest, NextApiResponse } from "next";

import { listAudioSummaries } from "@/lib/audio-manifest";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const locale = typeof req.query.locale === "string" ? req.query.locale : "fr";

  try {
    const list = await listAudioSummaries(locale);
    res.status(200).json(list);
  } catch {
    res.status(200).json([]);
  }
}
