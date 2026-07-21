import type { NextApiRequest, NextApiResponse } from "next";

import { requireAdminApi } from "@/lib/api-auth";
import { upsertAudioSummary } from "@/lib/audio-manifest";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAdminApi(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { audioId, content, summary, title, speaker, date, locale } = req.body as {
    audioId?: string;
    content?: string;
    summary?: string;
    title?: string;
    speaker?: string;
    date?: string;
    locale?: string;
  };

  const actualContent = content ?? summary;

  if (!audioId || typeof actualContent !== "string" || actualContent.length > 20_000) {
    return res.status(400).json({ error: "Missing audioId or invalid summary content" });
  }

  if (!/^[a-zA-Z0-9._-]+$/.test(audioId)) {
    return res.status(400).json({ error: "Invalid audioId" });
  }

  try {
    await upsertAudioSummary({
      audioId,
      content: actualContent,
      title,
      speaker,
      date,
      locale,
    });
    res.status(200).json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to save summary" });
  }
}
