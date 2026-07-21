import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import busboy from "busboy";
import { v4 as uuidv4 } from "uuid";

import { requireAdminApi } from "@/lib/api-auth";
import {
  isAllowedImage,
  sanitizeExtension,
  UPLOAD_LIMITS,
} from "@/lib/upload-validation";

export const config = {
  api: {
    bodyParser: false,
  },
};

type ImageReviewEntry = {
  id: string;
  url: string;
  title: string;
  description: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAdminApi(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const bb = busboy({ headers: req.headers, limits: { fileSize: UPLOAD_LIMITS.imageBytes } });
  const fileChunks: Buffer[] = [];
  let fileName = "";
  let mimeType = "";
  let rejected = false;

  bb.on("file", (_name: string, file: NodeJS.ReadableStream, info: { mimeType: string; filename: string }) => {
    mimeType = info.mimeType;
    fileName = info.filename;
    file.on("data", (data: Buffer) => {
      if (rejected) return;
      fileChunks.push(data);
      const total = fileChunks.reduce((sum, chunk) => sum + chunk.length, 0);
      if (total > UPLOAD_LIMITS.imageBytes) {
        rejected = true;
        file.resume();
      }
    });
  });

  bb.on("finish", async () => {
    if (rejected) {
      return res.status(413).json({ error: "File too large" });
    }

    if (!fileName || !mimeType.startsWith("image/")) {
      return res.status(400).json({ error: "Invalid file type" });
    }

    if (!isAllowedImage(mimeType, fileName)) {
      return res.status(400).json({ error: "Invalid image format" });
    }

    const buffer = Buffer.concat(fileChunks);
    const id = uuidv4();
    const ext = sanitizeExtension(fileName, new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]), ".jpg");
    const filePath = path.join(process.cwd(), "public", "uploads", "reviews", `${id}${ext}`);

    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, buffer);

    const url = `/uploads/reviews/${id}${ext}`;
    const manifestPath = path.join(process.cwd(), "data", "image_reviews.json");
    let manifest: ImageReviewEntry[] = [];

    try {
      const content = await fs.promises.readFile(manifestPath, "utf-8");
      manifest = JSON.parse(content) as ImageReviewEntry[];
    } catch {
      manifest = [];
    }

    manifest.push({ id, url, title: "", description: "" });
    await fs.promises.mkdir(path.dirname(manifestPath), { recursive: true });
    await fs.promises.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

    res.status(200).json({ id, url });
  });

  bb.on("error", () => {
    res.status(500).json({ error: "Upload failed" });
  });

  req.pipe(bb);
}
