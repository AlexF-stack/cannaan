import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { updateSummary } from '@/services/audioSummaries';
import { isAuthorizedCookieHeader } from '@/lib/admin-session';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!isAuthorizedCookieHeader(req.headers.cookie)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024, // 100MB
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Upload failed' });
    }

    const audioFile = Array.isArray(files.audio) ? files.audio[0] : files.audio;
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    const summary = Array.isArray(fields.summary) ? fields.summary[0] : fields.summary;

    if (audioFile && summary) {
      // Use the audio filename (without extension) as ID for the summary
      const audioId = path.parse(audioFile.originalFilename || audioFile.newFilename).name;
      updateSummary(audioId, summary);
    }

    res.status(200).json({
      message: 'Upload successful',
      audio: audioFile ? `/uploads/${path.basename(audioFile.filepath)}` : null,
      image: imageFile ? `/uploads/${path.basename(imageFile.filepath)}` : null,
    });
  });
}
