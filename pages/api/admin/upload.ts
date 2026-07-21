import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";

import { isAuthorizedCookieHeader } from "@/lib/admin-session";
import { uploadPublicFile } from "@/lib/storage";
import { updateSummary } from "@/services/audioSummaries";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!isAuthorizedCookieHeader(req.headers.cookie)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Upload failed" });
    }

    const audioFile = Array.isArray(files.audio) ? files.audio[0] : files.audio;
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    const summary = Array.isArray(fields.summary) ? fields.summary[0] : fields.summary;

    let audioUrl: string | null = null;
    let imageUrl: string | null = null;

    try {
      if (audioFile) {
        const buffer = await fs.promises.readFile(audioFile.filepath);
        const filename = path.basename(audioFile.filepath);
        const mime = audioFile.mimetype ?? "audio/mpeg";
        const uploaded = await uploadPublicFile(`uploads/${filename}`, buffer, mime);
        audioUrl = uploaded.url;
        await fs.promises.unlink(audioFile.filepath).catch(() => undefined);

        if (summary) {
          const audioId = path.parse(audioFile.originalFilename || audioFile.newFilename).name;
          await updateSummary(audioId, summary);
        }
      }

      if (imageFile) {
        const buffer = await fs.promises.readFile(imageFile.filepath);
        const filename = path.basename(imageFile.filepath);
        const mime = imageFile.mimetype ?? "image/jpeg";
        const uploaded = await uploadPublicFile(`uploads/${filename}`, buffer, mime);
        imageUrl = uploaded.url;
        await fs.promises.unlink(imageFile.filepath).catch(() => undefined);
      }

      res.status(200).json({
        message: "Upload successful",
        audio: audioUrl,
        image: imageUrl,
      });
    } catch {
      res.status(500).json({ error: "Upload failed" });
    }
  });
}
