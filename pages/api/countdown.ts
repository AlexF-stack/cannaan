import type { NextApiRequest, NextApiResponse } from "next";

import { isAuthorizedCookieHeader } from "@/lib/admin-session";
import { readJsonFile, writeJsonFile } from "@/lib/storage";

const LAUNCH_KEY = "data/launch.json";

type LaunchConfig = { launchDate: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const config = await readJsonFile<LaunchConfig | null>(LAUNCH_KEY, null);
    if (!config?.launchDate) {
      return res.status(404).json({ error: "Config not found" });
    }
    return res.status(200).json(config);
  }

  if (req.method === "POST") {
    if (!isAuthorizedCookieHeader(req.headers.cookie)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { launchDate } = req.body as { launchDate?: string };
    if (!launchDate) {
      return res.status(400).json({ error: "launchDate is required" });
    }

    await writeJsonFile(LAUNCH_KEY, { launchDate });
    return res.status(200).json({ launchDate });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
