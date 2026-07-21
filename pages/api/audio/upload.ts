import { promises as fs } from "fs";
import path from "path";
import formidable, { type File } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import { requireAdminApi } from "@/lib/api-auth";
import { isAllowedAudio, UPLOAD_LIMITS } from "@/lib/upload-validation";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public", "uploads", "audio");

async function ensureUploadDir() {
  await fs.mkdir(uploadDir, { recursive: true });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAdminApi(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await ensureUploadDir();

  const form = formidable({
    uploadDir,
    keepExtensions: false,
    maxFileSize: UPLOAD_LIMITS.audioBytes,
    filename: (_name, _ext, part) => {
      const original = part.originalFilename ?? "audio.mp3";
      const ext = original.slice(original.lastIndexOf(".")).toLowerCase();
      const safeExt = [".mp3", ".mpeg", ".m4a", ".wav", ".ogg"].includes(ext) ? ext : ".mp3";
      return `${uuidv4()}${safeExt}`;
    },
  });

  form.parse(req, async (err, _fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Upload failed" });
    }

    const raw = files.file;
    const file: File | undefined = Array.isArray(raw) ? raw[0] : raw;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const originalName = file.originalFilename ?? file.newFilename;
    const mimeType = file.mimetype ?? "application/octet-stream";
    if (!isAllowedAudio(mimeType, originalName)) {
      await fs.unlink(file.filepath).catch(() => undefined);
      return res.status(400).json({ error: "Invalid audio file type" });
    }

    const filename = path.basename(file.filepath);
    return res.status(200).json({
      message: "Upload successful",
      audioId: filename,
      url: `/uploads/audio/${filename}`,
    });
  });
}
